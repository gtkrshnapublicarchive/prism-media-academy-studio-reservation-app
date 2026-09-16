import { TechnicianProfileMetrics } from "../types/profile.types";
import { ClipboardCheck, CheckCircle2, AlertTriangle, Wrench } from "lucide-react";

interface TechnicianMetricsCardProps {
  metrics?: TechnicianProfileMetrics;
}

export function TechnicianMetricsCard({ metrics }: TechnicianMetricsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.08] p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center">
          <ClipboardCheck className="w-4 h-4" />
        </div>
        <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
          Laboratory Inspection Record
        </h3>
      </div>

      <p className="text-xs text-black/60 mb-5 leading-relaxed">
        Summary of equipment condition verifications logged by your staff badge and active facility status.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3.5 rounded-xl bg-[#fbfbfa] border border-black/[0.05]">
          <div className="flex items-center justify-between text-xs text-black/50 mb-1">
            <span>Total Inspected</span>
            <ClipboardCheck className="w-3.5 h-3.5 text-black/40" />
          </div>
          <div className="text-xl font-bold font-mono text-black/90">
            {metrics?.totalInspectionsLogged ?? 0}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#fbfbfa] border border-black/[0.05]">
          <div className="flex items-center justify-between text-xs text-black/50 mb-1">
            <span>Good Condition</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#344c32]" />
          </div>
          <div className="text-xl font-bold font-mono text-[#344c32]">
            {metrics?.inspectionsGoodCount ?? 0}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#fbfbfa] border border-black/[0.05]">
          <div className="flex items-center justify-between text-xs text-black/50 mb-1">
            <span>Damaged Flagged</span>
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
          </div>
          <div className="text-xl font-bold font-mono text-red-600">
            {metrics?.inspectionsDamagedCount ?? 0}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#fbfbfa] border border-black/[0.05]">
          <div className="flex items-center justify-between text-xs text-black/50 mb-1">
            <span>Kits Under Repair</span>
            <Wrench className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-600">
            {metrics?.damagedGearCount ?? 0}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs">
        <span className="text-black/60">Active Studio Rooms</span>
        <span className="font-semibold font-mono text-black/90">
          {metrics?.activeStudiosCount ?? 0} Available / {metrics?.maintenanceStudiosCount ?? 0} Maintenance
        </span>
      </div>
    </div>
  );
}
