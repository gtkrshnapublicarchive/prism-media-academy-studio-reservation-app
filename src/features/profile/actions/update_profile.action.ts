"use server";

import { prisma } from "@/core/database/prisma";
import { getCurrentSession, setSessionCookie } from "@/features/auth/services/session.service";
import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";

export async function updateProfileAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const session = await getCurrentSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please sign in." };
  }

  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || null;
  const bio = formData.get("bio")?.toString().trim() || null;
  const department = formData.get("department")?.toString().trim() || null;
  const station = formData.get("station")?.toString().trim() || null;
  const shiftStatus = formData.get("shiftStatus")?.toString().trim() || null;

  if (!name || name.length < 2) {
    return { success: false, error: "Full name must be at least 2 characters." };
  }

  const updateData: {
    name: string;
    phone: string | null;
    bio: string | null;
    department?: string | null;
    station?: string | null;
    shiftStatus?: string | null;
  } = {
    name,
    phone,
    bio,
  };

  if (session.role === UserRole.STUDENT) {
    updateData.department = department;
  } else if (session.role === UserRole.TECHNICIAN) {
    updateData.station = station;
    if (shiftStatus === "ON_DUTY" || shiftStatus === "OFF_DUTY") {
      updateData.shiftStatus = shiftStatus;
    }
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: updateData,
    });

    if (name !== session.name) {
      await setSessionCookie({
        ...session,
        name: updatedUser.name,
      });
    }

    revalidatePath("/profile");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update profile details.";
    return { success: false, error: message };
  }
}
