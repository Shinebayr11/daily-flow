import type { CourseModule, ScheduleRow } from "./types";
import { lessonM1L1 } from "./lesson-m1l1";
import { lessonM1L3, lessonM1L4, lessonM1L5, lessonM1L6 } from "./lessons-m1";
import { thinkingInReact, nestingComponents, esModules } from "./lessons-m1-extra";
import { m2l1, m2l2, m2l3, m2l4, m2l5, m2l6 } from "./lessons-m2";
import { m3l1, m3l2, m3l3 } from "./lessons-m3";
import {
  m4l1, m4l2, m4l3, m4l4, m4l5, m4l6, m4l7,
  m4l8, m4l9, m4l10, m4l11, m4l12, m4l13,
} from "./lessons-m4";
import { m5l1, m5l2, m5l3, m5l4, m5l5, m5l6 } from "./lessons-m5";
import {
  m6l1, m6l2, m6l3, m6l4, m6l5, m6l6, m6l7, m6l8, m6l9, m6l10,
  m6l11, m6l12, m6l13, m6l14, m6l15, m6l16, m6l17, m6l18, m6l19,
} from "./lessons-m6";
import {
  m7l1, m7l2, m7l3, m7l4, m7l5,
  m8l1, m8l2, m8l3, m8l4,
  m9l1, m9l2, m9l3,
} from "./lessons-m789";
import {
  m10l1, m10l2, m10l3, m10l4, m10l5,
  m10l6, m10l7, m10l8, m10l9, m10l10,
} from "./lessons-m10";

// ---- Ерөнхий танилцуулга ----
export const COURSE_OVERVIEW =
  "Анхан шатнаас эхлэн React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, " +
  "Prisma, AI API болон Git/GitHub-ийг заадаг Full-Stack Web Development хөтөлбөр. " +
  "Хичээл бүр онол, амьдралын жишээ, ажиллах код, дасгал, quiz-тэй.";

// ---- Долоо хоногийн хуваарь (үргэлжлэх хугацаа) ----
export const SCHEDULE: ScheduleRow[] = [
  { week: "1 дх", module: "1-р модуль", focus: "React Fundamental" },
  { week: "1 дх", module: "2-р модуль", focus: "Todo Web Application" },
  { week: "1 дх", module: "3-р модуль", focus: "Multi-Steps Form" },
  { week: "3 дх", module: "4-р модуль", focus: "Movie Web Application" },
  { week: "1 дх", module: "5-р модуль", focus: "Node JS Fundamental" },
  { week: "3 дх", module: "6-р модуль", focus: "Food Delivery Application" },
  { week: "1 дх", module: "7-р модуль", focus: "AI Image Model" },
  { week: "2 дх", module: "8-р модуль", focus: "Article Summarize & Quiz" },
  { week: "4 дх", module: "9-р модуль", focus: "Team Project" },
  { week: "2 дх", module: "10-р модуль", focus: "Quiz App — эхнээс дуустал" },
];

// ---- Шалгалтын бүтэц ----
export const EXAM_STRUCTURE: string[] = [
  "Хичээл бүрийн төгсгөлд: 5 асуулттай quiz + дасгал.",
  "Модуль бүрийн төгсгөлд: сурсан сэдвээ практикт хэрэглэж бататгах.",
  "Дунд шат: Movie Web App-аа Vercel дээр deploy хийж танилцуулах.",
  "Төгсгөл: Team Project-оо GitHub дээр багаар хийж deploy хийх.",
  "Үнэлгээ: Quiz 30% · Дасгал/бие даалт 30% · Практик ажил 40%.",
];

// ---- Модулиуд (таны хуваарийн дагуу, сэдэв бүр = 1 хичээл) ----
export const MODULES: CourseModule[] = [
  {
    id: "m1",
    order: 1,
    title: "React Fundamental",
    goal: "React/Next.js-ийн үндэс: JSX, component, props, rendering.",
    weeks: "1 дол. хоног",
    lessons: [
      { id: "m1l1", title: "Next JS App Router Introduction", blocks: lessonM1L1 },
      { id: "m1l2", title: "JSX Syntax", blocks: lessonM1L3 },
      { id: "m1l3", title: "Thinking in React", blocks: thinkingInReact },
      { id: "m1l4", title: "Components", blocks: lessonM1L4 },
      { id: "m1l5", title: "Nesting Components", blocks: nestingComponents },
      { id: "m1l6", title: "Props", blocks: lessonM1L5 },
      { id: "m1l7", title: "Conditional Render", blocks: lessonM1L6 },
      { id: "m1l8", title: "ES Modules Handling", blocks: esModules },
    ],
  },
  {
    id: "m2",
    order: 2,
    title: "Todo Web Application",
    goal: "useState, event, list rendering, localStorage, Vercel deploy.",
    weeks: "1 дол. хоног",
    lessons: [
      { id: "m2l1", title: "CSS Modules Introduction", blocks: m2l1 },
      { id: "m2l2", title: "useState hook", blocks: m2l2 },
      { id: "m2l3", title: "Rendering Lists", blocks: m2l3 },
      { id: "m2l4", title: "alert", blocks: m2l4 },
      { id: "m2l5", title: "Click, Change and Submit events", blocks: m2l5 },
      { id: "m2l6", title: "Vercel", blocks: m2l6 },
    ],
  },
  {
    id: "m3",
    order: 3,
    title: "Multi-Steps Form",
    goal: "Validation, error message, Framer Motion animation.",
    weeks: "1 дол. хоног",
    lessons: [
      { id: "m3l1", title: "Validation", blocks: m3l1 },
      { id: "m3l2", title: "Handle Error Message", blocks: m3l2 },
      { id: "m3l3", title: "Framer Motion", blocks: m3l3 },
    ],
  },
  {
    id: "m4",
    order: 4,
    title: "Movie Web Application",
    goal: "Routing, useEffect, SSR/CSR, axios/fetch, SWR, TMDB API.",
    weeks: "3 дол. хоног",
    lessons: [
      { id: "m4l1", title: "Next Router", blocks: m4l1 },
      { id: "m4l2", title: "useEffect hook", blocks: m4l2 },
      { id: "m4l3", title: "SSR (Server components) / CSR", blocks: m4l3 },
      { id: "m4l4", title: "axios / fetch", blocks: m4l4 },
      { id: "m4l5", title: "Promise", blocks: m4l5 },
      { id: "m4l6", title: "Async / Await", blocks: m4l6 },
      { id: "m4l7", title: "SWR (Stale-While-Revalidate)", blocks: m4l7 },
      { id: "m4l8", title: "Meta tag", blocks: m4l8 },
      { id: "m4l9", title: "TypeScript", blocks: m4l9 },
      { id: "m4l10", title: "SearchParams", blocks: m4l10 },
      { id: "m4l11", title: "Parallel Router", blocks: m4l11 },
      { id: "m4l12", title: "TMDB API", blocks: m4l12 },
      { id: "m4l13", title: "Shadcn UI · Responsive Design", blocks: m4l13 },
    ],
  },
  {
    id: "m5",
    order: 5,
    title: "Node JS Fundamental",
    goal: "REST API, Express, HTTP status, JSON, error handling.",
    weeks: "1 дол. хоног",
    lessons: [
      { id: "m5l1", title: "Rest API", blocks: m5l1 },
      { id: "m5l2", title: "Express JS", blocks: m5l2 },
      { id: "m5l3", title: "Error Handling", blocks: m5l3 },
      { id: "m5l4", title: "HTTP Status Codes", blocks: m5l4 },
      { id: "m5l5", title: "HTTP requests / response", blocks: m5l5 },
      { id: "m5l6", title: "JSON", blocks: m5l6 },
    ],
  },
  {
    id: "m6",
    order: 6,
    title: "Food Delivery Web Application",
    goal: "MVC, MongoDB/Mongoose, JWT auth, Cloudinary, deployment.",
    weeks: "3 дол. хоног",
    lessons: [
      { id: "m6l1", title: "MVC Architecture", blocks: m6l1 },
      { id: "m6l2", title: "MongoDB", blocks: m6l2 },
      { id: "m6l3", title: "NoSQL", blocks: m6l3 },
      { id: "m6l4", title: "Router", blocks: m6l4 },
      { id: "m6l5", title: "Controller", blocks: m6l5 },
      { id: "m6l6", title: "TypeScript", blocks: m6l6 },
      { id: "m6l7", title: "Middleware", blocks: m6l7 },
      { id: "m6l8", title: "Mongoose ODM", blocks: m6l8 },
      { id: "m6l9", title: "Model", blocks: m6l9 },
      { id: "m6l10", title: "Render.io (Deployment)", blocks: m6l10 },
      { id: "m6l11", title: "Mongoose population", blocks: m6l11 },
      { id: "m6l12", title: "Mongoose Aggregate", blocks: m6l12 },
      { id: "m6l13", title: "useContext", blocks: m6l13 },
      { id: "m6l14", title: "Authorization", blocks: m6l14 },
      { id: "m6l15", title: "JWT", blocks: m6l15 },
      { id: "m6l16", title: "bcrypt", blocks: m6l16 },
      { id: "m6l17", title: "Cloudinary", blocks: m6l17 },
      { id: "m6l18", title: "Formik", blocks: m6l18 },
      { id: "m6l19", title: "Yup", blocks: m6l19 },
    ],
  },
  {
    id: "m7",
    order: 7,
    title: "AI Image Model",
    goal: "AI model, Huggingface, Gemini API.",
    weeks: "1 дол. хоног",
    lessons: [
      { id: "m7l1", title: "What is AI", blocks: m7l1 },
      { id: "m7l2", title: "AI models", blocks: m7l2 },
      { id: "m7l3", title: "How to use it", blocks: m7l3 },
      { id: "m7l4", title: "Using Huggingface models", blocks: m7l4 },
      { id: "m7l5", title: "Gemini API", blocks: m7l5 },
    ],
  },
  {
    id: "m8",
    order: 8,
    title: "Article Summarize & Quiz Generator",
    goal: "PostgreSQL/Neon, Prisma ORM, relation database, Gemini API.",
    weeks: "2 дол. хоног",
    lessons: [
      { id: "m8l1", title: "PostgreSQL (Neon database)", blocks: m8l1 },
      { id: "m8l2", title: "Prisma ORM", blocks: m8l2 },
      { id: "m8l3", title: "Relation database", blocks: m8l3 },
      { id: "m8l4", title: "Gemini API", blocks: m8l4 },
    ],
  },
  {
    id: "m9",
    order: 9,
    title: "Team Project",
    goal: "Git branch, Pull Request, stand-up, GitHub project, deploy.",
    weeks: "4 дол. хоног",
    lessons: [
      { id: "m9l1", title: "Github Branch", blocks: m9l1 },
      { id: "m9l2", title: "Stand Up", blocks: m9l2 },
      { id: "m9l3", title: "Github project", blocks: m9l3 },
    ],
  },
  {
    id: "m10",
    order: 10,
    title: "Quiz App — эхнээс дуустал",
    goal: "Бодит төслийн 14 алдааг ✗/✓ хэлбэрээр задалж, AI + Postgres апп барина.",
    weeks: "2 дол. хоног",
    lessons: [
      { id: "m10l1", title: "Төслийн суурь", blocks: m10l1 },
      { id: "m10l2", title: "Өгөгдлийн сан", blocks: m10l2 },
      { id: "m10l3", title: "Нэвтрэлт", blocks: m10l3 },
      { id: "m10l4", title: "Өгүүлэл оруулах UI", blocks: m10l4 },
      { id: "m10l5", title: "AI хураангуй", blocks: m10l5 },
      { id: "m10l6", title: "Хадгалах ба түүх", blocks: m10l6 },
      { id: "m10l7", title: "Хажуугийн самбар", blocks: m10l7 },
      { id: "m10l8", title: "Тест үүсгэх", blocks: m10l8 },
      { id: "m10l9", title: "Тестийн хуудас", blocks: m10l9 },
      { id: "m10l10", title: "Оноо ба дуусгал", blocks: m10l10 },
    ],
  },
];

/** Нийт хичээлийн тоо (progress-д ашиглана). */
export const TOTAL_LESSONS = MODULES.reduce((n, m) => n + m.lessons.length, 0);

/** id-гаар хичээл + модуль олох туслах. */
export function findLesson(lessonId: string) {
  for (const m of MODULES) {
    const l = m.lessons.find((x) => x.id === lessonId);
    if (l) return { module: m, lesson: l };
  }
  return null;
}
