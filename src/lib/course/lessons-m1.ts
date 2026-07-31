import type { ContentBlock } from "./types";

// ===== 1-р модуль, 2-р хичээл =====
export const lessonM1L2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Энэ хичээлээр та бодит Next.js төсөл үүсгэж, файлын бүтцийг ойлгож, эхний хуудсаа хөтчид ажиллуулж чадна." },
  { type: "h", text: "Онол — төсөл яаж үүсгэдэг вэ?" },
  { type: "p", text: "Next.js төслийг гараар бус, **`create-next-app`** гэдэг бэлэн хэрэгслээр үүсгэдэг. Энэ нь бүх шаардлагатай файл, тохиргоог автоматаар бэлдэж өгдөг." },
  { type: "callout", variant: "tip", title: "npx гэж юу вэ?", text: "`npx` нь сан суулгалгүйгээр түр зуур ажиллуулдаг команд. `create-next-app`-ыг ингэж дуудна." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "ol", items: [
    "Терминал нээж, төсөл хийх хавтас руугаа ор.",
    "Доорх командыг бич, Enter дар.",
    "Асуултууд гарвал: TypeScript — Yes, App Router — Yes, Tailwind — Yes сонго.",
    "Дуусаад төслийн хавтас руу ороод серверээ асаа.",
  ] },
  { type: "code", lang: "bash", code: `npx create-next-app@latest my-app
cd my-app
npm run dev` },
  { type: "p", text: "Дараа нь хөтчөөрөө **http://localhost:3000** нээхэд Next.js-ийн эхлэлийн хуудас гарч ирнэ." },
  { type: "h", text: "Folder structure" },
  { type: "code", lang: "text", code: `my-app/
├── src/
│   └── app/
│       ├── layout.tsx   ← бүх хуудсыг ороодог хүрээ
│       ├── page.tsx     ← "/" хаягийн хуудас
│       └── globals.css  ← ерөнхий загвар
├── public/              ← зураг, статик файл
├── package.json         ← суулгасан сангууд, скрипт
├── tsconfig.json        ← TypeScript тохиргоо
└── next.config.js       ← Next.js тохиргоо` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`src/app/` — App Router-ийн гол хавтас. Хавтас бүр нэг замыг (route) илэрхийлнэ.",
    "`page.tsx` байгаа хавтас нь хуудас болно. `app/page.tsx` → `/` хаяг.",
    "`layout.tsx` — тухайн хэсгийн бүх хуудсанд нийтлэг хүрээ (header, footer гэх мэт).",
    "`package.json` доторх `scripts.dev` нь `npm run dev` командыг тодорхойлдог.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Port 3000 is in use", text: "3000 порт завгүй байна. Шийдэл: Next.js өөрөө 3001 руу шилжинэ, эсвэл тэр портыг ашиглаж буй программаа хаа." },
  { type: "callout", variant: "error", title: "command not found: npx", text: "Node.js суугаагүй байна. nodejs.org-оос LTS хувилбарыг суулга." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Шинэ төсөл үүсгээд localhost дээр ажиллуулж үз.",
    "Дунд: `app/page.tsx`-ийн текстийг өөрчилж, хөтчид шинэчлэгдэхийг ажигла.",
    "Хүнд: `package.json` дотор ямар скрипт (dev, build, start) байгааг олж, тус бүр юу хийдгийг бич.",
  ] },
  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Next.js төслийг ямар командаар үүсгэдэг вэ?",
    "`npm run dev` юу хийдэг вэ?",
    "`app/page.tsx` ямар хаягийн хуудас болдог вэ?",
    "`public/` хавтас юунд зориулагдсан бэ?",
  ] },
  { type: "quiz", questions: [
    { q: "Next.js төсөл үүсгэх команд аль нь вэ?", options: ["npm start", "npx create-next-app@latest", "node app.js", "git init"], answer: 1 },
    { q: "app/page.tsx ямар хаягтай тохирох вэ?", options: ["/home", "/page", "/", "/app"], answer: 2 },
    { q: "Хөгжүүлэлтийн серверийг асаах команд?", options: ["npm run dev", "npm run build", "npm test", "npx next export"], answer: 0 },
    { q: "layout.tsx-ийн үүрэг?", options: ["Зөвхөн CSS", "Хуудсуудыг ороодог нийтлэг хүрээ", "Мэдээллийн сан", "Зураг хадгалах"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`create-next-app`-аар төсөл хурдан үүсгэдэг.",
    "`src/app/` доторх `page.tsx` хуудас, `layout.tsx` хүрээ болдог.",
    "`npm run dev`-ээр локал сервер асааж хөгжүүлдэг.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**1-р модуль, 3-р хичээл: page.tsx, layout.tsx ба JSX syntax.** JSX-ийн дүрмүүд болон хуудас, хүрээ хоёрын ажиллагааг гүнзгий үзнэ." },
];

// ===== 1-р модуль, 3-р хичээл =====
export const lessonM1L3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "JSX-ийн үндсэн дүрмийг сурч, `page.tsx` болон `layout.tsx` хэрхэн хамтран ажилладгийг ойлгоно." },
  { type: "h", text: "Онол — JSX гэж юу вэ?" },
  { type: "p", text: "**JSX** нь JavaScript дотор HTML шиг бичих боломж олгодог синтакс. Хөтөч JSX-ийг шууд ойлгодоггүй тул Next.js түүнийг энгийн JavaScript болгон хөрвүүлдэг." },
  { type: "h", text: "JSX-ийн 4 гол дүрэм" },
  { type: "ul", items: [
    "Нэг эцэг элемент буцаах ёстой — олон элементийг `<div>` эсвэл `<>...</>` (fragment) дотор ор.",
    "`class` биш **`className`** ашиглана (class нь JavaScript-ийн түлхүүр үг тул).",
    "JavaScript утгыг **`{ }`** дотор бичнэ: `{name}`, `{2 + 2}`.",
    "Бүх тэг хаагдсан байх ёстой: `<img />`, `<br />`.",
  ] },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `// app/page.tsx
export default function Page() {
  const name = "Shinee";      // энгийн хувьсагч
  const year = 2026;

  return (
    // Нэг эцэг элемент (<div>) дотор бүх зүйл байна
    <div>
      <h1>Сайн байна уу, {name}!</h1>   {/* { } дотор хувьсагч */}
      <p>Он: {year}</p>
      <p>Нийлбэр: {2 + 3}</p>            {/* { } дотор илэрхийлэл */}
    </div>
  );
}` },
  { type: "h", text: "layout.tsx ба page.tsx хамтын ажиллагаа" },
  { type: "p", text: "`layout.tsx` нь `children` буюу доторх хуудсыг хүлээж авч, түүнийг ороож харуулна. Ингэснээр бүх хуудсанд нийтлэг header/footer нэг удаа бичихэд хангалттай." },
  { type: "code", lang: "tsx", code: `// app/layout.tsx
export default function RootLayout({
  children,   // доторх хуудас (page.tsx) энд орно
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body>
        <header>Миний вэбсайт</header>
        {children}                 {/* page.tsx-ийн агуулга энд гарна */}
        <footer>© 2026</footer>
      </body>
    </html>
  );
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Adjacent JSX elements must be wrapped", text: "Хоёр элементийг зэрэгцүүлэн буцаасан. Шийдэл: тэдгээрийг `<div>` эсвэл `<>...</>` дотор ор." },
  { type: "callout", variant: "error", title: "className vs class", text: "JSX дотор `class` бичвэл анхааруулга өгнө. `className` ашигла." },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "JSX туршилт", code: `function App() {
  const name = "Bat";
  const year = 2026;
  return (
    <div>
      <h2>Сайн уу, {name}!</h2>
      <p>Он: {year}</p>
      <p>Нийлбэр: {2 + 3}</p>
    </div>
  );
}` },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `page.tsx` дотор өөрийн нэр, төрсөн оноо хувьсагчаар зарлаад `{ }`-ээр харуул.",
    "Дунд: `layout.tsx`-ийн header дотор өөрийн вэбсайтын нэрийг нэм.",
    "Хүнд: `{ }` дотор `1 + 2 * 3` бичээд гарах үр дүнг тайлбарла.",
  ] },
  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "JSX гэж юу вэ?",
    "JSX дотор JavaScript утгыг яаж бичих вэ?",
    "Яагаад `class` биш `className` ашигладаг вэ?",
    "`layout.tsx` доторх `children` юу вэ?",
  ] },
  { type: "quiz", questions: [
    { q: "JSX дотор хувьсагчийг юугаар бичих вэ?", options: ["( )", "{ }", "[ ]", "< >"], answer: 1 },
    { q: "JSX-д CSS класс өгөхөд аль атрибут?", options: ["class", "className", "css", "style-class"], answer: 1 },
    { q: "layout.tsx доторх {children} юу вэ?", options: ["Хэрэглэгчийн нэр", "Доторх хуудсын агуулга", "CSS файл", "Тоо"], answer: 1 },
    { q: "Олон элемент буцаахад юугаар ороодог вэ?", options: ["<div> эсвэл <>...</>", "Ямар ч ороолт хэрэггүй", "Зөвхөн <span>", "( ) хаалт"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "JSX бол JavaScript дотор HTML бичих арга.",
    "`{ }` дотор хувьсагч, илэрхийлэл бичнэ.",
    "`layout.tsx` нь `children`-ээр хуудсуудыг ороож нийтлэг хэсгийг харуулна.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**1-р модуль, 4-р хичээл: Component, Reusable ба Nested component.** Дэлгэцээ жижиг хэсгүүдэд хувааж, дахин ашиглах аргыг сурна." },
];

// ===== 1-р модуль, 4-р хичээл =====
export const lessonM1L4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Component үүсгэх, тэдгээрийг бие биен дотор оруулах (nested), дахин ашиглах (reusable) аргуудыг сурна." },
  { type: "h", text: "Онол" },
  { type: "p", text: "Дэлгэцийг жижиг **component**-уудад хуваавал: код цэгцтэй болно, дахин ашиглаж болно, засварлахад амар болно. Component дотор өөр component дуудвал үүнийг **nested (үүрлэсэн)** component гэнэ." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `// components/Header.tsx  — тусдаа component
function Header() {
  return <header className="p-4 text-xl font-bold">Миний блог</header>;
}
export default Header;` },
  { type: "code", lang: "tsx", code: `// app/page.tsx  — Header-ыг импортлож ашиглаж байна
import Header from "@/components/Header";

export default function Page() {
  return (
    <div>
      <Header />          {/* nested: Page дотор Header */}
      <main className="p-4">Тавтай морил!</main>
    </div>
  );
}` },
  { type: "h", text: "Reusable component" },
  { type: "p", text: "Нэг component-ыг олон газар дахин ашиглаж болно. Жишээ нь `<Header />`-ыг олон хуудсанд дуудаж болно — нэг л удаа бичсэн." },
  { type: "h", text: "Folder structure" },
  { type: "code", lang: "text", code: `src/
├── app/
│   └── page.tsx
└── components/
    ├── Header.tsx
    └── Footer.tsx` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "export хийхээ мартах", text: "Component-ыг `export default` хийхгүй бол `import` хийхэд алдаа өгнө." },
  { type: "callout", variant: "error", title: "Нэрийг жижиг үсгээр эхлүүлэх", text: "`<header />` (жижиг) нь HTML тэг, `<Header />` (том) чиний component. Ялгааг анхаар." },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Component угсрах", code: `function Header() {
  return <header style={{fontWeight:"bold"}}>Миний блог</header>;
}

function App() {
  return (
    <div>
      <Header />
      <p>Тавтай морил!</p>
    </div>
  );
}` },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `Footer` component үүсгэж `page.tsx`-д нэм.",
    "Дунд: `Header`, `Footer`-ыг өөр хуудсанд дахин ашигла.",
    "Хүнд: `Card` component үүсгээд `page.tsx` дотор 3 удаа дууд.",
  ] },
  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Component-ыг яагаад тусад нь файл болгодог вэ?",
    "Nested component гэж юу вэ?",
    "Reusable component ямар давуу талтай вэ?",
    "Component-ыг өөр файлаас ашиглахын тулд юу хийх вэ?",
  ] },
  { type: "quiz", questions: [
    { q: "Component дотор өөр component дуудвал юу гэдэг вэ?", options: ["Reusable", "Nested", "Server", "Static"], answer: 1 },
    { q: "Component-ыг өөр файлаас ашиглахад юу хэрэгтэй вэ?", options: ["export/import", "CSS", "database", "npm install"], answer: 0 },
    { q: "Дахин ашиглагдах component-ыг юу гэдэг вэ?", options: ["Nested", "Reusable", "Dynamic", "Hidden"], answer: 1 },
    { q: "Component нэр аль нь зөв бэ?", options: ["<footer />", "<Footer />", "<FOOTER>", "<footer_component>"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Component-уудыг тусдаа файлд бичиж цэгцэлдэг.",
    "Nested = component дотор component.",
    "Reusable = нэг component-ыг олон газар дахин ашиглах.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**1-р модуль, 5-р хичээл: Props ба TypeScript props type.** Component-д мэдээлэл дамжуулах аргыг сурна." },
];

// ===== 1-р модуль, 5-р хичээл =====
export const lessonM1L5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Component-д props ашиглан мэдээлэл дамжуулж, TypeScript-ээр props-ийн төрлийг зөв зарлаж сурна." },
  { type: "h", text: "Онол — Props гэж юу вэ?" },
  { type: "p", text: "**Props** (properties) нь эцэг component-оос хүүхэд component руу дамжуулдаг мэдээлэл юм. Функцийн параметртэй адил — гаднаас утга авч, дотроо ашиглана." },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Props нь захиалгын бланк шиг. Кофе захиалахдаа \"хэмжээ: том, сүүтэй\" гэж бланк дүүргэдэг. Тэр мэдээллийг барista (component) авч кофегоо хийдэг." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `// components/Greeting.tsx
// props-ийн төрлийг interface-ээр зарлаж байна
interface GreetingProps {
  name: string;      // заавал текст
  age?: number;      // ? = сонголттой (байж болно, байхгүй ч болно)
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <p>
      Сайн уу, {name}! {age && \`Нас: \${age}\`}
    </p>
  );
}
export default Greeting;` },
  { type: "code", lang: "tsx", code: `// app/page.tsx — props дамжуулж байна
import Greeting from "@/components/Greeting";

export default function Page() {
  return (
    <div>
      <Greeting name="Bat" age={20} />
      <Greeting name="Sara" />        {/* age байхгүй ч болно */}
    </div>
  );
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`interface GreetingProps` — props ямар төрлийн утга авахыг тодорхойлно.",
    "`name: string` — заавал, `age?: number` — сонголттой.",
    "`{ name, age }` — props-ийг задлан (destructure) авч байна.",
    "`<Greeting name=\"Bat\" age={20} />` — эцэг component утгуудыг дамжуулж байна.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Type 'string' is not assignable to type 'number'", text: "`age` нь number гэж зарласан атал текст дамжуулсан. `age={20}` гэж тоогоор дамжуул (`age=\"20\"` биш)." },
  { type: "callout", variant: "error", title: "Property 'name' is missing", text: "Заавал props (`name`) дамжуулаагүй. `<Greeting name=\"...\" />` гэж заавал өг." },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Props дамжуулах", code: `function Greeting({ name, age }) {
  return <p>Сайн уу, {name}! {age && \`Нас: \${age}\`}</p>;
}

function App() {
  return (
    <div>
      <Greeting name="Bat" age={20} />
      <Greeting name="Sara" />
    </div>
  );
}` },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `Greeting`-д `city` props нэмж харуул.",
    "Дунд: `UserCard` component үүсгээд name, email props дамжуул.",
    "Хүнд: `children` props ашиглаж, component дотор дурын JSX дамжуулж үз.",
  ] },
  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Props гэж юу вэ?",
    "Props-ийн төрлийг юугаар зарладаг вэ?",
    "`age?: number` доторх `?` юу гэсэн үг вэ?",
    "Props ямар чиглэлд урсдаг вэ (эцэг→хүүхэд үү, эсрэгээрээ юу)?",
  ] },
  { type: "quiz", questions: [
    { q: "Props ямар чиглэлд дамждаг вэ?", options: ["Хүүхдээс эцэг рүү", "Эцгээс хүүхэд рүү", "Хажуу тийш", "Дээшээ"], answer: 1 },
    { q: "`age?: number` доторх ? юу вэ?", options: ["Алдаа", "Сонголттой (optional)", "Заавал", "Тоо биш"], answer: 1 },
    { q: "Props-ийн төрлийг юугаар зарлах вэ?", options: ["interface / type", "CSS", "useState", "JSON"], answer: 0 },
    { q: "Тоон props-ыг яаж дамжуулах вэ?", options: ['age="20"', "age={20}", "age: 20", "age(20)"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Props = component-д гаднаас өгөх мэдээлэл.",
    "TypeScript-д interface/type-аар props-ийг зарлана.",
    "Props нь үргэлж эцэг→хүүхэд чиглэлд урсдаг.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**1-р модуль, 6-р хичээл: Conditional rendering ба List rendering (key).** Нөхцөлөөр харуулах, жагсаалт зурах аргыг сурна." },
];

// ===== 1-р модуль, 6-р хичээл =====
export const lessonM1L6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Нөхцөлөөс хамааран өөр өөр зүйл харуулах (conditional rendering) болон массиваас жагсаалт зурах (list rendering) аргыг сурна." },
  { type: "h", text: "Онол — Conditional rendering" },
  { type: "p", text: "Тодорхой нөхцөл биелвэл нэг зүйл, эс биелвэл өөр зүйл харуулахыг **conditional rendering** гэнэ. Гол 2 арга: `&&` (зөвхөн үнэн үед) ба `? :` (гурвалсан оператор)." },
  { type: "code", lang: "tsx", code: `export default function Page() {
  const isLoggedIn = true;

  return (
    <div>
      {/* && — зөвхөн үнэн үед харуулна */}
      {isLoggedIn && <p>Тавтай морил!</p>}

      {/* ? : — үнэн бол эхнийх, худал бол хоёр дахь */}
      {isLoggedIn ? <p>Гарах</p> : <p>Нэвтрэх</p>}
    </div>
  );
}` },
  { type: "h", text: "Онол — List rendering ба key" },
  { type: "p", text: "Массивыг дэлгэцэд харуулахдаа **`.map()`** ашигладаг. Элемент бүрт давтагдашгүй **`key`** өгөх ёстой — React өөрчлөлтийг хурдан танихад тусална." },
  { type: "code", lang: "tsx", code: `export default function Page() {
  const fruits = ["Алим", "Гадил", "Усан үзэм"];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        // key — давтагдашгүй байх ёстой
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`{isLoggedIn && ...}` — `isLoggedIn` үнэн бол дараах JSX-ийг харуулна.",
    "`{cond ? A : B}` — cond үнэн бол A, худал бол B.",
    "`.map()` — массивын элемент бүрийг JSX болгон хувиргана.",
    "`key` — жагсаалтын элемент тус бүрийн онцгой таних тэмдэг (ихэвчлэн id).",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "warn", title: 'Warning: Each child in a list should have a unique "key"', text: ".map() дотор key өгөөгүй. Элемент бүрт `key={...}` нэм (боломжтой бол id ашигла, index биш)." },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Нөхцөл ба жагсаалт", code: `function App() {
  const isLoggedIn = true;
  const fruits = ["Алим", "Гадил", "Усан үзэм"];
  return (
    <div>
      {isLoggedIn ? <p>Тавтай морил!</p> : <p>Нэвтэрнэ үү</p>}
      <ul>
        {fruits.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
    </div>
  );
}` },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `score` хувьсагч 60-аас их бол \"Тэнцсэн\", үгүй бол \"Унасан\" харуул.",
    "Дунд: Найзуудынхаа нэрсийн массиваас жагсаалт зур.",
    "Хүнд: Объектын массив (`{id, name}`) зурж, `key`-д `id`-г ашигла.",
  ] },
  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Conditional rendering гэж юу вэ?",
    "`&&` болон `? :` хоёрын ялгаа?",
    "Жагсаалт зурахад ямар функц ашигладаг вэ?",
    "`key` яагаад чухал вэ?",
  ] },
  { type: "quiz", questions: [
    { q: "Массивыг JSX жагсаалт болгоход аль функц?", options: [".filter()", ".map()", ".push()", ".sort()"], answer: 1 },
    { q: "Зөвхөн үнэн үед харуулах оператор?", options: ["||", "&&", "!", "=="], answer: 1 },
    { q: "key-д хамгийн тохиромжтой утга?", options: ["Санамсаргүй тоо", "Давтагдашгүй id", "Үргэлж 0", "Элементийн текст"], answer: 1 },
    { q: "`cond ? A : B` гэдэг нь?", options: ["Давталт", "Гурвалсан оператор (нөхцөл)", "Функц", "Массив"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`&&` ба `? :`-ээр нөхцөлт харуулалт хийнэ.",
    "`.map()`-ээр массивыг жагсаалт болгоно.",
    "Жагсаалтын элемент бүрт давтагдашгүй `key` өгнө.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: '**1-р модуль, 7-р хичээл: Server vs Client Component ("use client").** Хоёр төрлийн component болон тэдгээрийг хэзээ ашиглахыг сурна.' },
];

// ===== 1-р модуль, 7-р хичээл =====
export const lessonM1L7: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: 'Next.js-ийн Server ба Client Component-ийн ялгаа, "use client" директивийн үүрэг, хэзээ алийг ашиглахыг сурна.' },
  { type: "h", text: "Онол" },
  { type: "p", text: "Next.js App Router-т бүх component **анхнаасаа Server Component** байдаг — сервер дээр ажиллаж, бэлэн HTML болж хөтөч рүү ирдэг (хурдан, SEO сайн). Харин хэрэглэгчтэй харилцах (товч дарах, state) хэрэгтэй бол **Client Component** болгодог." },
  { type: "callout", variant: "tip", title: '"use client" гэж юу вэ?', text: 'Файлын хамгийн дээд талд `"use client"` бичвэл тэр component хөтөч дээр (client) ажилладаг болно. useState, onClick зэрэг ашиглахад заавал хэрэгтэй.' },
  { type: "h", text: "Хэзээ алийг ашиглах вэ?" },
  { type: "ul", items: [
    "Server Component (default): зөвхөн мэдээлэл харуулах, өгөгдөл татах, SEO чухал хуудас.",
    'Client Component ("use client"): useState, useEffect, onClick, onChange — интерактив хэсэг.',
    "Зөвлөгөө: аль болох Server-ээр үлдээ, зөвхөн интерактив жижиг хэсгээ Client болго.",
  ] },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `// components/Counter.tsx
"use client";              // ← энэ мөр байхгүй бол useState алдаа өгнө

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Дарсан тоо: {count}
    </button>
  );
}` },
  { type: "code", lang: "tsx", code: `// app/page.tsx  — Server Component (default)
import Counter from "@/components/Counter";

export default function Page() {
  // Энэ бол Server Component — интерактив Counter-ыг дотроо дуудаж болно
  return (
    <div>
      <h1>Нүүр хуудас</h1>
      <Counter />
    </div>
  );
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "useState only works in Client Components", text: '"use client" бичихээ мартсан. useState/useEffect/onClick ашигладаг файлын дээд талд `"use client"` нэм.' },
  { type: "callout", variant: "error", title: "createContext only works in Client Components", text: "Context, hook ашигладаг файл Client байх ёстой. Дээд талд `\"use client\"` нэм." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    'Хялбар: Дээрх `Counter`-оос "use client"-ыг түр устгаад ямар алдаа гарахыг ажигла.',
    "Дунд: `Toggle` component үүсгэж, товч дарахад текст нуух/харуулах болго.",
    'Хүнд: Аль component Server, аль нь Client байх ёстойг жагсааж, шалтгаанаа бич.',
  ] },
  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "App Router-т component анхнаасаа ямар төрөлтэй байдаг вэ?",
    '"use client" юу хийдэг вэ?',
    "useState ашиглахад ямар component хэрэгтэй вэ?",
    "Яагаад аль болох Server Component-ыг илүүд үздэг вэ?",
  ] },
  { type: "quiz", questions: [
    { q: "App Router-т component default нь юу вэ?", options: ["Client Component", "Server Component", "Static", "Dynamic"], answer: 1 },
    { q: "useState ашиглахад юу хэрэгтэй вэ?", options: ['"use server"', '"use client"', "import css", "npm install"], answer: 1 },
    { q: "SEO ба хурдны хувьд аль нь давуу вэ?", options: ["Client", "Server", "Ялгаагүй", "Аль нь ч биш"], answer: 1 },
    { q: '"use client"-ыг хаана бичих вэ?', options: ["Файлын хамгийн дээд талд", "Функц дотор", "return дотор", "package.json-д"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "App Router-т бүх component default-оор Server Component.",
    'Интерактив (state, event) хэрэгтэй бол "use client" нэмж Client болгоно.',
    "Аль болох Server-ээр үлдээж, зөвхөн шаардлагатай хэсгээ Client болгодог.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**1-р модуль, 8-р хичээл: Event handling, re-render ба Profile Card төсөл.** Товч дарах, state өөрчлөгдөхөд дэлгэц шинэчлэгдэх зарчмыг сурч, модулийн төслөө бүтээнэ." },
];

// ===== 1-р модуль, 8-р хичээл (модулийн төсөл) =====
export const lessonM1L8: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Event handling (onClick), re-render зарчмыг ойлгож, сурсан бүхнээ нэгтгэн **Profile Card** төслөө бүтээнэ." },
  { type: "h", text: "Онол — Event ба re-render" },
  { type: "p", text: "**Event handling** нь хэрэглэгчийн үйлдэлд (дарах, бичих) хариу үйлдэл хийх. React-т `onClick`, `onChange` гэх мэтээр бичнэ. **State өөрчлөгдөхөд** React тухайн component-ыг дахин зурдаг — үүнийг **re-render** гэнэ." },
  { type: "code", lang: "tsx", code: `"use client";
import { useState } from "react";

export default function Like() {
  const [likes, setLikes] = useState(0);
  // Товч дарах бүрт setLikes ажиллаж, state өөрчлөгдөнө → re-render
  return <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>;
}` },
  { type: "h", text: "Модулийн төсөл — Profile Card" },
  { type: "p", text: "Одоо сурсан бүхнээ (component, props, conditional rendering, event, state) нэгтгэн Profile Card хийе. Reusable `Button`, `SocialLinks`, props, conditional rendering ашиглана." },
  { type: "h", text: "Folder structure" },
  { type: "code", lang: "text", code: `src/
├── app/
│   └── page.tsx
└── components/
    ├── ProfileCard.tsx
    ├── Button.tsx
    └── SocialLinks.tsx` },
  { type: "code", lang: "tsx", code: `// components/Button.tsx  — reusable товч
"use client";
interface ButtonProps {
  label: string;
  onClick?: () => void;
}
export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
    >
      {label}
    </button>
  );
}` },
  { type: "code", lang: "tsx", code: `// components/SocialLinks.tsx
interface SocialLinksProps {
  github?: string;
  twitter?: string;
}
export default function SocialLinks({ github, twitter }: SocialLinksProps) {
  return (
    <div className="flex gap-3 text-sm text-indigo-600">
      {/* conditional rendering: холбоос байвал л харуулна */}
      {github && <a href={github}>GitHub</a>}
      {twitter && <a href={twitter}>Twitter</a>}
    </div>
  );
}` },
  { type: "code", lang: "tsx", code: `// components/ProfileCard.tsx
"use client";
import { useState } from "react";
import Button from "./Button";
import SocialLinks from "./SocialLinks";

interface ProfileCardProps {
  name: string;
  role: string;
  github?: string;
}
export default function ProfileCard({ name, role, github }: ProfileCardProps) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="mx-auto max-w-sm rounded-2xl border bg-white p-6 text-center shadow">
      <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-indigo-100" />
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-500">{role}</p>

      <div className="mt-3 flex justify-center">
        <SocialLinks github={github} />
      </div>

      <div className="mt-4">
        {/* event + state: дарахад following солигдож re-render болно */}
        <Button
          label={following ? "Дагасан ✓" : "Дагах"}
          onClick={() => setFollowing(!following)}
        />
      </div>
    </div>
  );
}` },
  { type: "code", lang: "tsx", code: `// app/page.tsx
import ProfileCard from "@/components/ProfileCard";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <ProfileCard name="Shinee" role="Frontend Developer" github="https://github.com" />
    </main>
  );
}` },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "ol", items: [
    "`components/` хавтас үүсгэ.",
    "Button.tsx, SocialLinks.tsx, ProfileCard.tsx файлуудыг дээрх кодоор бий болго.",
    "`app/page.tsx`-д ProfileCard-ыг импортол.",
    "`npm run dev` → localhost дээр картаа хараад \"Дагах\" товчийг дарж туршиж үз.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "onClick ажиллахгүй байна", text: "ProfileCard/Button дээр `\"use client\"` бичсэн эсэхээ шалга. Event, state зөвхөн Client Component дээр ажиллана." },
  { type: "callout", variant: "error", title: "Module not found: @/components/...", text: "Импортын зам буруу байна. `@/` нь `src/`-ийг заадаг тул файлын байршлаа шалга." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: ProfileCard-д `twitter` холбоос нэм.",
    "Дунд: Хоёр өөр хүний ProfileCard-ыг нэг хуудсанд харуул (props өөр).",
    "Хүнд: \"Дагагчид\" тоог state-ээр нэмж, Дагах/Болих дээр 1-ээр өсгө/бууруул.",
  ] },
  { type: "h", text: "Бие даалт" },
  { type: "p", text: "Өөрийн жинхэнэ мэдээллээр ProfileCard хийж, дор хаяж 2 reusable component (Button, SocialLinks) ашиглаж, нэг event (Дагах) оруул. Дуусаад дараагийн модульд бэлэн боллоо." },
  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Event handling гэж юу вэ?",
    "Re-render хэзээ болдог вэ?",
    "Reusable component яагаад ашигтай вэ?",
    "onClick доторх `() => ...` юу вэ (функц үү)?",
  ] },
  { type: "quiz", questions: [
    { q: "State өөрчлөгдөхөд юу болдог вэ?", options: ["Юу ч болохгүй", "Component re-render болно", "Хуудас хаагдана", "Алдаа гарна"], answer: 1 },
    { q: "Товч дарахад ажиллуулах атрибут?", options: ["onHover", "onClick", "onLoad", "onKey"], answer: 1 },
    { q: "Reusable component-ийн давуу тал?", options: ["Код давхардахгүй", "Илүү удаан", "CSS хэрэггүй", "Сервер шаардлагагүй"], answer: 0 },
    { q: "Event, state ашигладаг component ямар байх ёстой вэ?", options: ["Server", "Client (\"use client\")", "Static", "Ямар ч ялгаагүй"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Event handling-аар хэрэглэгчийн үйлдэлд хариу үзүүлнэ (onClick).",
    "State өөрчлөгдөхөд component re-render болно.",
    "Profile Card төслөөр component, props, event, conditional rendering-ийг нэгтгэн ашиглав. 1-р модуль дууслаа! 🎉",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**2-р модуль, 1-р хичээл: CSS Modules ба Tailwind CSS-ийн ялгаа.** Todo App модуль эхэлж, загварчлалын хоёр аргыг харьцуулна." },
];
