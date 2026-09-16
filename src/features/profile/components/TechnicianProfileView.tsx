import { FullUserProfile } from "../types/profile.types";
import { TechnicianShiftCard } from "./TechnicianShiftCard";
import { TechnicianMetricsCard } from "./TechnicianMetricsCard";
import { TechnicianEditForm } from "./TechnicianEditForm";
import { NotificationPreferencesForm } from "./NotificationPreferencesForm";
import { SecuritySettingsForm } from "./SecuritySettingsForm";

interface TechnicianProfileViewProps {
  profile: FullUserProfile;
}

export function TechnicianProfileView({ profile }: TechnicianProfileViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Shift Status & Metrics */}
      <div className="space-y-6 lg:col-span-1">
        <TechnicianShiftCard
          station={profile.station}
          shiftStatus={profile.shiftStatus}
        />
        <TechnicianMetricsCard metrics={profile.technicianMetrics} />
      </div>

      {/* Right Column: Profile & Settings Forms */}
      <div className="space-y-6 lg:col-span-2">
        <TechnicianEditForm profile={profile} />
        <NotificationPreferencesForm profile={profile} />
        <SecuritySettingsForm />
      </div>
    </div>
  );
}
