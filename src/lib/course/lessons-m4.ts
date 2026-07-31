import type { ContentBlock } from "./types";

// ===== m4l1 — Next Router =====
export const m4l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "App Router-ийн файлд суурилсан routing-ийг бүрэн эзэмшиж, dynamic route, тусгай файлууд (loading, error), навигацийн бүх аргыг сурна." },

  { type: "h", text: "Онол — Routing гэж юу вэ?" },
  { type: "p", text: "**Routing** нь ямар хаяг (URL) дээр ямар хуудас харагдахыг тодорхойлох. Next.js-д үүнийг **хавтасны бүтцээр** хийдэг — тусдаа тохиргооны файл бичих шаардлагагүй." },
  { type: "code", lang: "text", code: `src/app/
├── page.tsx                    → /
├── about/
│   └── page.tsx                → /about
├── movies/
│   ├── page.tsx                → /movies
│   ├── [id]/
│   │   └── page.tsx            → /movies/550  (dynamic)
│   └── genre/
│       └── [slug]/
│           └── page.tsx        → /movies/genre/action
└── search/
    └── page.tsx                → /search`, },
  { type: "callout", variant: "tip", title: "Гол дүрэм", text: "Хавтас = зам. Гэхдээ тэр хавтас дотор `page.tsx` файл байж БАЙЖ л хуудас үүснэ. Зөвхөн хавтас байвал route үүсэхгүй." },

  { type: "h", text: "Тусгай файлууд" },
  { type: "code", lang: "text", code: `app/movies/
├── page.tsx          → хуудсын агуулга
├── layout.tsx        → энэ хэсгийн нийтлэг хүрээ
├── loading.tsx       → ачаалж байх үед автоматаар харагдана
├── error.tsx         → алдаа гарвал автоматаар харагдана
├── not-found.tsx     → notFound() дуудвал
└── template.tsx      → layout шиг ч навигаци бүрт дахин үүснэ`, },
  { type: "code", lang: "tsx", code: `// app/movies/loading.tsx — Next.js автоматаар харуулна
export default function Loading() {
  return <div className="p-8 text-center">Кинонууд ачаалж байна...</div>;
}`, },
  { type: "code", lang: "tsx", code: `// app/movies/error.tsx — ЗААВАЛ Client Component
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;         // дахин оролдох функц
}) {
  return (
    <div className="p-8 text-center">
      <p className="text-red-500">Алдаа гарлаа: {error.message}</p>
      <button onClick={reset}>Дахин оролдох</button>
    </div>
  );
}`, },

  { type: "h", text: "Хаягт нөлөөлдөггүй хавтаснууд" },
  { type: "code", lang: "text", code: `// 1) (folder) — бүлэглэх, хаягт ОРОХГҮЙ
app/
├── (marketing)/
│   ├── about/page.tsx     → /about   ((marketing) хаягт орохгүй)
│   └── layout.tsx         → зөвхөн энэ бүлэгт үйлчилнэ
└── (app)/
    ├── dashboard/page.tsx → /dashboard
    └── layout.tsx         → өөр layout

// 2) _folder — route үүсгэхгүй (хувийн файлууд)
app/movies/
├── page.tsx
└── _components/           → route үүсэхгүй
    └── MovieCard.tsx`, },
  { type: "callout", variant: "tip", title: "Хэзээ (folder) ашиглах вэ?", text: "Хуудсуудыг өөр өөр layout-д бүлэглэхэд. Жишээ: нэвтрэхээс өмнөх хуудсууд нэг layout-той, нэвтэрсний дараах нь өөр (sidebar-тай) layout-той." },

  { type: "h", text: "Link — хуудас хооронд шилжих" },
  { type: "code", lang: "tsx", code: `import Link from "next/link";

<Link href="/movies">Кинонууд</Link>
<Link href="/movies/550">Fight Club</Link>
<Link href={\`/movies/\${movie.id}\`}>{movie.title}</Link>

// Query параметртэй
<Link href="/search?q=batman&page=2">Хайх</Link>

// Объект хэлбэрээр
<Link href={{ pathname: "/search", query: { q: "batman" } }}>Хайх</Link>`, },
  { type: "p", text: "`<a>` тэг ашиглавал хуудас **бүхэлдээ дахин ачаалагдана** — бүх JavaScript, CSS дахин татагдана. `<Link>` нь зөвхөн өөрчлөгдсөн хэсгийг сольдог тул хамаагүй хурдан." },
  { type: "callout", variant: "tip", title: "Prefetch", text: "`<Link>` нь дэлгэцэд харагдмагц тухайн хуудсыг **урьдчилан татдаг**. Тиймээс дарахад шууд нээгддэг. Хэрэггүй бол `prefetch={false}`." },

  { type: "h", text: "Dynamic route — [id]" },
  { type: "code", lang: "tsx", code: `// app/movies/[id]/page.tsx
// ⚠ Next.js 15-д params нь Promise — await хийх ёстой
export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(\`https://api.example.com/movies/\${id}\`);
  if (!res.ok) notFound();          // 404 хуудас руу

  const movie = await res.json();
  return <h1>{movie.title}</h1>;
}`, },
  { type: "code", lang: "text", code: `Dynamic segment-ийн төрлүүд:
[id]        → /movies/550           params.id = "550"
[...slug]   → /docs/a/b/c           params.slug = ["a","b","c"]  (catch-all)
[[...slug]] → /docs эсвэл /docs/a/b params.slug = undefined | [...]  (optional)`, },

  { type: "h", text: "useRouter — кодоор шилжих" },
  { type: "code", lang: "tsx", code: `"use client";
import { useRouter } from "next/navigation";   // ⚠ "next/router" БИШ!

export default function SearchForm() {
  const router = useRouter();

  function handleSearch(q: string) {
    router.push(\`/search?q=\${encodeURIComponent(q)}\`);   // түүхэнд нэмнэ
  }

  return (
    <div>
      <button onClick={() => router.push("/movies")}>Кино руу</button>
      <button onClick={() => router.replace("/login")}>Солих (буцах боломжгүй)</button>
      <button onClick={() => router.back()}>Буцах</button>
      <button onClick={() => router.forward()}>Урагш</button>
      <button onClick={() => router.refresh()}>Server өгөгдлийг шинэчлэх</button>
    </div>
  );
}`, },
  { type: "ul", items: [
    "`push()` — шинэ хуудас руу, буцах товч ажиллана.",
    "`replace()` — одоогийн хуудсыг СОЛИНО, буцаж очих боломжгүй (login-ийн дараа тохиромжтой).",
    "`refresh()` — Server Component-ийн өгөгдлийг дахин татна (state алдагдахгүй).",
  ] },

  { type: "h", text: "Идэвхтэй холбоосыг тодруулах" },
  { type: "code", lang: "tsx", code: `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();       // "/movies"

  const links = [
    { href: "/", label: "Нүүр" },
    { href: "/movies", label: "Кино" },
  ];

  return (
    <nav>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={pathname === l.href ? "font-bold text-indigo-600" : "text-gray-600"}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: 'import { useRouter } from "next/router"', text: "App Router-т `next/navigation`-аас импортлоно. `next/router` бол хуучин Pages Router-ийнх — \"NextRouter was not mounted\" алдаа өгнө." },
  { type: "callout", variant: "error", title: "404 — хуудас олдохгүй", text: "Хавтас дотор `page.tsx` файл байхгүй. Файлын нэр яг `page.tsx` (`Page.tsx`, `index.tsx` биш)." },
  { type: "callout", variant: "error", title: "params.id undefined", text: "Next.js 15-д `params` нь Promise. `const { id } = await params;` гэж await хий." },
  { type: "callout", variant: "error", title: "useRouter is not a function / hooks error", text: "`useRouter`, `usePathname`, `useSearchParams` бүгд hook — файлын дээд талд `\"use client\"` хэрэгтэй." },
  { type: "callout", variant: "warn", title: "Хуудас удаан солигдож байна", text: "`<a href>` ашигласан байх. `<Link href>` ашигла." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `/about` хуудас үүсгээд нүүрнээс `<Link>`-ээр холбо.",
    "Дунд: `/movies/[id]` үүсгэж `await params`-аар id-г харуул.",
    "Дунд: `loading.tsx` нэмж ачаалалтын төлөв харуул.",
    "Хүнд: `usePathname`-ээр идэвхтэй цэсийг тодруулдаг Nav хий.",
    "Хүнд: `(marketing)` бүлэг үүсгэж тусдаа layout өгч үз.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "App Router-т route яаж үүсдэг вэ?",
    "`loading.tsx`, `error.tsx` юу хийдэг вэ?",
    "`(folder)` ба `_folder` юугаараа ялгаатай вэ?",
    "`<Link>` `<a>`-аас юугаараа дээр вэ?",
    "`push()` ба `replace()`-ийн ялгаа юу вэ?",
    "Next.js 15-д `params`-ыг яаж авах вэ?",
    "`[...slug]` ямар route үүсгэх вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "App Router-т route яаж үүсгэдэг вэ?", options: ["Тохиргооны файлд бичиж", "Хавтас + page.tsx үүсгэж", "router.js-д", "package.json-д"], answer: 1 },
    { q: "useRouter-ийг хаанаас импортлох вэ?", options: ["next/router", "next/navigation", "react-router", "next/link"], answer: 1 },
    { q: "Dynamic route хавтасны нэр?", options: ["{id}", "[id]", "(id)", "$id"], answer: 1 },
    { q: "Хурдан шилжихэд юуг ашиглах вэ?", options: ["<a>", "<Link>", "window.location", "form"], answer: 1 },
    { q: "Хаягт нөлөөлдөггүй бүлэглэх хавтас?", options: ["[folder]", "(folder)", "_folder", "@folder"], answer: 1 },
    { q: "Login-ийн дараа аль нь тохиромжтой вэ?", options: ["push()", "replace()", "back()", "refresh()"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Route = хавтас + `page.tsx`.",
    "`loading.tsx`, `error.tsx`, `not-found.tsx` — автоматаар ажилладаг тусгай файлууд.",
    "`(folder)` бүлэглэнэ (хаягт орохгүй), `_folder` route үүсгэхгүй.",
    "`<Link>` хурдан + prefetch. `useRouter` кодоор шилжинэ.",
    "`[id]` dynamic, Next.js 15-д `await params`.",
    "Hook-ууд `next/navigation`-аас, `\"use client\"`-тэй.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**useEffect hook** — component ачаалагдахад өгөгдөл татах, гадаад системтэй холбогдоно." },
];

// ===== m4l2 — useEffect hook =====
export const m4l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "useEffect хэзээ, яагаад ажилладгийг гүнзгий ойлгож, dependency array, cleanup, race condition зэрэг бүх нарийн зүйлийг эзэмшинэ." },

  { type: "h", text: "Онол — useEffect гэж юу вэ?" },
  { type: "p", text: "**useEffect** нь component зурагдсаны ДАРАА ажилладаг код бичих hook. React-ийн ертөнцөөс **гадагш** харилцахад ашиглана." },
  { type: "ul", items: [
    "API-аас өгөгдөл татах",
    "Timer тавих (`setInterval`, `setTimeout`)",
    "Browser event сонсох (`window.addEventListener`)",
    "localStorage унших/бичих",
    "Гуравдагч сан эхлүүлэх (chart, map гэх мэт)",
  ] },
  { type: "callout", variant: "warn", title: "useEffect-ийг хэт их ашигладаг", text: "Шинэ хүмүүс бүх зүйлд useEffect бичдэг. Гэхдээ: props-оос тооцоолж болох зүйлд ХЭРЭГГҮЙ, event-д хариу үзүүлэхэд ХЭРЭГГҮЙ (тэнд шууд handler бич). Зөвхөн ГАДААД системтэй холбогдоход л ашигла." },

  { type: "h", text: "Dependency array — хамгийн чухал хэсэг" },
  { type: "code", lang: "tsx", code: `// 1) Байхгүй — render БҮРТ ажиллана (аюултай!)
useEffect(() => {
  console.log("Render бүрт");
});

// 2) [] хоосон — ЗӨВХӨН нэг удаа (component үүсэхэд)
useEffect(() => {
  console.log("Ганц удаа");
}, []);

// 3) [x] — x өөрчлөгдөх БҮРТ
useEffect(() => {
  console.log("x өөрчлөгдлөө:", x);
}, [x]);

// 4) [x, y] — аль нэг нь өөрчлөгдөхөд
useEffect(() => { ... }, [x, y]);`, },
  { type: "code", lang: "text", code: `Хугацааны шугам ([] тохиолдолд):

Component үүснэ
  → JSX зурагдана (эхний render)
  → useEffect ажиллана          ← ЭНД
  → state өөрчлөгдвөл дахин зурна
  → useEffect ДАХИН ажиллахгүй ([] тул)
  → component устна
  → cleanup функц ажиллана`, },

  { type: "h", text: "API-аас өгөгдөл татах — бүтэн загвар" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState, useEffect } from "react";

interface Movie { id: number; title: string }

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // async функцийг ДОТОР нь зарлана (useEffect өөрөө async байж болохгүй)
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("Татаж чадсангүй");
        const data = await res.json();
        setMovies(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Алдаа гарлаа");
      } finally {
        setLoading(false);      // амжилттай ч, алдаатай ч заавал
      }
    }

    load();
  }, []);

  if (loading) return <p>Уншиж байна...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (movies.length === 0) return <p>Кино олдсонгүй</p>;

  return <ul>{movies.map((m) => <li key={m.id}>{m.title}</li>)}</ul>;
}`, },

  { type: "h", text: "Cleanup — цэвэрлэх функц" },
  { type: "p", text: "useEffect-ээс функц буцаавал: (1) component устахад, (2) effect дахин ажиллахаас ӨМНӨ тэр функц дуудагдана." },
  { type: "code", lang: "tsx", code: `// Timer
useEffect(() => {
  const timer = setInterval(() => setSec((s) => s + 1), 1000);
  return () => clearInterval(timer);        // ← заавал цэвэрлэ
}, []);

// Event listener
useEffect(() => {
  function onResize() { setWidth(window.innerWidth); }
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);

// Subscription
useEffect(() => {
  const sub = someService.subscribe(handleData);
  return () => sub.unsubscribe();
}, []);`, },
  { type: "callout", variant: "error", title: "Cleanup хийхгүй бол", text: "Memory leak үүснэ. Component устсан ч timer ажиллаж, устсан component-ийн state-ийг өөрчлөх гэж оролдоод \"Can't perform a React state update on an unmounted component\" анхааруулга гарна." },

  { type: "h", text: "Race condition — далд алдаа" },
  { type: "p", text: "Хэрэглэгч хурдан хайлт бичихэд олон хүсэлт зэрэг явна. Хариу нь **буруу дарааллаар** ирвэл хуучин үр дүн шинийг дарж болно." },
  { type: "code", lang: "text", code: `Хэрэглэгч бичнэ:  "b" → "ba" → "bat"
Хүсэлт явна:      #1     #2      #3
Хариу ирнэ:       #3    #1      #2   ← буруу дараалал!
Эцсийн үр дүн:   #2-ийн хариу ("ba"-ийн үр дүн) ← БУРУУ`, },
  { type: "code", lang: "tsx", code: `// ✓ Шийдэл: cleanup-аар хуучин хүсэлтийг үл тоомсорлоно
useEffect(() => {
  let cancelled = false;         // ← энэ effect-ийн "тэмдэг"

  async function search() {
    const res = await fetch(\`/api/search?q=\${query}\`);
    const data = await res.json();
    if (!cancelled) setResults(data);   // хуучирсан бол setState хийхгүй
  }
  search();

  return () => { cancelled = true; };   // шинэ effect эхлэхэд хуучныг цуцална
}, [query]);`, },
  { type: "code", lang: "tsx", code: `// Эсвэл AbortController — хүсэлтийг бүр цуцална
useEffect(() => {
  const controller = new AbortController();

  fetch(\`/api/search?q=\${query}\`, { signal: controller.signal })
    .then((r) => r.json())
    .then(setResults)
    .catch((e) => {
      if (e.name !== "AbortError") setError(e.message);
    });

  return () => controller.abort();
}, [query]);`, },

  { type: "h", text: "useEffect ХЭРЭГГҮЙ тохиолдлууд" },
  { type: "code", lang: "tsx", code: `// ✗ БУРУУ — props-оос тооцоолохдоо effect хэрэглэх
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(first + " " + last);
}, [first, last]);

// ✓ ЗӨВ — render үед шууд тооцоол
const fullName = first + " " + last;

// ✗ БУРУУ — event-д хариу үзүүлэхэд effect
useEffect(() => {
  if (submitted) sendData();
}, [submitted]);

// ✓ ЗӨВ — handler дотор шууд
function handleSubmit() {
  sendData();
}`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "useEffect timer + cleanup", code: `function Timer() {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    console.log("Timer эхэллээ");
    const id = setInterval(() => setSec((s) => s + 1), 1000);

    return () => {
      console.log("Timer зогслоо");   // cleanup
      clearInterval(id);
    };
  }, []);

  return <p>Өнгөрсөн хугацаа: {sec} сек</p>;
}

function App() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? "Нуух" : "Харуулах"}
      </button>
      {show && <Timer />}
      <p style={{fontSize:13,color:"#888"}}>
        Нуухад cleanup ажиллаж timer зогсоно (console-г хар)
      </p>
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Хязгааргүй давталт (infinite loop)", text: "Dependency array өгөөгүй эсвэл dependency-д байгаа зүйлийг effect дотор өөрчилсөн. Жишээ: `useEffect(() => setCount(count+1), [count])` — хэзээ ч зогсохгүй." },
  { type: "callout", variant: "error", title: "useEffect must not return anything besides a function", text: "`useEffect(async () => ...)` гэж бичсэн — async функц Promise буцаадаг. Дотор нь async функц зарлаж дууд." },
  { type: "callout", variant: "warn", title: "React Hook useEffect has a missing dependency", text: "ESLint анхааруулга. Effect дотор ашигласан бүх гадны утгыг dependency-д нэм. Хэрэв санаатай орхиж байгаа бол шалтгааныг comment-оор бич." },
  { type: "callout", variant: "warn", title: "Dev горимд 2 удаа ажиллах", text: "React 18 Strict Mode-д effect санаатай 2 удаа ажиллуулж cleanup-ыг шалгадаг. Production-д нэг удаа. Хэрэв 2 удаа ажиллахад асуудал гарвал cleanup чинь дутуу байна." },
  { type: "callout", variant: "error", title: "Can't perform a React state update on an unmounted component", text: "Component устсаны дараа setState хийсэн. Cleanup-аар timer/хүсэлтээ цуцла." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын timer-ийг 2 секунд тутам нэмэгддэг болго.",
    "Дунд: \"Зогсоох/Үргэлжлүүлэх\" товч нэмж timer-ыг удирд.",
    "Дунд: `window.addEventListener(\"resize\")` ашиглаж цонхны өргөнийг харуул (cleanup-тай).",
    "Хүнд: `[count]` dependency-тэй effect бичиж, дотор нь `setCount` дуудаад юу болохыг ажигла (дараа нь зас).",
    "Хүнд: Хайлтын input хийж `cancelled` тэмдгээр race condition-оос хамгаал.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "useEffect хэзээ ажилладаг вэ?",
    "Dependency array-ийн 3 хувилбар юу вэ?",
    "Cleanup функц хэзээ дуудагддаг вэ (2 тохиолдол)?",
    "Race condition гэж юу вэ, яаж шийдэх вэ?",
    "useEffect-ийг ХЭРЭГЛЭХГҮЙ байх 2 тохиолдол юу вэ?",
    "Яагаад `useEffect(async () => ...)` бичиж болохгүй вэ?",
    "Dev горимд effect яагаад 2 удаа ажилладаг вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "useEffect хэзээ ажилладаг вэ?", options: ["Render-ээс өмнө", "Render-ийн дараа", "Хэзээ ч үгүй", "Зөвхөн сервер дээр"], answer: 1 },
    { q: "`[]` dependency юу гэсэн үг вэ?", options: ["Render бүрт", "Зөвхөн нэг удаа", "Хэзээ ч үгүй", "Алдаа"], answer: 1 },
    { q: "Cleanup функцийг яаж бичих вэ?", options: ["return () => {...}", "cleanup()", "useCleanup()", "finally"], answer: 0 },
    { q: "Аль нь useEffect ХЭРЭГГҮЙ вэ?", options: ["API татах", "props-оос утга тооцоолох", "Timer тавих", "Event listener"], answer: 1 },
    { q: "Race condition-ыг яаж шийдэх вэ?", options: ["cleanup + cancelled тэмдэг", "setTimeout", "олон state", "боломжгүй"], answer: 0 },
    { q: "`useEffect(async () => ...)` яагаад буруу вэ?", options: ["Удаан", "Promise буцаадаг, cleanup биш", "Ажиллахгүй", "Зөв юм"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "useEffect = render-ийн ДАРАА ажиллах, гадаад системтэй холбогдох код.",
    "`[]` нэг удаа · `[x]` x өөрчлөгдөхөд · байхгүй = render бүрт (аюултай).",
    "Timer/listener/subscription-ыг cleanup-аар заавал цэвэрлэ.",
    "Хайлт зэрэгт `cancelled` тэмдэг эсвэл `AbortController`-оор race condition-оос хамгаал.",
    "Тооцоолол болон event-д useEffect ХЭРЭГГҮЙ.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**SSR / CSR** — сервер болон клиент дээр зурах хоёр аргыг гүнзгий харьцуулна." },
];

// ===== m4l3 — SSR / CSR =====
export const m4l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "SSR, CSR, SSG, ISR дөрвөн rendering стратегийг ялгаж, Server/Client Component-ыг зөв сонгож, хосолж ашиглаж сурна." },

  { type: "h", text: "Онол — Rendering гэж юу вэ?" },
  { type: "p", text: "**Rendering** гэдэг нь код + өгөгдлөөс HTML үүсгэх үйл явц. Асуулт нь: **энэ хаана, хэзээ болох вэ?**" },
  { type: "code", lang: "text", code: `CSR (Client-Side Rendering)
1. Хөтөч хоосон HTML авна        ← хэрэглэгч цагаан дэлгэц харна
2. JavaScript татагдана
3. React ажиллана
4. API дуудна                    ← дахин хүлээнэ
5. Эцэст нь агуулга харагдана

SSR (Server-Side Rendering)
1. Сервер API дуудна
2. Сервер бэлэн HTML үүсгэнэ
3. Хөтөч БЭЛЭН HTML авна          ← шууд харагдана ✓
4. JavaScript татагдаж интерактив болно`, },

  { type: "h", text: "Дөрвөн стратеги" },
  { type: "code", lang: "text", code: `                Хэзээ HTML үүснэ         Хэзээ ашиглах
CSR             Хөтөч дээр, ажиллах үед  Хувийн dashboard, интерактив
SSR             Сервер дээр, хүсэлт бүрт Байнга өөрчлөгддөг, SEO чухал
SSG             Build хийхэд нэг удаа    Блог, баримт бичиг (өөрчлөгддөггүй)
ISR             Build + тодорхой хугацаанд шинэчлэх  Кино жагсаалт, бүтээгдэхүүн`, },
  { type: "code", lang: "tsx", code: `// SSG — build үед нэг удаа (default, fetch кэшлэгдэнэ)
const res = await fetch(url);

// ISR — 1 цаг тутам шинэчилнэ
const res = await fetch(url, { next: { revalidate: 3600 } });

// SSR — хүсэлт бүрт шинээр
const res = await fetch(url, { cache: "no-store" });

// Эсвэл бүх хуудсанд
export const dynamic = "force-dynamic";   // SSR
export const revalidate = 3600;           // ISR`, },

  { type: "h", text: "Server Component (default)" },
  { type: "code", lang: "tsx", code: `// app/movies/page.tsx — \"use client\" БАЙХГҮЙ = Server Component
// async байж болно, шууд await хийж болно
export default async function MoviesPage() {
  const res = await fetch("https://api.example.com/movies", {
    next: { revalidate: 3600 },
  });
  const movies = await res.json();

  return (
    <ul>
      {movies.map((m) => <li key={m.id}>{m.title}</li>)}
    </ul>
  );
}`, },
  { type: "p", text: "**Server Component-ийн давуу тал:**" },
  { type: "ul", items: [
    "**Хурдан** — HTML бэлэн ирнэ, хэрэглэгч шууд харна.",
    "**SEO** — Google-ийн бот агуулгыг шууд уншина.",
    "**Bundle бага** — component-ийн код хөтөч рүү ОГТ явахгүй.",
    "**Нууц аюулгүй** — API key, DB нууц үг сервер дээр үлдэнэ.",
    "**DB-тэй шууд** — API route хийхгүйгээр шууд query бичиж болно.",
  ] },

  { type: "h", text: "Client Component" },
  { type: "code", lang: "tsx", code: `"use client";                       // ← энэ мөр бүх зүйлийг өөрчилнө
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? "♥" : "♡"}</button>;
}`, },
  { type: "p", text: "**Client Component хэзээ хэрэгтэй вэ?**" },
  { type: "ul", items: [
    "`useState`, `useEffect`, бусад hook ашиглах",
    "`onClick`, `onChange` зэрэг event",
    "Browser API (`window`, `localStorage`)",
    "Гуравдагч сан (Framer Motion, chart сан гэх мэт)",
  ] },

  { type: "h", text: "Хамгийн чухал загвар — хосолж ашиглах" },
  { type: "p", text: "Бүх хуудсыг Client болгох нь түгээмэл алдаа. Зөв арга: **Server-ээр өгөгдөл татаад, зөвхөн интерактив жижиг хэсгээ Client болго.**" },
  { type: "code", lang: "tsx", code: `// ✗ БУРУУ — бүх хуудас Client
"use client";
export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => { fetch("/api/movies").then(...) }, []);
  return <div>{/* ... */}</div>;
}

// ✓ ЗӨВ — Server дээр татаад, интерактив хэсгийг тусад нь
// app/movies/page.tsx (Server)
import LikeButton from "./LikeButton";

export default async function MoviesPage() {
  const movies = await getMovies();          // сервер дээр

  return (
    <ul>
      {movies.map((m) => (
        <li key={m.id}>
          {m.title}
          <LikeButton movieId={m.id} />      {/* ← зөвхөн энэ Client */}
        </li>
      ))}
    </ul>
  );
}`, },
  { type: "callout", variant: "tip", title: "\"use client\" нь хил зурдаг", text: "`\"use client\"` бичсэн файл болон түүний ДОТОР import хийсэн БҮХ component client болно. Тиймээс аль болох мод дээрх доод түвшинд (leaf) байрлуул." },

  { type: "h", text: "Server Component дотор Client дуудаж болно" },
  { type: "code", lang: "text", code: `✓ Server → Client дуудаж БОЛНО
✗ Client → Server дуудаж БОЛОХГҮЙ (шууд)
✓ Client → Server-ийг children-ээр дамжуулж БОЛНО

// Заль: children-ээр дамжуулах
<ClientWrapper>
  <ServerComponent />     {/* энэ Server хэвээр үлдэнэ */}
</ClientWrapper>`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "useState only works in Client Components", text: "Server Component-д hook ашиглаж болохгүй. Тэр хэсгийг тусад нь Client Component болго." },
  { type: "callout", variant: "error", title: "You're importing a component that needs useState", text: "Client Component-ыг Server-ээс импортлоход бус, тэр Client файлд `\"use client\"` байхгүй байна." },
  { type: "callout", variant: "error", title: "window is not defined", text: "Server дээр `window` байхгүй. `\"use client\"` нэм, эсвэл `useEffect` дотор ашигла (тэр зөвхөн хөтөч дээр ажиллана)." },
  { type: "callout", variant: "warn", title: "Хуудас удаан харагдаж байна", text: "Бүх зүйлийг Client болгосон байх. Өгөгдөл татахыг Server руу шилжүүл." },
  { type: "callout", variant: "error", title: "Event handlers cannot be passed to Client Component props", text: "Server Component-оос функц дамжуулж болохгүй. Тэр handler-ыг Client Component дотор нь зарла." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: SSR, CSR, SSG, ISR дөрвийн ялгааг хүснэгт болгож бич.",
    "Дунд: Аль хуудсыг SSR, аль хэсгийг Client болгохоо шийдэж жагсаа.",
    "Дунд: Server Component дотор Client Component дуудаж бүтэц зохио.",
    "Хүнд: `revalidate` утгыг өөрчилж ISR-ыг туршиж үз.",
    "Хүнд: `\"use client\"`-ийг дээд түвшинд ба доод түвшинд тавьж bundle хэмжээг харьцуул.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "CSR болон SSR-ийн ялгаа юу вэ?",
    "SSG ба ISR юугаараа ялгаатай вэ?",
    "Server Component-ийн 5 давуу тал юу вэ?",
    "Client Component хэзээ хэрэгтэй вэ?",
    "`\"use client\"` яагаад \"хил\" зурдаг гэж хэлдэг вэ?",
    "Server Component дотор Client дуудаж болох уу? Эсрэгээрээ?",
    "`fetch`-ийн `cache: \"no-store\"` юу хийдэг вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "SEO-д аль нь давуу вэ?", options: ["CSR", "SSR", "Ялгаагүй", "Аль нь ч биш"], answer: 1 },
    { q: "App Router-т default нь?", options: ["CSR", "SSR (Server Component)", "SSG", "ISR"], answer: 1 },
    { q: "useState ашиглахад юу хэрэгтэй вэ?", options: ['"use client"', '"use server"', "async", "юу ч үгүй"], answer: 0 },
    { q: "Хүсэлт бүрт шинээр татах?", options: ['cache: "no-store"', "revalidate: 3600", "default", "cache: \"force\""], answer: 0 },
    { q: "1 цаг тутам шинэчлэх?", options: ["SSG", "ISR (revalidate)", "CSR", "no-store"], answer: 1 },
    { q: "`\"use client\"`-ийг хаана тавих нь дээр вэ?", options: ["Хамгийн дээд түвшинд", "Аль болох доод (leaf) түвшинд", "Хаана ч", "layout-д"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "CSR = хөтөч дээр зурна (удаан эхэлнэ). SSR = сервер дээр (хурдан, SEO сайн).",
    "SSG = build үед нэг удаа. ISR = тогтмол хугацаанд шинэчилнэ.",
    "App Router default = Server Component.",
    "Server дээр өгөгдөл татаад, зөвхөн интерактив хэсгээ Client болго.",
    "`\"use client\"` хил зурдаг — доод түвшинд тавь.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**axios / fetch** — API-аас өгөгдөл татах хоёр аргыг харьцуулна." },
];

// ===== m4l4 — axios / fetch =====
export const m4l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`fetch` болон `axios`-ыг гүнзгий сурч, алдааг зөв барьж, Next.js-ийн кэшлэлттэй хамт ашиглаж сурна." },

  { type: "h", text: "Онол — HTTP хүсэлтийн бүтэц" },
  { type: "code", lang: "text", code: `Хүсэлт (Request)              Хариу (Response)
├── Method: GET/POST/...      ├── Status: 200/404/500
├── URL                       ├── Headers
├── Headers                   └── Body (ихэвчлэн JSON)
│   ├── Content-Type
│   └── Authorization
└── Body (POST/PUT-д)`, },

  { type: "h", text: "fetch — бэлэн, суулгах шаардлагагүй" },
  { type: "code", lang: "tsx", code: `// GET
const res = await fetch("https://api.example.com/movies");

// ⚠ fetch нь 404/500 үед ч АЛДАА ШИДДЭГГҮЙ! Гараар шалгана
if (!res.ok) {
  throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
}

const data = await res.json();   // JSON-ыг гараар задлана`, },
  { type: "code", lang: "tsx", code: `// POST
const res = await fetch("https://api.example.com/movies", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",     // заавал
    Authorization: \`Bearer \${token}\`,
  },
  body: JSON.stringify({ title: "Шинэ кино" }),   // объектыг текст болгоно
});`, },
  { type: "callout", variant: "error", title: "fetch-ийн хамгийн том занга", text: "`fetch` нь зөвхөн СҮЛЖЭЭНИЙ алдаанд (интернэт тасарсан) throw хийдэг. 404, 500 бол \"амжилттай хариу\" гэж үзнэ. `if (!res.ok) throw ...` бичихээ бүү март!" },

  { type: "h", text: "axios — илүү тав тухтай" },
  { type: "code", lang: "bash", code: `npm install axios`, },
  { type: "code", lang: "tsx", code: `import axios from "axios";

// GET — data шууд бэлэн, JSON задлах шаардлагагүй
const { data } = await axios.get("https://api.example.com/movies");

// POST — JSON.stringify хэрэггүй, Content-Type автомат
const { data } = await axios.post("https://api.example.com/movies", {
  title: "Шинэ кино",
});

// 404/500 үед АВТОМАТААР throw хийнэ
try {
  await axios.get("/api/missing");
} catch (err) {
  if (axios.isAxiosError(err)) {
    console.log(err.response?.status);    // 404
    console.log(err.response?.data);      // серверийн алдааны мессеж
  }
}`, },

  { type: "h", text: "axios instance — давхардлыг арилгах" },
  { type: "code", lang: "tsx", code: `// lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,                              // 10 сек хүлээнэ
  headers: { "Content-Type": "application/json" },
});

// Хүсэлт бүрт токен нэмэх
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// 401 ирвэл автоматаар гарах
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);`, },
  { type: "code", lang: "tsx", code: `// Ашиглах — богино, давхардалгүй
import { api } from "@/lib/api";

const { data } = await api.get("/movies");        // baseURL автомат
await api.post("/movies", { title: "Шинэ" });     // токен автомат`, },

  { type: "h", text: "Харьцуулалт" },
  { type: "code", lang: "text", code: `                        fetch              axios
Суулгах                 хэрэггүй           npm install
JSON задлах             res.json() гараар  автомат
404/500 үед throw       ✗ үгүй             ✓ тийм
Timeout                 гараар             timeout сонголт
Interceptor             ✗                  ✓
Upload progress         ✗                  ✓
Next.js кэшлэлт         ✓ дэмждэг          ✗ дэмждэггүй
Bundle хэмжээ           0 KB               ~13 KB`, },
  { type: "callout", variant: "tip", title: "Аль нь хэзээ?", text: "Server Component-д **fetch** (Next.js-ийн `revalidate`/`cache` ажилладаг). Client талд токен, interceptor хэрэгтэй бол **axios**. Жижиг төсөлд fetch хангалттай." },

  { type: "h", text: "Next.js-ийн fetch өргөтгөл" },
  { type: "code", lang: "tsx", code: `// Кэшлэх (default) — build үед нэг удаа
await fetch(url);

// Тодорхой хугацаанд шинэчлэх
await fetch(url, { next: { revalidate: 3600 } });

// Кэшлэхгүй — хүсэлт бүрт шинээр
await fetch(url, { cache: "no-store" });

// Tag-аар групплэж, гараар цэвэрлэх
await fetch(url, { next: { tags: ["movies"] } });
// Дараа нь: revalidateTag("movies")`, },

  { type: "h", text: "Дахин ашиглагдах татах функц" },
  { type: "code", lang: "ts", code: `// lib/tmdb.ts
const BASE = process.env.TMDB_BASE_URL;
const KEY = process.env.TMDB_API_KEY;

export async function tmdbFetch<T>(path: string, revalidate = 3600): Promise<T> {
  const url = \`\${BASE}\${path}\${path.includes("?") ? "&" : "?"}api_key=\${KEY}\`;

  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) {
    throw new Error(\`TMDB алдаа \${res.status}: \${res.statusText}\`);
  }

  return res.json() as Promise<T>;
}

// Ашиглах
const data = await tmdbFetch<MovieResponse>("/movie/popular");`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "fetch алдааг барихгүй өнгөрөх", text: "404 үед ч `res.ok` шалгахгүй бол `res.json()` дээр \"Unexpected token\" алдаа гарна (HTML ирсэн байх)." },
  { type: "callout", variant: "error", title: "res.json() мартах", text: "`const data = await res` — энэ бол Response объект. `await res.json()` гэж бич." },
  { type: "callout", variant: "error", title: "POST-д Content-Type өгөхгүй", text: "`headers: { \"Content-Type\": \"application/json\" }` байхгүй бол сервер body-г уншиж чадахгүй, `req.body` хоосон ирнэ." },
  { type: "callout", variant: "error", title: "body-г JSON.stringify хийхгүй", text: "`body: { title: \"x\" }` — буруу. `body: JSON.stringify({ title: \"x\" })` гэж текст болго." },
  { type: "callout", variant: "error", title: "CORS алдаа", text: "Өөр домэйн руу хүсэлт явуулахад сервер зөвшөөрөөгүй. Backend дээр `cors()` middleware нэм, эсвэл өөрийн API route-оор дамжуул (proxy)." },
  { type: "callout", variant: "warn", title: "axios нь Next.js кэшийг дэмждэггүй", text: "Server Component-д `revalidate` хэрэгтэй бол заавал `fetch` ашигла." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `fetch`-ээр нээлттэй API дуудаж console.log хий.",
    "Дунд: `if (!res.ok) throw` шалгалт нэмж алдааны мессеж харуул.",
    "Дунд: Мөн адилыг axios-оор бич, кодын уртыг харьцуул.",
    "Хүнд: `tmdbFetch` шиг дахин ашиглагдах generic функц бич.",
    "Хүнд: axios instance үүсгэж interceptor-оор токен нэмж үз.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "fetch нь 404 үед алдаа шиддэг үү? Тэгвэл яаж барих вэ?",
    "`res.json()` яагаад хэрэгтэй вэ?",
    "POST хийхэд ямар 2 зүйлийг мартаж болохгүй вэ?",
    "axios-ийн 3 давуу тал юу вэ?",
    "Interceptor юунд хэрэгтэй вэ?",
    "Server Component-д яагаад fetch илүү тохиромжтой вэ?",
    "CORS алдаа яагаад гардаг вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Аль нь суулгах шаардлагагүй вэ?", options: ["axios", "fetch", "хоёулаа", "аль нь ч биш"], answer: 1 },
    { q: "fetch-д JSON яаж авах вэ?", options: ["res.data", "await res.json()", "res.body", "res.text"], answer: 1 },
    { q: "404 үед автоматаар алдаа шиддэг нь?", options: ["fetch", "axios", "хоёулаа", "аль нь ч биш"], answer: 1 },
    { q: "Next.js-ийн revalidate ажилладаг нь?", options: ["fetch", "axios", "хоёулаа", "аль нь ч биш"], answer: 0 },
    { q: "POST body-г яаж илгээх вэ?", options: ["body: obj", "body: JSON.stringify(obj)", "data: obj", "params: obj"], answer: 1 },
    { q: "Хүсэлт бүрт токен нэмэхэд?", options: ["interceptor", "useState", "middleware", "гараар бүрд нь"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "fetch — бэлэн. `res.ok` заавал шалга, `res.json()` гараар.",
    "axios — `data` шууд, алдааг автоматаар шиднэ, interceptor-той.",
    "POST-д `Content-Type` + `JSON.stringify` хоёуланг нь бүү март.",
    "Server Component-д fetch (кэшлэлт ажиллана), Client-д axios ч болно.",
    "Дахин ашиглагдах функц бичиж давхардлыг арилга.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Promise** — асинхрон үйлдлийн үндсэн механизмыг ойлгоно." },
];

// ===== m4l5 — Promise =====
export const m4l5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Promise-ийн ажиллах зарчим, 3 төлөв, chaining, зэрэг ажиллуулах аргуудыг гүнзгий ойлгоно." },

  { type: "h", text: "Онол — Асуудал: JavaScript нэг урсгалтай" },
  { type: "p", text: "JavaScript **нэг л зүйлийг нэг мөчид** хийдэг. Хэрэв API дуудалт 2 секунд болвол тэр хугацаанд бүх зүйл зогсох ёстой юу? Үгүй — тийм учраас **асинхрон** механизм бий." },
  { type: "code", lang: "js", code: `console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");

// Гарах дараалал: 1, 3, 2
// "2" хүлээх зуур "3" ажиллав — блоклоогүй`, },

  { type: "h", text: "Promise гэж юу вэ?" },
  { type: "p", text: "**Promise** нь \"ирээдүйд утга ирнэ\" гэсэн амлалт. Одоо утга байхгүй ч, хожим ирэхэд юу хийхээ урьдчилан бичиж болно." },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Ресторанд захиалга өгөхөд шууд хоол өгдөггүй — дугаартай тасалбар өгдөг (Promise). Тасалбар нь \"хоол ирнэ\" гэсэн амлалт. Хоол бэлэн болбол дуудна (resolve), орц дууссан бол уучлаарай гэнэ (reject)." },

  { type: "h", text: "3 төлөв" },
  { type: "code", lang: "text", code: `┌─────────┐
│ Pending │  хүлээгдэж байна
└────┬────┘
     │
     ├──→ ┌───────────┐  амжилттай → .then()
     │    │ Fulfilled │
     │    └───────────┘
     │
     └──→ ┌──────────┐   алдаа → .catch()
          │ Rejected │
          └──────────┘

⚠ Нэг удаа шийдэгдвэл БУЦААХ БОЛОМЖГҮЙ`, },

  { type: "h", text: "Promise үүсгэх" },
  { type: "code", lang: "js", code: `const promise = new Promise((resolve, reject) => {
  // Энэ функц ШУУД ажиллана
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve("Амжилттай!");        // → .then() руу
    } else {
      reject(new Error("Алдаа"));   // → .catch() руу
    }
  }, 1000);
});

// Ашиглах
promise
  .then((result) => console.log(result))       // "Амжилттай!"
  .catch((err) => console.log(err.message))    // "Алдаа"
  .finally(() => console.log("Дууслаа"));      // үргэлж ажиллана`, },

  { type: "h", text: "Chaining — гинжлэх" },
  { type: "p", text: "`.then()` нь **шинэ Promise буцаадаг** тул гинжлэж болно. Дотор нь буцаасан утга дараагийн `.then()`-д орно." },
  { type: "code", lang: "js", code: `fetch("/api/user")
  .then((res) => res.json())          // Promise буцаана → дараагийнх хүлээнэ
  .then((user) => {
    console.log(user.name);
    return fetch(\`/api/posts?userId=\${user.id}\`);   // дахин Promise
  })
  .then((res) => res.json())
  .then((posts) => console.log(posts))
  .catch((err) => console.error(err));   // ДУНДАХ ЯМАР Ч алдааг барина`, },
  { type: "callout", variant: "tip", title: "catch нэг л удаа хангалттай", text: "Гинжин дэх ямар ч алдаа хамгийн ойрын `.catch()` руу очно. Тиймээс төгсгөлд нэг л `.catch()` бичвэл болно." },

  { type: "h", text: "Олон Promise зэрэг ажиллуулах" },
  { type: "code", lang: "js", code: `// 1) Promise.all — БҮГД амжилттай болохыг хүлээнэ
const [movies, genres, config] = await Promise.all([
  fetch("/api/movies").then((r) => r.json()),
  fetch("/api/genres").then((r) => r.json()),
  fetch("/api/config").then((r) => r.json()),
]);
// ⚠ Аль нэг нь unavаl БҮХЭЛДЭЭ unana

// 2) Promise.allSettled — бүгдийг хүлээнэ, унасан ч
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach((r) => {
  if (r.status === "fulfilled") console.log(r.value);
  else console.log(r.reason);
});

// 3) Promise.race — ХАМГИЙН ТҮРҮҮНД дуусахыг авна
const winner = await Promise.race([
  fetch("/api/data"),
  new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), 5000)),
]);
// timeout хэрэгжүүлэх сонгодог арга

// 4) Promise.any — ХАМГИЙН ТҮРҮҮНД АМЖИЛТТАЙ болохыг авна
const fastest = await Promise.any([server1, server2, server3]);`, },
  { type: "callout", variant: "tip", title: "Зэрэг vs дараалан", text: "3 хүсэлт тус бүр 1 секунд болвол: дараалан = 3 сек, `Promise.all` = 1 сек. Хамааралгүй хүсэлтүүдийг ЗААВАЛ зэрэг явуул." },

  { type: "h", text: "Түгээмэл занга" },
  { type: "code", lang: "js", code: `// ✗ БУРУУ — дараалан хүлээж байна (удаан)
const movies = await fetch("/api/movies").then(r => r.json());
const genres = await fetch("/api/genres").then(r => r.json());
// 2 секунд

// ✓ ЗӨВ — зэрэг
const [movies, genres] = await Promise.all([
  fetch("/api/movies").then(r => r.json()),
  fetch("/api/genres").then(r => r.json()),
]);
// 1 секунд`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Promise туршилт", code: `function App() {
  const [msg, setMsg] = useState("Товч дар...");
  const [loading, setLoading] = useState(false);

  function runSingle() {
    setLoading(true);
    setMsg("Хүлээж байна...");
    new Promise((resolve) => setTimeout(() => resolve("Бэлэн боллоо!"), 1500))
      .then((r) => setMsg(r))
      .finally(() => setLoading(false));
  }

  function runAll() {
    setLoading(true);
    setMsg("3 зүйлийг зэрэг хүлээж байна...");
    const start = Date.now();

    Promise.all([
      new Promise((r) => setTimeout(() => r("A"), 1000)),
      new Promise((r) => setTimeout(() => r("B"), 1200)),
      new Promise((r) => setTimeout(() => r("C"), 800)),
    ]).then((results) => {
      const ms = Date.now() - start;
      setMsg(\`\${results.join(", ")} — \${ms}ms (дараалан бол ~3000ms байх байсан)\`);
      setLoading(false);
    });
  }

  return (
    <div>
      <p>{msg}</p>
      <button onClick={runSingle} disabled={loading}>Нэг Promise</button>
      <button onClick={runAll} disabled={loading}>Promise.all</button>
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Promise-ийг await/then-гүй ашиглах", text: "`const data = fetch(...)` бол Promise объект, өгөгдөл биш. `console.log(data)` хийвэл `Promise { <pending> }` гарна." },
  { type: "callout", variant: "error", title: ".then() дотор return хийхгүй", text: "`.then(res => { res.json() })` — `return` байхгүй тул дараагийн `.then()`-д `undefined` очно. `.then(res => res.json())` гэж бич." },
  { type: "callout", variant: "warn", title: "Unhandled Promise Rejection", text: "`.catch()` эсвэл `try/catch` байхгүй. Бүх Promise-д алдааны боловсруулалт байх ёстой." },
  { type: "callout", variant: "error", title: "Promise.all дундаа унах", text: "Нэг нь унавал бүгд унана. Зарим нь унаж болно гэвэл `Promise.allSettled` ашигла." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын хугацааг 3 секунд болго.",
    "Дунд: `reject` дуудаж `.catch`-аар алдаа харуулдаг товч нэм.",
    "Дунд: `Promise.all` ба дараалан await хоёрын хугацааг хэмжиж харьцуул.",
    "Хүнд: `Promise.race`-ээр 5 секундын timeout хэрэгжүүл.",
    "Хүнд: `Promise.allSettled` ашиглаж зарим нь унасан ч бусдыг харуул.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "JavaScript нэг урсгалтай атлаа яаж хүлээдэг вэ?",
    "Promise-ийн 3 төлөв юу вэ?",
    "`.then()` яагаад гинжлэгддэг вэ?",
    "`Promise.all` ба `Promise.allSettled`-ийн ялгаа юу вэ?",
    "`Promise.race` юунд хэрэгтэй вэ?",
    "Хамааралгүй 3 хүсэлтийг яаж явуулах нь зөв вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Promise-ийн 3 төлөв?", options: ["start/mid/end", "pending/fulfilled/rejected", "on/off", "true/false/null"], answer: 1 },
    { q: "Амжилттай үед аль ажиллах вэ?", options: [".catch()", ".then()", ".finally()", ".error()"], answer: 1 },
    { q: "Ямар ч тохиолдолд ажиллах нь?", options: [".then()", ".catch()", ".finally()", ".always()"], answer: 2 },
    { q: "Бүгдийг зэрэг хүлээх?", options: ["Promise.all", "Promise.race", "Promise.one", "await бүрд нь"], answer: 0 },
    { q: "Зарим нь унасан ч бүгдийг авах?", options: ["Promise.all", "Promise.allSettled", "Promise.race", "Promise.any"], answer: 1 },
    { q: "Timeout хэрэгжүүлэхэд?", options: ["Promise.all", "Promise.race", "Promise.any", "setTimeout дангаар"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Promise = ирээдүйд ирэх утгын амлалт, блоклохгүй.",
    "pending → fulfilled (.then) эсвэл rejected (.catch). Буцаах боломжгүй.",
    "`.then()` шинэ Promise буцаадаг тул гинжлэгдэнэ.",
    "`Promise.all` бүгдийг зэрэг · `allSettled` унасан ч · `race` хамгийн түрүүнд.",
    "Хамааралгүй хүсэлтийг заавал зэрэг явуул.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Async / Await** — Promise-ыг илүү уншигдахуйц бичих орчин үеийн арга." },
];

// ===== m4l6 — Async / Await =====
export const m4l6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`async/await`-ыг бүрэн эзэмшиж, `try/catch`-аар алдаа барьж, зэрэг ажиллуулах загваруудыг сурна." },

  { type: "h", text: "Онол — async/await гэж юу вэ?" },
  { type: "p", text: "**async/await** бол Promise дээрх \"чихэрлэг бүрхүүл\" (syntactic sugar). Дотроо яг л Promise ажиллаж байгаа ч, код нь **синхрон код шиг** уншигдана." },
  { type: "code", lang: "js", code: `// .then() хэлбэр — гүнзгийрэх тусам уншихад хэцүү
function loadData() {
  return fetch("/api/user")
    .then((res) => res.json())
    .then((user) => {
      return fetch(\`/api/posts?userId=\${user.id}\`)
        .then((res) => res.json())
        .then((posts) => {
          return { user, posts };
        });
    })
    .catch((err) => console.error(err));
}

// async/await — дээрээс доош, энгийн уншина
async function loadData() {
  try {
    const userRes = await fetch("/api/user");
    const user = await userRes.json();

    const postsRes = await fetch(\`/api/posts?userId=\${user.id}\`);
    const posts = await postsRes.json();

    return { user, posts };
  } catch (err) {
    console.error(err);
  }
}`, },

  { type: "h", text: "Үндсэн дүрмүүд" },
  { type: "ul", items: [
    "`await` **зөвхөн `async` функц дотор** ажиллана.",
    "`async` функц **үргэлж Promise буцаана** (энгийн утга буцаасан ч).",
    "`await` нь Promise дуусахыг хүлээж, **утгыг нь шууд** өгнө.",
    "Алдааг `try/catch`-аар барина.",
    "Server Component-ыг шууд `async` болгож болно.",
  ] },
  { type: "code", lang: "js", code: `async function getNumber() {
  return 42;                    // энгийн тоо буцааж байна
}

const result = getNumber();     // Promise { 42 } — тоо БИШ!
const value = await getNumber(); // 42 ✓`, },

  { type: "h", text: "try / catch / finally" },
  { type: "code", lang: "tsx", code: `async function loadMovies() {
  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/movies");

    if (!res.ok) {
      throw new Error(\`Сервер \${res.status} буцаалаа\`);
    }

    const data = await res.json();
    setMovies(data);
  } catch (err) {
    // Алдааны төрлийг шалгах
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Тодорхойгүй алдаа");
    }
  } finally {
    setLoading(false);          // амжилттай ч, алдаатай ч ЗААВАЛ
  }
}`, },
  { type: "callout", variant: "tip", title: "finally яагаад чухал вэ?", text: "`setLoading(false)`-ыг try дотор бичвэл алдаа гарахад ажиллахгүй → spinner үүрд эргэлдэнэ. `finally`-д бичвэл ямар ч тохиолдолд ажиллана." },

  { type: "h", text: "Дараалан vs зэрэг" },
  { type: "code", lang: "js", code: `// ✗ Дараалан — удаан (нийт 3 секунд)
async function slow() {
  const a = await fetchA();     // 1 сек хүлээнэ
  const b = await fetchB();     // дараа нь 1 сек
  const c = await fetchC();     // дараа нь 1 сек
  return [a, b, c];
}

// ✓ Зэрэг — хурдан (нийт 1 секунд)
async function fast() {
  const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
  return [a, b, c];
}

// ⚠ Гэхдээ хамааралтай бол дараалан ЗӨВ
async function dependent() {
  const user = await fetchUser();              // эхлээд хэрэглэгч
  const posts = await fetchPosts(user.id);     // дараа нь түүний постууд
  return { user, posts };
}`, },

  { type: "h", text: "Давталт дотор await" },
  { type: "code", lang: "js", code: `// ✗ Удаан — нэг нэгээр нь хүлээнэ
for (const id of ids) {
  const movie = await fetchMovie(id);
  movies.push(movie);
}

// ✓ Хурдан — бүгдийг зэрэг
const movies = await Promise.all(ids.map((id) => fetchMovie(id)));

// ⚠ forEach дотор await АЖИЛЛАХГҮЙ!
ids.forEach(async (id) => {
  const m = await fetchMovie(id);   // forEach хүлээхгүй
});
console.log("Дууслаа");             // хүсэлт дуусахаас өмнө хэвлэгдэнэ`, },
  { type: "callout", variant: "error", title: "forEach + async = алдаа", text: "`forEach` нь Promise-ыг хүлээдэггүй. `for...of` давталт (дараалан) эсвэл `Promise.all(map)` (зэрэг) ашигла." },

  { type: "h", text: "Server Component-д" },
  { type: "code", lang: "tsx", code: `// app/movies/page.tsx — component өөрөө async
export default async function MoviesPage() {
  const movies = await getMovies();       // шууд await
  return <MovieGrid movies={movies} />;
}

// ⚠ Client Component-ыг async болгож БОЛОХГҮЙ
"use client";
export default async function Bad() {    // ✗ ажиллахгүй
  const data = await fetch(...);
}
// Client-д useEffect эсвэл SWR ашигла`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "await is only valid in async functions", text: "`await` ашиглаж буй функцээ `async` болго: `async function load() {...}`." },
  { type: "callout", variant: "error", title: "await мартах", text: "`const data = res.json()` бол Promise. `await res.json()` гэж бич. Console-д `Promise { <pending> }` гарвал энэ алдаа." },
  { type: "callout", variant: "error", title: "Client Component-ыг async болгох", text: "`\"use client\"` + `async function` = ажиллахгүй. Client-д `useEffect` эсвэл SWR ашигла." },
  { type: "callout", variant: "warn", title: "Хамааралгүй хүсэлтийг дараалан await хийх", text: "3 дахин удаан болно. `Promise.all` ашигла." },
  { type: "callout", variant: "error", title: "Алдааг барихгүй", text: "`try/catch` байхгүй бол алдаа гарахад бүх апп унана. Заавал ороо." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `.then()` хэлбэрээр бичсэн кодыг async/await болгож хөрвүүл.",
    "Дунд: `try/catch/finally` нэмж loading, error төлөвийг зөв удирд.",
    "Дунд: 2 хамааралгүй хүсэлтийг `Promise.all`-оор зэрэг явуул.",
    "Хүнд: `forEach` дотор `await` бичээд юу болохыг ажигла, дараа нь зас.",
    "Хүнд: `res.ok` шалгаад тодорхой алдааны мессеж шиддэг болго.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "`await` хаана ажиллах вэ?",
    "`async` функц юу буцаадаг вэ?",
    "`finally` яагаад чухал вэ?",
    "Хамааралгүй хүсэлтийг яаж явуулах нь зөв вэ?",
    "`forEach` дотор `await` яагаад ажиллахгүй вэ?",
    "Client Component-ыг async болгож болох уу? Тэгвэл яаж татах вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "await хаана ажиллах вэ?", options: ["Хаана ч", "async функц дотор", "Зөвхөн сервер", "Component дотор"], answer: 1 },
    { q: "async функц юу буцаадаг вэ?", options: ["Утга", "Promise", "undefined", "Массив"], answer: 1 },
    { q: "Алдааг юугаар барих вэ?", options: ["if/else", "try/catch", "switch", "while"], answer: 1 },
    { q: "Хамааралгүй 3 хүсэлтийг?", options: ["дараалан await", "Promise.all", "forEach", "setTimeout"], answer: 1 },
    { q: "`forEach(async ...)` юу болох вэ?", options: ["Зөв ажиллана", "Хүлээхгүй өнгөрнө", "Алдаа өгнө", "Удаан ажиллана"], answer: 1 },
    { q: "loading-ыг false болгохыг хаана бичих вэ?", options: ["try дотор", "catch дотор", "finally дотор", "гадна"], answer: 2 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "async/await = Promise-ийн уншихад хялбар бичлэг.",
    "`await` зөвхөн `async` дотор. `async` үргэлж Promise буцаана.",
    "`try/catch/finally` — `finally`-д цэвэрлэгээ (loading false).",
    "Хамааралгүй бол `Promise.all`, хамааралтай бол дараалан.",
    "`forEach` + `await` ажиллахгүй — `for...of` эсвэл `Promise.all(map)`.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**SWR** — өгөгдлийг ухаалаг татаж, кэшлэн, автоматаар шинэчилдэг сан." },
];

// ===== m4l7 — SWR =====
export const m4l7: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "SWR-ийн кэшлэлт, автомат шинэчлэлт, mutate, optimistic update зэрэг боломжийг эзэмшинэ." },

  { type: "h", text: "Онол — Гараар бичихэд юу болдог вэ?" },
  { type: "code", lang: "tsx", code: `// useState + useEffect гараар — 30 мөр, олон дутагдалтай
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  let cancelled = false;
  setLoading(true);
  fetch(url)
    .then((r) => r.json())
    .then((d) => { if (!cancelled) setData(d); })
    .catch((e) => { if (!cancelled) setError(e.message); })
    .finally(() => { if (!cancelled) setLoading(false); });
  return () => { cancelled = true; };
}, [url]);

// Дутагдал:
// ✗ Кэш байхгүй — хуудас солиход дахин татна
// ✗ 2 component ижил өгөгдөл авбал 2 хүсэлт явна
// ✗ Таб руу буцахад хуучин өгөгдөл харагдана
// ✗ Гараар шинэчлэх боломжгүй`, },

  { type: "h", text: "SWR — шийдэл" },
  { type: "p", text: "**SWR** = *Stale-While-Revalidate*. HTTP кэшийн стратеги: **хуучин (stale) өгөгдлийг ШУУД харуулаад, ард нь шинийг татаж (revalidate) солино**. Хэрэглэгч хүлээхгүй." },
  { type: "code", lang: "bash", code: `npm install swr`, },
  { type: "code", lang: "tsx", code: `"use client";
import useSWR from "swr";

// fetcher — өгөгдөл яаж татахыг заана (нэг л удаа бичнэ)
const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) throw new Error("Татаж чадсангүй");
  return r.json();
});

export default function Movies() {
  const { data, error, isLoading, mutate } = useSWR("/api/movies", fetcher);

  if (isLoading) return <p>Уншиж байна...</p>;
  if (error) return <p>Алдаа: {error.message}</p>;

  return (
    <div>
      <ul>{data.map((m) => <li key={m.id}>{m.title}</li>)}</ul>
      <button onClick={() => mutate()}>Шинэчлэх</button>
    </div>
  );
}`, },

  { type: "h", text: "Автоматаар юу хийдэг вэ?" },
  { type: "ul", items: [
    "**Кэшлэнэ** — ижил key-тэй дуудлага кэшээс шууд харагдана.",
    "**Давхардлыг арилгана** — 5 component ижил key дуудвал 1 л хүсэлт явна.",
    "**Таб руу буцахад шинэчилнэ** (`revalidateOnFocus`).",
    "**Интернэт эргэж холбогдоход шинэчилнэ** (`revalidateOnReconnect`).",
    "**Алдаа гарвал дахин оролдоно** (exponential backoff).",
  ] },

  { type: "h", text: "Key — кэшийн түлхүүр" },
  { type: "code", lang: "tsx", code: `// Энгийн
useSWR("/api/movies", fetcher);

// Параметртэй — key өөрчлөгдөхөд автоматаар дахин татна
useSWR(\`/api/movies?page=\${page}\`, fetcher);

// Нөхцөлтэй — null бол ТАТАХГҮЙ
useSWR(userId ? \`/api/users/\${userId}\` : null, fetcher);
//     ^^^^^^ userId байхгүй бол хүсэлт явуулахгүй

// Массив key — олон параметр
useSWR(["/api/movies", page, genre], ([url, p, g]) =>
  fetch(\`\${url}?page=\${p}&genre=\${g}\`).then((r) => r.json())
);`, },
  { type: "callout", variant: "tip", title: "Conditional fetching", text: "`useSWR(cond ? key : null)` бол маш хэрэгтэй загвар. Hook-ыг нөхцөлтэйгээр дуудаж болохгүй ч key-г null болгож татахыг зогсоож болно." },

  { type: "h", text: "mutate — гараар шинэчлэх" },
  { type: "code", lang: "tsx", code: `const { data, mutate } = useSWR("/api/todos", fetcher);

// 1) Дахин татах
await mutate();

// 2) Optimistic update — UI шууд шинэчлээд, ард нь сервер рүү
async function addTodo(text: string) {
  const newTodo = { id: "temp", text, done: false };

  await mutate(
    async () => {
      await fetch("/api/todos", { method: "POST", body: JSON.stringify({ text }) });
      return fetch("/api/todos").then((r) => r.json());   // шинэ жагсаалт
    },
    {
      optimisticData: [...data, newTodo],   // ШУУД харагдана
      rollbackOnError: true,                 // алдвал буцаана
      revalidate: true,
    }
  );
}`, },
  { type: "code", lang: "tsx", code: `// 3) Глобал mutate — өөр component-оос
import { mutate } from "swr";

await mutate("/api/todos");                    // тодорхой key
await mutate((key) => typeof key === "string" && key.startsWith("/api/todos"));`, },

  { type: "h", text: "Тохиргоо" },
  { type: "code", lang: "tsx", code: `useSWR("/api/movies", fetcher, {
  refreshInterval: 5000,          // 5 сек тутам автоматаар
  revalidateOnFocus: false,       // таб руу буцахад шинэчлэхгүй
  dedupingInterval: 2000,         // 2 сек дотор ижил хүсэлтийг нэгтгэнэ
  errorRetryCount: 3,             // 3 удаа дахин оролдоно
  fallbackData: [],               // эхний утга (loading харуулахгүй)
});`, },
  { type: "code", lang: "tsx", code: `// Глобал тохиргоо — app/providers.tsx
import { SWRConfig } from "swr";

<SWRConfig value={{
  fetcher: (url) => fetch(url).then((r) => r.json()),
  revalidateOnFocus: false,
}}>
  {children}
</SWRConfig>

// Дараа нь fetcher бичих шаардлагагүй
const { data } = useSWR("/api/movies");`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Cannot read properties of undefined", text: "Эхний render дээр `data` нь `undefined`. `isLoading` шалгаж байж `data.map()` дууд, эсвэл `fallbackData: []` өг." },
  { type: "callout", variant: "error", title: '"use client" мартах', text: "`useSWR` бол hook — Client Component дотор л ажиллана." },
  { type: "callout", variant: "error", title: "fetcher алдаа шиддэггүй", text: "`fetch` нь 404 үед throw хийдэггүй тул SWR-ийн `error` хоосон үлдэнэ. Fetcher дотор `if (!r.ok) throw` бич." },
  { type: "callout", variant: "warn", title: "Хэт олон хүсэлт явж байна", text: "`revalidateOnFocus` анхдагчаар `true`. Таб солих бүрт татна. Хэрэггүй бол `false` болго." },
  { type: "callout", variant: "warn", title: "Key өөрчлөгдөхгүй тул шинэчлэгдэхгүй", text: "`useSWR(\"/api/movies\")` гэж хатуу бичээд page өөрчлөгдвөл татахгүй. Key-д хувьсагчаа оруул: `` `/api/movies?page=${page}` ``." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: SWR-ийн 4 буцаах утгыг (data, error, isLoading, mutate) нэрлэ.",
    "Дунд: Loading болон error төлөвт өөр UI харуул.",
    "Дунд: `mutate()`-тэй \"Шинэчлэх\" товч хий.",
    "Хүнд: Хуудаслалт хийж key-д `page`-ыг оруул.",
    "Хүнд: `optimisticData`-тай нэмэх үйлдэл хэрэгжүүл.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "SWR-ийн нэрний утга юу вэ, ямар стратеги вэ?",
    "Гараар useEffect бичихэд ямар 4 дутагдал байдаг вэ?",
    "Key юунд хэрэглэгддэг вэ?",
    "Conditional fetching яаж хийх вэ?",
    "`mutate()` юу хийдэг вэ?",
    "Optimistic update гэж юу вэ, ямар давуу талтай вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "SWR-ийн утга нь?", options: ["Server Web Render", "Stale-While-Revalidate", "Simple Web Request", "Static Web Route"], answer: 1 },
    { q: "useSWR юу буцаадаг вэ?", options: ["Зөвхөн data", "data, error, isLoading, mutate", "Promise", "HTML"], answer: 1 },
    { q: "SWR ямар component-д ажиллах вэ?", options: ["Server", "Client", "Хоёулаа", "Аль нь ч биш"], answer: 1 },
    { q: "Татахыг зогсооход key-г яах вэ?", options: ["хоосон текст", "null", "undefined", "0"], answer: 1 },
    { q: "UI-г шууд шинэчлээд ард нь сервер рүү явуулах?", options: ["refreshInterval", "optimisticData", "fallbackData", "dedupingInterval"], answer: 1 },
    { q: "fetcher дотор яагаад throw хийх ёстой вэ?", options: ["Хурдан болно", "Үгүй бол error хоосон үлдэнэ", "Заавал биш", "Кэш цэвэрлэнэ"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "SWR = кэшлэсэнийг шууд харуулаад ард нь шинэчилнэ.",
    "`useSWR(key, fetcher)` → data, error, isLoading, mutate.",
    "Key өөрчлөгдөхөд автоматаар дахин татна. `null` бол татахгүй.",
    "`mutate()` гараар шинэчилнэ, `optimisticData` шууд харагдуулна.",
    "Fetcher дотор `if (!r.ok) throw` заавал.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Meta tag** — SEO болон нийгмийн сүлжээнд зөв харагдах тохиргоо." },
];

// ===== m4l8 — Meta tag =====
export const m4l8: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Metadata API-аар SEO, Open Graph, дүрс, sitemap зэргийг тохируулж, динамик гарчиг үүсгэж сурна." },

  { type: "h", text: "Онол — Meta tag юунд нөлөөлдөг вэ?" },
  { type: "code", lang: "text", code: `Google хайлтын үр дүнд:
┌────────────────────────────────────────┐
│ Fight Club | MovieApp          ← title │
│ movieapp.com/movies/550                │
│ Нэг сэтгэл ханамжгүй ажилтан... ← desc │
└────────────────────────────────────────┘

Facebook/Twitter-т хуваалцахад:
┌────────────────────────────────────────┐
│ [       ЗУРАГ (og:image)          ]    │
│ Fight Club | MovieApp     ← og:title   │
│ Нэг сэтгэл ханамжгүй...   ← og:desc    │
└────────────────────────────────────────┘`, },

  { type: "h", text: "Статик metadata" },
  { type: "code", lang: "tsx", code: `// app/movies/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кинонууд | MovieApp",
  description: "Хамгийн шинэ, шилдэг кинонуудын жагсаалт.",
  keywords: ["кино", "movie", "шинэ кино"],

  openGraph: {
    title: "Кинонууд",
    description: "Шилдэг кинонууд",
    images: [{ url: "/og-movies.png", width: 1200, height: 630 }],
    type: "website",
    locale: "mn_MN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Кинонууд",
    images: ["/og-movies.png"],
  },
};

export default function Page() {
  return <h1>Кинонууд</h1>;
}`, },
  { type: "callout", variant: "tip", title: "og:image хэмжээ", text: "1200×630 px нь стандарт (Facebook, Twitter, LinkedIn бүгд дэмждэг). Заавал БҮТЭН URL байх шаардлагатай зарим платформд — `metadataBase` тохируулбал Next.js өөрөө бүтэн болгоно." },

  { type: "h", text: "Root layout-д ерөнхий тохиргоо" },
  { type: "code", lang: "tsx", code: `// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://movieapp.com"),   // харьцангуй замыг бүтэн болгоно

  title: {
    default: "MovieApp",              // хуудсанд title байхгүй бол
    template: "%s | MovieApp",        // хуудсанд байвал: "Кинонууд | MovieApp"
  },

  description: "Киноны мэдээллийн сан",
  icons: { icon: "/favicon.ico", apple: "/apple-icon.png" },

  robots: { index: true, follow: true },
};`, },
  { type: "code", lang: "tsx", code: `// Дэд хуудсанд — template автоматаар хэрэглэгдэнэ
export const metadata: Metadata = {
  title: "Кинонууд",        // → "Кинонууд | MovieApp"
};`, },

  { type: "h", text: "generateMetadata — динамик" },
  { type: "code", lang: "tsx", code: `// app/movies/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(\`https://api.example.com/movies/\${id}\`);
  if (!res.ok) return { title: "Кино олдсонгүй" };

  const movie = await res.json();

  return {
    title: movie.title,                              // template хэрэглэгдэнэ
    description: movie.overview?.slice(0, 160),      // 160 тэмдэгт хангалттай
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [\`https://image.tmdb.org/t/p/w1280\${movie.backdrop_path}\`],
    },
  };
}

export default async function MoviePage({ params }) {
  const { id } = await params;
  // ...
}`, },
  { type: "callout", variant: "tip", title: "Хоёр удаа fetch хийхгүй", text: "`generateMetadata` болон `page` хоёулаа ижил URL-ыг `fetch` хийвэл Next.js автоматаар кэшлэж НЭГ л хүсэлт явуулна. Санаа зовох хэрэггүй." },

  { type: "h", text: "Динамик OG зураг" },
  { type: "code", lang: "tsx", code: `// app/movies/[id]/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);

  return new ImageResponse(
    (
      <div style={{
        display: "flex", width: "100%", height: "100%",
        alignItems: "center", justifyContent: "center",
        background: "#111", color: "white", fontSize: 64,
      }}>
        {movie.title}
      </div>
    ),
    size,
  );
}`, },

  { type: "h", text: "sitemap ба robots" },
  { type: "code", lang: "ts", code: `// app/sitemap.ts
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const movies = await getAllMovies();

  return [
    { url: "https://movieapp.com", lastModified: new Date(), priority: 1 },
    ...movies.map((m) => ({
      url: \`https://movieapp.com/movies/\${m.id}\`,
      lastModified: new Date(m.updatedAt),
      priority: 0.8,
    })),
  ];
}`, },
  { type: "code", lang: "ts", code: `// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin/" },
    sitemap: "https://movieapp.com/sitemap.xml",
  };
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Client Component-д metadata бичих", text: "`metadata` зөвхөн Server Component-д ажиллана. `\"use client\"` бичсэн файлд огт нөлөөлөхгүй, чимээгүй үл тоомсорлогдоно." },
  { type: "callout", variant: "error", title: "OG зураг харагдахгүй", text: "Харьцангуй зам ашигласан. `metadataBase` тохируул, эсвэл бүтэн URL (`https://...`) бич." },
  { type: "callout", variant: "warn", title: "Description хэт урт", text: "Google 150-160 тэмдэгт л харуулна. Урт бол тасарна. `.slice(0, 160)` хий." },
  { type: "callout", variant: "warn", title: "Facebook хуучин зураг харуулж байна", text: "Тэдний кэш. Facebook Sharing Debugger дээр \"Scrape Again\" дар." },
  { type: "callout", variant: "error", title: "generateMetadata-д params await хийхгүй", text: "Next.js 15-д `params` нь Promise. `const { id } = await params;`." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Нүүр хуудсандаа title, description нэм.",
    "Дунд: Root layout-д `template: \"%s | MyApp\"` тохируул.",
    "Дунд: `openGraph.images` нэмж хуваалцахад зураг гарахыг шалга.",
    "Хүнд: Dynamic хуудсанд `generateMetadata` бичиж туршиж үз.",
    "Хүнд: `sitemap.ts` үүсгэж бүх хуудсаа оруул.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Meta tag хаана нөлөөлдөг вэ (2 газар)?",
    "`title.template` юу хийдэг вэ?",
    "`metadataBase` юунд хэрэгтэй вэ?",
    "Динамик гарчигт юу ашиглах вэ?",
    "`generateMetadata` болон `page` хоёулаа fetch хийвэл 2 хүсэлт явах уу?",
    "OG зургийн стандарт хэмжээ юу вэ?",
    "`metadata` Client Component-д ажиллах уу?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Meta tag юунд хэрэгтэй вэ?", options: ["SEO ба хуваалцалт", "State хадгалах", "Routing", "CSS"], answer: 0 },
    { q: "Динамик гарчигт юу ашиглах вэ?", options: ["metadata", "generateMetadata", "useState", "Head"], answer: 1 },
    { q: "metadata аль component-д ажиллах вэ?", options: ["Client", "Server", "Хоёулаа", "Аль нь ч биш"], answer: 1 },
    { q: "OG зургийн стандарт хэмжээ?", options: ["800×600", "1200×630", "1920×1080", "500×500"], answer: 1 },
    { q: "Харьцангуй замыг бүтэн болгох тохиргоо?", options: ["baseUrl", "metadataBase", "publicUrl", "siteUrl"], answer: 1 },
    { q: "Description хэдэн тэмдэгт байх нь зохимжтой вэ?", options: ["50", "150-160", "500", "хязгааргүй"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`metadata` — статик, `generateMetadata` — динамик.",
    "Root layout-д `template` тохируулбал дэд хуудсууд автоматаар нэрлэгдэнэ.",
    "`metadataBase` — OG зургийн харьцангуй замыг бүтэн болгоно.",
    "OG зураг 1200×630. Description 160 тэмдэгт.",
    "Зөвхөн Server Component-д ажиллана.",
    "`sitemap.ts`, `robots.ts`-ээр SEO-г бүрэн болгоно.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**TypeScript** — API-ийн хариуг төрөлжүүлж алдаанаас сэргийлнэ." },
];

// ===== m4l9 — TypeScript =====
export const m4l9: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "API хариуг төрөлжүүлж, `any`-гүй аюулгүй код бичиж, generic, utility type ашиглаж сурна." },

  { type: "h", text: "Онол — Яагаад TypeScript?" },
  { type: "code", lang: "js", code: `// JavaScript — алдаа зөвхөн АЖИЛЛУУЛАХАД мэдэгдэнэ
const movie = await getMovie();
console.log(movie.titel);      // ← үсгийн алдаа, undefined гарна
movie.rating.toFixed(1);       // ← rating байхгүй бол апп унана`, },
  { type: "code", lang: "ts", code: `// TypeScript — алдаа БИЧИЖ БАЙХАД мэдэгдэнэ
const movie: Movie = await getMovie();
console.log(movie.titel);      // ✗ Property 'titel' does not exist. Did you mean 'title'?
movie.vote_average.toFixed(1); // ✓ автомат санамж ажиллана`, },

  { type: "h", text: "API-ийн хариуг тодорхойлох" },
  { type: "code", lang: "ts", code: `// types/movie.ts
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;      // байхгүй ч байж болно
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

// API-ийн БҮРЭН хариу (хуудаслалттай)
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Дэлгэрэнгүй хуудсанд илүү талбар ирдэг
export interface MovieDetail extends Movie {
  runtime: number;
  budget: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
}`, },

  { type: "h", text: "interface vs type" },
  { type: "code", lang: "ts", code: `// interface — объектын бүтэц, өргөтгөж болно
interface User { id: string; name: string }
interface Admin extends User { role: "admin" }

// type — union, intersection, primitive alias
type Status = "loading" | "success" | "error";     // union
type ID = string | number;
type UserWithRole = User & { role: string };       // intersection

// Функцийн төрөл
type Handler = (id: string) => void;`, },
  { type: "callout", variant: "tip", title: "Аль нь хэзээ?", text: "Объектод `interface` (өргөтгөх боломжтой, алдааны мессеж ойлгомжтой). Union, тооцоолсон төрөлд `type`. Багийн стандартаа дага." },

  { type: "h", text: "null ба undefined-ыг зөв удирдах" },
  { type: "code", lang: "tsx", code: `// poster_path нь null байж болно
interface Movie { poster_path: string | null }

// ✗ БУРУУ — null үед эвдэрнэ
<img src={\`https://image.tmdb.org/t/p/w500\${movie.poster_path}\`} />

// ✓ ЗӨВ — ?? оператор (null/undefined үед орлуулна)
const poster = movie.poster_path
  ? \`https://image.tmdb.org/t/p/w500\${movie.poster_path}\`
  : "/placeholder.png";

// Optional chaining — байхгүй бол undefined
const companyName = movie.production_companies?.[0]?.name ?? "Тодорхойгүй";`, },
  { type: "code", lang: "ts", code: `// ?? vs ||  — чухал ялгаа!
const a = 0 || 10;      // 10  (0 бол falsy тул орлуулав) ← БУРУУ байж магадгүй
const b = 0 ?? 10;      // 0   (зөвхөн null/undefined үед орлуулна) ✓

const c = "" || "хоосон";   // "хоосон"
const d = "" ?? "хоосон";   // ""`, },

  { type: "h", text: "Generic — дахин ашиглагдах төрөл" },
  { type: "code", lang: "ts", code: `// T бол "ямар ч төрөл" гэсэн орлуулагч
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<T>;
}

// Ашиглахдаа төрлөө заана
const movies = await fetchJson<MovieResponse>("/api/movies");
const user = await fetchJson<User>("/api/user");
//    ^^^^ TypeScript мэднэ: user.name байна, user.title байхгүй`, },

  { type: "h", text: "Хэрэгтэй utility type-ууд" },
  { type: "code", lang: "ts", code: `interface Movie { id: number; title: string; overview: string; rating: number }

// Бүх талбарыг сонголттой болгох
type PartialMovie = Partial<Movie>;
// { id?: number; title?: string; ... }

// Зөвхөн зарим талбарыг сонгох
type MovieCard = Pick<Movie, "id" | "title">;
// { id: number; title: string }

// Зарим талбарыг хасах
type MovieWithoutId = Omit<Movie, "id">;

// Бүгдийг заавал болгох
type RequiredMovie = Required<PartialMovie>;

// Өөрчлөх боломжгүй болгох
type FrozenMovie = Readonly<Movie>;

// Объектын түлхүүрүүд
type MovieKey = keyof Movie;   // "id" | "title" | "overview" | "rating"`, },

  { type: "h", text: "any-аас зайлсхийх" },
  { type: "code", lang: "ts", code: `// ✗ БУРУУ — TypeScript-ийн бүх ашгийг устгана
function process(data: any) {
  return data.whatever.anything;    // алдаа шалгагдахгүй
}

// ✓ ЗӨВ — unknown ашиглаад шалга
function process(data: unknown) {
  if (typeof data === "object" && data !== null && "title" in data) {
    return (data as { title: string }).title;
  }
  throw new Error("Буруу өгөгдөл");
}

// ✓ ХАМГИЙН ЗӨВ — Zod-оор ажиллах үед шалга
import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
});

const movie = movieSchema.parse(await res.json());   // буруу бол throw`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "any ашиглах", text: "`any` бол \"TypeScript-ыг унтраа\" гэсэн үг. Мэдэхгүй бол `unknown` ашиглаад шалгаж хөрвүүл." },
  { type: "callout", variant: "error", title: "Object is possibly 'null'", text: "`string | null` төрлийг шууд ашиглаж болохгүй. `?.`, `??`, эсвэл `if (x)` шалгалт нэм." },
  { type: "callout", variant: "error", title: "Property does not exist on type", text: "Interface-д тэр талбар зарлагдаагүй, эсвэл үсгийн алдаа. API-ийн бодит хариуг console.log хийж шалга." },
  { type: "callout", variant: "warn", title: "`||` ба `??` андуурах", text: "`count || 10` — count нь 0 бол 10 болно (магадгүй буруу). `count ?? 10` — зөвхөн null/undefined үед." },
  { type: "callout", variant: "error", title: "as-аар хүчээр хөрвүүлэх", text: "`data as Movie` нь ажиллах үед шалгагддаггүй — зөвхөн TypeScript-ыг \"хуурч\" байна. Бодит баталгаа хэрэгтэй бол Zod ашигла." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `Movie` interface-д `runtime?: number` нэм.",
    "Дунд: `Genre` interface үүсгэж `Movie` дотор массив болгон нэм.",
    "Дунд: `type Status = \"loading\" | \"success\" | \"error\"` union бичиж ашигла.",
    "Хүнд: `fetchJson<T>` generic функц бичиж 2 өөр төрлөөр дууд.",
    "Хүнд: `Pick`, `Omit` ашиглаж `MovieCard`, `MovieForm` төрөл гарга.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "TypeScript-ийн гол давуу тал юу вэ?",
    "`interface` ба `type` хэзээ алийг ашиглах вэ?",
    "`string | null` төрлийг яаж аюулгүй ашиглах вэ?",
    "`||` ба `??`-ийн ялгаа юу вэ?",
    "Generic (`<T>`) юунд хэрэгтэй вэ?",
    "`any` ба `unknown`-ийн ялгаа юу вэ?",
    "`as` хөрвүүлэлт ажиллах үед шалгагддаг уу?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "TypeScript-ийн гол давуу тал?", options: ["Хурдан ажиллана", "Алдааг эрт илрүүлнэ", "CSS сайжирна", "Сервер хэрэггүй"], answer: 1 },
    { q: "`string | null` юу гэсэн үг вэ?", options: ["Заавал текст", "Текст эсвэл хоосон", "Тоо", "Массив"], answer: 1 },
    { q: "Аль нь муу практик вэ?", options: ["interface", "type", "any", "unknown"], answer: 2 },
    { q: "`0 ?? 10` юу буцаах вэ?", options: ["0", "10", "null", "алдаа"], answer: 0 },
    { q: "Зарим талбарыг сонгох utility?", options: ["Partial", "Pick", "Omit", "Required"], answer: 1 },
    { q: "Ажиллах үед баталгаажуулахад юу ашиглах вэ?", options: ["as", "any", "Zod", "interface"], answer: 2 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`interface`-ээр API хариуг тодорхойлно. `?` сонголттой, `| null` хоосон байж болно.",
    "`??` зөвхөн null/undefined үед, `||` бүх falsy утганд.",
    "Generic `<T>` дахин ашиглагдах функц бичихэд.",
    "`Partial`, `Pick`, `Omit` — хэрэгтэй utility type.",
    "`any`-аас зайлсхий. `unknown` + шалгалт, эсвэл Zod ашигла.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**SearchParams** — URL-ийн query-ээр хайлт, шүүлт, хуудаслалт хийнэ." },
];

// ===== m4l10 — SearchParams =====
export const m4l10: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "URL query параметрээр хайлт, шүүлт, хуудаслалтын төлөвийг удирдаж, debounce хэрэгжүүлж сурна." },

  { type: "h", text: "Онол — Яагаад URL-д хадгалах вэ?" },
  { type: "code", lang: "text", code: `Хайлтыг useState-д хадгалвал:
✗ Холбоос хуваалцаж болохгүй (найз чинь хоосон хуудас харна)
✗ Хуудас сэргээхэд алга болно
✗ Буцах товч ажиллахгүй
✗ Хавчуурга (bookmark) хийж болохгүй

URL-д хадгалвал (?q=batman&page=2):
✓ Холбоосыг хуваалцаж болно
✓ Сэргээхэд хэвээрээ
✓ Буцах товч зөв ажиллана
✓ Хавчуурга хийж болно
✓ Google индексжүүлж чадна`, },

  { type: "h", text: "Server Component-д унших" },
  { type: "code", lang: "tsx", code: `// app/search/page.tsx
// ⚠ Next.js 15-д searchParams нь Promise
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; genre?: string }>;
}) {
  const { q = "", page = "1", genre } = await searchParams;

  // Сервер дээр шууд хайлт хийнэ
  const results = q ? await searchMovies(q, Number(page), genre) : null;

  return (
    <div>
      <h1>Хайлт: {q || "—"}</h1>
      {results && <MovieGrid movies={results.results} />}
    </div>
  );
}`, },
  { type: "callout", variant: "tip", title: "Server талд хайх нь илүү", text: "Хайлтыг сервер дээр хийвэл: API key нууц үлдэнэ, үр дүн SEO-д индексжинэ, хэрэглэгч шууд бэлэн HTML авна." },

  { type: "h", text: "Client Component-д унших ба өөрчлөх" },
  { type: "code", lang: "tsx", code: `"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = searchParams.get("q") ?? "";

  function updateQuery(key: string, value: string) {
    // Одоогийн параметрүүдээс хуулбар үүсгэнэ
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);          // хоосон бол URL-ээс хасна
    }

    if (key !== "page") {
      params.set("page", "1");     // шүүлт өөрчлөгдвөл 1-р хуудас руу
    }

    router.push(\`\${pathname}?\${params.toString()}\`);
  }

  return (
    <input
      defaultValue={q}
      onChange={(e) => updateQuery("q", e.target.value)}
      placeholder="Кино хайх..."
    />
  );
}`, },

  { type: "h", text: "Debounce — товч бүрт хүсэлт явуулахгүй" },
  { type: "p", text: "Дээрх код нь товч дарах БҮРТ URL шинэчилж, хүсэлт явуулна. \"batman\" бичихэд 6 хүсэлт! **Debounce** нь хэрэглэгч бичихээ болих хүртэл хүлээдэг." },
  { type: "code", lang: "tsx", code: `"use client";
import { useState, useEffect } from "react";

export default function SearchBox() {
  const [text, setText] = useState(q);

  useEffect(() => {
    // 400ms хүлээгээд л шинэчилнэ
    const timer = setTimeout(() => {
      updateQuery("q", text);
    }, 400);

    // Хэрэглэгч дахин бичвэл өмнөх timer цуцлагдана
    return () => clearTimeout(timer);
  }, [text]);

  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}`, },
  { type: "code", lang: "text", code: `Debounce-гүй:  b→хүсэлт a→хүсэлт t→хүсэлт m→хүсэлт a→хүсэлт n→хүсэлт  (6)
Debounce-тэй:  b a t m a n ...400ms чимээгүй... →хүсэлт              (1)`, },

  { type: "h", text: "Хуудаслалт" },
  { type: "code", lang: "tsx", code: `"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? 1);

  function goTo(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(\`\${pathname}?\${params.toString()}\`);
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => goTo(page - 1)} disabled={page <= 1}>
        Өмнөх
      </button>
      <span>{page} / {totalPages}</span>
      <button onClick={() => goTo(page + 1)} disabled={page >= totalPages}>
        Дараах
      </button>
    </div>
  );
}`, },

  { type: "h", text: "Suspense — build алдаанаас сэргийлэх" },
  { type: "code", lang: "tsx", code: `// useSearchParams ашигладаг component-ыг Suspense-д ороо
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Ачаалж байна...</div>}>
      <SearchBox />
    </Suspense>
  );
}`, },
  { type: "callout", variant: "error", title: "useSearchParams() should be wrapped in a suspense boundary", text: "Build хийхэд гардаг түгээмэл алдаа. `useSearchParams` ашигладаг component-ыг `<Suspense>` дотор ороо." },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "searchParams-ыг await хийхгүй", text: "Next.js 15-д `searchParams` нь Promise. `const { q } = await searchParams;`." },
  { type: "callout", variant: "error", title: "Тусгай тэмдэгт URL-ыг эвдэх", text: "Хайлтад `&`, `?`, зай байвал URL эвдэрнэ. `encodeURIComponent(q)` эсвэл `URLSearchParams` (өөрөө encode хийдэг) ашигла." },
  { type: "callout", variant: "warn", title: "Хайх бүрт хуудас 1 болохгүй", text: "5-р хуудсанд байхад шинэ хайлт хийвэл 5-р хуудсанд үлдэж хоосон харагдана. Шүүлт өөрчлөгдөхөд `page=1` болго." },
  { type: "callout", variant: "warn", title: "input-д value={q} өгөх", text: "URL-ээс уншсан утгыг `value`-д өгвөл бичихэд саад болно (debounce-тэй бол). `defaultValue` эсвэл тусдаа local state ашигла." },
  { type: "callout", variant: "error", title: "Debounce-гүй хайлт", text: "Товч бүрт API дуудна — rate limit-д хүрч 429 алдаа гарна. `setTimeout` + `clearTimeout` ашигла." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `/search?q=batman` руу орж `q`-г дэлгэцэд харуул.",
    "Дунд: `page` параметр нэмж хуудаслалт хий.",
    "Дунд: `genre` шүүлтүүр нэмж, солиход `page=1` болгодог болго.",
    "Хүнд: 400ms debounce хэрэгжүүлж хүсэлтийн тоог багасга.",
    "Хүнд: `<Suspense>`-ээр ороож build алдаанаас сэргийл.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Яагаад хайлтыг URL-д хадгалах нь дээр вэ (4 шалтгаан)?",
    "Server талд `searchParams`-ыг яаж авах вэ?",
    "Client талд юугаар унших вэ?",
    "`URLSearchParams` яагаад хэрэгтэй вэ?",
    "Debounce гэж юу вэ, яаж хэрэгжүүлэх вэ?",
    "Шүүлт өөрчлөгдөхөд `page`-ыг яах ёстой вэ?",
    "`useSearchParams`-ыг яагаад Suspense-д ороодог вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "`?q=batman` доторх q юу вэ?", options: ["Dynamic route", "Search param", "Хавтас", "State"], answer: 1 },
    { q: "Client талд юугаар уншдаг вэ?", options: ["useParams", "useSearchParams", "useState", "useEffect"], answer: 1 },
    { q: "Next.js 15-д searchParams нь?", options: ["Объект", "Promise", "Массив", "String"], answer: 1 },
    { q: "Debounce юунд хэрэгтэй вэ?", options: ["Хүсэлтийн тоог багасгах", "CSS", "Auth", "Routing"], answer: 0 },
    { q: "Шүүлт солиход page-ыг яах вэ?", options: ["Хэвээр", "1 болгох", "Устгах", "Нэмэх"], answer: 1 },
    { q: "useSearchParams-д build алдаа гарвал?", options: ["Suspense-д ороох", "await хийх", "useState болгох", "устгах"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Хайлт/шүүлт/хуудаслалтыг URL-д хадгална — хуваалцаж, сэргээж, буцаж болно.",
    "Server: `await searchParams`. Client: `useSearchParams()`.",
    "`URLSearchParams`-аар параметр удирдана (encode автомат).",
    "Debounce = `setTimeout` + cleanup-аар `clearTimeout`.",
    "Шүүлт солигдоход `page=1`.",
    "`useSearchParams`-ыг `<Suspense>`-д ороо.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Parallel Router** — нэг хуудсанд хэд хэдэн хэсгийг зэрэг, бие даан зурна." },
];

// ===== m4l11 — Parallel Router =====
export const m4l11: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Parallel Routes (`@slot`) болон Intercepting Routes-ийг ойлгож, тусдаа loading/error бүхий хэсгүүд, modal хийж сурна." },

  { type: "h", text: "Онол — Асуудал" },
  { type: "p", text: "Нүүр хуудсанд 3 хэсэг байна: Popular, Top Rated, Upcoming. Тус бүр өөр API дуудна. Энгийн бол:" },
  { type: "code", lang: "tsx", code: `// ✗ Асуудалтай — бүгдийг хүлээнэ
export default async function Page() {
  const popular = await getPopular();      // 1 сек
  const topRated = await getTopRated();    // 1 сек
  const upcoming = await getUpcoming();    // 1 сек
  // Нийт 3 секунд, хэрэглэгч бүх хугацаанд хоосон дэлгэц харна
  // Мөн нэг нь унавал БҮХ хуудас унана
}`, },

  { type: "h", text: "Parallel Routes — шийдэл" },
  { type: "p", text: "**Parallel Routes** нь нэг layout дотор хэд хэдэн бие даасан хэсгийг зэрэг зурах боломж. `@` тэмдэгтэй хавтас (**slot**) үүсгэж, layout-д prop болгон авна." },
  { type: "code", lang: "text", code: `app/
├── layout.tsx           ← slot-уудыг хүлээж авна
├── page.tsx             ← children
├── @popular/
│   ├── page.tsx         ← "popular" slot
│   ├── loading.tsx      ← ЗӨВХӨН энэ хэсгийн loading
│   └── error.tsx        ← ЗӨВХӨН энэ хэсгийн error
├── @topRated/
│   ├── page.tsx
│   └── loading.tsx
└── @upcoming/
    └── page.tsx`, },
  { type: "code", lang: "tsx", code: `// app/layout.tsx
export default function Layout({
  children,      // page.tsx
  popular,       // @popular slot
  topRated,      // @topRated slot
  upcoming,      // @upcoming slot
}: {
  children: React.ReactNode;
  popular: React.ReactNode;
  topRated: React.ReactNode;
  upcoming: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <section>{popular}</section>      {/* тус бүр бие даан ачаалагдана */}
      <section>{topRated}</section>
      <section>{upcoming}</section>
    </div>
  );
}`, },
  { type: "code", lang: "tsx", code: `// app/@popular/page.tsx — бие даасан хуудас шиг
export default async function Popular() {
  const movies = await getPopular();
  return <MovieRow title="Алдартай" movies={movies} />;
}

// app/@popular/loading.tsx — зөвхөн энэ хэсэг ачаалж байхад
export default function Loading() {
  return <MovieRowSkeleton />;
}`, },

  { type: "h", text: "Давуу тал" },
  { type: "code", lang: "text", code: `Ердийн:              Parallel Routes:
[   хоосон 3 сек  ]   [Popular ✓ 1 сек]
                      [TopRated загварчлал...]
[бүгд зэрэг гарна]    [Upcoming загварчлал...]
                      → дараа нь тус бүр бэлэн болмогц гарна`, },
  { type: "ul", items: [
    "Хэсэг бүр **тусдаа ачаалагдана** — түрүүлж бэлэн болсон нь шууд харагдана.",
    "Хэсэг бүр **тусдаа loading** харуулна.",
    "Нэг хэсэг **унавал бусад нь ажиллана** (error тусгаарлагдана).",
    "Хэсгүүд өөр өөр route-той байж болно.",
  ] },

  { type: "h", text: "default.tsx — заавал хэрэгтэй тохиолдол" },
  { type: "p", text: "Хэрэглэгч өөр route руу орсны дараа slot нь тухайн route-д тодорхойгүй бол Next.js `default.tsx`-ыг хайдаг. Байхгүй бол 404 гарна." },
  { type: "code", lang: "tsx", code: `// app/@popular/default.tsx
export default function Default() {
  return null;      // энэ route-д харуулах юмгүй
}`, },

  { type: "h", text: "Intercepting Routes — modal хийх" },
  { type: "p", text: "Жагсаалтаас кино дээр дарахад **modal-д** нээгдэх, гэхдээ URL нь солигдож, шинэчилбэл бүтэн хуудас нээгдэх — энэ бол Instagram-ийн загвар." },
  { type: "code", lang: "text", code: `app/
├── movies/
│   ├── page.tsx                 → /movies (жагсаалт)
│   └── [id]/
│       └── page.tsx             → /movies/550 (бүтэн хуудас)
├── @modal/
│   ├── default.tsx
│   └── (.)movies/               ← (.) = ижил түвшнээс "барих"
│       └── [id]/
│           └── page.tsx         → modal-д харагдана
└── layout.tsx

Тэмдэглэгээ:
(.)    ижил түвшин
(..)   нэг дээш
(...)  root-оос`, },
  { type: "code", lang: "tsx", code: `// app/@modal/(.)movies/[id]/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function MovieModal({ params }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/60" onClick={() => router.back()}>
      <div className="mx-auto mt-20 max-w-lg rounded bg-white p-6"
           onClick={(e) => e.stopPropagation()}>
        <MovieDetail id={params.id} />
        <button onClick={() => router.back()}>Хаах</button>
      </div>
    </div>
  );
}`, },
  { type: "code", lang: "text", code: `Үр дүн:
/movies дээр кино дарах  → modal нээгдэнэ, URL = /movies/550
Хуудсыг шинэчлэх        → бүтэн хуудас нээгдэнэ
Холбоосыг хуваалцах     → найз бүтэн хуудас харна ✓`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Slot-ыг layout-д авахгүй", text: "`@popular` хавтас үүсгэсэн бол layout-ийн props-д `popular` гэж (@ тэмдэггүйгээр) заавал авах ёстой. Үгүй бол огт харагдахгүй." },
  { type: "callout", variant: "error", title: "404 гарч байна", text: "Slot-д тухайн route тодорхойлогдоогүй. `default.tsx` нэм (`return null` ч болно)." },
  { type: "callout", variant: "error", title: "Modal ажиллахгүй", text: "`(.)` тэмдэглэгээ түвшинтэй таарахгүй байна. `@modal`-ээс `movies` руу ижил түвшин бол `(.)`, нэг дээш бол `(..)`." },
  { type: "callout", variant: "warn", title: "Хэт олон slot", text: "3-4 slot хангалттай. Илүү болбол хуудсаа дахин зохион байгуулахыг бод." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Parallel Route-ийн 3 давуу талыг бич.",
    "Дунд: `@popular` slot үүсгэж layout-д харуул.",
    "Дунд: Хоёр slot-д тус тусад нь `loading.tsx` нэмж үз.",
    "Хүнд: `default.tsx` устгаад өөр route руу орж юу болохыг ажигла.",
    "Хүнд: `(.)` intercepting route-оор modal хий.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Parallel Routes ямар асуудлыг шийддэг вэ?",
    "Slot хавтасны тэмдэглэгээ юу вэ?",
    "Slot-ыг хаана хүлээж авах вэ?",
    "`default.tsx` юунд хэрэгтэй вэ?",
    "Intercepting route-ийн `(.)`, `(..)` юу заадаг вэ?",
    "Modal загварын давуу тал юу вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Slot хавтасны тэмдэг?", options: ["[slot]", "@slot", "(slot)", "_slot"], answer: 1 },
    { q: "Parallel Route-ийн давуу тал?", options: ["Тус тусдаа ачаална", "CSS хурдан", "DB хэрэггүй", "Auth бэлэн"], answer: 0 },
    { q: "Slot-ыг хаана авах вэ?", options: ["page.tsx", "layout.tsx props", "route.ts", "globals.css"], answer: 1 },
    { q: "404-өөс сэргийлэхэд ямар файл?", options: ["error.tsx", "default.tsx", "loading.tsx", "not-found.tsx"], answer: 1 },
    { q: "Ижил түвшнээс барих тэмдэглэгээ?", options: ["(.)", "(..)", "(...)", "(@)"], answer: 0 },
    { q: "Нэг slot унавал?", options: ["Бүх хуудас унана", "Бусад нь ажиллана", "Refresh болно", "404"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`@name` хавтас = parallel slot, layout-д prop болгон авна.",
    "Хэсэг бүр тусдаа ачаалагдана, тусдаа loading/error-той.",
    "Нэг хэсэг унавал бусад нь ажиллана.",
    "`default.tsx` — 404-өөс сэргийлнэ.",
    "`(.)` intercepting route — modal хийх сонгодог загвар.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**TMDB API** — бодит киноны өгөгдөл татаж апп-даа холбоно." },
];

// ===== m4l12 — TMDB API =====
export const m4l12: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "TMDB-ээс API key авч, аюулгүй хадгалж, бүх үндсэн endpoint-ыг ашиглаж, зургийг зөв харуулж сурна." },

  { type: "h", text: "Онол — TMDB гэж юу вэ?" },
  { type: "p", text: "**TMDB (The Movie Database)** нь киноны мэдээллийн үнэгүй нээлттэй API. 800,000+ кино, зураг, төрөл, үнэлгээ, трейлер зэрэг мэдээлэлтэй. Хувийн төсөлд үнэгүй." },

  { type: "h", text: "API key авах" },
  { type: "ol", items: [
    "themoviedb.org дээр бүртгүүл (үнэгүй).",
    "Профайл → **Settings → API**.",
    "**Request an API Key** → \"Developer\" сонго.",
    "Маягт бөглө (хувийн төсөл гэж бич).",
    "**API Key (v3 auth)**-ээ хуулж ав.",
  ] },
  { type: "code", lang: "bash", code: `# .env.local  ← энэ файлыг GitHub руу ХЭЗЭЭ Ч бүү push хий!
TMDB_API_KEY=таны_жинхэнэ_key
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p`, },
  { type: "callout", variant: "error", title: "API key хамгаалах — ХАМГИЙН ЧУХАЛ", text: "`NEXT_PUBLIC_TMDB_API_KEY` гэж БҮҮ бич! `NEXT_PUBLIC_` угтвартай хувьсагч хөтөчид ил гардаг — хэн ч DevTools нээгээд key-г хулгайлж, чиний квотыг дуусгаж чадна. Зөвхөн Server Component эсвэл API Route дотор ашигла." },

  { type: "h", text: "Дахин ашиглагдах татах функц" },
  { type: "code", lang: "ts", code: `// lib/tmdb.ts
const BASE = process.env.TMDB_BASE_URL!;
const KEY = process.env.TMDB_API_KEY!;

async function tmdb<T>(path: string, revalidate = 3600): Promise<T> {
  const sep = path.includes("?") ? "&" : "?";
  const url = \`\${BASE}\${path}\${sep}api_key=\${KEY}&language=en-US\`;

  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) {
    if (res.status === 401) throw new Error("TMDB API key буруу");
    if (res.status === 404) throw new Error("Олдсонгүй");
    throw new Error(\`TMDB алдаа: \${res.status}\`);
  }

  return res.json() as Promise<T>;
}

// Тодорхой функцүүд
export const getPopular = (page = 1) =>
  tmdb<MovieResponse>(\`/movie/popular?page=\${page}\`);

export const getTopRated = (page = 1) =>
  tmdb<MovieResponse>(\`/movie/top_rated?page=\${page}\`);

export const getUpcoming = (page = 1) =>
  tmdb<MovieResponse>(\`/movie/upcoming?page=\${page}\`);

export const getMovie = (id: string) =>
  tmdb<MovieDetail>(\`/movie/\${id}\`);

export const getSimilar = (id: string) =>
  tmdb<MovieResponse>(\`/movie/\${id}/similar\`);

export const getVideos = (id: string) =>
  tmdb<VideoResponse>(\`/movie/\${id}/videos\`);

export const searchMovies = (q: string, page = 1) =>
  tmdb<MovieResponse>(
    \`/search/movie?query=\${encodeURIComponent(q)}&page=\${page}\`,
    60,     // хайлтыг богино хугацаанд кэшлэнэ
  );

export const getGenres = () =>
  tmdb<{ genres: { id: number; name: string }[] }>("/genre/movie/list", 86400);`, },

  { type: "h", text: "Гол endpoint-ууд" },
  { type: "code", lang: "text", code: `/movie/popular                 алдартай
/movie/top_rated               өндөр үнэлгээтэй
/movie/upcoming                удахгүй гарах
/movie/now_playing             одоо кинонд гарч буй
/movie/{id}                    дэлгэрэнгүй
/movie/{id}/similar            төстэй кинонууд
/movie/{id}/credits            жүжигчид, багийнхан
/movie/{id}/videos             трейлер
/search/movie?query=...        хайлт
/discover/movie?with_genres=28 төрлөөр шүүх
/genre/movie/list              бүх төрөл`, },

  { type: "h", text: "Зураг харуулах" },
  { type: "p", text: "TMDB зөвхөн **замын хэсгийг** буцаадаг (`/abc123.jpg`). Бүтэн URL үүсгэх ёстой." },
  { type: "code", lang: "ts", code: `// lib/tmdb.ts
const IMG = "https://image.tmdb.org/t/p";

export function posterUrl(path: string | null, size: "w200"|"w500"|"original" = "w500") {
  if (!path) return "/placeholder-poster.png";    // байхгүй бол орлуулагч
  return \`\${IMG}/\${size}\${path}\`;
}

export function backdropUrl(path: string | null, size: "w780"|"w1280"|"original" = "w1280") {
  if (!path) return "/placeholder-backdrop.png";
  return \`\${IMG}/\${size}\${path}\`;
}`, },
  { type: "code", lang: "text", code: `Боломжтой хэмжээнүүд:
poster:   w92  w154  w185  w342  w500  w780  original
backdrop: w300  w780  w1280  original
profile:  w45   w185  h632   original

→ Хэрэгцээнд тохирсон ХАМГИЙН ЖИЖИГ хэмжээг сонго (хурд)`, },

  { type: "h", text: "next/image ашиглах" },
  { type: "code", lang: "js", code: `// next.config.mjs — гадаад домэйныг зөвшөөрнө
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
    ],
  },
};
export default nextConfig;`, },
  { type: "code", lang: "tsx", code: `import Image from "next/image";
import { posterUrl } from "@/lib/tmdb";

<Image
  src={posterUrl(movie.poster_path)}
  alt={movie.title}
  width={500}
  height={750}
  className="rounded-lg"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..."   // ачаалахад бүдэг зураг
/>`, },

  { type: "h", text: "Бүтэн жишээ — киноны хуудас" },
  { type: "code", lang: "tsx", code: `// app/movies/page.tsx — Server Component (key нууц хэвээр)
import { getPopular, posterUrl } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";

export default async function MoviesPage() {
  const data = await getPopular();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {data.results.map((movie) => (
        <Link key={movie.id} href={\`/movies/\${movie.id}\`}>
          <Image
            src={posterUrl(movie.poster_path)}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg"
          />
          <p className="mt-2 truncate font-medium">{movie.title}</p>
          <p className="text-sm text-gray-500">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
        </Link>
      ))}
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "401 Unauthorized", text: "API key буруу эсвэл `.env.local` уншигдаагүй. Key-ээ шалгаад **dev server-ээ дахин асаа** (env файл зөвхөн эхлэхэд уншигддаг)." },
  { type: "callout", variant: "error", title: "Зураг харагдахгүй / хугарсан", text: "`poster_path` бол зөвхөн замын хэсэг. Урд нь `https://image.tmdb.org/t/p/w500` нэм. Мөн `null` байж болохыг санаж орлуулагч зураг өг." },
  { type: "callout", variant: "error", title: "Invalid src prop ... hostname not configured", text: "`next.config.mjs`-д `remotePatterns` дотор `image.tmdb.org` нэм, дараа нь dev server дахин асаа." },
  { type: "callout", variant: "error", title: "API key GitHub-д орсон", text: "ТЭР ДАРУЙД TMDB дээр key-ээ устгаж шинийг үүсгэ. Түүхээс арилгасан ч хэн нэгэн аль хэдийн харсан байж болно." },
  { type: "callout", variant: "warn", title: "Rate limit (429)", text: "TMDB секундэд ~50 хүсэлт зөвшөөрнө. `revalidate`-ээр кэшлэвэл хэзээ ч хүрэхгүй." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: TMDB-ээс API key аваад `.env.local`-д тавь.",
    "Дунд: `lib/tmdb.ts` үүсгэж `getPopular` функц бич.",
    "Дунд: Киноны grid хийж зургийг нь харуул (`posterUrl` ашигла).",
    "Хүнд: `/movies/[id]` дэлгэрэнгүй хуудас хийж `getSimilar`-ыг ч харуул.",
    "Хүнд: Хайлтын хуудас хийж `searchMovies`-ыг холбо.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "API key-г хаана хадгалах вэ, яагаад?",
    "`NEXT_PUBLIC_` угтвар юу хийдэг вэ, яагаад аюултай вэ?",
    "`poster_path`-ыг яаж бүтэн зураг болгох вэ?",
    "Зургийн хэмжээг яаж сонгох вэ?",
    "`next/image` ашиглахад юу тохируулах шаардлагатай вэ?",
    "401 алдаа гарвал юу шалгах вэ?",
    "Rate limit-д хүрэхгүй байхын тулд яах вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "API key-г хаана хадгалах вэ?", options: [".env.local", "page.tsx", "GitHub", "localStorage"], answer: 0 },
    { q: "NEXT_PUBLIC_ угтвар юу хийдэг вэ?", options: ["Нууцалдаг", "Хөтөчид ил гаргадаг", "Хурдасгадаг", "Юу ч үгүй"], answer: 1 },
    { q: "Зургийн бүтэн хаяг?", options: ["poster_path шууд", "image.tmdb.org/t/p/w500 + poster_path", "api key + path", "/public/ дотор"], answer: 1 },
    { q: "401 алдаа юу гэсэн үг вэ?", options: ["Олдсонгүй", "API key буруу", "Хэт олон хүсэлт", "Сервер унасан"], answer: 1 },
    { q: "next/image-д гадаад домэйныг хаана зөвшөөрөх вэ?", options: ["page.tsx", "next.config.mjs remotePatterns", ".env", "layout.tsx"], answer: 1 },
    { q: "Rate limit-ээс сэргийлэхэд?", options: ["Илүү олон key", "revalidate-ээр кэшлэх", "Хурдан дуудах", "Боломжгүй"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "TMDB — үнэгүй киноны API, 800k+ кино.",
    "Key-г `.env.local`-д, `NEXT_PUBLIC_`-ГҮЙГЭЭР хадгална.",
    "Server Component дотор дуудаж key-ээ нууцална.",
    "`poster_path` дээр `https://image.tmdb.org/t/p/w500` нэмнэ. `null` байж болно.",
    "`next.config.mjs`-д `remotePatterns` тохируулна.",
    "`revalidate`-ээр кэшлэж rate limit-ээс сэргийлнэ.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Shadcn UI ба Responsive Design** — гоё, бүх төхөөрөмжид тохирсон UI хийнэ." },
];

// ===== m4l13 — Shadcn UI · Responsive Design =====
export const m4l13: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "shadcn/ui-ийн онцлогийг ойлгож, Tailwind-ийн responsive системийг эзэмшиж, бүх төхөөрөмжид тохирсон UI хийж сурна." },

  { type: "h", text: "Онол — shadcn/ui гэж юу вэ?" },
  { type: "p", text: "**shadcn/ui** бол энгийн сан БИШ. `npm install` хийж node_modules-д суудаггүй — component-ийн **кодыг шууд төсөл рүү чинь хуулж өгдөг**." },
  { type: "code", lang: "text", code: `Ердийн сан (MUI, Chakra):        shadcn/ui:
node_modules/@mui/...            src/components/ui/button.tsx
✗ кодыг харж/засаж болохгүй      ✓ код чинийх — дураараа зас
✗ хувилбар шинэчлэхэд эвдэрнэ    ✓ хэзээ ч эвдрэхгүй
✗ bundle-д бүгд орно             ✓ зөвхөн ашигласан нь
✗ загварыг өөрчлөхөд тэмцэнэ     ✓ шууд файлыг нь зас`, },
  { type: "callout", variant: "tip", title: "Хэн дээр суурилсан бэ?", text: "shadcn/ui нь Radix UI (хүртээмж, зан үйл) + Tailwind (загвар) хоёрыг хослуулсан. Тиймээс клавиатурын навигаци, screen reader дэмжлэг бүгд бэлэн." },

  { type: "h", text: "Суулгах" },
  { type: "code", lang: "bash", code: `# Нэг удаа эхлүүлэх
npx shadcn@latest init

# Асуултууд: style, base color, CSS хувьсагч ашиглах эсэх
# → components.json файл үүснэ

# Хэрэгтэй component-оо нэмэх
npx shadcn@latest add button card input skeleton dialog

# Нэмэгдсэн файлууд:
# src/components/ui/button.tsx
# src/components/ui/card.tsx  ...`, },
  { type: "code", lang: "tsx", code: `import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MovieCard({ movie }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{movie.overview}</p>
        <Button variant="outline" size="sm" className="mt-3">
          Дэлгэрэнгүй
        </Button>
      </CardContent>
    </Card>
  );
}`, },

  { type: "h", text: "Responsive Design — Mobile First" },
  { type: "p", text: "Tailwind нь **mobile-first**. Угтваргүй класс нь **бүх дэлгэцэд**, угтвартай нь **тэр хэмжээнээс ДЭЭШ** үйлчилнэ." },
  { type: "code", lang: "text", code: `sm:   640px-ээс дээш   (том утас, жижиг таблет)
md:   768px-ээс дээш   (таблет)
lg:   1024px-ээс дээш  (лаптоп)
xl:   1280px-ээс дээш  (том дэлгэц)
2xl:  1536px-ээс дээш

⚠ "md: нь ЗӨВХӨН таблет" гэсэн үг БИШ — 768px-ээс ДЭЭШ бүгдэд.`, },
  { type: "code", lang: "tsx", code: `// Grid — утсанд 2, таблетад 3, лаптопад 5 багана
<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">

// Текстийн хэмжээ
<h1 className="text-xl md:text-2xl lg:text-4xl">Кинонууд</h1>

// Padding
<div className="p-4 md:p-6 lg:p-8">

// Чиглэл — утсанд босоо, дэлгэцэд хэвтээ
<div className="flex flex-col md:flex-row gap-4">

// Нуух / харуулах
<aside className="hidden lg:block">Sidebar</aside>       {/* зөвхөн дэлгэцэд */}
<button className="lg:hidden">☰</button>                  {/* зөвхөн утсанд */}`, },
  { type: "callout", variant: "error", title: "Хамгийн түгээмэл алдаа", text: "`grid-cols-5 md:grid-cols-2` гэж бичих. Энэ нь утсанд 5 багана (жижигхэн!), таблетаас дээш 2 болно — эсрэгээрээ. Жижигээс томруу бич: `grid-cols-2 md:grid-cols-5`." },

  { type: "h", text: "Динамик класс — Tailwind-ийн занга" },
  { type: "code", lang: "tsx", code: `// ✗ АЖИЛЛАХГҮЙ — Tailwind бүтэн класс нэрийг олдоггүй
<div className={\`grid-cols-\${cols}\`}>
<div className={\`text-\${color}-500\`}>

// ✓ ЗӨВ — бүтэн класс нэрийг бич
const colsClass = cols === 2 ? "grid-cols-2" : "grid-cols-4";
<div className={colsClass}>

// ✓ Эсвэл объект хэлбэрээр
const colorMap = {
  red: "text-red-500",
  blue: "text-blue-500",
};
<div className={colorMap[color]}>`, },
  { type: "callout", variant: "tip", title: "Яагаад ингэдэг вэ?", text: "Tailwind build хийхэд кодыг ТЕКСТЭЭР сканнердаж, олдсон класс нэрийг л CSS-д оруулдаг. `grid-cols-${cols}` гэсэн бүтэн нэр эх кодод байхгүй тул тэр CSS үүсгэхгүй." },

  { type: "h", text: "cn() — класс нэгтгэх туслах" },
  { type: "code", lang: "ts", code: `// lib/utils.ts (shadcn init өөрөө үүсгэдэг)
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`, },
  { type: "code", lang: "tsx", code: `import { cn } from "@/lib/utils";

// Нөхцөлтэй класс
<div className={cn(
  "rounded border p-4",
  isActive && "border-indigo-500 bg-indigo-50",
  isDisabled && "opacity-50",
)}>

// twMerge нь зөрчилдөх классыг зөв шийднэ
cn("p-4", "p-6")           // → "p-6"  (сүүлийнх ялна)
cn("text-red-500", "text-blue-500")   // → "text-blue-500"`, },

  { type: "h", text: "Хариуцлагатай зураг ба контейнер" },
  { type: "code", lang: "tsx", code: `// Контейнер — төвд, хажуугийн зайтай, дээд хязгаартай
<div className="mx-auto max-w-6xl px-4">

// Зураг — эх элементэд тохирно
<img className="w-full h-auto rounded-lg" />

// Харьцаа хадгалах
<div className="aspect-[2/3] overflow-hidden rounded-lg">
  <img className="h-full w-full object-cover" />
</div>

// Auto-fill grid — тоо биш ӨРГӨНӨӨР
<div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))]">`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Responsive grid", code: `function MovieCard({ title, rating }) {
  return (
    <div style={{
      border:"1px solid #e5e7eb", borderRadius:8, padding:12,
      background:"white"
    }}>
      <div style={{
        aspectRatio:"2/3", background:"#e0e7ff",
        borderRadius:6, marginBottom:8
      }} />
      <div style={{fontWeight:500,fontSize:14}}>{title}</div>
      <div style={{fontSize:12,color:"#888"}}>⭐ {rating}</div>
    </div>
  );
}

function App() {
  const movies = [
    { id:1, title:"Fight Club", rating:8.4 },
    { id:2, title:"Inception", rating:8.3 },
    { id:3, title:"Interstellar", rating:8.4 },
    { id:4, title:"The Matrix", rating:8.2 },
    { id:5, title:"Parasite", rating:8.5 },
    { id:6, title:"Joker", rating:8.2 },
  ];

  return (
    <div>
      <p style={{fontSize:13,color:"#888",marginBottom:8}}>
        Цонхны өргөнийг өөрчилж үз — багана автоматаар тохирно
      </p>
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))",
        gap:12
      }}>
        {movies.map((m) => <MovieCard key={m.id} {...m} />)}
      </div>
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Desktop-first бичих", text: "`grid-cols-5 md:grid-cols-2` — эсрэгээрээ. Tailwind mobile-first: `grid-cols-2 md:grid-cols-5`." },
  { type: "callout", variant: "error", title: "Динамик класс ажиллахгүй", text: "`` className={`text-${color}-500`} `` — Tailwind олохгүй. Бүтэн нэрээр объект/тернар ашигла." },
  { type: "callout", variant: "warn", title: "Класс зөрчилдөж байна", text: "`\"p-4 p-6\"` — аль нь ялахыг таамаглахад хэцүү. `cn()` (twMerge) ашиглавал сүүлийнх ялна." },
  { type: "callout", variant: "warn", title: "Утсанд хэвтээ scroll гарч байна", text: "Тогтмол өргөн (`w-[800px]`) эсвэл `overflow` тохируулаагүй. `max-w-full`, `overflow-x-auto` ашигла." },
  { type: "callout", variant: "error", title: "shadcn component ажиллахгүй", text: "`components.json` байхгүй эсвэл `cn()` туслах функц дутуу. `npx shadcn@latest init` дахин ажиллуул." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: shadcn-ээр `button`, `card` component нэмж ашигла.",
    "Дунд: Киноны grid-ийг утсанд 2, таблетад 3, дэлгэцэд 5 багана болго.",
    "Дунд: Sidebar-ыг утсанд нуугаад `lg:`-ээс дээш харагддаг болго.",
    "Хүнд: `cn()` ашиглан нөхцөлтэй классуудыг цэвэрхэн бич.",
    "Хүнд: `aspect-[2/3]` + `object-cover`-оор постерын харьцааг хадгал.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "shadcn/ui ердийн сангаас юугаараа ялгаатай вэ?",
    "Юун дээр суурилсан бэ?",
    "Tailwind-ийн mobile-first гэж юу вэ?",
    "`md:` яг ямар хэмжээнд үйлчлэх вэ?",
    "Динамик класс яагаад ажиллахгүй вэ?",
    "`cn()` функц юу хийдэг вэ?",
    "Зургийн харьцааг яаж хадгалах вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "shadcn/ui ямар онцлогтой вэ?", options: ["Кодыг төсөл рүү хуулна", "node_modules-д суудаг", "CSS файл", "Backend сан"], answer: 0 },
    { q: "Tailwind default нь ямар зарчимтай вэ?", options: ["Desktop-first", "Mobile-first", "Print-first", "Зарчимгүй"], answer: 1 },
    { q: "`md:` хэдэн px-ээс эхлэх вэ?", options: ["640", "768", "1024", "1280"], answer: 1 },
    { q: "Аль нь ЗӨВ дараалал вэ?", options: ["grid-cols-5 md:grid-cols-2", "grid-cols-2 md:grid-cols-5", "хамаагүй", "хоёулаа буруу"], answer: 1 },
    { q: "Динамик класс яагаад ажиллахгүй вэ?", options: ["Tailwind бүтэн нэрийг сканнердана", "CSS дэмждэггүй", "React алдаа", "Хурд"], answer: 0 },
    { q: "Зөрчилдөх классыг зөв шийддэг нь?", options: ["clsx", "twMerge (cn)", "classNames", "join"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "shadcn/ui — кодыг төсөлд хуулж өгдөг, чи эзэмшинэ. Radix + Tailwind дээр суурилсан.",
    "Tailwind mobile-first: угтваргүй = бүгдэд, `md:` = 768px-ээс дээш.",
    "Жижигээс томруу бич: `grid-cols-2 md:grid-cols-5`.",
    "Динамик класс (`text-${c}-500`) ажиллахгүй — бүтэн нэрээр бич.",
    "`cn()` = clsx + twMerge, нөхцөлт болон зөрчилдөх классыг зөв шийднэ.",
    "🎉 4-р модуль дууслаа! Бодит API-тай ажиллах чадвартай боллоо.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**5-р модуль: Node JS Fundamental.** Backend руу орж, өөрийн API бичиж эхэлнэ." },
];
