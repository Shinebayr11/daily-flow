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
