"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, Play, RotateCcw, Zap } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { runPython, type RunResult } from "@/lib/runtime";
import type { Lesson } from "@/lib/types";

// CodeMirror is heavy — load it only on workspace lessons, client-side.
const CodeEditor = dynamic(() => import("@/components/learn/CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[290px] flex-1 animate-pulse bg-white/[0.02]" dir="ltr" />
  ),
});

type Status = "idle" | "loading" | "running";

/**
 * Code workspace with real execution: Python runs in-browser via Pyodide,
 * HTML renders live in a sandboxed preview. Editing happens in CodeMirror
 * with syntax highlighting (components/learn/CodeEditor.tsx).
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
  const language = lesson.language ?? "python";
  const [code, setCode] = useState(starter);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<RunResult | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [loadedOnce, setLoadedOnce] = useState(false);

  const fileName = language === "html" ? "index.html" : "main.py";

  async function run() {
    if (language === "html") {
      setHtml(code);
      return;
    }
    setStatus(loadedOnce ? "running" : "loading");
    try {
      const res = await runPython(code);
      setLoadedOnce(true);
      setResult(res);
    } catch (err) {
      setResult({
        lines: [
          {
            text: err instanceof Error ? err.message : String(err),
            isError: true,
          },
        ],
      });
    } finally {
      setStatus("idle");
    }
  }

  const busy = status !== "idle";

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border border-line/15 bg-[#0b1416]">
        {/* editor header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-4 py-2">
          <div className="flex items-center gap-1.5" dir="ltr">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ms-3 font-mono text-xs text-white/40">{fileName}</span>
          </div>
          <div className="flex items-center gap-2">
            {language === "python" && (
              <span className="hidden items-center gap-1 text-[10px] text-white/30 sm:flex">
                <Zap className="h-3 w-3" /> {t("learn.realRuntime")}
              </span>
            )}
            <button
              onClick={() => {
                setCode(starter);
                setResult(null);
                setHtml(null);
                onCodeChange?.(starter);
              }}
              className="grid h-7 w-7 place-items-center rounded-md text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              title="Reset"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={run}
              disabled={busy}
              className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-bold text-[#1a1205] transition-all hover:brightness-110 disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Play className="h-3 w-3 fill-current" />
              )}
              {t("learn.runCode")}
            </button>
          </div>
        </div>

        {/* editor body */}
        <div className="flex" dir="ltr">
          <CodeEditor
            value={code}
            language={language}
            onChange={(next) => {
              setCode(next);
              onCodeChange?.(next);
            }}
          />
        </div>
      </div>

      {/* runtime loading note (first Python run downloads the WASM runtime) */}
      {status === "loading" && (
        <div className="flex items-center gap-2.5 rounded-xl bg-primary/10 px-4 py-3 text-sm text-ink">
          <Loader2 className="h-4 w-4 animate-spin text-primary dark:text-primary-strong" />
          {t("learn.loadingRuntime")}
        </div>
      )}
      {status === "running" && (
        <div className="flex items-center gap-2.5 rounded-xl bg-primary/10 px-4 py-3 text-sm text-ink">
          <Loader2 className="h-4 w-4 animate-spin text-primary dark:text-primary-strong" />
          {t("learn.running")}
        </div>
      )}

      {/* python output */}
      {language === "python" && result && (
        <div className="overflow-hidden rounded-2xl border border-line/15 bg-[#0b1416]">
          <p className="border-b border-white/5 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/50">
            {t("learn.output")}
          </p>
          <pre className="max-h-60 overflow-auto p-4 font-mono text-[13px] leading-6" dir="ltr">
            {result.lines.length === 0 ? (
              <span className="text-white/30">✓ (0 output)</span>
            ) : (
              result.lines.map((line, i) => (
                <div key={i} className={line.isError ? "text-[#ff8484]" : "text-[#7fd6c2]"}>
                  {line.text}
                </div>
              ))
            )}
          </pre>
        </div>
      )}

      {/* html live preview */}
      {language === "html" && html !== null && (
        <div className="overflow-hidden rounded-2xl border border-line/15">
          <p className="border-b border-line/10 bg-surface-2/60 px-4 py-2 text-xs font-semibold text-muted">
            {t("learn.preview")}
          </p>
          <iframe
            srcDoc={html}
            sandbox=""
            title={t("learn.preview")}
            className="h-72 w-full bg-white"
          />
        </div>
      )}
    </div>
  );
}
