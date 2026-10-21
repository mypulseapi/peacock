/**
 * Converted from `skip.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function DesignedSkipLink() {
  const t = useTranslations("designed.shell.designed-skip-link");
  return (
    <a href="#main" className="skip-link">{t('1')}</a>
  );
}
