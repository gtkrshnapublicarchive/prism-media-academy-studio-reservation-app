"use client";

import { useState } from "react";
import { Wrench, CheckCircle2, PackageCheck } from "lucide-react";
import { checkoutSessionAction } from "../actions/checkout_session.action";
import { toggleStudioMaintenanceAction } from "../actions/toggle_studio_maintenance.action";
import { InspectionModal } from "./InspectionModal";
import { useRouter } from "next/navigation";

interface SlotItem {
  slotLabel: string;
  startTime: string;
  endTime: string;
  studioStatus: string;
  booking: {
    id: string;
    voucherCode: string;
    status: string;
    studentName: string;
    studentId?: string | null;
    studentEmail: string;
    projectTitle: string;
    crewSize: number;
    gearKitId?: string | null;
    gearKitName?: string | null;
    gearKitStatus?: string | null;
    inspection?: unknown;
  } | null;
}

interface StudioTimeline {
  studio: { id: string; name: string; slug: string; status: string; capacity: number };
  slots: SlotItem[];
}

interface GearKitItem {
  id: string;
  name: string;
  slug: string;
  status: string;
  items: string[];
}

interface TechnicianBoardProps {
  timeline: StudioTimeline[];
  gearKits: GearKitItem[];
  selectedDate: string;
}

export function TechnicianBoard({ timeline, gearKits, selectedDate }: TechnicianBoardProps) {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<{
    studioName: string;
    slot: SlotItem;
  } | null>(null);

  const [inspectingBooking, setInspectingBooking] = useState<{
    bookingId: string;
    studioName: string;
    studentName: string;
    gearKitName?: string;
  } | null>(null);

  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleCheckout = async (bookingId: string) => {
    setLoadingAction(`checkout-${bookingId}`);
    await checkoutSessionAction(bookingId);
    setLoadingAction(null);
    setSelectedSlot(null);
    router.refresh();
  };

  const handleToggleMaintenance = async (studioId: string) => {
    setLoadingAction(`maint-${studioId}`);
    await toggleStudioMaintenanceAction(studioId);
    setLoadingAction(null);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-xs text-black/50 bg-[#fbfbfa] px-4 py-2 rounded-xl border border-black/[0.06]">
        <span>Live Facility Grid for Date: <strong className="text-black/80">{selectedDate}</strong></span>
        <span>Operational Blocks: 08:00 - 20:00 (6x 2-hr sessions)</span>
      </div>
      {/* Studio Master Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {timeline.map(({ studio, slots }) => (
          <div key={studio.id} className="bg-white border border-black/[0.08] rounded-2xl p-5 shadow-xs flex flex-col">
            <div className="flex items-start justify-between border-b border-black/[0.06] pb-3 mb-3">
              <div>
                <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a]">{studio.name}</h3>
                <p className="text-[11px] text-black/50">Capacity: {studio.capacity} persons</p>
              </div>
              <button
                type="button"
                disabled={loadingAction === `maint-${studio.id}`}
                onClick={() => handleToggleMaintenance(studio.id)}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                  studio.status === "MAINTENANCE"
                    ? "bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200"
                    : "bg-black/[0.04] text-black/70 border-black/[0.08] hover:bg-black/[0.08]"
                }`}
              >
                <Wrench className="w-3 h-3" />
                {studio.status === "MAINTENANCE" ? "Maintenance Active" : "Set Maint"}
              </button>
            </div>

            <div className="space-y-2 flex-1">
              {slots.map((slot, idx) => {
                const b = slot.booking;
                const isMaint = studio.status === "MAINTENANCE";
                const isBooked = b?.status === "BOOKED";
                const isCheckedOut = b?.status === "CHECKED_OUT";
                const isReturned = b?.status === "RETURNED";

                return (
                  <div
                    key={idx}
                    onClick={() => b && setSelectedSlot({ studioName: studio.name, slot })}
                    className={`p-3 rounded-xl border text-xs transition-all ${
                      isMaint
                        ? "bg-amber-50/60 border-amber-200 text-amber-900/60"
                        : isCheckedOut
                        ? "bg-blue-50/70 border-blue-200 text-blue-900 cursor-pointer hover:border-blue-400"
                        : isBooked
                        ? "bg-[#eef2ec]/80 border-[#5a8357]/30 text-black cursor-pointer hover:border-[#5a8357]"
                        : isReturned
                        ? "bg-black/[0.02] border-black/[0.06] text-black/40"
                        : "bg-[#fbfbfa] border-black/[0.06] text-black/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[11px]">{slot.slotLabel}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        {isMaint ? "Locked" : isCheckedOut ? "In Session" : isBooked ? "Reserved" : isReturned ? "Returned" : "Vacant"}
                      </span>
                    </div>

                    {b && (
                      <div className="mt-1.5 pt-1.5 border-t border-black/[0.04]">
                        <p className="font-medium text-black/90 truncate">{b.studentName} ({b.studentId || "ID: N/A"})</p>
                        <p className="text-[10px] text-black/60 truncate">&ldquo;{b.projectTitle}&rdquo;</p>
                        {b.gearKitName && (
                          <span className="inline-block text-[9px] mt-1 bg-white/80 text-black/70 px-1.5 py-0.5 rounded-md border border-black/[0.06]">
                            Gear: {b.gearKitName}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Slot Drawer / Action Card */}
      {selectedSlot && selectedSlot.slot.booking && (
        <div className="p-5 rounded-2xl bg-white border border-black/[0.1] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-black/5 text-black/80 font-mono">
                {selectedSlot.slot.booking.voucherCode}
              </span>
              <h4 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
                {selectedSlot.studioName} &bull; {selectedSlot.slot.slotLabel}
              </h4>
            </div>
            <p className="text-xs text-black/70 mt-1">
              Student: <strong>{selectedSlot.slot.booking.studentName}</strong> ({selectedSlot.slot.booking.studentId}) &bull; Crew: {selectedSlot.slot.booking.crewSize} &bull; Project: &ldquo;{selectedSlot.slot.booking.projectTitle}&rdquo;
            </p>
            {selectedSlot.slot.booking.gearKitName && (
              <p className="text-xs text-black/60 mt-0.5">
                Attached Package: <strong>{selectedSlot.slot.booking.gearKitName}</strong>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedSlot.slot.booking.status === "BOOKED" && (
              <button
                type="button"
                disabled={loadingAction !== null}
                onClick={() => handleCheckout(selectedSlot.slot.booking!.id)}
                className="px-4 py-2 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <PackageCheck className="w-3.5 h-3.5" />
                <span>Check-Out Gear &amp; Studio</span>
              </button>
            )}

            {selectedSlot.slot.booking.status === "CHECKED_OUT" && (
              <button
                type="button"
                onClick={() =>
                  setInspectingBooking({
                    bookingId: selectedSlot.slot.booking!.id,
                    studioName: selectedSlot.studioName,
                    studentName: selectedSlot.slot.booking!.studentName,
                    gearKitName: selectedSlot.slot.booking!.gearKitName || undefined,
                  })
                }
                className="px-4 py-2 rounded-xl bg-[#5a8357] hover:bg-[#4d704a] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Log Return &amp; Inspect</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setSelectedSlot(null)}
              className="px-3 py-2 text-xs text-black/50 hover:text-black"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Equipment Kit Health Monitor */}
      <div className="bg-white border border-black/[0.08] rounded-2xl p-5 shadow-xs">
        <h4 className="font-editorial text-base font-semibold text-[#1c1d1a] mb-3">
          Equipment Kit Inventory Status
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {gearKits.map((kit) => (
            <div key={kit.id} className="p-3.5 rounded-xl border border-black/[0.06] bg-[#fbfbfa]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-black/90">{kit.name}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                  kit.status === "AVAILABLE"
                    ? "bg-[#e7f2e4] text-[#5a8357]"
                    : "bg-red-100 text-red-800"
                }`}>
                  {kit.status}
                </span>
              </div>
              <p className="text-[11px] text-black/50 mt-1 line-clamp-2">{kit.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Return Inspection Modal */}
      {inspectingBooking && (
        <InspectionModal
          bookingId={inspectingBooking.bookingId}
          studioName={inspectingBooking.studioName}
          studentName={inspectingBooking.studentName}
          gearKitName={inspectingBooking.gearKitName}
          onClose={() => setInspectingBooking(null)}
          onSuccess={() => {
            setInspectingBooking(null);
            setSelectedSlot(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
