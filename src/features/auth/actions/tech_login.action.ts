"use server";

import { authenticateTechnician } from "../services/auth.service";
import { setSessionCookie } from "../services/session.service";
import { redirect } from "next/navigation";

export async function loginTechnicianAction(formData: FormData): Promise<void> {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  if (!email || !password) {
    redirect("/technician/login?error=Please+enter+staff+credentials");
  }

  const result = await authenticateTechnician(email, password);
  if (!result.success || !result.user) {
    redirect(`/technician/login?error=${encodeURIComponent(result.error || "Authentication failed")}`);
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
