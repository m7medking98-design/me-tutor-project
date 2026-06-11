"use client";

import { useMemo, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { Lesson } from "@/lib/types";

/**
 * Lightweight code workspace. Deliberately simple for this phase —
 * a Monaco/CodeMirror upgrade plus real execution arrives with the
 * AI supervision backend.
 */
export function WorkspacePanel({
  lesson,
  onCodeChange,
}: {
  lesson: Lesson;
  onCodeChange?: (code: string) => void;
}) {
  const { t } = useLanguage();
  const starter = lesson.starterCode ?? "";
  const [code, setCode] = useState(starter);
  const [output, setOutput] = useState<string[] | null>(null);

  const lineCount = useMemo(() => Math.max(code.split("\n").length, 12), [code]);

  function run() {
    // Mock runner: echoes print(...) calls so the loop feels real.
    const lines: string[] = [];
    const printRe = /print\s*\(\s*(["'])(.*?)\1\s*\)/g;
    let m: RegExpExecArray | null;
    while ((m = printRe.exec(code)) !== null) lines.push(m[2]);
    if (lines.length === 0) lines.push("✓ (0 output)");
    setOutput(lines);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border border-line/15 bg-[#0b1416]">
        {/* editor header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-4 py-2">
          <div className="flex items-center gap-1.5" dir="ltr">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ms-3 font-mono text-xs text-white/40">main.py</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCode(starter);
                setOutput(null);
              }}
              className="grid h-7 w-7 place-items-center rounded-md text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              title="Reset"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={run}
              className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-bold text-[#1a1205] transition-all hover:brightness-110"
            >
              <Play className="h-3 w-3 fill-current" /> {t("learn.runCode")}
            </button>
          </div>
        </div>

        {/* editor body */}
        <div className="flex" dir="ltr">
          <div className="select-none border-e border-white/5 px-3 py-4 text-end font-mono text-xs leading-6 text-white/25">
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              onCodeChange?.(e.target.value);
            }}
            spellCheck={false}
            className="min-h-[290px] flex-1 resize-y bg-transparent p-4 pt-4 font-mono text-[13px] leading-6 text-[#d6e7e9] outline-none"
            style={{ direction: "ltr", unicodeBidi: "plaintext" }}
          />
        </div>
      </div>

      {/* output */}
      {output && (
        <div className="overflow-hidden rounded-2xl border border-line/15 bg-[#0b1416]">
          <p className="border-b border-white/5 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/50">
            {t("learn.output")}
          </p>
          <pre className="max-h-44 overflow-auto p-4 font-mono text-[13px] leading-6 text-[#7fd6c2]" dir="ltr">
            {output.join("\n")}
          </pre>
        </div>
      )}
    </div>
  );
}
