"use server";

import { authenticateTechnician } from "../services/auth.service";
import { setSessionCookie } from "../services/session.service";
import { redirect } from "next/navigation";

export async function loginTechnicianAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please enter staff email and password." };
  }

  const result = await authenticateTechnician(email, password);
  if (!result.success || !result.user) {
    return { error: result.error || "Authentication failed." };
  }

  await setSessionCookie({
    userId: result.user.id,
    email: result.user.email,
    name: result.user.name,
    role: result.user.role,
    studentId: result.user.studentId,
  });

  redirect("/technician");
}
