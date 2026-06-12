"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Markdown renderer shared by the mentor chat and the task panel.
 * Inline code and code blocks stay LTR even inside RTL Arabic text so
 * fragments like `print("...")` read correctly instead of being
 * bidi-mangled.
 */
export function RichMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => (
          <strong className="font-bold text-ink">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="mb-2 list-disc space-y-1 ps-5 last:mb-0">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-2 list-decimal space-y-1 ps-5 last:mb-0">{children}</ol>
        ),
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noreferrer" className="text-primary underline">
            {children}
          </a>
        ),
        code: ({ className, children }) => {
          // Fenced blocks come wrapped in <pre> (handled below); this styles inline code
          const isBlock = /language-/.test(className ?? "");
          if (isBlock) {
            return <code className={className}>{children}</code>;
          }
          return (
            <code
              dir="ltr"
              className="mx-0.5 rounded-md bg-primary/15 px-1.5 py-0.5 font-mono text-[0.85em] font-semibold text-primary dark:text-primary-strong"
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre
            dir="ltr"
            className="mb-2 overflow-x-auto rounded-xl bg-[#0b1416] p-3 font-mono text-xs leading-6 text-[#d6e7e9] last:mb-0"
          >
            {children}
          </pre>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
