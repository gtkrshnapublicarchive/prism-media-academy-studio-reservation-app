import { prisma } from "@/core/database/prisma";
import { BookingStatus, StudioStatus, GearKitStatus } from "@prisma/client";
import { OPERATIONAL_SLOTS, StudioScheduleView, GearKitSummary } from "../types/booking.types";

export async function getDailyStudioSchedules(targetDate: string): Promise<StudioScheduleView[]> {
  const studios = await prisma.studio.findMany({
    orderBy: { slug: "asc" },
  });

  const bookings = await prisma.booking.findMany({
    where: {
      date: targetDate,
      status: {
        in: [BookingStatus.BOOKED, BookingStatus.CHECKED_OUT],
      },
    },
    include: {
      user: { select: { name: true, studentId: true } },
      gearKit: { select: { name: true } },
    },
  });

  return studios.map((studio) => {
    const slots = OPERATIONAL_SLOTS.map((slotDef) => {
      if (studio.status === StudioStatus.MAINTENANCE) {
        return {
          slotLabel: slotDef.label,
          startTime: slotDef.startTime,
          endTime: slotDef.endTime,
          status: "MAINTENANCE" as const,
        };
      }

      const match = bookings.find(
        (b) => b.studioId === studio.id && b.startTime === slotDef.startTime
      );

      if (match) {
        return {
          slotLabel: slotDef.label,
          startTime: slotDef.startTime,
          endTime: slotDef.endTime,
          status: match.status === BookingStatus.CHECKED_OUT ? ("CHECKED_OUT" as const) : ("BOOKED" as const),
          bookingId: match.id,
          projectTitle: match.projectTitle,
          studentName: match.user.name,
          studentId: match.user.studentId ?? undefined,
          gearKitName: match.gearKit?.name ?? undefined,
        };
      }

      return {
        slotLabel: slotDef.label,
        startTime: slotDef.startTime,
        endTime: slotDef.endTime,
        status: "AVAILABLE" as const,
      };
    });

    return {
      id: studio.id,
      name: studio.name,
      slug: studio.slug,
      description: studio.description,
      capacity: studio.capacity,
      status: studio.status,
      slots,
    };
  });
}

export async function getAvailableGearKits(
  targetDate: string,
  startTime: string
): Promise<GearKitSummary[]> {
  const allKits = await prisma.gearKit.findMany({
    orderBy: { slug: "asc" },
  });

  const bookedKitIds = (
    await prisma.booking.findMany({
      where: {
        date: targetDate,
        startTime,
        status: { in: [BookingStatus.BOOKED, BookingStatus.CHECKED_OUT] },
        gearKitId: { not: null },
      },
      select: { gearKitId: true },
    })
  ).map((b) => b.gearKitId as string);

  return allKits.map((kit) => ({
    id: kit.id,
    name: kit.name,
    slug: kit.slug,
    description: kit.description,
    items: kit.items,
    status: kit.status,
    isAvailableForSlot:
      kit.status === GearKitStatus.AVAILABLE && !bookedKitIds.includes(kit.id),
  }));
}
