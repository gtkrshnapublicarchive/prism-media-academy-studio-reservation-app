import { getCurrentSession } from "@/features/auth/services/session.service";
import { getDailyStudioSchedules, getAvailableGearKits } from "@/features/bookings/services/schedule.service";
import { checkWeeklyQuota } from "@/features/bookings/services/quota.service";
import { ScheduleGrid } from "@/features/bookings/components/ScheduleGrid";
import { DatePicker } from "@/shared/components/DatePicker";
import { Calendar } from "lucide-react";

interface CalendarPageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function CalendarPage({ searchParams }: CalendarPageProps) {
  const resolvedParams = await searchParams;
  const todayStr = "2026-09-16";
  const selectedDate = resolvedParams.date || todayStr;

  const session = await getCurrentSession();
  const isStudent = session?.role === "STUDENT";

  const [schedules, gearKits, quotaStatus] = await Promise.all([
    getDailyStudioSchedules(selectedDate),
    getAvailableGearKits(selectedDate, "08:00"),
    session && isStudent ? checkWeeklyQuota(session.userId, selectedDate) : null,
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#eef2ec] text-[#5a8357] text-[11px] font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Facility Schedule Browser</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1c1d1a] tracking-tight">
            Studio Reservations
          </h1>
          <p className="text-xs text-black/60 mt-1 max-w-xl">
            View real-time daily availability across Studio A, B, and C in fixed 2-hour operational blocks. Select any available slot to attach equipment packages and reserve your session.
          </p>
        </div>

        <DatePicker currentDate={selectedDate} />
      </div>

      <ScheduleGrid
        initialSchedules={schedules}
        gearKits={gearKits}
        selectedDate={selectedDate}
        isStudent={isStudent}
        quotaStatus={quotaStatus}
      />
    </div>
  );
}
