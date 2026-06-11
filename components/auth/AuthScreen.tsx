"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Zap } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

function Field({
  label,
  type,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        value={value}
        required
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line/20 bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

export function AuthScreen({ mode }: { mode: "login" | "signup" }) {
  const { t, locale } = useLanguage();
  const {
    user,
    isDemo,
    signInDemo,
    signInEmail,
    signUpEmail,
    signInGoogle,
  } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  const isLogin = mode === "login";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (isDemo) {
      // No backend yet — every path leads to the demo student
      signInDemo();
      return;
    }
    setBusy(true);
    try {
      if (isLogin) await signInEmail(email, password);
      else await signUpEmail(name, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "auth-error");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    if (isDemo) {
      signInDemo();
      return;
    }
    try {
      await signInGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "auth-error");
    }
  }

  return (
    <main className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Brand panel */}
      <div className="glow-teal relative hidden flex-col justify-between overflow-hidden bg-primary/[0.04] p-12 lg:flex">
        <Logo size="lg" />
        <div>
          <h1 className="text-4xl font-bold leading-snug text-ink">
            {t("auth.brandLine1")}
            <br />
            <span className="text-gold-gradient">{t("auth.brandLine2")}</span>
          </h1>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
            “{t("auth.brandQuote")}”
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <Sparkles className="h-4 w-4 text-accent" />
          {locale === "ar"
            ? "+١٨ ألف طالب يتعلمون الآن"
            : locale === "fr"
            ? "+18 000 étudiants apprennent maintenant"
            : "18,000+ students learning right now"}
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-ink">
            {isLogin ? t("auth.loginTitle") : t("auth.signupTitle")}
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            {isLogin ? t("auth.loginSubtitle") : t("auth.signupSubtitle")}
          </p>

          {isDemo && (
            <button
              onClick={() => signInDemo()}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-accent/50 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent transition-all hover:bg-accent/20"
            >
              <Zap className="h-4 w-4" />
              {t("auth.demoLogin")}
            </button>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {!isLogin && (
              <Field label={t("auth.name")} type="text" value={name} onChange={setName} autoComplete="name" />
            )}
            <Field label={t("auth.email")} type="email" value={email} onChange={setEmail} autoComplete="email" />
            <Field
              label={t("auth.password")}
              type="password"
              value={password}
              onChange={setPassword}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            {error && (
              <p className="rounded-lg bg-danger/10 px-3 py-2 text-xs text-danger">{error}</p>
            )}
            <Button type="submit" className="w-full" size="lg" disabled={busy}>
              {isLogin ? t("auth.loginButton") : t("auth.signupButton")}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-line/15" />
            {t("auth.orContinueWith")}
            <span className="h-px flex-1 bg-line/15" />
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogle}>
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.61 0 3.06.56 4.21 1.64l3.16-3.16A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
            </svg>
            {t("auth.google")}
          </Button>

          <p className="mt-8 text-center text-sm text-muted">
            {isLogin ? t("auth.noAccount") : t("auth.haveAccount")}{" "}
            <Link
              href={isLogin ? "/signup" : "/login"}
              className="font-semibold text-primary hover:underline dark:text-primary-strong"
            >
              {isLogin ? t("nav.signup") : t("nav.login")}
            </Link>
          </p>

          {isDemo && (
            <p className="mt-6 text-center text-[11px] text-muted/70">{t("auth.demoNote")}</p>
          )}
        </div>
      </div>
    </main>
  );
}
