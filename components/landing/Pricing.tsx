"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";

export function Pricing() {
  const { t, loc } = useLanguage();

  const plans = [
    {
      name: t("landing.planFree"),
      desc: t("landing.planFreeDesc"),
      price: "$0",
      highlight: false,
      features: [
        { ar: "مسار واحد تجريبي كامل", en: "One full trial track", fr: "Un parcours d'essai complet" },
        { ar: "مشرف ذكي محدود (٢٠ سؤال شهرياً)", en: "Limited mentor (20 questions/mo)", fr: "Mentor limité (20 questions/mois)" },
        { ar: "تتبع التقدم الأساسي", en: "Basic progress tracking", fr: "Suivi de base" },
      ],
    },
    {
      name: t("landing.planBasic"),
      desc: t("landing.planBasicDesc"),
      price: "$9",
      highlight: true,
      features: [
        { ar: "مسار كامل من اختيارك", en: "One full track of your choice", fr: "Un parcours complet au choix" },
        { ar: "مشرف ذكي بلا حدود", en: "Unlimited AI mentor", fr: "Mentor IA illimité" },
        { ar: "تحليل نقاط الضعف الأسبوعي", en: "Weekly weak-point analysis", fr: "Analyse hebdomadaire des lacunes" },
        { ar: "شهادة إتمام للمسار", en: "Track completion certificate", fr: "Certificat de fin de parcours" },
      ],
    },
    {
      name: t("landing.planPro"),
      desc: t("landing.planProDesc"),
      price: "$19",
      highlight: false,
      features: [
        { ar: "كل المسارات الحالية والقادمة", en: "All current & future tracks", fr: "Tous les parcours actuels et futurs" },
        { ar: "مشرف ذكي بلا حدود + أولوية", en: "Unlimited mentor + priority", fr: "Mentor illimité + priorité" },
        { ar: "شهادات معتمدة قابلة للتحقق", en: "Verifiable accredited certificates", fr: "Certificats accrédités vérifiables" },
        { ar: "تقارير تقدم للأهل أو جهة العمل", en: "Progress reports for parents/employer", fr: "Rapports pour parents/employeur" },
      ],
    },
  ];

  return (
    <section id="pricing" className="border-y border-line/10 bg-surface/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            {t("landing.pricingTitle")}
          </h2>
          <p className="mt-3 text-muted">{t("landing.pricingSubtitle")}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl p-7 ${
                plan.highlight
                  ? "border-2 border-accent bg-surface shadow-xl shadow-accent/10 lg:-my-3 lg:py-10"
                  : "bg-surface card-line"
              }`}
            >
              {plan.highlight && (
                <Badge tone="gold" className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 px-3 py-1">
                  {t("landing.popular")}
                </Badge>
              )}
              <h3 className="text-lg font-bold text-ink">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.desc}</p>
              <p className="mt-5">
                <span className="text-4xl font-bold text-ink">{plan.price}</span>
                <span className="text-sm text-muted"> {t("landing.perMonth")}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f.en} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.highlight ? "text-accent" : "text-primary dark:text-primary-strong"
                      }`}
                    />
                    {loc(f)}
                  </li>
                ))}
              </ul>
              <Button
                href="/signup"
                variant={plan.highlight ? "gold" : "outline"}
                className="mt-7 w-full"
              >
                {t("common.start")}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
