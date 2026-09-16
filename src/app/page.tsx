import { getCurrentSession } from "@/features/auth/services/session.service";
import { getDailyStudioSchedules, getAvailableGearKits } from "@/features/bookings/services/schedule.service";
import { checkWeeklyQuota } from "@/features/bookings/services/quota.service";
import { ScheduleGrid } from "@/features/bookings/components/ScheduleGrid";
import { DatePicker } from "@/shared/components/DatePicker";

interface HomePageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
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
          <span className="text-[11px] font-semibold uppercase tracking-wider text-black/40">
            Production Facility Timetable
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1c1d1a] tracking-tight mt-1">
            Studio Reservations
          </h1>
          <p className="text-xs text-black/60 mt-1 max-w-xl">
            Book 2-hour production blocks across Studio A, B, and C with optional camera, lighting, and audio packages.
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
