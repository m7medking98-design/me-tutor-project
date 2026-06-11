"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useLanguage } from "@/lib/language-context";

export function Testimonials() {
  const { t, loc } = useLanguage();

  const items = [
    {
      name: { ar: "زينب الموسوي", en: "Zainab Al-Mousawi", fr: "Zainab Al-Mousawi" },
      role: { ar: "طالبة هندسة — بغداد", en: "Engineering student — Baghdad", fr: "Étudiante en ingénierie — Bagdad" },
      text: {
        ar: "كنت أشاهد شروحات يوتيوب لسنين وأحس أني فاهمة، وبالامتحان أكتشف العكس. هنا المشرف كشف ثغراتي من أول أسبوع. الفرق مو طبيعي.",
        en: "I watched YouTube explanations for years thinking I understood, then exams proved otherwise. Here the mentor exposed my gaps in the first week. The difference is unreal.",
        fr: "Je regardais YouTube pendant des années en croyant comprendre, puis les examens prouvaient le contraire. Ici, le mentor a révélé mes lacunes dès la première semaine.",
      },
    },
    {
      name: { ar: "عبدالله القحطاني", en: "Abdullah Al-Qahtani", fr: "Abdullah Al-Qahtani" },
      role: { ar: "موظف يتعلم البرمجة — الرياض", en: "Professional learning to code — Riyadh", fr: "Professionnel apprenant à coder — Riyad" },
      text: {
        ar: "جربت ثلاث منصات قبل معيار. الفرق أن هنا أحد (حتى لو ذكاء اصطناعي) يقرأ كودي فعلياً ويقول لي وين الخطأ وليش. خلصت مسار بايثون كامل لأول مرة بحياتي.",
        en: "I tried three platforms before Miyar. The difference: here someone (even if AI) actually reads my code and tells me where and why I'm wrong. I finished a full Python track for the first time in my life.",
        fr: "J'ai essayé trois plateformes avant Miyar. La différence : ici, quelqu'un lit vraiment mon code et me dit où et pourquoi je me trompe. J'ai fini un parcours Python complet pour la première fois.",
      },
    },
    {
      name: { ar: "مريم حسن", en: "Mariam Hassan", fr: "Mariam Hassan" },
      role: { ar: "طالبة ثانوية — القاهرة", en: "High school student — Cairo", fr: "Lycéenne — Le Caire" },
      text: {
        ar: "التفاضل والتكامل كان كابوسي. المشرف شرح لي النهايات بثلاث طرق مختلفة لين فهمتها. درجتي ارتفعت من ٥٤٪ إلى ٨٩٪ في فصل واحد.",
        en: "Calculus was my nightmare. The mentor explained limits three different ways until it clicked. My grade went from 54% to 89% in one semester.",
        fr: "Le calcul était mon cauchemar. Le mentor a expliqué les limites de trois façons jusqu'au déclic. Ma note est passée de 54% à 89% en un semestre.",
      },
    },
    {
      name: { ar: "يوسف العبيدي", en: "Yousef Al-Obaidi", fr: "Yousef Al-Obaidi" },
      role: { ar: "مهندس كهرباء — البصرة", en: "Electrical engineer — Basra", fr: "Ingénieur électricien — Bassora" },
      text: {
        ar: "الشهادة هنا لها معنى لأنها تجي بعد تقييم حقيقي، مو بعد مشاهدة فيديوهات. حطيتها في سيرتي الذاتية وانسألت عنها بالمقابلة فعلاً.",
        en: "The certificate here means something because it comes after real assessment, not video-watching. I put it on my CV and was actually asked about it in an interview.",
        fr: "Le certificat a du sens ici car il vient après une vraie évaluation. Je l'ai mis sur mon CV et on m'a vraiment interrogé dessus en entretien.",
      },
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {t("landing.testimonialsTitle")}
        </h2>
        <p className="mt-3 text-muted">{t("landing.testimonialsSubtitle")}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <motion.figure
            key={loc(item.name)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.12 }}
            className="rounded-2xl bg-surface p-7 card-line"
          >
            <div className="flex gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 leading-relaxed text-ink">
              “{loc(item.text)}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Avatar name={loc(item.name)} />
              <div>
                <p className="text-sm font-semibold text-ink">{loc(item.name)}</p>
                <p className="text-xs text-muted">{loc(item.role)}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
