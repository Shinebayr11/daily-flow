"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Lock,
  CalendarRange,
  FolderKanban,
  GraduationCap,
  Map as MapIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import {
  MODULES,
  SCHEDULE,
  COURSE_OVERVIEW,
  EXAM_STRUCTURE,
  TOTAL_LESSONS,
  findLesson,
} from "@/lib/course/curriculum";
import { LessonContent, collectExerciseIds } from "./lesson-content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "dailyflow.course.progress";
const EX_STORAGE_KEY = "dailyflow.course.exercises";

export function CourseView() {
  const { t } = useLanguage();
  const [done, setDone] = useState<Set<string>>(new Set());
  const [exDone, setExDone] = useState<Set<string>>(new Set());
  const [openLesson, setOpenLesson] = useState<string | null>(null);

  // Load / persist progress in localStorage (works without any database).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(new Set(JSON.parse(raw) as string[]));
      const rawEx = window.localStorage.getItem(EX_STORAGE_KEY);
      if (rawEx) setExDone(new Set(JSON.parse(rawEx) as string[]));
    } catch {
      /* ignore */
    }
  }, []);

  function toggleDone(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  function toggleExercise(id: string) {
    setExDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      window.localStorage.setItem(EX_STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  const overallPct = Math.round((done.size / TOTAL_LESSONS) * 100);
  const active = useMemo(() => (openLesson ? findLesson(openLesson) : null), [openLesson]);
  // Pulled out so TypeScript narrows it directly (destructuring loses the guard).
  const activeBlocks = active?.lesson.blocks;

  // ---- Lesson detail view ----
  if (active && activeBlocks) {
    const { module, lesson } = active;
    const blocks = activeBlocks;
    const isDone = done.has(lesson.id);
    // Completion is gated: every exercise item in this lesson must be ticked.
    const exIds = collectExerciseIds(lesson.id, blocks);
    const exDoneCount = exIds.filter((id) => exDone.has(id)).length;
    const canComplete = exIds.length === 0 || exDoneCount === exIds.length;
    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => setOpenLesson(null)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {t("course.back")}
        </button>

        <div>
          <p className="text-sm text-primary">{module.title}</p>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
        </div>

        <Card>
          <CardContent className="p-5 sm:p-7">
            <LessonContent
              blocks={blocks}
              lessonId={lesson.id}
              checkedExercises={exDone}
              onToggleExercise={toggleExercise}
            />
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {exIds.length > 0 && (
            <span className="text-sm text-muted-foreground">
              Дасгал: {exDoneCount}/{exIds.length}
              {!canComplete && " — бүгдийг гүйцэтгэвэл дуусгах боломжтой"}
            </span>
          )}
          <Button
            variant={isDone ? "secondary" : "default"}
            disabled={!canComplete && !isDone}
            onClick={() => toggleDone(lesson.id)}
          >
            <Check className="mr-1.5 h-4 w-4" />
            {isDone ? t("course.done") : t("course.markDone")}
          </Button>
        </div>
      </div>
    );
  }

  // ---- Overview + modules ----
  return (
    <div className="space-y-6">
      {/* Overall progress */}
      <Card>
        <CardContent className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 font-semibold">
              <GraduationCap className="h-5 w-5 text-primary" />
              {t("course.progress")}
            </span>
            <span className="text-sm text-muted-foreground">
              {done.size}/{TOTAL_LESSONS} {t("course.lessons")} · {overallPct}%
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Roadmap */}
      <Card>
        <CardContent className="space-y-3 p-5">
          <h2 className="flex items-center gap-2 font-semibold">
            <MapIcon className="h-5 w-5 text-primary" /> {t("course.roadmap")}
          </h2>
          <p className="text-sm text-muted-foreground">{COURSE_OVERVIEW}</p>
        </CardContent>
      </Card>

      {/* Weekly schedule + projects + exam */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <CalendarRange className="h-5 w-5 text-primary" /> {t("course.schedule")}
            </h2>
            <ul className="space-y-1.5 text-sm">
              {SCHEDULE.map((row) => (
                <li key={row.module} className="flex gap-3">
                  <span className="w-12 shrink-0 font-mono text-muted-foreground">
                    {row.week}
                  </span>
                  <span>{row.focus}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <FolderKanban className="h-5 w-5 text-primary" /> {t("course.exam")}
            </h2>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {EXAM_STRUCTURE.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Modules */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">{t("course.modules")}</h2>
        <div className="space-y-4">
          {MODULES.map((m) => {
            const moduleDone = m.lessons.filter((l) => done.has(l.id)).length;
            const pct = Math.round((moduleDone / m.lessons.length) * 100);
            return (
              <Card key={m.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-primary">
                        {m.order}-р модуль · {m.weeks}
                      </p>
                      <h3 className="font-bold">{m.title}</h3>
                    </div>
                    <span className="shrink-0 text-sm text-muted-foreground">{pct}%</span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{t("course.goal")}: </span>
                    {m.goal}
                  </p>

                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>

                  <ul className="mt-3 space-y-1">
                    {m.lessons.map((l, i) => {
                      const published = Boolean(l.blocks);
                      const isDone = done.has(l.id);
                      return (
                        <li key={l.id}>
                          <button
                            type="button"
                            disabled={!published}
                            onClick={() => published && setOpenLesson(l.id)}
                            className={cn(
                              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                              published ? "hover:bg-muted" : "cursor-default opacity-60",
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px]",
                                isDone
                                  ? "border-success bg-success text-success-foreground"
                                  : "text-muted-foreground",
                              )}
                            >
                              {isDone ? <Check className="h-3 w-3" /> : i + 1}
                            </span>
                            <span className="flex-1">{l.title}</span>
                            {published ? (
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Lock className="h-3 w-3" /> {t("course.comingSoon")}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <p className="flex items-center gap-2 pb-4 text-xs text-muted-foreground">
        <BookOpen className="h-3.5 w-3.5" />
        Шинэ хичээл нэмэгдэхэд энд гарч ирнэ. Chat дээр “дараагийн хичээл” гэж бичээрэй.
      </p>
    </div>
  );
}
