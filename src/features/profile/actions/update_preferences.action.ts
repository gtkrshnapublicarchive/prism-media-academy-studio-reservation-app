"use server";

import { prisma } from "@/core/database/prisma";
import { getCurrentSession } from "@/features/auth/services/session.service";
import { revalidatePath } from "next/cache";

export async function updatePreferencesAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const session = await getCurrentSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please sign in." };
  }

  const notifySessionReminders = formData.get("notifySessionReminders") === "on";
  const notifyCancellationCutoff = formData.get("notifyCancellationCutoff") === "on";
  const notifyGearReady = formData.get("notifyGearReady") === "on";
  const safetySigned = formData.get("safetySigned") === "on";

  try {
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        notifySessionReminders,
        notifyCancellationCutoff,
        notifyGearReady,
        ...(formData.has("safetySigned") ? { safetySigned } : {}),
      },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update notification preferences.";
    return { success: false, error: message };
  }
}

export async function toggleTechnicianShiftAction(): Promise<{ success: boolean; shiftStatus?: string; error?: string }> {
  const session = await getCurrentSession();
  if (!session || session.role !== "TECHNICIAN") {
    return { success: false, error: "Unauthorized. Technician access required." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { shiftStatus: true },
    });

    const newStatus = user?.shiftStatus === "ON_DUTY" ? "OFF_DUTY" : "ON_DUTY";

    await prisma.user.update({
      where: { id: session.userId },
      data: { shiftStatus: newStatus },
    });

    revalidatePath("/profile");
    revalidatePath("/technician");
    return { success: true, shiftStatus: newStatus };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle shift status.";
    return { success: false, error: message };
  }
}
