import Image from "next/image";
import { Users, Volume2, Video, Camera, ArrowUpRight } from "lucide-react";

const STUDIOS_DATA = [
  {
    id: "studio-a",
    name: "Studio A",
    subtitle: "Podcast & Voice Booth",
    image: "/images/studio-a.jpg",
    tag: "Acoustic Isolation",
    capacity: 4,
    description:
      "Acoustically isolated studio suite lined with oak acoustic slat diffusers, engineered specifically for crystal-clear broadcast recording, panel discussions, ADR voiceover, and narrative audio drama mastering.",
    features: [
      "Floating floor & double-pane observation glass",
      "4-person oval conference desk with boom arms",
      "Low-noise Shure dynamic broadcast mics",
      "Multi-channel USB audio interface with discrete headphone mixes",
    ],
    idealFor: "Podcasts, Voiceover / ADR, Audiobooks, Interviews",
    icon: Volume2,
  },
  {
    id: "studio-b",
    name: "Studio B",
    subtitle: "Green Screen VFX Bay",
    image: "/images/studio-b.jpg",
    tag: "High Demand Bay",
    capacity: 6,
    description:
      "Our most contested facility featuring an 18-foot floor-to-ceiling curved cyclorama wall painted in chroma-key green, accompanied by an overhead steel truss lighting grid for uniform shadowless illumination.",
    features: [
      "Seamless curved cyclorama corner construction",
      "DMX overhead LED soft panel grid",
      "Floor camera track and heavy-duty dolly clearance",
      "Dedicated equipment staging and cable management racks",
    ],
    idealFor: "Virtual Production, VFX Compositing, Music Videos, Capstone Films",
    icon: Video,
  },
  {
    id: "studio-c",
    name: "Studio C",
    subtitle: "Product Photography Studio",
    image: "/images/studio-c.jpg",
    tag: "Infinity Sweep",
    capacity: 4,
    description:
      "A specialized still-life and tabletop commercial bay featuring a seamless white infinity backdrop cove, heavy-duty C-stands, dual 500W studio strobes, and precision lighting diffusers for commercial assignments.",
    features: [
      "White seamless cyclorama cove with high-gloss floor sweep",
      "Dual 500W studio strobes with quick-fold softboxes",
      "Adjustable glass shooting table for shadowless tabletop work",
      "Wireless flash transmitter and high-CRI continuous LED heads",
    ],
    idealFor: "Product Commercials, Stop-Motion, Tabletop Macro, Still Life",
    icon: Camera,
  },
];

export function StudiosShowcase() {
  return (
    <section id="studios" className="py-14 border-b border-black/[0.06]">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-black/40">
            Production Soundstages &amp; Bays
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1c1d1a] tracking-tight mt-1">
            Built for Academy Excellence
          </h2>
          <p className="text-xs text-black/60 mt-1 max-w-xl">
            Each studio is purpose-built to eliminate technical friction, giving student creators the exact environment required for course deliverables.
          </p>
        </div>
        <a
          href="#timetable"
          className="text-xs font-semibold text-black/80 hover:text-black flex items-center gap-1 group pb-1"
        >
          <span>View Real-Time Availability</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {STUDIOS_DATA.map((studio) => {
          const Icon = studio.icon;
          return (
            <div
              key={studio.id}
              className="group bg-white border border-black/[0.08] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Banner */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-black/[0.04]">
                <Image
                  src={studio.image}
                  alt={`${studio.name} ${studio.subtitle}`}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-300"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#fbfbfa]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-black/80 border border-black/[0.08]">
                    {studio.tag}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white flex items-center gap-1">
                    <Users className="w-3 h-3" /> Max {studio.capacity}
                  </span>
                </div>
              </div>

              {/* Studio Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#eef2ec] text-[#5a8357] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="font-editorial text-xl font-semibold text-[#1c1d1a] leading-none">
                        {studio.name}
                      </h3>
                      <p className="text-xs text-black/50 font-medium">{studio.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-black/65 mt-3 leading-relaxed">
                    {studio.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-black/[0.06] space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-black/40">
                      Key Facility Features:
                    </p>
                    {studio.features.map((feat, idx) => (
                      <div key={idx} className="text-xs text-black/70 flex items-start gap-2">
                        <span className="text-[#5a8357] font-bold text-xs mt-0.5">&bull;</span>
                        <span className="text-[11px]">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-black/40 uppercase tracking-wider block">
                      Best For:
                    </span>
                    <span className="text-[11px] font-medium text-black/80 truncate block max-w-[180px]">
                      {studio.idealFor}
                    </span>
                  </div>
                  <a
                    href="#timetable"
                    className="px-3.5 py-1.5 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium transition-colors"
                  >
                    Select Room
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
