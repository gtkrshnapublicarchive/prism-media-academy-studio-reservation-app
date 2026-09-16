import { Camera, Sun, Mic2, ShieldCheck, CheckCircle2 } from "lucide-react";

const KITS = [
  {
    title: "Cinema Camera Kit",
    subtitle: "Narrative & Commercial Cine Package",
    icon: Camera,
    items: [
      "4K Digital Cinema Camera Body",
      "35mm T1.5 High-Speed Prime Lens",
      "Heavy-Duty Fluid Head Tripod",
      "2x 128GB High-Speed CFast Memory Cards",
      "2x V-Mount High-Capacity Batteries & Dual Charger",
    ],
    recommendedStudio: "Studio B (Green Screen) or Studio C",
  },
  {
    title: "Studio Lighting Strobe Kit",
    subtitle: "High-Output Strobe & Grip Package",
    icon: Sun,
    items: [
      "2x 500W Monolight Studio Strobe Heads",
      "2x Quick-Fold Recessed Softboxes with Grids",
      "2x Heavy Steel C-Stands with Grip Arms & Gobo Heads",
      "Multi-Channel Wireless Flash Trigger Transmitter",
      "Large Translucent Fabric Diffusion Panel",
    ],
    recommendedStudio: "Studio C (Product Photography)",
  },
  {
    title: "Audio Podcast Kit",
    subtitle: "Multi-Microphone Broadcast Vocal Package",
    icon: Mic2,
    items: [
      "4x Shure Dynamic Broadcast Microphones",
      "4-Channel Low-Noise USB Audio Interface",
      "4x Spring-Loaded Articulating Boom Arms",
      "4x Heavy-Shielded Balanced XLR Cables",
      "4x Closed-Back Studio Monitor Headphones",
    ],
    recommendedStudio: "Studio A (Podcast Booth)",
  },
];

export function GearPackagesSection() {
  return (
    <section className="py-14 border-b border-black/[0.06]">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-black/40">
            Bundled Equipment Inventory
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1c1d1a] tracking-tight mt-1">
            Pre-Calibrated Production Kits
          </h2>
          <p className="text-xs text-black/60 mt-1 max-w-xl">
            Gear is reserved in verified complete kits to ensure you arrive at your session with every adapter, battery, and cable accounted for.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#5a8357] font-semibold bg-[#e7f2e4] px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4" />
          <span>Bench Inspected Before Every Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {KITS.map((kit, idx) => {
          const Icon = kit.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-black/[0.08] rounded-3xl p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-[#252724] text-white flex items-center justify-center shadow-2xs">
                    <Icon className="w-4 h-4 text-[#eef2ec]" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a] leading-tight">
                      {kit.title}
                    </h3>
                    <p className="text-[11px] text-black/50 font-medium">{kit.subtitle}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">
                    Included Kit Manifest:
                  </p>
                  <ul className="space-y-1.5 text-xs text-black/75">
                    {kit.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5a8357] shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px]">
                <span className="text-black/40">Paired Facility:</span>
                <span className="font-medium text-black/80 text-right">{kit.recommendedStudio}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
