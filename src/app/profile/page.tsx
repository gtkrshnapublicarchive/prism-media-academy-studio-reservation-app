import { redirect } from "next/navigation";
import { getCurrentSession } from "@/features/auth/services/session.service";
import { getUserProfile } from "@/features/profile/services/profile.service";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { StudentProfileView } from "@/features/profile/components/StudentProfileView";
import { TechnicianProfileView } from "@/features/profile/components/TechnicianProfileView";

export const metadata = {
  title: "Profile & Account Settings | Prism Media Academy",
  description: "Manage your academy credentials, production track, quota limits, and system alerts.",
};

export default async function ProfilePage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }

  const profile = await getUserProfile(session.userId);
  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="space-y-8 pb-12">
      <ProfileHeader profile={profile} />

      {profile.role === "STUDENT" ? (
        <StudentProfileView profile={profile} />
      ) : (
        <TechnicianProfileView profile={profile} />
      )}
    </div>
  );
}
