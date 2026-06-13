# Python Learning Path — Curriculum Master Plan

> Status: approved direction (2026-06-13). Course 1 (PCEP) is the active build target.
> The lesson template is fixed by the AI phase: every workspace lesson = objective +
> plain-language checkpoints (auto-graded on Run) + starter code + hint.

## The ladder (multiple courses inside the Python path)

Modeled on the Python Institute certification ladder so every course maps to a
recognized, employer-verifiable credential — this feeds the credibility-ladder
strategy (Miyar cert now → PCEP/PCAP-aligned → NELC later).

| # | Course (Miyar) | Maps to | Level | Status |
|---|---|---|---|---|
| 1 | **أساسيات Python** (Python Essentials) | **PCEP**-30-02 | beginner | ⏳ ACTIVE BUILD |
| 2 | Python المتوسط (Python Associate) | **PCAP**-31-03 | intermediate | after course 1 |
| 3 | Python الاحترافي (Python Professional) | **PCPP1** (later PCPP2) | advanced | later |
| 4+ | تخصصات: Python للـ IT / Cloud / SysAdmin، Python لتحليل البيانات، … | vendor/role certs | specialization | much later |

Honesty rule: we say our courses **prepare you for** the PCEP/PCAP exams (objective-mapped).
The Python Institute exam itself is a separate paid exam by them; Miyar's own certificate
attests passing OUR assessments. Never blur this line in marketing.

Data-model note (when implementing): each course stays a normal `Course` in the existing
model — no schema change needed. Suggested slugs: `python-essentials` (rework of current
`python-foundations`), `python-associate`, `python-professional`. A "path" grouping page
can come later; naming + ordering carries the ladder until then.

---

## Course 1: أساسيات Python (PCEP) — full outline

PCEP-30-02 exam blocks and weights, for coverage checking:
1. Fundamentals (18%) · 2. Control flow (29%) · 3. Data collections (25%) · 4. Functions & exceptions (28%)

Per module: 1–2 videos (USER records; Claude writes script outlines) + 3–5 auto-graded
workspace lessons (Claude) + 1 reference lesson (Claude). User reviews all Arabic text.

### M1 — البداية الصحيحة (The Right Start)
PCEP block 1. Mostly exists today — extend.
- video: ما هي البرمجة؟ كيف يفكر الحاسوب، compiler vs interpreter، لماذا Python
- workspace: برنامجك الأول — print()، أول تشغيل حقيقي
- workspace: التعامل مع النصوص في print — quotes، escape `\n`، فواصل المعاملات
- reference: خريطة لغة Python — keywords، بنية الجملة، التعليقات `#`

### M2 — البيانات والمتغيرات (Data & Variables)
PCEP block 1. Partially exists.
- video: كيف يخزن البرنامج المعلومات — أنواع البيانات والمتغيرات
- workspace: المتغيرات — إنشاء، تسمية صحيحة، إعادة الإسناد (exists: variables-playground)
- workspace: الأرقام والعمليات الحسابية — int/float، أولويات العمليات، // % **
- workspace: النصوص والمدخلات — input()، تحويل الأنواع int()/float()/str()، f-strings
- workspace: آلة حاسبة صغيرة — تمرين تجميعي (مدخلات → معالجة → مخرجات)
- reference: مرجع الأنواع الأساسية والمعاملات

### M3 — اتخاذ القرار (Decisions)
PCEP block 2. Exists — extend.
- video: كيف يقرر البرنامج — if/elif/else
- workspace: بوابة العمر — if/else أساسية (exists: age-gate)
- workspace: المقارنات والمنطق — == != < > and/or/not، قيم bool
- workspace: الشروط المتداخلة والمتسلسلة — elif سلم درجات الطلاب
- reference: جدول معاملات المقارنة وأخطاء المبتدئين الشائعة (= vs ==)

### M4 — الحلقات التكرارية (Loops)
PCEP block 2. Exists — extend.
- video: التكرار — for وrange وwhile
- workspace: جدول الضرب — for + range (exists: times-table)
- workspace: العداد الذكي — while، شرط التوقف، تجنب الحلقة اللانهائية
- workspace: break وcontinue وelse مع الحلقات — البحث عن رقم
- workspace: الحلقات المتداخلة — رسم أنماط بالنجوم
- reference: متى تستخدم for ومتى while — أنماط الحلقات الشائعة

### M5 — هياكل البيانات (Data Collections) — NEW, biggest gap
PCEP block 3 (25% of the exam).
- video 1: القوائم Lists — لماذا نحتاج أكثر من متغير
- workspace: القوائم — إنشاء، فهرسة، len()، append/insert/remove
- workspace: التقطيع Slicing — [start:end:step]، فهارس سالبة، in/not in
- workspace: القوائم والحلقات معاً — مجموع، أكبر قيمة، فلترة
- video 2: القواميس والـ tuples — بيانات لها أسماء
- workspace: القواميس Dictionaries — مفاتيح وقيم، إضافة وحذف، keys()/values()/items()
- workspace: tuples والتداخل — قائمة قواميس (سجل طلاب مصغر)
- workspace: النصوص كسلاسل — فهرسة وتقطيع النصوص، أهم methods
- reference: مقارنة الهياكل الأربعة — متى تستخدم أيها

### M6 — الدوال (Functions)
PCEP block 4. Exists — extend.
- video: الدوال — قوة إعادة الاستخدام (exists)
- workspace: أول دالة — def، استدعاء، معاملات (exists: first-function — review/extend)
- workspace: return vs print — القيم المعادة واستخدامها
- workspace: المعاملات المتقدمة — positional/keyword/default values
- workspace: النطاق Scope — متغيرات محلية وعامة، لماذا تختفي القيم
- reference: أفضل ممارسات الدوال (exists — extend with scope rules)

### M7 — الأخطاء والتعامل معها (Errors & Exceptions) — NEW
PCEP block 4.
- video: لا تخف من الأخطاء — قراءة رسالة الخطأ سطراً سطراً
- workspace: أنواع الأخطاء — SyntaxError/NameError/TypeError/ValueError/ZeroDivisionError، أصلح برنامجاً مكسوراً
- workspace: try/except — مدخلات مستخدم آمنة
- workspace: تمرين تصحيح شامل — برنامج فيه 5 أخطاء مدسوسة
- reference: دليل قراءة الـ traceback + جدول الاستثناءات الشائعة

### M8 — المشاريع الختامية والاستعداد للاختبار (Capstone & Exam Prep)
- workspace: المشروع ١ — الحاسبة الذكية (exists: final-calculator — review)
- workspace: المشروع ٢ — لعبة الأسئلة Quiz Game (قوائم + قواميس + دوال + حلقات)
- workspace: المشروع ٣ — مدير المصروفات (كل مهارات المسار في برنامج واحد)
- workspace: محاكاة أسئلة PCEP — تمارين قصيرة بنمط الاختبار
- reference: ماذا بعد؟ — كيف تحجز اختبار PCEP الرسمي، وما ينتظرك في مسار PCAP

**Totals:** 8 modules ≈ 10 videos (user) + 27 workspace + 9 reference ≈ 46 lessons.

### Build order (one module at a time, commit per module)
1. M5 (data collections — biggest gap, heart of the exam) ❶
2. M7 (errors — fully new) ❷
3. M2, M3, M4, M6 extensions ❸
4. M8 capstones ❹
5. M1 polish + all video script outlines batched for the user to record ❺

(Order rationale: build the missing material first while the existing 5 polished
lessons carry M2–M6; extensions after.)

---

## Course 2 preview: Python المتوسط (PCAP) — outline later
OOP (classes, inheritance), modules & packages, advanced strings, advanced exceptions,
closures & lambdas, file I/O, selected standard library. Outline to be written after
Course 1 ships.
