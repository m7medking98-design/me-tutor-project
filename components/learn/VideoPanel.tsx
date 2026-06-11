"use client";

import { Pause, Play, Settings, Volume2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import type { Lesson } from "@/lib/types";

/** Styled video player placeholder — real video hosting comes in a later phase. */
export function VideoPanel({ lesson }: { lesson: Lesson }) {
  const { t, loc } = useLanguage();
  const [playing, setPlaying] = useState(false);

  return (
    <div className="space-y-5">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1a1c] via-[#102a2d] to-[#0d3b40]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(26,127,140,0.25),transparent_60%)]" />
        <button
          onClick={() => setPlaying(!playing)}
          className="absolute inset-0 grid place-items-center"
          aria-label={t("learn.videoPlaceholder")}
        >
          <span className="grid h-20 w-20 place-items-center rounded-full bg-white/10 backdrop-blur-md transition-transform hover:scale-110">
            {playing ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="ms-1 h-8 w-8 text-white" />
            )}
          </span>
        </button>
        <p className="absolute start-5 top-4 text-sm font-medium text-white/70">
          {t("learn.videoPlaceholder")} — {loc(lesson.title)}
        </p>

        {/* control bar */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8">
          <div className="h-1 w-full rounded-full bg-white/20">
            <div className="h-full w-1/3 rounded-full bg-accent" />
          </div>
          <div className="mt-2.5 flex items-center justify-between text-white/80">
            <div className="flex items-center gap-3">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <Volume2 className="h-4 w-4" />
              <span className="text-xs">04:12 / {lesson.durationMin}:00</span>
            </div>
            <Settings className="h-4 w-4" />
          </div>
        </div>
      </div>

      {lesson.chapters && lesson.chapters.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-ink">{t("learn.chapters")}</h3>
          <div className="mt-3 space-y-1.5">
            {lesson.chapters.map((ch, i) => (
              <button
                key={ch.time}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors hover:bg-surface-2"
              >
                <span className="font-mono text-xs text-accent">{ch.time}</span>
                <span className="text-sm text-ink">
                  {i + 1}. {loc(ch.title)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
