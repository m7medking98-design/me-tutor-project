"use client";

import { InfoPage, type InfoSection } from "@/components/layout/InfoPage";

const sections: InfoSection[] = [
  {
    title: { ar: "ما البيانات التي نجمعها؟", en: "What data do we collect?", fr: "Quelles données collectons-nous ?" },
    paragraphs: [
      {
        ar: "نجمع فقط ما تحتاجه المنصة لتعمل من أجلك:",
        en: "We collect only what the platform needs to work for you:",
        fr: "Nous ne collectons que ce dont la plateforme a besoin pour fonctionner pour vous :",
      },
    ],
    bullets: [
      {
        ar: "بيانات الحساب: اسمك وبريدك الإلكتروني (وصورة حسابك إن سجّلت عبر Google).",
        en: "Account data: your name and email (and your profile photo if you sign in with Google).",
        fr: "Données de compte : votre nom et e-mail (et votre photo de profil si vous vous connectez via Google).",
      },
      {
        ar: "بيانات التعلّم: المسارات التي التحقت بها، الدروس المكتملة، نتائج نقاط التحقق، الكود الذي تكتبه في التمارين، نقاط الخبرة وأيام المواظبة.",
        en: "Learning data: the tracks you enroll in, completed lessons, checkpoint results, the code you write in exercises, experience points and streak days.",
        fr: "Données d'apprentissage : les parcours suivis, leçons terminées, résultats des points de contrôle, le code écrit dans les exercices, points d'expérience et jours de régularité.",
      },
      {
        ar: "محادثات المشرف الذكي: الرسائل التي ترسلها للمشرف داخل الدروس.",
        en: "AI mentor conversations: the messages you send to the mentor inside lessons.",
        fr: "Conversations avec le mentor IA : les messages envoyés au mentor dans les leçons.",
      },
      {
        ar: "تفضيلاتك: لغة الواجهة والمظهر (داكن/فاتح).",
        en: "Your preferences: interface language and theme (dark/light).",
        fr: "Vos préférences : langue de l'interface et thème (sombre/clair).",
      },
    ],
  },
  {
    title: { ar: "كيف نستخدم بياناتك؟", en: "How do we use your data?", fr: "Comment utilisons-nous vos données ?" },
    bullets: [
      {
        ar: "لتشغيل حسابك وحفظ تقدمك حتى تكمل من حيث توقفت على أي جهاز.",
        en: "To run your account and save your progress so you can continue where you left off, on any device.",
        fr: "Pour gérer votre compte et sauvegarder votre progression afin de reprendre où vous vous êtes arrêté, sur n'importe quel appareil.",
      },
      {
        ar: "ليتمكن المشرف الذكي من مساعدتك: يرى هدف الدرس والكود الذي كتبته كي يوجهك بدقة.",
        en: "To let the AI mentor help you: it sees the lesson objective and the code you wrote so it can guide you precisely.",
        fr: "Pour que le mentor IA puisse vous aider : il voit l'objectif de la leçon et votre code afin de vous guider précisément.",
      },
      {
        ar: "لتحسين المنصة والمناهج بناءً على ما يصعب على الطلاب فعلياً.",
        en: "To improve the platform and curricula based on what students actually struggle with.",
        fr: "Pour améliorer la plateforme et les programmes selon les difficultés réelles des étudiants.",
      },
    ],
    paragraphs: [],
  },
  {
    title: { ar: "المشرف الذكي وبياناتك", en: "The AI mentor and your data", fr: "Le mentor IA et vos données" },
    paragraphs: [
      {
        ar: "عندما تتحدث مع المشرف أو تشغّل تمريناً، تُرسل رسالتك وكودك وسياق الدرس إلى مزود الذكاء الاصطناعي (Anthropic) لتوليد الرد والتقييم. لا تُستخدم هذه البيانات لتدريب نماذجهم. ننصحك بعدم مشاركة معلومات شخصية حساسة في محادثات المشرف — فهي ببساطة ليست مكانها.",
        en: "When you chat with the mentor or run an exercise, your message, your code and the lesson context are sent to our AI provider (Anthropic) to generate the reply and the assessment. This data is not used to train their models. We advise against sharing sensitive personal information in mentor chats — it simply does not belong there.",
        fr: "Lorsque vous parlez au mentor ou exécutez un exercice, votre message, votre code et le contexte de la leçon sont envoyés à notre fournisseur d'IA (Anthropic) pour générer la réponse et l'évaluation. Ces données ne servent pas à entraîner leurs modèles. Nous vous déconseillons de partager des informations personnelles sensibles dans les conversations — ce n'est simplement pas leur place.",
      },
    ],
  },
  {
    title: { ar: "أين تُخزَّن بياناتك؟", en: "Where is your data stored?", fr: "Où sont stockées vos données ?" },
    paragraphs: [
      {
        ar: "حسابك وبيانات تعلمك تُخزن لدى Google Firebase (المصادقة وقاعدة البيانات)، وتحميها قواعد وصول صارمة: لا يستطيع أي مستخدم قراءة أو تعديل بيانات مستخدم آخر.",
        en: "Your account and learning data are stored with Google Firebase (authentication and database), protected by strict access rules: no user can read or modify another user's data.",
        fr: "Votre compte et vos données d'apprentissage sont stockés chez Google Firebase (authentification et base de données), protégés par des règles d'accès strictes : aucun utilisateur ne peut lire ou modifier les données d'un autre.",
      },
    ],
  },
  {
    title: { ar: "ما الذي لا نفعله أبداً", en: "What we never do", fr: "Ce que nous ne faisons jamais" },
    bullets: [
      { ar: "لا نبيع بياناتك لأي جهة.", en: "We do not sell your data to anyone.", fr: "Nous ne vendons vos données à personne." },
      { ar: "لا نعرض إعلانات ولا نشارك بياناتك مع معلنين.", en: "We do not show ads or share your data with advertisers.", fr: "Nous n'affichons pas de publicité et ne partageons pas vos données avec des annonceurs." },
      {
        ar: "لا نشارك بياناتك مع أي طرف ثالث باستثناء مزودي الخدمة المذكورين أعلاه (Google Firebase وAnthropic) وبالقدر اللازم لتشغيل المنصة فقط.",
        en: "We do not share your data with any third party except the service providers named above (Google Firebase and Anthropic), and only to the extent needed to run the platform.",
        fr: "Nous ne partageons vos données avec aucun tiers, à l'exception des prestataires nommés ci-dessus (Google Firebase et Anthropic), et uniquement dans la mesure nécessaire au fonctionnement de la plateforme.",
      },
    ],
    paragraphs: [],
  },
  {
    title: { ar: "الكوكيز (Cookies)", en: "Cookies", fr: "Cookies" },
    paragraphs: [
      {
        ar: "نستخدم كوكيز محدودة وضرورية فقط: واحدة لحفظ لغة الواجهة التي اخترتها، وما يحتاجه Firebase لإبقائك مسجّل الدخول. لا كوكيز تتبع، ولا كوكيز إعلانية.",
        en: "We use only limited, essential cookies: one to remember your chosen interface language, and what Firebase needs to keep you signed in. No tracking cookies, no advertising cookies.",
        fr: "Nous n'utilisons que des cookies limités et essentiels : un pour mémoriser la langue choisie, et ce dont Firebase a besoin pour vous garder connecté. Pas de cookies de suivi, pas de cookies publicitaires.",
      },
    ],
  },
  {
    title: { ar: "حقوقك", en: "Your rights", fr: "Vos droits" },
    paragraphs: [
      {
        ar: "بياناتك ملكك. يمكنك في أي وقت طلب نسخة من بياناتك أو حذف حسابك وكل ما يرتبط به نهائياً بمراسلتنا على البريد أدناه، وننفذ الطلب خلال مدة معقولة لا تتجاوز 30 يوماً.",
        en: "Your data is yours. You can at any time request a copy of your data, or the permanent deletion of your account and everything linked to it, by emailing us at the address below. We honor requests within a reasonable period not exceeding 30 days.",
        fr: "Vos données vous appartiennent. Vous pouvez à tout moment demander une copie de vos données, ou la suppression définitive de votre compte et de tout ce qui y est lié, en nous écrivant à l'adresse ci-dessous. Nous traitons les demandes dans un délai raisonnable n'excédant pas 30 jours.",
      },
    ],
  },
  {
    title: { ar: "الأعمار الصغيرة", en: "Younger students", fr: "Les jeunes étudiants" },
    paragraphs: [
      {
        ar: "معيار موجهة لمن هم في سن 13 عاماً فأكثر. من هم دون ذلك يحتاجون موافقة ولي الأمر وإشرافه لاستخدام المنصة.",
        en: "Miyar is intended for ages 13 and above. Younger students need a parent's or guardian's consent and supervision to use the platform.",
        fr: "Miyar s'adresse aux 13 ans et plus. Les plus jeunes ont besoin du consentement et de la supervision d'un parent ou tuteur pour utiliser la plateforme.",
      },
    ],
  },
  {
    title: { ar: "تحديثات هذه السياسة", en: "Updates to this policy", fr: "Mises à jour de cette politique" },
    paragraphs: [
      {
        ar: "قد نحدّث هذه السياسة مع تطور المنصة. عند أي تغيير جوهري سنحدّث تاريخ «آخر تحديث» أعلى الصفحة، وسنخبرك داخل المنصة إن كان التغيير يمسّ بياناتك بشكل مهم.",
        en: "We may update this policy as the platform evolves. For any material change we will update the date at the top of this page, and notify you inside the platform if the change meaningfully affects your data.",
        fr: "Nous pouvons mettre à jour cette politique au fil de l'évolution de la plateforme. Pour tout changement important, nous mettrons à jour la date en haut de page et vous informerons dans la plateforme si le changement affecte significativement vos données.",
      },
    ],
  },
  {
    title: { ar: "تواصل معنا", en: "Contact us", fr: "Contactez-nous" },
    paragraphs: [
      {
        ar: "لأي سؤال يخص خصوصيتك أو بياناتك: m7medking98@gmail.com",
        en: "For any question about your privacy or your data: m7medking98@gmail.com",
        fr: "Pour toute question concernant votre vie privée ou vos données : m7medking98@gmail.com",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <InfoPage
      title={{ ar: "سياسة الخصوصية", en: "Privacy Policy", fr: "Politique de confidentialité" }}
      intro={{
        ar: "خصوصيتك جزء من معيارنا. هذه الصفحة تشرح بلغة واضحة — لا بلغة المحامين — ما نجمعه من بيانات، ولماذا، وما حقوقك عليها.",
        en: "Your privacy is part of our standard. This page explains in plain language — not legalese — what data we collect, why, and what rights you have over it.",
        fr: "Votre vie privée fait partie de notre standard. Cette page explique en langage clair — pas en jargon juridique — quelles données nous collectons, pourquoi, et quels sont vos droits.",
      }}
      updated="2026-06-13"
      sections={sections}
    />
  );
}
