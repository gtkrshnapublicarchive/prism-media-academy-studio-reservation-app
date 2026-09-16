"use server";

import { prisma } from "@/core/database/prisma";
import { getCurrentSession } from "@/features/auth/services/session.service";
import { BookingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function checkoutSessionAction(bookingId: string) {
  const session = await getCurrentSession();
  if (!session || session.role !== "TECHNICIAN") {
    return { success: false, error: "Unauthorized: Technician credentials required." };
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    return { success: false, error: "Booking record not found." };
  }

  if (booking.status !== BookingStatus.BOOKED) {
    return { success: false, error: `Cannot checkout session in ${booking.status} status.` };
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.CHECKED_OUT },
  });

  revalidatePath("/technician");
  revalidatePath("/");
  revalidatePath("/calendar");
  return { success: true };
}
