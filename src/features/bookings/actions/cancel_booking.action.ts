"use server";

import { prisma } from "@/core/database/prisma";
import { getCurrentSession } from "@/features/auth/services/session.service";
import { BookingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface CancelBookingResult {
  success: boolean;
  error?: string;
}

export async function cancelBookingAction(bookingId: string): Promise<CancelBookingResult> {
  const session = await getCurrentSession();
  if (!session || session.role !== "STUDENT") {
    return { success: false, error: "Authentication required to cancel reservations." };
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  // Anti-IDOR Protection: PRD 6.2 (return generic 404/not found)
  if (!booking || booking.userId !== session.userId) {
    return { success: false, error: "Reservation record not found." };
  }

  if (booking.status !== BookingStatus.BOOKED) {
    return { success: false, error: `Cannot cancel reservation in ${booking.status} state.` };
  }

  // 4-Hour Deadline Verification: PRD 5.1 #4 & 8 #2
  // Parse session start timestamp in UTC/local consistent manner
  const sessionStartMs = new Date(`${booking.date}T${booking.startTime}:00`).getTime();
  const nowMs = Date.now();
  const diffHours = (sessionStartMs - nowMs) / (1000 * 60 * 60);

  if (diffHours < 4) {
    return {
      success: false,
      error:
        "Cancellations under 4 hours before session start are locked. Please contact lab technicians at the gear desk in person.",
    };
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.CANCELLED },
  });

  revalidatePath("/");
  revalidatePath("/calendar");
  revalidatePath("/my-bookings");
  return { success: true };
}
