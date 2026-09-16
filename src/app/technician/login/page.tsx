import { getCurrentSession } from "@/features/auth/services/session.service";
import { loginTechnicianAction } from "@/features/auth/actions/tech_login.action";
import { redirect } from "next/navigation";
import { ShieldCheck, Lock, AlertCircle } from "lucide-react";

interface TechLoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function TechnicianLoginPage({ searchParams }: TechLoginPageProps) {
  const session = await getCurrentSession();
  if (session && session.role === "TECHNICIAN") {
    redirect("/technician");
  }

  const resolvedParams = await searchParams;
  const error = resolvedParams.error;

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white border border-black/[0.08] rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-950 text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
            <ShieldCheck className="w-6 h-6 text-amber-200" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-black/40 block">
            Internal Operations
          </span>
          <h2 className="font-editorial text-2xl font-semibold text-[#1c1d1a] mt-0.5">
            Technician Console Login
          </h2>
          <p className="text-xs text-black/50 mt-1">
            Restricted staff access for studio technicians and laboratory directors.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form action={loginTechnicianAction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-black/70 mb-1">
              Staff Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue="roland@prism.edu"
              placeholder="e.g. roland@prism.edu"
              className="w-full text-xs p-3 rounded-xl border border-black/[0.1] bg-[#fbfbfa] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black/70 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              defaultValue="password123"
              className="w-full text-xs p-3 rounded-xl border border-black/[0.1] bg-[#fbfbfa] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Authenticate Staff Session</span>
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="mt-6 pt-5 border-t border-black/[0.06] text-xs text-black/60 bg-[#fbfbfa] p-3.5 rounded-xl">
          <p className="font-semibold text-black/80">Demo Technician Credentials:</p>
          <p className="text-[11px] mt-0.5">
            Email: <code className="text-black font-mono">roland@prism.edu</code>
          </p>
          <p className="text-[11px]">
            Password: <code className="text-black font-mono">password123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
