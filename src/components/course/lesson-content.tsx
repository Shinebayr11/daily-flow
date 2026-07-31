"use client";

import { useState, type ReactNode } from "react";
import { Lightbulb, AlertTriangle, XCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentBlock } from "@/lib/course/types";
import { CodePlayground } from "./code-playground";
import { ExerciseBlock } from "./exercise-block";

/**
 * Minimal, safe inline formatter: supports **bold** and `inline code`.
 * Splits the string on those markers and returns React nodes — no HTML
 * injection, so it's safe.
 */
function inline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return tokens.map((tok, i) => {
    if (tok.startsWith("**") && tok.endsWith("**")) {
      return <strong key={i}>{tok.slice(2, -2)}</strong>;
    }
    if (tok.startsWith("`") && tok.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-primary"
        >
          {tok.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{tok}</span>;
  });
}

const CALLOUT_STYLES = {
  tip: { icon: Lightbulb, cls: "border-primary/30 bg-accent text-accent-foreground" },
  warn: { icon: AlertTriangle, cls: "border-warning/30 bg-warning/10 text-warning" },
  error: { icon: XCircle, cls: "border-destructive/30 bg-destructive/10 text-destructive" },
};

/** Interactive quiz block — reveals answers on demand. */
function QuizBlock({
  questions,
}: {
  questions: { q: string; options: string[]; answer: number }[];
}) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl border bg-card p-4">
      <ol className="space-y-4">
        {questions.map((item, qi) => (
          <li key={qi} className="space-y-2">
            <p className="font-medium">
              {qi + 1}. {item.q}
            </p>
            <div className="grid gap-1.5">
              {item.options.map((opt, oi) => {
                const isPicked = picked[qi] === oi;
                const isCorrect = item.answer === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                      isPicked && !show && "border-primary bg-accent",
                      show && isCorrect && "border-success bg-success/10 text-success",
                      show && isPicked && !isCorrect && "border-destructive bg-destructive/10 text-destructive",
                      !isPicked && !show && "hover:bg-muted",
                    )}
                  >
                    <span className="font-mono text-xs">{String.fromCharCode(65 + oi)}.</span>
                    {opt}
                    {show && isCorrect && <Check className="ml-auto h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        {show ? "Хариуг нуух" : "Хариуг харах"}
      </button>
    </div>
  );
}

interface LessonContentProps {
  blocks: ContentBlock[];
  /** Lesson id — used to build stable exercise ids. */
  lessonId: string;
  /** Ticked exercise ids (owned by CourseView so it can gate completion). */
  checkedExercises: Set<string>;
  onToggleExercise: (id: string) => void;
}

/** Build a stable id for exercise item `idx` of block `bi`. */
export function exerciseId(lessonId: string, bi: number, idx: number) {
  return `${lessonId}:${bi}:${idx}`;
}

/** All exercise ids contained in a set of blocks (for completion gating). */
export function collectExerciseIds(lessonId: string, blocks: ContentBlock[]) {
  const ids: string[] = [];
  blocks.forEach((b, bi) => {
    if (b.type === "exercise") {
      b.items.forEach((_, idx) => ids.push(exerciseId(lessonId, bi, idx)));
    }
  });
  return ids;
}

/** Renders an array of authored content blocks. */
export function LessonContent({
  blocks,
  lessonId,
  checkedExercises,
  onToggleExercise,
}: LessonContentProps) {
  return (
    <div className="space-y-4 leading-relaxed">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h":
            return (
              <h3 key={i} className="pt-2 text-lg font-bold">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[15px] text-foreground/90">
                {inline(block.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5 text-[15px] text-foreground/90">
                {block.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-1.5 pl-5 text-[15px] text-foreground/90">
                {block.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ol>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border bg-muted/60 p-4 text-[13px] leading-relaxed"
              >
                <code className="font-mono">{block.code}</code>
              </pre>
            );
          case "callout": {
            const { icon: Icon, cls } = CALLOUT_STYLES[block.variant];
            return (
              <div key={i} className={cn("flex gap-3 rounded-xl border p-3.5 text-sm", cls)}>
                <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0" />
                <div>
                  {block.title && <p className="font-semibold">{block.title}</p>}
                  <p className={block.title ? "mt-0.5" : ""}>{inline(block.text)}</p>
                </div>
              </div>
            );
          }
          case "quiz":
            return <QuizBlock key={i} questions={block.questions} />;
          case "playground":
            return (
              <CodePlayground
                key={i}
                mode={block.mode}
                title={block.title}
                code={block.code}
              />
            );
          case "exercise": {
            const ids = block.items.map((_, idx) => exerciseId(lessonId, i, idx));
            return (
              <ExerciseBlock
                key={i}
                title={block.title}
                items={block.items}
                ids={ids}
                checkedIds={checkedExercises}
                onToggle={onToggleExercise}
              />
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
