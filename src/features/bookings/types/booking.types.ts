import { StudioStatus, GearKitStatus } from "@prisma/client";

export const OPERATIONAL_SLOTS = [
  { label: "08:00 - 10:00", startTime: "08:00", endTime: "10:00" },
  { label: "10:00 - 12:00", startTime: "10:00", endTime: "12:00" },
  { label: "12:00 - 14:00", startTime: "12:00", endTime: "14:00" },
  { label: "14:00 - 16:00", startTime: "14:00", endTime: "16:00" },
  { label: "16:00 - 18:00", startTime: "16:00", endTime: "18:00" },
  { label: "18:00 - 20:00", startTime: "18:00", endTime: "20:00" },
] as const;

export interface OperationalSlot {
  label: string;
  startTime: string;
  endTime: string;
}

export interface SlotAvailability {
  slotLabel: string;
  startTime: string;
  endTime: string;
  status: "AVAILABLE" | "BOOKED" | "CHECKED_OUT" | "MAINTENANCE";
  bookingId?: string;
  projectTitle?: string;
  studentName?: string;
  studentId?: string;
  gearKitName?: string;
}

export interface StudioScheduleView {
  id: string;
  name: string;
  slug: string;
  description: string;
  capacity: number;
  status: StudioStatus;
  slots: SlotAvailability[];
}

export interface GearKitSummary {
  id: string;
  name: string;
  slug: string;
  description: string;
  items: string[];
  status: GearKitStatus;
  isAvailableForSlot: boolean;
}
