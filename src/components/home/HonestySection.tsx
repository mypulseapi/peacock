
import { Check, X } from "lucide-react";
import { Section, SectionHead } from "./Section";
import { ControlScene } from "./Scenes";
import { honesty } from "@/content/home";
import { ui } from "@/content/locale";

/**
 * The will / will-not list.
 *
 * Competitors lead with claimed conversion figures. We are barred from printing
 * one (ODIN/demo/DEMO.md §1.1) and would not win that comparison anyway, so this
 * section makes the constraint the argument. It is also the page a sceptical buyer
 * sends to their boss.
 */
/*
 * The locale arrives as a prop. `useLocale()` resolves to English inside a Server Component under
 * `output: "export"`, so `pick()` fell through to its English fallback and this rendered English
 * under `<html lang="vi">`. Nothing threw: falling back is what `pick` is for, which is exactly
 * what hid it. The page has the locale from its params and hands it down.
 */
export function HonestySection({ locale }: { locale: string }) {
  const HONESTY = honesty(locale);
  const t = ui(locale);
  return (
    <Section>
      <SectionHead eyebrow={HONESTY.eyebrow} title={HONESTY.title} />
      <div className="mt-16 grid gap-7 lg:grid-cols-2">
        <div className="lg:col-span-2 lg:mb-4"><ControlScene /></div>
        <Panel title={t.willDo} items={HONESTY.will} good />
        <Panel title={t.wontDo} items={HONESTY.wont} />
      </div>
      <p className="ed-rule mt-12 max-w-[62ch] pt-7 text-[1.0625rem] leading-relaxed font-medium text-[color:var(--ed-ink)]">
        {HONESTY.footnote}
      </p>
    </Section>
  );
}

function Panel({ title, items, good = false }: { title: string; items: readonly string[]; good?: boolean }) {
  const Icon = good ? Check : X;
  return (
    <div className="ed-raise rounded-2xl border border-[color:var(--ed-line)] p-7">
      <h3 className="ed-d4 text-[color:var(--ed-ink)]">{title}</h3>
      <ul className="mt-6 space-y-5">
        {items.map((it) => (
          <li key={it} className="flex gap-3.5">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
              style={{ background: good ? "var(--brand-lav-200)" : "var(--brand-blush-100)" }}
            >
              <Icon
                className="h-3 w-3"
                style={{ color: good ? "var(--brand-indigo-deep)" : "var(--brand-coral-ink)" }}
                aria-hidden
              />
            </span>
            <span className="ed-body flex-1">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
