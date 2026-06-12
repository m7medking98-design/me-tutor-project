"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider } from "@/lib/auth-context";
import { StudentDataProvider } from "@/lib/data/student-context";
import type { Locale } from "@/lib/types";

export function Providers({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider initialLocale={initialLocale}>
        <AuthProvider>
          <StudentDataProvider>{children}</StudentDataProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
