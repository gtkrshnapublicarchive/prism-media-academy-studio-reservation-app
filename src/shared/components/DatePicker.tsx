"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  currentDate: string; // Format: YYYY-MM-DD
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS_HEADER = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({ currentDate }: DatePickerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial selected date
  const [selectedYear, selectedMonth, selectedDay] = currentDate
    .split("-")
    .map((num) => parseInt(num, 10));

  const [viewYear, setViewYear] = useState(selectedYear);
  const [viewMonth, setViewMonth] = useState(selectedMonth - 1); // 0-indexed

  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const formattedMonth = String(viewMonth + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const newDateStr = `${viewYear}-${formattedMonth}-${formattedDay}`;

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", newDateStr);
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    const today = "2026-09-16";
    const [y, m, d] = today.split("-").map((v) => parseInt(v, 10));
    setViewYear(y);
    setViewMonth(m - 1);
    handleSelectDay(d);
  };

  // Generate calendar days
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  // Format label for button
  const displayLabel = new Date(selectedYear, selectedMonth - 1, selectedDay).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-black/[0.08] hover:border-black/20 text-xs font-medium text-black/80 transition-all shadow-xs cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#252724]"
      >
        <CalendarDays className="w-4 h-4 text-[#5a8357]" />
        <span>{displayLabel}</span>
      </button>

      {/* Warm Editorial Calendar Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 w-72 rounded-2xl bg-[#fbfbfa] border border-black/[0.08] p-4 shadow-xl animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 mb-3">
            <h4 className="font-editorial text-sm font-semibold text-[#1c1d1a]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg text-black/60 hover:text-black hover:bg-black/[0.04] transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg text-black/60 hover:text-black hover:bg-black/[0.04] transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {DAYS_HEADER.map((d, i) => (
              <span
                key={d}
                className={`text-[10px] font-semibold tracking-wider ${
                  i === 0 ? "text-amber-800/60" : "text-black/40"
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            {/* Prev month fill */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => {
              const prevDay = daysInPrevMonth - firstDayOfWeek + i + 1;
              return (
                <span
                  key={`prev-${i}`}
                  className="h-8 flex items-center justify-center text-black/20 text-[11px]"
                >
                  {prevDay}
                </span>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isSelected =
                viewYear === selectedYear &&
                viewMonth === selectedMonth - 1 &&
                dayNum === selectedDay;

              const isToday =
                viewYear === 2026 && viewMonth === 8 && dayNum === 16;

              return (
                <button
                  key={`day-${dayNum}`}
                  type="button"
                  onClick={() => handleSelectDay(dayNum)}
                  className={`h-8 w-8 mx-auto rounded-xl flex items-center justify-center text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#252724] text-white font-semibold shadow-xs"
                      : isToday
                      ? "bg-[#eef2ec] text-[#5a8357] font-semibold hover:bg-[#e7f2e4]"
                      : "text-black/80 hover:bg-black/[0.04] hover:text-black"
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Footer Quick Selection */}
          <div className="mt-3 pt-2.5 border-t border-black/[0.06] flex items-center justify-between text-[11px]">
            <span className="text-black/40 font-medium">Mon - Sat Facility</span>
            <button
              type="button"
              onClick={handleSelectToday}
              className="px-2 py-0.5 rounded-md bg-[#eef2ec] hover:bg-[#e7f2e4] text-[#5a8357] font-semibold transition-colors"
            >
              Today (Sep 16)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
