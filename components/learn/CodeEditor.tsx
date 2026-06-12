"use client";

import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { tags as t } from "@lezer/highlight";

/**
 * Dark theme matching the workspace editor chrome (#0b1416 background)
 * with classic editor token colors.
 */
const miyarDark = createTheme({
  theme: "dark",
  settings: {
    background: "#0b1416",
    foreground: "#d6e7e9",
    caret: "#7fd6c2",
    selection: "#1d3a3f",
    selectionMatch: "#1d3a3f",
    lineHighlight: "#ffffff08",
    gutterBackground: "#0b1416",
    gutterForeground: "#ffffff40",
    gutterBorder: "#ffffff0d",
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  styles: [
    { tag: [t.keyword, t.controlKeyword, t.operatorKeyword], color: "#c792ea" },
    { tag: [t.function(t.variableName), t.function(t.propertyName)], color: "#82aaff" },
    { tag: [t.string, t.special(t.string)], color: "#c3e88d" },
    { tag: [t.number, t.bool, t.null], color: "#f78c6c" },
    { tag: [t.comment, t.lineComment, t.blockComment], color: "#5f7a7d", fontStyle: "italic" },
    { tag: [t.className, t.typeName], color: "#ffcb6b" },
    { tag: [t.definition(t.variableName), t.propertyName], color: "#d6e7e9" },
    { tag: [t.operator, t.punctuation], color: "#89ddff" },
    { tag: [t.tagName], color: "#f07178" },
    { tag: [t.attributeName], color: "#ffcb6b" },
    { tag: [t.attributeValue], color: "#c3e88d" },
    { tag: [t.angleBracket, t.bracket], color: "#89ddff" },
  ],
});

export default function CodeEditor({
  value,
  language,
  onChange,
}: {
  value: string;
  language: "python" | "html";
  onChange: (code: string) => void;
}) {
  return (
    <div dir="ltr" className="min-h-[290px] flex-1 [&_.cm-editor]:!outline-none">
      <CodeMirror
        value={value}
        onChange={onChange}
        theme={miyarDark}
        extensions={[language === "html" ? html() : python()]}
        height="100%"
        minHeight="290px"
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          // No autocomplete popup — learners should type print/for/if
          // themselves instead of picking from a confusing suggestion list.
          autocompletion: false,
          bracketMatching: true,
          closeBrackets: true,
          indentOnInput: true,
        }}
        style={{ fontSize: "13px" }}
      />
    </div>
  );
}
