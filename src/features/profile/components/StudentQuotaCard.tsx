import Link from "next/link";
import { StudentProfileMetrics } from "../types/profile.types";
import { Clock, Calendar, ArrowRight } from "lucide-react";

interface StudentQuotaCardProps {
  metrics?: StudentProfileMetrics;
}

export function StudentQuotaCard({ metrics }: StudentQuotaCardProps) {
  const usedHours = metrics?.usedHoursThisWeek ?? 0;
  const maxHours = metrics?.maxWeeklyHours ?? 4;
  const remainingHours = metrics?.remainingHoursThisWeek ?? 4;
  const percentage = Math.min(100, Math.round((usedHours / maxHours) * 100));

  return (
    <div className="bg-white rounded-2xl border border-black/[0.08] p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#eef2ec] text-[#344c32] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
              Weekly Studio Quota
            </h3>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              remainingHours > 0
                ? "bg-[#eef2ec] text-[#344c32]"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {remainingHours > 0 ? `${remainingHours}h Available` : "Quota Exhausted"}
          </span>
        </div>

        <p className="text-xs text-black/60 mb-5 leading-relaxed">
          Academy policy permits up to {maxHours} hours of studio production time per calendar week. The quota resets every Monday at 00:00 UTC.
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-black/70">Weekly Consumption</span>
            <span className="text-black/90 font-mono">
              {usedHours} / {maxHours} hrs ({percentage}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-black/[0.05] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage >= 100 ? "bg-red-600" : "bg-[#252724]"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/[0.06] text-center mb-6">
          <div className="p-2.5 rounded-xl bg-[#fbfbfa] border border-black/[0.04]">
            <span className="block text-lg font-bold font-mono text-black/90">
              {metrics?.activeBookingsCount ?? 0}
            </span>
            <span className="text-[11px] text-black/50 font-medium">Active</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#fbfbfa] border border-black/[0.04]">
            <span className="block text-lg font-bold font-mono text-black/90">
              {metrics?.completedBookingsCount ?? 0}
            </span>
            <span className="text-[11px] text-black/50 font-medium">Completed</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#fbfbfa] border border-black/[0.04]">
            <span className="block text-lg font-bold font-mono text-black/90">
              {metrics?.cancelledBookingsCount ?? 0}
            </span>
            <span className="text-[11px] text-black/50 font-medium">Cancelled</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Link
          href="/calendar"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium py-2.5 px-4 rounded-xl transition-colors shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Next Slot</span>
        </Link>
        <Link
          href="/my-bookings"
          className="inline-flex items-center justify-center gap-1.5 bg-[#fbfbfa] hover:bg-black/[0.05] text-black/80 text-xs font-medium py-2.5 px-4 rounded-xl border border-black/[0.08] transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3 text-black/40" />
        </Link>
      </div>
    </div>
  );
}
