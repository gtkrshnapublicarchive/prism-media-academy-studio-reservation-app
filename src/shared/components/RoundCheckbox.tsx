"use client";

import { useState, ReactNode } from "react";
import { Check } from "lucide-react";

interface RoundCheckboxProps {
  name?: string;
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function RoundCheckbox({
  name,
  id,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  required = false,
  label,
  description,
  className = "",
}: RoundCheckboxProps) {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);
  const currentChecked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onChange?.(nextChecked);
  };

  return (
    <label
      className={`inline-flex items-start gap-3 select-none cursor-pointer group ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={currentChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className="sr-only peer"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 shadow-2xs peer-focus-visible:ring-2 peer-focus-visible:ring-[#668c63] peer-focus-visible:ring-offset-2 ${
            currentChecked
              ? "bg-[#252724] border-[#252724] text-white shadow-xs"
              : "bg-white border-black/30 group-hover:border-black/60 shadow-2xs"
          }`}
        >
          <Check
            className={`w-3.5 h-3.5 stroke-[3] text-white transition-all duration-150 transform ${
              currentChecked ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          />
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <div className="text-xs font-semibold text-black/90 group-hover:text-black transition-colors leading-tight">
              {label}
            </div>
          )}
          {description && (
            <div className="text-[11px] text-black/55 mt-0.5 leading-normal">
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
}
