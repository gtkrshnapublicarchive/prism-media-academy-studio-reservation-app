import { UserRole } from "@prisma/client";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  studentId: string | null;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    studentId: string | null;
  };
}
