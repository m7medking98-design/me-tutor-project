"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ChevronDown,
  Globe,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { localeMeta, useLanguage } from "@/lib/language-context";
import { useAuth } from "@/lib/auth-context";
import type { Locale } from "@/lib/types";

function useClickOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

function LanguageMenu() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        aria-label={t("nav.language")}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeMeta[locale].label}</span>
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl bg-surface card-line shadow-xl">
          {(Object.keys(localeMeta) as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-start text-sm transition-colors hover:bg-surface-2 ${
                l === locale ? "font-semibold text-primary dark:text-primary-strong" : "text-ink"
              }`}
            >
              {localeMeta[l].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="h-9 w-9" />;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function UserMenu() {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  if (!user) return null;
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
        <Avatar name={user.displayName} src={user.photoURL} size="sm" />
      </button>
      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl bg-surface card-line shadow-xl">
          <div className="border-b border-line/10 px-4 py-3">
            <p className="truncate text-sm font-semibold text-ink">{user.displayName}</p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink transition-colors hover:bg-surface-2"
          >
            <User className="h-4 w-4 text-muted" /> {t("nav.profile")}
          </Link>
          <button
            onClick={async () => {
              setOpen(false);
              await signOut();
              router.push("/");
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-start text-sm text-danger transition-colors hover:bg-surface-2"
          >
            <LogOut className="h-4 w-4" /> {t("nav.logout")}
          </button>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const appLinks = [
    { href: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { href: "/courses", label: t("nav.courses"), icon: Globe },
    { href: "/progress", label: t("nav.progress"), icon: LineChart },
  ];
  const marketingLinks = [
    { href: "/courses", label: t("nav.courses") },
    { href: "/#pricing", label: t("nav.pricing") },
  ];

  const isActive = (href: string) =>
    href !== "/" && pathname.startsWith(href.split("#")[0]) && href !== "/#pricing";

  return (
    <header className="sticky top-0 z-40 border-b border-line/10 bg-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden items-center gap-1 md:flex">
            {(user ? appLinks : marketingLinks).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary dark:text-primary-strong"
                    : "text-muted hover:bg-surface-2 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <LanguageMenu />
          <ThemeToggle />
          {!loading &&
            (user ? (
              <UserMenu />
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Button href="/login" variant="ghost" size="sm">
                  {t("nav.login")}
                </Button>
                <Button href="/signup" variant="gold" size="sm">
                  {t("nav.signup")}
                </Button>
              </div>
            ))}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-surface-2 md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-line/10 bg-bg px-4 py-3 md:hidden">
          {(user ? appLinks : marketingLinks).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-surface-2"
            >
              {link.label}
            </Link>
          ))}
          {!user && (
            <div className="mt-2 flex gap-2 border-t border-line/10 pt-3">
              <Button href="/login" variant="outline" size="sm" className="flex-1">
                {t("nav.login")}
              </Button>
              <Button href="/signup" variant="gold" size="sm" className="flex-1">
                {t("nav.signup")}
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
