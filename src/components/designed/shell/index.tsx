/**
 * The designer's page shell: everything outside `<main>`.
 *
 * The page converter reads `<main>` only, which is right for page bodies and left the shell
 * behind entirely — so converted pages rendered inside the Next app's own dark navbar and footer
 * while their bodies were the designer's light design. That mismatch is most of why the rebuild
 * looked nothing like staging even once the pages themselves were faithful.
 *
 * Four pieces, each converted with `--whole` because none of them is a `<section>`:
 *
 *   - the skip link, the first focus stop on every page (WCAG 2.4.1)
 *   - the header, with the product and sector menus and the language control
 *   - the footer
 *   - the chat launcher, markup only until the assistant is built
 *
 * The menus and the language dropdown are `<details>` elements underneath, so they open and close
 * with no JavaScript; `designed-motion.js` only adds hover-open and one-at-a-time behaviour.
 *
 * Hand-written, and regenerate the shell with `--no-index` or this gets overwritten. It has been
 * twice, which is why the flag exists.
 */
export { DesignedSkipLink } from "./designed-skip-link";
export { DesignedHeader } from "./designed-header";
export { DesignedFooter } from "./designed-footer";
