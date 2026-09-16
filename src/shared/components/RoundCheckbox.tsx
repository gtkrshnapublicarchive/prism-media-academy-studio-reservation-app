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

  const handleToggle = () => {
    if (disabled) return;
    const nextState = !currentChecked;
    if (!isControlled) {
      setInternalChecked(nextState);
    }
    onChange?.(nextState);
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
          onChange={(e) => {
            if (!isControlled) {
              setInternalChecked(e.target.checked);
            }
            onChange?.(e.target.checked);
          }}
          disabled={disabled}
          required={required}
          className="sr-only peer"
        />
        <div
          onClick={handleToggle}
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 shadow-2xs peer-focus-visible:ring-2 peer-focus-visible:ring-[#668c63] peer-focus-visible:ring-offset-2 ${
            currentChecked
              ? "bg-[#252724] border-[#252724] text-white"
              : "bg-white border-black/25 group-hover:border-black/50"
          }`}
        >
          <Check
            className={`w-3 h-3 stroke-[2.5] text-[#eef2ec] transition-all duration-150 transform ${
              currentChecked ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="text-xs font-semibold text-black/90 group-hover:text-black transition-colors leading-tight">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-black/50 mt-0.5 leading-normal">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
