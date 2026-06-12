"use client";

import { InfoPage, type InfoSection } from "@/components/layout/InfoPage";

const sections: InfoSection[] = [
  {
    title: { ar: "لماذا معيار؟", en: "Why Miyar?", fr: "Pourquoi Miyar ?" },
    paragraphs: [
      {
        ar: "المحتوى التعليمي العربي على الإنترنت كثير، لكن أغلبه فيديوهات متفرقة تُشاهَد ثم تُنسى. المشاهدة وحدها لا تصنع مهارة. الذي يصنعها هو التطبيق الفعلي، وتصحيح الأخطاء لحظة وقوعها، وإشراف يتابع فهمك خطوة بخطوة — وهذا بالضبط ما لا توفره الفيديوهات.",
        en: "Arabic educational content online is abundant, but most of it is scattered videos that get watched and forgotten. Watching alone does not build skill. What builds it is real practice, mistakes corrected the moment they happen, and supervision that follows your understanding step by step — exactly what videos cannot provide.",
        fr: "Le contenu éducatif arabe en ligne est abondant, mais il s'agit surtout de vidéos éparses, regardées puis oubliées. Regarder ne construit pas une compétence. Ce qui la construit, c'est la pratique réelle, les erreurs corrigées au moment où elles surviennent, et une supervision qui suit votre compréhension pas à pas — exactement ce que les vidéos ne peuvent pas offrir.",
      },
      {
        ar: "بنينا «معيار» لتكون منصة تعلّم عربية بمعيار عالمي: مناهج مبنية بعمق في البرمجة والرياضيات والفيزياء والهندسة، يدرسها الطالب تحت إشراف مشرف ذكي حقيقي يراقب حلوله، ويصحح أخطاءه، ويعيد الشرح بالطريقة التي يفهمها هو تحديداً.",
        en: "We built Miyar to be an Arab learning platform with a global standard: deeply structured curricula in programming, math, physics and engineering, studied under a real AI mentor that watches the student's solutions, corrects their mistakes, and re-explains in the way they specifically understand.",
        fr: "Nous avons créé Miyar pour être une plateforme d'apprentissage arabe au standard mondial : des programmes construits en profondeur en programmation, mathématiques, physique et ingénierie, étudiés sous la supervision d'un vrai mentor IA qui observe les solutions de l'étudiant, corrige ses erreurs et réexplique de la manière qu'il comprend.",
      },
    ],
  },
  {
    title: { ar: "كيف نتعلّم في معيار", en: "How learning works at Miyar", fr: "Comment on apprend chez Miyar" },
    paragraphs: [
      {
        ar: "كل درس عملي في معيار له هدف واضح ونقاط تحقق محددة. تكتب الكود في بيئة تنفيذ حقيقية داخل المتصفح، وعند كل تشغيل يتحقق المشرف الذكي تلقائياً من نقاط التحقق ويخبرك أين وصلت بالضبط. وإن وقفت، فالمشرف بجانبك يوجهك نحو الحل دون أن يحله عنك — لأن الهدف أن تتعلم، لا أن تنسخ.",
        en: "Every hands-on lesson at Miyar has a clear objective and specific checkpoints. You write code in a real execution environment inside the browser, and on every run the AI mentor automatically verifies the checkpoints and tells you exactly where you stand. When you get stuck, the mentor guides you toward the solution without solving it for you — because the goal is that you learn, not that you copy.",
        fr: "Chaque leçon pratique chez Miyar a un objectif clair et des points de contrôle précis. Vous écrivez du code dans un environnement d'exécution réel dans le navigateur, et à chaque exécution le mentor IA vérifie automatiquement les points de contrôle et vous dit exactement où vous en êtes. Si vous bloquez, le mentor vous guide vers la solution sans la résoudre à votre place — car le but est que vous appreniez, pas que vous copiiez.",
      },
      {
        ar: "تقدمك محفوظ دائماً: الدروس المكتملة، نقاط الخبرة، أيام المواظبة، وحتى الكود الذي كتبته في كل تمرين — تعود فتجده كما تركته.",
        en: "Your progress is always saved: completed lessons, experience points, streak days, and even the code you wrote in every exercise — you come back and find it exactly as you left it.",
        fr: "Votre progression est toujours sauvegardée : leçons terminées, points d'expérience, jours de régularité, et même le code écrit dans chaque exercice — vous le retrouvez exactement comme vous l'avez laissé.",
      },
    ],
  },
  {
    title: { ar: "أين نحن الآن", en: "Where we are today", fr: "Où nous en sommes" },
    paragraphs: [
      {
        ar: "معيار في مرحلة البناء المبكرة، ونقولها بوضوح لأن الصدق أحد معاييرنا. المنصة والمشرف الذكي يعملان اليوم فعلياً، ونبني حالياً المسار الرائد الأول (أساسيات Python) مع دفعة تأسيسية من الطلاب تتعلم مجاناً وتشاركنا ملاحظاتها. ما يثبت نجاحه مع هذه الدفعة هو ما نوسعه لاحقاً إلى بقية المسارات.",
        en: "Miyar is in its early building phase, and we say that clearly because honesty is one of our standards. The platform and AI mentor genuinely work today, and we are currently building the first flagship track (Python Foundations) with a founding cohort of students who learn for free and share their feedback. What proves itself with this cohort is what we later expand to the remaining tracks.",
        fr: "Miyar est en phase de construction initiale, et nous le disons clairement car l'honnêteté fait partie de nos standards. La plateforme et le mentor IA fonctionnent réellement aujourd'hui, et nous construisons le premier parcours phare (les fondamentaux de Python) avec une cohorte fondatrice d'étudiants qui apprennent gratuitement et partagent leurs retours. Ce qui fait ses preuves avec cette cohorte sera ensuite étendu aux autres parcours.",
      },
      {
        ar: "هدفنا البعيد واضح: شهادات إتقان موثوقة يمكن لأصحاب العمل التحقق منها، مبنية على تقييم حقيقي لما تستطيع فعله — لا على عدد الفيديوهات التي شاهدتها.",
        en: "Our long-term goal is clear: trusted mastery certificates that employers can verify, built on real assessment of what you can do — not on how many videos you watched.",
        fr: "Notre objectif à long terme est clair : des certificats de maîtrise fiables et vérifiables par les employeurs, fondés sur une évaluation réelle de ce que vous savez faire — pas sur le nombre de vidéos regardées.",
      },
    ],
  },
  {
    title: { ar: "الفريق", en: "The team", fr: "L'équipe" },
    paragraphs: [
      {
        ar: "معيار يبنيه اليوم فريق صغير ملتزم بمعيار واحد: جودة تعليمية لا نقبل بأقل منها لأنفسنا. ومع نمو المنصة سينمو الفريق — إن كنت تشاركنا هذا المعيار، راسلنا.",
        en: "Miyar is built today by a small team committed to a single standard: educational quality we would accept for ourselves and nothing less. As the platform grows, the team will grow — if you share this standard, write to us.",
        fr: "Miyar est construit aujourd'hui par une petite équipe attachée à un seul standard : une qualité éducative que nous accepterions pour nous-mêmes, rien de moins. À mesure que la plateforme grandit, l'équipe grandira — si vous partagez ce standard, écrivez-nous.",
      },
    ],
  },
  {
    title: { ar: "تواصل معنا", en: "Contact us", fr: "Contactez-nous" },
    paragraphs: [
      {
        ar: "للأسئلة والملاحظات والشراكات: m7medking98@gmail.com — نقرأ كل رسالة.",
        en: "For questions, feedback and partnerships: m7medking98@gmail.com — we read every message.",
        fr: "Pour les questions, retours et partenariats : m7medking98@gmail.com — nous lisons chaque message.",
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <InfoPage
      title={{ ar: "من نحن", en: "About Miyar", fr: "À propos de Miyar" }}
      intro={{
        ar: "«معيار» منصة تعلّم عربية تؤمن أن طلابنا يستحقون تعليماً عميقاً ومُشرَفاً عليه وموثوقاً — لا مجرد فيديوهات.",
        en: "Miyar is an Arab learning platform built on the belief that our students deserve deep, supervised, trusted education — not just videos.",
        fr: "Miyar est une plateforme d'apprentissage arabe fondée sur la conviction que nos étudiants méritent une éducation profonde, supervisée et fiable — pas seulement des vidéos.",
      }}
      sections={sections}
    />
  );
}
