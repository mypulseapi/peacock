"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { LOCALES } from "@/i18n/locales";

/**
 * Read from the registry rather than kept in step by hand.
 *
 * This was a second copy of the locale list. Routing took its languages from
 * `i18n/routing.ts` and the menu took them from here, so adding a language
 * would route and render it and simply never offer it, with no type error
 * anywhere to catch the omission. Both now derive from `i18n/locales.ts`.
 */
const locales = LOCALES;

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 h-9
          rounded-md border border-[color:var(--panel-line)] text-[color:var(--on-panel-2)] hover:border-[color:var(--on-panel-3)] hover:text-[color:var(--on-panel)]
          text-[var(--text-secondary)] hover:text-[var(--text-primary)]
          hover:bg-brand-lav-50
          transition-all duration-200 group
          ${isOpen ? "bg-brand-lav-50" : ""}
        `}
        aria-label={`${currentLocale.shortLabel}, ${t("switchTo")}`}
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-[var(--accent-primary-light)]" />
        <span className="text-xs sm:text-sm font-medium">{currentLocale.shortLabel}</span>
        <ChevronDown
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute left-0 md:left-auto md:right-0 top-full mt-2
          min-w-[180px] p-1.5
          bg-[color:var(--panel-1)] rounded-xl shadow-2xl
          border border-[color:var(--panel-line)]
          z-50
          transition-all duration-200 origin-top-right
          ${isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
          <div className="px-3 py-2 border-b border-[color:var(--panel-line)] mb-1">
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
              {t("switchTo")}
            </p>
          </div>

          {locales.map((loc) => {
            const isSelected = locale === loc.code;
            return (
              <button
                key={loc.code}
                onClick={() => handleLocaleChange(loc.code)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5
                  rounded-lg text-sm text-left
                  transition-all duration-150
                  ${isSelected
                    ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary-light)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                  }
                `}
              >
                <span className="text-lg leading-none">{loc.flag}</span>
                <div className="flex-1">
                  <span className="font-medium whitespace-nowrap">{loc.label}</span>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-[var(--accent-primary-light)]" />
                )}
              </button>
            );
          })}
        </div>
    </div>
  );
}
