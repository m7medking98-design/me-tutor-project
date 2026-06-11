"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";

export function FinalCta() {
  const { t } = useLanguage();
  return (
    <section className="glow-teal border-t border-line/10">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            {t("landing.ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t("landing.ctaSubtitle")}</p>
          <Button href="/signup" variant="gold" size="lg" className="mt-8">
            {t("landing.ctaButton")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
