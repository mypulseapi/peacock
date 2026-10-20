/**
 * The home page as the designer built it (afedfc1), one component per section.
 *
 * Converted by `scripts/html-to-jsx.mjs`, which does the mechanical part and refuses to guess:
 * zero warnings on this page. Section names come from the designer's own banner comments, so
 * `HOW IT WORKS` is `MethodSection` rather than `Section4`.
 *
 * Text is still inline English. Extracting it into the content modules, and the Vietnamese pass
 * after that, is deliberately separate: deciding what is a translatable string and what is a
 * product name is a judgement a script should not make.
 */
import { HeroSection } from "./hero";
import { CategoryStripSection } from "./category-strip";
import { Section3Section } from "./section3";
import { MethodSection } from "./method";
import { ResearchSection } from "./research";
import { WhySection } from "./why";
import { RevenueSection } from "./revenue";
import { RequestSection } from "./request";

export function DesignedHome() {
  return (
    <>
      <HeroSection />
      <CategoryStripSection />
      <Section3Section />
      <MethodSection />
      <ResearchSection />
      <WhySection />
      <RevenueSection />
      <RequestSection />
    </>
  );
}
