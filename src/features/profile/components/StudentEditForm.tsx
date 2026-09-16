"use client";

import { useState, useTransition } from "react";
import { updateProfileAction } from "../actions/update_profile.action";
import { FullUserProfile } from "../types/profile.types";
import { ProfileFormField, VerifiedField } from "./ProfileFormField";
import { User, Building, Phone, AlignLeft, CheckCircle2, AlertCircle } from "lucide-react";

interface StudentEditFormProps {
  profile: FullUserProfile;
}

const DEPARTMENTS = [
  "Film & Television Production",
  "Digital VFX & Virtual Production",
  "Audio Engineering & Sound Design",
  "Commercial & Fashion Photography",
  "Documentaries & Broadcast Journalism",
];

export function StudentEditForm({ profile }: StudentEditFormProps) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateProfileAction(formData);
      if (res.success) {
        setFeedback({ type: "success", message: "Academic profile updated successfully." });
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to update profile." });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-8 shadow-xs">
      <div className="mb-6 pb-4 border-b border-black/[0.06]">
        <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
          Academic &amp; Creator Details
        </h3>
        <p className="text-xs text-black/50 mt-0.5">
          Manage your student identity, enrolled department track, and contact coordinates.
        </p>
      </div>

      {feedback && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-2.5 ${
            feedback.type === "success"
              ? "bg-[#eef2ec] text-[#344c32] border border-[#d6e3d2]"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ProfileFormField label="Full Legal / Credit Name" icon={<User className="w-4 h-4" />}>
            <input
              type="text"
              name="name"
              defaultValue={profile.name}
              required
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#fbfbfa] border border-black/10 rounded-xl text-sm text-black/90 focus:outline-none focus:border-black/30"
            />
          </ProfileFormField>

          <ProfileFormField label="Enrolled Department" icon={<Building className="w-4 h-4" />}>
            <select
              name="department"
              defaultValue={profile.department || DEPARTMENTS[0]}
              className="w-full pl-10 pr-8 py-2.5 bg-[#fbfbfa] border border-black/10 rounded-xl text-sm text-black/90 focus:outline-none focus:border-black/30 appearance-none cursor-pointer"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-black/40 text-xs">▼</div>
          </ProfileFormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <VerifiedField label="Academy Email (Verified)" value={profile.email} />
          <VerifiedField label="Student ID (Verified)" value={profile.studentId || "N/A"} mono />
        </div>

        <ProfileFormField
          label="Contact Phone Number"
          icon={<Phone className="w-4 h-4" />}
          hint="Used by studio technicians for equipment return alerts and room readiness."
        >
          <input
            type="text"
            name="phone"
            defaultValue={profile.phone || ""}
            placeholder="+1 (555) 000-0000"
            className="w-full pl-10 pr-3.5 py-2.5 bg-[#fbfbfa] border border-black/10 rounded-xl text-sm text-black/90 focus:outline-none focus:border-black/30"
          />
        </ProfileFormField>

        <div>
          <label className="block text-xs font-medium text-black/70 mb-1.5">
            Creative Bio / Production Statement
          </label>
          <div className="relative">
            <AlignLeft className="w-4 h-4 text-black/30 absolute left-3.5 top-3" />
            <textarea
              name="bio"
              rows={3}
              defaultValue={profile.bio || ""}
              placeholder="Brief summary of your active media coursework or focus..."
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#fbfbfa] border border-black/10 rounded-xl text-sm text-black/90 focus:outline-none focus:border-black/30 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium py-2.5 px-6 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Saving..." : "Save Academic Details"}
          </button>
        </div>
      </form>
    </div>
  );
}
