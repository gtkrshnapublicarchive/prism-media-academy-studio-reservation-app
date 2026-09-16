"use client";

import { useState } from "react";
import { X, AlertCircle, Loader2 } from "lucide-react";
import { GearKitSummary, OperationalSlot } from "../types/booking.types";
import { createBookingAction } from "../actions/create_booking.action";
import { RoundCheckbox } from "@/shared/components/RoundCheckbox";

interface BookingModalProps {
  studioId: string;
  studioName: string;
  date: string;
  slot: OperationalSlot;
  gearKits: GearKitSummary[];
  onClose: () => void;
  onSuccess: (voucherCode: string, gearKitName?: string) => void;
}

export function BookingModal({
  studioId,
  studioName,
  date,
  slot,
  gearKits,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const [selectedKitId, setSelectedKitId] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState("");
  const [crewSize, setCrewSize] = useState(2);
  const [agreementSigned, setAgreementSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreementSigned) {
      setError("Please sign the digital safety liability agreement.");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await createBookingAction({
      studioId,
      gearKitId: selectedKitId ? selectedKitId : null,
      date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      projectTitle,
      crewSize,
      agreementSigned,
    });

    setLoading(false);

    if (res.success && res.voucherCode) {
      const chosenKit = gearKits.find((k) => k.id === selectedKitId)?.name;
      onSuccess(res.voucherCode, chosenKit);
    } else {
      setError(res.error || "Reservation failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#fbfbfa] border border-black/[0.1] rounded-2xl max-w-lg w-full p-6 shadow-xl relative my-8">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-black/50 hover:text-black hover:bg-black/[0.05] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wider block">
          Reservation Checkout
        </span>
        <h3 className="font-editorial text-2xl font-semibold text-[#1c1d1a] mt-0.5">
          {studioName}
        </h3>
        <p className="text-xs text-black/60 mt-1">
          {date} - Session Slot: {slot.label} (2 Hours)
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200/80 text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-black/70 mb-1.5">
              Production Gear Package (Optional)
            </label>
            <div className="space-y-2">
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                  selectedKitId === ""
                    ? "border-black/40 bg-white"
                    : "border-black/[0.08] hover:border-black/20"
                }`}
              >
                <input
                  type="radio"
                  name="gearKit"
                  value=""
                  checked={selectedKitId === ""}
                  onChange={() => setSelectedKitId("")}
                  className="mt-0.5 w-4 h-4 accent-[#252724] cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-black/90">Studio Room Only (No Gear Kit)</p>
                  <p className="text-black/50 text-[11px]">Use room fixed facilities without bundled gear.</p>
                </div>
              </label>

              {gearKits.map((kit) => (
                <label
                  key={kit.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border text-xs transition-colors ${
                    !kit.isAvailableForSlot
                      ? "opacity-50 border-black/[0.06] bg-black/[0.02] cursor-not-allowed"
                      : selectedKitId === kit.id
                      ? "border-black/40 bg-white cursor-pointer"
                      : "border-black/[0.08] hover:border-black/20 cursor-pointer"
                  }`}
                >
                  <input
                    type="radio"
                    name="gearKit"
                    value={kit.id}
                    disabled={!kit.isAvailableForSlot}
                    checked={selectedKitId === kit.id}
                    onChange={() => setSelectedKitId(kit.id)}
                    className="mt-0.5 w-4 h-4 accent-[#252724] cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-black/90">{kit.name}</p>
                      {!kit.isAvailableForSlot && (
                        <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
                          Unavailable
                        </span>
                      )}
                    </div>
                    <p className="text-black/50 text-[11px] mt-0.5">{kit.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {kit.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#eef2ec] text-[#252724] px-1.5 py-0.5 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-black/70 mb-1">
                Project Title
              </label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g. Narrative Short Capstone"
                className="w-full text-xs p-2.5 rounded-xl border border-black/[0.1] bg-white focus:outline-hidden focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-black/70 mb-1">
                Crew Size
              </label>
              <input
                type="number"
                min={1}
                max={6}
                value={crewSize}
                onChange={(e) => setCrewSize(parseInt(e.target.value) || 1)}
                className="w-full text-xs p-2.5 rounded-xl border border-black/[0.1] bg-white focus:outline-hidden focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-black/[0.06]">
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                agreementSigned
                  ? "bg-[#eef2ec]/60 border-[#344c32]/30 shadow-2xs"
                  : "bg-[#fbfbfa] border-black/[0.08] hover:border-black/20"
              }`}
            >
              <RoundCheckbox
                required
                checked={agreementSigned}
                onChange={setAgreementSigned}
                label={
                  <span className="text-xs font-semibold text-black/90 block">
                    Equipment Care &amp; Policy Agreement
                  </span>
                }
                description={
                  <span className="text-[11px] text-black/60 block mt-0.5 leading-relaxed">
                    I confirm responsibility for studio and equipment care, and understand that cancellations
                    under 4 hours prior to session start are blocked per academy policies.
                  </span>
                }
                className="w-full"
              />
            </div>
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
              disabled={loading || !agreementSigned}
              className="px-5 py-2 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{loading ? "Verifying..." : "Confirm Reservation"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
