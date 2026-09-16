import { prisma } from "@/core/database/prisma";
import { BookingStatus } from "@prisma/client";

export interface QuotaStatus {
  weekStart: string;
  weekEnd: string;
  usedHours: number;
  remainingHours: number;
  canBook: boolean;
  maxWeeklyHours: number;
}

export function getWeekRange(dateStr: string): { weekStart: string; weekEnd: string } {
  const d = new Date(dateStr + "T00:00:00Z");
  const day = d.getUTCDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  return {
    weekStart: monday.toISOString().split("T")[0],
    weekEnd: sunday.toISOString().split("T")[0],
  };
}

export async function checkWeeklyQuota(userId: string, targetDate: string): Promise<QuotaStatus> {
  const { weekStart, weekEnd } = getWeekRange(targetDate);

  const activeBookings = await prisma.booking.findMany({
    where: {
      userId,
      date: {
        gte: weekStart,
        lte: weekEnd,
      },
      status: {
        in: [BookingStatus.BOOKED, BookingStatus.CHECKED_OUT],
      },
    },
    select: { id: true },
  });

  const usedHours = activeBookings.length * 2;
  const maxWeeklyHours = 4;
  const remainingHours = Math.max(0, maxWeeklyHours - usedHours);
  const canBook = remainingHours >= 2;

  return {
    weekStart,
    weekEnd,
    usedHours,
    remainingHours,
    canBook,
    maxWeeklyHours,
  };
}
