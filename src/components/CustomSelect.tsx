"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  name: string;
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  placeholder?: string;
}

// ponytail: native <select> can't style the option panel (borders/padding are OS-drawn),
// so this is the minimal custom listbox. Keyboard: Enter/Space open, Arrows move, Esc close.
export default function CustomSelect({
  id,
  name,
  value,
  options,
  onChange,
  onBlur,
  hasError,
  placeholder,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open, onBlur]);

  const select = (v: string) => {
    onChange(v);
    setOpen(false);
    onBlur?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(options[activeIndex].value);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      {/* `aria-controls` names the <ul> below: a combobox that announces expanded/collapsed
          without saying what it controls gives a screen reader nothing to navigate into.
          `id` is a required prop, so the reference always resolves while the list is open. */}
      <button
        type="button"
        id={id}
        name={name}
        role="combobox"
        /* htmlFor on a <label> does not name a button, so the visible label is
           associated explicitly. The caller gives its label this id. */
        aria-labelledby={`${id}-label`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between pl-4 pr-[10px] py-3 rounded-xl bg-[var(--bg-secondary)] border text-left text-[var(--text-primary)] focus:outline-none transition-colors ${
          hasError
            ? "border-red-500 focus:border-red-500"
            : "border-[var(--surface-border)] focus:border-[var(--accent-primary)]"
        }`}
      >
        <span className={selected ? "" : "text-[var(--text-muted)]"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-20 mt-2 w-full max-h-60 overflow-auto rounded-xl border border-[var(--surface-border)] bg-[var(--bg-elevated)] p-2 shadow-lg"
        >
          {options.map((option, i) => {
            const isSelected = option.value === value;
            const isActive = i === activeIndex;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => select(option.value)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer border border-[var(--surface-border)] mb-1 last:mb-0 transition-colors ${
                  isActive ? "bg-[var(--surface-hover)]" : ""
                } ${isSelected ? "text-[var(--accent-primary-light)]" : "text-[var(--text-primary)]"}`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-4 h-4" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
