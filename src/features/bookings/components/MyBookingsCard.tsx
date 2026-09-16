"use client";

import { useState } from "react";
import { cancelBookingAction } from "../actions/cancel_booking.action";
import { Ticket, Calendar, Clock, AlertTriangle, Package, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingRecord {
  id: string;
  voucherCode: string;
  date: string;
  startTime: string;
  endTime: string;
  projectTitle: string;
  crewSize: number;
  status: string;
  canCancel: boolean;
  studio: { name: string; slug: string };
  gearKit?: { name: string; items: string[] } | null;
  inspection?: { condition: string; notes: string | null; inspectedAt: Date } | null;
}

export function MyBookingsCard({ booking }: { booking: BookingRecord }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this reservation? The studio and gear kit will be released.")) {
      return;
    }

    setLoading(true);
    setError(null);
    const res = await cancelBookingAction(booking.id);
    setLoading(false);

    if (res.success) {
      router.refresh();
    } else {
      setError(res.error || "Failed to cancel reservation.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "BOOKED":
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#e7f2e4] text-[#5a8357]">Confirmed</span>;
      case "CHECKED_OUT":
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">In Session</span>;
      case "RETURNED":
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/5 text-black/60">Completed</span>;
      case "CANCELLED":
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-600">Cancelled</span>;
      default:
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/5 text-black/60">{status}</span>;
    }
  };

  return (
    <div className="bg-white border border-black/[0.08] rounded-2xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-3.5 mb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
              {booking.studio.name}
            </h4>
            {getStatusBadge(booking.status)}
          </div>
          <p className="text-xs text-black/60 mt-0.5 font-medium">
            Project: &ldquo;{booking.projectTitle}&rdquo; (Crew of {booking.crewSize})
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#fbfbfa] border border-black/[0.08]">
          <Ticket className="w-3.5 h-3.5 text-black/40" />
          <span className="font-mono text-xs font-bold text-black/90 tracking-wide">
            {booking.voucherCode}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-black/70">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-black/40 shrink-0" />
          <span>Date: <strong className="text-black/90">{booking.date}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-black/40 shrink-0" />
          <span>Time: <strong className="text-black/90">{booking.startTime} - {booking.endTime}</strong></span>
        </div>
      </div>

      {booking.gearKit && (
        <div className="mt-3 p-3 rounded-xl bg-[#fbfbfa] border border-black/[0.06] text-xs">
          <div className="flex items-center gap-1.5 font-medium text-black/80">
            <Package className="w-3.5 h-3.5 text-black/40" />
            <span>Attached Gear: {booking.gearKit.name}</span>
          </div>
          <p className="text-[11px] text-black/50 mt-1">
            Items: {booking.gearKit.items.join(", ")}
          </p>
        </div>
      )}

      {/* Inspection notes if completed */}
      {booking.inspection && (
        <div className="mt-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.06] text-xs">
          <p className="font-medium text-black/80">
            Return Inspection: <span className="font-semibold">{booking.inspection.condition.replace(/_/g, " ")}</span>
          </p>
          {booking.inspection.notes && (
            <p className="text-[11px] text-black/60 mt-0.5">Notes: {booking.inspection.notes}</p>
          )}
        </div>
      )}

      {error && (
        <div className="mt-3 p-2.5 rounded-xl bg-red-50 text-xs text-red-700 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {booking.status === "BOOKED" && (
        <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between">
          <span className="text-[11px] text-black/50">
            {booking.canCancel
              ? "Eligible for self-service cancellation (4+ hrs prior)."
              : "Cancellation locked: Session is within 4 hours. Speak to gear desk staff."}
          </span>
          <button
            type="button"
            disabled={!booking.canCancel || loading}
            onClick={handleCancel}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-colors ${
              booking.canCancel
                ? "text-red-700 bg-red-50 hover:bg-red-100 cursor-pointer"
                : "text-black/30 bg-black/[0.03] cursor-not-allowed"
            }`}
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Cancel Session"}
          </button>
        </div>
      )}
    </div>
  );
}
