"use server";

import { authenticateStudent } from "../services/auth.service";
import { setSessionCookie } from "../services/session.service";
import { redirect } from "next/navigation";

export async function loginStudentAction(formData: FormData): Promise<void> {
  const identifier = (formData.get("identifier") as string) || "";
  const password = (formData.get("password") as string) || "";

  if (!identifier || !password) {
    redirect("/login?error=Please+enter+your+student+credentials");
  }

  const result = await authenticateStudent(identifier, password);
  if (!result.success || !result.user) {
    redirect(`/login?error=${encodeURIComponent(result.error || "Authentication failed")}`);
  }

  await setSessionCookie({
    userId: result.user.id,
    email: result.user.email,
    name: result.user.name,
    role: result.user.role,
    studentId: result.user.studentId,
  });

  redirect("/");
}
