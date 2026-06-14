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
        h2: ({ children }) => (
          <h2 className="mb-3 mt-6 border-b border-line/15 pb-1.5 text-xl font-bold text-ink first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-5 text-lg font-bold text-ink first:mt-0">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="mb-2 mt-4 text-base font-bold text-ink first:mt-0">{children}</h4>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-3 border-s-4 border-primary/40 bg-surface-2/50 px-4 py-2 text-muted">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-5 border-line/15" />,
        table: ({ children }) => (
          <div className="my-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-line/20 bg-surface-2 px-3 py-2 text-start font-bold text-ink">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-line/20 px-3 py-2 align-top">{children}</td>
        ),
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
