"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MentorPreview } from "@/components/landing/MentorPreview";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t } = useLanguage();

  const stats = [
    { value: "+18,000", label: t("landing.heroStat1") },
    { value: "87%", label: t("landing.heroStat2") },
    { value: "4.9/5", label: t("landing.heroStat3") },
  ];

  return (
    <section className="glow-teal relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pb-28 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t("landing.heroBadge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
          >
            {t("landing.heroTitle1")}{" "}
            <span className="text-gold-gradient">{t("landing.heroTitle2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {t("landing.heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="/signup" variant="gold" size="lg">
              {t("landing.heroCta")}
            </Button>
            <Button href="/courses" variant="outline" size="lg">
              {t("landing.heroSecondary")}
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-bold text-ink">{s.value}</dt>
                <dd className="text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <MentorPreview />
        </motion.div>
      </div>
    </section>
  );
}
