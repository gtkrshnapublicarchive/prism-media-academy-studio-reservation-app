"use client";

import { useTransition } from "react";
import Link from "next/link";
import { toggleTechnicianShiftAction } from "../actions/update_preferences.action";
import { ArrowUpRight, Radio, Power } from "lucide-react";

interface TechnicianShiftCardProps {
  station: string | null;
  shiftStatus: string | null;
}

export function TechnicianShiftCard({ station, shiftStatus }: TechnicianShiftCardProps) {
  const [isPending, startTransition] = useTransition();
  const isOnDuty = shiftStatus !== "OFF_DUTY";

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTechnicianShiftAction();
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-black/[0.08] p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
              Shift &amp; Duty Console
            </h3>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
              isOnDuty
                ? "bg-[#eef2ec] text-[#344c32] border border-[#d6e3d2]"
                : "bg-black/[0.05] text-black/60 border border-black/[0.08]"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOnDuty ? "bg-[#344c32] animate-pulse" : "bg-black/30"
              }`}
            />
            <span>{isOnDuty ? "On Duty Active" : "Shift Inactive"}</span>
          </span>
        </div>

        <p className="text-xs text-black/60 mb-5 leading-relaxed">
          Active duty signals front desk availability for student gear handovers, equipment check-outs, and post-session condition inspections.
        </p>

        <div className="p-4 rounded-xl bg-[#fbfbfa] border border-black/[0.06] mb-6 space-y-2">
          <div className="text-[11px] uppercase tracking-wider text-black/40 font-semibold">
            Assigned Station
          </div>
          <div className="text-sm font-semibold text-black/90">
            {station || "Counter 1 - Master Gear Desk & Inspection Vault"}
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          className={`w-full inline-flex items-center justify-center gap-2 text-xs font-medium py-2.5 px-4 rounded-xl transition-colors shadow-xs cursor-pointer ${
            isOnDuty
              ? "bg-[#fbfbfa] hover:bg-black/[0.05] text-black/80 border border-black/[0.1]"
              : "bg-[#252724] hover:bg-[#3b3e39] text-white"
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span>{isPending ? "Updating..." : isOnDuty ? "Clock Out / Go Off Duty" : "Clock In / Go On Duty"}</span>
        </button>

        <Link
          href="/technician"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium py-2.5 px-4 rounded-xl transition-colors shadow-xs"
        >
          <span>Open Floor &amp; Counter Dashboard</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
        </Link>
      </div>
    </div>
  );
}
