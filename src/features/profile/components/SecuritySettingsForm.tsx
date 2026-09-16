"use client";

import { useState, useTransition, useRef } from "react";
import { changePasswordAction } from "../actions/change_password.action";
import { KeyRound, CheckCircle2, AlertCircle } from "lucide-react";

export function SecuritySettingsForm() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await changePasswordAction(formData);
      if (res.success) {
        setFeedback({ type: "success", message: "Password updated successfully." });
        formRef.current?.reset();
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to update password." });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
        <div>
          <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
            Security &amp; Password
          </h3>
          <p className="text-xs text-black/50 mt-0.5">
            Update your academy sign-in credentials. Passwords must be at least 8 characters.
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

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-black/70 mb-1.5">
            Current Password
          </label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-black/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              name="currentPassword"
              required
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#fbfbfa] border border-black/10 rounded-xl text-sm text-black/90 focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-black/70 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              required
              minLength={8}
              placeholder="Minimum 8 characters"
              className="w-full px-3.5 py-2.5 bg-[#fbfbfa] border border-black/10 rounded-xl text-sm text-black/90 focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/10"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-black/70 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              minLength={8}
              placeholder="Re-type new password"
              className="w-full px-3.5 py-2.5 bg-[#fbfbfa] border border-black/10 rounded-xl text-sm text-black/90 focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/10"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium py-2.5 px-6 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
