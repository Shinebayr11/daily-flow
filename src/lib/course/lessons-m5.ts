import type { ContentBlock } from "./types";

// m5l1 — Rest API
export const m5l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Backend, server, API гэж юу вэ, REST API-ийн зарчмыг ойлгоно." },
  { type: "h", text: "Онол — Backend ба Server" },
  { type: "ul", items: [
    "**Frontend** — хэрэглэгчийн харж, дардаг хэсэг (хөтөч дээр).",
    "**Backend** — өгөгдөл хадгалах, боловсруулах, аюулгүй байдал (сервер дээр).",
    "**Server** — байнга ажиллаж, хүсэлт хүлээж, хариу буцаадаг компьютер/программ.",
  ] },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Ресторан: Frontend = зочны танхим, меню. Backend = гал тогоо. Server = зөөгч — захиалгыг гал тогоо руу зөөж, хоолыг буцааж авчирна." },
  { type: "h", text: "REST API гэж юу вэ?" },
  { type: "p", text: "**REST API** нь frontend болон backend хоорондоо ярилцах стандарт дүрэм. Нөөц (resource) бүрийг URL-ээр төлөөлүүлж, HTTP method-оор үйлдлийг заана." },
  { type: "code", lang: "text", code: `GET    /users        → бүх хэрэглэгч авах
GET    /users/1      → 1-р хэрэглэгч авах
POST   /users        → шинэ хэрэглэгч үүсгэх
PUT    /users/1      → 1-р хэрэглэгчийг бүтнээр солих
PATCH  /users/1      → 1-р хэрэглэгчийн зарим талбар засах
DELETE /users/1      → 1-р хэрэглэгч устгах` },
  { type: "h", text: "REST-ийн зарчмууд" },
  { type: "ul", items: [
    "URL нь **нэр үг** байна (`/users`), үйл үг биш (`/getUsers` ✗).",
    "Олон тоогоор бичнэ: `/users`, `/movies`.",
    "Үйлдлийг **HTTP method** заана, URL биш.",
    "Stateless — хүсэлт бүр бие даасан, сервер өмнөхийг санахгүй.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "URL-д үйл үг бичих", text: "`/getUsers`, `/deleteUser` (буруу). `GET /users`, `DELETE /users/1` (зөв)." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Кинонд зориулсан 5 REST endpoint бич.",
    "Дунд: `/createProduct` буруу URL-ыг зөв болгож бич.",
    "Хүнд: PUT болон PATCH-ийн ялгааг жишээгээр тайлбарла.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Шинэ өгөгдөл үүсгэхэд аль method?", options: ["GET", "POST", "DELETE", "PATCH"], answer: 1 },
    { q: "REST URL ямар байх ёстой вэ?", options: ["Үйл үг", "Нэр үг, олон тоо", "Санамсаргүй", "Тоо"], answer: 1 },
    { q: "Зарим талбар засахад?", options: ["PUT", "PATCH", "POST", "GET"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Backend = өгөгдөл, логик, аюулгүй байдал.",
    "REST = URL (нэр үг) + HTTP method (үйлдэл).",
    "Stateless — хүсэлт бүр бие даасан.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Express JS** — Node.js дээр сервер бичих хамгийн түгээмэл framework." },
];

// m5l2 — Express JS
export const m5l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Express.js-ээр анхны серверээ асааж, route бичиж, TypeScript-тэй тохируулна." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Node.js** нь JavaScript-ийг сервер дээр ажиллуулдаг орчин. **Express.js** нь Node дээр сервер бичихийг хялбарчилдаг framework — route, middleware зэргийг богино кодоор хийнэ." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "code", lang: "bash", code: `mkdir my-api && cd my-api
npm init -y
npm install express cors dotenv
npm install -D typescript @types/express @types/cors @types/node tsx
npx tsc --init` },
  { type: "code", lang: "json", code: `// package.json — script нэмэх
{
  "scripts": {
    "dev": "tsx watch src/index.ts"
  }
}` },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `// src/index.ts
import express from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());            // өөр домэйнээс хандахыг зөвшөөрнө
app.use(express.json());    // JSON body-г уншина

// GET route
app.get("/", (req, res) => {
  res.json({ message: "Сервер ажиллаж байна!" });
});

app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Bat" }]);
});

// Серверийг асаана
app.listen(PORT, () => {
  console.log(\`Сервер http://localhost:\${PORT} дээр ажиллаж байна\`);
});` },
  { type: "h", text: "Folder structure" },
  { type: "code", lang: "text", code: `my-api/
├── src/
│   ├── index.ts         ← сервер асаах
│   ├── routes/
│   │   └── user.route.ts
│   └── controllers/
│       └── user.controller.ts
├── package.json
└── tsconfig.json` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "EADDRINUSE: port already in use", text: "8000 порт завгүй. Өөр порт (8001) ашиглах эсвэл тэр процессыг хаа." },
  { type: "callout", variant: "error", title: "req.body undefined", text: "`app.use(express.json())` бичихээ мартсан. Route-уудаас ӨМНӨ бич." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Express сервер асааж `/` route-ыг хөтчөөр үз.",
    "Дунд: `/movies` route нэмж массив буцаа.",
    "Хүнд: `/health` route нэмж `{ status: \"ok\" }` буцаа.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Node.js юу вэ?", options: ["Хөтөч", "JS-ийг сервер дээр ажиллуулах орчин", "Database", "CSS"], answer: 1 },
    { q: "JSON body унших middleware?", options: ["express.json()", "cors()", "app.listen()", "res.json()"], answer: 0 },
    { q: "Серверийг юугаар асаах вэ?", options: ["app.start()", "app.listen()", "app.run()", "app.go()"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Express = Node дээр сервер бичих framework.",
    "`app.get/post/...` route, `app.use()` middleware.",
    "`express.json()` заавал route-уудаас өмнө.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Error Handling** — алдааг зөв барьж, ойлгомжтой хариу буцаана." },
];

// m5l3 — Error Handling
export const m5l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "try/catch, global error middleware, 404 handler ашиглан алдааг зөв удирдана." },
  { type: "h", text: "Онол" },
  { type: "p", text: "Алдаа гарахад сервер унах ёсгүй — ойлгомжтой мессеж, зөв status code буцаах ёстой. Express-д **error middleware** нь 4 параметртэй (`err, req, res, next`) байдгаараа онцлог." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `import express, { Request, Response, NextFunction } from "express";
const app = express();
app.use(express.json());

// 1) Route дотор try/catch
app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await findUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Хэрэглэгч олдсонгүй" });
    }
    res.json(user);
  } catch (err) {
    next(err);   // алдааг global handler руу дамжуулна
  }
});

// 2) 404 — ямар ч route таарахгүй бол (бүх route-ийн ДАРАА)
app.use((req, res) => {
  res.status(404).json({ error: "Ийм зам байхгүй" });
});

// 3) Global error middleware — 4 параметртэй, ХАМГИЙН СҮҮЛД
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Серверийн алдаа гарлаа" });
});` },
  { type: "h", text: "Дараалал чухал" },
  { type: "ol", items: [
    "Middleware (cors, express.json)",
    "Бүх route-ууд",
    "404 handler",
    "Global error handler (хамгийн сүүлд, 4 параметртэй)",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Error middleware ажиллахгүй", text: "4 параметр (err, req, res, next) заавал байх ёстой. 3 байвал Express үүнийг энгийн middleware гэж үзнэ." },
  { type: "callout", variant: "error", title: "Cannot set headers after they are sent", text: "Нэг хүсэлтэд 2 удаа хариу илгээсэн. `return res.json(...)` гэж `return` тавь." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: 404 handler нэмж туршиж үз.",
    "Дунд: Route дотор try/catch бичиж `next(err)` дуудаж үз.",
    "Хүнд: Custom `AppError` класс үүсгэж statusCode агуулдаг болго.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Error middleware хэдэн параметртэй вэ?", options: ["2", "3", "4", "5"], answer: 2 },
    { q: "Error handler хаана байх ёстой вэ?", options: ["Хамгийн эхэнд", "Дунд", "Хамгийн сүүлд", "Хамаагүй"], answer: 2 },
    { q: "Алдааг дамжуулах функц?", options: ["throw", "next(err)", "return", "res.error"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "try/catch + `next(err)`-ээр алдааг дамжуулна.",
    "Global error middleware = 4 параметр, хамгийн сүүлд.",
    "404 handler бүх route-ийн дараа.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**HTTP Status Codes** — хариуны төлөвийг зөв кодоор илэрхийлнэ." },
];

// m5l4 — HTTP Status Codes
export const m5l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Түгээмэл HTTP status code-уудыг мэдэж, API-даа зөв ашиглана." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Status code** нь хүсэлт хэрхэн шийдэгдсэнийг 3 оронтой тоогоор илэрхийлнэ. Эхний цифр нь ангиллыг заана." },
  { type: "ul", items: [
    "**2xx** — амжилттай",
    "**3xx** — чиглүүлэлт (redirect)",
    "**4xx** — клиентийн алдаа (буруу хүсэлт)",
    "**5xx** — серверийн алдаа",
  ] },
  { type: "h", text: "Хамгийн түгээмэл кодууд" },
  { type: "code", lang: "text", code: `200 OK                  → амжилттай (GET, PUT, PATCH)
201 Created             → шинээр үүсгэсэн (POST)
204 No Content          → амжилттай, буцаах юмгүй (DELETE)

400 Bad Request         → өгөгдөл буруу/дутуу
401 Unauthorized        → нэвтрээгүй (токен байхгүй)
403 Forbidden           → нэвтэрсэн ч эрх байхгүй
404 Not Found           → олдсонгүй
409 Conflict            → давхардсан (ж: имэйл бүртгэлтэй)

500 Internal Server Error → серверийн доторх алдаа` },
  { type: "callout", variant: "tip", title: "401 vs 403", text: "401 = \"Чи хэн бэ? Нэвтэрч ор.\" 403 = \"Чи хэн болохыг мэдэж байна, гэхдээ энэ эрх чамд байхгүй.\"" },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `app.post("/users", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "email ба name заавал" });      // 400
  }

  const exists = await findByEmail(email);
  if (exists) {
    return res.status(409).json({ error: "Энэ имэйл бүртгэлтэй" });      // 409
  }

  const user = await createUser({ email, name });
  res.status(201).json(user);                                            // 201
});

app.delete("/users/:id", async (req, res) => {
  await deleteUser(req.params.id);
  res.status(204).send();                                                // 204
});` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Бүх зүйлд 200 буцаах", text: "Алдаа гарсан ч 200 буцаавал frontend амжилттай гэж ойлгоно. Зөв кодыг ашигла." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: 201, 400, 404 гурвыг хэзээ ашиглахыг бич.",
    "Дунд: POST route-даа validation нэмж 400 буцаа.",
    "Хүнд: 401 ба 403-ыг ялгах жишээ бич.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Шинээр үүсгэсний код?", options: ["200", "201", "204", "301"], answer: 1 },
    { q: "Нэвтрээгүй бол?", options: ["400", "401", "403", "404"], answer: 1 },
    { q: "Давхардсан имэйл бол?", options: ["400", "404", "409", "500"], answer: 2 },
    { q: "5xx юуг заадаг вэ?", options: ["Клиентийн алдаа", "Серверийн алдаа", "Амжилттай", "Redirect"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "2xx амжилт, 4xx клиентийн алдаа, 5xx серверийн алдаа.",
    "201 = үүсгэсэн, 204 = устгасан, 400 = буруу өгөгдөл.",
    "401 = нэвтрээгүй, 403 = эрх байхгүй.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**HTTP requests / response** — хүсэлт, хариуны бүтцийг задлан үзнэ." },
];

// m5l5 — HTTP requests / response
export const m5l5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Request-ийн params, query, body, headers-ийг ялган ойлгож ашиглана." },
  { type: "h", text: "Онол — Request-ийн 4 хэсэг" },
  { type: "ul", items: [
    "**params** — URL доторх хувьсах хэсэг: `/users/:id` → `req.params.id`",
    "**query** — `?`-ийн ард: `/users?page=2` → `req.query.page`",
    "**body** — POST/PUT-д илгээх өгөгдөл → `req.body`",
    "**headers** — нэмэлт мэдээлэл (токен гэх мэт) → `req.headers`",
  ] },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `// GET /users/5?fields=name
app.get("/users/:id", (req, res) => {
  const id = req.params.id;            // "5"
  const fields = req.query.fields;     // "name"
  const token = req.headers.authorization;  // "Bearer xxx"

  res.json({ id, fields });
});

// POST /users   body: { "name": "Bat", "email": "bat@mail.com" }
app.post("/users", (req, res) => {
  const { name, email } = req.body;    // express.json() хэрэгтэй!
  res.status(201).json({ name, email });
});` },
  { type: "h", text: "Response-ийн аргууд" },
  { type: "code", lang: "ts", code: `res.json({ ok: true });          // JSON буцаана (хамгийн түгээмэл)
res.status(404).json({ ... });   // status + JSON
res.send("Текст");               // энгийн текст
res.status(204).send();          // хоосон хариу` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "params vs query андуурах", text: "`/users/:id` → params. `/users?id=5` → query. Хоёр өөр зүйл." },
  { type: "callout", variant: "error", title: "req.body хоосон", text: "`express.json()` middleware байхгүй, эсвэл Content-Type: application/json илгээгээгүй." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `/greet/:name` route хийж нэрийг буцаа.",
    "Дунд: `?page=2&limit=10` query-г уншиж буцаа.",
    "Хүнд: POST route-д body уншиж validation хий.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "`/users/:id` доторх id хаана байх вэ?", options: ["req.query", "req.params", "req.body", "req.headers"], answer: 1 },
    { q: "`?page=2` хаана байх вэ?", options: ["req.params", "req.query", "req.body", "req.url"], answer: 1 },
    { q: "POST-ийн өгөгдөл хаана вэ?", options: ["req.body", "req.params", "req.query", "res.data"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "params = URL доторх `:id`, query = `?key=value`.",
    "body = POST/PUT-ийн өгөгдөл (express.json() хэрэгтэй).",
    "headers = токен зэрэг нэмэлт мэдээлэл.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**JSON** — өгөгдөл солилцох стандарт формат." },
];

// m5l6 — JSON
export const m5l6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "JSON форматыг ойлгож, `JSON.stringify`/`JSON.parse`-ыг зөв ашиглана." },
  { type: "h", text: "Онол — JSON гэж юу вэ?" },
  { type: "p", text: "**JSON** (JavaScript Object Notation) нь өгөгдөл солилцох текст формат. Бараг бүх хэл дэмждэг тул frontend ↔ backend хооронд стандарт болсон." },
  { type: "h", text: "JSON-ийн дүрмүүд" },
  { type: "ul", items: [
    "Түлхүүр заавал **давхар хашилтанд**: `\"name\"` (`'name'` эсвэл `name` болохгүй).",
    "Утга: текст, тоо, boolean, null, массив, объект.",
    "Функц, `undefined`, comment байж БОЛОХГҮЙ.",
    "Сүүлийн элементийн ард таслал байж болохгүй.",
  ] },
  { type: "code", lang: "json", code: `{
  "id": 1,
  "name": "Bat",
  "isActive": true,
  "score": null,
  "tags": ["dev", "student"],
  "address": { "city": "Ulaanbaatar" }
}` },
  { type: "h", text: "stringify ба parse" },
  { type: "code", lang: "ts", code: `// Объект → JSON текст (сүлжээгээр илгээхэд)
const user = { name: "Bat", age: 20 };
const text = JSON.stringify(user);
// '{"name":"Bat","age":20}'

// JSON текст → Объект (хүлээж авахад)
const obj = JSON.parse(text);
console.log(obj.name);   // "Bat"

// Уншихад амар болгож хэвлэх (2 зайгаар)
console.log(JSON.stringify(user, null, 2));` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Unexpected token in JSON", text: "JSON буруу форматтай — ихэвчлэн нэг хашилт, илүү таслал, эсвэл HTML хариу ирсэн. jsonlint.com дээр шалгаж болно." },
  { type: "callout", variant: "error", title: "JSON.parse-ыг try/catch-гүй дуудах", text: "Буруу текст ирвэл алдаа шидэж програм унана. `try { JSON.parse(x) } catch {...}` гэж хамгаал." },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "JSON туршилт", code: `function App() {
  const user = { name: "Bat", age: 20, tags: ["dev", "student"] };
  const text = JSON.stringify(user, null, 2);
  const back = JSON.parse(text);

  return (
    <div>
      <p><b>JSON текст:</b></p>
      <pre style={{background:"#f4f4f5",padding:8,borderRadius:6}}>{text}</pre>
      <p><b>Буцаж объект:</b> {back.name} — {back.age} нас</p>
    </div>
  );
}` },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Өөрийн мэдээллээр JSON объект бич.",
    "Дунд: `JSON.stringify(obj, null, 2)`-ийг туршиж ялгааг хар.",
    "Хүнд: Буруу JSON текстийг try/catch-аар барьж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "JSON-д түлхүүр яаж бичих вэ?", options: ["Хашилтгүй", "Нэг хашилт", "Давхар хашилт", "Хамаагүй"], answer: 2 },
    { q: "Объектыг текст болгох?", options: ["JSON.parse", "JSON.stringify", "toString", "encode"], answer: 1 },
    { q: "JSON-д байж БОЛОХГҮЙ нь?", options: ["Массив", "null", "Функц", "Boolean"], answer: 2 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "JSON = өгөгдөл солилцох стандарт текст формат.",
    "`stringify` объект→текст, `parse` текст→объект.",
    "Түлхүүр давхар хашилтанд, функц байж болохгүй. 5-р модуль дууслаа! 🎉",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**6-р модуль: Food Delivery Full-Stack App.** MVC, MongoDB, JWT auth, Cloudinary бүхий бүтэн апп." },
];
