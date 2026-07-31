"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Play,
  RotateCcw,
  Wand2,
  FlaskConical,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CodeEditor } from "./code-editor";
import { buildSandboxDoc, formatCode, formatErrorMessage } from "./sandbox";
import type { LabStep } from "@/lib/course/types";

interface ExerciseLabProps {
  mode: "react" | "html";
  title?: string;
  /** Code the learner starts from at step 1. */
  starter: string;
  steps: LabStep[];
  /** Stable ids, one per step — shared with the lesson completion gate. */
  ids: string[];
  checkedIds: Set<string>;
  onToggle: (id: string) => void;
  /** Namespaces the saved draft so each lab keeps its own code. */
  storageKey: string;
}

/**
 * Multi-step coding exercise.
 *
 * The whole point: there is ONE editor for the whole lab and the learner's code
 * is never reset between steps. Step 2 continues from whatever they wrote in
 * step 1, which is how the tasks are written ("now add a button to it").
 *
 * The draft is saved to localStorage so closing the lesson doesn't lose work.
 */
export function ExerciseLab({
  mode,
  title,
  starter,
  steps,
  ids,
  checkedIds,
  onToggle,
  storageKey,
}: ExerciseLabProps) {
  const [source, setSource] = useState(starter);
  const [step, setStep] = useState(0);
  const [srcDoc, setSrcDoc] = useState("");
  const [runId, setRunId] = useState(0);
  const [formatting, setFormatting] = useState(false);
  const [formatMsg, setFormatMsg] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Restore the saved draft (and the step the learner was on) once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as { code?: string; step?: number };
        if (typeof saved.code === "string") setSource(saved.code);
        if (typeof saved.step === "number") {
          setStep(Math.min(Math.max(0, saved.step), steps.length - 1));
        }
      }
    } catch {
      /* corrupted draft — just start fresh */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist the draft as the learner types (cheap: a few KB of text).
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ code: source, step }));
    } catch {
      /* storage full or blocked — not worth interrupting the lesson */
    }
  }, [source, step, storageKey]);

  useEffect(() => {
    setSrcDoc(buildSandboxDoc(mode, source, runId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId]);

  // Reset the per-step disclosures when moving between steps.
  useEffect(() => {
    setShowHint(false);
    setShowSolution(false);
  }, [step]);

  const run = useCallback(() => setRunId((n) => n + 1), []);

  async function format() {
    setFormatting(true);
    setFormatMsg("");
    try {
      setSource(await formatCode(source));
      setFormatMsg("Цэгцэллээ ✓");
    } catch (e) {
      setFormatMsg(formatErrorMessage(e));
    } finally {
      setFormatting(false);
      setTimeout(() => setFormatMsg(""), 3000);
    }
  }

  const current = steps[step];
  const currentId = ids[step];
  const isStepDone = checkedIds.has(currentId);
  const doneCount = ids.filter((id) => checkedIds.has(id)).length;
  const isLast = step === steps.length - 1;

  /** Mark the step done and move on — WITHOUT touching the code. */
  function completeAndNext() {
    if (!isStepDone) onToggle(currentId);
    if (!isLast) setStep(step + 1);
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      {/* Header + progress */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/40 px-3 py-2">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <FlaskConical className="h-4 w-4 text-primary" />
          {title ?? "Дасгал"}
        </span>
        <span className="text-xs text-muted-foreground">
          {doneCount}/{steps.length} алхам гүйцэтгэсэн
        </span>
      </div>

      {/* Step pills — jump around freely, the code stays put */}
      <div className="flex flex-wrap gap-1.5 border-b px-3 py-2">
        {steps.map((s, i) => {
          const done = checkedIds.has(ids[i]);
          const active = i === step;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setStep(i)}
              title={s.task}
              className={cn(
                "flex h-7 min-w-7 items-center justify-center gap-1 rounded-full px-2 text-xs font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : done
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground hover:bg-muted/70",
              )}
            >
              {done && !active ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </button>
          );
        })}
      </div>

      {/* Current task */}
      <div className="space-y-2 border-b px-4 py-3">
        <div className="flex items-start gap-2">
          <span
            className={cn(
              "mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold",
              isStepDone
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                : "bg-primary/10 text-primary",
            )}
          >
            Алхам {step + 1}
          </span>
          <p className="text-[15px] leading-relaxed">{current.task}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {current.hint && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowHint((v) => !v)}
              className="h-7 px-2 text-xs"
            >
              <Lightbulb className="mr-1 h-3.5 w-3.5" />
              {showHint ? "Санамжийг нуух" : "Санамж"}
            </Button>
          )}
          {current.solution && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowSolution((v) => !v)}
              className="h-7 px-2 text-xs"
            >
              <Eye className="mr-1 h-3.5 w-3.5" />
              {showSolution ? "Хариуг нуух" : "Жишээ хариу"}
            </Button>
          )}
        </div>

        {showHint && current.hint && (
          <p className="rounded-lg border border-amber-500/30 bg-amber-500/[0.06] px-3 py-2 text-sm">
            {current.hint}
          </p>
        )}

        {showSolution && current.solution && (
          <div className="space-y-1.5">
            <pre className="overflow-x-auto rounded-lg border bg-muted/60 p-3 text-[12.5px] leading-relaxed">
              <code className="font-mono">{current.solution}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2 text-xs"
              onClick={() => {
                setSource(current.solution!);
                setRunId((n) => n + 1);
              }}
            >
              Энэ кодыг засварлагч руу тавих
            </Button>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/20 px-3 py-2">
        <span className="text-xs text-muted-foreground">
          Кодоо энд бич — алхам солиход <b>арилахгүй</b>
        </span>
        <div className="flex items-center gap-1.5">
          {formatMsg && (
            <span className="mr-1 text-xs text-muted-foreground">{formatMsg}</span>
          )}
          <Button size="sm" variant="ghost" onClick={format} disabled={formatting}>
            <Wand2 className="mr-1 h-3.5 w-3.5" />
            {formatting ? "Цэгцэлж…" : "Цэгцлэх"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (window.confirm("Бичсэн бүх кодоо анхны байдалд нь буцаах уу?")) {
                setSource(starter);
                setRunId((n) => n + 1);
              }
            }}
          >
            <RotateCcw className="mr-1 h-3.5 w-3.5" /> Эхнээс
          </Button>
          <Button size="sm" onClick={run}>
            <Play className="mr-1 h-3.5 w-3.5" /> Ажиллуулах
          </Button>
        </div>
      </div>

      {/* Editor + preview */}
      <div className="grid md:grid-cols-2">
        <div className="border-b md:border-b-0 md:border-r">
          <CodeEditor value={source} onChange={setSource} minHeight={300} />
        </div>
        <iframe
          srcDoc={srcDoc}
          title="lab-preview"
          sandbox="allow-scripts"
          className="min-h-[300px] w-full bg-white"
        />
      </div>

      {/* Step navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t bg-muted/30 px-3 py-2.5">
        <Button
          size="sm"
          variant="ghost"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Өмнөх
        </Button>

        <div className="flex items-center gap-2">
          {isStepDone && (
            <button
              type="button"
              onClick={() => onToggle(currentId)}
              className="text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              Тэмдэглэгээг арилгах
            </button>
          )}
          <Button size="sm" onClick={completeAndNext} disabled={isStepDone && isLast}>
            <Check className="mr-1 h-4 w-4" />
            {isLast
              ? isStepDone
                ? "Бүх алхам дууслаа"
                : "Дуусгах"
              : "Гүйцэтгэсэн — дараагийн алхам"}
            {!isLast && <ChevronRight className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
