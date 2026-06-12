"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, SendHorizonal } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { getMentorGreeting, getMentorReply } from "@/lib/mentor";
import type { Lesson, MentorMessage } from "@/lib/types";

export function MentorChat({
  lesson,
  code,
}: {
  lesson: Lesson;
  /** current workspace code, passed through to the (future) AI */
  code?: string;
}) {
  const { t, loc, locale, dir } = useLanguage();
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fresh greeting whenever the lesson (or language) changes
  useEffect(() => {
    setMessages([
      {
        id: "greeting",
        role: "mentor",
        text: getMentorGreeting(loc(lesson.title), locale),
        at: Date.now(),
      },
    ]);
  }, [lesson.id, locale]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    setInput("");
    const history = messages; // turns before this question (greeting included)
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text: trimmed, at: Date.now() },
    ]);
    setThinking(true);

    // Stream the reply into a single mentor bubble as tokens arrive
    const replyId = `m-${Date.now()}`;
    let streaming = false;
    const reply = await getMentorReply(
      { lesson, locale, code, history, userMessage: trimmed },
      (textSoFar) => {
        if (!streaming) {
          streaming = true;
          setThinking(false);
          setMessages((prev) => [
            ...prev,
            { id: replyId, role: "mentor", text: textSoFar, at: Date.now() },
          ]);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === replyId ? { ...m, text: textSoFar } : m)),
          );
        }
      },
    );
    setThinking(false);
    if (streaming) {
      setMessages((prev) =>
        prev.map((m) => (m.id === replyId ? { ...m, text: reply } : m)),
      );
    } else {
      // Demo mode / non-streamed fallback arrives in one piece
      setMessages((prev) => [
        ...prev,
        { id: replyId, role: "mentor", text: reply, at: Date.now() },
      ]);
    }
  }

  const suggestions = [
    t("learn.suggestExplain"),
    t("learn.suggestWhere"),
    t("learn.suggestExample"),
    t("learn.suggestSimpler"),
  ];

  return (
    <div className="flex h-full flex-col bg-surface">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-line/10 px-4 py-3.5">
        <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary dark:text-primary-strong">
          <Bot className="h-5 w-5" />
          <span className="absolute -bottom-0.5 -end-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-success" />
        </span>
        <div>
          <h3 className="text-sm font-bold text-ink">{t("learn.mentorTitle")}</h3>
          <p className="text-xs text-muted">{t("learn.mentorSubtitle")}</p>
        </div>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === "mentor"
                ? "rounded-es-md bg-primary/10 text-ink"
                : "ms-auto rounded-ee-md bg-surface-2 text-ink"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {thinking && (
          <div className="flex w-fit items-center gap-2 rounded-2xl rounded-es-md bg-primary/10 px-4 py-3">
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary dark:bg-primary-strong"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
            <span className="text-xs text-muted">{t("learn.mentorThinking")}</span>
          </div>
        )}
      </div>

      {/* suggestion chips */}
      <div className="flex flex-wrap gap-1.5 px-4 pb-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            disabled={thinking}
            className="rounded-full border border-line/20 px-3 py-1 text-xs text-muted transition-colors hover:border-primary/40 hover:text-ink disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-line/10 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("learn.mentorPlaceholder")}
          className="flex-1 rounded-xl border border-line/20 bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary/60"
        />
        <button
          type="submit"
          disabled={!input.trim() || thinking}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-white transition-all hover:bg-primary-strong disabled:opacity-40"
          aria-label="Send"
        >
          <SendHorizonal className={`h-4 w-4 ${dir === "rtl" ? "-scale-x-100" : ""}`} />
        </button>
      </form>
    </div>
  );
}
