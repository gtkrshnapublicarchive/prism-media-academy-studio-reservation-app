import { prisma } from "@/core/database/prisma";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import { AuthResult } from "../types/auth.types";

export async function authenticateStudent(
  identifier: string,
  passwordPlain: string
): Promise<AuthResult> {
  const normalized = identifier.trim().toLowerCase();

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: normalized },
        { studentId: identifier.trim() },
      ],
      role: UserRole.STUDENT,
    },
  });

  if (!user) {
    return { success: false, error: "Invalid student credentials." };
  }

  const matches = await bcrypt.compare(passwordPlain, user.passwordHash);
  if (!matches) {
    return { success: false, error: "Invalid student credentials." };
  }

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      studentId: user.studentId,
    },
  };
}

export async function authenticateTechnician(
  email: string,
  passwordPlain: string
): Promise<AuthResult> {
  const normalized = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalized },
  });

  if (!user || user.role !== UserRole.TECHNICIAN) {
    return { success: false, error: "Invalid staff credentials." };
  }

  const matches = await bcrypt.compare(passwordPlain, user.passwordHash);
  if (!matches) {
    return { success: false, error: "Invalid staff credentials." };
  }

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      studentId: user.studentId,
    },
  };
}
