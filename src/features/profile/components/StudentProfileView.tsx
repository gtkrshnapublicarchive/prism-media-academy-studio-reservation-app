import { FullUserProfile } from "../types/profile.types";
import { StudentQuotaCard } from "./StudentQuotaCard";
import { StudentSafetyCard } from "./StudentSafetyCard";
import { StudentEditForm } from "./StudentEditForm";
import { NotificationPreferencesForm } from "./NotificationPreferencesForm";
import { SecuritySettingsForm } from "./SecuritySettingsForm";

interface StudentProfileViewProps {
  profile: FullUserProfile;
}

export function StudentProfileView({ profile }: StudentProfileViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Role-Specific Status & Quota */}
      <div className="space-y-6 lg:col-span-1">
        <StudentQuotaCard metrics={profile.studentMetrics} />
        <StudentSafetyCard safetySigned={profile.safetySigned} />
      </div>

      {/* Right Column: Profile & Settings Forms */}
      <div className="space-y-6 lg:col-span-2">
        <StudentEditForm profile={profile} />
        <NotificationPreferencesForm profile={profile} />
        <SecuritySettingsForm />
      </div>
    </div>
  );
}
