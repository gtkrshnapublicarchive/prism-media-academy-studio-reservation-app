export function FacilitySpecsMatrix() {
  const specs = [
    {
      feature: "Floor Area & Layout",
      studioA: "180 sq ft (Treated Booth)",
      studioB: "750 sq ft (Soundstage)",
      studioC: "320 sq ft (Tabletop Bay)",
    },
    {
      feature: "Acoustic Attenuation",
      studioA: "STC 58 (Floating Floor, Dual Glass)",
      studioB: "STC 45 (Baffled Wall Panels)",
      studioC: "STC 40 (Standard Isolation)",
    },
    {
      feature: "Ceiling & Rigging",
      studioA: "9 ft (Slat Acoustic Ceiling)",
      studioB: "16 ft (Overhead Steel Box Truss)",
      studioC: "11 ft (Wall Pantograph Boom Arms)",
    },
    {
      feature: "Power & DMX Infrastructure",
      studioA: "Isolated Clean Audio Circuit",
      studioB: "60A Dedicated Film Distribution",
      studioC: "30A High-Speed Strobe Circuit",
    },
    {
      feature: "Included Monitoring",
      studioA: "4x Studio Reference Headphones",
      studioB: "24-inch Color Calibrated Director Monitor",
      studioC: "Tethered iPad Pro Preview Stand",
    },
    {
      feature: "Max Crew Headcount",
      studioA: "4 Persons",
      studioB: "6 Persons",
      studioC: "4 Persons",
    },
  ];

  return (
    <section className="py-14 border-b border-black/[0.06]">
      <div className="mb-8">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-black/40">
          Engineering Specifications
        </span>
        <h2 className="font-editorial text-3xl font-semibold text-[#1c1d1a] tracking-tight mt-1">
          Facility Comparison Matrix
        </h2>
        <p className="text-xs text-black/60 mt-1">
          Technical specifications, electrical distributions, and acoustic certifications across all three production studios.
        </p>
      </div>

      <div className="bg-white border border-black/[0.08] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#fbfbfa] border-b border-black/[0.08]">
                <th className="py-4 px-6 font-semibold text-black/60 uppercase tracking-wider text-[11px]">
                  Technical Parameter
                </th>
                <th className="py-4 px-6 font-semibold text-[#1c1d1a] text-xs">
                  Studio A: Podcast Booth
                </th>
                <th className="py-4 px-6 font-semibold text-[#1c1d1a] text-xs bg-black/[0.01]">
                  Studio B: Green Screen VFX
                </th>
                <th className="py-4 px-6 font-semibold text-[#1c1d1a] text-xs">
                  Studio C: Product Studio
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {specs.map((row, idx) => (
                <tr key={idx} className="hover:bg-black/[0.01] transition-colors">
                  <td className="py-3.5 px-6 font-medium text-black/80">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-6 text-black/65">{row.studioA}</td>
                  <td className="py-3.5 px-6 text-black/65 bg-black/[0.01] font-medium">
                    {row.studioB}
                  </td>
                  <td className="py-3.5 px-6 text-black/65">{row.studioC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
