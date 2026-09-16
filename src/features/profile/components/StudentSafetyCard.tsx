import { ShieldCheck, FileText } from "lucide-react";

interface StudentSafetyCardProps {
  safetySigned: boolean;
}

export function StudentSafetyCard({ safetySigned }: StudentSafetyCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.08] p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#eef2ec] text-[#344c32] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
            Equipment Care &amp; Safety
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#eef2ec] text-[#344c32] border border-[#d6e3d2]">
          {safetySigned ? "Certified Active" : "Pending Sign-off"}
        </span>
      </div>

      <p className="text-xs text-black/60 mb-4 leading-relaxed">
        All enrolled students are certified to check out high-value cinema camera, lighting, and audio packages under the Academy Studio Care Agreement.
      </p>

      <div className="space-y-2.5 text-xs text-black/75 mb-5 bg-[#fbfbfa] p-4 rounded-xl border border-black/[0.05]">
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#344c32] mt-1.5 shrink-0" />
          <span>Mandatory 4-hour cancellation cutoff before session start time.</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#344c32] mt-1.5 shrink-0" />
          <span>In-person gear counter return inspection required within 15 minutes of slot end.</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#344c32] mt-1.5 shrink-0" />
          <span>Safety deposit liability applies to unflagged equipment mishandling or missing accessories.</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-black/50">
        <FileText className="w-3.5 h-3.5 text-black/40" />
        <span>Academic Year 2026/2027 Policy Agreement</span>
      </div>
    </div>
  );
}
