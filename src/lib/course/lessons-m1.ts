import type { ContentBlock } from "./types";

// ===== JSX Syntax (m1l2) =====
export const lessonM1L3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "JSX-ийн бүх үндсэн дүрмийг эзэмшиж, `page.tsx` ба `layout.tsx` хэрхэн хамтран ажилладгийг ойлгоно." },

  { type: "h", text: "Онол — JSX гэж юу вэ?" },
  { type: "p", text: "**JSX** (JavaScript XML) нь JavaScript дотор HTML шиг бичих боломж олгодог синтакс. Хөтөч JSX-ийг шууд ойлгодоггүй тул Next.js түүнийг энгийн JavaScript болгон хөрвүүлдэг." },
  { type: "code", lang: "tsx", code: `// Чиний бичдэг код (JSX):
<h1 className="title">Сайн уу</h1>

// Хөрвүүлэгдээд болдог код:
React.createElement("h1", { className: "title" }, "Сайн уу")`, },
  { type: "p", text: "Энэ нь яагаад чухал вэ? Учир нь JSX бол зүгээр л **функц дуудлага** гэдгийг ойлговол доорх дүрмүүд бүгд логиктой санагдана." },

  { type: "h", text: "Дүрэм 1 — Нэг эцэг элемент буцаана" },
  { type: "p", text: "Функц нэг л утга буцаадаг шиг, component ч нэг л элемент буцаана. Хоёр элементийг зэрэгцүүлж болохгүй." },
  { type: "code", lang: "tsx", code: `// ✗ БУРУУ — 2 элемент зэрэгцсэн
function App() {
  return (
    <h1>Гарчиг</h1>
    <p>Тайлбар</p>
  );
}

// ✓ ЗӨВ — <div> дотор ороосон
function App() {
  return (
    <div>
      <h1>Гарчиг</h1>
      <p>Тайлбар</p>
    </div>
  );
}

// ✓ ЗӨВ — Fragment (<>...</>) ашигласан, нэмэлт div үүсэхгүй
function App() {
  return (
    <>
      <h1>Гарчиг</h1>
      <p>Тайлбар</p>
    </>
  );
}`, },
  { type: "callout", variant: "tip", title: "Fragment хэзээ ашиглах вэ?", text: "Зөвхөн ороохын тулд нэмэлт `<div>` хэрэгтэй бол Fragment (`<>...</>`) ашигла. Ингэснээр DOM-д илүү элемент үүсэхгүй, CSS-ийн layout эвдрэхгүй." },

  { type: "h", text: "Дүрэм 2 — className, class биш" },
  { type: "p", text: "`class` бол JavaScript-ийн түлхүүр үг (class зарлахад ашигладаг). Тиймээс JSX-д `className` гэж бичдэг. Мөн `for` → `htmlFor` болно." },
  { type: "code", lang: "tsx", code: `// ✗ БУРУУ
<div class="card">
<label for="email">

// ✓ ЗӨВ
<div className="card">
<label htmlFor="email">`, },

  { type: "h", text: "Дүрэм 3 — JavaScript-ийг { } дотор" },
  { type: "p", text: "Дүрэлхий хаалт `{ }` дотор ямар ч JavaScript **илэрхийлэл** (expression) бичиж болно. Гэхдээ `if`, `for` зэрэг **өгүүлбэр** (statement) бичиж болохгүй." },
  { type: "code", lang: "tsx", code: `function App() {
  const name = "Bat";
  const age = 20;
  const user = { city: "УБ" };
  const nums = [1, 2, 3];

  return (
    <div>
      <p>{name}</p>                     {/* хувьсагч */}
      <p>{age + 5}</p>                  {/* тооцоолол → 25 */}
      <p>{name.toUpperCase()}</p>       {/* функц дуудлага → BAT */}
      <p>{user.city}</p>                {/* объектын талбар */}
      <p>{nums.length}</p>              {/* массивын урт → 3 */}
      <p>{age >= 18 ? "Насанд хүрсэн" : "Хүүхэд"}</p>  {/* нөхцөл */}

      {/* ✗ Ингэж болохгүй — if бол statement */}
      {/* {if (age > 18) { ... }} */}
    </div>
  );
}`, },
  { type: "callout", variant: "tip", title: "Expression vs Statement", text: "Expression = утга буцаадаг (`2 + 2`, `name`, `a ? b : c`). Statement = үйлдэл хийдэг (`if`, `for`, `while`). JSX-ийн `{ }` дотор зөвхөн expression орно." },

  { type: "h", text: "Дүрэм 4 — Бүх тэг хаагдсан байна" },
  { type: "p", text: "HTML-д `<img>`, `<br>` гэж хаалтгүй бичиж болдог. JSX-д заавал хаана." },
  { type: "code", lang: "tsx", code: `// ✗ БУРУУ
<img src="a.png">
<br>
<input type="text">

// ✓ ЗӨВ — / тэмдэгтээр хаана
<img src="a.png" />
<br />
<input type="text" />`, },

  { type: "h", text: "Дүрэм 5 — Comment бичих" },
  { type: "code", lang: "tsx", code: `function App() {
  // Энэ бол JSX-ийн ГАДНА байгаа энгийн comment

  return (
    <div>
      {/* Энэ бол JSX-ийн ДОТОР байгаа comment */}
      <p>Текст</p>
    </div>
  );
}`, },

  { type: "h", text: "layout.tsx ба page.tsx хамтын ажиллагаа" },
  { type: "p", text: "`layout.tsx` нь `children` буюу доторх хуудсыг хүлээж авч, түүнийг ороож харуулна. Ингэснээр бүх хуудсанд нийтлэг header/footer нэг л удаа бичихэд хангалттай." },
  { type: "code", lang: "tsx", code: `// app/layout.tsx
export default function RootLayout({
  children,   // ← доторх хуудас (page.tsx) энд орно
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
}`, },
  { type: "code", lang: "tsx", code: `// app/page.tsx
export default function Page() {
  const name = "Shinee";
  const year = 2026;

  return (
    <main>
      <h1>Сайн байна уу, {name}!</h1>
      <p>Он: {year}</p>
    </main>
  );
}`, },
  { type: "p", text: "Хөтчид эцсийн үр дүн иймэрхүү харагдана:" },
  { type: "code", lang: "text", code: `<html>
  <body>
    <header>Миний вэбсайт</header>     ← layout-аас
    <main>
      <h1>Сайн байна уу, Shinee!</h1>  ← page-ээс ({children} байрлалд)
      <p>Он: 2026</p>
    </main>
    <footer>© 2026</footer>            ← layout-аас
  </body>
</html>`, },
  { type: "callout", variant: "tip", title: "Layout олон түвшинтэй байж болно", text: "`app/layout.tsx` бүх хуудсанд, `app/blog/layout.tsx` зөвхөн blog доторх хуудсуудад үйлчилнэ. Тэд давхарлагдана — blog хуудас хоёуланг нь өмсөнө." },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "JSX туршилт", code: `function App() {
  const name = "Bat";
  const year = 2026;
  const skills = ["React", "Next.js", "TypeScript"];

  return (
    <div>
      <h2>Сайн уу, {name}!</h2>
      <p>Он: {year}</p>
      <p>Нийлбэр: {2 + 3}</p>
      <p>Том үсгээр: {name.toUpperCase()}</p>
      <p>Ур чадвар: {skills.length} ширхэг</p>
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Adjacent JSX elements must be wrapped in an enclosing tag", text: "Хоёр элементийг зэрэгцүүлэн буцаасан. Шийдэл: `<div>` эсвэл `<>...</>` дотор ор." },
  { type: "callout", variant: "warn", title: "Invalid DOM property 'class'", text: "JSX дотор `class` бичсэн. `className` ашигла. Мөн `for` → `htmlFor`." },
  { type: "callout", variant: "error", title: "Objects are not valid as a React child", text: "`{user}` гэж бүтэн объектыг харуулах гэсэн. `{user.name}` гэж талбарыг нь заа, эсвэл `{JSON.stringify(user)}` гэж хөрвүүл." },
  { type: "callout", variant: "error", title: "Unexpected token — { } дотор if бичих", text: "`{if (x) {...}}` ажиллахгүй. Оронд нь `{x ? <A /> : <B />}` эсвэл `{x && <A />}` ашигла." },

  { type: "h", text: "Дасгал" },
  { type: "lab", mode: "react", title: "Дасгал — JSX-ийг алхам алхмаар", starter: `function App() {
  // 1-р алхмаас эхэлнэ. Кодоо энд бич.
  return (
    <div>
      <h2>Миний танилцуулга</h2>
    </div>
  );
}`, steps: [
    {
      task: "Нэр, төрсөн он хоёрыг хувьсагчаар зарлаад `{ }`-ээр дэлгэцэд харуул.",
      hint: "`const name = \"Бат\";` гэж return-ээс ДЭЭР зарлаад, JSX дотор `{name}` гэж бич.",
      solution: `function App() {
  const name = "Бат";
  const birthYear = 2004;

  return (
    <div>
      <h2>Миний танилцуулга</h2>
      <p>Нэр: {name}</p>
      <p>Төрсөн он: {birthYear}</p>
    </div>
  );
}`,
    },
    {
      task: "Одоо `{ }` дотор тооцоолол хий — насаа `2026 - birthYear` гэж бод.",
      hint: "JSX-ийн `{ }` дотор ямар ч JavaScript илэрхийлэл бичиж болно.",
    },
    {
      task: "Объект зарлаад (`const user = { city: \"УБ\", job: \"Оюутан\" }`) 2 талбарыг нь `{user.city}` хэлбэрээр харуул.",
      hint: "Объектыг шууд `{user}` гэж харуулж БОЛОХГҮЙ — талбарыг нь заа.",
    },
    {
      task: "`{ }` дотор `1 + 2 * 3` бичээд ажиллуул. Яагаад 9 биш 7 гарч байна вэ?",
      hint: "JavaScript-ийн үйлдлийн дараалал: үржих нэмэхээс түрүүлнэ. 9 гаргах бол `(1 + 2) * 3`.",
    },
    {
      task: "Хамгийн гадна талын `<div>`-ыг Fragment (`<>...</>`) болгож сольж, ажиллаж байгаа эсэхийг шалга.",
      hint: "Fragment нь DOM-д илүү элемент үүсгэхгүй. `<div>` → `<>`, `</div>` → `</>`.",
    },
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "JSX гэж юу вэ, хөрвүүлэгдээд юу болдог вэ?",
    "Яагаад нэг эцэг элемент буцаах шаардлагатай вэ?",
    "Fragment хэзээ ашиглах нь тохиромжтой вэ?",
    "Яагаад `class` биш `className` ашигладаг вэ?",
    "Expression ба statement хоёрын ялгаа юу вэ?",
    "`layout.tsx` доторх `children` юу вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "JSX дотор хувьсагчийг юугаар бичих вэ?", options: ["( )", "{ }", "[ ]", "< >"], answer: 1 },
    { q: "JSX-д CSS класс өгөхөд аль атрибут?", options: ["class", "className", "css", "style-class"], answer: 1 },
    { q: "layout.tsx доторх {children} юу вэ?", options: ["Хэрэглэгчийн нэр", "Доторх хуудсын агуулга", "CSS файл", "Тоо"], answer: 1 },
    { q: "Олон элемент буцаахад юугаар ороодог вэ?", options: ["<div> эсвэл <>...</>", "Ямар ч ороолт хэрэггүй", "Зөвхөн <span>", "( ) хаалт"], answer: 0 },
    { q: "JSX-ийн { } дотор аль нь ОРОХГҮЙ вэ?", options: ["2 + 2", "name.toUpperCase()", "if (x) {...}", "a ? b : c"], answer: 2 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "JSX бол JavaScript дотор HTML бичих арга — хөрвүүлэгдээд `React.createElement()` болдог.",
    "Нэг эцэг элемент буцаана (`<div>` эсвэл Fragment `<>`).",
    "`className`, `htmlFor` ашиглана. Бүх тэг хаагдсан байна.",
    "`{ }` дотор зөвхөн expression (утга буцаадаг зүйл) орно.",
    "`layout.tsx` нь `children`-ээр хуудсуудыг ороож нийтлэг хэсгийг харуулна.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Thinking in React** — дэлгэцийг component болгон хуваах сэтгэлгээг эзэмшинэ." },
];

// ===== Components (m1l4) =====
export const lessonM1L4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Component үүсгэх, тусдаа файлд салгах, дахин ашиглах (reusable), бие биен дотор оруулах (nested) аргуудыг эзэмшинэ." },

  { type: "h", text: "Онол — Яагаад component-д хуваадаг вэ?" },
  { type: "p", text: "Нэг файлд 500 мөр код бичихийн оронд 5 файлд 100 мөр бичих нь дараах шалтгаанаар дээр:" },
  { type: "ul", items: [
    "**Олоход хялбар** — \"Header-ийн алдаа\" гэвэл `Header.tsx`-ыг нээнэ.",
    "**Дахин ашиглагдана** — нэг Card-ыг 50 газар ашиглана.",
    "**Тусдаа тестлэж болно** — нэг component-ыг тусад нь шалгана.",
    "**Багаар ажиллахад** — 2 хүн өөр өөр файл дээр ажиллавал мөргөлдөхгүй.",
    "**Тархиа хэмнэнэ** — нэг удаад нэг л зүйлийн тухай бодно.",
  ] },

  { type: "h", text: "Component-ийн 2 бичих хэлбэр" },
  { type: "code", lang: "tsx", code: `// 1) function declaration — хамгийн түгээмэл
function Header() {
  return <header>Миний блог</header>;
}

// 2) arrow function — мөн адил зөв
const Header = () => {
  return <header>Миний блог</header>;
};

// 3) arrow function, богино хэлбэр (return бичихгүй)
const Header = () => <header>Миний блог</header>;`, },
  { type: "callout", variant: "tip", title: "Аль нь дээр вэ?", text: "Аль аль нь ижил ажиллана. Багийн стандартаа дага. Next.js-ийн жишээнүүдэд ихэвчлэн `function` хэлбэр ашигладаг." },

  { type: "h", text: "Тусдаа файлд салгах" },
  { type: "code", lang: "tsx", code: `// src/components/Header.tsx
function Header() {
  return (
    <header className="border-b p-4 text-xl font-bold">
      Миний блог
    </header>
  );
}

// export хийхгүй бол өөр файлаас ашиглаж чадахгүй
export default Header;`, },
  { type: "code", lang: "tsx", code: `// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t p-4 text-sm text-gray-500">
      © 2026 Миний блог
    </footer>
  );
}`, },
  { type: "code", lang: "tsx", code: `// src/app/page.tsx — хоёуланг нь угсарч байна
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div>
      <Header />                        {/* nested: Page дотор Header */}
      <main className="p-4">Тавтай морил!</main>
      <Footer />
    </div>
  );
}`, },

  { type: "h", text: "Nested component — үүрлэсэн бүтэц" },
  { type: "p", text: "Component дотор өөр component дуудахыг **nesting** гэнэ. Ингэж жижигээс томыг угсарна:" },
  { type: "code", lang: "text", code: `Page
├── Header
│   ├── Logo
│   └── Nav
│       ├── NavLink
│       └── NavLink
├── main
└── Footer`, },

  { type: "h", text: "Reusable component — дахин ашиглах" },
  { type: "p", text: "Нэг component-ыг олон газар дуудаж болно. Доорх `Card`-ыг 3 удаа ашиглаж байна:" },
  { type: "code", lang: "tsx", code: `function Card() {
  return <div className="rounded border p-4">Карт</div>;
}

export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card />
      <Card />
      <Card />
    </div>
  );
}`, },
  { type: "callout", variant: "warn", title: "Гэхдээ 3 карт нь яг ижил байна!", text: "Бодит амьдралд карт бүр өөр агуулгатай байх ёстой. Үүнийг **props**-оор шийднэ — дараагийн хичээлээр үзнэ." },

  { type: "h", text: "Folder structure" },
  { type: "code", lang: "text", code: `src/
├── app/
│   └── page.tsx
└── components/
    ├── Header.tsx
    ├── Footer.tsx
    └── Card.tsx`, },
  { type: "callout", variant: "tip", title: "Хаана байрлуулах вэ?", text: "Олон газар ашиглагдах бол `src/components/`. Зөвхөн нэг хуудсанд хамаатай бол тэр хуудасны хавтас дотор (ж: `app/blog/_components/`)." },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Component угсрах", code: `function Header() {
  return <header style={{fontWeight:"bold",borderBottom:"1px solid #ddd",paddingBottom:8}}>
    Миний блог
  </header>;
}

function Footer() {
  return <footer style={{color:"#888",fontSize:13,marginTop:16}}>
    © 2026
  </footer>;
}

function App() {
  return (
    <div>
      <Header />
      <p>Тавтай морил!</p>
      <Footer />
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "export хийхээ мартах", text: "Component-ыг `export default` хийхгүй бол `import` хийхэд \"has no default export\" гэсэн алдаа гарна." },
  { type: "callout", variant: "error", title: "Нэрийг жижиг үсгээр эхлүүлэх", text: "`<header />` (жижиг) нь HTML тэг, `<Header />` (том) чиний component. Жижиг үсгээр бичвэл чиний код ажиллахгүй, алдаа ч өгөхгүй — зүгээр л хоосон харагдана." },
  { type: "callout", variant: "error", title: "Module not found: Can't resolve '@/components/Header'", text: "Файлын зам буруу эсвэл файл байхгүй. `@/` нь `src/`-ийг заадаг тул `@/components/Header` = `src/components/Header.tsx`." },
  { type: "callout", variant: "warn", title: "Component дотор component зарлах", text: "`function Page() { function Card() {...} ... }` гэж дотор нь зарлаж болохгүй — render бүрт шинээр үүсч гүйцэтгэл муудна. Гадна нь зарла." },

  { type: "h", text: "Дасгал" },
  { type: "lab", mode: "react", title: "Дасгал — Хуудсаа component болгон угсрах", starter: `function Header() {
  return <h2>Миний сайт</h2>;
}

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}`, steps: [
    {
      task: "`Sidebar` нэртэй component үүсгээд `App` дотор `<Sidebar />` гэж дууд.",
      hint: "Component нэр ЗААВАЛ том үсгээр эхэлнэ. Жижиг үсгээр бичвэл React үүнийг HTML тэг гэж үзнэ.",
      solution: `function Header() {
  return <h2>Миний сайт</h2>;
}

function Sidebar() {
  return <nav>Цэс: Нүүр · Тухай · Холбоо</nav>;
}

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
}`,
    },
    {
      task: "`Card` component үүсгээд `App` дотор 3 удаа дууд. Гурвуулаа ижил харагдана — энэ бол хэвийн.",
      hint: "Нэг component-ыг хэдэн ч удаа дуудаж болно. Дараагийн хичээлд props-оор өөр өөр болгоно.",
    },
    {
      task: "`Logo` component үүсгээд `Header` ДОТОР нь дууд — 2 түвшний nesting болно.",
      hint: "`App` → `Header` → `Logo`. Component дотор өөр component дуудаж болно.",
    },
    {
      task: "`Footer` component нэмж, `App`-ийн бүтцийг Header → Sidebar → Card×3 → Footer дараалалд оруул.",
      hint: "JSX-д элементийн дараалал нь дэлгэц дээрх дарааллыг тодорхойлно.",
    },
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Component-ыг яагаад тусад нь файл болгодог вэ (3 шалтгаан)?",
    "Nested component гэж юу вэ?",
    "Reusable component ямар давуу талтай вэ?",
    "Component-ыг өөр файлаас ашиглахын тулд юу хийх вэ?",
    "Component-ыг өөр component дотор зарлаж болох уу, яагаад?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Component дотор өөр component дуудвал юу гэдэг вэ?", options: ["Reusable", "Nested", "Server", "Static"], answer: 1 },
    { q: "Component-ыг өөр файлаас ашиглахад юу хэрэгтэй вэ?", options: ["export/import", "CSS", "database", "npm install"], answer: 0 },
    { q: "Дахин ашиглагдах component-ыг юу гэдэг вэ?", options: ["Nested", "Reusable", "Dynamic", "Hidden"], answer: 1 },
    { q: "Component нэр аль нь зөв бэ?", options: ["<footer />", "<Footer />", "<FOOTER>", "<footer_component>"], answer: 1 },
    { q: "`@/components/Header` ямар зам вэ?", options: ["node_modules/", "src/components/Header", "public/", "app/"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Component-уудыг тусдаа файлд бичиж цэгцэлдэг — олоход, дахин ашиглахад, багаар ажиллахад амар.",
    "`export default` хийж, `import`-оор авна.",
    "Nesting = component дотор component. Ингэж жижигээс томыг угсарна.",
    "Component-ыг өөр component **дотор** зарлаж болохгүй — гадна нь зарла.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Nesting Components** — үүрлэсэн бүтцийг гүнзгий, олон түвшний жишээгээр үзнэ." },
];

// ===== Props (m1l6) =====
export const lessonM1L5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Props ашиглан component-д мэдээлэл дамжуулж, TypeScript-ээр төрлийг нь зөв зарлаж, `children` props-ыг ашиглаж сурна." },

  { type: "h", text: "Онол — Props гэж юу вэ?" },
  { type: "p", text: "Өмнөх хичээлд `<Card />`-ыг 3 удаа дуудсан ч бүгд ижил харагдаж байсан. Бодит амьдралд карт бүр өөр агуулгатай байх ёстой. **Props** нь яг үүнийг шийддэг." },
  { type: "p", text: "**Props** (properties) нь эцэг component-оос хүүхэд component руу дамжуулдаг мэдээлэл юм. Функцийн параметртэй яг адилхан — гаднаас утга авч, дотроо ашиглана." },
  { type: "code", lang: "tsx", code: `// Энгийн функц — параметр авдаг
function greet(name) {
  return "Сайн уу, " + name;
}
greet("Bat");    // "Сайн уу, Bat"

// React component — props авдаг (ижил зарчим!)
function Greeting({ name }) {
  return <p>Сайн уу, {name}</p>;
}
<Greeting name="Bat" />    // <p>Сайн уу, Bat</p>`, },

  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Props нь захиалгын бланк шиг. Кофе захиалахдаа \"хэмжээ: том, сүүтэй, чихэргүй\" гэж бланк дүүргэдэг. Тэр мэдээллийг barista (component) авч кофегоо хийдэг. Барista нэг л боловч захиалга болгонд өөр кофе гардаг." },

  { type: "h", text: "Props дамжуулах 3 хэлбэр" },
  { type: "code", lang: "tsx", code: `// 1) Текст — шууд хашилтанд
<Greeting name="Bat" />

// 2) Тоо, boolean, массив, объект — { } дотор
<Greeting age={20} />
<Greeting isActive={true} />
<Greeting tags={["dev", "student"]} />
<Greeting user={{ city: "УБ" }} />

// 3) Boolean-ийг товчлон (утга нь true болно)
<Greeting isActive />        // = isActive={true}`, },
  { type: "callout", variant: "error", title: "Түгээмэл андуурал", text: "`age=\"20\"` гэвэл **текст** \"20\" дамжина, тоо биш! `age={20}` гэж { } дотор бич." },

  { type: "h", text: "Props-ыг хүлээж авах 2 арга" },
  { type: "code", lang: "tsx", code: `// 1) props объектоор авах
function Greeting(props) {
  return <p>Сайн уу, {props.name}! Нас: {props.age}</p>;
}

// 2) Задлан авах (destructuring) — илүү түгээмэл, цэвэрхэн
function Greeting({ name, age }) {
  return <p>Сайн уу, {name}! Нас: {age}</p>;
}`, },

  { type: "h", text: "TypeScript-ээр төрөл зарлах" },
  { type: "p", text: "TypeScript ашиглаж байгаа тул props ямар төрлийн утга авахыг тодорхойлно. Ингэснээр буруу утга дамжуулбал бичиж байхад л алдаа мэдэгдэнэ." },
  { type: "code", lang: "tsx", code: `// components/Greeting.tsx
// props-ийн бүтцийг interface-ээр зарлаж байна
interface GreetingProps {
  name: string;        // заавал байх, текст
  age?: number;        // ? = сонголттой (байж болно, байхгүй ч болно)
  isVip?: boolean;
}

function Greeting({ name, age, isVip = false }: GreetingProps) {
  //                              ^^^^^^^^^^^ анхны утга (default)
  return (
    <p>
      Сайн уу, {name}!
      {age && \` Нас: \${age}\`}
      {isVip && " ⭐ VIP"}
    </p>
  );
}
export default Greeting;`, },
  { type: "code", lang: "tsx", code: `// app/page.tsx — ашиглаж байна
import Greeting from "@/components/Greeting";

export default function Page() {
  return (
    <div>
      <Greeting name="Bat" age={20} isVip />
      <Greeting name="Sara" />                  {/* age байхгүй ч болно */}
      {/* <Greeting age={30} /> ← АЛДАА: name дутуу */}
    </div>
  );
}`, },

  { type: "h", text: "children props — тусгай props" },
  { type: "p", text: "`children` нь component-ийн нээх/хаах тэгийн ДОТОР бичсэн бүх зүйл. Ороодог component (Card, Modal, Layout) хийхэд зайлшгүй хэрэгтэй." },
  { type: "code", lang: "tsx", code: `interface CardProps {
  title: string;
  children: React.ReactNode;   // дурын JSX орж болно
}

function Card({ title, children }: CardProps) {
  return (
    <div className="rounded border p-4">
      <h3 className="font-bold">{title}</h3>
      <div>{children}</div>      {/* энд доторх агуулга орно */}
    </div>
  );
}

// Ашиглах
<Card title="Мэдээлэл">
  <p>Энэ текст children болж орно.</p>
  <button>Товч ч бас болно</button>
</Card>`, },

  { type: "h", text: "Props нэг чиглэлд урсдаг" },
  { type: "p", text: "React-ийн чухал дүрэм: **props үргэлж эцгээс хүүхэд рүү** урсдаг. Хүүхэд component нь props-ыг өөрчилж болохгүй (read-only)." },
  { type: "code", lang: "text", code: `App  (өгөгдөл энд байна)
 │  props ↓
 ├── Header
 │    │ props ↓
 │    └── Logo
 └── UserList
      │ props ↓
      └── UserCard`, },
  { type: "callout", variant: "error", title: "Props-ыг өөрчилж болохгүй", text: "`function Greeting({ name }) { name = \"Өөр\"; ... }` гэж бичиж болохгүй. Props бол read-only. Өөрчлөгддөг өгөгдөл хэрэгтэй бол **state** ашиглана (2-р модульд үзнэ)." },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Props дамжуулах", code: `function Greeting({ name, age }) {
  return <p>Сайн уу, {name}! {age && \`Нас: \${age}\`}</p>;
}

function Card({ title, children }) {
  return (
    <div style={{border:"1px solid #ddd",borderRadius:8,padding:12,marginBottom:8}}>
      <b>{title}</b>
      <div>{children}</div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Greeting name="Bat" age={20} />
      <Greeting name="Sara" />

      <Card title="Миний карт">
        <p>Энэ бол children.</p>
      </Card>
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Type 'string' is not assignable to type 'number'", text: "`age` нь number гэж зарласан атал текст дамжуулсан. `age={20}` гэж тоогоор дамжуул (`age=\"20\"` биш)." },
  { type: "callout", variant: "error", title: "Property 'name' is missing in type", text: "Заавал props (`name`) дамжуулаагүй. `<Greeting name=\"...\" />` гэж заавал өг, эсвэл `name?: string` гэж сонголттой болго." },
  { type: "callout", variant: "error", title: "Cannot read properties of undefined", text: "Дамжуулаагүй props-ын талбарт хандсан. `user?.name` гэж optional chaining ашигла, эсвэл default утга өг." },
  { type: "callout", variant: "warn", title: "Props хэт олон болох", text: "8-10 props болбол component хэт олон ажил хийж байна гэсэн үг. Жижиг component-д хуваахыг бод." },

  { type: "h", text: "Дасгал" },
  { type: "lab", mode: "react", title: "Дасгал — Props-оор өгөгдөл дамжуулах", starter: `function Greeting({ name }) {
  return <p>Сайн уу, {name}!</p>;
}

function App() {
  return (
    <div>
      <Greeting name="Бат" />
      <Greeting name="Сараа" />
    </div>
  );
}`, steps: [
    {
      task: "`Greeting`-д `city` props нэмж, \"Сайн уу, Бат! (УБ)\" гэж харуулдаг болго.",
      hint: "Хоёр газар засна: `function Greeting({ name, city })` ба `<Greeting name=\"Бат\" city=\"УБ\" />`.",
      solution: `function Greeting({ name, city }) {
  return (
    <p>
      Сайн уу, {name}! ({city})
    </p>
  );
}

function App() {
  return (
    <div>
      <Greeting name="Бат" city="УБ" />
      <Greeting name="Сараа" city="Дархан" />
    </div>
  );
}`,
    },
    {
      task: "`UserCard` component үүсгээд `name`, `email`, `role` гурван props дамжуул. `App` дотор 2 удаа өөр өгөгдлөөр дууд.",
      hint: "Props нь объект — `function UserCard({ name, email, role })` гэж задалж авна.",
    },
    {
      task: "`UserCard`-д `isVip` boolean props нэмж, үнэн бол нэрийн хажууд ⭐ харуул.",
      hint: "`<UserCard isVip />` гэж бичвэл `true` гэсэн үг. Харуулахдаа `{isVip && \"⭐\"}`.",
    },
    {
      task: "Тоон props дамжуулж үз — `<UserCard age={25} />`. Хашилтанд `age=\"25\"` гэж бичвэл юу болохыг ажигла.",
      hint: "Хашилттай бол текст (`\"25\"`), угалзан хаалттай бол тоо (`25`). `typeof age` гэж шалгаж болно.",
    },
    {
      task: "`children` props ашиглаж `Alert` component хий — гарчиг props-оор, доторх агуулга нь `children`-ээр орно.",
      hint: "`function Alert({ title, children })` → `<Alert title=\"Анхаар\"><p>Ямар нэг зүйл</p></Alert>`",
    },
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Props гэж юу вэ? Функцийн параметртэй юугаараа адилхан вэ?",
    "Props-ийн төрлийг юугаар зарладаг вэ?",
    "`age?: number` доторх `?` юу гэсэн үг вэ?",
    "`age=\"20\"` ба `age={20}` хоёрын ялгаа юу вэ?",
    "`children` props юу вэ, хэзээ хэрэгтэй вэ?",
    "Props ямар чиглэлд урсдаг вэ? Хүүхэд component props-ыг өөрчилж болох уу?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Props ямар чиглэлд дамждаг вэ?", options: ["Хүүхдээс эцэг рүү", "Эцгээс хүүхэд рүү", "Хажуу тийш", "Дээшээ"], answer: 1 },
    { q: "`age?: number` доторх ? юу вэ?", options: ["Алдаа", "Сонголттой (optional)", "Заавал", "Тоо биш"], answer: 1 },
    { q: "Props-ийн төрлийг юугаар зарлах вэ?", options: ["interface / type", "CSS", "useState", "JSON"], answer: 0 },
    { q: "Тоон props-ыг яаж дамжуулах вэ?", options: ['age="20"', "age={20}", "age: 20", "age(20)"], answer: 1 },
    { q: "Тэгийн дотор бичсэн агуулгыг ямар props авдаг вэ?", options: ["content", "children", "inner", "body"], answer: 1 },
    { q: "Props-ыг component дотор өөрчилж болох уу?", options: ["Тийм", "Үгүй — read-only", "Заримдаа", "Зөвхөн тоог"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Props = component-д гаднаас өгөх мэдээлэл (функцийн параметртэй адил).",
    "TypeScript-д `interface`-ээр зарлана. `?` = сонголттой.",
    "Текст `name=\"x\"`, бусад бүх төрөл `{ }` дотор.",
    "`children` = тэгийн доторх агуулга.",
    "Props эцгээс хүүхэд рүү урсана, read-only.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Conditional Render** — нөхцөлөөс хамааран өөр өөр зүйл харуулах, жагсаалт зурах аргыг сурна." },
];

// ===== Conditional Render (m1l7) =====
export const lessonM1L6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Нөхцөлөөс хамааран өөр өөр UI харуулах бүх аргыг эзэмшиж, массиваас жагсаалт зурж, `key`-г зөв ашиглана." },

  { type: "h", text: "Онол — Conditional rendering гэж юу вэ?" },
  { type: "p", text: "Хэрэглэгч нэвтэрсэн эсэхээс хамааран өөр товч, өгөгдөл ачаалж байх үед spinner, алдаа гарвал улаан мессеж — эдгээр бүгд **conditional rendering**." },

  { type: "h", text: "Арга 1 — && (зөвхөн үнэн үед харуулах)" },
  { type: "code", lang: "tsx", code: `function App() {
  const isLoggedIn = true;
  const errorMsg = "";

  return (
    <div>
      {/* isLoggedIn үнэн бол дараах JSX харагдана */}
      {isLoggedIn && <p>Тавтай морил!</p>}

      {/* errorMsg хоосон биш бол л харагдана */}
      {errorMsg && <p style={{color:"red"}}>{errorMsg}</p>}
    </div>
  );
}`, },
  { type: "callout", variant: "warn", title: "&& -тэй холбоотой ноцтой алуур", text: "`{count && <p>...</p>}` бичээд `count = 0` бол дэлгэцэд **0** гэсэн тоо гарч ирнэ! Учир нь `0` бол falsy боловч React түүнийг хэвлэдэг. Шийдэл: `{count > 0 && <p>...</p>}` гэж boolean болго." },

  { type: "h", text: "Арга 2 — ? : (гурвалсан оператор)" },
  { type: "code", lang: "tsx", code: `function App() {
  const isLoggedIn = false;

  return (
    <div>
      {/* нөхцөл ? үнэн_бол : худал_бол */}
      {isLoggedIn ? <button>Гарах</button> : <button>Нэвтрэх</button>}

      <p>{isLoggedIn ? "Онлайн" : "Офлайн"}</p>
    </div>
  );
}`, },

  { type: "h", text: "Арга 3 — Эрт буцаах (early return)" },
  { type: "p", text: "Бүх UI өөр байх бол `return`-ыг эрт хийвэл код цэвэрхэн болно." },
  { type: "code", lang: "tsx", code: `function UserProfile({ user, loading, error }) {
  // Тус бүрд нь эрт буцаана — доор нь давхар нөхцөл бичих шаардлагагүй
  if (loading) return <p>Уншиж байна...</p>;
  if (error) return <p style={{color:"red"}}>Алдаа: {error}</p>;
  if (!user) return <p>Хэрэглэгч олдсонгүй</p>;

  // Энд хүрсэн бол user заавал байна гэдэг нь баталгаатай
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`, },
  { type: "callout", variant: "tip", title: "Хэзээ алийг ашиглах вэ?", text: "`&&` — жижиг хэсгийг нуух/харуулах. `? :` — хоёр өөр зүйлийн нэгийг сонгох. Early return — бүтэн UI өөр байх (loading/error/success)." },

  { type: "h", text: "Юу ч харуулахгүй бол" },
  { type: "code", lang: "tsx", code: `function Banner({ show }) {
  if (!show) return null;      // null буцаавал юу ч зурагдахгүй
  return <div>Зар сурталчилгаа</div>;
}`, },

  { type: "h", text: "List rendering — массиваас жагсаалт зурах" },
  { type: "p", text: "Массивыг дэлгэцэд харуулахдаа **`.map()`** ашигладаг. `.map()` нь массивын элемент бүрийг өөр зүйл болгон хувиргадаг." },
  { type: "code", lang: "tsx", code: `// .map() яаж ажилладаг вэ?
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);      // [2, 4, 6]

// React-д — элемент бүрийг JSX болгож хувиргана
const fruits = ["Алим", "Гадил", "Усан үзэм"];
const items = fruits.map((f) => <li>{f}</li>);
// [<li>Алим</li>, <li>Гадил</li>, <li>Усан үзэм</li>]`, },
  { type: "code", lang: "tsx", code: `function FruitList() {
  const fruits = ["Алим", "Гадил", "Усан үзэм"];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}`, },

  { type: "h", text: "key яагаад хэрэгтэй вэ?" },
  { type: "p", text: "React жагсаалт өөрчлөгдөхөд \"аль элемент нь аль байсан бэ?\" гэдгийг мэдэх хэрэгтэй. `key` бол тэр таних тэмдэг. Байхгүй бол React бүх элементийг дахин зурж, гүйцэтгэл муудаж, заримдаа буруу өгөгдөл харагддаг." },
  { type: "code", lang: "tsx", code: `// ✗ МУУ — index-ийг key болгох
{todos.map((todo, i) => <li key={i}>{todo.text}</li>)}
// Эхэнд шинэ зүйл нэмэхэд бүх index шилжиж, React андуурна

// ✓ САЙН — давтагдашгүй id ашиглах
{todos.map((todo) => <li key={todo.id}>{todo.text}</li>)}`, },
  { type: "callout", variant: "tip", title: "Index-ийг key болгож болох тохиолдол", text: "Жагсаалт хэзээ ч эрэмбэлэгдэхгүй, элемент нэмэгдэж/хасагдахгүй бол index зүгээр. Эргэлзвэл id ашигла." },

  { type: "h", text: "Объектын массив зурах" },
  { type: "code", lang: "tsx", code: `interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoList() {
  const todos: Todo[] = [
    { id: 1, text: "Ном унших", done: true },
    { id: 2, text: "Дасгал хийх", done: false },
  ];

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ textDecoration: todo.done ? "line-through" : "none" }}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`, },

  { type: "h", text: "Хоосон жагсаалтыг зөв харуулах" },
  { type: "code", lang: "tsx", code: `function TodoList({ todos }) {
  // Хоосон бол ойлгомжтой мессеж харуул (хоосон дэлгэц биш)
  if (todos.length === 0) {
    return <p>Одоогоор ажил алга. Эхнийхээ нэмээрэй!</p>;
  }

  return <ul>{todos.map((t) => <li key={t.id}>{t.text}</li>)}</ul>;
}`, },

  { type: "h", text: "Шүүх + зурах (filter + map)" },
  { type: "code", lang: "tsx", code: `function TodoList({ todos, showDone }) {
  // Эхлээд шүүнэ, дараа нь зурна
  const visible = showDone ? todos : todos.filter((t) => !t.done);

  return (
    <ul>
      {visible.map((t) => <li key={t.id}>{t.text}</li>)}
    </ul>
  );
}`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Нөхцөл ба жагсаалт", code: `function App() {
  const isLoggedIn = true;
  const count = 0;
  const todos = [
    { id: 1, text: "Ном унших", done: true },
    { id: 2, text: "Дасгал хийх", done: false },
    { id: 3, text: "Код бичих", done: false },
  ];

  return (
    <div>
      {/* ? : оператор */}
      {isLoggedIn ? <p>Тавтай морил!</p> : <p>Нэвтэрнэ үү</p>}

      {/* && — count > 0 гэж boolean болгосон (0 хэвлэгдэхгүй) */}
      {count > 0 && <p>Мэдэгдэл: {count}</p>}

      <ul>
        {todos.map((t) => (
          <li key={t.id} style={{textDecoration: t.done ? "line-through" : "none"}}>
            {t.text}
          </li>
        ))}
      </ul>

      <p>Дуусаагүй: {todos.filter((t) => !t.done).length}</p>
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "warn", title: 'Warning: Each child in a list should have a unique "key" prop', text: ".map() дотор key өгөөгүй. Элемент бүрт `key={...}` нэм (боломжтой бол id, index биш)." },
  { type: "callout", variant: "error", title: "Дэлгэц дээр 0 гарч ирэх", text: "`{count && <p>...</p>}` бичээд count = 0 болсон. `{count > 0 && ...}` гэж boolean болго." },
  { type: "callout", variant: "error", title: "Objects are not valid as a React child", text: "Объектыг шууд харуулах гэсэн. `{todo}` биш `{todo.text}` гэж талбарыг нь заа." },
  { type: "callout", variant: "error", title: ".map() юу ч буцаахгүй байна", text: "`{items.map((i) => { <li>{i}</li> })}` — `{ }` хэрэглэсэн бол `return` заавал бич. Эсвэл `( )` ашигла: `.map((i) => (<li>{i}</li>))`." },
  { type: "callout", variant: "error", title: "Cannot read properties of undefined (reading 'map')", text: "Массив хараахан ирээгүй (undefined). `{items?.map(...)}` эсвэл `const items = data ?? []` гэж хамгаал." },

  { type: "h", text: "Дасгал" },
  { type: "lab", mode: "react", title: "Дасгал — Нөхцөл ба жагсаалт", starter: `function App() {
  const score = 75;

  return (
    <div>
      <h3>Дүн: {score}</h3>
    </div>
  );
}`, steps: [
    {
      task: "`score` 60-аас их бол \"Тэнцсэн\", үгүй бол \"Унасан\" гэж харуул. Дараа нь `score`-ыг 40 болгож шалга.",
      hint: "Тернар оператор: `{score >= 60 ? \"Тэнцсэн\" : \"Унасан\"}`",
      solution: `function App() {
  const score = 75;

  return (
    <div>
      <h3>Дүн: {score}</h3>
      <p>{score >= 60 ? "Тэнцсэн ✓" : "Унасан ✗"}</p>
    </div>
  );
}`,
    },
    {
      task: "Найзуудынхаа нэрсийг массив болгож (`{ id, name }` объект) `.map()`-ээр жагсаалт зур.",
      hint: "`{friends.map((f) => <li key={f.id}>{f.name}</li>)}` — `key` заавал, index биш `id`.",
    },
    {
      task: "Массив хоосон үед \"Хоосон байна\" гэж харуулдаг болго. Туршихдаа массиваа `[]` болго.",
      hint: "`{friends.length === 0 ? <p>Хоосон байна</p> : <ul>...</ul>}`",
    },
    {
      task: "Массивт `done: true/false` талбар нэмж, `.filter()`-ээр зөвхөн дуусаагүйг харуул. Тоог нь доор бич.",
      hint: "`const pending = friends.filter((f) => !f.done);` дараа нь `pending.map(...)` ба `pending.length`.",
    },
    {
      task: "Одоо `{pending.length && <p>...</p>}` гэж бичээд массивыг хоосон болго. Дэлгэц дээр юу гарч байна вэ?",
      hint: "0 гарна! `0` нь falsy ч React түүнийг ХЭВЛЭДЭГ. `{pending.length > 0 && ...}` гэж зас.",
    },
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Conditional rendering гэж юу вэ?",
    "`&&` болон `? :` хоёрын ялгаа, хэзээ алийг ашиглах вэ?",
    "`{count && <p/>}` дээр count=0 бол юу болох вэ, яагаад?",
    "Early return хэзээ тохиромжтой вэ?",
    "Жагсаалт зурахад ямар функц ашигладаг вэ?",
    "`key` яагаад чухал вэ? Index-ийг key болгох нь яагаад муу вэ?",
    "Юу ч харуулахгүй бол component юу буцаах вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Массивыг JSX жагсаалт болгоход аль функц?", options: [".filter()", ".map()", ".push()", ".sort()"], answer: 1 },
    { q: "Зөвхөн үнэн үед харуулах оператор?", options: ["||", "&&", "!", "=="], answer: 1 },
    { q: "key-д хамгийн тохиромжтой утга?", options: ["Санамсаргүй тоо", "Давтагдашгүй id", "Үргэлж 0", "Элементийн текст"], answer: 1 },
    { q: "`cond ? A : B` гэдэг нь?", options: ["Давталт", "Гурвалсан оператор (нөхцөл)", "Функц", "Массив"], answer: 1 },
    { q: "Юу ч зурахгүй бол component юу буцаах вэ?", options: ["undefined", "null", "0", '""'], answer: 1 },
    { q: "`{count && <p/>}` дээр count=0 бол?", options: ["Юу ч гарахгүй", "Дэлгэцэд 0 гарна", "Алдаа өгнө", "<p> гарна"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`&&` — жижиг хэсгийг нуух/харуулах (boolean болгож ашигла!).",
    "`? :` — хоёрын нэгийг сонгох.",
    "Early return — loading/error/empty төлөвт хамгийн цэвэрхэн.",
    "`null` буцаавал юу ч зурагдахгүй.",
    "`.map()`-ээр жагсаалт зурна, элемент бүрт давтагдашгүй `key` өгнө.",
    "Хоосон жагсаалтад ойлгомжтой мессеж харуул.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**ES Modules Handling** — `export`/`import`-ийн бүх хэлбэрийг үзэж, 1-р модулиа дуусгана." },
];
