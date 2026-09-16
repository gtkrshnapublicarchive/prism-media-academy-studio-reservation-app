"use client";

import { useState } from "react";
import { X, AlertOctagon, Loader2 } from "lucide-react";
import { InspectionCondition } from "@prisma/client";
import { logReturnAction } from "../actions/log_return.action";

interface InspectionModalProps {
  bookingId: string;
  studioName: string;
  studentName: string;
  gearKitName?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function InspectionModal({
  bookingId,
  studioName,
  studentName,
  gearKitName,
  onClose,
  onSuccess,
}: InspectionModalProps) {
  const [condition, setCondition] = useState<InspectionCondition>(InspectionCondition.GOOD_CONDITION);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await logReturnAction({
      bookingId,
      condition,
      notes,
    });

    setLoading(false);
    if (res.success) {
      onSuccess();
    } else {
      setError(res.error || "Failed to log return inspection.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-[#fbfbfa] border border-black/[0.1] rounded-2xl max-w-md w-full p-6 shadow-xl relative">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-black/50 hover:text-black hover:bg-black/[0.05] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wider block">
          Return Inspection
        </span>
        <h3 className="font-editorial text-2xl font-semibold text-[#1c1d1a] mt-0.5">
          {studioName}
        </h3>
        <p className="text-xs text-black/60 mt-0.5">
          Student Crew Lead: <strong className="text-black/80">{studentName}</strong>
          {gearKitName && <> &bull; Attached Gear: <strong>{gearKitName}</strong></>}
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-black/70 mb-2">
              Equipment &amp; Studio Return Condition
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-black/[0.08] hover:border-black/20 bg-white cursor-pointer text-xs">
                <input
                  type="radio"
                  name="condition"
                  value={InspectionCondition.GOOD_CONDITION}
                  checked={condition === InspectionCondition.GOOD_CONDITION}
                  onChange={() => setCondition(InspectionCondition.GOOD_CONDITION)}
                />
                <div>
                  <p className="font-semibold text-black/90">Good Condition</p>
                  <p className="text-[11px] text-black/50">All lenses, sensors, and cables intact.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-black/[0.08] hover:border-black/20 bg-white cursor-pointer text-xs">
                <input
                  type="radio"
                  name="condition"
                  value={InspectionCondition.CONSUMABLES_REPLACED}
                  checked={condition === InspectionCondition.CONSUMABLES_REPLACED}
                  onChange={() => setCondition(InspectionCondition.CONSUMABLES_REPLACED)}
                />
                <div>
                  <p className="font-semibold text-black/90">Consumables Replaced</p>
                  <p className="text-[11px] text-black/50">Gaffer tape, diffusion gel, or AA batteries replaced.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-red-200 hover:border-red-300 bg-red-50/40 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="condition"
                  value={InspectionCondition.DAMAGE_FLAGGED}
                  checked={condition === InspectionCondition.DAMAGE_FLAGGED}
                  onChange={() => setCondition(InspectionCondition.DAMAGE_FLAGGED)}
                />
                <div>
                  <p className="font-semibold text-red-800 flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5 text-red-600" /> Damage Flagged
                  </p>
                  <p className="text-[11px] text-red-700/80">Marks gear kit as DAMAGED and locks future bookings.</p>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-black/70 mb-1">
              Inspection Notes / Incident Log
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Clean lens elements, minor scuff on tripod plate, cyclorama floor clean."
              className="w-full text-xs p-2.5 rounded-xl border border-black/[0.1] bg-white focus:outline-hidden focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-black/60 hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{loading ? "Recording..." : "Confirm & Close Session"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
