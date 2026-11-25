import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/cdn";
import { designedHref, designedText } from "../t";
import { SIGNIN_URL } from "@/lib/constants";
import { AGENTS, GOALS, STOREFRONT } from "./designed-header";
import {
  SidebarAsk,
  SidebarGroup,
  SidebarLink,
  SidebarToggle,
} from "./sidebar-link";

type Item = { href: string; label: string; icon: string };

/**
 * The desktop navigation from `xl`, as a chat-style sidebar (logo, Ask Pulse, then every page by
 * group). Below `xl` the header's phone menu carries the same links. Same pages and labels as the
 * header, so the two never disagree.
 */
export function DesignedSidebar() {
  const t = designedText("shell.designed-header");
  const item = (href: string, label: string, icon: string): Item => ({
    href: designedHref(href),
    label,
    icon,
  });

  const groups: { title: string; open?: boolean; items: Item[] }[] = [
    {
      title: t("48"),
      open: true,
      items: [
        item("/en/product/decision-audit", t("49"), "i-clipboard-check"),
        item("/en/product/decision-verification", t("50"), "i-compare"),
        item("/en/product/decision-monitor", t("51"), "i-bell-ring"),
        item("/en/product/return-verification", t("returnName"), "i-undo"),
        item("/en/product/visual-evidence", t("visualName"), "i-image"),
        item("/en/product/promotion-audit", t("promotionName"), "i-chart-pie"),
      ],
    },
    {
      title: t("storefront"),
      items: STOREFRONT.map((p) => item(p.href, t(`${p.key}Name`), p.icon)),
    },
    {
      title: t("agentsHeading"),
      items: AGENTS.map((p) => item(p.href, t(`${p.key}Name`), p.icon)),
    },
    {
      title: t("industriesHeading"),
      items: [
        item("/en/industries/ecommerce", t("53"), "i-cart"),
        item("/en/industries/fmcg", t("54"), "i-basket"),
        item("/en/industries/technology", t("55"), "i-cpu"),
        item("/en/industries/furniture", t("56"), "i-sofa"),
        item("/en/industries/cosmetics", t("57"), "i-sparkles"),
        item("/en/industries/distribution", t("58"), "i-factory"),
      ],
    },
    {
      title: t("goalsHeading"),
      items: GOALS.map((p) => item(p.href, t(`${p.key}Name`), p.icon)),
    },
    {
      title: t("59"),
      items: [
        item("/en/research", t("61"), "i-flask"),
        item("/en/about", t("62"), "i-user-round"),
      ],
    },
  ];

  return (
    <aside
      aria-label="Main"
      data-site-sidebar
      className="sticky top-0 z-40 hidden h-svh w-66 shrink-0 flex-col border-r border-line bg-surface-0 font-display xl:flex"
    >
      <div className="flex h-14 shrink-0 items-center justify-between pr-3 pl-5">
        <Link
          href={designedHref("/en")}
          aria-label="Pulse home"
          className="hit-area"
        >
          <Image
            src={asset("brand/logo-v2.webp")}
            alt="Pulse"
            width={84}
            height={28}
            className="h-7 w-auto theme-dark:hidden"
            priority
          />
          <Image
            src={asset("brand/logo-white-v2.webp")}
            alt="Pulse"
            width={84}
            height={28}
            className="hidden h-7 w-auto theme-dark:inline"
            aria-hidden="true"
          />
        </Link>
        <SidebarToggle label={t("closeSidebar")} open />
      </div>

      <div className="px-3 pb-1">
        <SidebarAsk label={t("ask")} />
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-3 pb-4 [scrollbar-width:thin]">
        {groups.map((g) => (
          <SidebarGroup
            key={g.title}
            title={g.title}
            open={g.open}
            hrefs={g.items.map((i) => i.href)}
          >
            {g.items.map((i) => (
              <li key={i.href}>
                <SidebarLink href={i.href} icon={i.icon}>
                  {i.label}
                </SidebarLink>
              </li>
            ))}
          </SidebarGroup>
        ))}
        <ul className="mt-3 grid gap-0.5 border-t border-line pt-3">
          <li>
            <SidebarLink href={designedHref("/en/pricing")} icon="i-briefcase">
              {t("63")}
            </SidebarLink>
          </li>
          <li>
            <SidebarLink href={designedHref("/en/opensource")} icon="i-github">
              {t("opensource")}
            </SidebarLink>
          </li>
          <li>
            <a
              href="https://developer.thepulseapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 items-center gap-2.5 rounded-[10px] px-2.5 text-sm font-medium text-ink hover:bg-surface-1"
            >
              <svg className="size-4 shrink-0 text-muted" aria-hidden="true">
                <use href="#i-terminal" />
              </svg>
              {t("60")}
              <svg
                className="ml-auto size-3.5 -rotate-45 text-muted"
                aria-hidden="true"
              >
                <use href="#i-arrow-right" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>

      {/* The visitor's corner, where the prototype has the account: sign in, and the one ask. */}
      <div className="grid gap-2 border-t border-line p-3">
        <a
          href={SIGNIN_URL}
          className="flex h-9 items-center gap-2.5 rounded-[10px] px-2.5 text-sm font-medium text-ink hover:bg-surface-1"
        >
          <svg className="size-4 shrink-0 text-muted" aria-hidden="true">
            <use href="#i-user-round" />
          </svg>
          {t("46")}
        </a>
        <Link
          href={designedHref("/en/contact")}
          className="btn-primary min-h-10 rounded-full text-sm"
        >
          {t("47")}
        </Link>
      </div>
    </aside>
  );
}
