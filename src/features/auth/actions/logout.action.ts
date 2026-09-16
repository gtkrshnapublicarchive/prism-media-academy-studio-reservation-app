"use server";

import { clearSessionCookie } from "../services/session.service";
import { redirect } from "next/navigation";

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/login");
}
