import { getCurrentSession } from "@/features/auth/services/session.service";
import { getTechnicianMasterTimeline } from "@/features/inspections/services/tech_master.service";
import { TechnicianBoard } from "@/features/inspections/components/TechnicianBoard";
import { redirect } from "next/navigation";
import { CalendarDays } from "lucide-react";

interface TechnicianPageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function TechnicianPage({ searchParams }: TechnicianPageProps) {
  const session = await getCurrentSession();
  if (!session || session.role !== "TECHNICIAN") {
    redirect("/");
  }

  const resolvedParams = await searchParams;
  const todayStr = "2026-09-16";
  const selectedDate = resolvedParams.date || todayStr;

  const { timeline, gearKits } = await getTechnicianMasterTimeline(selectedDate);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              Restricted Operations Desk
            </span>
            <span className="text-xs text-black/40">&bull; Staff: {session.name}</span>
          </div>
          <h1 className="font-editorial text-3xl font-semibold text-[#1c1d1a] tracking-tight mt-1">
            Studio Master Timeline &amp; Gear Inspection
          </h1>
          <p className="text-xs text-black/60 mt-1">
            Handover gear packages, inspect returned studio equipment, and toggle maintenance states.
          </p>
        </div>

        {/* Date Filter */}
        <form method="get" className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-black/[0.08] shadow-2xs">
          <div className="flex items-center gap-2 px-3 py-1 text-xs text-black/60">
            <CalendarDays className="w-4 h-4 text-black/40" />
            <span className="font-medium">Shift Date:</span>
          </div>
          <input
            type="date"
            name="date"
            defaultValue={selectedDate}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#fbfbfa] border border-black/[0.06] focus:outline-hidden text-black/90 cursor-pointer"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Switch
          </button>
        </form>
      </div>

      <TechnicianBoard
        timeline={timeline}
        gearKits={gearKits}
        selectedDate={selectedDate}
      />
    </div>
  );
}
