"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("footer.product"),
      links: [
        { label: t("nav.courses"), href: "/courses" },
        { label: t("nav.pricing"), href: "/#pricing" },
        { label: t("nav.dashboard"), href: "/dashboard" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "/about" },
        { label: t("footer.careers"), href: "/about" },
        { label: t("footer.contact"), href: "mailto:m7medking98@gmail.com" },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: t("footer.privacy"), href: "/privacy" },
        { label: t("footer.terms"), href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="border-t border-line/10 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t("footer.tagline")}
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {year} {t("common.appName")} — {t("footer.rights")}
          </p>
          <p className="text-xs text-accent">{t("footer.madeFor")} ✦</p>
        </div>
      </div>
    </footer>
  );
}
