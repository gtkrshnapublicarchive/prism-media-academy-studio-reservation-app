"use client";

import { CheckCircle2, Copy, Check, X, Ticket } from "lucide-react";
import { useState } from "react";

interface VoucherModalProps {
  voucherCode: string;
  studioName: string;
  date: string;
  slotLabel: string;
  gearKitName?: string;
  onClose: () => void;
}

export function VoucherModal({
  voucherCode,
  studioName,
  date,
  slotLabel,
  gearKitName,
  onClose,
}: VoucherModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-[#fbfbfa] border border-black/[0.1] rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-black/50 hover:text-black hover:bg-black/[0.05] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#e7f2e4] text-[#5a8357] flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <h3 className="font-editorial text-2xl font-semibold text-[#1c1d1a]">
          Reservation Confirmed
        </h3>
        <p className="text-xs text-black/60 mt-1">
          Present this voucher to lab technicians at the counter to access the studio.
        </p>

        <div className="mt-5 p-4 rounded-xl bg-white border border-black/[0.08] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-black/40" />
              <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
                Official Voucher
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-medium text-[#252724] hover:text-black transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="mt-2 py-2 px-3 bg-[#fbfbfa] rounded-lg border border-black/[0.06] text-center">
            <span className="font-mono text-lg font-bold tracking-widest text-[#252724]">
              {voucherCode}
            </span>
          </div>

          <div className="mt-3 text-xs space-y-1 text-black/70 border-t border-black/[0.06] pt-2">
            <p><span className="text-black/40">Studio:</span> {studioName}</p>
            <p><span className="text-black/40">Date:</span> {date}</p>
            <p><span className="text-black/40">Slot:</span> {slotLabel}</p>
            {gearKitName && (
              <p><span className="text-black/40">Gear Package:</span> {gearKitName}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-sm font-medium transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
