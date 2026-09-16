"use server";

import { prisma } from "@/core/database/prisma";
import { getCurrentSession } from "@/features/auth/services/session.service";
import { CreateBookingSchema } from "../schemas/booking.schema";
import { getWeekRange } from "../services/quota.service";
import { BookingStatus, StudioStatus, GearKitStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface CreateBookingResult {
  success: boolean;
  error?: string;
  voucherCode?: string;
  bookingId?: string;
}

export async function createBookingAction(
  rawInput: unknown
): Promise<CreateBookingResult> {
  const session = await getCurrentSession();
  if (!session || session.role !== "STUDENT") {
    return { success: false, error: "Authentication required to book studio sessions." };
  }

  const parsed = CreateBookingSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid booking data." };
  }

  const { studioId, gearKitId, date, startTime, endTime, projectTitle, crewSize, agreementSigned } =
    parsed.data;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Quota Guard inside transaction
      const { weekStart, weekEnd } = getWeekRange(date);
      const studentActiveBookings = await tx.booking.count({
        where: {
          userId: session.userId,
          date: { gte: weekStart, lte: weekEnd },
          status: { in: [BookingStatus.BOOKED, BookingStatus.CHECKED_OUT] },
        },
      });

      const usedHours = studentActiveBookings * 2;
      if (usedHours + 2 > 4) {
        throw new Error(
          "Weekly quota exceeded: Students are permitted a maximum of 4 studio hours per calendar week."
        );
      }

      // 2. Studio Status Guard
      const studio = await tx.studio.findUnique({
        where: { id: studioId },
      });
      if (!studio || studio.status === StudioStatus.MAINTENANCE) {
        throw new Error("Target studio is currently under maintenance or unavailable.");
      }

      // 3. Studio Slot Collision Guard
      const existingStudioBooking = await tx.booking.findFirst({
        where: {
          studioId,
          date,
          startTime,
          status: { in: [BookingStatus.BOOKED, BookingStatus.CHECKED_OUT] },
        },
      });
      if (existingStudioBooking) {
        throw new Error("This studio time slot is already reserved.");
      }

      // 4. Gear Kit Collision Guard (if gear kit requested)
      if (gearKitId) {
        const gearKit = await tx.gearKit.findUnique({
          where: { id: gearKitId },
        });
        if (!gearKit || gearKit.status !== GearKitStatus.AVAILABLE) {
          throw new Error("Selected gear kit is currently unavailable or under maintenance.");
        }

        const existingKitBooking = await tx.booking.findFirst({
          where: {
            gearKitId,
            date,
            startTime,
            status: { in: [BookingStatus.BOOKED, BookingStatus.CHECKED_OUT] },
          },
        });
        if (existingKitBooking) {
          throw new Error("Selected gear kit is already allocated to another studio during this slot.");
        }
      }

      // 5. Voucher Code Generation
      const randomSegment = Math.random().toString(36).substring(2, 7).toUpperCase();
      const voucherCode = `PRISM-${date.replace(/-/g, "")}-${randomSegment}`;

      // 6. Create Booking
      const booking = await tx.booking.create({
        data: {
          voucherCode,
          userId: session.userId,
          studioId,
          gearKitId: gearKitId || null,
          date,
          startTime,
          endTime,
          projectTitle,
          crewSize,
          agreementSigned,
          status: BookingStatus.BOOKED,
        },
      });

      return { voucherCode, bookingId: booking.id };
    });

    revalidatePath("/");
    revalidatePath("/my-bookings");
    return { success: true, ...result };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Reservation transaction failed.";
    return { success: false, error: message };
  }
}
