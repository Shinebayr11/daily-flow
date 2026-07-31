import type { ContentBlock } from "./types";

// ===== m5l1 — Rest API =====
export const m5l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "REST архитектурын зарчмуудыг ойлгож, зөв нэрлэсэн endpoint зохиож, Next.js Route Handler-ээр өөрийн API бичиж сурна." },

  { type: "h", text: "Онол — API гэж юу вэ?" },
  { type: "p", text: "**API (Application Programming Interface)** нь хоёр програм хоорондоо ярилцах гэрээ. Frontend \"надад кинонуудыг өгөөч\" гэж хэлэхэд backend өгөгдлийг буцаана." },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Ресторан бол backend, гал тогоо бол database. Чи (frontend) гал тогоо руу орж хоол хийдэггүй — зөөгч (API) рүү захиалга хэлж, тэр авчирдаг. Цэс (documentation) нь юу захиалж болохыг заана." },

  { type: "h", text: "REST-ийн үндсэн зарчим" },
  { type: "p", text: "**REST (Representational State Transfer)** нь API зохиох стандарт хэв маяг. Гол санаа: **бүх зүйл нөөц (resource), нөөц бүр өөрийн хаягтай, үйлдлийг HTTP method-оор заана.**" },
  { type: "code", lang: "text", code: `Нөөц: кино (movies)

GET    /api/movies          бүх кино авах
GET    /api/movies/123      нэг кино авах
POST   /api/movies          шинэ кино нэмэх
PUT    /api/movies/123      бүхэлд нь солих
PATCH  /api/movies/123      хэсэгчлэн засах
DELETE /api/movies/123      устгах`, },
  { type: "code", lang: "text", code: `✗ БУРУУ нэрлэлт (үйлдлийг хаяганд бичсэн)
/api/getMovies
/api/createMovie
/api/deleteMovieById?id=5
/api/movie/update

✓ ЗӨВ (нэр үг, олон тоо, үйлдэл нь method)
GET    /api/movies
POST   /api/movies
DELETE /api/movies/5
PATCH  /api/movies/5`, },

  { type: "h", text: "REST-ийн 5 зарчим" },
  { type: "ol", items: [
    "**Client-Server** — frontend ба backend тусдаа, бие даан хөгжинө.",
    "**Stateless** — хүсэлт бүр өөрөө бүрэн. Сервер өмнөх хүсэлтийг санадаггүй (тиймээс токеныг хүсэлт бүрт явуулна).",
    "**Cacheable** — хариуг кэшлэж болно (GET).",
    "**Uniform Interface** — ижил дүрэм, урьдчилан таамаглаж болохуйц.",
    "**Layered System** — дунд нь proxy, load balancer байж болно.",
  ] },
  { type: "callout", variant: "tip", title: "Stateless яагаад чухал вэ?", text: "Сервер хэрэглэгчийн төлөвийг санахгүй тул 10 сервер зэрэг ажиллуулж, хүсэлтийг дурын нэг рүү нь чиглүүлж болно. Тиймээс өргөжүүлэхэд (scale) амархан." },

  { type: "h", text: "Next.js Route Handler" },
  { type: "code", lang: "text", code: `app/api/movies/route.ts        → /api/movies
app/api/movies/[id]/route.ts   → /api/movies/123

⚠ page.tsx БИШ, route.ts гэж нэрлэнэ`, },
  { type: "code", lang: "ts", code: `// app/api/movies/route.ts
import { NextRequest, NextResponse } from "next/server";

// GET /api/movies
export async function GET(req: NextRequest) {
  // Query параметр унших
  const page = Number(req.nextUrl.searchParams.get("page") ?? 1);
  const q = req.nextUrl.searchParams.get("q") ?? "";

  const movies = await db.movie.findMany({
    where: q ? { title: { contains: q } } : undefined,
    skip: (page - 1) * 20,
    take: 20,
  });

  return NextResponse.json({ movies, page });
}

// POST /api/movies
export async function POST(req: NextRequest) {
  const body = await req.json();          // await заавал

  // Шалгалт — оролтод итгэж болохгүй!
  if (!body.title || typeof body.title !== "string") {
    return NextResponse.json(
      { error: "title заавал байх ёстой" },
      { status: 400 },
    );
  }

  const created = await db.movie.create({ data: { title: body.title } });

  return NextResponse.json(created, { status: 201 });   // 201 = Created
}`, },

  { type: "h", text: "Dynamic route — /api/movies/[id]" },
  { type: "code", lang: "ts", code: `// app/api/movies/[id]/route.ts
type Ctx = { params: Promise<{ id: string }> };     // Next.js 15-д Promise

export async function GET(req: NextRequest, { params }: Ctx) {
  const { id } = await params;

  const movie = await db.movie.findUnique({ where: { id } });

  if (!movie) {
    return NextResponse.json({ error: "Олдсонгүй" }, { status: 404 });
  }

  return NextResponse.json(movie);
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();

  const updated = await db.movie.update({ where: { id }, data: body });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const { id } = await params;

  await db.movie.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });    // 204 = агуулгагүй
}`, },

  { type: "h", text: "Zod-оор оролтыг шалгах" },
  { type: "code", lang: "ts", code: `import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1, "Гарчиг заавал").max(200),
  year: z.number().int().min(1888).max(2100),
  rating: z.number().min(0).max(10).optional(),
});

export async function POST(req: NextRequest) {
  const parsed = createSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Буруу өгөгдөл", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // parsed.data нь 100% зөв, төрөлжсөн
  const created = await db.movie.create({ data: parsed.data });
  return NextResponse.json(created, { status: 201 });
}`, },
  { type: "callout", variant: "error", title: "Хэзээ ч оролтод бүү итгэ", text: "Frontend дээр validation хийсэн ч, хэн ч Postman-аар шууд API руу дурын өгөгдөл явуулж чадна. Backend дээр ЗААВАЛ дахин шалга." },

  { type: "h", text: "Сайн API-ийн шинж" },
  { type: "ul", items: [
    "**Тогтвортой нэрлэлт** — бүх endpoint нэг хэв маягтай.",
    "**Зөв status code** — 200/201/400/401/404/500 зөв ялгана.",
    "**Тодорхой алдаа** — `{ error: \"...\" }` гэсэн нэгдсэн формат.",
    "**Хуудаслалт** — их өгөгдлийг хэсэгчилж буцаана.",
    "**Хувилбар** — `/api/v1/movies` (breaking change хийхэд хэрэгтэй).",
    "**Баримт бичиг** — юу хүлээж авч, юу буцаахыг тайлбарлана.",
  ] },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "route.ts биш page.tsx нэрлэх", text: "API хавтасд заавал `route.ts`. `page.tsx` бол UI хуудас — 404 гарна." },
  { type: "callout", variant: "error", title: "await req.json() мартах", text: "`const body = req.json()` — энэ Promise. `await` нэм." },
  { type: "callout", variant: "error", title: "Method экспортлохгүй", text: "`export async function GET` гэж ЗААВАЛ том үсгээр, export-той. `get` эсвэл export-гүй бол 405 Method Not Allowed." },
  { type: "callout", variant: "warn", title: "Үйлдлийг хаяганд бичих", text: "`/api/deleteMovie` биш `DELETE /api/movies/:id`. REST-д үйлдэл нь method." },
  { type: "callout", variant: "error", title: "Оролтыг шалгахгүй", text: "`db.create(body)` гэж шууд хийвэл хэн ч дурын талбар нэмж чадна. Zod-оор шалга." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: 6 HTTP method болон тэдгээрийн зориулалтыг бич.",
    "Дунд: `/api/tasks` GET, POST хийдэг route.ts бич.",
    "Дунд: `/api/tasks/[id]` PATCH, DELETE нэм.",
    "Хүнд: Zod схемээр оролтыг шалгаж 400 буцаадаг болго.",
    "Хүнд: `?page=` хуудаслалт нэмж 20-оор хязгаарла.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "API гэж юу вэ?",
    "REST-д үйлдлийг юугаар заадаг вэ?",
    "Stateless гэж юу вэ, яагаад чухал вэ?",
    "Next.js-д API файлыг яаж нэрлэх вэ?",
    "`req.json()` яагаад await хийх ёстой вэ?",
    "Backend дээр validation яагаад заавал хэрэгтэй вэ?",
    "POST амжилттай болвол ямар status буцаах вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "REST-д үйлдлийг юугаар заадаг вэ?", options: ["Хаягны нэрээр", "HTTP method-оор", "Body-гоор", "Header-ээр"], answer: 1 },
    { q: "Устгах method?", options: ["GET", "POST", "DELETE", "PUT"], answer: 2 },
    { q: "Next.js API файлын нэр?", options: ["page.tsx", "route.ts", "api.ts", "server.ts"], answer: 1 },
    { q: "Аль нь ЗӨВ REST хаяг вэ?", options: ["/api/getMovies", "GET /api/movies", "/api/movie/get", "/api/fetchAll"], answer: 1 },
    { q: "Stateless гэж юу вэ?", options: ["Сервер өмнөх хүсэлтийг санахгүй", "State ашиглахгүй", "DB байхгүй", "Кэш байхгүй"], answer: 0 },
    { q: "Шинэ зүйл үүсгэсэн status?", options: ["200", "201", "204", "301"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "API = програмууд ярилцах гэрээ. REST = түүнийг зохиох стандарт.",
    "Нөөц нь нэр үг (олон тоо), үйлдэл нь HTTP method.",
    "Next.js: `app/api/.../route.ts`, `export async function GET/POST/...`.",
    "`await req.json()`, Next.js 15-д `await params`.",
    "Оролтыг Zod-оор ЗААВАЛ шалга — frontend-д итгэж болохгүй.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Express JS** — Node.js дээрх хамгийн түгээмэл backend framework." },
];

// ===== m5l2 — Express JS =====
export const m5l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Express-ээр бие даасан сервер бичиж, middleware, router, алдаа боловсруулалтыг ойлгож, Next.js API-тай харьцуулна." },

  { type: "h", text: "Онол — Node.js ба Express" },
  { type: "p", text: "**Node.js** нь JavaScript-ыг хөтчөөс гадна ажиллуулах орчин. Node дангаараа сервер хийж болох ч кодыг нь бичихэд төвөгтэй:" },
  { type: "code", lang: "js", code: `// Цэвэр Node.js — маш төвөгтэй
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/api/movies" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ movies: [] }));
  } else if (req.url === "/api/movies" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });      // гараар цуглуулна
    req.on("end", () => {
      const data = JSON.parse(body);
      // ...
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(3000);`, },
  { type: "p", text: "**Express** нь үүнийг хялбарчилна — routing, body задлах, middleware бүгд бэлэн." },

  { type: "h", text: "Эхлүүлэх" },
  { type: "code", lang: "bash", code: `mkdir my-server && cd my-server
npm init -y
npm install express
npm install -D nodemon              # файл өөрчлөгдөхөд автоматаар дахин асаана

# package.json дотор:
# "type": "module",                  ← import ашиглахын тулд
# "scripts": { "dev": "nodemon index.js" }`, },
  { type: "code", lang: "js", code: `// index.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware — JSON body-г автоматаар задлана
app.use(express.json());

// Route
app.get("/api/movies", (req, res) => {
  res.json({ movies: ["Fight Club", "Inception"] });
});

app.get("/api/movies/:id", (req, res) => {
  const { id } = req.params;              // хаягнаас
  res.json({ id, title: "Fight Club" });
});

app.post("/api/movies", (req, res) => {
  const { title } = req.body;             // express.json() задалсан

  if (!title) {
    return res.status(400).json({ error: "title заавал" });
  }

  res.status(201).json({ id: 1, title });
});

app.listen(PORT, () => console.log(\`Сервер http://localhost:\${PORT}\`));`, },

  { type: "h", text: "req объектын гол хэсгүүд" },
  { type: "code", lang: "js", code: `app.post("/api/movies/:id/reviews", (req, res) => {
  req.params.id        // хаягнаас: /api/movies/123 → "123"
  req.query.page       // query-ээс: ?page=2 → "2"
  req.body             // POST body (express.json() хэрэгтэй)
  req.headers          // толгой мэдээлэл
  req.method           // "POST"
  req.path             // "/api/movies/123/reviews"
});`, },

  { type: "h", text: "Middleware — Express-ийн зүрх" },
  { type: "p", text: "**Middleware** нь хүсэлт route-д хүрэхээс ӨМНӨ ажилладаг функц. `req`, `res` объектыг өөрчилж, `next()` дуудаж дараагийнх руу дамжуулна." },
  { type: "code", lang: "text", code: `Хүсэлт → [logger] → [json parser] → [auth] → [route] → Хариу
             ↓            ↓            ↓
          next()      next()      next() эсвэл res.status(401)`, },
  { type: "code", lang: "js", code: `// 1) Логлох middleware
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} \${req.method} \${req.path}\`);
  next();                            // ЗААВАЛ дуудна, эс бөгөөс хүсэлт хөлдөнө
});

// 2) Нэвтрэлт шалгах
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Нэвтрэх шаардлагатай" });
    //     ↑ next() дуудахгүй = хүсэлт энд зогсоно
  }

  try {
    req.user = verifyToken(token);   // дараагийн handler-т дамжина
    next();
  } catch {
    res.status(401).json({ error: "Токен буруу" });
  }
}

// Тодорхой route-д хэрэглэх
app.get("/api/profile", requireAuth, (req, res) => {
  res.json({ user: req.user });      // middleware-ээс ирсэн
});

// Бүх route-д
app.use("/api/admin", requireAuth);`, },
  { type: "callout", variant: "error", title: "next() мартах", text: "Middleware дотор `next()` дуудахгүй, `res.send()` ч хийхгүй бол хүсэлт үүрд хүлээгдэж, хэрэглэгч timeout болно. Хамгийн түгээмэл Express алдаа." },

  { type: "h", text: "Router — файл тусгаарлах" },
  { type: "code", lang: "js", code: `// routes/movies.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => res.json({ movies: [] }));
router.get("/:id", (req, res) => res.json({ id: req.params.id }));
router.post("/", (req, res) => res.status(201).json(req.body));

export default router;`, },
  { type: "code", lang: "js", code: `// index.js
import moviesRouter from "./routes/movies.js";
import usersRouter from "./routes/users.js";

app.use("/api/movies", moviesRouter);    // /api/movies, /api/movies/:id
app.use("/api/users", usersRouter);`, },

  { type: "h", text: "Алдаа боловсруулах" },
  { type: "code", lang: "js", code: `// Бүх route-ийн ДАРАА тавина
// 4 параметртэй = Express үүнийг алдааны handler гэж таньдаг
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || "Серверийн алдаа",
  });
});

// 404 — ямар ч route таарахгүй бол
app.use((req, res) => {
  res.status(404).json({ error: "Хаяг олдсонгүй" });
});`, },
  { type: "code", lang: "js", code: `// async route-д алдаа барих
app.get("/api/movies", async (req, res, next) => {
  try {
    const movies = await db.getMovies();
    res.json(movies);
  } catch (err) {
    next(err);            // алдааны handler руу дамжуулна
  }
});`, },
  { type: "callout", variant: "error", title: "async route-д try/catch мартах", text: "Express 4-д async функц дотрын алдааг автоматаар барьдаггүй — сервер бүхэлдээ унана. `try/catch` + `next(err)` заавал (эсвэл `express-async-errors` сан)." },

  { type: "h", text: "CORS" },
  { type: "code", lang: "bash", code: `npm install cors`, },
  { type: "code", lang: "js", code: `import cors from "cors";

// Бүх домэйнд зөвшөөрөх (dev-д л)
app.use(cors());

// Production — зөвхөн өөрийн frontend
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,                 // cookie дамжуулахад
}));`, },

  { type: "h", text: "Express vs Next.js Route Handler" },
  { type: "code", lang: "text", code: `                    Express              Next.js Route Handler
Тусдаа сервер       ✓ тийм               ✗ Next-ийн дотор
Routing             app.get(path, fn)    файлын бүтэц
Body задлах         express.json()       await req.json()
Middleware          app.use()            middleware.ts
Deploy              Render, Railway      Vercel (автомат)
Хэзээ?              том backend,         Next.js төсөлд
                    олон frontend        хангалттай`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "req.body undefined", text: "`app.use(express.json())`-ыг route-уудаас ӨМНӨ бичээгүй. Дараалал чухал." },
  { type: "callout", variant: "error", title: "Cannot set headers after they are sent", text: "Нэг хүсэлтэд 2 удаа `res.send()`/`res.json()` дуудсан. `return res.json(...)` гэж `return` нэм." },
  { type: "callout", variant: "error", title: "EADDRINUSE: port already in use", text: "3000 порт аль хэдийн эзлэгдсэн. Өөр порт ашигла, эсвэл `lsof -ti:3000 | xargs kill`." },
  { type: "callout", variant: "error", title: "Cannot use import statement outside a module", text: "`package.json`-д `\"type\": \"module\"` нэм, эсвэл `require` ашигла." },
  { type: "callout", variant: "warn", title: "Route дараалал буруу", text: "Express дээрээс доош шалгана. `/movies/:id`-ыг `/movies/new`-ээс ӨМНӨ бичвэл \"new\" нь id гэж ойлгогдоно." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Express сервер асааж `/api/hello` route хий.",
    "Дунд: GET, POST, PATCH, DELETE бүгдийг хийсэн CRUD бич.",
    "Дунд: Логлох middleware нэмж хүсэлт бүрийг console-д хэвлэ.",
    "Хүнд: `express.Router()`-ээр файл тусгаарла.",
    "Хүнд: Алдааны handler нэмж async route-д `next(err)` дуудаж үз.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Express юуг хялбарчилдаг вэ?",
    "`express.json()` юу хийдэг, хаана бичих вэ?",
    "Middleware гэж юу вэ, `next()` юу хийдэг вэ?",
    "`req.params`, `req.query`, `req.body` тус бүр хаанаас ирдэг вэ?",
    "Алдааны handler-ыг яаж таньдаг вэ?",
    "async route-д яагаад try/catch хэрэгтэй вэ?",
    "Route дараалал яагаад чухал вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Express юу вэ?", options: ["Frontend сан", "Node.js backend framework", "Database", "CSS сан"], answer: 1 },
    { q: "JSON body задлахад?", options: ["express.json()", "гараар JSON.parse", "автомат", "express.text()"], answer: 0 },
    { q: "Middleware-д дараагийнх руу дамжуулах?", options: ["next()", "continue()", "pass()", "return"], answer: 0 },
    { q: "Хаягнаас параметр авах?", options: ["req.query", "req.params", "req.body", "req.headers"], answer: 1 },
    { q: "Алдааны handler хэдэн параметртэй вэ?", options: ["2", "3", "4", "5"], answer: 2 },
    { q: "`?page=2` хаанаас уншигдах вэ?", options: ["req.params", "req.query", "req.body", "req.path"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Express = Node.js дээр сервер бичихийг хялбарчилсан framework.",
    "`express.json()`-ыг route-уудаас ӨМНӨ.",
    "Middleware = хүсэлт route-д хүрэхээс өмнөх функц, `next()` заавал.",
    "`req.params` (хаяг) · `req.query` (?) · `req.body` (POST).",
    "`express.Router()`-ээр файл тусгаарла.",
    "Алдааны handler 4 параметртэй, хамгийн сүүлд.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Error Handling** — алдааг найдвартай барьж, зөв мессеж буцаана." },
];

// ===== m5l3 — Error Handling =====
export const m5l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Алдааны төрлүүдийг ялгаж, нэгдсэн формат тогтоож, аюулгүй бөгөөд ойлгомжтой алдааны боловсруулалт хийж сурна." },

  { type: "h", text: "Онол — Алдааны төрлүүд" },
  { type: "code", lang: "text", code: `1) Хэрэглэгчийн алдаа (4xx) — оролт буруу
   → Тодорхой хэлж засах боломж өг
   400 буруу өгөгдөл · 401 нэвтрээгүй · 403 эрх байхгүй · 404 олдсонгүй

2) Серверийн алдаа (5xx) — бидний буруу
   → Ерөнхий мессеж буцаа, дэлгэрэнгүйг ЛОГ-д
   500 дотоод алдаа · 503 түр боломжгүй

3) Сүлжээний алдаа — интернэт, timeout
   → Дахин оролдох боломж өг

4) Гуравдагч талын алдаа — гадаад API унасан
   → Хэрэглэгчид ойлгомжтой болго`, },

  { type: "h", text: "Аюулгүй байдал — юуг ХЭЛЖ БОЛОХГҮЙ вэ" },
  { type: "code", lang: "ts", code: `// ✗ АЮУЛТАЙ — халдагчид мэдээлэл өгч байна
catch (err) {
  return NextResponse.json({ error: err.message }, { status: 500 });
  // "connect ECONNREFUSED 10.0.1.5:27017" ← дотоод IP ил боллоо
  // "duplicate key error collection: app.users index: email_1" ← DB бүтэц
}

// ✓ АЮУЛГҮЙ
catch (err) {
  console.error("POST /api/movies", err);      // бүрэн мэдээлэл ЛОГ-д
  return NextResponse.json(
    { error: "Серверийн алдаа гарлаа" },       // ерөнхий мессеж хэрэглэгчид
    { status: 500 },
  );
}`, },
  { type: "callout", variant: "error", title: "Stack trace хэзээ ч бүү буцаа", text: "Production-д алдааны дэлгэрэнгүй мэдээлэл нь халдагчид системийн бүтэц, сангийн хувилбар, файлын замыг зааж өгдөг. Зөвхөн лог руу." },

  { type: "h", text: "Нэгдсэн алдааны формат" },
  { type: "code", lang: "ts", code: `// lib/api-errors.ts
import { NextResponse } from "next/server";

export function badRequest(message: string, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status: 400 });
}

export function unauthorized(message = "Нэвтрэх шаардлагатай") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbidden(message = "Эрх хүрэлцэхгүй") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function notFound(message = "Олдсонгүй") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function serverError(message = "Серверийн алдаа гарлаа") {
  return NextResponse.json({ error: message }, { status: 500 });
}`, },
  { type: "code", lang: "ts", code: `// Ашиглах — бүх route ижил формат
import { notFound, serverError } from "@/lib/api-errors";

export async function GET(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const movie = await db.movie.findUnique({ where: { id } });

    if (!movie) return notFound("Кино олдсонгүй");

    return NextResponse.json(movie);
  } catch (err) {
    console.error("GET /api/movies/:id", err);
    return serverError();
  }
}`, },

  { type: "h", text: "Захиалгат алдааны класс" },
  { type: "code", lang: "ts", code: `export class AppError extends Error {
  constructor(
    message: string,
    public status = 500,
    public code?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

// Ашиглах
if (!user) throw new AppError("Хэрэглэгч олдсонгүй", 404, "USER_NOT_FOUND");
if (user.banned) throw new AppError("Хориглогдсон", 403, "USER_BANNED");

// Барих
catch (err) {
  if (err instanceof AppError) {
    return NextResponse.json(
      { error: err.message, code: err.code },
      { status: err.status },
    );
  }
  console.error(err);
  return serverError();
}`, },
  { type: "callout", variant: "tip", title: "code талбар яагаад хэрэгтэй вэ?", text: "Frontend нь текст мессежээр биш `code`-оор шийдвэр гаргана. Мессежийг орчуулж, өөрчилж болно — код тогтмол үлдэнэ." },

  { type: "h", text: "Frontend талд барих" },
  { type: "code", lang: "tsx", code: `async function createMovie(data: FormData) {
  try {
    const res = await fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));

      // Status-аар ялгаж арга хэмжээ ав
      switch (res.status) {
        case 400: throw new Error(body.error ?? "Өгөгдөл буруу");
        case 401: router.push("/login"); return;
        case 403: throw new Error("Эрх хүрэлцэхгүй");
        case 404: throw new Error("Олдсонгүй");
        case 429: throw new Error("Хэт олон хүсэлт. Түр хүлээнэ үү.");
        default:  throw new Error("Серверийн алдаа. Дахин оролдоно уу.");
      }
    }

    return await res.json();
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("Сүлжээний алдаа. Холболтоо шалгана уу.");
    }
    throw err;
  }
}`, },

  { type: "h", text: "Дахин оролдох (retry)" },
  { type: "code", lang: "ts", code: `async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);

      // 5xx бол дахин оролдох утгатай, 4xx бол утгагүй
      if (res.status >= 500 && i < retries - 1) {
        await new Promise((r) => setTimeout(r, 2 ** i * 1000));  // 1s, 2s, 4s
        continue;
      }

      return res;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 2 ** i * 1000));
    }
  }
  throw new Error("Дахин оролдлого дууслаа");
}`, },
  { type: "callout", variant: "tip", title: "Exponential backoff", text: "1с → 2с → 4с гэж хүлээх хугацааг нэмэгдүүлнэ. Сервер ачаалалтай байхад дахин дахин цохилгүй амрааж өгдөг." },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "err.message-ыг шууд буцаах", text: "Дотоод мэдээлэл ил гарна. Ерөнхий мессеж буцаа, дэлгэрэнгүйг `console.error`-т." },
  { type: "callout", variant: "error", title: "Бүх алдаанд 500 буцаах", text: "Хэрэглэгчийн буруу оролт бол 400, олдоогүй бол 404. Зөв status нь frontend-д зөв арга хэмжээ авах боломж өгнө." },
  { type: "callout", variant: "warn", title: "catch дотор юу ч хийхгүй", text: "`catch {}` — алдаа чимээгүй алга болно, дибаг хийх боломжгүй. Дор хаяж `console.error`." },
  { type: "callout", variant: "error", title: "unknown төрлийг шууд ашиглах", text: "TypeScript-д `catch (err)` нь `unknown`. `err.message` шууд ашиглаж болохгүй — `err instanceof Error` шалга." },
  { type: "callout", variant: "warn", title: "4xx үед дахин оролдох", text: "400/404 бол дахин оролдоод үр дүнгүй — өгөгдөл нь буруу. Зөвхөн 5xx болон сүлжээний алдаанд retry хий." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: 4xx ба 5xx-ийн ялгааг жишээтэй бич.",
    "Дунд: `badRequest`, `notFound`, `serverError` туслах функцүүд бич.",
    "Дунд: Route дотор try/catch нэмж лог бичдэг болго.",
    "Хүнд: `AppError` класс үүсгэж `code`-той алдаа шид.",
    "Хүнд: `fetchWithRetry`-ыг exponential backoff-той хэрэгжүүл.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Алдааны 4 үндсэн төрөл юу вэ?",
    "Яагаад `err.message`-ыг хэрэглэгчид буцааж болохгүй вэ?",
    "Нэгдсэн формат яагаад хэрэгтэй вэ?",
    "`code` талбар юунд хэрэгтэй вэ?",
    "TypeScript-д `catch (err)` ямар төрөлтэй вэ?",
    "Ямар алдаанд retry хийх нь зөв вэ?",
    "Exponential backoff гэж юу вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Хэрэглэгчийн буруу оролт?", options: ["400", "500", "200", "301"], answer: 0 },
    { q: "Серверийн дотоод алдаа?", options: ["400", "404", "500", "201"], answer: 2 },
    { q: "Алдааны дэлгэрэнгүйг хаана бичих вэ?", options: ["Хариунд", "Лог руу", "URL-д", "Хаана ч үгүй"], answer: 1 },
    { q: "catch (err) төрөл нь?", options: ["Error", "any", "unknown", "string"], answer: 2 },
    { q: "Retry хийх нь зохимжтой?", options: ["400", "404", "500", "403"], answer: 2 },
    { q: "Frontend юугаар шийдвэр гаргах нь дээр вэ?", options: ["Мессежийн текст", "error code", "Урт", "Огноо"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "4xx = хэрэглэгчийн, 5xx = серверийн алдаа.",
    "Дэлгэрэнгүйг лог руу, хэрэглэгчид ерөнхий мессеж.",
    "Нэгдсэн формат `{ error, code }` — frontend-д хялбар.",
    "`catch (err)` нь `unknown` — `instanceof Error` шалга.",
    "Зөвхөн 5xx/сүлжээний алдаанд exponential backoff-той retry.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**HTTP Status Codes** — бүх кодыг утгатай нь сурна." },
];

// ===== m5l4 — HTTP Status Codes =====
export const m5l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "HTTP status код бүрийг утгатай нь ойлгож, API-даа зөв сонгож ашиглаж сурна." },

  { type: "h", text: "Онол — 5 бүлэг" },
  { type: "code", lang: "text", code: `1xx  Мэдээлэл       (ховор ашиглагдана)
2xx  Амжилттай ✓
3xx  Дахин чиглүүлэх →
4xx  Клиентийн алдаа ✗  (ЧИНИЙ буруу — хүсэлт буруу)
5xx  Серверийн алдаа ✗  (МАНАЙ буруу — сервер эвдэрсэн)`, },
  { type: "callout", variant: "tip", title: "4 ба 5-ыг ялгах гол", text: "4xx = хүсэлтийг засвал ажиллана. 5xx = хүсэлт зөв ч сервер ажиллаж чадсангүй. Энэ ялгаа нь retry хийх эсэхийг шийднэ." },

  { type: "h", text: "2xx — Амжилттай" },
  { type: "code", lang: "text", code: `200 OK                  Ерөнхий амжилт (GET, PATCH, PUT)
201 Created             Шинэ нөөц үүссэн (POST)
202 Accepted            Хүлээн авсан, ард нь боловсруулна (удаан ажил)
204 No Content          Амжилттай ч буцаах агуулгагүй (DELETE)
206 Partial Content     Хэсэгчилсэн (видео stream)`, },
  { type: "code", lang: "ts", code: `// POST → 201 + үүссэн объект
const created = await db.movie.create({ data });
return NextResponse.json(created, { status: 201 });

// DELETE → 204, body БАЙХГҮЙ
await db.movie.delete({ where: { id } });
return new NextResponse(null, { status: 204 });`, },

  { type: "h", text: "3xx — Дахин чиглүүлэх" },
  { type: "code", lang: "text", code: `301 Moved Permanently   Хаяг БҮРМӨСӨН солигдсон (SEO шилжинэ)
302 Found               Түр зуур
304 Not Modified        Өөрчлөгдөөгүй → кэшээ ашигла (хурдасгана)
307 Temporary Redirect  Түр, method хадгална
308 Permanent Redirect  Бүрмөсөн, method хадгална`, },
  { type: "callout", variant: "warn", title: "301-ийг болгоомжтой", text: "Хөтөч 301-ыг ҮҮРД кэшлэдэг. Буруу тавьбал хэрэглэгчийн хөтөч дээрээс арилгахад маш хэцүү. Эргэлзэж байвал 302 ашигла." },

  { type: "h", text: "4xx — Клиентийн алдаа" },
  { type: "code", lang: "text", code: `400 Bad Request         Өгөгдөл буруу форматтай / validation унасан
401 Unauthorized        НЭВТРЭЭГҮЙ (нэр нь төөрөгдүүлдэг!)
403 Forbidden           Нэвтэрсэн ч ЭРХ БАЙХГҮЙ
404 Not Found           Нөөц олдсонгүй
405 Method Not Allowed  GET байхад POST явуулсан
409 Conflict            Зөрчил (имэйл давхардсан)
410 Gone                Байсан, устсан
413 Payload Too Large   Файл хэт том
422 Unprocessable       Формат зөв ч утга нь буруу
429 Too Many Requests   Rate limit`, },
  { type: "code", lang: "text", code: `401 vs 403 — ХАМГИЙН ТҮГЭЭМЭЛ ТӨӨРӨГДӨЛ

401 = "Чи хэн бэ? Нэвтрээгүй байна."
      → Нэвтрэх хуудас руу явуул
      → Токен байхгүй / хугацаа дууссан

403 = "Чи хэн болохыг мэдэж байна. Гэхдээ болохгүй."
      → Нэвтрэх хуудас руу явуулах нь УТГАГҮЙ
      → Энгийн хэрэглэгч админ хуудас руу орох гэсэн`, },
  { type: "code", lang: "ts", code: `// 409 Conflict — давхардал
const exists = await db.user.findUnique({ where: { email } });
if (exists) {
  return NextResponse.json(
    { error: "Энэ имэйл бүртгэлтэй байна", code: "EMAIL_TAKEN" },
    { status: 409 },
  );
}

// 429 — rate limit, хэзээ дахин оролдохыг хэл
return NextResponse.json(
  { error: "Хэт олон хүсэлт" },
  { status: 429, headers: { "Retry-After": "60" } },
);`, },

  { type: "h", text: "5xx — Серверийн алдаа" },
  { type: "code", lang: "text", code: `500 Internal Server Error  Ерөнхий серверийн алдаа
501 Not Implemented        Хэрэгжүүлээгүй
502 Bad Gateway            Proxy-гийн ард байгаа сервер буруу хариулав
503 Service Unavailable    Түр боломжгүй (засвар, ачаалал)
504 Gateway Timeout        Ард талын сервер хариу өгсөнгүй`, },

  { type: "h", text: "Практик шийдвэрийн мод" },
  { type: "code", lang: "text", code: `Хүсэлт ирлээ
├── Токен байхгүй/хүчингүй? ────────→ 401
├── Токен зөв, эрх хүрэхгүй? ───────→ 403
├── Body формат буруу? ─────────────→ 400
├── Формат зөв, утга буруу? ────────→ 422 (эсвэл 400)
├── Нөөц олдсонгүй? ────────────────→ 404
├── Давхардал/зөрчил? ──────────────→ 409
├── Хэт олон хүсэлт? ───────────────→ 429
├── Бүх зүйл зөв, шинэ үүслээ? ─────→ 201
├── Бүх зүйл зөв, буцаах юмгүй? ────→ 204
├── Бүх зүйл зөв? ──────────────────→ 200
└── Манай код унав? ────────────────→ 500`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Бүх зүйлд 200 буцаах", text: "`{ success: false }` гээд 200 буцаах нь түгээмэл алдаа. `res.ok` үргэлж true болж, frontend алдааг ялгаж чадахгүй. Status-аа зөв тавь." },
  { type: "callout", variant: "error", title: "401 ба 403-ыг андуурах", text: "401 = нэвтрээгүй (login руу явуул). 403 = эрх байхгүй (login руу явуулах утгагүй)." },
  { type: "callout", variant: "warn", title: "204-т body буцаах", text: "204 = агуулгагүй гэсэн үг. Body явуулбал зарим клиент алдаа өгнө. `new NextResponse(null, { status: 204 })`." },
  { type: "callout", variant: "warn", title: "500-г хэт их ашиглах", text: "Хэрэглэгчийн буруу оролтод 500 буцаавал \"манай сервер эвдэрсэн\" гэсэн буруу дохио өгнө. Мониторингийн анхааруулга дэмий дуугарна." },
  { type: "callout", variant: "tip", title: "422 хэрэгтэй юу?", text: "JSON формат зөв ч утга нь логикийн хувьд буруу (жишээ: дуусах огноо эхлэхээс өмнө). Заавал биш — 400 ч болно. Багтаа нэг стандарт тогтоо." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: 5 бүлгийг нэрлээд тус бүрд 2 жишээ бич.",
    "Дунд: 401 ба 403-ын ялгааг өөрийн үгээр тайлбарла.",
    "Дунд: CRUD route бүрд ямар status тохирохыг жагсаа.",
    "Хүнд: Имэйл давхардвал 409 буцаадаг бүртгэлийн API бич.",
    "Хүнд: 429 + `Retry-After` толгойтой rate limit хэрэгжүүл.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "4xx ба 5xx-ийн үндсэн ялгаа юу вэ?",
    "201 хэзээ буцаах вэ?",
    "204 хэзээ, ямар онцлогтой вэ?",
    "401 ба 403 хэзээ алийг нь?",
    "409 ямар тохиолдолд?",
    "Яагаад бүх зүйлд 200 буцааж болохгүй вэ?",
    "301-ыг яагаад болгоомжлох вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Амжилттай хүсэлт?", options: ["200", "400", "500", "301"], answer: 0 },
    { q: "Шинэ нөөц үүссэн?", options: ["200", "201", "204", "202"], answer: 1 },
    { q: "Нэвтрээгүй?", options: ["400", "401", "403", "404"], answer: 1 },
    { q: "Нэвтэрсэн ч эрх байхгүй?", options: ["401", "403", "404", "409"], answer: 1 },
    { q: "Имэйл давхардсан?", options: ["400", "404", "409", "422"], answer: 2 },
    { q: "DELETE амжилттай, буцаах юмгүй?", options: ["200", "201", "204", "404"], answer: 2 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "2xx амжилт · 3xx чиглүүлэх · 4xx клиент · 5xx сервер.",
    "POST → 201, DELETE → 204, ерөнхий → 200.",
    "401 = нэвтрээгүй · 403 = эрх байхгүй · 409 = зөрчил · 429 = хэт олон.",
    "Бүх зүйлд 200 бүү буцаа — frontend ялгаж чадахгүй болно.",
    "Зөв status = зөв арга хэмжээ + зөв мониторинг.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**HTTP requests / response** — хүсэлт хариуны бүтцийг задлан үзнэ." },
];

// ===== m5l5 — HTTP requests / response =====
export const m5l5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "HTTP хүсэлт хариуны бүрэн бүтцийг ойлгож, header-үүдийг зөв ашиглаж, DevTools-оор дибаг хийж сурна." },

  { type: "h", text: "Онол — HTTP гэж юу вэ?" },
  { type: "p", text: "**HTTP (HyperText Transfer Protocol)** нь клиент сервер хоёрын ярианы дүрэм. Клиент асууна (request), сервер хариулна (response). Ярианы дараалал үргэлж ийм — сервер өөрөө эхэлж чадахгүй." },

  { type: "h", text: "Хүсэлтийн бүтэц" },
  { type: "code", lang: "text", code: `POST /api/movies?draft=true HTTP/1.1        ← 1) Эхний мөр
Host: myapp.com                             ← 2) Толгойнууд
Content-Type: application/json
Authorization: Bearer eyJhbGc...
Accept: application/json
User-Agent: Mozilla/5.0...
                                            ← 3) Хоосон мөр
{"title": "Fight Club", "year": 1999}       ← 4) Body`, },
  { type: "ul", items: [
    "**Method** — юу хийхийг заана (GET, POST, ...).",
    "**Path + query** — хаана, ямар нөхцөлтэй.",
    "**Headers** — нэмэлт мэдээлэл (төрөл, токен, хэл...).",
    "**Body** — илгээх өгөгдөл (GET-д байхгүй).",
  ] },

  { type: "h", text: "Хариуны бүтэц" },
  { type: "code", lang: "text", code: `HTTP/1.1 201 Created                        ← Статус
Content-Type: application/json              ← Толгойнууд
Content-Length: 68
Cache-Control: no-store
Set-Cookie: session=abc123; HttpOnly; Secure

{"id": "1", "title": "Fight Club", "year": 1999}   ← Body`, },

  { type: "h", text: "Чухал header-үүд" },
  { type: "code", lang: "text", code: `— Хүсэлтийн —
Content-Type      Илгээж буй өгөгдлийн төрөл
Accept            Ямар төрлийн хариу хүсэж байгаа
Authorization     Токен (Bearer ...)
Cookie            Cookie-нууд
User-Agent        Хөтөч/төхөөрөмжийн мэдээлэл
Origin            Хаанаас ирсэн (CORS-д чухал)

— Хариуны —
Content-Type      Буцааж буй өгөгдлийн төрөл
Cache-Control     Яаж кэшлэхийг заана
Set-Cookie        Cookie тавина
Location          Redirect эсвэл шинээр үүссэн нөөцийн хаяг
Retry-After       Хэзээ дахин оролдохыг заана
Access-Control-*  CORS зөвшөөрлүүд`, },

  { type: "h", text: "Content-Type-ийн төрлүүд" },
  { type: "code", lang: "text", code: `application/json                     JSON (хамгийн түгээмэл)
application/x-www-form-urlencoded    Ердийн HTML форм
multipart/form-data                  Файл оруулах
text/html                            HTML хуудас
text/plain                           Энгийн текст
image/png, image/jpeg                Зураг`, },
  { type: "code", lang: "ts", code: `// JSON илгээх
await fetch("/api/movies", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Fight Club" }),
});

// Файл илгээх — Content-Type-ыг ГАРААР БҮҮ тавь!
const formData = new FormData();
formData.append("file", file);
formData.append("title", "Постер");

await fetch("/api/upload", {
  method: "POST",
  body: formData,          // хөтөч boundary-тай Content-Type өөрөө тавина
});`, },
  { type: "callout", variant: "error", title: "FormData-д Content-Type бүү тавь", text: "`multipart/form-data`-д санамсаргүй `boundary` мөр хэрэгтэй. Гараар тавьвал boundary дутуу болж сервер уншиж чадахгүй. Хөтөчид даатга." },

  { type: "h", text: "Server талд унших" },
  { type: "code", lang: "ts", code: `export async function POST(req: NextRequest) {
  // Header
  const auth = req.headers.get("authorization");
  const contentType = req.headers.get("content-type");

  // Query
  const page = req.nextUrl.searchParams.get("page");

  // Cookie
  const session = req.cookies.get("session")?.value;

  // Body — төрлөөс хамаарна
  if (contentType?.includes("application/json")) {
    const data = await req.json();
  } else if (contentType?.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file") as File;
  }

  // Хариу — header тавих
  return NextResponse.json(
    { ok: true },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "X-Custom-Header": "value",
      },
    },
  );
}`, },

  { type: "h", text: "Cookie ба аюулгүй байдал" },
  { type: "code", lang: "ts", code: `import { cookies } from "next/headers";

const cookieStore = await cookies();

cookieStore.set("session", token, {
  httpOnly: true,       // JavaScript уншиж ЧАДАХГҮЙ (XSS-ээс хамгаална)
  secure: true,         // зөвхөн HTTPS-ээр
  sameSite: "lax",      // CSRF-ээс хамгаална
  maxAge: 60 * 60 * 24 * 7,   // 7 хоног
  path: "/",
});`, },
  { type: "callout", variant: "error", title: "Токеныг localStorage-д хадгалахгүй", text: "`localStorage`-ыг ямар ч JavaScript уншина — XSS халдлагад токен хулгайлагдана. `httpOnly` cookie ашиглавал JS хандаж чадахгүй." },

  { type: "h", text: "CORS-ыг гүнзгий" },
  { type: "code", lang: "text", code: `Асуудал: myapp.com дээрх JS нь api.other.com руу хүсэлт явуулав
→ Хөтөч аюулгүйн үүднээс хориглоно (Same-Origin Policy)

Шийдэл: Сервер зөвшөөрөл өгнө
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true

Preflight: PATCH/DELETE эсвэл тусгай header-тэй бол хөтөч эхлээд
OPTIONS хүсэлт явуулж зөвшөөрөл асууна`, },
  { type: "code", lang: "ts", code: `// Next.js — OPTIONS-ыг ч зохицуулах
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.FRONTEND_URL!,
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
    },
  });
}`, },

  { type: "h", text: "DevTools-оор дибаг хийх" },
  { type: "code", lang: "text", code: `F12 → Network таб
1. Хүсэлт дээр дар
2. Headers   → Request/Response headers, status
3. Payload   → юу илгээснийг харна
4. Response  → сервер юу буцаасныг харна
5. Timing    → хаана удаж байгааг харна

Шүүлтүүр: Fetch/XHR дарвал зөвхөн API хүсэлтүүд харагдана

Copy → Copy as cURL   → терминалд шууд дахин ажиллуулж болно`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Content-Type мартах", text: "POST-д header өгөхгүй бол сервер body-г уншиж чадахгүй, `req.body` хоосон ирнэ." },
  { type: "callout", variant: "error", title: "CORS алдаа", text: "\"blocked by CORS policy\" — сервер зөвшөөрөөгүй. Backend дээр `Access-Control-Allow-Origin` тавь, эсвэл өөрийн API route-оор дамжуул." },
  { type: "callout", variant: "error", title: "GET-д body явуулах", text: "GET хүсэлтэд body байж болохгүй. Өгөгдлөө query параметрээр дамжуул." },
  { type: "callout", variant: "warn", title: "credentials мартах", text: "Cookie дамжуулах бол `fetch(url, { credentials: \"include\" })` + серверт `Allow-Credentials: true`." },
  { type: "callout", variant: "error", title: "req.json()-ыг 2 удаа дуудах", text: "Body бол урсгал (stream) — нэг л удаа уншигдана. Хоёр дахь удаад алдаа өгнө. Хувьсагчид хадгал." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: DevTools Network табаас нэг хүсэлтийн header-үүдийг харж бич.",
    "Дунд: `Content-Type` өгөхгүй POST явуулж юу болохыг ажигла.",
    "Дунд: Хариунд захиалгат header нэмж DevTools-оос шалга.",
    "Хүнд: `httpOnly` cookie тавьж, JS-ээс уншиж чадахгүйг батал.",
    "Хүнд: CORS алдаа зориудаар үүсгээд шийдэж үз.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Хүсэлтийн 4 хэсэг юу вэ?",
    "`Content-Type` юу заадаг вэ?",
    "FormData-д яагаад Content-Type тавьж болохгүй вэ?",
    "`httpOnly` cookie юугаараа аюулгүй вэ?",
    "CORS яагаад байдаг вэ?",
    "Preflight (OPTIONS) хэзээ явдаг вэ?",
    "`req.json()`-ыг 2 удаа дуудвал юу болох вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Хүсэлтийн 4 хэсэг?", options: ["Method, path, headers, body", "URL, CSS, JS, HTML", "GET, POST", "Client, Server"], answer: 0 },
    { q: "Токеныг ямар header-т?", options: ["Content-Type", "Authorization", "Accept", "Origin"], answer: 1 },
    { q: "JSON илгээхэд Content-Type?", options: ["text/plain", "application/json", "multipart/form-data", "text/html"], answer: 1 },
    { q: "Файл илгээхэд?", options: ["application/json", "multipart/form-data", "text/plain", "image/png"], answer: 1 },
    { q: "XSS-ээс хамгаалах cookie тохиргоо?", options: ["secure", "httpOnly", "sameSite", "path"], answer: 1 },
    { q: "CORS-ыг хэн шаарддаг вэ?", options: ["Сервер", "Хөтөч", "DB", "React"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Хүсэлт = method + path + headers + body. Хариу = status + headers + body.",
    "`Content-Type` заавал зөв. FormData-д гараар БҮҮ тавь.",
    "Токеныг `httpOnly` cookie-д — localStorage-д БИШ.",
    "CORS бол хөтчийн хамгаалалт; серверээс зөвшөөрөл өгнө.",
    "Body нэг л удаа уншигдана.",
    "DevTools → Network бол хамгийн хүчтэй дибаг хэрэгсэл.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**JSON** — өгөгдөл солилцох стандарт форматыг гүнзгий үзнэ." },
];

// ===== m5l6 — JSON =====
export const m5l6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "JSON-ийн дүрэм, хязгаарлалт, хөрвүүлэлтийн нарийн зүйлсийг ойлгож, түгээмэл алдаанаас сэргийлнэ." },

  { type: "h", text: "Онол — JSON гэж юу вэ?" },
  { type: "p", text: "**JSON (JavaScript Object Notation)** нь өгөгдөл солилцох текст формат. Ямар ч програмчлалын хэл уншиж чаддаг тул интернэтийн стандарт болсон." },
  { type: "code", lang: "json", code: `{
  "id": 550,
  "title": "Fight Club",
  "year": 1999,
  "rating": 8.4,
  "isAdult": false,
  "director": null,
  "genres": ["Drama", "Thriller"],
  "cast": [
    { "name": "Brad Pitt", "role": "Tyler Durden" },
    { "name": "Edward Norton", "role": "Narrator" }
  ]
}`, },

  { type: "h", text: "Хатуу дүрмүүд" },
  { type: "code", lang: "text", code: `✓ ЗӨВ                        ✗ БУРУУ
{"name": "Бат"}              {name: "Бат"}        түлхүүр хашилтгүй
{"name": "Бат"}              {'name': 'Бат'}      нэг хашилт
{"a": 1, "b": 2}             {"a": 1, "b": 2,}    төгсгөлд таслал
{"n": null}                  {"n": undefined}     undefined байхгүй
{"x": 1}                     {"x": 1} // тайлбар  comment байхгүй
{"f": "func"}                {"f": function(){}}  функц байхгүй`, },
  { type: "p", text: "**Зөвшөөрөгдсөн төрлүүд:** string, number, boolean, null, array, object. **ЗӨВХӨН эдгээр.**" },
  { type: "callout", variant: "warn", title: "Огноо гэж төрөл байхгүй", text: "JSON-д Date байхгүй. Огноог ISO текстээр (`\"2026-07-31T10:00:00.000Z\"`) дамжуулж, хүлээн авагч талд `new Date(str)` гэж эргүүлнэ." },

  { type: "h", text: "JavaScript-тэй хөрвүүлэх" },
  { type: "code", lang: "js", code: `// Объект → JSON текст
const obj = { name: "Бат", age: 25 };
const json = JSON.stringify(obj);
// '{"name":"Бат","age":25}'

// Уншихад хялбар болгох (2 зайгаар догол мөр)
JSON.stringify(obj, null, 2);

// Зөвхөн зарим талбарыг
JSON.stringify(user, ["name", "email"]);
// '{"name":"...","email":"..."}'   ← нууц үг орохгүй

// Функцээр шүүх
JSON.stringify(user, (key, value) =>
  key === "password" ? undefined : value
);

// JSON текст → объект
const parsed = JSON.parse('{"name":"Бат"}');
console.log(parsed.name);   // "Бат"`, },

  { type: "h", text: "stringify-ийн далд зан үйл" },
  { type: "code", lang: "js", code: `JSON.stringify({
  a: undefined,          // ← АЛГА болно
  b: function () {},     // ← АЛГА болно
  c: Symbol("x"),        // ← АЛГА болно
  d: new Date(),         // ← ISO текст болно
  e: NaN,                // ← null болно
  f: Infinity,           // ← null болно
});
// Үр дүн: {"d":"2026-07-31T...","e":null,"f":null}
// a, b, c огт байхгүй!

// BigInt бол АЛДАА шидэнэ
JSON.stringify({ g: 1n });   // TypeError`, },
  { type: "code", lang: "js", code: `// Массив дотор бол undefined → null
JSON.stringify([1, undefined, 3]);   // "[1,null,3]"

// toJSON() арга байвал түүнийг ашиглана
class User {
  constructor(name, password) { this.name = name; this.password = password; }
  toJSON() { return { name: this.name }; }     // нууц үг орохгүй
}
JSON.stringify(new User("Бат", "secret"));   // '{"name":"Бат"}'`, },

  { type: "h", text: "Алдаа барих" },
  { type: "code", lang: "ts", code: `// ✗ Аюултай — буруу JSON бол апп унана
const data = JSON.parse(text);

// ✓ Аюулгүй
function safeParse<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

const settings = safeParse(localStorage.getItem("settings") ?? "", {});`, },
  { type: "code", lang: "ts", code: `// API талд — хоосон body-д ч бэлэн бай
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON формат буруу" }, { status: 400 });
  }
  // ...
}`, },

  { type: "h", text: "Гүн хуулбар хийх заль" },
  { type: "code", lang: "js", code: `// Хурдан заль (хязгаарлалттай)
const copy = JSON.parse(JSON.stringify(original));

// ⚠ Алдагдах зүйлс: Date → текст, undefined, функц, Map, Set,
//   мөн циклтэй объект бол АЛДАА шидэнэ

// ✓ Илүү зөв — орчин үеийн арга
const copy2 = structuredClone(original);   // Date, Map, Set бүгд хадгалагдана`, },

  { type: "h", text: "Mongoose/DB-ээс ирсэн өгөгдөл" },
  { type: "code", lang: "ts", code: `// Mongoose баримт нь ObjectId, Date агуулна — шууд JSON болгож болохгүй
const doc = await Task.findById(id).lean();

// Гараар цэвэрлэх
function serializeTask(doc) {
  return {
    id: String(doc._id),                    // ObjectId → string
    title: doc.title,
    date: doc.date.toISOString(),           // Date → ISO текст
    createdAt: doc.createdAt?.toISOString(),
  };
}

return NextResponse.json(serializeTask(doc));`, },
  { type: "callout", variant: "error", title: "Only plain objects can be passed to Client Components", text: "Server Component-оос Client рүү ObjectId, Date, Mongoose баримт дамжуулж болохгүй. Дээрх шиг энгийн объект болгож хөрвүүл." },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Unexpected token < in JSON at position 0", text: "Сервер JSON биш HTML буцаасан (ихэвчлэн 404/500 алдааны хуудас). `res.ok` шалгаж байж `res.json()` дууд." },
  { type: "callout", variant: "error", title: "Unexpected end of JSON input", text: "Хоосон текстийг parse хийх гэсэн. Body хоосон эсэхийг шалга." },
  { type: "callout", variant: "error", title: "Converting circular structure to JSON", text: "Объект өөрийгөө агуулсан (a.b = a). Циклийг тасал эсвэл шүүлтүүр функц ашигла." },
  { type: "callout", variant: "warn", title: "Огноо текст болж хувирсан", text: "`JSON.parse` нь ISO текстийг Date болгож эргүүлдэггүй. `new Date(str)` гэж гараар хөрвүүл." },
  { type: "callout", variant: "error", title: "Нууц үг JSON-д орсон", text: "`JSON.stringify(user)` бүх талбарыг оруулна. `toJSON()` эсвэл шүүлтүүрээр нууц талбарыг хас." },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "JSON parse / stringify", code: `function App() {
  const [text, setText] = useState('{"name":"Бат","age":25,"tags":["a","b"]}');
  const [out, setOut] = useState("");

  function tryParse() {
    try {
      const obj = JSON.parse(text);
      setOut("✓ Зөв JSON:\\n" + JSON.stringify(obj, null, 2));
    } catch (e) {
      setOut("✗ Алдаа: " + e.message);
    }
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{width:"100%",fontFamily:"monospace",fontSize:13,padding:8}}
      />
      <button onClick={tryParse} style={{marginTop:8}}>Шалгах</button>
      <pre style={{
        background:"#f5f5f5", padding:10, borderRadius:6,
        marginTop:8, fontSize:12, whiteSpace:"pre-wrap"
      }}>{out}</pre>
      <p style={{fontSize:12,color:"#888"}}>
        Туршиж үз: түлхүүрийн хашилтыг ав, төгсгөлд таслал нэм
      </p>
    </div>
  );
}`, },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын талбарт буруу JSON бичиж алдааг хар.",
    "Дунд: `JSON.stringify(obj, null, 2)`-ийн ялгааг туршиж үз.",
    "Дунд: `undefined`, функц, `Date` агуулсан объектыг stringify хийж юу болохыг ажигла.",
    "Хүнд: `safeParse` туслах функц бичиж fallback-тай болго.",
    "Хүнд: `toJSON()` арга бүхий класс үүсгэж нууц талбарыг нуу.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "JSON-д ямар төрлүүд байдаг вэ?",
    "Түлхүүрийг яаж бичих ёстой вэ?",
    "`undefined` болон функц stringify хийхэд юу болох вэ?",
    "Огноог яаж дамжуулах вэ?",
    "`JSON.parse` яагаад try/catch хэрэгтэй вэ?",
    "\"Unexpected token <\" алдаа юу гэсэн үг вэ?",
    "Mongoose баримтыг Client рүү дамжуулахад юу хийх ёстой вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "JSON-ийн утга?", options: ["JavaScript Object Notation", "Java Standard", "JS Online", "Joint Object"], answer: 0 },
    { q: "Түлхүүрийг яаж бичих вэ?", options: ["Хашилтгүй", "Давхар хашилтанд", "Нэг хашилтанд", "Хамаагүй"], answer: 1 },
    { q: "Объект → текст?", options: ["JSON.parse", "JSON.stringify", "toString", "String()"], answer: 1 },
    { q: "JSON-д БАЙХГҮЙ төрөл?", options: ["string", "number", "undefined", "null"], answer: 2 },
    { q: "`Unexpected token <` юу гэсэн үг вэ?", options: ["HTML ирсэн", "Хоосон", "Хэт урт", "Цикл"], answer: 0 },
    { q: "Гүн хуулбарт хамгийн зөв нь?", options: ["JSON заль", "structuredClone", "spread", "Object.assign"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "JSON = текст формат. Түлхүүр давхар хашилтанд, төгсгөлд таслалгүй.",
    "Зөвшөөрөгдсөн: string, number, boolean, null, array, object.",
    "`undefined`, функц алга болно. `Date` → ISO текст.",
    "`JSON.parse` заавал try/catch дотор.",
    "`Unexpected token <` = HTML ирсэн (алдааны хуудас).",
    "DB баримтыг Client рүү дамжуулахын өмнө энгийн объект болго.",
    "🎉 5-р модуль дууслаа!",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**6-р модуль: Food Delivery App.** MVC, MongoDB, Auth, Deployment — бүрэн full-stack апп." },
];
