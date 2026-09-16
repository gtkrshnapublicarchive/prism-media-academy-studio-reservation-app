import { Calendar, Package, FileCheck2, Key } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Select Room & Operational Slot",
    desc: "Browse live daily availability across Studio A, B, and C in fixed 2-hour production blocks.",
    icon: Calendar,
  },
  {
    step: "02",
    title: "Bundle Production Equipment",
    desc: "Attach optional Cinema Camera, Studio Strobe, or Audio Podcast packages directly to your reservation.",
    icon: Package,
  },
  {
    step: "03",
    title: "Sign Equipment Responsibility",
    desc: "Confirm semester terms and equipment care liability with our instant in-app digital sign-off.",
    icon: FileCheck2,
  },
  {
    step: "04",
    title: "Counter Handover with Voucher",
    desc: "Arrive at 14 Lumina Way front desk, present your digital voucher code, and collect inspected gear.",
    icon: Key,
  },
];

export function BookingWorkflowSection() {
  return (
    <section className="py-14 border-b border-black/[0.06]">
      <div className="mb-10 text-center max-w-xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-black/40">
          Seamless Student Access
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1c1d1a] tracking-tight mt-1">
          Four Steps to Production Ready
        </h2>
        <p className="text-xs text-black/60 mt-1">
          Designed to eliminate equipment chaos, paper binder checkouts, and room double-bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white border border-black/[0.08] rounded-3xl p-6 shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#eef2ec] text-[#5a8357] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-editorial text-xl font-bold text-black/20">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-editorial text-base font-semibold text-[#1c1d1a]">
                  {s.title}
                </h3>
                <p className="text-xs text-black/60 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-black/[0.04] text-[10px] uppercase font-semibold text-black/40 tracking-wider">
                Prism Academy Standard
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
