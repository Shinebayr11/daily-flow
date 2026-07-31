import type { ContentBlock } from "./types";

// ========== 10-р модуль: Quiz App — эхнээс дуустал ==========
// Бодит бүтээх явцад гарсан 14 алдааг дараалуулан харуулсан практик модуль.

// ===== m10l1 — Төслийн суурь =====
export const m10l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Юу барихаа тодорхойлж, төслөө үүсгэж, орчны хувьсагчийн аюулгүй байдлыг ойлгоно." },

  { type: "h", text: "Юу барих вэ?" },
  { type: "p", text: "Хэрэглэгч өгүүлэл оруулна → AI хураангуйлна → тест үүсгэнэ → оноогоо харна. Бүх түүх хадгалагдаж, хажуугийн самбараас буцаж үзнэ." },
  { type: "code", lang: "text", code: `Хэрэглэгч өгүүлэл бичнэ
        ↓
/api/generate  →  Gemini  →  хураангуй
        ↓
/api/articles  →  DB: articles  →  id буцаана
        ↓
Хураангуй харагдана + "Тест ажиллуулах"
        ↓
/api/quiz  →  Gemini  →  5 асуулт  →  DB: quiz
        ↓
/quiz/[articleId]  →  DB-ээс уншина  →  тест
        ↓
/api/quiz/attempt  →  оноо хадгална`, },
  { type: "callout", variant: "tip", title: "Хамгийн үнэтэй 10 минут", text: "Код бичихээс өмнө өгөгдөл хэрхэн урсахыг цаасан дээр зур. Дараа гарах алдааны талаас илүү нь энэ урсгалын аль нэг холбоос тасарснаас үүснэ." },

  { type: "h", text: "Төсөл үүсгэх" },
  { type: "code", lang: "bash", code: `npx create-next-app@latest quiz

TypeScript          → Yes
ESLint              → Yes
Tailwind CSS        → Yes
src/ directory      → Yes
App Router          → Yes
Turbopack           → Yes
import alias (@/*)  → Yes`, },
  { type: "p", text: "`src/` болон `@/*` alias-ыг **заавал** сонго. Дараа нь `import { pool } from \"@/lib/db\"` гэж бичнэ — `../../../lib/db` гэж бичихээс хамаагүй дээр." },

  { type: "h", text: "Багц суулгах" },
  { type: "code", lang: "bash", code: `cd quiz
npm install pg @google/genai zod
npm install -D @types/pg
npx shadcn@latest init
npx shadcn@latest add sidebar dialog button`, },
  { type: "ul", items: [
    "`pg` — Postgres драйвер. ORM-гүйгээр шууд SQL бичнэ. Сурах зорилгод илүү ойлгомжтой.",
    "`@google/genai` — Gemini-ийн шинэ нэгдсэн SDK (хуучин `@google/generative-ai` биш).",
    "`zod` — AI-аас ирсэн өгөгдлийг шалгах. Яагаад хэрэгтэйг 8-р хичээлд.",
    "`shadcn/ui` — бэлэн сан биш, кодыг төсөл рүү чинь **хуулж өгдөг**. Дураараа засаж болно.",
  ] },

  { type: "h", text: "Хавтасны бүтэц" },
  { type: "code", lang: "text", code: `src/
├── app/
│   ├── api/
│   │   ├── articles/route.ts     # CRUD
│   │   ├── generate/route.ts     # AI хураангуй
│   │   └── quiz/
│   │       ├── route.ts          # AI тест үүсгэх
│   │       └── attempt/route.ts  # оноо хадгалах
│   ├── quiz/[id]/page.tsx        # тестийн хуудас
│   ├── layout.tsx
│   └── page.tsx                  # нүүр
├── components/
│   ├── ui/                       # shadcn
│   ├── Article.tsx               # эх удирдагч
│   ├── Generate.tsx              # оруулах форм
│   ├── Summary.tsx               # хураангуй харах
│   ├── Content.tsx               # эх текст
│   ├── Quiz.tsx                  # тест
│   ├── Sidebar.tsx               # түүх
│   └── Navbar.tsx
└── lib/
    ├── db.ts
    ├── sync-user.ts
    └── utils.ts`, },

  { type: "h", text: "⚠ Алдаа №1 — NEXT_PUBLIC_ буруу хэрэглэх" },
  { type: "p", text: "API key ажиллахгүй болохоор олон хүн `NEXT_PUBLIC_` угтвар нэмж \"засдаг\". Энэ бол **аюулгүй байдлын ноцтой цоорхой**." },
  { type: "compare", title: "Gemini түлхүүрийг тохируулах", bad: {
    label: "Буруу — хөтөчид ил гарна",
    code: `# .env.local
NEXT_PUBLIC_GEMINI_API_KEY="AIza..."

# route.ts
const client = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

// Хэн ч DevTools нээгээд
// түлхүүрийг хуулж авна.
// Төлбөр чинь тэднийх болно.`,
  }, good: {
    label: "Зөв — зөвхөн сервер дээр",
    code: `# .env.local
GEMINI_API_KEY="AIza..."

# route.ts (server дээр л ажиллана)
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// "undefined" гарвал угтвар нэмэх БИШ,
// dev server-ээ RESTART хий.`,
  }, note: "`.env.local` өөрчилсний дараа Next.js автоматаар дахин уншдаггүй — сервер дахин асаах шаардлагатай." },
  { type: "code", lang: "text", code: `Угтвар              Хаана харагдах        Хэрэглэх газар
NEXT_PUBLIC_XXX     Browser bundle дотор  Публик түлхүүр, домэйн
XXX                 Зөвхөн server дээр    БҮХ нууц түлхүүр`, },

  { type: "h", text: "⚠ Алдаа №2 — SSL warning" },
  { type: "code", lang: "text", code: `SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca'
are treated as aliases for 'verify-full'`, },
  { type: "p", text: "Энэ бол **алдаа биш, анхааруулга**. Next.js 16-ийн overlay нь server дээрх `console.warn`-ийг улаанаар харуулдаг тул айлгадаг." },
  { type: "compare", bad: {
    label: "Буруу — warning-ийг дуугүй болгосон",
    code: `new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

// Warning алга болно, гэхдээ
// MITM халдлагад нээлттэй болно.
// Warning-ийн зорилго нь ЯГ ТЭРНЭЭС
// сэргийлэх байсан.`,
  }, good: {
    label: "Зөв — тодорхой бич",
    code: `# .env.local
DATABASE_URL="...?sslmode=verify-full"

# require биш verify-full

new Pool({
  connectionString: process.env.DATABASE_URL,
})`,
  }, note: "Утга нь: одоогийн `pg` дээр `require` нь сертификатыг бүрэн шалгадаг. Ирээдүйд шалгахаа болино — тиймээс одооноос тодорхой бич." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Төслөө үүсгээд `src/` бүтцийг бэлд.",
    "Дунд: `.env.local` үүсгээд 4 хувьсагчийг зөв угтвартай бич.",
    "Дунд: Өгөгдлийн урсгалын схемийг цаасан дээр өөрөө зур.",
    "Хүнд: `NEXT_PUBLIC_` угтвартай түлхүүр DevTools-д харагдахыг батал.",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Нууц түлхүүрт ямар угтвар хэрэглэх вэ?", options: ["NEXT_PUBLIC_", "Угтваргүй", "PUBLIC_", "SECRET_"], answer: 1 },
    { q: "`.env.local` өөрчилсний дараа юу хийх вэ?", options: ["Юу ч үгүй", "Dev server restart", "npm install", "Cache цэвэрлэх"], answer: 1 },
    { q: "SSL warning-ыг яаж зөв шийдэх вэ?", options: ["rejectUnauthorized: false", "sslmode=verify-full", "Үл тоомсорлох", "SSL унтраах"], answer: 1 },
    { q: "shadcn/ui юугаараа онцлог вэ?", options: ["Кодыг төсөлд хуулж өгдөг", "node_modules-д суудаг", "CSS файл", "Backend сан"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Код бичихээс өмнө өгөгдлийн урсгалыг зур.",
    "Нууц түлхүүр угтваргүй. `NEXT_PUBLIC_` = хөтөчид ил.",
    "\"undefined\" гарвал угтвар нэмэх биш, dev server restart.",
    "`sslmode=verify-full`. `rejectUnauthorized: false` бүү бич.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Өгөгдлийн сан** — Neon дээр schema зохионо." },
];

// ===== m10l2 — Өгөгдлийн сан =====
export const m10l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Neon дээр Postgres үүсгэж, зөв schema зохиож, нэрлэх стандартын ач холбогдлыг ойлгоно." },

  { type: "h", text: "Холболт" },
  { type: "p", text: "neon.tech → шинэ төсөл → connection string хуулж `.env.local`-д тавь. Neon-ийг сонгосон шалтгаан: serverless, үнэгүй хувилбар хангалттай, SQL Editor нь браузер дотор." },
  { type: "code", lang: "ts", code: `// src/lib/db.ts
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});`, },
  { type: "callout", variant: "tip", title: "Яагаад Pool, Client биш?", text: "`Client` нь нэг холболт барина. Serverless орчинд хүсэлт бүрт шинэ холболт үүсгэвэл DB-ийн хязгаарт хүрнэ. `Pool` нь холболтуудыг дахин ашиглана." },

  { type: "h", text: "Хүснэгтүүд" },
  { type: "code", lang: "sql", code: `CREATE TABLE users (
  id TEXT PRIMARY KEY,          -- Clerk-ийн user ID
  email TEXT,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz (
  id SERIAL PRIMARY KEY,
  article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  questions JSONB,
  user_score INTEGER,
  attempt_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (article_id, user_id)
);`, },

  { type: "h", text: "Гурван чухал шийдвэр" },
  { type: "ul", items: [
    "**`ON DELETE CASCADE`** — өгүүлэл устахад тэр өгүүллийн тест ч устана. Байхгүй бол өнчин мөрүүд хуримтлагдана.",
    "**`questions JSONB`** — асуултууд хэзээ ч тусад нь query хийгддэггүй, үргэлж бүхэлдээ уншигдана. Тиймээс JSONB энгийн бөгөөд хурдан. `JSON` биш `JSONB` — сүүлийнх нь индекслэгддэг.",
    "**`UNIQUE (article_id, user_id)`** — нэг хэрэглэгч нэг өгүүлэлд нэг л тест. Дараа `ON CONFLICT` ажиллуулахад **заавал** хэрэгтэй.",
  ] },
  { type: "callout", variant: "warn", title: "UNIQUE байхгүй бол", text: "`ON CONFLICT` огт ажиллахгүй. Тест дахин үүсгэх бүрд шинэ мөр орж, хуучин оноо алдагдана." },

  { type: "h", text: "⚠ Алдаа №3 — Багана нэрлэх стандарт зөрчих" },
  { type: "p", text: "Бодит төсөлд `articles`-д `userid`, `createdat` (зураасгүй), `quiz`-д `user_id`, `created_at` (зураастай) гэж холилдсон байсан." },
  { type: "compare", bad: {
    label: "Буруу — холилдсон",
    code: `CREATE TABLE articles (
  userid TEXT,
  createdat TIMESTAMPTZ
);

CREATE TABLE quiz (
  user_id TEXT,
  created_at TIMESTAMPTZ
);

-- Query бичих бүрд аль хэлбэрийг
-- ашиглахаа санахгүй:
-- column "user_id" does not exist`,
  }, good: {
    label: "Зөв — нэг стандарт (snake_case)",
    code: `CREATE TABLE articles (
  user_id TEXT,
  created_at TIMESTAMPTZ
);

CREATE TABLE quiz (
  user_id TEXT,
  created_at TIMESTAMPTZ
);

-- Аль хэдийн холилдсон бол:
ALTER TABLE articles
  RENAME COLUMN userid TO user_id;`,
  }, note: "Проект жижиг байхад засах нь хожим 100 газар засахаас хамаагүй хялбар." },

  { type: "h", text: "⚠ Алдаа №4 — Үсгийн алдаатай багана" },
  { type: "p", text: "Бодит төсөлд `summary` гэж бичих ёстой газраа **`summery`** гэж бичсэн байв." },
  { type: "code", lang: "text", code: `error: column "summary" does not exist
routine: 'errorMissingColumn'`, },
  { type: "compare", bad: {
    label: "Түр зуурын — alias-аар тойрох",
    code: `SELECT id, title,
       summery AS summary
FROM articles
WHERE user_id = $1;

-- SELECT-д ажиллана.
-- Гэхдээ INSERT/UPDATE бичих бүрд
-- "summery" гэдгээ санах хэрэгтэй.`,
  }, good: {
    label: "Зөв — эх үндсээр нь зас",
    code: `ALTER TABLE articles
  RENAME COLUMN summery TO summary;

-- Дараа нь бүх газар
-- "summary" гэж бичнэ.`,
  }, note: "Түр зуурын шийдэл техникийн өр үүсгэдэг. Эрт засаарай." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Neon дээр төсөл үүсгэж `DATABASE_URL` ав.",
    "Дунд: 3 хүснэгтийг snake_case-ээр үүсгэ.",
    "Дунд: `lib/db.ts` бичиж `Pool` тохируул.",
    "Хүнд: `UNIQUE` constraint-гүйгээр `ON CONFLICT` бичээд алдааг хар.",
    "Хүнд: `ON DELETE CASCADE`-ийг турших — өгүүлэл устгаад тест устсан эсэхийг шалга.",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Serverless орчинд аль нь тохиромжтой вэ?", options: ["Client", "Pool", "Хоёулаа", "Аль нь ч биш"], answer: 1 },
    { q: "Индекслэгддэг JSON төрөл?", options: ["JSON", "JSONB", "TEXT", "BLOB"], answer: 1 },
    { q: "`ON CONFLICT` ажиллахад юу хэрэгтэй вэ?", options: ["UNIQUE constraint", "PRIMARY KEY", "INDEX", "Юу ч үгүй"], answer: 0 },
    { q: "Postgres-ийн уламжлалт нэрлэх хэлбэр?", options: ["camelCase", "snake_case", "PascalCase", "kebab-case"], answer: 1 },
    { q: "Эцэг мөр устахад хүүхдийг ч устгах?", options: ["ON DELETE CASCADE", "ON DELETE RESTRICT", "ON DELETE SET NULL", "NO ACTION"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`Pool` ашигла — serverless-д `Client` холболт дуусгана.",
    "`JSONB` индекслэгддэг, `JSON`-оос хурдан.",
    "`UNIQUE (article_id, user_id)` — `ON CONFLICT`-ийн урьдчилсан нөхцөл.",
    "Нэг нэрлэх стандарт (snake_case) сонгоод бүх газар барь.",
    "Үсгийн алдааг alias-аар тойрохгүй, `RENAME COLUMN`-оор зас.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Нэвтрэлт** — Clerk ба `syncUser` хэв маяг." },
];

// ===== m10l3 — Нэвтрэлт =====
export const m10l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Clerk-ийг холбож, Clerk-ийн хэрэглэгчийг өөрийн DB-тэй синк хийж, SQL injection-оос хамгаална." },

  { type: "h", text: "Clerk суулгах" },
  { type: "code", lang: "bash", code: `npm install @clerk/nextjs`, },
  { type: "code", lang: "tsx", code: `// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="mn">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}`, },
  { type: "code", lang: "ts", code: `// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\\\.(?:html?|css|js|jpg|png|svg)).*)",
    "/(api|trpc)(.*)",
  ],
};`, },

  { type: "h", text: "syncUser хэв маяг" },
  { type: "p", text: "Clerk нь хэрэглэгчийг өөрийн системд хадгална. Гэхдээ бидний `articles` хүснэгт `users(id)`-д foreign key-ээр холбогдож байгаа тул **DB-д ч мөр байх ёстой**." },
  { type: "code", lang: "ts", code: `// src/lib/sync-user.ts
import { currentUser } from "@clerk/nextjs/server";
import { pool } from "@/lib/db";

export const syncUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? null;
  const name = clerkUser.fullName ?? clerkUser.username ?? null;

  const { rows } = await pool.query(
    \`INSERT INTO users (id, email, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (id) DO UPDATE
       SET email = EXCLUDED.email, name = EXCLUDED.name
     RETURNING id, email, name\`,
    [clerkUser.id, email, name],
  );

  return rows[0];
};`, },
  { type: "ul", items: [
    "**`ON CONFLICT (id) DO UPDATE`** — \"upsert\": байхгүй бол оруул, байвал шинэчил. Хэрэглэгч эхний удаа нэвтрэхэд автоматаар DB-д орно.",
    "**`EXCLUDED`** — \"оруулах гэж байсан утга\". Postgres-ийн тусгай нэр.",
    "**`RETURNING`** — оруулсан/шинэчилсэн мөрийг буцаана.",
  ] },

  { type: "h", text: "⚠ Алдаа №5 — SQL injection" },
  { type: "compare", title: "Хэрэглэгчийн утгыг query-д оруулах", bad: {
    label: "Аюултай — string нийлүүлсэн",
    code: `await pool.query(
  \`SELECT * FROM users
   WHERE id = '\${userId}'\`
);

// Хэрэглэгч ингэж оруулбал:
//   ' OR '1'='1
// → бүх мөрийг авна
//
// Эсвэл:
//   '; DROP TABLE users; --
// → хүснэгт устана`,
  }, good: {
    label: "Зөв — параметр",
    code: `await pool.query(
  \`SELECT * FROM users
   WHERE id = $1\`,
  [userId],
);

// $1, $2 placeholder-ыг pg өөрөө
// аюулгүй орлуулна.
// Хэрэглэгч юу ч бичсэн зөвхөн
// УТГА гэж үзэгдэнэ, код биш.`,
  }, note: "Энэ алдаа илэрдэггүй — апп хэвийн ажиллаж байгаа мэт харагдана. Тиймээс эхнээс нь зөв бич." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Clerk-ийн key-үүдийг `.env.local`-д тавьж нэвтрэх хуудсыг ажиллуул.",
    "Дунд: `syncUser` функц бичиж upsert хий.",
    "Дунд: `middleware.ts` тохируулж хамгаалагдсан route үүсгэ.",
    "Хүнд: `EXCLUDED` юу хийж байгааг тайлбарлаж бич.",
    "Хүнд: SQL injection-ыг локал DB дээр зориудаар туршиж үз.",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Upsert хийх Postgres синтакс?", options: ["ON CONFLICT DO UPDATE", "INSERT OR UPDATE", "MERGE INTO", "UPSERT"], answer: 0 },
    { q: "`EXCLUDED` гэж юу вэ?", options: ["Хассан мөр", "Оруулах гэж байсан утга", "Хуучин утга", "NULL"], answer: 1 },
    { q: "SQL injection-оос яаж хамгаалах вэ?", options: ["Параметр ($1) ашиглах", "Тэмдэгт шүүх", "HTTPS", "Escape хийх"], answer: 0 },
    { q: "Яагаад Clerk хэрэглэгчийг DB-д ч хадгалах вэ?", options: ["Foreign key холбоход", "Хурдан болгох", "Заавал биш", "Кэшлэх"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Clerk хэрэглэгчийг `syncUser`-ээр өөрийн DB-тэй синк хий.",
    "`ON CONFLICT (id) DO UPDATE` = upsert.",
    "SQL-д хэрэглэгчийн утгыг **хэзээ ч** string нийлүүлж оруулахгүй — `$1` параметр.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Өгүүлэл оруулах UI** — state machine хэлбэрийн view." },
];

// ===== m10l4 — Өгүүлэл оруулах UI =====
export const m10l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Нэг хуудсанд олон байдлыг state-ээр удирдаж, state-г нэг газар төвлөрүүлсэн бүтэц барина." },

  { type: "h", text: "State machine хэлбэрийн view" },
  { type: "p", text: "Нэг хуудсанд гурван байдал байна: форм, хураангуй, эх текст. Тус бүрт route үүсгэх шаардлагагүй — `useState`-ээр удирдана." },
  { type: "code", lang: "tsx", code: `// src/components/Article.tsx
"use client";
import { useState } from "react";
import { Generate } from "./Generate";
import { Summary } from "./Summary";
import { Content } from "./Content";

type View = "form" | "summary" | "content";

export const Article = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [articleId, setArticleId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<View>("form");

  // generateSummary — 5-р хичээлд

  if (view === "summary") {
    return (
      <Summary
        articleId={articleId}
        title={title}
        summary={summary}
        content={content}
        onSeeContent={() => setView("content")}
      />
    );
  }

  if (view === "content") {
    return (
      <Content
        title={title}
        content={content}
        onBack={() => setView("summary")}
      />
    );
  }

  return (
    <Generate
      title={title}
      content={content}
      loading={loading}
      error={error}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onGenerate={generateSummary}
    />
  );
};`, },
  { type: "callout", variant: "tip", title: "Яагаад ийм бүтэц?", text: "Бүх state нэг газарт. Хүүхэд компонентууд \"тэнэг\" — зөвхөн харуулж, эргүүлж дуудна. Ингэснээр өгөгдөл хаанаас ирж байгааг мөшгих амархан." },

  { type: "h", text: "State-ийг хаана байрлуулах вэ?" },
  { type: "compare", bad: {
    label: "Буруу — state тарсан",
    code: `// Generate.tsx
const [title, setTitle] = useState("");

// Summary.tsx
const [title, setTitle] = useState("");
// ↑ өөр хувьсагч! Утга дамжихгүй

// Article.tsx
const [title, setTitle] = useState("");

// Гурван газар гурван өөр title.
// Аль нь жинхэнэ вэ?`,
  }, good: {
    label: "Зөв — эцэгт нь төвлөрүүлсэн",
    code: `// Article.tsx — цорын ганц эх сурвалж
const [title, setTitle] = useState("");

// Доош prop-оор дамжуулна
<Generate
  title={title}
  onTitleChange={setTitle}
/>

<Summary title={title} />

// Нэг л жинхэнэ утга байна.`,
  }, note: "Энэ загварыг \"lifting state up\" гэдэг. Хэд хэдэн component нэг өгөгдөл хуваалцаж байвал хамгийн ойрын нийтлэг эцэгт нь тавь." },

  { type: "h", text: "Оруулах форм" },
  { type: "code", lang: "tsx", code: `// src/components/Generate.tsx
"use client";

type GenerateProps = {
  title: string;
  content: string;
  loading: boolean;
  error: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onGenerate: () => void;
};

export const Generate = ({
  title, content, loading, error,
  onTitleChange, onContentChange, onGenerate,
}: GenerateProps) => {
  // 50 тэмдэгтээс богино текстээс сайн хураангуй гарахгүй
  const canSubmit =
    title.trim().length > 0 && content.trim().length > 50;

  return (
    <div className="w-full max-w-2xl rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Өгүүлэл оруулах</h2>

      <input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Гарчиг"
        className="mb-3 w-full rounded-md border px-3 py-2 text-sm"
      />

      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Өгүүллийн текстээ энд хуулж тавина уу"
        rows={10}
        className="mb-3 w-full resize-none rounded-md border px-3 py-2 text-sm"
      />

      {error && (
        <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="button"
        disabled={!canSubmit || loading}
        onClick={onGenerate}
        className="w-full rounded-md bg-zinc-900 py-2.5 text-sm text-white disabled:opacity-40"
      >
        {loading ? "Хураангуйлж байна..." : "Хураангуйлах"}
      </button>
    </div>
  );
};`, },
  { type: "p", text: "**`<form>` ашиглаагүй шалтгаан:** энгийн `onClick` хангалттай. `<form>` ашиглавал `onSubmit`, `preventDefault` нэмэх шаардлагатай болно." },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "State machine view", code: `function App() {
  const [view, setView] = useState("form");
  const [text, setText] = useState("");

  const box = {padding:16,border:"1px solid #ddd",borderRadius:8};

  if (view === "summary") {
    return (
      <div style={box}>
        <b>Хураангуй</b>
        <p style={{fontSize:14}}>{text.slice(0, 60)}...</p>
        <button onClick={() => setView("content")}>Эх текст</button>
        <button onClick={() => setView("form")}>Буцах</button>
      </div>
    );
  }

  if (view === "content") {
    return (
      <div style={box}>
        <b>Эх текст</b>
        <p style={{fontSize:14}}>{text}</p>
        <button onClick={() => setView("summary")}>Буцах</button>
      </div>
    );
  }

  return (
    <div style={box}>
      <b>Форм</b>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="50+ тэмдэгт бич"
        rows={4}
        style={{width:"100%",marginTop:8,padding:6}}
      />
      <button
        disabled={text.trim().length <= 50}
        onClick={() => setView("summary")}
      >
        Хураангуйлах
      </button>
      <p style={{fontSize:12,color:"#888"}}>
        {text.trim().length} / 50 тэмдэгт
      </p>
    </div>
  );
}`, },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын хязгаарыг 50 → 100 болго.",
    "Дунд: `Article.tsx` бичиж 3 view-г state-ээр удирд.",
    "Дунд: `canSubmit` логик нэмж товчийг идэвхгүй болго.",
    "Хүнд: `Generate`, `Summary`, `Content` гурвыг тусад нь салгаж prop дамжуул.",
    "Хүнд: State-ийг хүүхдэд тарааж үзээд ямар асуудал гарахыг ажигла.",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Олон component нэг өгөгдөл хуваалцвал?", options: ["Тус бүрт useState", "Эцэгт нь төвлөрүүлэх", "localStorage", "Global хувьсагч"], answer: 1 },
    { q: "Нэг хуудасны олон байдлыг юугаар удирдах вэ?", options: ["Route", "useState", "Cookie", "URL"], answer: 1 },
    { q: "Товчийг идэвхгүй болгох?", options: ["hidden", "disabled", "readonly", "opacity"], answer: 1 },
    { q: "Prop-оор дамжуулах чиглэл?", options: ["Эцэг → хүүхэд", "Хүүхэд → эцэг", "Хоёр тийш", "Хамаагүй"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Нэг хуудасны олон байдалд route биш `useState`.",
    "State-ийг хамгийн ойрын нийтлэг эцэгт төвлөрүүл (lifting state up).",
    "Хүүхэд component \"тэнэг\" байх — зөвхөн харуулж, callback дуудна.",
    "`canSubmit`-ээр урьдчилан хамгаал.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**AI хураангуй** — Gemini Interactions API." },
];

// ===== m10l5 — AI хураангуй =====
export const m10l5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Gemini-гээр текст хураангуйлж, үр дүнтэй prompt бичиж, алдаа боловсруулалтыг зөв хийнэ." },

  { type: "h", text: "API route" },
  { type: "code", lang: "ts", code: `// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { syncUser } from "@/lib/sync-user";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const user = await syncUser();
    if (!user?.id) {
      return NextResponse.json({ message: "Нэвтрээгүй байна" }, { status: 401 });
    }

    const { title, content } = await req.json();

    if (!content || content.trim().length < 50) {
      return NextResponse.json(
        { message: "Текст хэт богино байна" },
        { status: 400 },
      );
    }

    const interaction = await client.interactions.create({
      model: "gemini-3.6-flash",
      input: \`Доорх өгүүллийг 3-5 өгүүлбэрээр хураангуйл.

Шаардлага:
- Монгол хэл дээр бичих
- Гол санааг агуулах, дэлгэрэнгүй жишээ оруулахгүй
- Өгүүлэлд байхгүй мэдээлэл нэмэхгүй

Гарчиг: \${title}

Өгүүлэл:
\${content}\`,
    });

    if (!interaction.output_text) {
      return NextResponse.json(
        { message: "AI хоосон хариу буцаалаа" },
        { status: 502 },
      );
    }

    return NextResponse.json({ summary: interaction.output_text });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json({ message: "Алдаа гарлаа" }, { status: 500 });
  }
};`, },

  { type: "h", text: "Prompt бичих зарчим" },
  { type: "ol", items: [
    "**Даалгавар** — юу хийхийг нэг өгүүлбэрээр",
    "**Шаардлага** — хязгаарлалт жагсаалтаар",
    "**Өгөгдөл** — эцэст нь, тодорхой тэмдэглэгээтэй",
  ] },
  { type: "compare", title: "Өгөгдөл ба зааврын дараалал", bad: {
    label: "Буруу — өгөгдөл эхэнд",
    code: `input: \`\${content}

Дээрх өгүүллийг хураангуйл.
Монголоор бич.\`

// 5000 үгийн дараа заавар байна.
// Модел эхний хэсэгт анхаарлаа
// төвлөрүүлээд зааврыг мартаж болно.`,
  }, good: {
    label: "Зөв — заавар эхэнд, өгөгдөл эцэст",
    code: `input: \`Доорх өгүүллийг хураангуйл.

Шаардлага:
- Монгол хэлээр
- 3-5 өгүүлбэр
- Шинэ мэдээлэл нэмэхгүй

Өгүүлэл:
\${content}\`

// Заавар тодорхой, өгөгдөл
// тэмдэглэгээтэй.`,
  }, note: "Урт текстийн дараа заавар бичвэл модел мартах магадлалтай. Заавар → шаардлага → өгөгдөл гэсэн дараалал барь." },

  { type: "h", text: "Client талд дуудах" },
  { type: "code", lang: "tsx", code: `// Article.tsx дотор
const generateSummary = async () => {
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  try {
    setLoading(true);
    setError("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmedTitle, content: trimmedContent }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Хураангуй үүсгэхэд алдаа гарлаа");
    }

    setSummary(data.summary);
    // хадгалах хэсэг — 6-р хичээлд
    setView("summary");
  } catch (error) {
    setError(error instanceof Error ? error.message : "Алдаа гарлаа");
  } finally {
    setLoading(false);
  }
};`, },
  { type: "compare", title: "loading-ыг унтраах байрлал", bad: {
    label: "Буруу — try дотор",
    code: `try {
  const res = await fetch(...);
  const data = await res.json();
  setSummary(data.summary);
  setLoading(false);   // ← энд
} catch (e) {
  setError("Алдаа");
}

// Алдаа гарвал setLoading(false)
// хүртэл хүрэхгүй.
// Spinner үүрд эргэлдэнэ.`,
  }, good: {
    label: "Зөв — finally дотор",
    code: `try {
  const res = await fetch(...);
  const data = await res.json();
  setSummary(data.summary);
} catch (e) {
  setError("Алдаа");
} finally {
  setLoading(false);   // ← ЗААВАЛ ажиллана
}

// Амжилттай ч, алдаатай ч
// spinner унтарна.`,
  } },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `/api/generate` route бичиж Postman-аар турш.",
    "Дунд: Prompt-ын дарааллыг сольж үр дүнг харьцуул.",
    "Дунд: `finally` блокоор loading-ыг зөв удирд.",
    "Хүнд: 50 тэмдэгтээс богино текст явуулж 400 буцахыг батал.",
    "Хүнд: `output_text` хоосон ирэх тохиолдлыг зохицуул.",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Prompt-д өгөгдлийг хаана тавих вэ?", options: ["Эхэнд", "Эцэст", "Дунд", "Хамаагүй"], answer: 1 },
    { q: "loading-ыг хаана унтраах вэ?", options: ["try дотор", "catch дотор", "finally дотор", "гадна"], answer: 2 },
    { q: "AI хоосон буцаавал ямар status?", options: ["200", "400", "502", "404"], answer: 2 },
    { q: "Нэвтрээгүй бол?", options: ["401", "403", "404", "500"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Prompt = даалгавар → шаардлага → өгөгдөл (эцэст нь).",
    "`finally`-д `setLoading(false)` — эс бөгөөс spinner үүрд эргэлдэнэ.",
    "AI хоосон буцаах тохиолдлыг зохицуул (502).",
    "Route бүрт `syncUser()` шалгалт.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Хадгалах ба түүх** — `RETURNING id`-ийн ач холбогдол." },
];

// ===== m10l6 — Хадгалах ба түүх =====
export const m10l6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Өгүүллийг DB-д хадгалж, шинээр үүссэн id-г буцааж авч, эзэмшигчийн эрхийг шалгана." },

  { type: "h", text: "Articles route" },
  { type: "code", lang: "ts", code: `// src/app/api/articles/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { syncUser } from "@/lib/sync-user";

export const POST = async (req: Request) => {
  const user = await syncUser();
  if (!user?.id) {
    return NextResponse.json({ message: "Нэвтрээгүй байна" }, { status: 401 });
  }

  const { title, content, summary } = await req.json();

  const { rows } = await pool.query(
    \`INSERT INTO articles (user_id, title, content, summary)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, summary\`,
    [user.id, title, content, summary],
  );

  return NextResponse.json(rows[0], { status: 201 });
};`, },

  { type: "h", text: "⚠ Алдаа №6 — RETURNING id мартах" },
  { type: "p", text: "Энэ бол **хамгийн их цаг идсэн алдаа**." },
  { type: "compare", title: "INSERT хийсний дараа", bad: {
    label: "Буруу — id-г мэдэхгүй",
    code: `await pool.query(
  \`INSERT INTO articles (...)
   VALUES (...)\`,
  [...],
);
return NextResponse.json({
  message: "Амжилттай"
});

// Client талд:
const saved = await res.json();
setArticleId(saved.id);   // undefined!

// Дараа нь:
router.push(\`/quiz/\${articleId}\`);
// → /quiz/undefined`,
  }, good: {
    label: "Зөв — RETURNING id",
    code: `const { rows } = await pool.query(
  \`INSERT INTO articles (...)
   VALUES (...)
   RETURNING id, title, summary\`,
  [...],
);
return NextResponse.json(rows[0], {
  status: 201,
});

// Client талд:
const saved = await res.json();
if (!saved.id) {
  throw new Error("Article ID ирсэнгүй");
}
setArticleId(String(saved.id));`,
  }, note: "`INSERT` хийсний дараа `RETURNING id` заавал бич, client талд нь хадгал. Байхгүй бол шинээр үүссэн мөрийн id-г хэзээ ч мэдэхгүй." },

  { type: "h", text: "⚠ Алдаа №7 — Хэрэглэгчийн эрх шалгахгүй" },
  { type: "compare", title: "DELETE route", bad: {
    label: "Аюултай — хэн ч устгана",
    code: `const { id } = await req.json();

await pool.query(
  \`DELETE FROM articles
   WHERE id = $1\`,
  [id],
);

// Зөвхөн id таавал хангалттай.
// Бусдын өгүүллийг устгаж чадна.
// (IDOR эмзэг байдал)`,
  }, good: {
    label: "Зөв — эзэмшигч шалгасан",
    code: `const { id } = await req.json();

const { rowCount } = await pool.query(
  \`DELETE FROM articles
   WHERE id = $1 AND user_id = $2\`,
  [id, user.id],
);

if (rowCount === 0) {
  return NextResponse.json(
    { message: "Олдсонгүй" },
    { status: 404 },
  );
}`,
  }, note: "Өөрчлөх, устгах бүх query-д эзэмшигчийг **query дотор** шалга — дараа нь шалгах биш. 404 буцаах нь 403-аас аюулгүй (тухайн id байгаа эсэхийг ч мэдэгдэхгүй)." },

  { type: "h", text: "Нүүр хуудас — server component" },
  { type: "code", lang: "tsx", code: `// src/app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { pool } from "@/lib/db";
import { syncUser } from "@/lib/sync-user";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { Article } from "@/components/Article";

export default async function Home() {
  await auth.protect();

  const user = await syncUser();

  const { rows: history } = await pool.query(
    \`SELECT id, title, summary FROM articles
     WHERE user_id = $1
     ORDER BY created_at DESC\`,
    [user?.id],
  );

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <SidebarProvider>
        <AppSidebar
          history={history.map((row) => ({
            id: String(row.id),          // SERIAL → тоо, TS талд string
            title: row.title,
            summary: row.summary ?? "",
          }))}
        />
        <SidebarInset>
          <main className="flex min-h-[calc(100svh-56px)] items-start justify-center px-6 py-10">
            <Article />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}`, },
  { type: "callout", variant: "tip", title: "Энэ бол server component", text: "`async` бичиж DB-д шууд хандаж байна. `useState` ашиглах боломжгүй — тэр нь client component-ийн шинж. Өгөгдөл татахад API route ч хэрэггүй." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `RETURNING id` нэмж client талд `console.log` хий.",
    "Дунд: `DELETE` route-д `AND user_id = $2` нэм.",
    "Дунд: Нүүр хуудсыг server component болгож түүхийг татаж үзүүл.",
    "Хүнд: `RETURNING`-гүйгээр бичээд `/quiz/undefined` гарахыг батал.",
    "Хүнд: Өөр хэрэглэгчийн id-гаар DELETE явуулж 404 гарахыг шалга.",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Шинээр үүссэн мөрийн id авах?", options: ["RETURNING id", "LAST_INSERT_ID()", "SELECT MAX(id)", "автоматаар"], answer: 0 },
    { q: "DELETE-д эзэмшигчийг хаана шалгах вэ?", options: ["Query дотор (AND user_id)", "Дараа нь if-ээр", "Frontend-д", "Шалгахгүй"], answer: 0 },
    { q: "Server component-д юу ашиглаж болохгүй вэ?", options: ["async/await", "useState", "DB query", "import"], answer: 1 },
    { q: "Шинэ нөөц үүсгэсэн status?", options: ["200", "201", "204", "302"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`INSERT ... RETURNING id` — заавал. Байхгүй бол `/quiz/undefined`.",
    "`UPDATE`/`DELETE` бүрд `AND user_id = $N`.",
    "Server component-д DB-д шууд ханд — API route хэрэггүй.",
    "`SERIAL` нь тоо буцаана — `String()`-ээр хөрвүүл.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Хажуугийн самбар** — Dialog-ийн нийтлэг алдаа." },
];

// ===== m10l7 — Хажуугийн самбар =====
export const m10l7: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Түүхийн жагсаалт хийж, Dialog-ийг зөв удирдаж, Tailwind-ийн `group`, prop дамжуулалтын алдаанаас сэргийлнэ." },

  { type: "h", text: "⚠ Алдаа №8 — Dialog-ийг .map() дотор буруу байрлуулах" },
  { type: "p", text: "Энэ бол React-ийн хамгийн нийтлэг бүтцийн алдаа. Дарсан item аль болохыг хаана ч хадгалаагүй." },
  { type: "compare", title: "Жагсаалт + modal", bad: {
    label: "Буруу — бүх гарчиг зэрэг гарна",
    code: `<Dialog>
  <SidebarContent>
    {history.map((item) => (
      <DialogTrigger key={item.id}>
        {item.title}
      </DialogTrigger>
    ))}
  </SidebarContent>

  <DialogContent>
    <DialogHeader>
      {history.map((item) => (
        <DialogTitle key={item.id}>
          {item.title}
        </DialogTitle>
      ))}
    </DialogHeader>
  </DialogContent>
</Dialog>

// Ямар ч item дарсан
// БҮХ гарчиг зэрэг гарна.`,
  }, good: {
    label: "Зөв — controlled + state",
    code: `const [selected, setSelected] =
  useState<Item | null>(null);

<SidebarContent>
  {history.map((item) => (
    <button
      key={item.id}
      onClick={() => setSelected(item)}
    >
      {item.title}
    </button>
  ))}
</SidebarContent>

{/* Dialog нь .map()-аас ГАДНА */}
<Dialog
  open={selected !== null}
  onOpenChange={(o) => !o && setSelected(null)}
>
  <DialogContent>
    <DialogTitle>{selected?.title}</DialogTitle>
    <p>{selected?.summary}</p>
  </DialogContent>
</Dialog>`,
  }, note: "**Ерөнхий зарчим:** Modal, Dropdown, Popover зэрэг нь жагсаалтын ГАДНА нэг л удаа байрлаж, аль элемент идэвхтэйг state-ээр удирдана." },

  { type: "h", text: "⚠ Алдаа №9 — group класс мартах" },
  { type: "compare", bad: {
    label: "Буруу — товч хэзээ ч гарахгүй",
    code: `<div className="flex items-center">
  <button>{item.title}</button>
  <button className="opacity-0
                     group-hover:opacity-100">
    <Trash2 />
  </button>
</div>

// Эцэг элемент дээр "group"
// байхгүй тул group-hover
// хэзээ ч ажиллахгүй.`,
  }, good: {
    label: "Зөв — эцэгт group",
    code: `<div className="group flex items-center">
  <button>{item.title}</button>
  <button className="opacity-0
                     group-hover:opacity-100">
    <Trash2 />
  </button>
</div>

// Одоо эцэг дээр хулгана
// очиход товч гарч ирнэ.`,
  }, note: "`group-hover:`, `group-focus:` зэрэг нь эцэг элемент дээр `group` класс шаарддаг." },

  { type: "h", text: "⚠ Алдаа №10 — Prop дамжуулаагүйгээс \"юу ч гарахгүй\"" },
  { type: "compare", bad: {
    label: "Буруу — тусдаа prop, дамжуулаагүй",
    code: `type AppSidebarProps = {
  history: Item[];
  summary: string;   // ← гаднаас
};

// page.tsx дээр:
<AppSidebar history={history} />
//          ↑ summary дамжуулаагүй

// Үр дүн: <p>{summary}</p> нь
// ЮУ Ч харуулахгүй.
// Алдаа шидэхгүй, зүгээр хоосон.`,
  }, good: {
    label: "Зөв — item дотор оруулсан",
    code: `export type ArticleHistoryItem = {
  id: string;
  title: string;
  summary: string;   // ← item дотор
};

type AppSidebarProps = {
  history: ArticleHistoryItem[];
};

// page.tsx дээр:
<AppSidebar
  history={history.map((r) => ({
    id: String(r.id),
    title: r.title,
    summary: r.summary ?? "",
  }))}
/>`,
  }, note: "React нь `undefined`, `null`, `false`-г **дуугүй** render хийдэг — тиймээс алдаа шидэхгүй." },
  { type: "code", lang: "text", code: `TypeScript үүнийг УРЬДЧИЛАН анхааруулж байсан:

Property 'summary' is missing in type '{ history: ... }'
but required in type 'AppSidebarProps'. ts(2741)`, },
  { type: "callout", variant: "error", title: "Хамгийн чухал сургамж", text: "\"Юу ч гарахгүй байна\" гэдэг нь ихэвчлэн **өгөгдөл байхгүй** гэсэн үг, \"код буруу\" биш. TypeScript-ийн алдааг үл тоомсорлож болохгүй — тэдгээр нь яг ийм асуудлыг эрт мэдэгддэг." },

  { type: "h", text: "Бүтэн Sidebar" },
  { type: "code", lang: "tsx", code: `// src/components/Sidebar.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export type ArticleHistoryItem = {
  id: string;
  title: string;
  summary: string;
};

export const AppSidebar = ({
  history,
  activeId,
}: {
  history: ArticleHistoryItem[];
  activeId?: string;
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<ArticleHistoryItem | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const response = await fetch("/api/articles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeletingId(null);

    if (response.ok) {
      if (selected?.id === id) setSelected(null);
      router.refresh();          // server component-ийг дахин татна
    }
  };

  return (
    <Sidebar collapsible="offcanvas" className="top-14 h-[calc(100svh-56px)] border-r">
      <SidebarHeader className="px-4 pb-2 pt-4">
        <h2 className="text-xl font-semibold">History</h2>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        {history.length === 0 ? (
          <p className="px-3 py-2 text-sm text-zinc-400">
            Хадгалсан түүх байхгүй байна
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {history.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm",
                  item.id === activeId
                    ? "bg-zinc-100 font-medium"
                    : "text-zinc-700 hover:bg-zinc-100",
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="flex-1 truncate text-left"
                >
                  {item.title}
                </button>
                <button
                  type="button"
                  disabled={deletingId === item.id}
                  onClick={() => handleDelete(item.id)}
                  className="shrink-0 rounded p-1 text-zinc-400 opacity-0 hover:text-red-600 group-hover:opacity-100 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </SidebarContent>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
          </DialogHeader>
          <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
            <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-700">
              {selected?.summary || "Хураангуй байхгүй байна"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
};`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Controlled Dialog загвар", code: `function App() {
  const items = [
    { id: 1, title: "React hooks", summary: "useState, useEffect тухай..." },
    { id: 2, title: "Postgres JOIN", summary: "INNER, LEFT JOIN ялгаа..." },
    { id: 3, title: "Tailwind grid", summary: "Responsive багана..." },
  ];
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="row"
          style={{display:"flex",justifyContent:"space-between",
                  padding:8,borderBottom:"1px solid #eee"}}>
          <button onClick={() => setSelected(item)}
                  style={{border:"none",background:"none",cursor:"pointer"}}>
            {item.title}
          </button>
        </div>
      ))}

      {/* Modal нь .map()-аас ГАДНА, нэг л удаа */}
      {selected && (
        <div style={{
          position:"fixed",inset:0,background:"rgba(0,0,0,.5)",
          display:"flex",alignItems:"center",justifyContent:"center"
        }} onClick={() => setSelected(null)}>
          <div style={{background:"white",padding:20,borderRadius:8,maxWidth:320}}
               onClick={(e) => e.stopPropagation()}>
            <b>{selected.title}</b>
            <p style={{fontSize:14,marginTop:8}}>{selected.summary}</p>
            <button onClick={() => setSelected(null)}>Хаах</button>
          </div>
        </div>
      )}
      <p style={{fontSize:12,color:"#888",marginTop:8}}>
        Нэг л modal байгаа ч, дарсан item-ийн агуулга гарна
      </p>
    </div>
  );
}`, },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын modal-д 4 дэх item нэм.",
    "Дунд: `group` классыг хасаад устгах товч алга болохыг батал.",
    "Дунд: `router.refresh()`-ыг устгаад устгасны дараа жагсаалт шинэчлэгдэхгүйг ажигла.",
    "Хүнд: Dialog-ийг `.map()` дотор тавьж бүх гарчиг зэрэг гарахыг харуул.",
    "Хүнд: Prop дамжуулахгүй орхиод TypeScript-ийн ts2741 алдааг унш.",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Modal-ыг хаана байрлуулах вэ?", options: [".map() дотор", ".map()-аас гадна", "Хамаагүй", "Тусдаа route"], answer: 1 },
    { q: "`group-hover:` ажиллахад юу хэрэгтэй вэ?", options: ["Эцэгт `group` класс", "hover:", "peer", "юу ч үгүй"], answer: 0 },
    { q: "React `undefined`-ыг яаж render хийдэг вэ?", options: ["Алдаа шидэнэ", "Дуугүй, юу ч гаргахгүй", '"undefined" бичнэ', "null гэж"], answer: 1 },
    { q: "Server component-ийн өгөгдлийг шинэчлэх?", options: ["router.refresh()", "router.push()", "useState", "reload()"], answer: 0 },
    { q: "ts2741 юу гэсэн үг вэ?", options: ["Prop дутуу", "Төрөл буруу", "Import алга", "Syntax"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Modal/Dropdown нь жагсаалтын ГАДНА, идэвхтэйг state-ээр удирд.",
    "`group-hover:` эцэг элемент дээр `group` шаардана.",
    "\"Юу ч гарахгүй\" = өгөгдөл байхгүй. React `undefined`-ыг дуугүй өнгөрөөнө.",
    "TypeScript-ийн алдааг үл тоомсорлож болохгүй.",
    "`router.refresh()` — server component-ийн өгөгдлийг дахин татна.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Тест үүсгэх** — structured output, Zod шалгалт, cache." },
];

// ===== m10l8 — Тест үүсгэх =====
export const m10l8: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "AI-аар бүтэцтэй өгөгдөл гаргаж, Zod-оор шалгаж, cache-ээр давхардсан дуудлагаас сэргийлнэ. Энэ бол хамгийн техникийн хэсэг." },

  { type: "h", text: "Асуудлын мөн чанар" },
  { type: "code", lang: "js", code: `// Ирэх зүйл (string):
'{"questions": [{"question": "...", "options": [...]}]}'

// Хэрэгтэй зүйл (object):
{ questions: [ { question: "...", options: [...] } ] }`, },
  { type: "p", text: "String дээр `.map()` ажиллуулах гэвэл болохгүй. Тиймээс хоёр алхам: **structured output** (Gemini-д яг ийм форматаар хариул гэж хэлэх) + **Zod parse** (ирсэн зүйл үнэхээр тэр форматтай эсэхийг шалгах)." },

  { type: "h", text: "JSON Schema" },
  { type: "code", lang: "ts", code: `const quizJsonSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "Асуулт, монгол хэл дээр" },
          options: {
            type: "array",
            minItems: 4,
            maxItems: 4,
            items: { type: "string" },
          },
          correctAnswer: {
            type: "integer",
            minimum: 0,
            maximum: 3,
            description: "options массив дахь зөв хариултын индекс",
          },
          explanation: {
            type: "string",
            description: "Яагаад тэр хариулт зөв болох тайлбар",
          },
        },
        required: ["question", "options", "correctAnswer", "explanation"],
      },
    },
  },
  required: ["questions"],
} as const;`, },
  { type: "ul", items: [
    "**`minItems`/`maxItems`** — яг 5 асуулт, яг 4 сонголт. Байхгүй бол 3 эсвэл 7 буцааж болно.",
    "**`minimum`/`maximum`** — `correctAnswer` нь 0–3. Байхгүй бол 7 буцаавал `options[7]` нь `undefined` болж UI унана.",
    "**`description`** — модельд туслах заавар. Тодорхой бичих тусам чанар сайжирна.",
  ] },

  { type: "h", text: "⚠ Алдаа №11 — as const мартах" },
  { type: "compare", bad: {
    label: "Буруу — literal widening",
    code: `const quizJsonSchema = {
  type: "object",
  properties: { ... },
};

// TypeScript алдаа:
// Type 'string' is not assignable
// to type '"string" | "number" |
// "boolean" | "object" | ...
// ts(2345)

// TS нь type: "object" гэдгийг
// "дараа өөрчлөгдөж магадгүй" гэж
// үзээд string болгож ӨРГӨСГӨНӨ.`,
  }, good: {
    label: "Зөв — as const",
    code: `const quizJsonSchema = {
  type: "object",
  properties: { ... },
} as const;

// as const нь бүх утгыг ЦАРЦААНА.
// "object" нь "object" хэвээр
// үлдэнэ — өргөсөхгүй.

// z.fromJSONSchema нь яг литерал
// утга шаарддаг тул одоо ажиллана.`,
  }, note: "Үүнийг **literal type widening** гэдэг. TypeScript-ийн анхдагч зан үйл — `as const` нь түүнийг зогсооно." },

  { type: "h", text: "Zod-оор шалгах" },
  { type: "code", lang: "ts", code: `import * as z from "zod";

const quizSchema = z.fromJSONSchema(quizJsonSchema);

// Хэрэглэх
const quiz = quizSchema.parse(JSON.parse(interaction.output_text));`, },
  { type: "callout", variant: "warn", title: "Яагаад Zod хэрэгтэй вэ?", text: "Structured output нь баталгаа БИШ. Gemini заримдаа schema зөрчиж болно. `parse` нь зөрчилтэй өгөгдлийг шууд алдаа болгож шиднэ — DB-д хог орохоос сэргийлнэ." },
  { type: "code", lang: "ts", code: `// z.fromJSONSchema асуудал үүсгэвэл гараар бичих нь бүр найдвартай
const quizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()).length(4),
      correctAnswer: z.number().int().min(0).max(3),
      explanation: z.string(),
    }),
  ).length(5),
});`, },

  { type: "h", text: "⚠ Алдаа №12 — Prompt дотор schema-г давхардуулах" },
  { type: "compare", bad: {
    label: "Буруу — хоёр өөр заавар",
    code: `input: \`Generate 5 questions.
Return this exact JSON format:
[
  {
    "question": "...",
    "options": [...],
    "answer": "0"
  }
]\`,
response_format: { schema: quizJsonSchema }

// Prompt: top-level массив
// Schema: { questions: [...] }
// Prompt: "answer"
// Schema: "correctAnswer"
// Prompt: "0" (string)
// Schema: 0 (integer)
//
// Модел төөрнө → чанар унана.`,
  }, good: {
    label: "Зөв — schema формат, prompt агуулга",
    code: `input: \`Доорх өгүүлэл дээр үндэслэн
5 сонголттой асуулт бэлтгэ.

Шаардлага:
- Бүгд монгол хэл дээр
- Өгүүлэлд байхгүй мэдээллээр
  асуулт зохиохгүй
- Буруу сонголтууд боломжит
  хариулт шиг байх
- Өөр өөр хэсгийг хамрах

Өгүүлэл:
\${content}\`,
response_format: { schema: quizJsonSchema }

// Prompt-д формат ОГТ бичээгүй.`,
  }, note: "**Дүрэм:** schema нь форматыг хүчилнэ, prompt нь **агуулгыг** заана. Хоёрыг хольж болохгүй — Google-ийн баримт бичигт ч ингэж бичсэн." },

  { type: "h", text: "⚠ Алдаа №13 — Cache хийхгүй байх" },
  { type: "compare", bad: {
    label: "Буруу — дуудах бүрд шинээр",
    code: `// Шууд Gemini рүү
const interaction =
  await client.interactions.create({...});

const inserted = await pool.query(
  \`INSERT INTO quiz (...)
   VALUES (...)\`,
  [...],
);

// Тестийн хуудсыг дахин нээх бүрд:
// • 11 секунд хүлээнэ
// • Gemini-ийн төлбөр гарна
// • АСУУЛТУУД ӨӨР БОЛНО
//   → өмнөх оноо утгагүй`,
  }, good: {
    label: "Зөв — эхлээд cache шалгах",
    code: `const cached = await pool.query(
  \`SELECT id, questions FROM quiz
   WHERE article_id = $1
     AND user_id = $2
     AND questions IS NOT NULL\`,
  [articleId, user.id],
);

if (cached.rows.length > 0) {
  return NextResponse.json({
    quizId: String(cached.rows[0].id),
    quiz: { questions: cached.rows[0].questions },
  });
}

// Байхгүй бол л Gemini дуудна
// Хадгалахдаа:
//   ON CONFLICT (article_id, user_id)
//   DO UPDATE SET questions = EXCLUDED.questions`,
  }, note: "`ON CONFLICT` нь 2-р хичээлд үүсгэсэн `UNIQUE (article_id, user_id)` байгаа тохиолдолд л ажиллана." },

  { type: "h", text: "⚠ Алдаа №14 — Frontend/backend талбар зөрөх" },
  { type: "compare", bad: {
    label: "Буруу — талбарын нэр таарахгүй",
    code: `// Client
body: JSON.stringify({
  content,
  articleId,
})

// Route
const { title, content, summary } =
  await req.json();

// articleId хэзээ ч хүрэхгүй
// → DB-д хадгалахдаа аль өгүүллийнх
//   болохыг мэдэхгүй
// → undefined`,
  }, good: {
    label: "Зөв — хоёр талыг зэрэг харах",
    code: `// Client
body: JSON.stringify({
  content,
  articleId,
})

// Route
const { content, articleId } =
  await req.json();

if (!content || !articleId) {
  return NextResponse.json(
    { error: "content болон articleId шаардлагатай" },
    { status: 400 },
  );
}`,
  }, note: "**Дүрэм:** API бичихдээ client талтайгаа зэрэг харж бич. Нэг талыг өөрчлөхөд нөгөөг нь шалга. Шалгалт нэмвэл алдаа эрт илэрнэ." },

  { type: "h", text: "Бүрэн route" },
  { type: "code", lang: "ts", code: `// src/app/api/quiz/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import { pool } from "@/lib/db";
import { syncUser } from "@/lib/sync-user";

const quizJsonSchema = { /* дээрх schema */ } as const;
const quizSchema = z.fromJSONSchema(quizJsonSchema);

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: Request) => {
  try {
    const user = await syncUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Нэвтрээгүй байна" }, { status: 401 });
    }

    const { content, articleId } = await req.json();
    if (!content || !articleId) {
      return NextResponse.json(
        { error: "content болон articleId шаардлагатай" },
        { status: 400 },
      );
    }

    // 1. Cache
    const cached = await pool.query(
      \`SELECT id, questions FROM quiz
       WHERE article_id = $1 AND user_id = $2 AND questions IS NOT NULL\`,
      [articleId, user.id],
    );
    if (cached.rows.length > 0) {
      return NextResponse.json({
        message: "Cached quiz",
        quizId: String(cached.rows[0].id),
        quiz: { questions: cached.rows[0].questions },
      });
    }

    // 2. Gemini
    const interaction = await client.interactions.create({
      model: "gemini-3.6-flash",
      input: \`Доорх өгүүлэл дээр үндэслэн 5 сонголттой асуулт бэлтгэ.

Шаардлага:
- Асуулт, сонголт, тайлбар бүгд монгол хэл дээр байх
- Өгүүлэлд байхгүй мэдээллээр асуулт зохиохгүй
- Буруу сонголтууд боломжит хариулт шиг байх, илт утгагүй биш
- Асуултууд өгүүллийн өөр өөр хэсгийг хамрах

Өгүүлэл:
\${content}\`,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: quizJsonSchema,
      },
    });

    if (!interaction.output_text) {
      return NextResponse.json({ error: "Gemini хоосон хариу буцаалаа" }, { status: 502 });
    }

    // 3. Шалгах
    const quiz = quizSchema.parse(JSON.parse(interaction.output_text));

    // 4. Хадгалах
    const inserted = await pool.query(
      \`INSERT INTO quiz (article_id, user_id, questions, attempt_count)
       VALUES ($1, $2, $3, 0)
       ON CONFLICT (article_id, user_id)
       DO UPDATE SET questions = EXCLUDED.questions
       RETURNING id\`,
      [articleId, user.id, JSON.stringify(quiz.questions)],
    );

    return NextResponse.json({
      message: "Successfully generated quiz",
      quizId: String(inserted.rows[0].id),
      quiz,
    });
  } catch (error) {
    console.error("Quiz generate error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "AI буруу форматаар хариулав. Дахин оролдоно уу." },
        { status: 502 },
      );
    }

    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
};`, },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: JSON schema бичиж `as const` нэм.",
    "Дунд: Zod схемийг гараар бичиж `parse` хий.",
    "Дунд: Cache шалгалт нэмж хоёр дахь дуудалт хурдан болохыг хэмж.",
    "Хүнд: `as const` хасаад ts2345 алдааг унш.",
    "Хүнд: Prompt-д формат бичээд чанар унахыг харьцуул.",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Literal widening-ыг юугаар зогсоох вэ?", options: ["as const", "readonly", "const", "as string"], answer: 0 },
    { q: "AI-ийн хариуг яагаад Zod-оор шалгах вэ?", options: ["Structured output баталгаа биш", "Хурдан болно", "Заавал биш", "TypeScript шаардана"], answer: 0 },
    { q: "Prompt-д schema-г давхардуулбал?", options: ["Чанар сайжирна", "Модел төөрч чанар унана", "Ялгаагүй", "Хурдан болно"], answer: 1 },
    { q: "Cache байхгүй бол хамгийн муу үр дагавар?", options: ["Удаан", "Асуултууд өөр болж оноо утгагүй болно", "Төлбөр", "Бүгд адилхан"], answer: 1 },
    { q: "`ON CONFLICT` ажиллахад юу хэрэгтэй вэ?", options: ["UNIQUE constraint", "INDEX", "PRIMARY KEY", "TRIGGER"], answer: 0 },
    { q: "Zod parse унавал ямар status?", options: ["400", "500", "502", "200"], answer: 2 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Structured output + Zod parse — хоёулаа хэрэгтэй.",
    "JSON schema-д `as const` заавал (literal widening).",
    "Schema форматыг, prompt агуулгыг заана — хольж болохгүй.",
    "Cache байхгүй бол асуултууд өөрчлөгдөж оноо утгагүй болно.",
    "Client болон route-ийн талбарын нэрийг зэрэг харж бич.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Тестийн хуудас** — дибаг хийх системтэй арга." },
];

// ===== m10l9 — Тестийн хуудас =====
export const m10l9: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Динамик route бичиж, эргэлзээтэй алдааг системтэйгээр хумиж олох аргад суралцана. Энэ бол модулийн хамгийн үнэ цэнтэй хэсэг." },

  { type: "h", text: "Route бүтэц" },
  { type: "p", text: "`src/app/quiz/[id]/page.tsx` — энд `[id]` нь **articleId** (quizId биш). Ингэснээр `/quiz/${\"$\"}{articleId}` гэж шууд үсэрч болно." },
  { type: "code", lang: "tsx", code: `import { notFound } from "next/navigation";
import { pool } from "@/lib/db";
import { syncUser } from "@/lib/sync-user";
import { Quiz } from "@/components/Quiz";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;      // Next.js 15+ — Promise
}) {
  const { id } = await params;          // await заавал

  const user = await syncUser();
  if (!user?.id) notFound();

  const { rows } = await pool.query(
    \`SELECT id, questions FROM quiz
     WHERE article_id = $1 AND user_id = $2\`,
    [id, user.id],
  );

  if (rows.length === 0) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Quiz quizId={String(rows[0].id)} questions={rows[0].questions} />
    </main>
  );
}`, },

  { type: "h", text: "Дибаг хийх арга — хоёртын хайлт" },
  { type: "p", text: "Энэ хуудсыг бичихэд ийм алдаа гарсан:" },
  { type: "code", lang: "text", code: `Uncaught Error: The default export is not a
React Component in "/quiz/[id]/page"`, },
  { type: "p", text: "Мессеж нь тодорхойгүй. Гэхдээ терминал дээр `✓ Compiled in 81ms` гэж байсан — өөрөөр хэлбэл **syntax алдаа биш**." },
  { type: "compare", title: "Алдаа гарахад юу хийх вэ?", bad: {
    label: "Буруу — таамаглах",
    code: `// "Магадгүй export буруу байна?"
export default function QuizPage() {}
export function QuizPage() {}
module.exports = QuizPage;

// "Магадгүй async асуудалтай?"
// "Магадгүй params буруу?"
// "Магадгүй Next.js-ийн bug?"

// 2 цаг өнгөрнө.
// Асуудал олдохгүй.`,
  }, good: {
    label: "Зөв — хумих (binary search)",
    code: `// Алхам 1: бүгдийг хая
export default function QuizPage() {
  return <div>Test</div>;
}
// "Test" гарвал → route зөв

// Алхам 2: import нэм (ашиглахгүй)
import { pool } from "@/lib/db";
export default function QuizPage() {
  return <div>Test</div>;
}
// Унавал → import-ын нэг нь буруу

// Алхам 3: async + params
// Алхам 4: DB query, зөвхөн тоо

// 5 минут. Асуудал олдоно.`,
  }, note: "Энэ алхмаар явахад жинхэнэ алдаа илэрсэн: `column q.questions does not exist` — **DB schema дутуу** байсан. Мессеж нь \"default export\" гэж хэлж байсан ч, бодит шалтгаан нь огт өөр." },
  { type: "callout", variant: "error", title: "Хамгийн чухал сургамж", text: "Алдааны мессеж үргэлж үнэн шалтгааныг хэлдэггүй. Server component дотор алдаа гарвал Next.js түүнийг render алдаа болгож дамжуулдаг тул мессеж гажина. Таамаглах биш — системтэйгээр хум." },

  { type: "h", text: "404 гарвал юу гэсэн үг вэ" },
  { type: "p", text: "Schema зассаны дараа хуудас ажилласан ч 404 гарсан. Энэ нь `rows.length === 0` — DB-д мөр олдоогүй." },
  { type: "ol", items: [
    "**Терминал** — `POST /api/quiz` мөр байна уу, статус нь юу вэ?",
    "**DB** — Neon SQL Editor дээр шууд query.",
    "**Түр `console.log`** — утгуудыг хэвлэ.",
  ] },
  { type: "code", lang: "sql", code: `SELECT id, article_id, user_id,
       questions IS NOT NULL AS has_questions
FROM quiz;

-- Мөр байхгүй        → INSERT ажиллаагүй
-- user_id нь NULL     → route тэр баганыг бичээгүй
-- article_id таарахгүй → өөр өгүүлэлд үүссэн`, },
  { type: "code", lang: "tsx", code: `console.log("articleId:", id, "userId:", user.id, "rows:", rows.length);`, },

  { type: "h", text: "finalScore-ыг дахин тооцоолсон шалтгаан" },
  { type: "compare", title: "setState-ийн дараа шууд утгыг ашиглах", bad: {
    label: "Буруу — хуучин утга",
    code: `const handleSelect = async (idx) => {
  const next = [...answers, idx];
  setAnswers(next);

  // score нь ХУУЧИН answers-ээс
  // тооцоологдсон!
  await fetch("/api/quiz/attempt", {
    body: JSON.stringify({
      quizId,
      score,          // ← 1-ээр дутуу
    }),
  });
};`,
  }, good: {
    label: "Зөв — шинэ утгаас тооцоол",
    code: `const handleSelect = async (idx) => {
  const next = [...answers, idx];
  setAnswers(next);

  // next гэсэн ЛОКАЛ хувьсагчаас
  const finalScore = next.reduce(
    (acc, a, i) =>
      a === questions[i].correctAnswer
        ? acc + 1 : acc,
    0,
  );

  await fetch("/api/quiz/attempt", {
    body: JSON.stringify({
      quizId,
      score: finalScore,
    }),
  });
};`,
  }, note: "`setAnswers` нь **шууд** хэрэгжихгүй — React нь дараагийн render-д шинэчилнэ. Мөрийн доор `answers` нь ХУУЧИН утга агуулна. Энэ бол React-ийн хамгийн нийтлэг алдаануудын нэг." },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "setState шууд хэрэгждэггүй", code: `function App() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);

  const handleClick = () => {
    const next = count + 1;
    setCount(next);

    setLog((l) => [
      ...l,
      \`count = \${count} (хуучин) · next = \${next} (зөв)\`,
    ]);
  };

  return (
    <div>
      <p><b>count: {count}</b></p>
      <button onClick={handleClick}>Нэмэх</button>
      <div style={{marginTop:12,fontSize:13}}>
        {log.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <p style={{fontSize:12,color:"#888",marginTop:8}}>
        setCount-ийн ДАРАА count нь хуучин утга хэвээр
      </p>
    </div>
  );
}`, },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын кодоос setState-ийн зан үйлийг ажигла.",
    "Дунд: `[id]` динамик route үүсгэж `await params` хий.",
    "Дунд: Зориудаар алдаа үүсгээд хоёртын хайлтаар ол.",
    "Хүнд: 404 гарвал 3 алхмын дарааллаар шалгаж шалтгааныг ол.",
    "Хүнд: `score` ба `finalScore` хоёрыг сольж 1-ээр дутуу оноо гарахыг батал.",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Next.js 15+-д `params` нь?", options: ["Объект", "Promise", "Массив", "String"], answer: 1 },
    { q: "Тодорхойгүй алдаанд юу хийх вэ?", options: ["Таамаглах", "Хоёртын хайлтаар хумих", "Дахин бичих", "Google хайх"], answer: 1 },
    { q: "`✓ Compiled` байвал?", options: ["Syntax алдаа", "Ажиллах үеийн алдаа", "Ялгаагүй", "Build алдаа"], answer: 1 },
    { q: "404 гарвал юу гэсэн үг вэ?", options: ["Route буруу", "Query мөр олоогүй", "Auth", "DB унасан"], answer: 1 },
    { q: "`setState`-ийн дараа хувьсагч?", options: ["Шинэ утга", "Хуучин утга", "undefined", "null"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`params` нь Promise — `await params`.",
    "Алдааны мессеж үнэн шалтгааныг хэлдэггүй. Хоёртын хайлтаар хум.",
    "`✓ Compiled` = syntax зөв, ажиллах үеийн алдаа.",
    "404 = мөр олдоогүй → терминал → DB → console.log дарааллаар шалга.",
    "`setState`-ийн дараа локал `next` хувьсагчаа ашигла.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Оноо ба дуусгал** — production-д бэлтгэнэ." },
];

// ===== m10l10 — Оноо ба дуусгал =====
export const m10l10: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Оноог хадгалж, timeout, loading зэрэг production-ийн бэлтгэлийг хийж, аюулгүй байдлын шалгах жагсаалтыг гүйцэтгэнэ." },

  { type: "h", text: "Attempt route" },
  { type: "code", lang: "ts", code: `// src/app/api/quiz/attempt/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { syncUser } from "@/lib/sync-user";

export const POST = async (req: Request) => {
  const user = await syncUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Нэвтрээгүй байна" }, { status: 401 });
  }

  const { quizId, score } = await req.json();

  const { rows } = await pool.query(
    \`UPDATE quiz
     SET user_score = GREATEST(COALESCE(user_score, 0), $1),
         attempt_count = attempt_count + 1
     WHERE id = $2 AND user_id = $3
     RETURNING user_score, attempt_count\`,
    [score, quizId, user.id],
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "Quiz олдсонгүй" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
};`, },
  { type: "ul", items: [
    "**`COALESCE(user_score, 0)`** — хэрэв NULL бол 0.",
    "**`GREATEST(a, b)`** — хоёрын ихийг сонгоно. Хамгийн сайн оноог хадгална.",
    "Хамгийн сүүлийн оноог хадгалахыг хүсвэл зүгээр `SET user_score = $1`.",
  ] },
  { type: "compare", title: "Оноо шинэчлэх", bad: {
    label: "Буруу — эзэмшигч шалгаагүй",
    code: `UPDATE quiz
SET user_score = $1
WHERE id = $2;

// Хэн ч дурын quizId-д
// өөрийн оноо бичиж чадна.
// Мөн хамгийн сайн оноо
// муу оноогоор дарагдана.`,
  }, good: {
    label: "Зөв",
    code: `UPDATE quiz
SET user_score = GREATEST(
      COALESCE(user_score, 0), $1
    ),
    attempt_count = attempt_count + 1
WHERE id = $2 AND user_id = $3
RETURNING user_score, attempt_count;

// Эзэмшигч шалгасан.
// Хамгийн сайн оноо хадгалагдана.
// Оролдлогын тоо нэмэгдэнэ.`,
  } },

  { type: "h", text: "Timeout" },
  { type: "p", text: "Gemini дуудалт 11 секунд болсон. Vercel Hobby дээр serverless функц **10 секундэд тасардаг**." },
  { type: "code", lang: "ts", code: `// route.ts-ийн дээд талд
export const maxDuration = 60;      // Pro plan шаардана`, },
  { type: "p", text: "Hobby дээр үлдэх бол: асуултын тоог 5 → 3 болгох, эсвэл `content`-ийн оронд `summary` явуулах (богино → хурдан)." },

  { type: "h", text: "Loading байдал" },
  { type: "code", lang: "tsx", code: `// src/app/quiz/[id]/loading.tsx
export default function Loading() {
  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <div className="mb-6 h-6 w-40 animate-pulse rounded bg-zinc-100" />
      <div className="rounded-lg border p-6">
        <div className="mb-5 h-4 w-full animate-pulse rounded bg-zinc-100" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded bg-zinc-50" />
          ))}
        </div>
      </div>
    </main>
  );
}`, },
  { type: "callout", variant: "tip", title: "Skeleton нь spinner-ээс дээр", text: "Эцсийн бүтэцтэй төстэй тоймыг харуулбал хэрэглэгч юу ирэхийг мэдэж, хүлээх нь богино санагдана. Мөн агуулга ирэхэд layout үсрэхгүй." },

  { type: "h", text: "Дибаг үлдэгдэл цэвэрлэх" },
  { type: "code", lang: "text", code: `Терминал дээр ийм зүйл гарч байвал:
[Function: fromJSONSchema]

→ Хаа нэгтээ console.log(z.fromJSONSchema) үлдсэн байна.
→ Бүх файлаа "console.log" гэж хайж, шаардлагагүйг устга.`, },

  { type: "h", text: "Аюулгүй байдлын шалгах жагсаалт" },
  { type: "exercise", title: "Production-д гаргахын өмнө", items: [
    "`.env.local` нь `.gitignore`-д байгаа",
    "Нууц түлхүүрт `NEXT_PUBLIC_` угтвар байхгүй",
    "Бүх SQL query параметртэй ($1, $2), string нийлүүлээгүй",
    "`UPDATE`/`DELETE` бүрд `AND user_id = $N` байгаа",
    "`sslmode=verify-full`",
    "API route бүрт `syncUser()` шалгалт",
    "Шаардлагагүй `console.log` устгасан",
  ] },

  { type: "h", text: "Гарсан бүх алдааны хураангуй" },
  { type: "code", lang: "text", code: `№   Алдаа                        Илрэх байдал         Шийдэл
1   NEXT_PUBLIC_ нууц түлхүүрт   Browser-д ил         Угтвар хая, restart
2   SSL warning                  Улаан overlay        sslmode=verify-full
3   Багана нэрлэх зөрчил         column does not...   Нэг стандарт
4   summery үсгийн алдаа         errorMissingColumn   RENAME COLUMN
5   SQL injection                (илрэхгүй)           Параметр $1
6   RETURNING id мартах          /quiz/undefined      INSERT-д нэмэх
7   Эрх шалгахгүй                Хэн ч устгана        AND user_id = $N
8   Dialog .map() дотор          Бүх гарчиг зэрэг     Controlled + state
9   group класс мартах           Товч харагдахгүй     Эцэгт group
10  Prop дамжуулаагүй            Хоосон, ts2741       Item дотор оруулах
11  as const мартах              ts2345 widening      Schema-д as const
12  Prompt/schema зөрчил         Чанар муу            Prompt-д формат бичихгүй
13  Cache байхгүй                11 сек, өөр асуулт   ON CONFLICT DO UPDATE
14  Frontend/backend зөрөх       undefined утга       Хоёр талыг зэрэг харах`, },

  { type: "h", text: "Дибаг хийх ерөнхий арга" },
  { type: "ol", items: [
    "**Терминалаа унш.** Browser overlay нь ихэвчлэн хоёрдогч алдаа харуулдаг. Жинхэнэ шалтгаан server лог дээр.",
    "**`✓ Compiled` байгаа эсэхийг хар.** Байвал syntax биш, ажиллах үеийн алдаа.",
    "**Хоёртын хайлт.** Кодыг хамгийн энгийн хэлбэрт буулгаад хэсэг хэсгээр нэм.",
    "**Өгөгдлийг шалга.** \"Юу ч гарахгүй байна\" гэдэг ихэвчлэн \"өгөгдөл байхгүй\" гэсэн үг.",
    "**TypeScript-ийн алдааг үл тоомсорлохгүй.** `ts2741`, `ts2345` нь бодит алдааг урьдчилан хэлж байгаа.",
    "**Cache цэвэрлэ.** Дээрх бүгд зөв мөртлөө ажиллахгүй бол `rm -rf .next && npm run dev`.",
  ] },

  { type: "h", text: "Цааш хөгжүүлэх" },
  { type: "code", lang: "text", code: `Хялбар
• Тестийн түүх — өмнөх оноонуудыг жагсаах
• Асуултын тоог хэрэглэгч сонгох (3/5/10)
• Хүндрэлийн түвшин сонгох

Дунд
• PDF, URL-ээс өгүүлэл оруулах
• Буруу хариулсан асуултуудыг дахин үзэх горим
• Тестийг найзтайгаа хуваалцах (public link)

Нарийн
• Streaming — асуултууд нэг нэгээр гарч ирэх
• Spaced repetition — мартах муруй дээр үндэслэн давтах
• Хэрэглэгчийн сул талыг илрүүлж тэр сэдвээр илүү асуулт`, },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Хамгийн сайн оноог хадгалах?", options: ["GREATEST(COALESCE(...), $1)", "MAX()", "SET = $1", "SUM()"], answer: 0 },
    { q: "Vercel Hobby-ийн функцийн хязгаар?", options: ["5 сек", "10 сек", "60 сек", "Хязгааргүй"], answer: 1 },
    { q: "Spinner-ээс аль нь дээр вэ?", options: ["Skeleton", "Хоосон дэлгэц", "Alert", "Progress bar"], answer: 0 },
    { q: "Дибаг хийхэд эхлээд юуг унших вэ?", options: ["Browser overlay", "Терминал", "DB", "Git log"], answer: 1 },
    { q: "Бүгд зөв мөртлөө ажиллахгүй бол?", options: ["rm -rf .next", "npm install", "Дахин бичих", "Restart PC"], answer: 0 },
    { q: "Аюулгүй байдлын хамгийн чухал шалгалт?", options: ["CSS", "SQL параметр + эзэмшигч шалгалт", "Font", "Loading"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`GREATEST(COALESCE(user_score, 0), $1)` — хамгийн сайн оноог хадгална.",
    "`UPDATE`-д ч `AND user_id = $N` заавал.",
    "Vercel Hobby 10 сек — асуултын тоо эсвэл оролтын урт багасга.",
    "`loading.tsx`-д skeleton — spinner-ээс дээр.",
    "Production-ийн өмнө 7 зүйлийн шалгах жагсаалтыг гүйцэтгэ.",
    "Дибаг: терминал → Compiled? → хоёртын хайлт → өгөгдөл → TS алдаа → cache.",
    "🎉 Quiz App дууслаа! 14 алдааг өөрөө оношилж чаддаг боллоо.",
  ] },
  { type: "h", text: "Төгсгөл" },
  { type: "p", text: "Энэ модуль нь бодит бүтээх явцаас гарсан. Алдаанууд зохиомол биш — бүгд үнэхээр гарч, засагдсан. Дараагийн төслөө барихдаа энэ 14 алдааг санаж, эхнээс нь зөв хий." },
];
