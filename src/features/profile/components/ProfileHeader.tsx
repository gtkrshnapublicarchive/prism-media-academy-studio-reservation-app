import { FullUserProfile } from "../types/profile.types";
import { ShieldCheck, UserCheck, Mail, Hash, Phone, Building } from "lucide-react";

interface ProfileHeaderProps {
  profile: FullUserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const isStudent = profile.role === "STUDENT";
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-[#252724] text-white flex items-center justify-center text-2xl font-editorial font-bold shadow-xs shrink-0">
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1c1d1a] tracking-tight">
              {profile.name}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isStudent
                  ? "bg-[#eef2ec] text-[#344c32] border border-[#d6e3d2]"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
              }`}
            >
              {isStudent ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Student Creator</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Shift Lab Technician</span>
                </>
              )}
            </span>
          </div>

          <p className="text-sm text-black/60 mb-4 max-w-2xl leading-relaxed">
            {profile.bio ||
              (isStudent
                ? "Enrolled creative student at Prism Media Academy."
                : "Active laboratory technician managing studio operations and equipment returns.")}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-black/70">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-black/40" />
              <span>{profile.email}</span>
            </div>
            {profile.studentId && (
              <div className="flex items-center gap-1.5 font-mono">
                <Hash className="w-3.5 h-3.5 text-black/40" />
                <span>{profile.studentId}</span>
              </div>
            )}
            {profile.department && (
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-black/40" />
                <span>{profile.department}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-black/40" />
                <span>{profile.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
