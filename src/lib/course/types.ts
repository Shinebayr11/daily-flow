/** One task inside a stepped exercise lab. */
export interface LabStep {
  /** What the learner must add to the code they already have. */
  task: string;
  /** Optional nudge, hidden behind a button. */
  hint?: string;
  /** Optional reference answer, hidden behind a button. */
  solution?: string;
}

// Types for the built-in "Хичээл" (Lessons) section.
// Lesson content is authored as typed content blocks — no markdown parser or
// extra dependency needed, so it renders reliably.

export type ContentBlock =
  | { type: "p"; text: string } // paragraph (supports **bold** and `code`)
  | { type: "h"; text: string } // sub-heading inside a lesson
  | { type: "ul"; items: string[] } // bullet list
  | { type: "ol"; items: string[] } // numbered list
  | { type: "code"; lang?: string; code: string } // code block
  | {
      type: "callout";
      variant: "tip" | "warn" | "error";
      title?: string;
      text: string;
    }
  | {
      type: "quiz";
      questions: { q: string; options: string[]; answer: number }[];
    }
  /**
   * "Try it yourself" — editable code that runs live in a sandboxed iframe.
   * mode "react" wraps the code with React + Babel; "html" runs raw HTML/CSS/JS.
   */
  | {
      type: "playground";
      mode: "react" | "html";
      title?: string;
      code: string;
    }
  /**
   * Checklist of exercises. A lesson can only be marked complete once every
   * exercise item across the lesson is ticked.
   */
  | {
      type: "exercise";
      title?: string;
      items: string[];
    }
  /**
   * Side-by-side ✗ wrong / ✓ right comparison. Stacks on small screens.
   * Use for "here is the mistake, here is the fix" — the single most useful
   * shape for teaching debugging.
   */
  | {
      type: "compare";
      title?: string;
      /** Optional short label above each pane; defaults to "Буруу" / "Зөв". */
      bad: { label?: string; code: string };
      good: { label?: string; code: string };
      /** One-line explanation shown under both panes. */
      note?: string;
    }
  /**
   * Stepped coding exercise done right on the lesson page.
   *
   * There is ONE editor for the whole lab: the learner's code carries over
   * from step to step, because each task builds on the previous one
   * ("now add a button to the form you just made").
   *
   * Every step counts towards the lesson completion gate, exactly like an
   * `exercise` item does.
   */
  | {
      type: "lab";
      mode: "react" | "html";
      title?: string;
      /** Code the learner starts from at step 1. */
      starter: string;
      steps: LabStep[];
    };

export interface Lesson {
  id: string; // e.g. "m1l1"
  title: string;
  /** Written content. `undefined` means the lesson isn't published yet. */
  blocks?: ContentBlock[];
}

export interface CourseModule {
  id: string; // e.g. "m1"
  order: number;
  title: string;
  goal: string;
  weeks: string; // e.g. "1 дол. хоног"
  lessons: Lesson[];
}

export interface ScheduleRow {
  week: string;
  module: string;
  focus: string;
}
