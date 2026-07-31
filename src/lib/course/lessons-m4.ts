import type { ContentBlock } from "./types";

// m4l1 — Next Router
export const m4l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Next.js App Router-ийн файлд суурилсан routing, `Link`, `useRouter`, dynamic route `[id]`-г ойлгож ашиглана." },
  { type: "h", text: "Онол — Routing гэж юу вэ?" },
  { type: "p", text: "**Routing** нь ямар хаяг (URL) дээр ямар хуудас харагдахыг тодорхойлох. Next.js-д үүнийг **хавтасны бүтцээр** хийдэг — тусдаа тохиргоо бичих шаардлагагүй." },
  { type: "code", lang: "text", code: `src/app/
├── page.tsx              → /
├── movies/
│   ├── page.tsx          → /movies
│   └── [id]/
│       └── page.tsx      → /movies/123  (dynamic)
└── search/
    └── page.tsx          → /search` },
  { type: "h", text: "Link — хуудас хооронд шилжих" },
  { type: "p", text: "`<a>` тэг ашиглавал хуудас бүхэлдээ дахин ачаалагдана. **`<Link>`** нь зөвхөн хэрэгтэй хэсгийг сольдог тул хамаагүй хурдан." },
  { type: "code", lang: "tsx", code: `import Link from "next/link";

export default function Page() {
  return (
    <nav>
      <Link href="/movies">Кинонууд</Link>
      <Link href="/movies/550">Fight Club</Link>   {/* dynamic route */}
    </nav>
  );
}` },
  { type: "h", text: "Dynamic route — [id]" },
  { type: "p", text: "`[id]` нэртэй хавтас нь дурын утга авна. `/movies/550` руу орвол `id = \"550\"` болно." },
  { type: "code", lang: "tsx", code: `// app/movies/[id]/page.tsx
// Next.js 15-д params нь Promise тул await хийнэ
export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <h1>Киноны ID: {id}</h1>;
}` },
  { type: "h", text: "useRouter — кодоор шилжих" },
  { type: "code", lang: "tsx", code: `"use client";
import { useRouter } from "next/navigation";   // "next/router" БИШ!

export default function BackButton() {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/movies")}>Кино руу</button>
      <button onClick={() => router.back()}>Буцах</button>
    </div>
  );
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: 'import { useRouter } from "next/router"', text: "App Router-т `next/navigation`-аас импортлоно. `next/router` бол хуучин Pages Router-ийнх." },
  { type: "callout", variant: "error", title: "404 — хуудас олдохгүй", text: "Хавтас дотор `page.tsx` файл байхгүй бол route үүсэхгүй. Файлын нэр яг `page.tsx` байх ёстой." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `/about` хуудас үүсгээд нүүрнээс Link-ээр холбо.",
    "Дунд: `/movies/[id]` үүсгэж id-г дэлгэцэд харуул.",
    "Хүнд: `useRouter`-ээр \"Буцах\" товч хийж туршиж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "App Router-т route яаж үүсгэдэг вэ?", options: ["Тохиргооны файлд бичиж", "Хавтас + page.tsx үүсгэж", "router.js-д", "package.json-д"], answer: 1 },
    { q: "useRouter-ийг хаанаас импортлох вэ?", options: ["next/router", "next/navigation", "react-router", "next/link"], answer: 1 },
    { q: "Dynamic route хавтасны нэр?", options: ["{id}", "[id]", "(id)", "$id"], answer: 1 },
    { q: "Хурдан шилжихэд юуг ашиглах вэ?", options: ["<a>", "<Link>", "window.location", "form"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Route = хавтас + `page.tsx`.",
    "`<Link>`-ээр хурдан шилжинэ, `useRouter`-ээр кодоор шилжинэ.",
    "`[id]` хавтас dynamic route үүсгэнэ.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**useEffect hook** — component ачаалагдахад өгөгдөл татах, гадаад системтэй холбогдох." },
];

// m4l2 — useEffect hook
export const m4l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "useEffect-ийн зорилго, dependency array-ийн үүрэг, cleanup хийх аргыг сурна." },
  { type: "h", text: "Онол — useEffect гэж юу вэ?" },
  { type: "p", text: "**useEffect** нь component зурагдсаны ДАРАА ажилладаг код бичих hook. Ихэвчлэн API-аас өгөгдөл татах, timer тавих, гадаад системтэй холбогдоход ашиглана." },
  { type: "callout", variant: "tip", title: "Dependency array", text: "`[]` — зөвхөн нэг удаа (эхэнд). `[x]` — x өөрчлөгдөх бүрт. Байхгүй — render бүрт (ихэвчлэн буруу!)." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState, useEffect } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Component зурагдсаны дараа ажиллана
    async function load() {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    }
    load();
  }, []);   // [] = зөвхөн нэг удаа

  if (loading) return <p>Уншиж байна...</p>;
  return <ul>{movies.map((m) => <li key={m.id}>{m.title}</li>)}</ul>;
}` },
  { type: "h", text: "Cleanup — цэвэрлэх" },
  { type: "p", text: "useEffect-ээс функц буцаавал component устахад тэр функц ажиллана. Timer, event listener-ийг цэвэрлэхэд заавал хэрэгтэй." },
  { type: "code", lang: "tsx", code: `useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);
  // Cleanup: component устахад timer-ыг зогсооно
  return () => clearInterval(timer);
}, []);` },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "useEffect timer", code: `function App() {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(timer);   // cleanup
  }, []);

  return <p>Өнгөрсөн хугацаа: {sec} сек</p>;
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Хязгааргүй давталт (infinite loop)", text: "Dependency array өгөөгүй эсвэл дотор нь state өөрчилсөн. `[]` эсвэл зөв dependency өг." },
  { type: "callout", variant: "error", title: "useEffect дотор шууд async", text: "`useEffect(async () => ...)` (буруу). Дотор нь async функц зарлаж дуудна (дээрх жишээ шиг)." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Дээрх timer-ийг 2 секунд тутам нэмэгддэг болго.",
    "Дунд: \"Зогсоох\" товч нэмж timer-ыг зогсоо.",
    "Хүнд: `[count]` dependency-тэй useEffect бичиж юу болохыг ажигла.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "useEffect хэзээ ажилладаг вэ?", options: ["Render-ээс өмнө", "Render-ийн дараа", "Хэзээ ч үгүй", "Зөвхөн сервер дээр"], answer: 1 },
    { q: "`[]` dependency юу гэсэн үг вэ?", options: ["Render бүрт", "Зөвхөн нэг удаа", "Хэзээ ч үгүй", "Алдаа"], answer: 1 },
    { q: "Cleanup функцийг яаж бичих вэ?", options: ["return () => {...}", "cleanup()", "useCleanup()", "finally"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "useEffect = render-ийн дараа ажиллах код.",
    "Dependency array-аар хэзээ ажиллахыг удирдана.",
    "Timer/listener-ийг cleanup-аар цэвэрлэнэ.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**SSR / CSR** — сервер болон клиент дээр зурах хоёр аргыг харьцуулна." },
];

// m4l3 — SSR / CSR
export const m4l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "SSR (Server-Side Rendering) ба CSR (Client-Side Rendering)-ийн ялгаа, давуу талыг ойлгож зөв сонгож сурна." },
  { type: "h", text: "Онол" },
  { type: "ul", items: [
    "**SSR** — сервер дээр HTML бэлдээд хөтөч рүү илгээнэ. Хурдан харагдана, SEO сайн.",
    "**CSR** — хөтөч дээр JavaScript ажиллаж дараа нь зурна. Интерактив, гэхдээ эхэндээ хоосон.",
    "App Router-т **default нь SSR** (Server Component). `\"use client\"` бичвэл CSR болно.",
  ] },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "SSR = ресторанд бэлэн хоол ирэх (шууд идэж эхэлнэ). CSR = орц ирээд өөрөө хийх (эхэндээ хүлээнэ, гэхдээ дуртайгаар өөрчилж болно)." },
  { type: "h", text: "SSR — Server Component (default)" },
  { type: "code", lang: "tsx", code: `// app/movies/page.tsx — Server Component
// async байж болно, шууд fetch хийж болно
export default async function MoviesPage() {
  const res = await fetch("https://api.example.com/movies");
  const movies = await res.json();

  // Сервер дээр бэлэн HTML болж хөтөч рүү очно
  return <ul>{movies.map((m) => <li key={m.id}>{m.title}</li>)}</ul>;
}` },
  { type: "h", text: "CSR — Client Component" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState, useEffect } from "react";

export default function MoviesClient() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/movies")
      .then((r) => r.json())
      .then(setMovies);
  }, []);

  return <ul>{movies.map((m) => <li key={m.id}>{m.title}</li>)}</ul>;
}` },
  { type: "h", text: "Аль нь хэзээ вэ?" },
  { type: "ul", items: [
    "SSR: жагсаалт, дэлгэрэнгүй хуудас, SEO чухал бүх зүйл.",
    "CSR: хайлт, filter, товч дарах — хэрэглэгчтэй харилцах хэсэг.",
    "Хамгийн сайн арга: SSR-ээр өгөгдөл татаад, зөвхөн интерактив жижиг хэсгээ Client болгох.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Server Component дотор useState", text: "Server Component-д hook ашиглаж болохгүй. Тэр хэсгээ тусад нь Client Component болгож ялга." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: SSR болон CSR-ийн 3 ялгааг бич.",
    "Дунд: Аль хуудсыг SSR, аль хэсгийг CSR болгохоо шийдэж жагсаа.",
    "Хүнд: Server Component дотор Client Component дуудаж бүтэц зохио.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "SEO-д аль нь давуу вэ?", options: ["CSR", "SSR", "Ялгаагүй", "Аль нь ч биш"], answer: 1 },
    { q: "App Router-т default нь?", options: ["CSR", "SSR (Server Component)", "SSG", "ISR"], answer: 1 },
    { q: "useState ашиглахад юу хэрэгтэй вэ?", options: ['"use client"', '"use server"', "async", "юу ч үгүй"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "SSR = сервер дээр зурна (хурдан, SEO сайн).",
    "CSR = хөтөч дээр зурна (интерактив).",
    "Аль болох SSR, зөвхөн хэрэгтэй хэсгээ CSR.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**axios / fetch** — API-аас өгөгдөл татах хоёр арга." },
];

// m4l4 — axios / fetch
export const m4l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`fetch` ба `axios`-аар API дуудаж, хоёрын ялгааг ойлгоно." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**fetch** нь хөтөчид бэлэн байдаг (суулгах шаардлагагүй). **axios** нь нэмэлт сан — JSON-ыг автоматаар задалдаг, алдааг илүү сайн барьдаг." },
  { type: "h", text: "fetch" },
  { type: "code", lang: "tsx", code: `// GET
const res = await fetch("https://api.example.com/movies");
if (!res.ok) throw new Error("Алдаа: " + res.status);   // fetch алдаанд throw хийдэггүй!
const data = await res.json();                          // JSON-г гараар задална

// POST
await fetch("https://api.example.com/movies", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Шинэ кино" }),
});` },
  { type: "h", text: "axios" },
  { type: "code", lang: "bash", code: `npm install axios` },
  { type: "code", lang: "tsx", code: `import axios from "axios";

// GET — data шууд бэлэн, JSON задлах шаардлагагүй
const { data } = await axios.get("https://api.example.com/movies");

// POST
await axios.post("https://api.example.com/movies", { title: "Шинэ кино" });` },
  { type: "h", text: "Ялгаа" },
  { type: "ul", items: [
    "fetch — бэлэн, суулгахгүй. `res.json()` гараар дуудна. 404 үед ч алдаа шиддэггүй.",
    "axios — суулгана. `data` шууд бэлэн. 404/500 үед автоматаар алдаа шиднэ.",
    "Next.js Server Component-д `fetch` илүү тохиромжтой (cache/revalidate дэмждэг).",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "fetch алдааг барихгүй өнгөрөх", text: "fetch 404 үед ч амжилттай гэж үзнэ. `if (!res.ok) throw ...` гэж заавал шалга." },
  { type: "callout", variant: "error", title: "res.json() мартах", text: "`const data = await res` (буруу). `const data = await res.json()` (зөв)." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: fetch-ээр нээлттэй API дуудаж console.log хий.",
    "Дунд: Мөн адилыг axios-оор бич, кодын уртыг харьцуул.",
    "Хүнд: `res.ok` шалгалт нэмж алдааны мессеж харуул.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Аль нь суулгах шаардлагагүй вэ?", options: ["axios", "fetch", "хоёулаа", "аль нь ч биш"], answer: 1 },
    { q: "fetch-д JSON яаж авах вэ?", options: ["res.data", "await res.json()", "res.body", "res.text"], answer: 1 },
    { q: "404 үед автоматаар алдаа шиддэг нь?", options: ["fetch", "axios", "хоёулаа", "аль нь ч биш"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "fetch — бэлэн, `res.json()` гараар, `res.ok` шалгана.",
    "axios — `data` шууд, алдааг автоматаар шиднэ.",
    "Server Component-д fetch илүү тохиромжтой.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Promise** — асинхрон үйлдлийн үндсэн ойлголт." },
];

// m4l5 — Promise
export const m4l5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Promise гэж юу вэ, түүний 3 төлөв, `.then()/.catch()`-ийг ойлгоно." },
  { type: "h", text: "Онол — Promise гэж юу вэ?" },
  { type: "p", text: "**Promise** нь \"ирээдүйд утга ирнэ\" гэсэн амлалт. API дуудах гэх мэт цаг зарцуулдаг үйлдэл шууд хариу өгдөггүй тул Promise буцаадаг." },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Ресторанд захиалга өгөхөд шууд хоол өгдөггүй — дугаартай тасалбар өгдөг (Promise). Хоол бэлэн болбол дуудна (resolve), эсвэл дууссан гэж хэлнэ (reject)." },
  { type: "h", text: "3 төлөв" },
  { type: "ul", items: [
    "**Pending** — хүлээгдэж байна.",
    "**Fulfilled** — амжилттай, утга ирлээ (`.then`).",
    "**Rejected** — амжилтгүй, алдаа гарлаа (`.catch`).",
  ] },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `// Promise үүсгэх
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const ok = true;
    if (ok) resolve("Амжилттай!");    // fulfilled
    else reject(new Error("Алдаа"));  // rejected
  }, 1000);
});

// Ашиглах
promise
  .then((result) => console.log(result))    // амжилттай бол
  .catch((err) => console.log(err.message)) // алдаа бол
  .finally(() => console.log("Дууслаа"));   // ямар ч тохиолдолд` },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Promise туршилт", code: `function App() {
  const [msg, setMsg] = useState("Дар...");

  function run() {
    setMsg("Хүлээж байна...");
    new Promise((resolve) => setTimeout(() => resolve("Бэлэн боллоо!"), 1500))
      .then((r) => setMsg(r));
  }

  return (
    <div>
      <p>{msg}</p>
      <button onClick={run}>Эхлүүлэх</button>
    </div>
  );
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Promise-ийг await/then-гүй ашиглах", text: "`const data = fetch(...)` бол Promise объект. `await` эсвэл `.then()` ашиглаж утгыг нь ав." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Дээрх playground-ийн хугацааг 3 секунд болго.",
    "Дунд: `reject` дуудаж `.catch`-аар алдаа харуул.",
    "Хүнд: `Promise.all([p1, p2])` ашиглаж 2 Promise-ыг зэрэг хүлээж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Promise-ийн 3 төлөв?", options: ["start/mid/end", "pending/fulfilled/rejected", "on/off", "true/false/null"], answer: 1 },
    { q: "Амжилттай үед аль ажиллах вэ?", options: [".catch()", ".then()", ".finally()", ".error()"], answer: 1 },
    { q: "Ямар ч тохиолдолд ажиллах нь?", options: [".then()", ".catch()", ".finally()", ".always()"], answer: 2 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Promise = ирээдүйд ирэх утгын амлалт.",
    "pending → fulfilled (.then) эсвэл rejected (.catch).",
    "`.finally()` ямар ч тохиолдолд ажиллана.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Async / Await** — Promise-ыг илүү уншигдахуйц бичих арга." },
];

// m4l6 — Async / Await
export const m4l6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`async/await` ашиглан асинхрон кодыг цэвэрхэн бичиж, `try/catch`-аар алдаа барина." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**async/await** бол Promise дээрх илүү уншигдахуйц бичлэг. `await` нь Promise дуустал хүлээгээд утгыг нь шууд өгдөг." },
  { type: "h", text: "Харьцуулалт" },
  { type: "code", lang: "tsx", code: `// .then() хэлбэр — гүнзгийрэх тусам уншихад хэцүү
fetch("/api/movies")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// async/await — синхрон код шиг уншигдана
async function load() {
  try {
    const res = await fetch("/api/movies");
    if (!res.ok) throw new Error("Татаж чадсангүй");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Дууслаа");
  }
}` },
  { type: "h", text: "Дүрмүүд" },
  { type: "ul", items: [
    "`await` зөвхөн `async` функц дотор ажиллана.",
    "`async` функц үргэлж Promise буцаана.",
    "Алдааг `try/catch`-аар барина.",
    "Server Component-ыг шууд `async` болгож болно.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "await is only valid in async functions", text: "`await` ашиглаж буй функцээ `async` болго: `async function load() {...}`." },
  { type: "callout", variant: "error", title: "await мартах", text: "`const data = res.json()` бол Promise. `await res.json()` гэж бич." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Дээрх `.then()` жишээг async/await болгож бич.",
    "Дунд: try/catch нэмж алдааны мессеж харуул.",
    "Хүнд: 2 API-г дараалан дуудаж хоёр дахьд нь эхнийхийн утгыг ашигла.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "await хаана ажиллах вэ?", options: ["Хаана ч", "async функц дотор", "Зөвхөн сервер", "Component дотор"], answer: 1 },
    { q: "async функц юу буцаадаг вэ?", options: ["Утга", "Promise", "undefined", "Массив"], answer: 1 },
    { q: "Алдааг юугаар барих вэ?", options: ["if/else", "try/catch", "switch", "while"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "async/await = Promise-ийн цэвэрхэн бичлэг.",
    "`await` зөвхөн `async` дотор.",
    "Алдааг `try/catch/finally`-ээр удирдана.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**SWR** — өгөгдлийг ухаалаг татаж, кэшлэн шинэчилдэг сан." },
];

// m4l7 — SWR
export const m4l7: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "SWR ашиглан өгөгдөл татах, кэшлэх, автоматаар шинэчлэхийг сурна." },
  { type: "h", text: "Онол — SWR гэж юу вэ?" },
  { type: "p", text: "**SWR** = *Stale-While-Revalidate*. Хуучин (кэшлэсэн) өгөгдлийг ШУУД харуулаад, ард нь шинийг татаж солино. Хэрэглэгч хүлээхгүй." },
  { type: "callout", variant: "tip", title: "Яагаад сайн вэ?", text: "useState + useEffect гараар бичихэд loading/error/cache/refetch бүгдийг өөрөө хийнэ. SWR эдгээрийг нэг мөрөнд өгдөг." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "code", lang: "bash", code: `npm install swr` },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `"use client";
import useSWR from "swr";

// fetcher — өгөгдөл яаж татахыг заана
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Movies() {
  // key (URL) + fetcher → data, error, isLoading бэлэн ирнэ
  const { data, error, isLoading } = useSWR("/api/movies", fetcher);

  if (isLoading) return <p>Уншиж байна...</p>;
  if (error) return <p>Алдаа гарлаа</p>;

  return <ul>{data.map((m) => <li key={m.id}>{m.title}</li>)}</ul>;
}` },
  { type: "h", text: "Давуу талууд" },
  { type: "ul", items: [
    "Ижил key-тэй дуудалтыг нэгтгэж, давхардсан хүсэлт явуулахгүй.",
    "Таб руу буцаж ирэхэд автоматаар шинэчилнэ.",
    "`mutate()`-ээр гараар шинэчилж болно.",
    "loading/error төлөв бэлэн ирнэ.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "data undefined байна", text: "Эхний render дээр data хоосон. `isLoading` шалгаж байж `data.map()` дууд." },
  { type: "callout", variant: "error", title: '"use client" мартах', text: "useSWR бол hook. Client Component дотор л ажиллана." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: SWR-ийн 3 буцаах утгыг (data, error, isLoading) нэрлэ.",
    "Дунд: Loading болон error төлөвт өөр UI харуул.",
    "Хүнд: `mutate()` ашиглаж \"Шинэчлэх\" товч хий.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "SWR-ийн утга нь?", options: ["Server Web Render", "Stale-While-Revalidate", "Simple Web Request", "Static Web Route"], answer: 1 },
    { q: "useSWR юу буцаадаг вэ?", options: ["Зөвхөн data", "data, error, isLoading", "Promise", "HTML"], answer: 1 },
    { q: "SWR ямар component-д ажиллах вэ?", options: ["Server", "Client", "Хоёулаа", "Аль нь ч биш"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "SWR = кэшлэсэнийг шууд харуулаад ард нь шинэчилнэ.",
    "`useSWR(key, fetcher)` → data, error, isLoading.",
    "Client Component дотор ашиглана.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Meta tag** — SEO болон нийгмийн сүлжээнд зөв харагдах тохиргоо." },
];

// m4l8 — Meta tag
export const m4l8: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Next.js-ийн `metadata` болон `generateMetadata`-аар хуудасны гарчиг, тайлбар, зургийг тохируулна." },
  { type: "h", text: "Онол — Meta tag гэж юу вэ?" },
  { type: "p", text: "**Meta tag** нь хуудасны талаарх мэдээллийг хайлтын систем болон нийгмийн сүлжээнд хэлдэг. Google-д ямар гарчигтай харагдах, Facebook-д ямар зурагтай хуваалцагдахыг тодорхойлно." },
  { type: "h", text: "Статик metadata" },
  { type: "code", lang: "tsx", code: `// app/movies/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кинонууд | MovieApp",
  description: "Хамгийн шинэ, шилдэг кинонуудын жагсаалт.",
  openGraph: {
    title: "Кинонууд",
    description: "Шилдэг кинонууд",
    images: ["/og-movies.png"],   // хуваалцахад харагдах зураг
  },
};

export default function Page() {
  return <h1>Кинонууд</h1>;
}` },
  { type: "h", text: "Динамик — generateMetadata" },
  { type: "p", text: "Киноны нэр зэрэг өгөгдлөөс хамаарсан гарчиг хэрэгтэй бол `generateMetadata` ашиглана." },
  { type: "code", lang: "tsx", code: `// app/movies/[id]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(\`https://api.example.com/movies/\${id}\`);
  const movie = await res.json();

  return {
    title: \`\${movie.title} | MovieApp\`,
    description: movie.overview,
  };
}

export default async function MoviePage({ params }) {
  const { id } = await params;
  return <h1>Кино {id}</h1>;
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Client Component-д metadata бичих", text: '`metadata` зөвхөн Server Component-д ажиллана. `"use client"` бичсэн файлд ажиллахгүй.' },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Нүүр хуудсандаа title, description нэм.",
    "Дунд: openGraph зураг нэмж үз.",
    "Хүнд: Dynamic хуудсанд `generateMetadata` бичиж туршиж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Meta tag юунд хэрэгтэй вэ?", options: ["SEO ба хуваалцалт", "State хадгалах", "Routing", "CSS"], answer: 0 },
    { q: "Динамик гарчигт юу ашиглах вэ?", options: ["metadata", "generateMetadata", "useState", "Head"], answer: 1 },
    { q: "metadata аль component-д ажиллах вэ?", options: ["Client", "Server", "Хоёулаа", "Аль нь ч биш"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`metadata` — статик гарчиг/тайлбар.",
    "`generateMetadata` — өгөгдлөөс хамаарсан динамик.",
    "Зөвхөн Server Component-д ажиллана.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**TypeScript** — API-ийн хариуг төрөлжүүлж алдаанаас сэргийлнэ." },
];

// m4l9 — TypeScript
export const m4l9: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`interface`/`type`-аар API-ийн хариуг төрөлжүүлж, `any`-гүй аюулгүй код бичнэ." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**TypeScript** нь JavaScript дээр төрөл (type) нэмдэг. Алдааг бичиж байхад л илрүүлдэг тул ажиллуулахаас өмнө засах боломжтой." },
  { type: "h", text: "interface — API хариуг тодорхойлох" },
  { type: "code", lang: "tsx", code: `// types/movie.ts
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;   // байхгүй ч байж болно
  vote_average: number;
  release_date: string;
}

// API-ийн бүрэн хариу
export interface MovieResponse {
  page: number;
  results: Movie[];       // Movie-ийн массив
  total_pages: number;
}` },
  { type: "code", lang: "tsx", code: `// Ашиглах
async function getMovies(): Promise<MovieResponse> {
  const res = await fetch("https://api.example.com/movies");
  return res.json() as Promise<MovieResponse>;
}

export default async function Page() {
  const data = await getMovies();
  // data.results дээр автомат санамж (autocomplete) ажиллана
  return <ul>{data.results.map((m) => <li key={m.id}>{m.title}</li>)}</ul>;
}` },
  { type: "h", text: "interface vs type" },
  { type: "ul", items: [
    "`interface` — объектын бүтэц тодорхойлоход, өргөтгөж болно.",
    "`type` — union (`\"a\" | \"b\"`), бусад нарийн төрөлд.",
    "Аль алийг нь ашиглаж болно; багийн стандартаа баримтал.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "any ашиглах", text: "`any` бол TypeScript-ийн давуу талыг устгана. Мэдэхгүй бол `unknown` ашиглаад шалгаж хөрвүүл." },
  { type: "callout", variant: "error", title: "Object is possibly 'null'", text: "`poster_path: string | null` тул шууд ашиглаж болохгүй. `movie.poster_path ?? \"/placeholder.png\"` гэж хамгаал." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `Movie` interface-д `runtime?: number` нэм.",
    "Дунд: `Genre` interface үүсгэж Movie дотор массив болгон нэм.",
    "Хүнд: `type Status = \"loading\" | \"success\" | \"error\"` union бичиж ашигла.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "TypeScript-ийн гол давуу тал?", options: ["Хурдан ажиллана", "Алдааг эрт илрүүлнэ", "CSS сайжирна", "Сервер хэрэггүй"], answer: 1 },
    { q: "`string | null` юу гэсэн үг вэ?", options: ["Заавал текст", "Текст эсвэл хоосон", "Тоо", "Массив"], answer: 1 },
    { q: "Аль нь муу практик вэ?", options: ["interface", "type", "any", "unknown"], answer: 2 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`interface`-ээр API-ийн хариуг тодорхойлно.",
    "`?` — сонголттой, `| null` — хоосон байж болно.",
    "`any`-аас зайлсхий.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**SearchParams** — URL дахь query параметрээр хайлт, шүүлт хийнэ." },
];

// m4l10 — SearchParams
export const m4l10: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "URL-ийн query параметр (`?q=batman&page=2`)-ыг Server болон Client талд уншиж ашиглана." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Search params** нь URL-ийн `?`-ийн ард байх утгууд. Хайлт, шүүлт, хуудаслалтын төлөвийг URL-д хадгалснаар холбоосыг хуваалцаж, буцах товч зөв ажиллана." },
  { type: "h", text: "Server Component-д" },
  { type: "code", lang: "tsx", code: `// app/search/page.tsx
// Next.js 15-д searchParams нь Promise
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q = "", page = "1" } = await searchParams;

  return (
    <div>
      <h1>Хайлт: {q}</h1>
      <p>Хуудас: {page}</p>
    </div>
  );
}` },
  { type: "h", text: "Client Component-д" },
  { type: "code", lang: "tsx", code: `"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") ?? "";

  function onSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", value);
    params.set("page", "1");           // хайх бүрт 1-р хуудас руу
    router.push(\`/search?\${params.toString()}\`);
  }

  return (
    <input
      defaultValue={q}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Кино хайх..."
    />
  );
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "searchParams-ыг await хийхгүй", text: "Next.js 15-д `searchParams` нь Promise. `const { q } = await searchParams;` гэж бич." },
  { type: "callout", variant: "error", title: "useSearchParams Suspense алдаа", text: "Build үед алдаа өгвөл тухайн component-ыг `<Suspense>` дотор ор." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `/search?q=batman` руу орж q-г дэлгэцэд харуул.",
    "Дунд: `page` параметр нэмж хуудаслалт хий.",
    "Хүнд: Хайх бүрт URL шинэчлэгддэг input хий.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "`?q=batman` доторх q юу вэ?", options: ["Dynamic route", "Search param", "Хавтас", "State"], answer: 1 },
    { q: "Client талд юугаар уншдаг вэ?", options: ["useParams", "useSearchParams", "useState", "useEffect"], answer: 1 },
    { q: "Next.js 15-д searchParams нь?", options: ["Объект", "Promise", "Массив", "String"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Search params = URL-ийн `?` ард байх утгууд.",
    "Server: `await searchParams`. Client: `useSearchParams()`.",
    "Хайлт/шүүлтийг URL-д хадгалснаар хуваалцаж болно.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Parallel Router** — нэг хуудсанд хэд хэдэн хэсгийг зэрэг зурах." },
];

// m4l11 — Parallel Router
export const m4l11: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Parallel Routes (`@slot`) болон Intercepting Routes-ийн үндсийг ойлгож, modal хийж сурна." },
  { type: "h", text: "Онол — Parallel Routes" },
  { type: "p", text: "**Parallel Routes** нь нэг layout дотор хэд хэдэн бие даасан хэсгийг зэрэг зурах боломж. `@` тэмдэгтэй хавтас (**slot**) үүсгэж, layout-д prop болгон авна." },
  { type: "code", lang: "text", code: `app/
├── layout.tsx        ← slot-уудыг хүлээж авна
├── page.tsx
├── @popular/
│   └── page.tsx      ← "popular" slot
└── @topRated/
    └── page.tsx      ← "topRated" slot` },
  { type: "code", lang: "tsx", code: `// app/layout.tsx
export default function Layout({
  children,
  popular,     // @popular slot
  topRated,    // @topRated slot
}: {
  children: React.ReactNode;
  popular: React.ReactNode;
  topRated: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <section>{popular}</section>     {/* тус тусдаа ачаалагдана */}
      <section>{topRated}</section>
    </div>
  );
}` },
  { type: "h", text: "Давуу тал" },
  { type: "ul", items: [
    "Хэсэг бүр тусдаа ачаалагдаж, тусдаа loading харуулна.",
    "Нэг хэсэг унавал бусад нь ажиллана (error тусгаарлагдана).",
    "Modal хийхэд (Intercepting Routes-тэй хамт) маш тохиромжтой.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Slot-ыг layout-д авахгүй байх", text: "`@popular` хавтас үүсгэсэн бол layout-ийн props-д `popular` гэж заавал авах ёстой (@ тэмдэггүйгээр)." },
  { type: "callout", variant: "warn", title: "default.tsx хэрэгтэй", text: "Зарим route дээр slot тодорхойгүй бол `default.tsx` нэмэх шаардлагатай болдог." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Parallel Route-ийн 2 давуу талыг бич.",
    "Дунд: `@popular` slot үүсгэж layout-д харуул.",
    "Хүнд: Хоёр slot-д тус тусад нь `loading.tsx` нэмж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Slot хавтасны тэмдэг?", options: ["[slot]", "@slot", "(slot)", "_slot"], answer: 1 },
    { q: "Parallel Route-ийн давуу тал?", options: ["Тус тусдаа ачаална", "CSS хурдан", "DB хэрэггүй", "Auth бэлэн"], answer: 0 },
    { q: "Slot-ыг хаана авах вэ?", options: ["page.tsx", "layout.tsx props", "route.ts", "globals.css"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`@name` хавтас = parallel slot.",
    "Layout-д prop болгон авч зурна.",
    "Тус тусдаа loading/error боломжтой.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**TMDB API** — бодит киноны өгөгдөл татаж апп-даа холбоно." },
];

// m4l12 — TMDB API
export const m4l12: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "TMDB-ээс API key авч, `.env.local`-д аюулгүй хадгалж, кино татаж харуулна." },
  { type: "h", text: "Онол — TMDB гэж юу вэ?" },
  { type: "p", text: "**TMDB (The Movie Database)** нь киноны мэдээллийн үнэгүй нээлттэй API. Кино, зураг, төрөл, үнэлгээ зэргийг татаж авах боломжтой." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "ol", items: [
    "themoviedb.org дээр бүртгүүл.",
    "Settings → API → \"Request an API Key\" (Developer сонго).",
    "API Key (v3 auth)-ээ хуулж ав.",
    "Төслийнхөө үндэс дээр `.env.local` файл үүсгэ.",
    "Key-ээ доорх байдлаар тавь.",
  ] },
  { type: "code", lang: "bash", code: `# .env.local  (энэ файлыг GitHub руу хэзээ ч бүү push хий!)
TMDB_API_KEY=таны_жинхэнэ_key
TMDB_BASE_URL=https://api.themoviedb.org/3` },
  { type: "callout", variant: "warn", title: "API key хамгаалах", text: "`NEXT_PUBLIC_` угтвар БҮҮ ХЭРЭГЛЭ — тэгвэл key хөтөчид ил гарна. Server Component эсвэл API Route дотор л ашигла." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `// app/movies/page.tsx — Server Component (key нууц хэвээр)
import type { MovieResponse } from "@/types/movie";

async function getPopular(): Promise<MovieResponse> {
  const url = \`\${process.env.TMDB_BASE_URL}/movie/popular?api_key=\${process.env.TMDB_API_KEY}\`;
  const res = await fetch(url, { next: { revalidate: 3600 } }); // 1 цаг кэшлэнэ
  if (!res.ok) throw new Error("TMDB-ээс татаж чадсангүй");
  return res.json();
}

export default async function MoviesPage() {
  const data = await getPopular();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {data.results.map((movie) => (
        <div key={movie.id}>
          <img
            src={\`https://image.tmdb.org/t/p/w500\${movie.poster_path}\`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
          <p>⭐ {movie.vote_average.toFixed(1)}</p>
        </div>
      ))}
    </div>
  );
}` },
  { type: "h", text: "Хэрэгтэй endpoint-ууд" },
  { type: "ul", items: [
    "`/movie/popular` — алдартай кинонууд",
    "`/movie/top_rated` — өндөр үнэлгээтэй",
    "`/movie/upcoming` — удахгүй гарах",
    "`/movie/{id}` — дэлгэрэнгүй",
    "`/search/movie?query=...` — хайлт",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "401 Unauthorized", text: "API key буруу эсвэл `.env.local` уншигдаагүй. Key-ээ шалгаад dev server-ээ дахин асаа." },
  { type: "callout", variant: "error", title: "Зураг харагдахгүй", text: "`poster_path` бол зөвхөн замын хэсэг. Урд нь `https://image.tmdb.org/t/p/w500` нэмнэ." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: TMDB-ээс API key аваад `.env.local`-д тавь.",
    "Дунд: Popular кинонуудыг татаж жагсаалт хий.",
    "Хүнд: `/search/movie` ашиглан хайлтын хуудас хий.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "API key-г хаана хадгалах вэ?", options: [".env.local", "page.tsx", "GitHub", "localStorage"], answer: 0 },
    { q: "NEXT_PUBLIC_ угтвар юу хийдэг вэ?", options: ["Нууцалдаг", "Хөтөчид ил гаргадаг", "Хурдасгадаг", "Юу ч үгүй"], answer: 1 },
    { q: "Зургийн бүтэн хаяг?", options: ["poster_path шууд", "image.tmdb.org/t/p/w500 + poster_path", "api key + path", "/public/ дотор"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "TMDB — үнэгүй киноны API.",
    "Key-г `.env.local`-д, `NEXT_PUBLIC_`-гүйгээр хадгална.",
    "Server Component-д дуудаж key-ээ нууцална.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Shadcn UI ба Responsive Design** — бэлэн component-оор гоё, responsive UI хийнэ." },
];

// m4l13 — Shadcn UI · Responsive Design
export const m4l13: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "shadcn/ui-аар бэлэн component суулгаж, Tailwind-ийн breakpoint-оор бүх төхөөрөмжид тохирсон UI хийнэ." },
  { type: "h", text: "Онол — shadcn/ui гэж юу вэ?" },
  { type: "p", text: "**shadcn/ui** бол энгийн сан биш — component-ийн кодыг ШУУД төсөл рүү чинь хуулж өгдөг. Тиймээс өөрийн дураар засаж болно, хамаарал нэмэгдэхгүй." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "code", lang: "bash", code: `# Эхлүүлэх (нэг удаа)
npx shadcn@latest init

# Хэрэгтэй component-оо нэмэх
npx shadcn@latest add button card input skeleton` },
  { type: "code", lang: "tsx", code: `import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MovieCard({ movie }) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold">{movie.title}</h3>
        <Button variant="outline" size="sm">Дэлгэрэнгүй</Button>
      </CardContent>
    </Card>
  );
}` },
  { type: "h", text: "Responsive Design — Tailwind breakpoints" },
  { type: "ul", items: [
    "`sm:` — 640px-ээс дээш",
    "`md:` — 768px-ээс дээш (таблет)",
    "`lg:` — 1024px-ээс дээш (лаптоп)",
    "`xl:` — 1280px-ээс дээш",
    "Угтваргүй класс нь **гар утсанд** үйлчилнэ (mobile-first).",
  ] },
  { type: "code", lang: "tsx", code: `{/* Утсанд 2 багана, таблетад 3, дэлгэцэд 5 */}
<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
  {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
</div>

{/* Утсанд нуугдаж, дэлгэцэд харагдана */}
<aside className="hidden lg:block">Sidebar</aside>

{/* Текстийн хэмжээ дэлгэцээс хамаарна */}
<h1 className="text-xl md:text-2xl lg:text-4xl">Кинонууд</h1>` },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Responsive grid", code: `function MovieCard({ title }) {
  return (
    <div style={{border:"1px solid #ddd",borderRadius:8,padding:12}}>
      {title}
    </div>
  );
}

function App() {
  const movies = ["Кино 1", "Кино 2", "Кино 3", "Кино 4"];
  return (
    <div style={{
      display:"grid",
      gridTemplateColumns:"repeat(auto-fill, minmax(120px, 1fr))",
      gap:12
    }}>
      {movies.map((m, i) => <MovieCard key={i} title={m} />)}
    </div>
  );
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Desktop-first бичих", text: "Tailwind mobile-first. `grid-cols-5 md:grid-cols-2` (буруу дараалал) биш `grid-cols-2 md:grid-cols-5` гэж бич." },
  { type: "callout", variant: "error", title: "Динамик класс ажиллахгүй", text: "`className={\\`grid-cols-${n}\\`}` ажиллахгүй — Tailwind бүтэн класс нэрийг олж чаддаггүй. Бүтэн нэрээр бич." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: shadcn-ээр `button` component нэмж ашигла.",
    "Дунд: Киноны grid-ийг утсанд 2, дэлгэцэд 5 багана болго.",
    "Хүнд: Sidebar-ыг утсанд нуугаад `lg:`-ээс дээш харагддаг болго.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "shadcn/ui ямар онцлогтой вэ?", options: ["Кодыг төсөл рүү хуулна", "node_modules-д суудаг", "CSS файл", "Backend сан"], answer: 0 },
    { q: "Tailwind default нь ямар зарчимтай вэ?", options: ["Desktop-first", "Mobile-first", "Print-first", "Ямар ч зарчимгүй"], answer: 1 },
    { q: "`md:` хэдэн px-ээс эхлэх вэ?", options: ["640", "768", "1024", "1280"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "shadcn/ui — кодыг өөрийн төсөлд хуулж өгдөг, засаж болно.",
    "Tailwind mobile-first: угтваргүй = утас, `md:`/`lg:` дээшээ.",
    "4-р модуль дууслаа! 🎉",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**5-р модуль: Node JS Fundamental.** Backend, REST API, Express-ийн ертөнц рүү орно." },
];
