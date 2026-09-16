"use server";

import { prisma } from "@/core/database/prisma";
import { getCurrentSession } from "@/features/auth/services/session.service";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function changePasswordAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const session = await getCurrentSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please sign in." };
  }

  const currentPassword = formData.get("currentPassword")?.toString();
  const newPassword = formData.get("newPassword")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, error: "All password fields are required." };
  }

  if (newPassword.length < 8) {
    return { success: false, error: "New password must be at least 8 characters long." };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, error: "New password and confirmation do not match." };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) {
    return { success: false, error: "User record not found." };
  }

  const isCurrentValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isCurrentValid) {
    return { success: false, error: "Incorrect current password." };
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  try {
    await prisma.user.update({
      where: { id: session.userId },
      data: { passwordHash: newHash },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update password.";
    return { success: false, error: message };
  }
}
