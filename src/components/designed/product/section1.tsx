/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../t";
export function Section1Section() {
  const t = designedText("product.section1");
  return (
    <section className="hero-bg border-b border-line">
            <div className="frame py-20 lg:py-28">
              <h1 className="reveal max-w-3xl text-headline text-balance">
                {t('1')}
              </h1>
              <p
                className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted delay-100"
              >
                {t('2')}
              </p>
              <nav
                className="reveal mt-8 flex flex-wrap gap-2 delay-200"
                aria-label="The four products"
              >
                <a
                  href="#audit"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-primary hover:text-primary"
                  ><span className="text-primary tabular-nums">01</span>{t('3')}</a
                >
                <a
                  href="#verification"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-primary hover:text-primary"
                  ><span className="text-primary tabular-nums">02</span>{t('4')}</a
                >
                <a
                  href="#monitor"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-primary hover:text-primary"
                  ><span className="text-primary tabular-nums">03</span>{t('5')}</a
                >
                <a
                  href="#api"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm font-medium text-ink transition-colors duration-150 ease-out-soft hover:border-primary hover:text-primary"
                  ><span className="text-primary tabular-nums">04</span>{t('6')}</a
                >
              </nav>
            </div>
          </section>
  );
}
