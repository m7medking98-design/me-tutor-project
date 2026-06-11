"use client";

import { motion } from "framer-motion";
import { Award, Bot, Compass } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { icon: Compass, title: t("landing.how1Title"), desc: t("landing.how1Desc") },
    { icon: Bot, title: t("landing.how2Title"), desc: t("landing.how2Desc") },
    { icon: Award, title: t("landing.how3Title"), desc: t("landing.how3Desc") },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t("landing.howTitle")}</h2>
        <p className="mt-3 text-muted">{t("landing.howSubtitle")}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative rounded-2xl bg-surface p-7 card-line"
          >
            <span className="absolute -top-3 end-6 grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-bold text-[#1a1205]">
              {i + 1}
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary dark:text-primary-strong">
              <step.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
