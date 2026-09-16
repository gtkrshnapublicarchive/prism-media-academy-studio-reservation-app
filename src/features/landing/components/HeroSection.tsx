import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Calendar, ShieldCheck, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-4 pb-12 overflow-hidden border-b border-black/[0.06]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Editorial Copy */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef2ec] border border-black/[0.06] text-xs font-semibold text-[#5a8357] mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Production Facility &bull; 14 Lumina Way</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1c1d1a] tracking-tight leading-[1.08]">
            Where Vision Meets Production Grade.
          </h1>

          <p className="mt-5 text-sm sm:text-base text-black/65 leading-relaxed font-normal max-w-xl">
            Reserve acoustically isolated broadcast suites, full cyclorama green screen bays, and precision commercial tabletop studios with standardized 4K cinema gear kits. Built exclusively for Prism Media Academy creators.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/calendar"
              className="px-6 py-3 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium transition-all shadow-xs flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Production Slot</span>
            </Link>
            <a
              href="#studios"
              className="px-6 py-3 rounded-xl bg-white border border-black/[0.1] hover:border-black/30 text-black/80 hover:text-black text-xs font-medium transition-all shadow-2xs flex items-center gap-2"
            >
              <span>Explore Facilities</span>
              <ArrowDown className="w-3.5 h-3.5 text-black/40" />
            </a>
          </div>

          {/* Facility Highlights Bar */}
          <div className="mt-10 pt-6 border-t border-black/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <p className="font-editorial text-2xl font-bold text-[#1c1d1a]">3</p>
              <p className="text-[11px] font-medium text-black/50 mt-0.5">Dedicated Bays</p>
            </div>
            <div>
              <p className="font-editorial text-2xl font-bold text-[#1c1d1a]">4 hrs</p>
              <p className="text-[11px] font-medium text-black/50 mt-0.5">Weekly Student Quota</p>
            </div>
            <div>
              <p className="font-editorial text-2xl font-bold text-[#1c1d1a]">0 AUR</p>
              <p className="text-[11px] font-medium text-black/50 mt-0.5">Free for Coursework</p>
            </div>
            <div>
              <p className="font-editorial text-2xl font-bold text-[#1c1d1a]">6 Slots</p>
              <p className="text-[11px] font-medium text-black/50 mt-0.5">Daily 2-Hour Blocks</p>
            </div>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div className="relative w-full lg:w-[480px] shrink-0">
          <div className="relative rounded-3xl overflow-hidden border border-black/[0.1] shadow-xl bg-black/[0.03] aspect-4/3 sm:aspect-16/10">
            <Image
              src="/images/gear-hero.jpg"
              alt="Prism Media Academy Gear Desk and Cinema Package"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-semibold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white inline-block mb-1.5">
                Front Counter Gear Bench
              </span>
              <p className="text-xs font-medium text-white/90">
                Inspected cinema camera packages, lighting diffusers, and audio interfaces ready for student checkout.
              </p>
            </div>
          </div>

          {/* Floating Live Badge */}
          <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-black/[0.08] p-3 rounded-2xl shadow-md flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#e7f2e4] text-[#5a8357] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-black/90">Direct Reservation</p>
              <p className="text-[10px] text-black/50">Instant Voucher Issuance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
