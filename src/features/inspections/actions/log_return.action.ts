"use server";

import { prisma } from "@/core/database/prisma";
import { getCurrentSession } from "@/features/auth/services/session.service";
import { BookingStatus, InspectionCondition, GearKitStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface LogReturnInput {
  bookingId: string;
  condition: InspectionCondition;
  notes?: string;
}

export async function logReturnAction(input: LogReturnInput) {
  const session = await getCurrentSession();
  if (!session || session.role !== "TECHNICIAN") {
    return { success: false, error: "Unauthorized: Technician credentials required." };
  }

  const { bookingId, condition, notes } = input;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { gearKit: true },
  });

  if (!booking) {
    return { success: false, error: "Booking record not found." };
  }

  if (booking.status !== BookingStatus.CHECKED_OUT && booking.status !== BookingStatus.BOOKED) {
    return { success: false, error: `Cannot log return for session in ${booking.status} status.` };
  }

  const flaggedDamage = condition === InspectionCondition.DAMAGE_FLAGGED;

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Mark booking returned
      await tx.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.RETURNED },
      });

      // 2. Create inspection record
      await tx.inspection.upsert({
        where: { bookingId },
        update: {
          technicianId: session.userId,
          condition,
          notes: notes || null,
          flaggedDamage,
          inspectedAt: new Date(),
        },
        create: {
          bookingId,
          technicianId: session.userId,
          condition,
          notes: notes || null,
          flaggedDamage,
        },
      });

      // 3. If damage flagged and kit attached, mark gear kit as DAMAGED
      if (flaggedDamage && booking.gearKitId) {
        await tx.gearKit.update({
          where: { id: booking.gearKitId },
          data: { status: GearKitStatus.DAMAGED },
        });
      }
    });

    revalidatePath("/technician");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to record return inspection.";
    return { success: false, error: message };
  }
}
