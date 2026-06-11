import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { cookies } from "next/headers";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import type { Locale } from "@/lib/types";
import "./globals.css";

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
});

export const metadata: Metadata = {
  title: "معيار | Miyar — تعلّم بإشراف ذكي",
  description:
    "منصة تعليمية عربية بمعايير عالمية: برمجة، رياضيات، فيزياء وهندسة بإشراف مشرف ذكي يتابع تقدمك خطوة بخطوة.",
};

const LOCALES: Locale[] = ["ar", "en", "fr"];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieLocale = cookies().get("miyar-locale")?.value;
  const locale: Locale = LOCALES.includes(cookieLocale as Locale)
    ? (cookieLocale as Locale)
    : "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${notoArabic.variable} ${inter.variable} font-sans`}>
        <Providers initialLocale={locale}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
