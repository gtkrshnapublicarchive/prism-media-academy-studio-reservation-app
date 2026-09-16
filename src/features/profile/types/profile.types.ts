import { UserRole } from "@prisma/client";

export interface StudentProfileMetrics {
  usedHoursThisWeek: number;
  remainingHoursThisWeek: number;
  maxWeeklyHours: number;
  activeBookingsCount: number;
  completedBookingsCount: number;
  cancelledBookingsCount: number;
}

export interface TechnicianProfileMetrics {
  totalInspectionsLogged: number;
  inspectionsGoodCount: number;
  inspectionsDamagedCount: number;
  activeStudiosCount: number;
  maintenanceStudiosCount: number;
  damagedGearCount: number;
}

export interface FullUserProfile {
  id: string;
  email: string;
  name: string;
  studentId: string | null;
  role: UserRole;
  department: string | null;
  phone: string | null;
  station: string | null;
  shiftStatus: string | null;
  bio: string | null;
  safetySigned: boolean;
  notifySessionReminders: boolean;
  notifyCancellationCutoff: boolean;
  notifyGearReady: boolean;
  createdAt: Date;
  studentMetrics?: StudentProfileMetrics;
  technicianMetrics?: TechnicianProfileMetrics;
}

export interface UpdateProfileInput {
  name: string;
  department?: string;
  phone?: string;
  bio?: string;
  station?: string;
  shiftStatus?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePreferencesInput {
  notifySessionReminders: boolean;
  notifyCancellationCutoff: boolean;
  notifyGearReady: boolean;
  safetySigned?: boolean;
}
