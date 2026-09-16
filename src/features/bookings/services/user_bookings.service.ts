import { prisma } from "@/core/database/prisma";
import { BookingStatus } from "@prisma/client";

export async function getUserBookings(userId: string) {
  const now = Date.now();
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: {
      studio: { select: { name: true, slug: true } },
      gearKit: { select: { name: true, items: true } },
      inspection: { select: { condition: true, notes: true, inspectedAt: true } },
    },
    orderBy: [{ date: "desc" }, { startTime: "desc" }],
  });

  return bookings.map((b) => {
    const sessionStartMs = new Date(`${b.date}T${b.startTime}:00`).getTime();
    const diffHours = (sessionStartMs - now) / (1000 * 60 * 60);
    const canCancel = b.status === BookingStatus.BOOKED && diffHours >= 4;

    return {
      ...b,
      canCancel,
    };
  });
}
