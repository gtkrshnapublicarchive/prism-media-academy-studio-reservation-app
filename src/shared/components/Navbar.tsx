import Link from "next/link";
import { getCurrentSession } from "@/features/auth/services/session.service";
import { logoutAction } from "@/features/auth/actions/logout.action";
import { Film, Calendar, User as UserIcon, LogOut, Settings, LayoutDashboard } from "lucide-react";

export async function Navbar() {
  const session = await getCurrentSession();

  return (
    <header className="sticky top-0 z-40 bg-[#fbfbfa]/90 backdrop-blur-md border-b border-black/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#252724] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Film className="w-4 h-4 text-[#eef2ec]" />
            </div>
            <div>
              <span className="font-editorial text-lg font-semibold text-[#1c1d1a] tracking-tight block leading-tight">
                Prism Media Academy
              </span>
              <span className="text-[11px] text-black/50 font-medium block uppercase tracking-wider">
                Studio &amp; Gear Reservations
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/calendar"
            className="text-sm font-medium text-black/70 hover:text-black transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-black/[0.04]"
          >
            <Calendar className="w-4 h-4" />
            <span>Studio Calendar</span>
          </Link>

          {session && session.role === "STUDENT" ? (
            <>
              <Link
                href="/my-bookings"
                className="text-sm font-medium text-black/70 hover:text-black transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-black/[0.04]"
              >
                <UserIcon className="w-4 h-4" />
                <span>My Bookings</span>
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium text-black/70 hover:text-black transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-black/[0.04]"
              >
                <Settings className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <div className="h-4 w-px bg-black/[0.12] mx-1" />
              <div className="flex items-center gap-2.5">
                <Link href="/profile" className="text-right hidden sm:block hover:opacity-80 transition-opacity">
                  <p className="text-xs font-semibold text-black/90 leading-none">{session.name}</p>
                  <p className="text-[10px] text-black/50 leading-tight mt-0.5">{session.studentId}</p>
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    title="Sign Out"
                    className="p-2 rounded-xl text-black/60 hover:text-black hover:bg-black/[0.05] transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          ) : session && session.role === "TECHNICIAN" ? (
            <div className="flex items-center gap-2.5">
              <Link
                href="/technician"
                className="text-sm font-medium text-black/70 hover:text-black transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-black/[0.04]"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Floor Console</span>
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium text-black/70 hover:text-black transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-black/[0.04]"
              >
                <Settings className="w-4 h-4" />
                <span>Staff Profile</span>
              </Link>
              <div className="h-4 w-px bg-black/[0.12] mx-1" />
              <form action={logoutAction}>
                <button
                  type="submit"
                  title="Sign Out"
                  className="p-1.5 rounded-xl text-black/60 hover:text-black hover:bg-black/[0.05] transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium bg-[#252724] text-white hover:bg-[#3b3e39] transition-colors px-4 py-2 rounded-xl shadow-xs"
            >
              Student Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
