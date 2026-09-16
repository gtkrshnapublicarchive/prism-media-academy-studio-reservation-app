"use client";

import { useState, useTransition } from "react";
import { updatePreferencesAction } from "../actions/update_preferences.action";
import { FullUserProfile } from "../types/profile.types";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { RoundCheckbox } from "@/shared/components/RoundCheckbox";

interface NotificationPreferencesFormProps {
  profile: FullUserProfile;
}

export function NotificationPreferencesForm({ profile }: NotificationPreferencesFormProps) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updatePreferencesAction(formData);
      if (res.success) {
        setFeedback({ type: "success", message: "Notification preferences updated." });
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to update preferences." });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
        <div>
          <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
            Notification &amp; Alert Preferences
          </h3>
          <p className="text-xs text-black/50 mt-0.5">
            Configure automated system alerts for studio sessions and gear handovers.
          </p>
        </div>
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

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="p-3.5 rounded-xl border border-black/[0.06] hover:bg-black/[0.01] transition-colors">
          <RoundCheckbox
            name="notifySessionReminders"
            defaultChecked={profile.notifySessionReminders}
            label="Session Reminder (2 Hours Prior)"
            description="Receive an automated reminder with studio door code before your booking start."
            className="w-full"
          />
        </div>

        <div className="p-3.5 rounded-xl border border-black/[0.06] hover:bg-black/[0.01] transition-colors">
          <RoundCheckbox
            name="notifyCancellationCutoff"
            defaultChecked={profile.notifyCancellationCutoff}
            label="4-Hour Cancellation Deadline Warning"
            description="Alert sent 30 minutes before the 4-hour self-service cancellation window closes."
            className="w-full"
          />
        </div>

        <div className="p-3.5 rounded-xl border border-black/[0.06] hover:bg-black/[0.01] transition-colors">
          <RoundCheckbox
            name="notifyGearReady"
            defaultChecked={profile.notifyGearReady}
            label="Gear Kit Counter Staging Alert"
            description="Notification when the shift technician stages your reserved equipment at the counter."
            className="w-full"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium py-2.5 px-6 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Saving..." : "Save Notification Preferences"}
          </button>
        </div>
      </form>
    </div>
  );
}
