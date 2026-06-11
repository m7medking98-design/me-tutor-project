"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Logo({ href = "/", size = "md" }: { href?: string; size?: "md" | "lg" }) {
  const { locale } = useLanguage();
  const text = locale === "ar" ? "معيار" : "Miyar";
  return (
    <Link href={href} className="group inline-flex items-center gap-2">
      {/* The standard mark: a gold tick inside a teal seal */}
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" stroke="rgb(232 177 78)" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        className={`font-bold tracking-tight text-ink ${
          size === "lg" ? "text-2xl" : "text-xl"
        }`}
      >
        {text}
      </span>
    </Link>
  );
}
