"use client";

import { InfoPage, type InfoSection } from "@/components/layout/InfoPage";

const sections: InfoSection[] = [
  {
    title: { ar: "قبول الشروط", en: "Accepting these terms", fr: "Acceptation des conditions" },
    paragraphs: [
      {
        ar: "باستخدامك منصة «معيار» أو إنشاء حساب فيها فأنت توافق على هذه الشروط. إن لم توافق على أي جزء منها، فلا تستخدم المنصة.",
        en: "By using the Miyar platform or creating an account, you agree to these terms. If you do not agree with any part of them, do not use the platform.",
        fr: "En utilisant la plateforme Miyar ou en créant un compte, vous acceptez ces conditions. Si vous n'êtes pas d'accord avec une partie d'entre elles, n'utilisez pas la plateforme.",
      },
    ],
  },
  {
    title: { ar: "الخدمة ومرحلتها الحالية", en: "The service and its current stage", fr: "Le service et son stade actuel" },
    paragraphs: [
      {
        ar: "معيار منصة تعلّم تقدم مناهج منظمة بإشراف مشرف ذكاء اصطناعي. المنصة حالياً في مرحلة بناء مبكرة (نسخة تجريبية): الميزات والمحتوى قيد التطوير المستمر، وقد تتغير أو تتوقف مؤقتاً دون إشعار مسبق. نعمل بجد لتكون التجربة مستقرة، لكننا لا نضمن خلوها من الانقطاعات في هذه المرحلة.",
        en: "Miyar is a learning platform offering structured curricula supervised by an AI mentor. The platform is currently in an early building stage (beta): features and content are under continuous development and may change or be temporarily unavailable without prior notice. We work hard to keep the experience stable, but we do not guarantee it will be uninterrupted at this stage.",
        fr: "Miyar est une plateforme d'apprentissage proposant des programmes structurés supervisés par un mentor IA. La plateforme est actuellement en phase de construction initiale (bêta) : les fonctionnalités et le contenu évoluent en continu et peuvent changer ou être temporairement indisponibles sans préavis. Nous travaillons dur pour une expérience stable, mais nous ne garantissons pas l'absence d'interruptions à ce stade.",
      },
    ],
  },
  {
    title: { ar: "حسابك", en: "Your account", fr: "Votre compte" },
    bullets: [
      {
        ar: "قدّم معلومات صحيحة عند التسجيل، وحافظ على سرية بيانات دخولك.",
        en: "Provide accurate information when signing up, and keep your login credentials confidential.",
        fr: "Fournissez des informations exactes à l'inscription et gardez vos identifiants confidentiels.",
      },
      {
        ar: "الحساب شخصي: تقدمك وشهادتك المستقبلية يجب أن يعكسا عملك أنت.",
        en: "Accounts are personal: your progress and any future certificate must reflect your own work.",
        fr: "Le compte est personnel : votre progression et tout futur certificat doivent refléter votre propre travail.",
      },
      {
        ar: "أنت مسؤول عما يحدث عبر حسابك. أخبرنا فوراً إن اشتبهت بوصول غير مصرح به.",
        en: "You are responsible for what happens through your account. Tell us immediately if you suspect unauthorized access.",
        fr: "Vous êtes responsable de ce qui se passe via votre compte. Prévenez-nous immédiatement en cas d'accès non autorisé suspecté.",
      },
    ],
    paragraphs: [],
  },
  {
    title: { ar: "الاستخدام المقبول", en: "Acceptable use", fr: "Utilisation acceptable" },
    paragraphs: [
      {
        ar: "معيار مكان للتعلم. يُمنع استخدام المنصة في أي مما يلي:",
        en: "Miyar is a place for learning. Using the platform for any of the following is prohibited:",
        fr: "Miyar est un lieu d'apprentissage. Il est interdit d'utiliser la plateforme pour :",
      },
    ],
    bullets: [
      {
        ar: "محاولة خداع نظام التقييم أو التحايل على نقاط التحقق أو انتحال عمل الآخرين.",
        en: "Attempting to cheat the assessment system, game the checkpoints, or pass off others' work as your own.",
        fr: "Tenter de tromper le système d'évaluation, de contourner les points de contrôle ou de vous approprier le travail d'autrui.",
      },
      {
        ar: "محاولة اختراق المنصة أو تعطيلها أو الوصول لبيانات مستخدمين آخرين.",
        en: "Attempting to breach, disrupt, or access other users' data on the platform.",
        fr: "Tenter de pirater ou perturber la plateforme, ou d'accéder aux données d'autres utilisateurs.",
      },
      {
        ar: "استخدام المشرف الذكي أو بيئة تنفيذ الكود لأغراض ضارة أو غير قانونية أو خارج نطاق التعلم.",
        en: "Using the AI mentor or the code execution environment for harmful, illegal, or non-learning purposes.",
        fr: "Utiliser le mentor IA ou l'environnement d'exécution de code à des fins nuisibles, illégales ou étrangères à l'apprentissage.",
      },
      {
        ar: "نسخ المناهج أو إعادة نشرها أو بيعها.",
        en: "Copying, republishing, or selling the curricula.",
        fr: "Copier, republier ou vendre les programmes.",
      },
    ],
  },
  {
    title: { ar: "المحتوى والملكية", en: "Content and ownership", fr: "Contenu et propriété" },
    paragraphs: [
      {
        ar: "المناهج والدروس والتمارين وتصميم المنصة ملك لمعيار، ولك رخصة استخدام شخصية غير تجارية لأغراض تعلمك. أما الكود الذي تكتبه أنت في التمارين فيبقى ملكك.",
        en: "The curricula, lessons, exercises and platform design belong to Miyar; you receive a personal, non-commercial license to use them for your learning. The code you write in exercises remains yours.",
        fr: "Les programmes, leçons, exercices et le design de la plateforme appartiennent à Miyar ; vous recevez une licence personnelle et non commerciale pour votre apprentissage. Le code que vous écrivez dans les exercices reste le vôtre.",
      },
    ],
  },
  {
    title: { ar: "المشرف الذكي: حدوده بصراحة", en: "The AI mentor: its limits, honestly", fr: "Le mentor IA : ses limites, honnêtement" },
    paragraphs: [
      {
        ar: "المشرف الذكي أداة تعليمية مبنية على نماذج ذكاء اصطناعي، وقد يخطئ أحياناً في شرح أو تقييم. هو مساعد للتعلم وليس مصدراً معصوماً ولا بديلاً عن استشارة مختص في الأمور المهنية أو الأكاديمية الرسمية. إن لاحظت خطأ واضحاً، أخبرنا — فهذا يحسّن المنصة للجميع.",
        en: "The AI mentor is an educational tool built on AI models, and it can occasionally be wrong in an explanation or an assessment. It is a learning aid, not an infallible source, and not a substitute for professional advice in formal professional or academic matters. If you notice a clear mistake, tell us — it improves the platform for everyone.",
        fr: "Le mentor IA est un outil éducatif fondé sur des modèles d'IA et peut parfois se tromper dans une explication ou une évaluation. C'est une aide à l'apprentissage, pas une source infaillible, ni un substitut à un avis professionnel pour les questions professionnelles ou académiques formelles. Si vous remarquez une erreur manifeste, dites-le-nous — cela améliore la plateforme pour tous.",
      },
    ],
  },
  {
    title: { ar: "الشهادات", en: "Certificates", fr: "Certificats" },
    paragraphs: [
      {
        ar: "شهادات معيار تمثل اجتيازك لتقييمات المنصة، وهي حالياً غير معتمدة من جهة حكومية أو أكاديمية رسمية. نعمل ضمن خطتنا على جعلها قابلة للتحقق من قبل أصحاب العمل ومرتبطة بأطر معترف بها، وسنعلن بوضوح عن أي اعتماد رسمي عند حصوله — لا قبله.",
        en: "Miyar certificates represent passing the platform's assessments. They are currently not accredited by a government or formal academic body. Our roadmap is to make them employer-verifiable and mapped to recognized frameworks, and we will clearly announce any official accreditation when it happens — not before.",
        fr: "Les certificats Miyar attestent la réussite des évaluations de la plateforme. Ils ne sont actuellement pas accrédités par un organisme gouvernemental ou académique officiel. Notre feuille de route vise à les rendre vérifiables par les employeurs et alignés sur des référentiels reconnus, et nous annoncerons clairement toute accréditation officielle lorsqu'elle aura lieu — pas avant.",
      },
    ],
  },
  {
    title: { ar: "الخطط والأسعار", en: "Plans and pricing", fr: "Offres et tarifs" },
    paragraphs: [
      {
        ar: "الاستخدام في المرحلة التجريبية الحالية مجاني. عند إطلاق الخطط المدفوعة ستكون لها شروط وأسعار معلنة بوضوح قبل أي دفع، ولن يُنقل أحد إلى خطة مدفوعة دون موافقته الصريحة.",
        en: "Use during the current beta stage is free. When paid plans launch, their terms and prices will be clearly stated before any payment, and no one will be moved to a paid plan without their explicit consent.",
        fr: "L'utilisation pendant la phase bêta actuelle est gratuite. Au lancement des offres payantes, leurs conditions et prix seront clairement indiqués avant tout paiement, et personne ne sera basculé vers une offre payante sans son consentement explicite.",
      },
    ],
  },
  {
    title: { ar: "إنهاء الحساب", en: "Account termination", fr: "Résiliation du compte" },
    paragraphs: [
      {
        ar: "يمكنك حذف حسابك في أي وقت (راجع سياسة الخصوصية). ويحق لنا تعليق أو إنهاء الحسابات التي تنتهك هذه الشروط انتهاكاً جسيماً أو متكرراً، مع إشعارك بالسبب ما أمكن.",
        en: "You can delete your account at any time (see the Privacy Policy). We may suspend or terminate accounts that seriously or repeatedly violate these terms, notifying you of the reason where possible.",
        fr: "Vous pouvez supprimer votre compte à tout moment (voir la Politique de confidentialité). Nous pouvons suspendre ou résilier les comptes qui violent gravement ou de façon répétée ces conditions, en vous notifiant la raison lorsque c'est possible.",
      },
    ],
  },
  {
    title: { ar: "حدود المسؤولية", en: "Limitation of liability", fr: "Limitation de responsabilité" },
    paragraphs: [
      {
        ar: "تُقدَّم المنصة «كما هي» في مرحلتها التجريبية. وإلى الحد الذي يسمح به القانون المعمول به، لا نتحمل مسؤولية أضرار غير مباشرة ناتجة عن استخدام المنصة أو تعذر استخدامها. لا شيء في هذه الشروط يلغي حقوقاً لا يجيز القانون التنازل عنها.",
        en: "The platform is provided “as is” during its beta stage. To the extent permitted by applicable law, we are not liable for indirect damages arising from using, or being unable to use, the platform. Nothing in these terms removes rights that the law does not allow to be waived.",
        fr: "La plateforme est fournie « telle quelle » pendant sa phase bêta. Dans la mesure permise par la loi applicable, nous ne sommes pas responsables des dommages indirects résultant de l'utilisation ou de l'impossibilité d'utiliser la plateforme. Rien dans ces conditions ne supprime des droits auxquels la loi ne permet pas de renoncer.",
      },
    ],
  },
  {
    title: { ar: "تعديل الشروط", en: "Changes to these terms", fr: "Modification des conditions" },
    paragraphs: [
      {
        ar: "قد نعدّل هذه الشروط مع تطور المنصة. سنحدّث تاريخ «آخر تحديث» أعلى الصفحة عند كل تغيير، وسنخبرك داخل المنصة بأي تغيير جوهري. استمرارك في الاستخدام بعد التغيير يعني موافقتك عليه.",
        en: "We may amend these terms as the platform evolves. We will update the date at the top of this page with every change, and notify you inside the platform of any material change. Continuing to use the platform after a change means you accept it.",
        fr: "Nous pouvons modifier ces conditions au fil de l'évolution de la plateforme. Nous mettrons à jour la date en haut de page à chaque changement et vous informerons dans la plateforme de tout changement important. Continuer à utiliser la plateforme après un changement vaut acceptation.",
      },
    ],
  },
  {
    title: { ar: "تواصل معنا", en: "Contact us", fr: "Contactez-nous" },
    paragraphs: [
      {
        ar: "لأي سؤال حول هذه الشروط: m7medking98@gmail.com",
        en: "For any question about these terms: m7medking98@gmail.com",
        fr: "Pour toute question sur ces conditions : m7medking98@gmail.com",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <InfoPage
      title={{ ar: "شروط الاستخدام", en: "Terms of Use", fr: "Conditions d'utilisation" }}
      intro={{
        ar: "قواعد واضحة وعادلة لاستخدام معيار — مكتوبة لتُفهم، لا لتُخيف.",
        en: "Clear, fair rules for using Miyar — written to be understood, not to intimidate.",
        fr: "Des règles claires et justes pour utiliser Miyar — écrites pour être comprises, pas pour intimider.",
      }}
      updated="2026-06-13"
      sections={sections}
    />
  );
}
