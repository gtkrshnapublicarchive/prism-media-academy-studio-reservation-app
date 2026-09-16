"use client";

import { useState } from "react";
import { StudioScheduleView, GearKitSummary, OperationalSlot } from "../types/booking.types";
import { BookingModal } from "./BookingModal";
import { VoucherModal } from "./VoucherModal";
import { Clock, Users, Wrench, ShieldCheck, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ScheduleGridProps {
  initialSchedules: StudioScheduleView[];
  gearKits: GearKitSummary[];
  selectedDate: string;
  isStudent: boolean;
  quotaStatus?: { usedHours: number; remainingHours: number; canBook: boolean } | null;
}

export function ScheduleGrid({
  initialSchedules,
  gearKits,
  selectedDate,
  isStudent,
  quotaStatus,
}: ScheduleGridProps) {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<{
    studioId: string;
    studioName: string;
    slot: OperationalSlot;
  } | null>(null);

  const [voucher, setVoucher] = useState<{
    code: string;
    studioName: string;
    slotLabel: string;
    gearKitName?: string;
  } | null>(null);

  const handleSlotClick = (studio: StudioScheduleView, slot: (typeof studio.slots)[number]) => {
    if (slot.status !== "AVAILABLE") return;
    if (!isStudent) {
      router.push("/login");
      return;
    }
    setActiveModal({
      studioId: studio.id,
      studioName: studio.name,
      slot: { label: slot.slotLabel, startTime: slot.startTime, endTime: slot.endTime },
    });
  };

  return (
    <div>
      {/* Quota Banner */}
      {isStudent && quotaStatus && (
        <div className="mb-6 p-4 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eef2ec] text-[#5a8357] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-black/90">Student Weekly Studio Quota</p>
              <p className="text-[11px] text-black/50">
                Max 4 hours per student each calendar week.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-3 py-1.5 rounded-xl bg-[#fbfbfa] border border-black/[0.08] text-black/80">
              Used: <strong className="text-black">{quotaStatus.usedHours}h</strong> / 4h
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl ${
                quotaStatus.canBook
                  ? "bg-[#e7f2e4] text-[#5a8357]"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {quotaStatus.remainingHours}h Available
            </span>
          </div>
        </div>
      )}

      {/* 3-Studio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initialSchedules.map((studio) => (
          <div
            key={studio.id}
            className="bg-white border border-black/[0.08] rounded-2xl p-5 shadow-xs flex flex-col"
          >
            <div className="border-b border-black/[0.06] pb-4 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
                  {studio.name.split(":")[0]}
                </h3>
                {studio.status === "MAINTENANCE" ? (
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Wrench className="w-3 h-3" /> Maintenance
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-black/50 flex items-center gap-1">
                    <Users className="w-3 h-3" /> Max {studio.capacity}
                  </span>
                )}
              </div>
              <p className="text-xs text-black/60 font-medium mt-0.5">
                {studio.name.split(":")[1]?.trim() || studio.name}
              </p>
              <p className="text-[11px] text-black/50 mt-1 line-clamp-2">{studio.description}</p>
            </div>

            {/* Time Slots */}
            <div className="space-y-2 flex-1">
              {studio.slots.map((slot, idx) => {
                const isAvail = slot.status === "AVAILABLE";
                const isMaint = slot.status === "MAINTENANCE";
                const isCheckedOut = slot.status === "CHECKED_OUT";

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!isAvail}
                    onClick={() => handleSlotClick(studio, slot)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      isAvail
                        ? "border-black/[0.08] bg-[#fbfbfa] hover:border-black/30 hover:bg-white cursor-pointer group shadow-2xs"
                        : isMaint
                        ? "border-amber-200 bg-amber-50/50 text-amber-900/60 cursor-not-allowed"
                        : isCheckedOut
                        ? "border-black/[0.06] bg-black/[0.03] text-black/40 cursor-not-allowed"
                        : "border-black/[0.06] bg-black/[0.02] text-black/50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-black/40" />
                      <span className="font-medium text-black/80">{slot.slotLabel}</span>
                    </div>

                    <div>
                      {isAvail ? (
                        <span className="text-[11px] font-semibold text-[#252724] group-hover:text-black flex items-center gap-0.5">
                          Available <ChevronRight className="w-3 h-3 text-black/40 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      ) : isMaint ? (
                        <span className="text-[10px] font-medium text-amber-800">Locked</span>
                      ) : isCheckedOut ? (
                        <span className="text-[10px] font-medium text-black/60 bg-black/5 px-2 py-0.5 rounded-md">
                          In Session
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-black/60 bg-black/5 px-2 py-0.5 rounded-md">
                          Reserved
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {activeModal && (
        <BookingModal
          studioId={activeModal.studioId}
          studioName={activeModal.studioName}
          date={selectedDate}
          slot={activeModal.slot}
          gearKits={gearKits}
          onClose={() => setActiveModal(null)}
          onSuccess={(code, kitName) => {
            setActiveModal(null);
            setVoucher({
              code,
              studioName: activeModal.studioName,
              slotLabel: activeModal.slot.label,
              gearKitName: kitName,
            });
          }}
        />
      )}

      {/* Digital Confirmation Voucher */}
      {voucher && (
        <VoucherModal
          voucherCode={voucher.code}
          studioName={voucher.studioName}
          date={selectedDate}
          slotLabel={voucher.slotLabel}
          gearKitName={voucher.gearKitName}
          onClose={() => {
            setVoucher(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
