import type {
  Certificate,
  Course,
  Enrollment,
  MasteryRecord,
  Milestone,
  SessionRecord,
  UserProfile,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/* Courses                                                             */
/* ------------------------------------------------------------------ */

export const courses: Course[] = [
  {
    id: "c-python",
    slug: "python-foundations",
    title: {
      ar: "أساسيات بايثون",
      en: "Python Foundations",
      fr: "Fondamentaux de Python",
    },
    tagline: {
      ar: "من الصفر إلى كتابة برامج حقيقية، بإشراف مباشر على كل سطر تكتبه.",
      en: "From zero to real programs, with supervision on every line you write.",
      fr: "De zéro à de vrais programmes, avec un suivi de chaque ligne écrite.",
    },
    description: {
      ar: "مسار متكامل لتعلم لغة بايثون من البداية. لن تشاهد فقط — ستكتب الكود بنفسك داخل بيئة العمل، والمشرف الذكي يصحح أخطاءك فور حدوثها ويشرح السبب بطريقة تناسب مستواك.",
      en: "A complete path to learning Python from scratch. You won't just watch — you'll write code yourself in the workspace, and the AI mentor corrects your mistakes the moment they happen and explains why.",
      fr: "Un parcours complet pour apprendre Python depuis le début. Vous ne regardez pas seulement — vous écrivez le code vous-même, et le mentor IA corrige vos erreurs immédiatement.",
    },
    category: "programming",
    level: "beginner",
    languages: ["ar", "en"],
    totalHours: 32,
    enrolledCount: 4820,
    rating: 4.9,
    certificate: true,
    gradient: "from-teal-600 via-cyan-700 to-slate-800",
    outcomes: [
      {
        ar: "كتابة برامج بايثون كاملة من الصفر",
        en: "Write complete Python programs from scratch",
        fr: "Écrire des programmes Python complets",
      },
      {
        ar: "فهم المتغيرات، الشروط، الحلقات والدوال فهماً عميقاً",
        en: "Deeply understand variables, conditions, loops and functions",
        fr: "Comprendre variables, conditions, boucles et fonctions",
      },
      {
        ar: "حل مشكلات برمجية حقيقية وتصحيح الأخطاء بنفسك",
        en: "Solve real programming problems and debug independently",
        fr: "Résoudre de vrais problèmes et déboguer seul",
      },
    ],
    modules: [
      {
        id: "m-py-1",
        title: { ar: "البداية الصحيحة", en: "The Right Start", fr: "Le bon départ" },
        lessons: [
          {
            id: "l-py-1-1",
            slug: "what-is-programming",
            title: { ar: "ما هي البرمجة؟", en: "What is Programming?", fr: "Qu'est-ce que la programmation ?" },
            type: "video",
            durationMin: 12,
            chapters: [
              { time: "00:00", title: { ar: "لماذا نبرمج؟", en: "Why do we code?", fr: "Pourquoi coder ?" } },
              { time: "04:30", title: { ar: "كيف يفكر الحاسوب", en: "How computers think", fr: "Comment pense l'ordinateur" } },
              { time: "08:15", title: { ar: "أول نظرة على بايثون", en: "First look at Python", fr: "Premier aperçu de Python" } },
            ],
          },
          {
            id: "l-py-1-2",
            slug: "first-program",
            title: { ar: "برنامجك الأول", en: "Your First Program", fr: "Votre premier programme" },
            type: "workspace",
            durationMin: 20,
            starterCode: `# اكتب برنامجك الأول هنا
# مهمتك: اطبع التحية التالية على الشاشة

print("مرحباً يا معيار!")

# جرّب الآن: اطبع اسمك في سطر جديد
`,
          },
          {
            id: "l-py-1-3",
            slug: "variables",
            title: { ar: "المتغيرات وأنواع البيانات", en: "Variables & Data Types", fr: "Variables et types de données" },
            type: "reference",
            durationMin: 15,
            sections: [
              { ar: "ما هو المتغير؟", en: "What is a variable?", fr: "Qu'est-ce qu'une variable ?" },
              { ar: "الأرقام والنصوص", en: "Numbers and strings", fr: "Nombres et chaînes" },
              { ar: "قواعد التسمية", en: "Naming rules", fr: "Règles de nommage" },
              { ar: "أخطاء شائعة", en: "Common mistakes", fr: "Erreurs courantes" },
            ],
          },
          {
            id: "l-py-1-4",
            slug: "variables-practice",
            title: { ar: "تمرين: المتغيرات", en: "Practice: Variables", fr: "Exercice : Variables" },
            type: "workspace",
            durationMin: 25,
            starterCode: `# تمرين المتغيرات
# 1) أنشئ متغيراً باسم age يحمل عمرك
# 2) أنشئ متغيراً باسم name يحمل اسمك
# 3) اطبع جملة تعرّف عن نفسك باستخدام المتغيرين

`,
          },
        ],
      },
      {
        id: "m-py-2",
        title: { ar: "التحكم في مسار البرنامج", en: "Controlling Program Flow", fr: "Contrôler le flux" },
        lessons: [
          {
            id: "l-py-2-1",
            slug: "conditions",
            title: { ar: "الشروط واتخاذ القرار", en: "Conditions & Decisions", fr: "Conditions et décisions" },
            type: "video",
            durationMin: 18,
            chapters: [
              { time: "00:00", title: { ar: "جملة if", en: "The if statement", fr: "L'instruction if" } },
              { time: "07:20", title: { ar: "else و elif", en: "else and elif", fr: "else et elif" } },
              { time: "13:00", title: { ar: "المقارنات المنطقية", en: "Logical comparisons", fr: "Comparaisons logiques" } },
            ],
          },
          {
            id: "l-py-2-2",
            slug: "conditions-practice",
            title: { ar: "تمرين: بوابة العمر", en: "Practice: Age Gate", fr: "Exercice : Contrôle d'âge" },
            type: "workspace",
            durationMin: 25,
            starterCode: `# تمرين: بوابة العمر
# اكتب برنامجاً يتحقق من متغير age:
# - إذا كان 18 أو أكثر: اطبع "مسموح بالدخول"
# - غير ذلك: اطبع "غير مسموح"

age = 16

`,
          },
          {
            id: "l-py-2-3",
            slug: "loops",
            title: { ar: "الحلقات التكرارية", en: "Loops", fr: "Les boucles" },
            type: "video",
            durationMin: 22,
            chapters: [
              { time: "00:00", title: { ar: "حلقة for", en: "The for loop", fr: "La boucle for" } },
              { time: "09:00", title: { ar: "حلقة while", en: "The while loop", fr: "La boucle while" } },
              { time: "16:30", title: { ar: "break و continue", en: "break and continue", fr: "break et continue" } },
            ],
          },
          {
            id: "l-py-2-4",
            slug: "loops-practice",
            title: { ar: "تمرين: جدول الضرب", en: "Practice: Times Table", fr: "Exercice : Table de multiplication" },
            type: "workspace",
            durationMin: 30,
            starterCode: `# تمرين: جدول الضرب
# اطبع جدول ضرب الرقم 7 من 1 إلى 10
# الناتج المتوقع: 7 x 1 = 7 ... وهكذا

`,
          },
        ],
      },
      {
        id: "m-py-3",
        title: { ar: "الدوال وتنظيم الكود", en: "Functions & Clean Code", fr: "Fonctions et code propre" },
        lessons: [
          {
            id: "l-py-3-1",
            slug: "functions",
            title: { ar: "الدوال: قوة إعادة الاستخدام", en: "Functions: The Power of Reuse", fr: "Fonctions : la réutilisation" },
            type: "video",
            durationMin: 20,
            chapters: [
              { time: "00:00", title: { ar: "تعريف الدالة", en: "Defining a function", fr: "Définir une fonction" } },
              { time: "08:00", title: { ar: "المعاملات والقيم المعادة", en: "Parameters & return values", fr: "Paramètres et retours" } },
            ],
          },
          {
            id: "l-py-3-2",
            slug: "functions-reference",
            title: { ar: "مرجع: أفضل ممارسات الدوال", en: "Reference: Function Best Practices", fr: "Référence : bonnes pratiques" },
            type: "reference",
            durationMin: 12,
            sections: [
              { ar: "متى تنشئ دالة؟", en: "When to create a function", fr: "Quand créer une fonction" },
              { ar: "تسمية واضحة", en: "Clear naming", fr: "Nommage clair" },
              { ar: "دالة واحدة، مهمة واحدة", en: "One function, one job", fr: "Une fonction, une tâche" },
            ],
          },
          {
            id: "l-py-3-3",
            slug: "final-project",
            title: { ar: "المشروع الختامي: حاسبة ذكية", en: "Final Project: Smart Calculator", fr: "Projet final : Calculatrice" },
            type: "workspace",
            durationMin: 45,
            starterCode: `# المشروع الختامي: حاسبة ذكية
# اكتب دالة calculate(a, b, op) تدعم: + - * /
# تذكّر: تعامل مع القسمة على صفر!

def calculate(a, b, op):
    pass  # ابدأ من هنا

`,
          },
        ],
      },
    ],
  },
  {
    id: "c-webdev",
    slug: "web-development",
    title: { ar: "تطوير الويب الحديث", en: "Modern Web Development", fr: "Développement Web moderne" },
    tagline: {
      ar: "HTML و CSS و JavaScript — ابنِ مواقع حقيقية منذ الأسبوع الأول.",
      en: "HTML, CSS & JavaScript — build real websites from week one.",
      fr: "HTML, CSS et JavaScript — créez de vrais sites dès la première semaine.",
    },
    description: {
      ar: "تعلم بناء مواقع ويب احترافية من الصفر: هيكلة الصفحات، التنسيق المتجاوب، ثم البرمجة التفاعلية بجافاسكريبت. كل درس ينتهي بقطعة حقيقية من موقعك الخاص.",
      en: "Learn to build professional websites from scratch: page structure, responsive styling, then interactive JavaScript. Every lesson ends with a real piece of your own site.",
      fr: "Apprenez à créer des sites professionnels : structure, style responsive, puis JavaScript interactif.",
    },
    category: "programming",
    level: "beginner",
    languages: ["ar", "en", "fr"],
    totalHours: 40,
    enrolledCount: 3650,
    rating: 4.8,
    certificate: true,
    gradient: "from-sky-600 via-blue-700 to-indigo-900",
    outcomes: [
      { ar: "بناء موقع متجاوب كامل بنفسك", en: "Build a full responsive website yourself", fr: "Créer un site responsive complet" },
      { ar: "إتقان أساسيات JavaScript التفاعلية", en: "Master interactive JavaScript basics", fr: "Maîtriser les bases de JavaScript" },
    ],
    modules: [
      {
        id: "m-web-1",
        title: { ar: "هيكل الصفحة: HTML", en: "Page Structure: HTML", fr: "Structure : HTML" },
        lessons: [
          { id: "l-web-1-1", slug: "html-intro", title: { ar: "مدخل إلى HTML", en: "Intro to HTML", fr: "Intro à HTML" }, type: "video", durationMin: 15 },
          {
            id: "l-web-1-2", slug: "html-practice",
            title: { ar: "تمرين: صفحتك الأولى", en: "Practice: Your First Page", fr: "Exercice : première page" },
            type: "workspace", durationMin: 25,
            starterCode: `<!-- اكتب صفحتك الأولى -->\n<!DOCTYPE html>\n<html dir="rtl" lang="ar">\n  <head>\n    <title>صفحتي</title>\n  </head>\n  <body>\n    <!-- أضف عنواناً وفقرة هنا -->\n  </body>\n</html>\n`,
          },
        ],
      },
      {
        id: "m-web-2",
        title: { ar: "الجمال والتنسيق: CSS", en: "Styling: CSS", fr: "Style : CSS" },
        lessons: [
          { id: "l-web-2-1", slug: "css-intro", title: { ar: "مدخل إلى CSS", en: "Intro to CSS", fr: "Intro à CSS" }, type: "video", durationMin: 18 },
          {
            id: "l-web-2-2", slug: "css-reference",
            title: { ar: "مرجع: نموذج الصندوق", en: "Reference: The Box Model", fr: "Référence : le modèle de boîte" },
            type: "reference", durationMin: 10,
            sections: [
              { ar: "Margin و Padding", en: "Margin & Padding", fr: "Margin et Padding" },
              { ar: "الحدود والأبعاد", en: "Borders & sizing", fr: "Bordures et tailles" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "c-calculus",
    slug: "calculus-1",
    title: { ar: "التفاضل والتكامل ١", en: "Calculus I", fr: "Calcul différentiel I" },
    tagline: {
      ar: "افهم النهايات والمشتقات فهماً بصرياً عميقاً — لا حفظاً للقوانين.",
      en: "Understand limits and derivatives deeply and visually — not by memorizing rules.",
      fr: "Comprenez limites et dérivées en profondeur — pas par cœur.",
    },
    description: {
      ar: "مساق جامعي كامل في التفاضل والتكامل يركز على الفهم البصري والحدسي. المشرف الذكي يحل معك خطوة بخطوة ويكشف بالضبط أين يختل فهمك.",
      en: "A complete university-level calculus course focused on visual, intuitive understanding. The AI mentor solves with you step by step and pinpoints exactly where your understanding breaks.",
      fr: "Un cours universitaire complet axé sur la compréhension visuelle et intuitive.",
    },
    category: "math",
    level: "intermediate",
    languages: ["ar", "en"],
    totalHours: 48,
    enrolledCount: 2940,
    rating: 4.9,
    certificate: true,
    gradient: "from-emerald-600 via-teal-700 to-cyan-900",
    outcomes: [
      { ar: "حساب النهايات والمشتقات بثقة", en: "Compute limits and derivatives confidently", fr: "Calculer limites et dérivées avec confiance" },
      { ar: "تطبيق المشتقات على مسائل حقيقية", en: "Apply derivatives to real problems", fr: "Appliquer les dérivées à des problèmes réels" },
    ],
    modules: [
      {
        id: "m-calc-1",
        title: { ar: "النهايات", en: "Limits", fr: "Les limites" },
        lessons: [
          { id: "l-calc-1-1", slug: "limits-intuition", title: { ar: "حدس النهايات", en: "Limit Intuition", fr: "Intuition des limites" }, type: "video", durationMin: 25 },
          {
            id: "l-calc-1-2", slug: "limits-reference",
            title: { ar: "مرجع: قوانين النهايات", en: "Reference: Limit Laws", fr: "Référence : lois des limites" },
            type: "reference", durationMin: 20,
            sections: [
              { ar: "النهايات من الطرفين", en: "Two-sided limits", fr: "Limites bilatérales" },
              { ar: "النهايات اللانهائية", en: "Infinite limits", fr: "Limites infinies" },
              { ar: "الاستمرارية", en: "Continuity", fr: "Continuité" },
            ],
          },
        ],
      },
      {
        id: "m-calc-2",
        title: { ar: "المشتقات", en: "Derivatives", fr: "Les dérivées" },
        lessons: [
          { id: "l-calc-2-1", slug: "derivative-definition", title: { ar: "تعريف المشتقة", en: "Defining the Derivative", fr: "Définition de la dérivée" }, type: "video", durationMin: 28 },
        ],
      },
    ],
  },
  {
    id: "c-physics",
    slug: "physics-mechanics",
    title: { ar: "الفيزياء: الميكانيكا", en: "Physics: Mechanics", fr: "Physique : Mécanique" },
    tagline: {
      ar: "نيوتن كما لم تفهمه من قبل — كل قانون مرتبط بمشهد من حياتك.",
      en: "Newton like you've never understood before — every law tied to real life.",
      fr: "Newton comme jamais auparavant — chaque loi liée à la vie réelle.",
    },
    description: {
      ar: "أسس الميكانيكا الكلاسيكية: الحركة، القوى، الطاقة والزخم. تجارب محاكاة تفاعلية ومسائل تُحل بإشراف ذكي يمنعك من الحفظ الأعمى.",
      en: "Classical mechanics foundations: motion, forces, energy and momentum. Interactive simulations and supervised problem solving that prevents blind memorization.",
      fr: "Fondements de la mécanique classique : mouvement, forces, énergie et quantité de mouvement.",
    },
    category: "physics",
    level: "intermediate",
    languages: ["ar", "en"],
    totalHours: 36,
    enrolledCount: 1875,
    rating: 4.7,
    certificate: true,
    gradient: "from-violet-600 via-purple-700 to-fuchsia-900",
    outcomes: [
      { ar: "تحليل الحركة والقوى رياضياً", en: "Analyze motion and forces mathematically", fr: "Analyser mouvement et forces" },
    ],
    modules: [
      {
        id: "m-phys-1",
        title: { ar: "الحركة في بعد واحد", en: "Motion in One Dimension", fr: "Mouvement en 1D" },
        lessons: [
          { id: "l-phys-1-1", slug: "kinematics", title: { ar: "الكينماتيكا", en: "Kinematics", fr: "Cinématique" }, type: "video", durationMin: 22 },
          {
            id: "l-phys-1-2", slug: "kinematics-reference",
            title: { ar: "مرجع: معادلات الحركة", en: "Reference: Equations of Motion", fr: "Référence : équations du mouvement" },
            type: "reference", durationMin: 15,
            sections: [
              { ar: "السرعة والتسارع", en: "Velocity & acceleration", fr: "Vitesse et accélération" },
              { ar: "السقوط الحر", en: "Free fall", fr: "Chute libre" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "c-circuits",
    slug: "electrical-circuits",
    title: { ar: "الدوائر الكهربائية", en: "Electrical Circuits", fr: "Circuits électriques" },
    tagline: {
      ar: "من قانون أوم إلى تحليل الدوائر المعقدة — أساس كل مهندس كهرباء.",
      en: "From Ohm's law to complex circuit analysis — every electrical engineer's foundation.",
      fr: "De la loi d'Ohm à l'analyse de circuits complexes.",
    },
    description: {
      ar: "مساق هندسي تأسيسي في تحليل الدوائر الكهربائية: المقاومات، قوانين كيرشهوف، الدوائر المتوالية والمتوازية، وصولاً إلى التيار المتردد.",
      en: "A foundational engineering course in circuit analysis: resistors, Kirchhoff's laws, series and parallel circuits, up to AC.",
      fr: "Cours d'ingénierie fondamental sur l'analyse des circuits.",
    },
    category: "engineering",
    level: "intermediate",
    languages: ["ar", "en"],
    totalHours: 42,
    enrolledCount: 1320,
    rating: 4.8,
    certificate: true,
    gradient: "from-amber-600 via-orange-700 to-red-900",
    outcomes: [
      { ar: "تحليل أي دائرة DC بثقة", en: "Analyze any DC circuit confidently", fr: "Analyser tout circuit DC" },
    ],
    modules: [
      {
        id: "m-circ-1",
        title: { ar: "أساسيات الكهرباء", en: "Electricity Basics", fr: "Bases de l'électricité" },
        lessons: [
          { id: "l-circ-1-1", slug: "ohms-law", title: { ar: "قانون أوم", en: "Ohm's Law", fr: "Loi d'Ohm" }, type: "video", durationMin: 18 },
        ],
      },
    ],
  },
  {
    id: "c-mechanical",
    slug: "mechanical-statics",
    title: { ar: "الاستاتيكا الهندسية", en: "Engineering Statics", fr: "Statique" },
    tagline: {
      ar: "كيف تقف الجسور والأبراج؟ حلل القوى كمهندس ميكانيكي حقيقي.",
      en: "How do bridges and towers stand? Analyze forces like a real mechanical engineer.",
      fr: "Comment tiennent les ponts ? Analysez les forces comme un ingénieur.",
    },
    description: {
      ar: "المساق الأول لكل مهندس ميكانيكي ومدني: تحليل القوى، العزوم، الاتزان، والجمالونات. مسائل تدريجية بإشراف يكشف ثغرات فهمك قبل الامتحان لا بعده.",
      en: "The first course for every mechanical and civil engineer: force analysis, moments, equilibrium and trusses. Progressive problems with supervision that finds your gaps before the exam, not after.",
      fr: "Le premier cours de tout ingénieur : forces, moments, équilibre et treillis.",
    },
    category: "engineering",
    level: "advanced",
    languages: ["ar", "en"],
    totalHours: 45,
    enrolledCount: 980,
    rating: 4.6,
    certificate: true,
    gradient: "from-slate-600 via-gray-700 to-zinc-900",
    outcomes: [
      { ar: "تحليل اتزان الأجسام الصلبة", en: "Analyze rigid body equilibrium", fr: "Analyser l'équilibre des solides" },
    ],
    modules: [
      {
        id: "m-mech-1",
        title: { ar: "المتجهات والقوى", en: "Vectors & Forces", fr: "Vecteurs et forces" },
        lessons: [
          { id: "l-mech-1-1", slug: "force-vectors", title: { ar: "متجهات القوى", en: "Force Vectors", fr: "Vecteurs de force" }, type: "video", durationMin: 24 },
        ],
      },
    ],
  },
  {
    id: "c-stats",
    slug: "statistics-data",
    title: { ar: "الإحصاء وتحليل البيانات", en: "Statistics & Data Analysis", fr: "Statistiques et analyse de données" },
    tagline: {
      ar: "اقرأ البيانات كما يقرؤها علماء البيانات — بعين ناقدة لا مُصدّقة.",
      en: "Read data like data scientists do — with a critical eye, not a believing one.",
      fr: "Lisez les données comme les data scientists.",
    },
    description: {
      ar: "من المتوسطات إلى اختبارات الفرضيات: مساق عملي بالكامل في الإحصاء يستخدم بايثون لتحليل بيانات حقيقية من المنطقة العربية.",
      en: "From averages to hypothesis testing: a fully practical statistics course using Python to analyze real data from the Arab region.",
      fr: "Des moyennes aux tests d'hypothèses : un cours pratique avec Python.",
    },
    category: "data",
    level: "intermediate",
    languages: ["ar", "en", "fr"],
    totalHours: 30,
    enrolledCount: 2210,
    rating: 4.8,
    certificate: true,
    gradient: "from-rose-600 via-pink-700 to-purple-900",
    outcomes: [
      { ar: "تحليل مجموعات بيانات حقيقية ببايثون", en: "Analyze real datasets with Python", fr: "Analyser de vraies données avec Python" },
    ],
    modules: [
      {
        id: "m-stat-1",
        title: { ar: "الإحصاء الوصفي", en: "Descriptive Statistics", fr: "Statistiques descriptives" },
        lessons: [
          { id: "l-stat-1-1", slug: "central-tendency", title: { ar: "مقاييس النزعة المركزية", en: "Measures of Central Tendency", fr: "Tendance centrale" }, type: "video", durationMin: 16 },
          {
            id: "l-stat-1-2", slug: "stats-practice",
            title: { ar: "تمرين: حلل بياناتك", en: "Practice: Analyze Your Data", fr: "Exercice : analysez vos données" },
            type: "workspace", durationMin: 30,
            starterCode: `# تمرين: حساب المتوسط والوسيط\nscores = [78, 92, 65, 88, 95, 71, 84]\n\n# 1) احسب المتوسط الحسابي\n# 2) احسب الوسيط\n# 3) أيهما يمثل البيانات أفضل؟ ولماذا؟\n\n`,
          },
        ],
      },
    ],
  },
  {
    id: "c-linear",
    slug: "linear-algebra",
    title: { ar: "الجبر الخطي", en: "Linear Algebra", fr: "Algèbre linéaire" },
    tagline: {
      ar: "اللغة الرياضية خلف الذكاء الاصطناعي والجرافيكس والهندسة.",
      en: "The mathematical language behind AI, graphics and engineering.",
      fr: "Le langage mathématique derrière l'IA et l'ingénierie.",
    },
    description: {
      ar: "المتجهات، المصفوفات، والتحويلات الخطية بفهم هندسي بصري. المساق الذي يفتح لك أبواب تعلم الآلة والرسوميات والهندسة المتقدمة.",
      en: "Vectors, matrices and linear transformations with visual geometric understanding. The course that opens the doors to machine learning, graphics and advanced engineering.",
      fr: "Vecteurs, matrices et transformations linéaires avec une compréhension visuelle.",
    },
    category: "math",
    level: "advanced",
    languages: ["ar", "en"],
    totalHours: 38,
    enrolledCount: 1540,
    rating: 4.9,
    certificate: true,
    gradient: "from-cyan-600 via-teal-700 to-emerald-900",
    outcomes: [
      { ar: "إتقان عمليات المصفوفات والمتجهات", en: "Master matrix and vector operations", fr: "Maîtriser matrices et vecteurs" },
    ],
    modules: [
      {
        id: "m-lin-1",
        title: { ar: "المتجهات", en: "Vectors", fr: "Vecteurs" },
        lessons: [
          { id: "l-lin-1-1", slug: "vectors-intro", title: { ar: "ما هو المتجه؟", en: "What is a Vector?", fr: "Qu'est-ce qu'un vecteur ?" }, type: "video", durationMin: 20 },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Demo user + activity                                                */
/* ------------------------------------------------------------------ */

export const demoUser: UserProfile = {
  uid: "demo-user",
  displayName: "أحمد الجبوري",
  email: "demo@miyar.app",
  photoURL: null,
  locale: "ar",
  plan: "pro",
  xp: 4380,
  level: 12,
  streakDays: 17,
  weeklyActivity: [45, 80, 30, 95, 60, 0, 120], // Sat..Fri minutes
  joinedAt: "2026-01-14",
};

export const enrollments: Enrollment[] = [
  {
    courseId: "c-python",
    progress: 68,
    completedLessonIds: ["l-py-1-1", "l-py-1-2", "l-py-1-3", "l-py-1-4", "l-py-2-1", "l-py-2-2", "l-py-2-3"],
    lastLessonSlug: "loops-practice",
    lastModuleId: "m-py-2",
    lastActivityAt: "2026-06-11",
  },
  {
    courseId: "c-calculus",
    progress: 35,
    completedLessonIds: ["l-calc-1-1"],
    lastLessonSlug: "limits-reference",
    lastModuleId: "m-calc-1",
    lastActivityAt: "2026-06-09",
  },
  {
    courseId: "c-stats",
    progress: 12,
    completedLessonIds: ["l-stat-1-1"],
    lastLessonSlug: "stats-practice",
    lastModuleId: "m-stat-1",
    lastActivityAt: "2026-06-05",
  },
];

export const sessions: SessionRecord[] = [
  {
    id: "s-1",
    courseId: "c-python",
    date: "2026-06-11",
    durationMin: 52,
    lessonTitle: { ar: "الحلقات التكرارية", en: "Loops", fr: "Les boucles" },
    aiSummary: {
      ar: "أتقنت حلقة for بسرعة، لكنك خلطت بين break و continue ثلاث مرات. راجعنا الفرق معاً وحللت آخر تمرينين دون أخطاء.",
      en: "You mastered the for loop quickly, but mixed up break and continue three times. We reviewed the difference together and you solved the last two exercises flawlessly.",
      fr: "Vous avez maîtrisé la boucle for rapidement, mais confondu break et continue trois fois. Après révision, les deux derniers exercices étaient parfaits.",
    },
    xpEarned: 140,
  },
  {
    id: "s-2",
    courseId: "c-python",
    date: "2026-06-10",
    durationMin: 38,
    lessonTitle: { ar: "تمرين: بوابة العمر", en: "Practice: Age Gate", fr: "Exercice : Contrôle d'âge" },
    aiSummary: {
      ar: "حللت تمرين الشروط من المحاولة الأولى. لاحظت أنك تكتب == بدل = أحياناً في الإسناد — انتبه لهذه النقطة.",
      en: "You solved the conditions exercise on the first try. I noticed you sometimes write == instead of = for assignment — watch out for that.",
      fr: "Exercice résolu du premier coup. Attention : vous écrivez parfois == au lieu de = pour l'affectation.",
    },
    xpEarned: 95,
  },
  {
    id: "s-3",
    courseId: "c-calculus",
    date: "2026-06-09",
    durationMin: 64,
    lessonTitle: { ar: "حدس النهايات", en: "Limit Intuition", fr: "Intuition des limites" },
    aiSummary: {
      ar: "فهمك للنهايات من اليمين واليسار ممتاز. ما زلت تتردد عند النهايات اللانهائية — خصصت لك تمارين إضافية عليها.",
      en: "Your understanding of left/right limits is excellent. You still hesitate with infinite limits — I've assigned you extra exercises on them.",
      fr: "Excellente compréhension des limites latérales. Hésitation sur les limites infinies — exercices supplémentaires assignés.",
    },
    xpEarned: 180,
  },
  {
    id: "s-4",
    courseId: "c-stats",
    date: "2026-06-05",
    durationMin: 25,
    lessonTitle: { ar: "مقاييس النزعة المركزية", en: "Measures of Central Tendency", fr: "Tendance centrale" },
    aiSummary: {
      ar: "بداية قوية. فهمت الفرق بين المتوسط والوسيط، وبقي تطبيقها برمجياً في التمرين القادم.",
      en: "Strong start. You understood the difference between mean and median; applying them in code comes next.",
      fr: "Bon début. Différence moyenne/médiane comprise ; application en code à venir.",
    },
    xpEarned: 60,
  },
];

export const mastery: MasteryRecord[] = [
  {
    topicId: "t-py-vars", topic: { ar: "المتغيرات", en: "Variables", fr: "Variables" }, courseId: "c-python", mastery: 95,
    aiNote: { ar: "إتقان كامل — حللت كل التمارين دون مساعدة.", en: "Full mastery — solved all exercises unaided.", fr: "Maîtrise totale — tous les exercices résolus seul." },
  },
  {
    topicId: "t-py-cond", topic: { ar: "الشروط", en: "Conditions", fr: "Conditions" }, courseId: "c-python", mastery: 88,
    aiNote: { ar: "قوي جداً، مع خطأ متكرر بسيط في عوامل المقارنة.", en: "Very strong, with a minor recurring comparison-operator slip.", fr: "Très solide, petite erreur récurrente sur les opérateurs." },
  },
  {
    topicId: "t-py-loops", topic: { ar: "الحلقات", en: "Loops", fr: "Boucles" }, courseId: "c-python", mastery: 62,
    aiNote: { ar: "تخلط بين break و continue. تحتاج تمرينين إضافيين.", en: "You mix up break and continue. Two more exercises needed.", fr: "Confusion break/continue. Deux exercices de plus nécessaires." },
  },
  {
    topicId: "t-py-func", topic: { ar: "الدوال", en: "Functions", fr: "Fonctions" }, courseId: "c-python", mastery: 20,
    aiNote: { ar: "لم تبدأ بعد — الوحدة القادمة.", en: "Not started yet — next module.", fr: "Pas encore commencé — prochain module." },
  },
  {
    topicId: "t-calc-limits", topic: { ar: "النهايات", en: "Limits", fr: "Limites" }, courseId: "c-calculus", mastery: 71,
    aiNote: { ar: "فهم جيد للنهايات المحدودة، ضعف في اللانهائية.", en: "Good grasp of finite limits, weak on infinite ones.", fr: "Bonne compréhension des limites finies, faiblesse sur les infinies." },
  },
  {
    topicId: "t-calc-cont", topic: { ar: "الاستمرارية", en: "Continuity", fr: "Continuité" }, courseId: "c-calculus", mastery: 45,
    aiNote: { ar: "تحتاج مراجعة شروط الاستمرارية الثلاثة.", en: "Review the three continuity conditions.", fr: "Réviser les trois conditions de continuité." },
  },
  {
    topicId: "t-stat-central", topic: { ar: "النزعة المركزية", en: "Central Tendency", fr: "Tendance centrale" }, courseId: "c-stats", mastery: 58,
    aiNote: { ar: "الفهم النظري جيد، ينقصه التطبيق العملي.", en: "Good theory, needs practical application.", fr: "Bonne théorie, application pratique nécessaire." },
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    courseId: "c-webdev",
    title: { ar: "شهادة تطوير الويب الحديث", en: "Modern Web Development Certificate", fr: "Certificat Développement Web" },
    issuedAt: "2026-04-22",
    credentialId: "MYR-2026-WD-08412",
  },
  {
    id: "cert-2",
    courseId: "c-python",
    title: { ar: "شهادة أساسيات بايثون", en: "Python Foundations Certificate", fr: "Certificat Python" },
    issuedAt: null,
    credentialId: null,
  },
  {
    id: "cert-3",
    courseId: "c-calculus",
    title: { ar: "شهادة التفاضل والتكامل ١", en: "Calculus I Certificate", fr: "Certificat Calcul I" },
    issuedAt: null,
    credentialId: null,
  },
];

export const milestones: Milestone[] = [
  {
    id: "ms-1",
    courseId: "c-python",
    title: { ar: "اختبار الوحدة الثانية: الحلقات والشروط", en: "Module 2 Test: Loops & Conditions", fr: "Test Module 2 : Boucles et conditions" },
    due: { ar: "بعد درس واحد", en: "After 1 lesson", fr: "Après 1 leçon" },
  },
  {
    id: "ms-2",
    courseId: "c-calculus",
    title: { ar: "تقييم النهايات الشامل", en: "Comprehensive Limits Assessment", fr: "Évaluation complète des limites" },
    due: { ar: "بعد درسين", en: "After 2 lessons", fr: "Après 2 leçons" },
  },
];
