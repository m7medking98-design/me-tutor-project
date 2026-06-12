"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Bell,
  CreditCard,
  Globe,
  Link2,
  Moon,
  ShieldAlert,
  Sun,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/auth-context";
import { localeMeta, useLanguage } from "@/lib/language-context";
import type { Locale } from "@/lib/types";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-surface-2"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? "start-[calc(100%-1.375rem)]" : "start-0.5"
        }`}
      />
    </button>
  );
}

const planNames = {
  free: { ar: "المجانية", en: "Free", fr: "Gratuit" },
  basic: { ar: "الأساسية", en: "Basic", fr: "Essentiel" },
  pro: { ar: "الاحترافية", en: "Pro", fr: "Pro" },
};

export default function ProfilePage() {
  const { t, loc, locale, setLocale } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, isDemo } = useAuth();
  const [notifs, setNotifs] = useState({ streak: true, mentor: true, milestones: false });
  if (!user) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">{t("profile.title")}</h1>

      {/* Identity card */}
      <Card className="mt-8 overflow-hidden">
        <div className="relative h-24 bg-gradient-to-br from-primary/40 via-primary/15 to-accent/25">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
        </div>
        <div className="flex flex-wrap items-center gap-5 px-6 pb-6">
          <div className="-mt-8">
            <Avatar name={user.displayName} src={user.photoURL} size="lg" />
          </div>
          <div className="min-w-0 flex-1 pt-4">
            <h2 className="text-xl font-bold text-ink">{user.displayName}</h2>
            <p className="text-sm text-muted">{user.email}</p>
            <p className="mt-1 text-xs text-muted">
              {t("profile.memberSince")} {user.joinedAt}
            </p>
          </div>
          <Badge tone="gold" className="px-3 py-1">
            ✦ {loc(planNames[user.plan])}
          </Badge>
        </div>
        <div className="grid grid-cols-3 divide-x divide-line/10 border-t border-line/10 rtl:divide-x-reverse">
          <div className="px-4 py-3.5 text-center">
            <p className="text-[11px] text-muted">{t("common.level")}</p>
            <p className="mt-0.5 font-bold text-ink">{user.level}</p>
          </div>
          <div className="px-4 py-3.5 text-center">
            <p className="text-[11px] text-muted">{t("common.xp")}</p>
            <p className="mt-0.5 font-bold text-accent">{user.xp.toLocaleString()}</p>
          </div>
          <div className="px-4 py-3.5 text-center">
            <p className="text-[11px] text-muted">{t("dashboard.streakTitle")}</p>
            <p className="mt-0.5 font-bold text-ink">
              {user.streakDays} <span className="text-xs font-normal text-muted">{t("common.days")}</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Language */}
      <Card className="mt-6 p-6">
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary dark:text-primary-strong" />
          <div>
            <h3 className="font-bold text-ink">{t("profile.languagePref")}</h3>
            <p className="text-xs text-muted">{t("profile.languagePrefDesc")}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {(Object.keys(localeMeta) as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                locale === l
                  ? "border-primary bg-primary/10 text-primary dark:text-primary-strong"
                  : "border-line/20 text-muted hover:border-line/40 hover:text-ink"
              }`}
            >
              {localeMeta[l].label}
            </button>
          ))}
        </div>
      </Card>

      {/* Theme */}
      <Card className="mt-6 p-6">
        <div className="flex items-center gap-3">
          {theme === "dark" ? (
            <Moon className="h-5 w-5 text-primary dark:text-primary-strong" />
          ) : (
            <Sun className="h-5 w-5 text-primary" />
          )}
          <h3 className="font-bold text-ink">{t("profile.themePref")}</h3>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
              theme === "dark"
                ? "border-primary bg-primary/10 text-primary dark:text-primary-strong"
                : "border-line/20 text-muted hover:text-ink"
            }`}
          >
            <Moon className="h-4 w-4" /> {t("profile.themeDark")}
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
              theme === "light"
                ? "border-primary bg-primary/10 text-primary"
                : "border-line/20 text-muted hover:text-ink"
            }`}
          >
            <Sun className="h-4 w-4" /> {t("profile.themeLight")}
          </button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="mt-6 p-6">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary dark:text-primary-strong" />
          <h3 className="font-bold text-ink">{t("profile.notifications")}</h3>
        </div>
        <div className="mt-4 space-y-4">
          {(
            [
              { key: "streak", label: t("profile.notifStreak"), desc: t("profile.notifStreakDesc") },
              { key: "mentor", label: t("profile.notifMentor"), desc: t("profile.notifMentorDesc") },
              { key: "milestones", label: t("profile.notifMilestones"), desc: t("profile.notifMilestonesDesc") },
            ] as const
          ).map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-ink">{item.label}</p>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
              <Toggle
                checked={notifs[item.key]}
                onChange={(v) => setNotifs((n) => ({ ...n, [item.key]: v }))}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Subscription */}
      <Card className="mt-6 p-6">
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-primary dark:text-primary-strong" />
          <h3 className="font-bold text-ink">{t("profile.subscription")}</h3>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent/5 p-4">
          <div>
            <p className="text-xs text-muted">{t("profile.planActive")}</p>
            <p className="mt-0.5 font-bold text-accent">✦ {loc(planNames[user.plan])}</p>
          </div>
          <Button variant="outline" size="sm">
            {t("profile.managePlan")}
          </Button>
        </div>
      </Card>

      {/* Connected accounts */}
      <Card className="mt-6 p-6">
        <div className="flex items-center gap-3">
          <Link2 className="h-5 w-5 text-primary dark:text-primary-strong" />
          <h3 className="font-bold text-ink">{t("profile.connectedAccounts")}</h3>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.61 0 3.06.56 4.21 1.64l3.16-3.16A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
            </svg>
            <span className="text-sm font-medium text-ink">Google</span>
          </div>
          {isDemo ? (
            <Button variant="outline" size="sm" disabled>
              {t("profile.connectGoogle")}
            </Button>
          ) : (
            <Badge tone="success">{t("profile.connected")}</Badge>
          )}
        </div>
      </Card>

      {/* Danger zone */}
      <Card className="mt-6 border-danger/20 p-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-5 w-5 text-danger" />
          <h3 className="font-bold text-danger">{t("profile.dangerZone")}</h3>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-ink">{t("profile.deleteAccount")}</p>
            <p className="text-xs text-muted">{t("profile.deleteAccountDesc")}</p>
          </div>
          <Button variant="danger" size="sm">
            {t("profile.deleteAccount")}
          </Button>
        </div>
      </Card>
    </main>
  );
}
