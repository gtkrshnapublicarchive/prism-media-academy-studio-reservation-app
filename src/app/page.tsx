import { HeroSection } from "@/features/landing/components/HeroSection";
import { StudiosShowcase } from "@/features/landing/components/StudiosShowcase";
import { GearPackagesSection } from "@/features/landing/components/GearPackagesSection";
import { FacilitySpecsMatrix } from "@/features/landing/components/FacilitySpecsMatrix";
import { BookingWorkflowSection } from "@/features/landing/components/BookingWorkflowSection";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* 1. Hero Presentation */}
      <HeroSection />

      {/* 2. Three Soundstages & Bays Showcase */}
      <StudiosShowcase />

      {/* 3. Production Gear Packages & Manifests */}
      <GearPackagesSection />

      {/* 4. Facility Engineering Specs & Comparison Matrix */}
      <FacilitySpecsMatrix />

      {/* 5. 4-Step Access & Booking Protocol */}
      <BookingWorkflowSection />

      {/* 6. High-Conversion Editorial CTA Banner */}
      <section className="pt-8 pb-12">
        <div className="bg-[#252724] text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#eef2ec]/70 block mb-2">
              Ready for Production
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Reserve Your Studio Slot
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
              Explore available 2-hour operational blocks across Studio A, B, and C. Attach 4K cinema gear, lighting strobes, or broadcast microphones with instant voucher confirmation.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/calendar"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#fbfbfa] text-[#252724] text-xs font-semibold transition-all shadow-md flex items-center gap-2 group"
            >
              <Calendar className="w-4 h-4 text-[#5a8357]" />
              <span>Open Studio Calendar</span>
              <ArrowRight className="w-4 h-4 text-[#252724]/50 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
