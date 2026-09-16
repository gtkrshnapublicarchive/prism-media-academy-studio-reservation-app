"use server";

import { prisma } from "@/core/database/prisma";
import { getCurrentSession } from "@/features/auth/services/session.service";
import { StudioStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function toggleStudioMaintenanceAction(studioId: string) {
  const session = await getCurrentSession();
  if (!session || session.role !== "TECHNICIAN") {
    return { success: false, error: "Unauthorized: Technician credentials required." };
  }

  const studio = await prisma.studio.findUnique({
    where: { id: studioId },
  });

  if (!studio) {
    return { success: false, error: "Studio not found." };
  }

  const newStatus =
    studio.status === StudioStatus.AVAILABLE
      ? StudioStatus.MAINTENANCE
      : StudioStatus.AVAILABLE;

  await prisma.studio.update({
    where: { id: studioId },
    data: { status: newStatus },
  });

  revalidatePath("/technician");
  revalidatePath("/");
  return { success: true, status: newStatus };
}
