import { prisma } from "@/core/database/prisma";
import { OPERATIONAL_SLOTS } from "@/features/bookings/types/booking.types";
import { BookingStatus } from "@prisma/client";

export async function getTechnicianMasterTimeline(targetDate: string) {
  const studios = await prisma.studio.findMany({
    orderBy: { slug: "asc" },
  });

  const bookings = await prisma.booking.findMany({
    where: { date: targetDate },
    include: {
      user: { select: { name: true, studentId: true, email: true } },
      gearKit: { select: { id: true, name: true, items: true, status: true } },
      inspection: true,
    },
  });

  const gearKits = await prisma.gearKit.findMany({
    orderBy: { slug: "asc" },
  });

  const timeline = studios.map((studio) => {
    const slots = OPERATIONAL_SLOTS.map((slotDef) => {
      const match = bookings.find(
        (b) => b.studioId === studio.id && b.startTime === slotDef.startTime && b.status !== BookingStatus.CANCELLED
      );

      return {
        slotLabel: slotDef.label,
        startTime: slotDef.startTime,
        endTime: slotDef.endTime,
        studioStatus: studio.status,
        booking: match
          ? {
              id: match.id,
              voucherCode: match.voucherCode,
              status: match.status,
              studentName: match.user.name,
              studentId: match.user.studentId,
              studentEmail: match.user.email,
              projectTitle: match.projectTitle,
              crewSize: match.crewSize,
              gearKitId: match.gearKitId,
              gearKitName: match.gearKit?.name,
              gearKitStatus: match.gearKit?.status,
              inspection: match.inspection,
            }
          : null,
      };
    });

    return {
      studio,
      slots,
    };
  });

  return {
    timeline,
    gearKits,
  };
}
