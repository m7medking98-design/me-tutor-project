"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, CheckCircle2, Play } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

/** Looping animated mock of the learning screen — the product's core differentiator. */
export function MentorPreview() {
  const { t, locale } = useLanguage();
  const [step, setStep] = useState(0);

  const script =
    locale === "ar"
      ? [
          { role: "user", text: "كتبت الحل… لكن النتيجة خاطئة 🤔" },
          { role: "mentor", text: "أرى المشكلة: في السطر ٣ استخدمت = بدل ==. الأول يخزّن قيمة، والثاني يقارن." },
          { role: "user", text: "آه فهمت! جربت وضبطت ✅" },
          { role: "mentor", text: "ممتاز! لاحظت أنك أتقنت الشروط الآن — ننتقل للحلقات؟" },
        ]
      : locale === "fr"
      ? [
          { role: "user", text: "J'ai écrit la solution… mais le résultat est faux 🤔" },
          { role: "mentor", text: "Je vois le problème : ligne 3, vous avez mis = au lieu de ==. Le premier affecte, le second compare." },
          { role: "user", text: "Ah compris ! Ça marche ✅" },
          { role: "mentor", text: "Excellent ! Les conditions sont maîtrisées — on passe aux boucles ?" },
        ]
      : [
          { role: "user", text: "I wrote the solution… but the output is wrong 🤔" },
          { role: "mentor", text: "I see it: on line 3 you used = instead of ==. The first assigns, the second compares." },
          { role: "user", text: "Oh I get it! Fixed and it works ✅" },
          { role: "mentor", text: "Excellent! Conditions are mastered now — ready for loops?" },
        ];

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % (script.length + 2)); // +2 = pause before restart
    }, 2600);
    return () => clearInterval(id);
  }, [script.length]);

  const visible = script.slice(0, Math.min(step + 1, script.length));

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* glow behind the frame */}
      <div className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl bg-surface card-line shadow-2xl shadow-black/20">
        {/* fake window header */}
        <div className="flex items-center justify-between border-b border-line/10 bg-surface-2/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary dark:text-primary-strong">
              <Bot className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold text-ink">
              {t("landing.mentorPreviewTitle")}
            </span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-success">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-success" />
            online
          </span>
        </div>

        {/* mini lesson strip */}
        <div className="flex items-center gap-3 border-b border-line/10 px-4 py-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-teal-600 to-cyan-800 text-white">
            <Play className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="h-2 w-3/4 rounded bg-surface-2" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded bg-surface-2" />
          </div>
          <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
        </div>

        {/* chat area */}
        <div className="flex min-h-[230px] flex-col justify-end gap-2.5 p-4">
          <AnimatePresence mode="popLayout">
            {visible.map((msg, i) => (
              <motion.div
                key={`${step >= script.length ? "loop" : "run"}-${i}`}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.role === "mentor"
                    ? "self-start rounded-es-md bg-primary/10 text-ink"
                    : "self-end rounded-ee-md bg-surface-2 text-ink"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
