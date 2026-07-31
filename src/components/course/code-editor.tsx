"use client";

import { useMemo, useRef } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (next: string) => void;
  /** Minimum editor height in px. */
  minHeight?: number;
  maxHeight?: number;
}

/**
 * Plain textarea editor with a synced line-number gutter.
 *
 * Deliberately not a full code editor (no CodeMirror/Monaco): it keeps the
 * bundle tiny and works identically on mobile, which matters more here than
 * syntax highlighting.
 */
export function CodeEditor({
  value,
  onChange,
  minHeight = 280,
  maxHeight = 420,
}: CodeEditorProps) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lineCount = useMemo(() => value.split("\n").length, [value]);

  /** Keep the gutter aligned while the textarea scrolls. */
  function syncScroll() {
    if (gutterRef.current && taRef.current) {
      gutterRef.current.scrollTop = taRef.current.scrollTop;
    }
  }

  /** Tab should indent, not move focus out of the editor. */
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const el = e.currentTarget;
    const { selectionStart: s, selectionEnd: en } = el;
    const next = value.slice(0, s) + "  " + value.slice(en);
    onChange(next);
    // Restore the caret after React re-renders with the new value.
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = s + 2;
    });
  }

  return (
    <div className="relative flex bg-muted/20">
      <div
        ref={gutterRef}
        aria-hidden
        style={{ maxHeight }}
        className="shrink-0 select-none overflow-hidden border-r bg-muted/40 px-2 py-3 text-right font-mono text-[13px] leading-relaxed text-muted-foreground/70"
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        rows={14}
        style={{ minHeight, maxHeight }}
        className="flex-1 resize-y bg-transparent p-3 pl-2 font-mono text-[13px] leading-relaxed outline-none"
      />
    </div>
  );
}
