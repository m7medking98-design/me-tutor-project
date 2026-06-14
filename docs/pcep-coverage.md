# PCEP-30-02 Coverage Map

> Maps every official **PCEP-30-02** exam objective to the Miyar lesson(s) that
> teach it. This is the defensible artifact behind our claim that Course 1
> **prepares for** the PCEP exam, and the basis for future certificate-recognition
> conversations. Source of objectives: Python Institute official syllabus
> (https://pythoninstitute.org/pcep-exam-syllabus). Honesty rule: we prepare
> students for PCEP; the official exam is Python Institute's own.

Exam: 30 items · pass = 70% cumulative · 4 blocks (weights below).

Status legend: ✅ built · 🟡 planned (module not built yet) · ⬜ gap to schedule.

## Block 1 — Fundamentals (18%) — Modules 1 & 2 (BUILT)
| Objective | Topic | Miyar lesson | Status |
|---|---|---|---|
| 1.1 | interpreter/compiler, lexis/syntax/semantics | M1 `what-is-programming` | ✅ |
| 1.2 | keywords, instructions, indentation, comments | M1 `python-language-map` (ref) | ✅ |
| 1.3 | literals, variables, numeral systems (bin/oct/hex), scientific notation, PEP-8 naming | M2 `variables` (ref: literals/PEP-8) + `number-systems-and-bitwise` (bin/oct/hex + sci-notation) | ✅ |
| 1.4 | operators (numeric/string/assignment/shortcut/**bitwise**/boolean/relational), priorities, float accuracy, type casting | M2 `numbers-and-operators` (arith/priority/`+=`), `number-systems-and-bitwise` (bitwise), `input-and-casting` (string `* +`/casting), `types-and-operators-reference` | ✅ (boolean/relational reinforced in M3) |
| 1.5 | `print()`/`input()`, `sep=`/`end=`, `int()`/`float()` | M1 `first-program` + `print-mastery` (print/sep/end/escapes); M2 `input-and-casting` (`input()` taught; casting practiced — input simulated since the Pyodide sandbox auto-runs) | ✅ |

## Block 2 — Control Flow (29%)
| Objective | Topic | Miyar lesson | Status |
|---|---|---|---|
| 2.1 | `if`/`if-else`/`if-elif-else`, multiple & nested | M3 age-gate + comparisons + nested lessons | 🟡 |
| 2.2 | `pass`, `while`/`for`/`range()`/`in`, `while-else`/`for-else`, nested loops, `break`/`continue` | M4 times-table + while + break/continue/else + nested | 🟡 (add `pass`; make for/while-`else` explicit) |

## Block 3 — Data Collections (25%) — Module 5 (BUILT)
| Objective | Topic | Miyar lesson | Status |
|---|---|---|---|
| 3.1 | Lists: indexing/slicing, `len()`, methods, `sorted()`, `del`, `for` iteration, `in`/`not in`, **list comprehensions**, **copy/clone**, **nested lists** | `lists-practice`, `lists-slicing`, `lists-and-loops`, `lists-advanced`, `list-comprehensions`, `tuples-nesting` (matrices) | ✅ |
| 3.2 | Tuples: building/indexing/slicing, **immutability**, tuples vs lists, nesting | `tuples-nesting` | ✅ |
| 3.3 | Dicts: building/indexing, add/remove keys, iterating, key existence, `keys()/values()/items()` | `dicts-practice` | ✅ |
| 3.4 | Strings: indexing/slicing, **immutability**, escaping `\`, quotes, multi-line, methods | `strings-sequences` | ✅ |
| — | When to use which (synthesis) | `collections-compared` (reference) | ✅ |

## Block 4 — Functions & Exceptions (28%)
| Objective | Topic | Miyar lesson | Status |
|---|---|---|---|
| 4.1 | def/invoke, `return`, **`None`**, **recursion** | M6 first-function + return-vs-print | 🟡 (add `None` + gentle recursion) |
| 4.2 | params vs args, positional/keyword/mixed, defaults, scope, shadowing, `global` | M6 advanced-params + scope lessons | 🟡 |
| 4.3 | **exception hierarchy** (BaseException→Exception→ArithmeticError/LookupError→IndexError/KeyError, TypeError, ValueError) | M7 error-types + traceback reference | ⬜ (M7 not built) |
| 4.4 | `try-except`, ordering `except` branches, propagation through functions | M7 try/except + debugging lessons | ⬜ (M7 not built) |

## Outstanding gaps to schedule (by build order)
1. **M3 (Decisions)** — `if`/`elif`/`else`, multiple & nested, relational & boolean
   operators (`== != < >`, `and`/`or`/`not`, `bool` values). Closes 2.1 and the
   boolean/relational tail of 1.4.
2. **M4 extension** — `pass` instruction; explicit `for-else`/`while-else`; `while`,
   `break`/`continue`, nested loops (2.2).
3. **M7 (Errors & Exceptions)** — covers all of 4.3 + 4.4 (new module).
4. **M6 extension** — `None`, gentle recursion, scope/`global`, params (4.1 + 4.2).
5. **M8 capstones + exam-prep**.

✅ Done: **Block 1 (Modules 1 & 2)** and **Block 3 (Module 5)** fully cover PCEP-30-02.
When all rows read ✅, Course 1 fully covers PCEP-30-02.
