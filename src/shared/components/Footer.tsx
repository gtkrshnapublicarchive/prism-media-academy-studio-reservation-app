export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/[0.08] bg-[#fbfbfa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black/50">
        <div>
          <p className="font-medium text-black/70">
            Prism Media Academy Studio and Equipment Reservation Facility
          </p>
          <p className="mt-0.5">
            14 Lumina Way, Aurelia City - Creative Media Production Lab
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span>Operating Hours: Mon - Sat, 08:00 - 20:00</span>
          <span>Semester Quota: 4 Hours / Week</span>
        </div>
      </div>
    </footer>
  );
}
