import { prisma } from "@/core/database/prisma";
import { UserRole, BookingStatus, InspectionCondition, StudioStatus, GearKitStatus } from "@prisma/client";
import { checkWeeklyQuota } from "@/features/bookings/services/quota.service";
import { FullUserProfile } from "../types/profile.types";

export async function getUserProfile(userId: string): Promise<FullUserProfile | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  const baseProfile: FullUserProfile = {
    id: user.id,
    email: user.email,
    name: user.name,
    studentId: user.studentId,
    role: user.role,
    department: user.department,
    phone: user.phone,
    station: user.station,
    shiftStatus: user.shiftStatus,
    bio: user.bio,
    safetySigned: user.safetySigned,
    notifySessionReminders: user.notifySessionReminders,
    notifyCancellationCutoff: user.notifyCancellationCutoff,
    notifyGearReady: user.notifyGearReady,
    createdAt: user.createdAt,
  };

  if (user.role === UserRole.STUDENT) {
    const todayStr = new Date().toISOString().split("T")[0];
    const quota = await checkWeeklyQuota(user.id, todayStr);

    const [activeBookingsCount, completedBookingsCount, cancelledBookingsCount] = await Promise.all([
      prisma.booking.count({
        where: {
          userId: user.id,
          status: { in: [BookingStatus.BOOKED, BookingStatus.CHECKED_OUT] },
        },
      }),
      prisma.booking.count({
        where: {
          userId: user.id,
          status: BookingStatus.RETURNED,
        },
      }),
      prisma.booking.count({
        where: {
          userId: user.id,
          status: BookingStatus.CANCELLED,
        },
      }),
    ]);

    baseProfile.studentMetrics = {
      usedHoursThisWeek: quota.usedHours,
      remainingHoursThisWeek: quota.remainingHours,
      maxWeeklyHours: quota.maxWeeklyHours,
      activeBookingsCount,
      completedBookingsCount,
      cancelledBookingsCount,
    };
  } else if (user.role === UserRole.TECHNICIAN) {
    const [
      totalInspectionsLogged,
      inspectionsGoodCount,
      inspectionsDamagedCount,
      activeStudiosCount,
      maintenanceStudiosCount,
      damagedGearCount,
    ] = await Promise.all([
      prisma.inspection.count({ where: { technicianId: user.id } }),
      prisma.inspection.count({
        where: { technicianId: user.id, condition: InspectionCondition.GOOD_CONDITION },
      }),
      prisma.inspection.count({
        where: { technicianId: user.id, condition: InspectionCondition.DAMAGE_FLAGGED },
      }),
      prisma.studio.count({ where: { status: StudioStatus.AVAILABLE } }),
      prisma.studio.count({ where: { status: StudioStatus.MAINTENANCE } }),
      prisma.gearKit.count({ where: { status: GearKitStatus.DAMAGED } }),
    ]);

    baseProfile.technicianMetrics = {
      totalInspectionsLogged,
      inspectionsGoodCount,
      inspectionsDamagedCount,
      activeStudiosCount,
      maintenanceStudiosCount,
      damagedGearCount,
    };
  }

  return baseProfile;
}
