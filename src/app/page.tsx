import { getCurrentSession } from "@/features/auth/services/session.service";
import { getDailyStudioSchedules, getAvailableGearKits } from "@/features/bookings/services/schedule.service";
import { checkWeeklyQuota } from "@/features/bookings/services/quota.service";
import { ScheduleGrid } from "@/features/bookings/components/ScheduleGrid";
import { DatePicker } from "@/shared/components/DatePicker";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { StudiosShowcase } from "@/features/landing/components/StudiosShowcase";
import { GearPackagesSection } from "@/features/landing/components/GearPackagesSection";
import { FacilitySpecsMatrix } from "@/features/landing/components/FacilitySpecsMatrix";
import { BookingWorkflowSection } from "@/features/landing/components/BookingWorkflowSection";
import { Calendar } from "lucide-react";

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
    <div className="space-y-4">
      {/* 1. Hero Presentation */}
      <HeroSection />

      {/* 2. Three Soundstages & Bays In-Depth Showcase */}
      <StudiosShowcase />

      {/* 3. Production Gear Packages & Manifests */}
      <GearPackagesSection />

      {/* 4. Facility Engineering Specs & Comparison Matrix */}
      <FacilitySpecsMatrix />

      {/* 5. 4-Step Access & Booking Protocol */}
      <BookingWorkflowSection />

      {/* 6. Live Interactive Timetable & Reservation Engine */}
      <section id="timetable" className="pt-12 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#eef2ec] text-[#5a8357] text-[11px] font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Live Operational Schedule</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1c1d1a] tracking-tight">
              Reserve a Production Slot
            </h2>
            <p className="text-xs text-black/60 mt-1 max-w-xl">
              Select an available 2-hour block across Studio A, B, or C. Attach production kits and receive your instant check-in voucher.
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
      </section>
    </div>
  );
}
