import { getCurrentSession } from "@/features/auth/services/session.service";
import { getUserBookings } from "@/features/bookings/services/user_bookings.service";
import { MyBookingsCard } from "@/features/bookings/components/MyBookingsCard";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Film, CalendarPlus } from "lucide-react";

export default async function MyBookingsPage() {
  const session = await getCurrentSession();
  if (!session || session.role !== "STUDENT") {
    redirect("/login");
  }

  const bookings = await getUserBookings(session.userId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-black/40">
            Student Creator Portal
          </span>
          <h1 className="font-editorial text-3xl font-semibold text-[#1c1d1a] tracking-tight mt-1">
            My Studio Bookings
          </h1>
          <p className="text-xs text-black/60 mt-1">
            View upcoming reservation vouchers, attached gear kits, and session status history.
          </p>
        </div>

        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <CalendarPlus className="w-3.5 h-3.5" />
          <span>New Reservation</span>
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white border border-black/[0.08] rounded-2xl p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#fbfbfa] border border-black/[0.06] text-black/40 flex items-center justify-center mx-auto mb-3">
            <Film className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-lg font-semibold text-[#1c1d1a]">
            No studio sessions booked
          </h3>
          <p className="text-xs text-black/50 mt-1 max-w-sm mx-auto">
            You currently have no active or completed studio reservations this semester.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-4 py-2 rounded-xl bg-[#252724] text-white text-xs font-medium hover:bg-[#3b3e39] transition-colors"
          >
            Explore Availability Schedule
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <MyBookingsCard key={b.id} booking={b} />
          ))}
        </div>
      )}
    </div>
  );
}
