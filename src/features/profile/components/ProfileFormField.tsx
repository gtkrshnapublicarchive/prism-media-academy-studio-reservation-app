import { ReactNode } from "react";
import { Lock } from "lucide-react";

interface ProfileFormFieldProps {
  label: string;
  icon?: ReactNode;
  hint?: string;
  children: ReactNode;
}

export function ProfileFormField({ label, icon, hint, children }: ProfileFormFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-black/70 mb-1.5">{label}</label>
      <div className="relative">
        {icon && (
          <div className="w-4 h-4 text-black/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        {children}
      </div>
      {hint && <p className="text-[11px] text-black/45 mt-1">{hint}</p>}
    </div>
  );
}

export function VerifiedField({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <ProfileFormField label={label} icon={<Lock className="w-4 h-4 text-black/30" />}>
      <input
        type="text"
        value={value}
        disabled
        className={`w-full pl-10 pr-3.5 py-2.5 bg-black/[0.03] border border-black/5 rounded-xl text-sm text-black/50 cursor-not-allowed ${
          mono ? "font-mono" : ""
        }`}
      />
    </ProfileFormField>
  );
}
