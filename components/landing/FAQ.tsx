"use client";

import { Accordion } from "@/components/ui/Accordion";
import { useLanguage } from "@/lib/language-context";

export function FAQ() {
  const { t, loc } = useLanguage();

  const faqs = [
    {
      id: "supervision",
      q: {
        ar: "ماذا يعني «التعلم بإشراف ذكي» عملياً؟",
        en: "What does 'AI-supervised learning' actually mean?",
        fr: "Que signifie « apprentissage supervisé par IA » concrètement ?",
      },
      a: {
        ar: "في كل درس، مشرف ذكي يتابع حلولك لحظة بلحظة: يقرأ الكود الذي تكتبه أو الحل الذي تقدمه، يحدد الخطأ بدقة، ويشرح لك لماذا أخطأت — لا يكتفي بإخبارك أن الإجابة خاطئة. ومع الوقت يبني خريطة لنقاط قوتك وضعفك ويوجه تعلمك بناءً عليها.",
        en: "In every lesson, an AI mentor follows your solutions in real time: it reads the code or solution you write, pinpoints the mistake precisely, and explains why you went wrong — not just that you did. Over time it builds a map of your strengths and weaknesses and steers your learning accordingly.",
        fr: "À chaque leçon, un mentor IA suit vos solutions en temps réel : il lit votre code, identifie précisément l'erreur et explique pourquoi — pas seulement que c'est faux. Avec le temps, il cartographie vos forces et faiblesses et oriente votre apprentissage.",
      },
    },
    {
      id: "certificates",
      q: {
        ar: "هل الشهادات معترف بها؟",
        en: "Are the certificates recognized?",
        fr: "Les certificats sont-ils reconnus ?",
      },
      a: {
        ar: "شهادات معيار تُمنح فقط بعد اجتياز تقييمات إتقان حقيقية، ولكل شهادة رقم اعتماد قابل للتحقق منه إلكترونياً. نعمل حالياً على شراكات اعتماد أكاديمية ومهنية لتوسيع الاعتراف الرسمي بها إقليمياً وعالمياً.",
        en: "Miyar certificates are awarded only after passing real mastery assessments, and every certificate carries a verifiable credential ID. We are actively building academic and professional accreditation partnerships to expand formal recognition regionally and globally.",
        fr: "Les certificats Miyar ne sont délivrés qu'après de vraies évaluations de maîtrise, avec un ID vérifiable en ligne. Nous développons des partenariats d'accréditation académiques et professionnels.",
      },
    },
    {
      id: "language",
      q: {
        ar: "هل المحتوى بالعربية فقط؟",
        en: "Is the content Arabic-only?",
        fr: "Le contenu est-il uniquement en arabe ?",
      },
      a: {
        ar: "العربية هي لغتنا الأولى، لكن المنصة تدعم الإنجليزية والفرنسية أيضاً. المصطلحات التقنية تُعرض بالعربية والإنجليزية معاً حتى تكون جاهزاً للدراسة الجامعية وسوق العمل العالمي.",
        en: "Arabic is our first language, but the platform also supports English and French. Technical terms are shown in both Arabic and English so you're ready for university study and the global job market.",
        fr: "L'arabe est notre première langue, mais la plateforme supporte aussi l'anglais et le français. Les termes techniques sont présentés en arabe et en anglais.",
      },
    },
    {
      id: "refund",
      q: {
        ar: "ماذا لو لم تناسبني المنصة؟",
        en: "What if the platform isn't for me?",
        fr: "Et si la plateforme ne me convient pas ?",
      },
      a: {
        ar: "تبدأ مجاناً بمسار كامل دون بطاقة دفع. وإذا اشتركت ولم تكن راضياً، نسترد لك المبلغ كاملاً خلال ١٤ يوماً من الاشتراك — بلا أسئلة.",
        en: "You start free with a full track, no card required. If you subscribe and aren't satisfied, we refund you in full within 14 days — no questions asked.",
        fr: "Vous commencez gratuitement avec un parcours complet, sans carte. Si vous n'êtes pas satisfait, remboursement intégral sous 14 jours.",
      },
    },
    {
      id: "level",
      q: {
        ar: "أنا مبتدئ تماماً — هل المنصة مناسبة لي؟",
        en: "I'm a complete beginner — is this for me?",
        fr: "Je suis débutant complet — est-ce pour moi ?",
      },
      a: {
        ar: "نعم، وربما أنت المستفيد الأكبر. المسارات تبدأ من الصفر الحقيقي، والمشرف الذكي يكيّف شرحه مع مستواك: إذا لم تفهم بطريقة، يعيد الشرح بطريقة أخرى حتى تفهم.",
        en: "Yes — you might benefit the most. Tracks start from true zero, and the mentor adapts its explanations to your level: if one way doesn't click, it re-explains another way until it does.",
        fr: "Oui — vous en profiterez peut-être le plus. Les parcours partent de zéro, et le mentor adapte ses explications à votre niveau.",
      },
    },
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-28">
      <h2 className="text-center text-3xl font-bold text-ink sm:text-4xl">
        {t("landing.faqTitle")}
      </h2>
      <div className="mt-12">
        <Accordion
          items={faqs.map((f) => ({
            id: f.id,
            title: loc(f.q),
            content: loc(f.a),
          }))}
        />
      </div>
    </section>
  );
}
