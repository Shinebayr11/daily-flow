import type { ContentBlock } from "./types";

// 1-р модуль, "Thinking in React"
export const thinkingInReact: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Дэлгэцийг component болгон хувааж “React-аар бодох” сэтгэлгээг эзэмшинэ." },
  { type: "h", text: "Онол — Thinking in React" },
  { type: "p", text: "React-аар апп хийхдээ эхлээд дэлгэцийг **жижиг хэсгүүдэд (component)** хуваадаг. Дараа нь тэдгээрийг угсарч бүтэн UI үүсгэдэг. Энэ бол \"дээрээс доош\" (top-down) задлах сэтгэлгээ." },
  { type: "callout", variant: "tip", title: "3 алхам", text: "1) Дизайныг хараад component-уудад хуваа. 2) Статик хувилбарыг эхлээд бүтээ. 3) Аль хэсэг өөрчлөгддөг вэ — тэнд state нэм." },
  { type: "h", text: "Амьдралын жишээ" },
  { type: "p", text: "YouTube-ийн нүүр хуудсыг харвал: Header, SearchBar, VideoCard (олон удаа давтагдана), Sidebar. Эдгээр нь бүгд тусдаа component. Нэг VideoCard-ыг бичээд олон видеонд дахин ашиглана." },
  { type: "h", text: "Жишээ — задлах" },
  { type: "code", lang: "text", code: `App
├── Header
├── Sidebar
└── VideoList
    ├── VideoCard   ← дахин ашиглагдана
    ├── VideoCard
    └── VideoCard` },
  { type: "ul", items: [
    "Том дэлгэцийг жижиг component болгон хуваа.",
    "Давтагддаг хэсгийг (VideoCard) нэг component болгож дахин ашигла.",
    "Component бүр нэг л ажил хийх ёстой (single responsibility).",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Бүх зүйлийг нэг component-д бичих", text: "Нэг том файлд бүхнийг хийвэл засварлахад хэцүү. Шийдэл: жижиг component-уудад хуваа." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Instagram-ын нэг постыг ямар component-уудад хуваахыг бич.",
    "Дунд: Тэдгээрийн дотроос давтагддаг (reusable) component аль нь болохыг тэмдэглэ.",
    "Хүнд: Аль component-д state хэрэгтэй болохыг (ж: like товч) тайлбарла.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "React-аар бодох эхний алхам юу вэ?", options: ["State нэмэх", "Дэлгэцийг component-д хуваах", "Deploy хийх", "CSS бичих"], answer: 1 },
    { q: "Давтагддаг хэсгийг яах вэ?", options: ["Олон удаа хуулах", "Нэг reusable component болгох", "Устгах", "Зурагаар солих"], answer: 1 },
    { q: "Нэг component хэдэн ажил хийх нь зохимжтой вэ?", options: ["Аль болох олон", "Нэг л ажил", "Тэг", "Хамаагүй"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "React-аар бодох = дэлгэцийг component-д хуваах.",
    "Давтагддаг хэсгийг reusable component болгоно.",
    "Өөрчлөгддөг хэсэгт л state нэмнэ.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Components** — component-уудыг бодитоор бичиж, угсарч сурна." },
];

// 1-р модуль, "Nesting Components"
export const nestingComponents: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Component дотор өөр component дуудаж (nesting), мод хэлбэрийн бүтэц үүсгэж сурна." },
  { type: "h", text: "Онол — Nesting гэж юу вэ?" },
  { type: "p", text: "**Nesting (үүрлэх)** гэдэг нь нэг component дотор өөр component-ыг дуудах. Ингэснээр жижиг component-уудаас том UI угсардаг — яг лего шиг." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `// components/Avatar.tsx
function Avatar() {
  return <div className="h-10 w-10 rounded-full bg-gray-300" />;
}
export default Avatar;` },
  { type: "code", lang: "tsx", code: `// components/UserRow.tsx
import Avatar from "./Avatar";

export default function UserRow() {
  return (
    <div className="flex items-center gap-3">
      <Avatar />          {/* nested: UserRow дотор Avatar */}
      <span>Bat-Erdene</span>
    </div>
  );
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`Avatar` бол жижиг component.",
    "`UserRow` нь `Avatar`-ыг дотроо дуудаж байна — энэ бол nesting.",
    "Ингэж жижигээс томыг угсарна: Avatar → UserRow → UserList → App.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "import хийхээ мартах", text: "`Avatar`-ыг import хийхгүй бол `<Avatar />` ажиллахгүй. Дээд талд `import Avatar from \"./Avatar\"` нэм." },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Nested component", code: `function Avatar() {
  return <div style={{width:40,height:40,borderRadius:"50%",background:"#ddd"}} />;
}

function UserRow({ name }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
      <Avatar />
      <span>{name}</span>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserRow name="Bat-Erdene" />
      <UserRow name="Sara" />
    </div>
  );
}` },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `UserRow`-г 3 удаа дуудсан `UserList` component хий.",
    "Дунд: `Avatar` дотор зургийн `<img />` нэм.",
    "Хүнд: 3 түвшний nesting (Icon → Button → Toolbar) хийж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Nesting гэж юу вэ?", options: ["Component устгах", "Component дотор component дуудах", "CSS файл", "Сервер"], answer: 1 },
    { q: "Nested component ашиглахад юу хэрэгтэй вэ?", options: ["import", "database", "npm install", "юу ч хэрэггүй"], answer: 0 },
    { q: "Component-уудыг яаж угсардаг вэ?", options: ["Томоос жижиг рүү", "Жижигээс томыг угсарна", "Санамсаргүй", "Зөвхөн нэг байна"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Nesting = component дотор component.",
    "Жижиг component-уудаас том UI угсарна.",
    "Дуудахын өмнө заавал import хий.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Props** — component-д гаднаас мэдээлэл дамжуулж уян хатан болгоно." },
];

// 1-р модуль, "ES Modules Handling"
export const esModules: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`export` болон `import`-ийн ажиллагааг ойлгож, файл хооронд код хуваалцаж сурна." },
  { type: "h", text: "Онол — ES Modules гэж юу вэ?" },
  { type: "p", text: "**ES Modules** нь JavaScript-ийн кодыг олон файлд хуваан, хооронд нь `export`/`import`-оор хуваалцах систем. React component бүрийг өөр файлаас ашиглахад заавал хэрэгтэй." },
  { type: "h", text: "export default vs export" },
  { type: "ul", items: [
    "`export default` — файлд нэг л удаа. Import хийхэд дурын нэр өгч болно. Ихэвчлэн component-д ашиглана.",
    "`export` (named) — нэг файлд олон удаа болно. Import хийхэд яг тэр нэрээр `{ }` дотор авна.",
  ] },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `// utils.ts
export default function greet() {   // default export
  return "Сайн уу";
}
export const PI = 3.14;             // named export
export const version = "1.0";       // named export` },
  { type: "code", lang: "tsx", code: `// app/page.tsx
import greet, { PI, version } from "@/utils";
//     ↑default   ↑named exports ({ } дотор)

export default function Page() {
  return <p>{greet()} — PI: {PI}, v{version}</p>;
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`export default greet` — үндсэн экспорт, import дээр `{ }` хэрэггүй.",
    "`export const PI` — нэртэй экспорт, import дээр `{ PI }` гэж авна.",
    "`@/` нь `src/`-ийг заадаг товчлол (tsconfig-д тохируулагдсан).",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "'X' has no exported member 'Y'", text: "Named export-ыг буруу нэрээр эсвэл `{ }`-гүй import хийсэн. Экспортын нэр, `{ }`-ээ шалга." },
  { type: "callout", variant: "error", title: "default-ыг { } дотор авах", text: "`import { greet }` (буруу) — default export-ыг `import greet` (зөв) гэж { }-гүй авна." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `utils.ts`-д `appName` named export нэмээд page-д ашигла.",
    "Дунд: Шинэ `math.ts` файл үүсгэж `add`, `sub` функцүүдийг named export хий.",
    "Хүнд: default болон named-ыг нэг мөрөнд import хийж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Нэг файлд default export хэдэн удаа байж болох вэ?", options: ["Хэдэн ч", "Нэг л удаа", "Хоёр", "Тэг"], answer: 1 },
    { q: "Named export-ыг яаж import хийх вэ?", options: ["{ } дотор нэрээр", "{ }-гүй", "* -оор", "import хэрэггүй"], answer: 0 },
    { q: "@/ юуг заадаг вэ?", options: ["node_modules", "src/ хавтас", "интернэт", "public/"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "ES Modules-аар код файл хооронд хуваалцана.",
    "`export default` — нэг удаа, { }-гүй import. `export` (named) — олон, { }-тэй import.",
    "React component-уудыг ингэж export/import хийж ашигладаг. 1-р модуль дууслаа! 🎉",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**2-р модуль: Todo Web Application.** CSS Modules-оос эхэлж, useState, event, localStorage-ийг сурна." },
];
