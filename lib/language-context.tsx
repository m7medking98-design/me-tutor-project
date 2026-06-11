"use client";

import { createContext, useCallback, useContext, useState } from "react";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import type { L10n, Locale } from "@/lib/types";

const dictionaries: Record<Locale, Record<string, Record<string, string>>> = {
  ar,
  en,
  fr,
};

export const LOCALE_COOKIE = "miyar-locale";

export const localeMeta: Record<Locale, { label: string; dir: "rtl" | "ltr" }> = {
  ar: { label: "العربية", dir: "rtl" },
  en: { label: "English", dir: "ltr" },
  fr: { label: "Français", dir: "ltr" },
};

interface LanguageContextValue {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (locale: Locale) => void;
  /** translate a "section.key" path */
  t: (path: string) => string;
  /** pick the current language out of a localized content object */
  loc: (value: L10n) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    document.documentElement.lang = next;
    document.documentElement.dir = localeMeta[next].dir;
  }, []);

  const t = useCallback(
    (path: string): string => {
      const [section, key] = path.split(".");
      return dictionaries[locale]?.[section]?.[key] ?? path;
    },
    [locale]
  );

  const loc = useCallback((value: L10n) => value[locale] ?? value.ar, [locale]);

  return (
    <LanguageContext.Provider
      value={{ locale, dir: localeMeta[locale].dir, setLocale, t, loc }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
