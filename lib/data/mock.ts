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
      ar: "أساسيات Python",
      en: "Python Foundations",
      fr: "Fondamentaux de Python",
    },
    tagline: {
      ar: "من الصفر إلى كتابة برامج حقيقية، بإشراف مباشر على كل سطر تكتبه.",
      en: "From zero to real programs, with supervision on every line you write.",
      fr: "De zéro à de vrais programmes, avec un suivi de chaque ligne écrite.",
    },
    description: {
      ar: "مسار متكامل لتعلم لغة Python من البداية. لن تشاهد فقط — ستكتب الكود بنفسك داخل بيئة العمل، والمشرف الذكي يصحح أخطاءك فور حدوثها ويشرح السبب بطريقة تناسب مستواك. المصطلحات التقنية تبقى بالإنجليزية لتكون جاهزاً لسوق العمل العالمي.",
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
        ar: "كتابة برامج Python كاملة من الصفر",
        en: "Write complete Python programs from scratch",
        fr: "Écrire des programmes Python complets",
      },
      {
        ar: "فهم الـ variables والـ conditions والـ loops والـ functions فهماً عميقاً",
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
              { time: "08:15", title: { ar: "أول نظرة على Python", en: "First look at Python", fr: "Premier aperçu de Python" } },
            ],
          },
          {
            id: "l-py-1-2",
            slug: "first-program",
            title: { ar: "برنامجك الأول", en: "Your First Program", fr: "Votre premier programme" },
            type: "workspace",
            durationMin: 20,
            language: "python",
            objective: {
              ar: "اكتب أول برنامج Python حقيقي لك: استخدم print() لعرض نص على الشاشة — هذا الكود سيُنفَّذ فعلياً في متصفحك.",
              en: "Write your first real Python program: use print() to display text — this code actually executes in your browser.",
              fr: "Écrivez votre premier vrai programme Python : utilisez print() pour afficher du texte — ce code s'exécute réellement.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "شغّل الكود الموجود بزر Run وشاهد النتيجة", en: "Run the existing code and see the output", fr: "Exécutez le code existant et observez le résultat" } },
              { id: "cp2", text: { ar: "أضف سطر `print()` جديداً يطبع اسمك", en: "Add a new `print()` line that prints your name", fr: "Ajoutez une nouvelle ligne `print()` avec votre nom" } },
              { id: "cp3", text: { ar: "شغّل مرة أخرى وتأكد من ظهور السطرين معاً", en: "Run again and confirm both lines appear", fr: "Réexécutez et vérifiez les deux lignes" } },
            ],
            hint: {
              ar: "كل استدعاء `print()` يطبع سطراً مستقلاً. اكتب في سطر جديد: `print(\"اسمك هنا\")`",
              en: "Each `print()` call outputs its own line. On a new line write: `print(\"your name here\")`",
              fr: "Chaque `print()` affiche sa propre ligne. Sur une nouvelle ligne : `print(\"votre nom\")`",
            },
            starterCode: `# اكتب برنامجك الأول هنا — الكود يعمل فعلياً!
# Your first program — this really runs!

print("مرحباً يا معيار!")

# جرّب الآن: اطبع اسمك في سطر جديد باستخدام print()
`,
          },
          {
            id: "l-py-1-3",
            slug: "variables",
            title: { ar: "المتغيرات (Variables) وأنواع البيانات", en: "Variables & Data Types", fr: "Variables et types de données" },
            type: "reference",
            durationMin: 15,
            sections: [
              { ar: "ما هو الـ Variable؟", en: "What is a variable?", fr: "Qu'est-ce qu'une variable ?" },
              { ar: "الأرقام والنصوص", en: "Numbers and strings", fr: "Nombres et chaînes" },
              { ar: "قواعد التسمية", en: "Naming rules", fr: "Règles de nommage" },
              { ar: "أخطاء شائعة", en: "Common mistakes", fr: "Erreurs courantes" },
            ],
          },
          {
            id: "l-py-1-4",
            slug: "variables-practice",
            title: { ar: "تمرين: Variables", en: "Practice: Variables", fr: "Exercice : Variables" },
            type: "workspace",
            durationMin: 25,
            language: "python",
            objective: {
              ar: "أنشئ متغيرين (variables) واستخدمهما معاً داخل جملة واحدة تطبعها على الشاشة.",
              en: "Create two variables and use them together inside one printed sentence.",
              fr: "Créez deux variables et utilisez-les ensemble dans une phrase affichée.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "أنشئ متغير `age` يحمل عمرك", en: "Create an `age` variable holding your age", fr: "Créez une variable `age` avec votre âge" } },
              { id: "cp2", text: { ar: "أنشئ متغير `name` يحمل اسمك", en: "Create a `name` variable holding your name", fr: "Créez une variable `name` avec votre nom" } },
              { id: "cp3", text: { ar: "اطبع جملة تعريف تجمع المتغيرين معاً", en: "Print one sentence combining both variables", fr: "Affichez une phrase combinant les deux" } },
            ],
            hint: {
              ar: "أسهل طريقة هي f-string: `print(f\"أنا {name} وعمري {age}\")`",
              en: "The easiest way is an f-string: `print(f\"I am {name} and I am {age}\")`",
              fr: "Le plus simple est une f-string : `print(f\"Je suis {name}, j'ai {age} ans\")`",
            },
            starterCode: `# تمرين الـ Variables
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
            title: { ar: "الشروط (if/else) واتخاذ القرار", en: "Conditions & Decisions", fr: "Conditions et décisions" },
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
            language: "python",
            objective: {
              ar: "اكتب شرط if/else يجعل البرنامج يتخذ قراراً مختلفاً حسب قيمة age.",
              en: "Write an if/else condition so the program decides differently based on the age value.",
              fr: "Écrivez une condition if/else pour que le programme décide selon la valeur de age.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "اكتب `if` يتحقق هل `age` يساوي 18 أو أكثر", en: "Write an `if` checking whether `age` is 18 or more", fr: "Écrivez un `if` vérifiant si `age` ≥ 18" } },
              { id: "cp2", text: { ar: "أضف فرع `else` للحالة الأخرى", en: "Add an `else` branch for the other case", fr: "Ajoutez une branche `else`" } },
              { id: "cp3", text: { ar: "جرّب بقيمتين: 16 ثم 20 وتأكد من اختلاف النتيجة", en: "Test with 16 then 20 and confirm different outputs", fr: "Testez avec 16 puis 20" } },
            ],
            hint: {
              ar: "الصيغة: `if age >= 18:` ثم سطر مزاح (indented) — لا تنسَ النقطتين `:`",
              en: "Syntax: `if age >= 18:` then an indented line — don't forget the colon `:`",
              fr: "Syntaxe : `if age >= 18:` puis une ligne indentée — n'oubliez pas le deux-points `:`",
            },
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
            title: { ar: "الحلقات التكرارية (Loops)", en: "Loops", fr: "Les boucles" },
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
            language: "python",
            objective: {
              ar: "استخدم حلقة for مع range() لطباعة جدول ضرب الرقم 7 كاملاً — عشرة أسطر بسطر كود واحد داخل الحلقة.",
              en: "Use a for loop with range() to print the full 7 times table — ten lines from one line of code inside the loop.",
              fr: "Utilisez une boucle for avec range() pour afficher la table de 7 — dix lignes avec une seule ligne dans la boucle.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "اكتب حلقة `for` تمر على الأرقام من 1 إلى 10", en: "Write a `for` loop over the numbers 1 to 10", fr: "Écrivez une boucle `for` de 1 à 10" } },
              { id: "cp2", text: { ar: "اطبع داخل الحلقة سطراً بصيغة: `7 x 1 = 7`", en: "Inside the loop print lines like: `7 x 1 = 7`", fr: "Affichez des lignes comme : `7 x 1 = 7`" } },
              { id: "cp3", text: { ar: "شغّل وتأكد من ظهور 10 أسطر صحيحة", en: "Run and confirm 10 correct lines appear", fr: "Vérifiez les 10 lignes correctes" } },
            ],
            hint: {
              ar: "`range(1, 11)` يعطيك الأرقام من 1 إلى 10. داخل الحلقة: `print(f\"7 x {i} = {7*i}\")`",
              en: "`range(1, 11)` gives you 1 through 10. Inside the loop: `print(f\"7 x {i} = {7*i}\")`",
              fr: "`range(1, 11)` donne 1 à 10. Dans la boucle : `print(f\"7 x {i} = {7*i}\")`",
            },
            starterCode: `# تمرين: جدول الضرب — استخدم حلقة for
# اطبع جدول ضرب الرقم 7 من 1 إلى 10
# الناتج المتوقع: 7 x 1 = 7 ... وهكذا

`,
          },
        ],
      },
      {
        id: "m-py-data",
        title: { ar: "هياكل البيانات", en: "Data Collections", fr: "Collections de données" },
        lessons: [
          {
            id: "l-py-data-1",
            slug: "lists-intro",
            title: {
              ar: "القوائم (Lists): لماذا نحتاج أكثر من متغير",
              en: "Lists: Why We Need More Than One Variable",
              fr: "Les listes : pourquoi plus d'une variable",
            },
            type: "video",
            durationMin: 14,
            chapters: [
              { time: "00:00", title: { ar: "مشكلة المتغيرات المتعددة", en: "The many-variables problem", fr: "Le problème des variables multiples" } },
              { time: "03:40", title: { ar: "إنشاء أول قائمة", en: "Creating your first list", fr: "Créer votre première liste" } },
              { time: "07:50", title: { ar: "الفهرسة والوصول إلى العناصر", en: "Indexing and accessing items", fr: "Indexation et accès aux éléments" } },
              { time: "11:20", title: { ar: "تعديل القائمة: إضافة وحذف", en: "Modifying a list: add & remove", fr: "Modifier une liste : ajout et suppression" } },
            ],
          },
          {
            id: "l-py-data-2",
            slug: "lists-practice",
            title: { ar: "تمرين: القوائم", en: "Practice: Lists", fr: "Exercice : les listes" },
            type: "workspace",
            durationMin: 30,
            language: "python",
            concept: {
              ar: "القائمة `list` تخزّن عدة قيم بترتيب داخل أقواس مربعة `[...]`. نصل إلى عنصر بفهرسه `fruits[0]` (يبدأ من صفر) و`fruits[-1]` لآخر عنصر، و`len(fruits)` يعطي عددها. `append()` يضيف عنصراً، و`remove()` يحذف بالقيمة.",
              en: "A `list` stores several ordered values inside square brackets `[...]`. Reach an item by its index `fruits[0]` (starts at zero) or `fruits[-1]` for the last, and `len(fruits)` gives the count. `append()` adds an item, `remove()` deletes by value.",
              fr: "Une `list` stocke plusieurs valeurs ordonnées entre crochets `[...]`. On accède par index `fruits[0]` (commence à zéro) ou `fruits[-1]` pour le dernier, et `len(fruits)` donne le nombre. `append()` ajoute, `remove()` supprime par valeur.",
            },
            objective: {
              ar: "أنشئ قائمة (list)، اقرأ عناصرها بالفهرسة واطبع طولها بـ len()، ثم عدّلها بإضافة عنصر وحذف آخر.",
              en: "Create a list, read its items by index and print its length with len(), then modify it by adding and removing an item.",
              fr: "Créez une liste, lisez ses éléments par index et affichez sa longueur avec len(), puis modifiez-la en ajoutant et supprimant un élément.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "أنشئ قائمة باسم `fruits` تحتوي على 3 عناصر على الأقل", en: "Create a list named `fruits` with at least 3 items", fr: "Créez une liste `fruits` avec au moins 3 éléments" } },
              { id: "cp2", text: { ar: "اطبع العنصر الأول والعنصر الأخير بالفهرسة، واطبع عدد العناصر بـ `len()`", en: "Print the first and last item by index, and print the count with `len()`", fr: "Affichez le premier et le dernier élément par index, et le nombre avec `len()`" } },
              { id: "cp3", text: { ar: "أضف عنصراً بـ `append()` واحذف عنصراً بـ `remove()`، ثم شغّل وتأكد من القائمة الجديدة", en: "Add an item with `append()` and remove one with `remove()`, then run and confirm the new list", fr: "Ajoutez un élément avec `append()` et supprimez-en un avec `remove()`, puis exécutez et vérifiez" } },
            ],
            hint: {
              ar: "الفهرسة تبدأ من صفر: `fruits[0]` أول عنصر و`fruits[-1]` آخر عنصر. للإضافة: `fruits.append(\"مانجو\")` وللحذف: `fruits.remove(\"تفاح\")`.",
              en: "Indexing starts at zero: `fruits[0]` is the first item, `fruits[-1]` the last. To add: `fruits.append(\"mango\")`, to remove: `fruits.remove(\"apple\")`.",
              fr: "L'indexation commence à zéro : `fruits[0]` est le premier, `fruits[-1]` le dernier. Ajouter : `fruits.append(\"mangue\")`, supprimer : `fruits.remove(\"pomme\")`.",
            },
            starterCode: `# تمرين القوائم (Lists)
# 1) أنشئ قائمة باسم fruits فيها 3 عناصر على الأقل
# 2) اطبع أول عنصر وآخر عنصر، واطبع عدد العناصر بـ len()
# 3) أضف عنصراً بـ append() واحذف عنصراً بـ remove() ثم اطبع القائمة

`,
          },
          {
            id: "l-py-data-3",
            slug: "lists-slicing",
            title: { ar: "تمرين: التقطيع (Slicing)", en: "Practice: Slicing", fr: "Exercice : le découpage (slicing)" },
            type: "workspace",
            durationMin: 30,
            language: "python",
            concept: {
              ar: "التقطيع يأخذ جزءاً من القائمة بصيغة `items[start:end:step]` (لا يشمل `end`). الفهارس السالبة تَعُدّ من النهاية: `items[-2:]` آخر عنصرين. و`x in items` تُرجع True أو False حسب وجود العنصر.",
              en: "Slicing takes part of a list with `items[start:end:step]` (`end` is excluded). Negative indices count from the end: `items[-2:]` is the last two. And `x in items` returns True or False for membership.",
              fr: "Le découpage prend une partie de la liste : `items[start:end:step]` (`end` exclu). Les index négatifs comptent depuis la fin : `items[-2:]` les deux derniers. Et `x in items` renvoie True ou False.",
            },
            objective: {
              ar: "استخدم التقطيع (slicing) لأخذ أجزاء من قائمة بصيغة [start:end:step]، واستعمل الفهارس السالبة، وتحقق من وجود عنصر بـ in.",
              en: "Use slicing to take parts of a list with [start:end:step], use negative indices, and check membership with in.",
              fr: "Utilisez le découpage pour extraire des parties d'une liste avec [start:end:step], les index négatifs, et testez l'appartenance avec in.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "اطبع أول ثلاثة عناصر من `numbers` باستخدام التقطيع", en: "Print the first three items of `numbers` using slicing", fr: "Affichez les trois premiers éléments de `numbers` par découpage" } },
              { id: "cp2", text: { ar: "اطبع آخر عنصرين بفهارس سالبة، واطبع كل عنصر ثانٍ باستخدام الخطوة step", en: "Print the last two items with negative indices, and every second item using the step", fr: "Affichez les deux derniers avec des index négatifs, et un élément sur deux avec le pas (step)" } },
              { id: "cp3", text: { ar: "تحقق هل الرقم 5 موجود في القائمة باستخدام `in` واطبع النتيجة، ثم شغّل وتأكد من المخرجات", en: "Check whether 5 is in the list using `in`, print the result, then run and confirm the output", fr: "Vérifiez si 5 est dans la liste avec `in`, affichez le résultat, puis exécutez et vérifiez" } },
            ],
            hint: {
              ar: "التقطيع: `numbers[0:3]` أول ثلاثة، `numbers[-2:]` آخر اثنين، `numbers[::2]` بخطوة 2. الوجود: `5 in numbers` يعطي True أو False.",
              en: "Slicing: `numbers[0:3]` first three, `numbers[-2:]` last two, `numbers[::2]` step of 2. Membership: `5 in numbers` gives True or False.",
              fr: "Découpage : `numbers[0:3]` les trois premiers, `numbers[-2:]` les deux derniers, `numbers[::2]` pas de 2. Appartenance : `5 in numbers` donne True ou False.",
            },
            starterCode: `# تمرين التقطيع (Slicing)
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 1) اطبع أول ثلاثة عناصر
# 2) اطبع آخر عنصرين باستخدام فهارس سالبة
# 3) اطبع كل عنصر ثانٍ (الخطوة step)
# 4) تحقق: هل الرقم 5 موجود في القائمة؟ اطبع النتيجة

`,
          },
          {
            id: "l-py-data-4",
            slug: "lists-and-loops",
            title: { ar: "تمرين: القوائم والحلقات معاً", en: "Practice: Lists & Loops Together", fr: "Exercice : listes et boucles" },
            type: "workspace",
            durationMin: 30,
            language: "python",
            concept: {
              ar: "نمرّ على عناصر القائمة بحلقة `for x in items:`. لتجميع قيمة نبدأ بمتغير مثل `total = 0` ثم نحدّثه داخل الحلقة `total += x`. و`sorted(items)` يُرجع نسخة مرتبة دون تغيير الأصل.",
              en: "Loop over a list with `for x in items:`. To accumulate, start a variable like `total = 0` and update it inside the loop with `total += x`. And `sorted(items)` returns a sorted copy without changing the original.",
              fr: "On parcourt une liste avec `for x in items:`. Pour cumuler, partez d'une variable `total = 0` puis `total += x` dans la boucle. Et `sorted(items)` renvoie une copie triée sans modifier l'original.",
            },
            objective: {
              ar: "مُرّ على قائمة بحلقة for لتحسب المجموع وأكبر قيمة بنفسك، ثم كوّن قائمة جديدة بالقيم التي تحقق شرطاً ورتّبها بـ sorted().",
              en: "Iterate a list with a for loop to compute the sum and max yourself, then build a new list of values meeting a condition and sort it with sorted().",
              fr: "Parcourez une liste avec une boucle for pour calculer la somme et le maximum vous-même, puis construisez une nouvelle liste filtrée et triez-la avec sorted().",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "احسب مجموع عناصر `scores` بحلقة `for` (دون استخدام `sum()` مباشرة) واطبعه", en: "Compute the sum of `scores` with a `for` loop (without using `sum()` directly) and print it", fr: "Calculez la somme de `scores` avec une boucle `for` (sans `sum()`) et affichez-la" } },
              { id: "cp2", text: { ar: "جد أكبر قيمة في `scores` بالمرور عليها بحلقة، واطبعها", en: "Find the largest value in `scores` by looping over it, and print it", fr: "Trouvez la plus grande valeur de `scores` en bouclant, et affichez-la" } },
              { id: "cp3", text: { ar: "كوّن قائمة `passed` بالدرجات ≥ 60 فقط، اطبعها مرتبة تصاعدياً بـ `sorted()`، ثم شغّل وتأكد", en: "Build a list `passed` with only scores ≥ 60, print it sorted ascending with `sorted()`, then run and confirm", fr: "Construisez `passed` avec les notes ≥ 60, affichez-la triée avec `sorted()`, puis exécutez" } },
            ],
            hint: {
              ar: "للمجموع: ابدأ بـ `total = 0` ثم `total += s` داخل الحلقة. لأكبر قيمة: ابدأ بأول عنصر وقارن كل عنصر به. للفلترة: داخل الحلقة `if s >= 60: passed.append(s)` ثم `print(sorted(passed))`.",
              en: "Sum: start `total = 0`, then `total += s` inside the loop. Max: start with the first item and compare each. Filter: inside the loop `if s >= 60: passed.append(s)`, then `print(sorted(passed))`.",
              fr: "Somme : `total = 0` puis `total += s`. Max : partez du premier et comparez. Filtre : `if s >= 60: passed.append(s)` puis `print(sorted(passed))`.",
            },
            starterCode: `# تمرين: القوائم والحلقات معاً
scores = [72, 45, 90, 88, 53, 67, 100, 39]

# 1) احسب مجموع الدرجات بحلقة for (بدون استخدام sum مباشرة)
# 2) جد أكبر درجة بالمرور على القائمة
# 3) كوّن قائمة passed بالدرجات 60 فأكثر، واطبعها مرتبة بـ sorted()

`,
          },
          {
            id: "l-py-data-5",
            slug: "lists-advanced",
            title: { ar: "تمرين: عمليات متقدمة على القوائم", en: "Practice: Advanced List Operations", fr: "Exercice : opérations avancées sur les listes" },
            type: "workspace",
            durationMin: 30,
            language: "python",
            concept: {
              ar: "`items.index(x)` يعطي موضع أول ظهور لعنصر، و`del items[i]` يحذف بالموضع. تنبيه مهم: `b = items` لا يَنسخ بل يجعلهما القائمة نفسها فيتغيّران معاً — للنسخة المستقلة استخدم `items[:]` أو `list(items)`.",
              en: "`items.index(x)` gives the position of an item's first occurrence, and `del items[i]` deletes by position. Important: `b = items` does NOT copy — it makes them the same list (both change together). For an independent copy use `items[:]` or `list(items)`.",
              fr: "`items.index(x)` donne la position de la première occurrence, et `del items[i]` supprime par position. Attention : `b = items` ne copie pas — c'est la même liste (les deux changent). Pour une vraie copie : `items[:]` ou `list(items)`.",
            },
            objective: {
              ar: "استخدم index() لإيجاد موضع عنصر، واحذف عنصراً بـ del حسب موضعه، واكتشف الفرق الخطير بين نسخ القائمة (clone) وإسنادها (alias).",
              en: "Use index() to find an item's position, delete by position with del, and discover the dangerous difference between cloning a list and aliasing it.",
              fr: "Utilisez index() pour trouver une position, supprimez par position avec del, et découvrez la différence cruciale entre cloner une liste et l'aliaser.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "استخدم `index()` لإيجاد موضع القيمة \"موز\" في `items` واطبعه", en: "Use `index()` to find the position of \"موز\" in `items` and print it", fr: "Utilisez `index()` pour trouver la position de \"موز\" dans `items` et affichez-la" } },
              { id: "cp2", text: { ar: "احذف العنصر في الموضع 0 باستخدام `del`، واطبع القائمة بعد الحذف", en: "Delete the item at position 0 with `del`, and print the list afterward", fr: "Supprimez l'élément en position 0 avec `del`, et affichez la liste" } },
              { id: "cp3", text: { ar: "انسخ القائمة نسخة مستقلة بـ `list()` أو `[:]`، عدّل النسخة فقط، ثم اطبع الأصل والنسخة لتُثبت أنهما مختلفان، وشغّل", en: "Copy the list independently with `list()` or `[:]`, modify only the copy, then print both original and copy to prove they differ, and run", fr: "Copiez la liste avec `list()` ou `[:]`, modifiez seulement la copie, puis affichez l'original et la copie pour prouver qu'ils diffèrent" } },
            ],
            hint: {
              ar: "`items.index(\"موز\")` يعطي الموضع. `del items[0]` يحذف بالموضع. الفخّ: `b = items` يجعلهما نفس القائمة فيتغيران معاً! النسخة الحقيقية: `b = items[:]` أو `b = list(items)`.",
              en: "`items.index(\"موز\")` gives the position. `del items[0]` deletes by position. The trap: `b = items` makes them the SAME list (both change together)! A real copy: `b = items[:]` or `b = list(items)`.",
              fr: "`items.index(\"موز\")` donne la position. `del items[0]` supprime par position. Le piège : `b = items` en fait la MÊME liste ! Vraie copie : `b = items[:]` ou `b = list(items)`.",
            },
            starterCode: `# تمرين: عمليات متقدمة على القوائم
items = ["تفاح", "موز", "عنب", "تمر"]

# 1) جد موضع "موز" باستخدام index() واطبعه
# 2) احذف أول عنصر باستخدام del واطبع القائمة
# 3) انسخ القائمة نسخة مستقلة، عدّل النسخة فقط، واطبع الأصل والنسخة

`,
          },
          {
            id: "l-py-data-6",
            slug: "list-comprehensions",
            title: { ar: "تمرين: الاختصار الذكي (List Comprehensions)", en: "Practice: List Comprehensions", fr: "Exercice : list comprehensions" },
            type: "workspace",
            durationMin: 30,
            language: "python",
            concept: {
              ar: "الـ list comprehension تبني قائمة بسطر واحد بدل حلقة كاملة، بالصيغة `[expression for x in iterable]`. ويمكن إضافة شرط للفلترة: `[x for x in nums if x > 0]`.",
              en: "A list comprehension builds a list in one line instead of a whole loop, with the form `[expression for x in iterable]`. You can add a filter condition: `[x for x in nums if x > 0]`.",
              fr: "Une list comprehension construit une liste en une ligne au lieu d'une boucle : `[expression for x in iterable]`. On peut ajouter un filtre : `[x for x in nums if x > 0]`.",
            },
            objective: {
              ar: "حوّل حلقة for التي تبني قائمة إلى list comprehension من سطر واحد — مرة بسيطة ومرة مع شرط فلترة if.",
              en: "Turn a for loop that builds a list into a one-line list comprehension — once plainly, and once with an if filter.",
              fr: "Transformez une boucle for qui construit une liste en une list comprehension d'une ligne — simple, puis avec un filtre if.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "كوّن قائمة `squares` فيها مربعات الأرقام 1..10 باستخدام list comprehension", en: "Build a list `squares` of the squares of 1..10 using a list comprehension", fr: "Construisez `squares` avec les carrés de 1 à 10 via une list comprehension" } },
              { id: "cp2", text: { ar: "كوّن قائمة `evens` فيها الأرقام الزوجية فقط من 1..20 باستخدام comprehension مع `if`", en: "Build a list `evens` of only the even numbers from 1..20 using a comprehension with `if`", fr: "Construisez `evens` avec seulement les pairs de 1 à 20 via une comprehension avec `if`" } },
              { id: "cp3", text: { ar: "اطبع القائمتين وتأكد من صحتهما بعد التشغيل", en: "Print both lists and confirm they are correct after running", fr: "Affichez les deux listes et vérifiez après exécution" } },
            ],
            hint: {
              ar: "الصيغة: `[expression for item in iterable]`. للمربعات: `[n**2 for n in range(1, 11)]`. مع فلترة: `[x for x in range(1, 21) if x % 2 == 0]`.",
              en: "Form: `[expression for item in iterable]`. Squares: `[n**2 for n in range(1, 11)]`. With filter: `[x for x in range(1, 21) if x % 2 == 0]`.",
              fr: "Forme : `[expression for item in iterable]`. Carrés : `[n**2 for n in range(1, 11)]`. Avec filtre : `[x for x in range(1, 21) if x % 2 == 0]`.",
            },
            starterCode: `# تمرين: List Comprehensions — بناء قائمة بسطر واحد
# 1) squares = مربعات الأرقام من 1 إلى 10
# 2) evens = الأرقام الزوجية من 1 إلى 20 (استخدم if داخل الـ comprehension)
# 3) اطبع القائمتين

`,
          },
          {
            id: "l-py-data-7",
            slug: "dicts-tuples-intro",
            title: { ar: "القواميس والـ tuples والنصوص: بيانات لها أسماء", en: "Dicts, Tuples & Strings: Named & Fixed Data", fr: "Dictionnaires, tuples et chaînes : données nommées" },
            type: "video",
            durationMin: 16,
            chapters: [
              { time: "00:00", title: { ar: "حدود القوائم: لماذا الفهرس الرقمي لا يكفي", en: "Limits of lists: when a number index isn't enough", fr: "Limites des listes : quand l'index numérique ne suffit pas" } },
              { time: "03:30", title: { ar: "القواميس Dictionaries: مفتاح وقيمة", en: "Dictionaries: key and value", fr: "Dictionnaires : clé et valeur" } },
              { time: "08:00", title: { ar: "الـ tuples: قائمة لا تتغير (immutability)", en: "Tuples: a list that can't change (immutability)", fr: "Tuples : une liste figée (immutabilité)" } },
              { time: "12:00", title: { ar: "النصوص كسلسلة من الأحرف", en: "Strings as a sequence of characters", fr: "Les chaînes comme suite de caractères" } },
            ],
          },
          {
            id: "l-py-data-8",
            slug: "dicts-practice",
            title: { ar: "تمرين: القواميس (Dictionaries)", en: "Practice: Dictionaries", fr: "Exercice : les dictionnaires" },
            type: "workspace",
            durationMin: 30,
            language: "python",
            concept: {
              ar: "القاموس `dict` يخزّن أزواج مفتاح/قيمة مثل `{'name': 'سارة', 'age': 20}`. نصل ونضيف بالمفتاح `student['grade'] = 'A'`، و`'email' in student` تتحقق من وجود مفتاح، و`student.items()` للمرور على كل زوج.",
              en: "A `dict` stores key/value pairs like `{'name': 'Sara', 'age': 20}`. You read and add by key `student['grade'] = 'A'`, `'email' in student` checks if a key exists, and `student.items()` iterates each pair.",
              fr: "Un `dict` stocke des paires clé/valeur comme `{'name': 'Sara', 'age': 20}`. On lit et ajoute par clé `student['grade'] = 'A'`, `'email' in student` teste l'existence d'une clé, et `student.items()` parcourt chaque paire.",
            },
            objective: {
              ar: "أنشئ قاموساً (dictionary) بمفاتيح وقيم، أضف وعدّل واحذف مفتاحاً، وتحقق من وجود مفتاح، ثم مُرّ على عناصره بـ items().",
              en: "Create a dictionary of keys and values, add/edit/remove a key, check whether a key exists, then iterate its items with items().",
              fr: "Créez un dictionnaire clés/valeurs, ajoutez/modifiez/supprimez une clé, testez l'existence d'une clé, puis parcourez-le avec items().",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "أنشئ قاموس `student` فيه المفاتيح \"name\" و\"age\" و\"grade\" بقيمها", en: "Create a dictionary `student` with the keys \"name\", \"age\", \"grade\" and their values", fr: "Créez un dictionnaire `student` avec les clés \"name\", \"age\", \"grade\"" } },
              { id: "cp2", text: { ar: "أضف مفتاحاً جديداً، عدّل قيمة مفتاح موجود، وتحقق هل \"email\" موجود باستخدام `in` واطبع النتيجة", en: "Add a new key, change an existing value, and check whether \"email\" exists using `in`, printing the result", fr: "Ajoutez une clé, modifiez une valeur, et testez si \"email\" existe avec `in`" } },
              { id: "cp3", text: { ar: "مُرّ على القاموس بـ `.items()` واطبع كل مفتاح مع قيمته، ثم شغّل وتأكد", en: "Iterate the dictionary with `.items()` and print each key with its value, then run and confirm", fr: "Parcourez le dictionnaire avec `.items()` et affichez chaque clé et sa valeur" } },
            ],
            hint: {
              ar: "الإنشاء: `student = {\"name\": \"...\", \"age\": 20}`. الإضافة/التعديل: `student[\"grade\"] = \"A\"`. الوجود: `\"email\" in student`. المرور: `for k, v in student.items():`.",
              en: "Create: `student = {\"name\": \"...\", \"age\": 20}`. Add/edit: `student[\"grade\"] = \"A\"`. Exists: `\"email\" in student`. Iterate: `for k, v in student.items():`.",
              fr: "Créer : `student = {\"name\": \"...\", \"age\": 20}`. Ajouter : `student[\"grade\"] = \"A\"`. Existe : `\"email\" in student`. Parcourir : `for k, v in student.items():`.",
            },
            starterCode: `# تمرين: القواميس (Dictionaries)
# 1) أنشئ قاموس student فيه name و age و grade
# 2) أضف مفتاحاً جديداً، عدّل قيمة، وتحقق هل "email" موجود
# 3) مُرّ على القاموس بـ items() واطبع كل مفتاح وقيمته

`,
          },
          {
            id: "l-py-data-9",
            slug: "tuples-nesting",
            title: { ar: "تمرين: الـ tuples والبنى المتداخلة", en: "Practice: Tuples & Nested Structures", fr: "Exercice : tuples et structures imbriquées" },
            type: "workspace",
            durationMin: 35,
            language: "python",
            concept: {
              ar: "الـ tuple مثل القائمة لكنه غير قابل للتعديل ويُكتب بأقواس عادية: `point = (3, 5)`. والبنى المتداخلة تجمع الهياكل داخل بعضها: قائمة قواميس `students[0]['name']`، أو قائمة داخل قائمة (مصفوفة) `matrix[0][1]`.",
              en: "A `tuple` is like a list but cannot be changed, written with round brackets: `point = (3, 5)`. Nested structures put collections inside each other: a list of dicts `students[0]['name']`, or a list inside a list (matrix) `matrix[0][1]`.",
              fr: "Un `tuple` est comme une liste mais non modifiable, avec des parenthèses : `point = (3, 5)`. Les structures imbriquées emboîtent les collections : liste de dicts `students[0]['name']`, ou liste dans une liste (matrice) `matrix[0][1]`.",
            },
            objective: {
              ar: "أنشئ tuple وأثبت أنه غير قابل للتعديل (immutable)، ثم ابنِ بنى متداخلة: قائمة قواميس تمثل سجل طلاب، ومصفوفة (قائمة داخل قائمة).",
              en: "Create a tuple and show it is immutable, then build nested structures: a list of dictionaries (a mini student record) and a matrix (a list inside a list).",
              fr: "Créez un tuple et montrez son immutabilité, puis construisez des structures imbriquées : une liste de dictionnaires et une matrice (liste dans une liste).",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "أنشئ tuple باسم `point` فيه إحداثيان (x, y)، واطبع عنصراً منه بالفهرسة", en: "Create a tuple `point` with two coordinates (x, y) and print one element by index", fr: "Créez un tuple `point` avec deux coordonnées (x, y) et affichez un élément par index" } },
              { id: "cp2", text: { ar: "أنشئ `students` كقائمة فيها قاموسان على الأقل (كل طالب: name وgrade)، واطبع اسم الطالب الأول", en: "Create `students` as a list of at least two dictionaries (each: name and grade), and print the first student's name", fr: "Créez `students` comme liste d'au moins deux dictionnaires (name et grade), et affichez le nom du premier" } },
              { id: "cp3", text: { ar: "أنشئ مصفوفة `matrix` (قائمة داخل قائمة)، واطبع عنصراً بفهرسة مزدوجة مثل `matrix[0][1]`، ثم شغّل", en: "Create a `matrix` (a list of lists) and print an element with double indexing like `matrix[0][1]`, then run", fr: "Créez une `matrix` (liste de listes) et affichez un élément avec double index comme `matrix[0][1]`" } },
            ],
            hint: {
              ar: "الـ tuple: `point = (3, 5)` — ومحاولة `point[0] = 9` تعطي خطأ لأنه immutable. الوصول المتداخل: `students[0][\"name\"]` و`matrix[0][1]`.",
              en: "Tuple: `point = (3, 5)` — trying `point[0] = 9` raises an error because it's immutable. Nested access: `students[0][\"name\"]` and `matrix[0][1]`.",
              fr: "Tuple : `point = (3, 5)` — `point[0] = 9` lève une erreur (immutable). Accès imbriqué : `students[0][\"name\"]` et `matrix[0][1]`.",
            },
            starterCode: `# تمرين: tuples والبنى المتداخلة
# 1) أنشئ tuple باسم point فيه إحداثيان (x, y) واطبع أحد عنصريه
# 2) أنشئ students = قائمة فيها قاموسان (name و grade)، اطبع اسم الأول
# 3) أنشئ matrix = قائمة داخل قائمة، واطبع matrix[0][1]

`,
          },
          {
            id: "l-py-data-10",
            slug: "strings-sequences",
            title: { ar: "تمرين: النصوص كسلاسل (Strings)", en: "Practice: Strings as Sequences", fr: "Exercice : les chaînes comme séquences" },
            type: "workspace",
            durationMin: 30,
            language: "python",
            concept: {
              ar: "النص سلسلة من الأحرف نفهرسها ونقطّعها كالقائمة: `text[0]` و`text[:5]`. وهو غير قابل للتعديل، لذا الـ methods تُرجع نصاً جديداً ولا تغيّر الأصل: `text.upper()` و`text.replace(a, b)` و`text.split()`. والنص متعدد الأسطر يُكتب بين ثلاث علامات اقتباس.",
              en: "A string is a sequence of characters you index and slice like a list: `text[0]`, `text[:5]`. It is immutable, so methods return a NEW string instead of changing the original: `text.upper()`, `text.replace(a, b)`, `text.split()`. A multi-line string sits between triple quotes.",
              fr: "Une chaîne est une suite de caractères qu'on indexe et découpe comme une liste : `text[0]`, `text[:5]`. Elle est immuable : les méthodes renvoient une NOUVELLE chaîne sans changer l'originale : `text.upper()`, `text.replace(a, b)`, `text.split()`. Une chaîne multi-lignes s'écrit entre triple guillemets.",
            },
            objective: {
              ar: "تعامل مع النص كسلسلة من الأحرف: افهرسه وقطّعه، أنشئ نصاً متعدد الأسطر، وأثبت أنه غير قابل للتعديل (immutable) باستخدام string methods.",
              en: "Treat a string as a sequence of characters: index and slice it, build a multi-line string, and show it is immutable using string methods.",
              fr: "Traitez une chaîne comme une suite de caractères : indexez/découpez, créez une chaîne multi-lignes, et montrez son immutabilité via des méthodes.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "من النص `text` اطبع أول حرف وآخر حرف بالفهرسة، وأول 5 أحرف بالتقطيع", en: "From `text`, print the first and last character by index, and the first 5 characters by slicing", fr: "De `text`, affichez le premier et dernier caractère par index, et les 5 premiers par découpage" } },
              { id: "cp2", text: { ar: "أنشئ نصاً متعدد الأسطر بثلاث علامات اقتباس `\"\"\"...\"\"\"` يحوي بداخله علامة اقتباس، واطبعه", en: "Create a multi-line string with triple quotes `\"\"\"...\"\"\"` that contains a quote inside it, and print it", fr: "Créez une chaîne multi-lignes avec `\"\"\"...\"\"\"` contenant un guillemet, et affichez-la" } },
              { id: "cp3", text: { ar: "استخدم `.upper()` و`.replace()`؛ ولأن النص immutable خزّن الناتج في متغير جديد واطبعه، ثم شغّل", en: "Use `.upper()` and `.replace()`; since strings are immutable, store the result in a new variable and print it, then run", fr: "Utilisez `.upper()` et `.replace()` ; la chaîne étant immutable, stockez le résultat dans une nouvelle variable" } },
            ],
            hint: {
              ar: "الفهرسة كالقوائم: `text[0]` و`text[-1]` و`text[:5]`. النص متعدد الأسطر بين `\"\"\"...\"\"\"` ويمكن أن يحوي \" أو ' بحرية. الـ methods تُرجع نصاً جديداً ولا تغيّر الأصل: `new = text.upper()`.",
              en: "Index like lists: `text[0]`, `text[-1]`, `text[:5]`. A multi-line string sits between `\"\"\"...\"\"\"` and may contain \" or ' freely. Methods return a NEW string, leaving the original unchanged: `new = text.upper()`.",
              fr: "Indexez comme les listes : `text[0]`, `text[-1]`, `text[:5]`. Une chaîne multi-lignes est entre `\"\"\"...\"\"\"`. Les méthodes renvoient une NOUVELLE chaîne : `new = text.upper()`.",
            },
            starterCode: `# تمرين: النصوص كسلاسل (Strings)
text = "Miyar Python Course"

# 1) اطبع أول حرف وآخر حرف، وأول 5 أحرف بالتقطيع
# 2) أنشئ نصاً متعدد الأسطر بـ """...""" يحوي علامة اقتباس بداخله، واطبعه
# 3) استخدم upper() و replace()، وخزّن الناتج في متغير جديد (النص immutable)

`,
          },
          {
            id: "l-py-data-11",
            slug: "collections-compared",
            title: { ar: "مرجع: مقارنة الهياكل الأربعة", en: "Reference: The Four Collections Compared", fr: "Référence : comparaison des quatre collections" },
            type: "reference",
            durationMin: 14,
            sections: [
              { ar: "list — القائمة", en: "list", fr: "list" },
              { ar: "tuple — الصف الثابت", en: "tuple", fr: "tuple" },
              { ar: "dictionary — القاموس", en: "dictionary", fr: "dictionary" },
              { ar: "string — النص", en: "string", fr: "string" },
              { ar: "جدول المقارنة", en: "Comparison table", fr: "Tableau comparatif" },
            ],
            body: {
              ar: [
                "## الفكرة الكبرى",
                "",
                "تعلّمت الآن أربع طرق لتخزين البيانات في Python: **list** و**tuple** و**dictionary** و**string**. كل واحدة وُجدت لحالة مختلفة، واختيار المناسبة منها هو نصف حل المشكلة. هذا المرجع يجمعها لتقارن بينها بسرعة.",
                "",
                "## list — القائمة",
                "",
                "مجموعة **مرتبة** و**قابلة للتعديل** (mutable)، نصل إلى عناصرها برقم الفهرس. استخدمها عندما تكون لديك مجموعة عناصر قد تتغير والترتيب مهم — مثل قائمة طلاب أو سلة مشتريات.",
                "",
                "```python",
                "fruits = ['تفاح', 'موز', 'عنب']",
                "fruits.append('مانجو')   # قابلة للتعديل",
                "print(fruits[0])         # الوصول بالفهرس",
                "```",
                "",
                "## tuple — الصف الثابت",
                "",
                "مثل الـ list لكنها **غير قابلة للتعديل** (immutable): بمجرد إنشائها لا تتغير. استخدمها للبيانات التي يجب أن تبقى ثابتة مثل الإحداثيات، وهي أسرع قليلاً وآمنة لتكون key في الـ dictionary.",
                "",
                "```python",
                "point = (3, 5)",
                "# point[0] = 9  خطأ! tuple غير قابل للتعديل",
                "print(point[1])",
                "```",
                "",
                "## dictionary — القاموس",
                "",
                "مجموعة من أزواج **مفتاح/قيمة** (key/value). لا تصل بالرقم بل **بالمفتاح**. مثالية عندما يكون لكل قيمة اسم، وتريد بحثاً سريعاً به — مثل بيانات طالب أو إعدادات برنامج.",
                "",
                "```python",
                "student = {'name': 'سارة', 'age': 20}",
                "student['grade'] = 'A'      # إضافة بالمفتاح",
                "print(student['name'])",
                "```",
                "",
                "## string — النص",
                "",
                "سلسلة **مرتبة** من الأحرف، و**غير قابلة للتعديل** (immutable). تتعامل معها غالباً كأنها list من الأحرف: فهرسة وتقطيع. وكل method تُرجع نصاً جديداً ولا تغيّر الأصل.",
                "",
                "```python",
                "text = 'Miyar'",
                "print(text[0])      # M",
                "print(text[:3])     # Miy",
                "upper = text.upper()   # نص جديد",
                "```",
                "",
                "## جدول المقارنة السريع",
                "",
                "| الهيكل | مرتب؟ | قابل للتعديل؟ | الوصول عبر | الصيغة |",
                "|---|---|---|---|---|",
                "| **list** | نعم | نعم | فهرس رقمي | `[ ]` |",
                "| **tuple** | نعم | لا | فهرس رقمي | `( )` |",
                "| **dictionary** | نعم | نعم | مفتاح | `{ key: value }` |",
                "| **string** | نعم | لا | فهرس رقمي | `' '` |",
                "",
                "## كيف تختار في ثانية",
                "",
                "1. هل البيانات **أزواج مفتاح/قيمة**؟ استخدم **dictionary**.",
                "2. هل هي **نص**؟ استخدم **string**.",
                "3. هل تحتاج تعديلها لاحقاً؟ **list**، وإلا فـ **tuple**.",
                "",
                "> القاعدة الذهبية: ابدأ بـ list إن شككت، وانتقل إلى tuple عندما تريد الحماية من التعديل، وإلى dictionary عندما يصبح «الاسم» أهم من «الترتيب».",
              ].join("\n"),
              en: [
                "## The big picture",
                "",
                "You now know four ways to store data in Python: **list**, **tuple**, **dictionary**, and **string**. Each exists for a different situation, and picking the right one is half of solving the problem. This reference puts them side by side.",
                "",
                "## list",
                "",
                "An **ordered**, **mutable** collection accessed by a numeric index. Use it when you have a group of items that may change and order matters — like a list of students or a shopping cart.",
                "",
                "```python",
                "fruits = ['apple', 'banana', 'grape']",
                "fruits.append('mango')   # mutable",
                "print(fruits[0])         # access by index",
                "```",
                "",
                "## tuple",
                "",
                "Like a list but **immutable**: once created it cannot change. Use it for data that must stay fixed (like coordinates); it is slightly faster and safe to use as a dictionary key.",
                "",
                "```python",
                "point = (3, 5)",
                "# point[0] = 9  error! a tuple is immutable",
                "print(point[1])",
                "```",
                "",
                "## dictionary",
                "",
                "A collection of **key/value** pairs. You access values by **key**, not by number. Ideal when every value has a name and you want fast lookup — like a student record or settings.",
                "",
                "```python",
                "student = {'name': 'Sara', 'age': 20}",
                "student['grade'] = 'A'      # add by key",
                "print(student['name'])",
                "```",
                "",
                "## string",
                "",
                "An **ordered**, **immutable** sequence of characters. You often treat it like a list of characters (indexing and slicing), and every method returns a NEW string without changing the original.",
                "",
                "```python",
                "text = 'Miyar'",
                "print(text[0])      # M",
                "print(text[:3])     # Miy",
                "upper = text.upper()   # a new string",
                "```",
                "",
                "## Quick comparison table",
                "",
                "| Structure | Ordered? | Mutable? | Accessed by | Syntax |",
                "|---|---|---|---|---|",
                "| **list** | yes | yes | numeric index | `[ ]` |",
                "| **tuple** | yes | no | numeric index | `( )` |",
                "| **dictionary** | yes | yes | key | `{ key: value }` |",
                "| **string** | yes | no | numeric index | `' '` |",
                "",
                "## How to choose in one second",
                "",
                "1. Is the data **key/value pairs**? Use a **dictionary**.",
                "2. Is it **text**? Use a **string**.",
                "3. Will you need to change it later? **list**; otherwise **tuple**.",
                "",
                "> Golden rule: start with a list when in doubt, switch to a tuple when you want protection from edits, and to a dictionary when the name matters more than the order.",
              ].join("\n"),
              fr: [
                "## L'idée générale",
                "",
                "Vous connaissez maintenant quatre façons de stocker des données en Python : **list**, **tuple**, **dictionary** et **string**. Chacune existe pour une situation différente, et choisir la bonne, c'est déjà résoudre la moitié du problème.",
                "",
                "## list",
                "",
                "Une collection **ordonnée** et **modifiable** (mutable), accessible par un index numérique. Utilisez-la pour un groupe d'éléments susceptibles de changer quand l'ordre compte.",
                "",
                "```python",
                "fruits = ['pomme', 'banane', 'raisin']",
                "fruits.append('mangue')   # mutable",
                "print(fruits[0])          # accès par index",
                "```",
                "",
                "## tuple",
                "",
                "Comme une list mais **immuable** : une fois créé, il ne change pas. Utilisez-le pour des données fixes (coordonnées) ; il est un peu plus rapide et utilisable comme clé de dictionnaire.",
                "",
                "```python",
                "point = (3, 5)",
                "# point[0] = 9  erreur ! un tuple est immuable",
                "print(point[1])",
                "```",
                "",
                "## dictionary",
                "",
                "Une collection de paires **clé/valeur**. On accède aux valeurs par **clé**, pas par numéro. Idéal quand chaque valeur a un nom et qu'on veut une recherche rapide.",
                "",
                "```python",
                "student = {'name': 'Sara', 'age': 20}",
                "student['grade'] = 'A'      # ajout par clé",
                "print(student['name'])",
                "```",
                "",
                "## string",
                "",
                "Une suite **ordonnée** et **immuable** de caractères. On la manipule souvent comme une list de caractères (indexation, découpage), et chaque méthode renvoie une NOUVELLE chaîne.",
                "",
                "```python",
                "text = 'Miyar'",
                "print(text[0])      # M",
                "print(text[:3])     # Miy",
                "upper = text.upper()   # une nouvelle chaîne",
                "```",
                "",
                "## Tableau comparatif rapide",
                "",
                "| Structure | Ordonnée ? | Modifiable ? | Accès par | Syntaxe |",
                "|---|---|---|---|---|",
                "| **list** | oui | oui | index numérique | `[ ]` |",
                "| **tuple** | oui | non | index numérique | `( )` |",
                "| **dictionary** | oui | oui | clé | `{ key: value }` |",
                "| **string** | oui | non | index numérique | `' '` |",
                "",
                "## Comment choisir en une seconde",
                "",
                "1. Des paires **clé/valeur** ? Un **dictionary**.",
                "2. Du **texte** ? Une **string**.",
                "3. Besoin de la modifier ensuite ? **list** ; sinon **tuple**.",
                "",
                "> Règle d'or : commencez par une list en cas de doute, passez au tuple pour protéger des modifications, et au dictionary quand le nom compte plus que l'ordre.",
              ].join("\n"),
            },
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
            title: { ar: "الدوال (Functions): قوة إعادة الاستخدام", en: "Functions: The Power of Reuse", fr: "Fonctions : la réutilisation" },
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
            language: "python",
            objective: {
              ar: "ابنِ دالة (function) باسم calculate(a, b, op) تدعم العمليات الأربع وتتعامل بأمان مع القسمة على صفر.",
              en: "Build a function calculate(a, b, op) supporting all four operations and safely handling division by zero.",
              fr: "Créez une fonction calculate(a, b, op) gérant les quatre opérations et la division par zéro.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "ادعم العمليات الأربع: `+` و `-` و `*` و `/`", en: "Support all four operations: `+` `-` `*` `/`", fr: "Gérez les quatre opérations : `+` `-` `*` `/`" } },
              { id: "cp2", text: { ar: "عالج حالة القسمة على صفر دون انهيار البرنامج", en: "Handle division by zero without crashing", fr: "Gérez la division par zéro sans plantage" } },
              { id: "cp3", text: { ar: "استدعِ الدالة عدة مرات واطبع النتائج للتأكد", en: "Call the function several times and print results to verify", fr: "Appelez la fonction plusieurs fois et affichez les résultats" } },
            ],
            hint: {
              ar: "استخدم `if`/`elif` على قيمة `op`. وقبل القسمة تحقق: `if b == 0:` ثم أعد رسالة بدل القسمة.",
              en: "Use `if`/`elif` on the `op` value. Before dividing check: `if b == 0:` and return a message instead.",
              fr: "Utilisez `if`/`elif` sur `op`. Avant de diviser : `if b == 0:` et retournez un message.",
            },
            starterCode: `# المشروع الختامي: حاسبة ذكية
# اكتب دالة calculate(a, b, op) تدعم: + - * /
# تذكّر: تعامل مع القسمة على صفر!

def calculate(a, b, op):
    pass  # ابدأ من هنا

# جرّب دالتك:
print(calculate(6, 7, "*"))
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
      ar: "تعلم بناء مواقع ويب احترافية من الصفر: هيكلة الصفحات بـ HTML، التنسيق المتجاوب بـ CSS، ثم البرمجة التفاعلية بـ JavaScript. كل درس ينتهي بقطعة حقيقية من موقعك الخاص.",
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
            language: "html",
            objective: {
              ar: "ابنِ أول صفحة HTML حقيقية: أضف عنواناً (h1) وفقرة (p) وشاهد النتيجة مباشرة في المعاينة.",
              en: "Build your first real HTML page: add a heading (h1) and a paragraph (p) and see it live in the preview.",
              fr: "Créez votre première vraie page HTML : un titre (h1) et un paragraphe (p), visibles dans l'aperçu.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "أضف وسم `<h1>` بعنوان من اختيارك داخل `body`", en: "Add an `<h1>` tag with your own title inside `body`", fr: "Ajoutez un `<h1>` dans `body`" } },
              { id: "cp2", text: { ar: "أضف وسم `<p>` بفقرة قصيرة تحته", en: "Add a `<p>` tag with a short paragraph below it", fr: "Ajoutez un `<p>` avec un court paragraphe" } },
              { id: "cp3", text: { ar: "اضغط Run وشاهد صفحتك تظهر في المعاينة", en: "Press Run and watch your page render in the preview", fr: "Cliquez Run et observez l'aperçu" } },
            ],
            hint: {
              ar: "داخل `<body>` اكتب: `<h1>عنواني الأول</h1>` ثم `<p>هذه فقرتي الأولى.</p>`",
              en: "Inside `<body>` write: `<h1>My first title</h1>` then `<p>This is my first paragraph.</p>`",
              fr: "Dans `<body>` : `<h1>Mon titre</h1>` puis `<p>Mon premier paragraphe.</p>`",
            },
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
      ar: "من المتوسطات إلى اختبارات الفرضيات: مساق عملي بالكامل في الإحصاء يستخدم Python لتحليل بيانات حقيقية من المنطقة العربية.",
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
      { ar: "تحليل مجموعات بيانات حقيقية بـ Python", en: "Analyze real datasets with Python", fr: "Analyser de vraies données avec Python" },
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
            language: "python",
            objective: {
              ar: "احسب المتوسط (mean) والوسيط (median) لقائمة درجات حقيقية باستخدام Python.",
              en: "Compute the mean and median of a real list of scores using Python.",
              fr: "Calculez la moyenne (mean) et la médiane (median) d'une liste de notes avec Python.",
            },
            checkpoints: [
              { id: "cp1", text: { ar: "احسب الـ mean باستخدام `sum()` و `len()`", en: "Compute the mean using `sum()` and `len()`", fr: "Calculez la mean avec `sum()` et `len()`" } },
              { id: "cp2", text: { ar: "احسب الـ median بعد ترتيب القائمة بـ `sorted()`", en: "Compute the median after sorting with `sorted()`", fr: "Calculez la median après `sorted()`" } },
              { id: "cp3", text: { ar: "اطبع القيمتين وقارن: أيهما يمثل البيانات أفضل؟", en: "Print both values and compare: which represents the data better?", fr: "Affichez les deux et comparez" } },
            ],
            hint: {
              ar: "المتوسط: `sum(scores) / len(scores)`. الوسيط: `sorted(scores)[len(scores) // 2]` لقائمة فردية الطول.",
              en: "Mean: `sum(scores) / len(scores)`. Median: `sorted(scores)[len(scores) // 2]` for an odd-length list.",
              fr: "Mean : `sum(scores) / len(scores)`. Median : `sorted(scores)[len(scores) // 2]` pour une liste impaire.",
            },
            starterCode: `# تمرين: حساب الـ mean والـ median\nscores = [78, 92, 65, 88, 95, 71, 84]\n\n# 1) احسب المتوسط الحسابي (mean)\n# 2) احسب الوسيط (median)\n# 3) أيهما يمثل البيانات أفضل؟ ولماذا؟\n\n`,
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
    lessonTitle: { ar: "الحلقات التكرارية (Loops)", en: "Loops", fr: "Les boucles" },
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
    topicId: "t-py-vars", topic: { ar: "المتغيرات (Variables)", en: "Variables", fr: "Variables" }, courseId: "c-python", mastery: 95,
    aiNote: { ar: "إتقان كامل — حللت كل التمارين دون مساعدة.", en: "Full mastery — solved all exercises unaided.", fr: "Maîtrise totale — tous les exercices résolus seul." },
  },
  {
    topicId: "t-py-cond", topic: { ar: "الشروط (if/else)", en: "Conditions", fr: "Conditions" }, courseId: "c-python", mastery: 88,
    aiNote: { ar: "قوي جداً، مع خطأ متكرر بسيط في عوامل المقارنة.", en: "Very strong, with a minor recurring comparison-operator slip.", fr: "Très solide, petite erreur récurrente sur les opérateurs." },
  },
  {
    topicId: "t-py-loops", topic: { ar: "الحلقات (Loops)", en: "Loops", fr: "Boucles" }, courseId: "c-python", mastery: 62,
    aiNote: { ar: "تخلط بين break و continue. تحتاج تمرينين إضافيين.", en: "You mix up break and continue. Two more exercises needed.", fr: "Confusion break/continue. Deux exercices de plus nécessaires." },
  },
  {
    topicId: "t-py-func", topic: { ar: "الدوال (Functions)", en: "Functions", fr: "Fonctions" }, courseId: "c-python", mastery: 20,
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
    title: { ar: "شهادة أساسيات Python", en: "Python Foundations Certificate", fr: "Certificat Python" },
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
