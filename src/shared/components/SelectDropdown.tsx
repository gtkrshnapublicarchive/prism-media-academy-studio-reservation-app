"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface SelectDropdownProps {
  name: string;
  options: (string | SelectOption)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

export function SelectDropdown({
  name,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  icon,
}: SelectDropdownProps) {
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const isControlled = controlledValue !== undefined;
  const initialValue = defaultValue || (normalizedOptions[0]?.value ?? "");
  const [internalValue, setInternalValue] = useState<string>(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValue = isControlled ? controlledValue : internalValue;
  const selectedOption = normalizedOptions.find((o) => o.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {/* Hidden input to maintain native form/Server Action compatibility */}
      <input type="hidden" name={name} value={selectedValue} />

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-[#fbfbfa] border rounded-xl text-sm text-left transition-all duration-150 cursor-pointer ${
          isOpen
            ? "border-black/30 ring-1 ring-black/10 bg-white"
            : "border-black/10 hover:border-black/30"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {icon && <span className="text-black/30 shrink-0">{icon}</span>}
          <span className="truncate text-black/90 font-medium">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-black/40 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-black/80" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-black/[0.08] rounded-xl shadow-lg p-1.5 max-h-60 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-100">
          <div className="space-y-0.5">
            {normalizedOptions.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                    isSelected
                      ? "bg-[#eef2ec] text-[#344c32] font-semibold"
                      : "text-black/75 hover:bg-[#fbfbfa] hover:text-black"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate">{option.label}</div>
                    {option.description && (
                      <div className="text-[10px] text-black/45 mt-0.5 truncate">
                        {option.description}
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#344c32] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
