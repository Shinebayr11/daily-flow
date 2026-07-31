import type { ContentBlock } from "./types";

// ===== m2l1 — CSS Modules Introduction =====
export const m2l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "CSS-ийн scope асуудлыг ойлгож, CSS Modules-аар шийдэж, Tailwind-тай харьцуулж, аль нь хэзээ тохиромжтойг мэдэж авна." },

  { type: "h", text: "Онол — Эхлээд асуудлыг ойлгоё" },
  { type: "p", text: "Энгийн CSS-д бүх класс **глобал** байдаг. Хоёр өөр хүн өөр өөр файлд `.card` гэж бичвэл хоорондоо мөргөлдөнө." },
  { type: "code", lang: "css", code: `/* header.css */
.card { background: white; padding: 16px; }

/* product.css */
.card { background: blue; padding: 8px; }   /* ← өмнөхийг дарна! */`, },
  { type: "p", text: "Том төсөлд энэ нь ноцтой асуудал болдог. Хүмүүс `.header-card`, `.product-card-inner-wrapper` гэх мэт урт нэр өгч зайлсхийхийг оролддог байсан." },

  { type: "h", text: "CSS Modules — шийдэл" },
  { type: "p", text: "**CSS Modules** нь `.module.css` өргөтгөлтэй файл. Түүн доторх класс нэрийг build хийхэд **автоматаар давтагдашгүй болгож** хувиргадаг." },
  { type: "code", lang: "text", code: `Чиний бичсэн:        Хөтөчид болох:
.card          →     .Button_card__x7f2a
.title         →     .Button_title__k9m1

→ Хэзээ ч мөргөлдөхгүй!`, },

  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "css", code: `/* components/Button.module.css */
.button {
  background: #4f46e5;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

/* hover төлөв */
.button:hover {
  background: #4338ca;
}

/* өөр нэг класс */
.secondary {
  background: #e5e7eb;
  color: #111;
}`, },
  { type: "code", lang: "tsx", code: `// components/Button.tsx
import styles from "./Button.module.css";
//     ^^^^^^ энэ бол объект: { button: "Button_button__x7f2a", secondary: "..." }

export default function Button({ variant = "primary", children }) {
  return (
    <button
      className={variant === "primary" ? styles.button : styles.secondary}
    >
      {children}
    </button>
  );
}`, },

  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`import styles from \"./Button.module.css\"` — CSS файлын классуудыг **JavaScript объект** болгон авна.",
    "`styles.button` — тэр объектын `button` талбар, доторх утга нь хувиргасан класс нэр.",
    "Файл нэр заавал `.module.css`-ээр төгсөнө. Үгүй бол глобал CSS гэж үзнэ.",
    "Класс нэрэнд зураас (`-`) байвал `styles[\"my-class\"]` гэж хаалтаар авна.",
  ] },

  { type: "h", text: "Олон класс нэгтгэх" },
  { type: "code", lang: "tsx", code: `// 1) Template literal
<div className={\`\${styles.card} \${styles.large}\`}>

// 2) Массивыг join
<div className={[styles.card, styles.large].join(" ")}>

// 3) Нөхцөлтэй
<div className={\`\${styles.card} \${isActive ? styles.active : ""}\`}>`, },

  { type: "h", text: "CSS Modules vs Tailwind — харьцуулалт" },
  { type: "code", lang: "text", code: `                    CSS Modules              Tailwind
Хаана бичих         тусдаа .module.css       className дотор
Класс нэр           өөрөө зохионо            бэлэн (p-4, text-xl)
Файл тоо            2 (tsx + css)            1 (tsx)
Сурах хугацаа       CSS мэддэг бол шууд      класс нэр цээжлэх
Уншихад             JSX цэвэрхэн             JSX урт болдог
Дахин ашиглах       класс дахин ашиглана     component болгоно
Загварчлал өөрчлөх  CSS файл засна           JSX-д класс солино`, },
  { type: "code", lang: "tsx", code: `// CSS Modules
<button className={styles.button}>Дарах</button>

// Tailwind — ижил үр дүн
<button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
  Дарах
</button>`, },
  { type: "callout", variant: "tip", title: "Аль нь дээр вэ?", text: "Хоёулаа зөв. Tailwind нь хурдан бичихэд, тогтвортой дизайн систем барихад давуу. CSS Modules нь нарийн animation, төвөгтэй загварт илүү. Энэ сургалтад бид ихэвчлэн Tailwind ашиглана, гэхдээ CSS Modules-ыг мэдэж байх хэрэгтэй." },

  { type: "h", text: "Глобал CSS хэзээ ашиглах вэ?" },
  { type: "code", lang: "css", code: `/* app/globals.css — бүх хуудсанд үйлчилнэ */
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui; }
:root { --primary: #4f46e5; }   /* CSS хувьсагч */`, },
  { type: "p", text: "Глобал CSS-ыг зөвхөн: reset, фонт, CSS хувьсагч, `body`/`html` загварт ашигла. Component-ийн загварыг глобалд бичих нь дараа нь асуудал үүсгэнэ." },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "className='button' гэж шууд бичих", text: "CSS Modules-д `styles.button` гэж объектоор хандана, текстээр биш. `className=\"button\"` бичвэл ямар ч загвар үйлчлэхгүй." },
  { type: "callout", variant: "error", title: "Файл нэр .module.css биш", text: "`Button.css` гэвэл глобал CSS болно — scope ажиллахгүй. `Button.module.css` гэж нэрлэ." },
  { type: "callout", variant: "error", title: "styles.my-class ажиллахгүй", text: "Зураастай нэрийг цэгээр авч болохгүй. `styles[\"my-class\"]` гэж хаалтаар ав, эсвэл camelCase (`myClass`) ашигла." },
  { type: "callout", variant: "warn", title: "Загвар үйлчлэхгүй байна", text: "1) import хийсэн эсэх, 2) класс нэр яг таарч байгаа эсэх, 3) файлын нэр `.module.css` мөн эсэхийг шалга." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `Button.module.css`-д `:hover` төлөв нэм.",
    "Дунд: `Card.module.css` үүсгэж Card component-д хэрэглэ.",
    "Дунд: Нөхцөлөөс хамааран 2 өөр класс өгдөг болго (`primary`/`secondary`).",
    "Хүнд: Мөн адил товчийг Tailwind классаар бичиж, 2 аргыг харьцуул — аль нь чамд илүү тохирч байна вэ?",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Энгийн CSS-д ямар асуудал байдаг вэ?",
    "CSS Modules түүнийг яаж шийддэг вэ?",
    "`import styles from` юуг буцаадаг вэ?",
    "Файлын нэр яагаад `.module.css` байх ёстой вэ?",
    "Олон класс яаж нэгтгэх вэ?",
    "Глобал CSS-ыг хэзээ ашиглах нь зөв вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "CSS Modules файлын өргөтгөл?", options: [".css", ".module.css", ".style.js", ".tsx"], answer: 1 },
    { q: "CSS Modules-ийн давуу тал?", options: ["Класс scoped, мөргөлдөхгүй", "Илүү удаан", "JS хэрэггүй", "Зөвхөн сервер"], answer: 0 },
    { q: "Tailwind-д загварыг хаана бичих вэ?", options: ["Тусдаа .css файлд", "className дотор бэлэн класс", "layout.tsx-д", "package.json-д"], answer: 1 },
    { q: "`import styles from \"./a.module.css\"` юу буцаах вэ?", options: ["Текст", "Класс нэрсийн объект", "Функц", "HTML"], answer: 1 },
    { q: "Глобал CSS-д юу бичих нь зөв вэ?", options: ["Component-ийн загвар", "Reset, фонт, CSS хувьсагч", "Бүх зүйл", "Юу ч биш"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Энгийн CSS-д класс глобал — мөргөлддөг.",
    "CSS Modules класс нэрийг автоматаар давтагдашгүй болгоно.",
    "`styles.className` хэлбэрээр объектоор хандана.",
    "Tailwind бол өөр арга — className дотор бэлэн класс. Хоёулаа зөв.",
    "Глобал CSS-ыг зөвхөн reset/фонт/хувьсагчид ашигла.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**useState hook** — component-д \"санах ой\" нэмж, интерактив апп хийж эхэлнэ." },
];

// ===== m2l2 — useState hook =====
export const m2l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "State гэж юу вэ, яагаад энгийн хувьсагч хангалтгүй вэ, useState-ийг зөв ашиглаж, түгээмэл алдаанаас зайлсхийж сурна. Энэ бол React-ийн хамгийн чухал hook." },

  { type: "h", text: "Онол — Асуудал: яагаад энгийн хувьсагч болохгүй вэ?" },
  { type: "code", lang: "tsx", code: `// ✗ Энэ АЖИЛЛАХГҮЙ
function Counter() {
  let count = 0;                       // энгийн хувьсагч

  function handleClick() {
    count = count + 1;                 // утга өөрчлөгдөнө
    console.log(count);                // console-д 1, 2, 3... гарна
  }

  return <button onClick={handleClick}>Тоо: {count}</button>;
  //                                          ^^^^^ ГЭХДЭЭ дэлгэцэд 0 хэвээр!
}`, },
  { type: "p", text: "Яагаад ингэж байна вэ? Хоёр шалтгаан:" },
  { type: "ol", items: [
    "**React мэдэхгүй** — хувьсагч өөрчлөгдсөнийг React мэдэхгүй тул дахин зурахгүй.",
    "**Утга алдагдана** — хэрэв ямар нэг шалтгаанаар дахин зурсан ч `let count = 0` дахин ажиллаж 0 болно.",
  ] },
  { type: "p", text: "**State** нь яг эдгээрийг шийддэг: React-д мэдэгддэг, дахин зурахад ч утга хадгалагддаг." },

  { type: "h", text: "useState — шийдэл" },
  { type: "code", lang: "tsx", code: `"use client";              // hook ашиглах бол ЗААВАЛ
import { useState } from "react";

export default function Counter() {
  // [одоогийн утга, өөрчлөх функц] = useState(эхний утга)
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);     // React-д "өөрчлөгдлөө" гэж мэдэгдэнэ
  }

  return <button onClick={handleClick}>Тоо: {count}</button>;
}`, },

  { type: "h", text: "Кодын тайлбар — мөр мөрөөр" },
  { type: "ul", items: [
    "`useState(0)` — эхний утга 0. Энэ нь зөвхөн **анхны render**-т ашиглагдана.",
    "`const [count, setCount]` — useState нь 2 элементтэй массив буцаадаг. Үүнийг задлан авч байна.",
    "`count` — одоогийн утга. Уншихад л ашиглана, **шууд өөрчилж болохгүй**.",
    "`setCount` — утгыг өөрчлөх цорын ганц зөв арга. Дуудахад React дахин зурна.",
    "Нэршил: `[x, setX]` гэсэн загварыг дага (`count`/`setCount`, `name`/`setName`).",
  ] },

  { type: "h", text: "State-ийн 3 үндсэн дүрэм" },
  { type: "code", lang: "tsx", code: `// ДҮРЭМ 1: Шууд өөрчилж болохгүй
count = 5;                    // ✗ БУРУУ — React мэдэхгүй
setCount(5);                  // ✓ ЗӨВ

// ДҮРЭМ 2: Объект/массивыг ШИНЭЭР үүсгэнэ (mutate хийхгүй)
todos.push(newTodo);          // ✗ БУРУУ — хуучин массивыг өөрчилж байна
setTodos([...todos, newTodo]); // ✓ ЗӨВ — шинэ массив

user.name = "Шинэ";           // ✗ БУРУУ
setUser({ ...user, name: "Шинэ" }); // ✓ ЗӨВ — шинэ объект

// ДҮРЭМ 3: Хэрэв шинэ утга нь хуучнаас хамаарвал функц ашигла
setCount(count + 1);          // ⚠ ихэвчлэн ажиллана, гэхдээ...
setCount((prev) => prev + 1); // ✓ илүү найдвартай`, },

  { type: "h", text: "Яагаад setCount(prev => ...) илүү найдвартай вэ?" },
  { type: "code", lang: "tsx", code: `// Нэг дарахад 3 нэмэх гэсэн жишээ
function handleClick() {
  setCount(count + 1);    // count = 0 → 1
  setCount(count + 1);    // count ХЭВЭЭР 0 → 1  (шинэчлэгдээгүй байна!)
  setCount(count + 1);    // count ХЭВЭЭР 0 → 1
}
// Үр дүн: 1  (3 биш!)

// Функц хэлбэрээр
function handleClick() {
  setCount((p) => p + 1);   // 0 → 1
  setCount((p) => p + 1);   // 1 → 2
  setCount((p) => p + 1);   // 2 → 3
}
// Үр дүн: 3 ✓`, },
  { type: "callout", variant: "tip", title: "Яагаад ийм байна вэ?", text: "`count` бол тухайн render-ийн \"царцсан\" утга. `setCount` дуудахад тэр мөрөнд байгаа `count` шууд өөрчлөгддөггүй — дараагийн render дээр л шинэ утгатай болно. Функц хэлбэр нь React-ээс хамгийн сүүлийн утгыг асуудаг." },

  { type: "h", text: "Өөр өөр төрлийн state" },
  { type: "code", lang: "tsx", code: `// Тоо
const [count, setCount] = useState(0);

// Текст
const [name, setName] = useState("");

// Boolean
const [isOpen, setIsOpen] = useState(false);

// Массив — TypeScript-д төрлөө заана
const [todos, setTodos] = useState<string[]>([]);

// Объект
const [user, setUser] = useState({ name: "", email: "" });

// null байж болно
const [selected, setSelected] = useState<Todo | null>(null);`, },

  { type: "h", text: "Олон state vs нэг объект" },
  { type: "code", lang: "tsx", code: `// Арга 1: тусад нь (ихэвчлэн дээр)
const [name, setName] = useState("");
const [email, setEmail] = useState("");
setName("Bat");                       // энгийн

// Арга 2: нэг объектод
const [form, setForm] = useState({ name: "", email: "" });
setForm({ ...form, name: "Bat" });    // spread хийх шаардлагатай`, },
  { type: "callout", variant: "tip", title: "Аль нь дээр вэ?", text: "Хамааралгүй өгөгдөл бол тусад нь. Хамт өөрчлөгддөг (форм гэх мэт) бол нэг объектод. Эргэлзвэл тусад нь эхэл." },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "useState тоолуур", code: `function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  return (
    <div>
      <p>Тоо: {count}</p>
      <button onClick={() => setCount(count + 1)}>Нэмэх</button>
      <button onClick={() => setCount((p) => p - 1)}>Хасах</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <hr style={{margin:"16px 0"}} />

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Нэрээ бич..."
      />
      <p>Сайн уу, {name || "танихгүй хүн"}!</p>
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "useState only works in Client Components", text: "Файлын дээд талд `\"use client\"` бичээгүй. Hook ашиглах бол заавал нэм." },
  { type: "callout", variant: "error", title: "State-ийг шууд өөрчлөх", text: "`count = count + 1`, `todos.push(x)`, `user.name = \"a\"` — бүгд буруу. Set функц + шинэ объект/массив ашигла." },
  { type: "callout", variant: "error", title: "Too many re-renders", text: "Render дотор шууд `setCount(1)` дуудсан → дахин render → дахин дуудна → хязгааргүй давталт. Зөвхөн event handler эсвэл useEffect дотор дууд." },
  { type: "callout", variant: "error", title: "onClick={setCount(5)} гэж бичих", text: "Энэ нь функцийг ШУУД дуудна. `onClick={() => setCount(5)}` гэж бич — функц дамжуулж байна." },
  { type: "callout", variant: "warn", title: "State-ийг шинэчилсний дараа шууд уншиж болохгүй", text: "`setCount(5); console.log(count);` — хуучин утга гарна. Дараагийн render-т л шинэ утга гарна." },
  { type: "callout", variant: "error", title: "React Hook is called conditionally", text: "`if (x) { useState(...) }` гэж болохгүй. Hook-уудыг үргэлж component-ийн дээд түвшинд, ижил дарааллаар дууд." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын талбарт \"×2\" товч нэмж count-ыг хоёр дахин нэмэгдүүл.",
    "Дунд: `isVisible` boolean state нэмж, товч дарахад текст нуух/харуулах болго.",
    "Дунд: `setCount(count + 1)`-ыг 3 удаа дараалан бичээд юу болохыг ажигла, дараа нь функц хэлбэрээр зас.",
    "Хүнд: `{ name, age }` объект state үүсгэж, зөвхөн `name`-ийг өөрчилдөг товч хий (spread ашигла).",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Яагаад энгийн `let` хувьсагч дэлгэцийг шинэчилдэггүй вэ?",
    "`useState` юу буцаадаг вэ?",
    "State-ийг өөрчлөх зөв арга юу вэ?",
    "Массивд шинэ утга нэмэхэд яагаад `push` болохгүй вэ?",
    "`setCount(count+1)` ба `setCount(p => p+1)` хоёрын ялгаа юу вэ?",
    "`setCount(5)` дуудсаны дараа `count` шууд 5 болох уу?",
    "Hook-уудыг яагаад нөхцөл дотор дуудаж болохгүй вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "useState юуг буцаадаг вэ?", options: ["Зөвхөн утга", "[утга, өөрчлөх функц]", "Функц", "CSS"], answer: 1 },
    { q: "State-ийг яаж өөрчлөх вэ?", options: ["Шууд =", "set функцээр", "let-ээр", "өөрчлөх боломжгүй"], answer: 1 },
    { q: "State өөрчлөгдөхөд юу болдог вэ?", options: ["Юу ч болохгүй", "Re-render", "Алдаа", "Хуудас хаагдана"], answer: 1 },
    { q: "Массивд утга нэмэх зөв арга?", options: ["todos.push(x)", "setTodos([...todos, x])", "todos = [x]", "todos.add(x)"], answer: 1 },
    { q: "`onClick={setCount(5)}` юу болох вэ?", options: ["Зөв ажиллана", "Шууд дуудагдаж хязгааргүй давталт үүсгэнэ", "Юу ч болохгүй", "Алдаа өгнө"], answer: 1 },
    { q: "Шинэ утга нь хуучнаас хамаарвал?", options: ["setX(x + 1)", "setX(p => p + 1)", "x++", "x = x + 1"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Энгийн хувьсагч дэлгэцийг шинэчилдэггүй — state хэрэгтэй.",
    "`const [x, setX] = useState(эхний)`.",
    "Шууд өөрчилж болохгүй. Объект/массивыг шинээр үүсгэнэ (spread).",
    "Хуучнаас хамаарвал `setX(p => ...)` функц хэлбэр ашигла.",
    "Hook-уудыг үргэлж дээд түвшинд, нөхцөлгүйгээр дууд.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Rendering Lists** — массив state-ийг дэлгэцэд жагсаалт болгож харуулна." },
];

// ===== m2l3 — Rendering Lists =====
export const m2l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Массив state-ийг жагсаалт болгож зурах, элемент нэмэх/устгах/засах, `key`-г гүнзгий ойлгож сурна." },

  { type: "h", text: "Онол — .map() гэж юу вэ?" },
  { type: "p", text: "`.map()` бол массивын **элемент бүрийг өөр зүйл болгон хувиргаж, шинэ массив буцаадаг** функц. React-д үүгээр өгөгдлийг JSX болгоно." },
  { type: "code", lang: "js", code: `const nums = [1, 2, 3];

// Тоог 2 дахин
const doubled = nums.map((n) => n * 2);          // [2, 4, 6]

// Тоог текст болгох
const texts = nums.map((n) => "Дугаар " + n);    // ["Дугаар 1", ...]

// Тоог JSX болгох ← React-д ингэж ашиглана
const items = nums.map((n) => <li>{n}</li>);     // [<li>1</li>, ...]

// Анхаарах: анхны массив өөрчлөгддөггүй
console.log(nums);   // [1, 2, 3] — хэвээрээ`, },

  { type: "h", text: "Жагсаалт зурах" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Ном унших", done: false },
    { id: 2, text: "Дасгал хийх", done: true },
  ]);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>          {/* ← key ЗААВАЛ */}
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`, },

  { type: "h", text: "key яагаад үнэхээр чухал вэ?" },
  { type: "p", text: "React жагсаалт өөрчлөгдөхөд \"аль элемент нь аль байсан бэ?\" гэдгийг мэдэх ёстой. `key` бол тэр таних тэмдэг. Жишээгээр харуулъя:" },
  { type: "code", lang: "text", code: `Эхний байдал (key=index):
[0] Алим     ← input дотор "тэмдэглэл A" бичсэн
[1] Гадил
[2] Усан үзэм

"Алим"-ыг устгасны дараа:
[0] Гадил    ← index 0 хэвээр тул React "энэ хуучин Алим" гэж бодоод
             "тэмдэглэл A"-г ЭНД үлдээнэ! ← АЛДАА
[1] Усан үзэм

Хэрэв key=id байсан бол:
React "id=1 алга болжээ" гэж зөв ойлгож, тэмдэглэлийг ч устгана ✓`, },
  { type: "code", lang: "tsx", code: `// ✗ МУУ — index-ийг key болгох
{todos.map((todo, i) => <li key={i}>{todo.text}</li>)}

// ✓ САЙН — давтагдашгүй id
{todos.map((todo) => <li key={todo.id}>{todo.text}</li>)}`, },
  { type: "callout", variant: "tip", title: "Index-ийг key болгож болох тохиолдол", text: "Жагсаалт хэзээ ч эрэмбэлэгдэхгүй, элемент нэмэгдэж/хасагдахгүй, өөрчлөгдөхгүй бол index зүгээр. Эргэлзвэл id ашигла." },

  { type: "h", text: "id яаж үүсгэх вэ?" },
  { type: "code", lang: "tsx", code: `// 1) Хамгийн энгийн — цагийн тэмдэг
const newTodo = { id: Date.now(), text, done: false };

// 2) Хөтчийн бэлэн функц (илүү найдвартай)
const newTodo = { id: crypto.randomUUID(), text, done: false };

// 3) Backend-тэй бол сервер өөрөө өгнө (_id)`, },

  { type: "h", text: "Элемент нэмэх / устгах / засах" },
  { type: "code", lang: "tsx", code: `// НЭМЭХ — шинэ массив үүсгэж, төгсгөлд нь нэмнэ
function addTodo(text: string) {
  setTodos([...todos, { id: crypto.randomUUID(), text, done: false }]);
}

// Эхэнд нэмэх
setTodos([{ id, text, done: false }, ...todos]);

// УСТГАХ — filter-ээр тухайнаас бусдыг үлдээнэ
function deleteTodo(id: string) {
  setTodos(todos.filter((t) => t.id !== id));
}

// ЗАСАХ — map-аар тухайныг нь солино
function toggleTodo(id: string) {
  setTodos(
    todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
      //            ^^^^^^^^^^^^^^^^^^^^^ шинэ объект үүсгэж байна
    )
  );
}

// Текстийг засах
function editTodo(id: string, newText: string) {
  setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)));
}`, },
  { type: "callout", variant: "tip", title: "Загварыг санах нь", text: "Нэмэх = `[...arr, x]` · Устгах = `.filter()` · Засах = `.map()` + `{...item, өөрчлөлт}`. Гурвуулаа ШИНЭ массив буцаадаг." },

  { type: "h", text: "Хоосон жагсаалт" },
  { type: "code", lang: "tsx", code: `function TodoList({ todos }) {
  if (todos.length === 0) {
    return (
      <div style={{textAlign:"center",padding:32,color:"#888"}}>
        <p>Одоогоор ажил алга</p>
        <p>Эхнийхээ нэмээрэй!</p>
      </div>
    );
  }
  return <ul>{todos.map((t) => <li key={t.id}>{t.text}</li>)}</ul>;
}`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Жагсаалт CRUD", code: `function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Ном унших", done: false },
    { id: 2, text: "Дасгал хийх", done: true },
    { id: 3, text: "Код бичих", done: false },
  ]);

  function toggle(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  if (todos.length === 0) return <p>Бүх ажил дууслаа! 🎉</p>;

  return (
    <ul style={{listStyle:"none",padding:0}}>
      {todos.map((t) => (
        <li key={t.id} style={{display:"flex",gap:8,alignItems:"center",padding:"6px 0"}}>
          <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
          <span style={{flex:1, textDecoration: t.done ? "line-through" : "none"}}>
            {t.text}
          </span>
          <button onClick={() => remove(t.id)}>Устгах</button>
        </li>
      ))}
    </ul>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "warn", title: 'Each child in a list should have a unique "key" prop', text: ".map() дотор key өгөөгүй. `.map()`-ийн буцааж буй хамгийн ГАДНА элемент дээр key тавь." },
  { type: "callout", variant: "error", title: "Objects are not valid as a React child", text: "Объектыг шууд харуулах гэсэн. `{todo}` биш `{todo.text}` гэж талбарыг нь заа." },
  { type: "callout", variant: "error", title: "Жагсаалт шинэчлэгдэхгүй байна", text: "`todos.push(x)` хийсэн байх. React шинэ массив хүлээж байгаа: `setTodos([...todos, x])`." },
  { type: "callout", variant: "error", title: ".map() юу ч буцаахгүй", text: "`.map((t) => { <li/> })` — `{ }` хэрэглэсэн бол `return` заавал. Эсвэл `.map((t) => (<li/>))` гэж `( )` ашигла." },
  { type: "callout", variant: "error", title: "Cannot read properties of undefined (reading 'map')", text: "Массив хараахан ирээгүй. `{todos?.map(...)}` эсвэл `useState<Todo[]>([])` гэж хоосон массиваар эхэл." },
  { type: "callout", variant: "warn", title: "Устгасны дараа буруу элемент өөрчлөгдөх", text: "key=index ашигласны сонгодог шинж тэмдэг. id ашигла." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын талбарт todo нэмж жагсаалтыг уртасга.",
    "Дунд: \"Бүгдийг дуусгах\" товч нэмж бүх todo-г `done: true` болго.",
    "Дунд: Дуусаагүй ажлын тоог доор нь харуул (`filter` + `length`).",
    "Хүнд: Текстийг засах боломж нэм (prompt эсвэл input ашиглаж).",
    "Хүнд: key-г `index` болгож өөрчлөөд, эхний элементийг устгахад юу болохыг ажигла.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "`.map()` юу хийдэг вэ? Анхны массивыг өөрчилдөг үү?",
    "`key` яагаад чухал вэ? Байхгүй бол юу болох вэ?",
    "Index-ийг key болгох нь яагаад аюултай вэ?",
    "Массивд элемент нэмэх зөв арга юу вэ?",
    "Элемент устгахад аль функц ашиглах вэ?",
    "Тодорхой элементийг засахад аль функц ашиглах вэ?",
    "Хоосон жагсаалтад юу харуулах нь зөв вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Массивыг жагсаалт болгоход?", options: [".map()", ".push()", ".log()", ".join()"], answer: 0 },
    { q: "key-д хамгийн тохиромжтой нь?", options: ["index", "давтагдашгүй id", "текст", "тэг"], answer: 1 },
    { q: "Объектыг харуулахад?", options: ["{obj}", "{obj.field}", "{[obj]}", "боломжгүй"], answer: 1 },
    { q: "Элемент устгахад аль функц?", options: [".map()", ".filter()", ".push()", ".pop()"], answer: 1 },
    { q: "Нэг элементийг засахад?", options: [".filter()", ".map() + spread", ".push()", "шууд өөрчилнө"], answer: 1 },
    { q: "`todos.push(x)` хийвэл?", options: ["Зөв ажиллана", "Дэлгэц шинэчлэгдэхгүй", "Алдаа өгнө", "Хуудас хаагдана"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`.map()` элемент бүрийг JSX болгож хувиргана, шинэ массив буцаана.",
    "Элемент бүрт давтагдашгүй `key` (id, index биш).",
    "Нэмэх = `[...arr, x]` · Устгах = `.filter()` · Засах = `.map()` + spread.",
    "Гурвуулаа ШИНЭ массив буцаадаг — mutate хийхгүй.",
    "Хоосон жагсаалтад ойлгомжтой мессеж харуул.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**alert** — хэрэглэгчид мессеж харуулж, энгийн validation хийнэ." },
];

// ===== m2l4 — alert =====
export const m2l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`alert`, `confirm`, `prompt` browser функцүүдийг ойлгож, validation хийж, дараа нь илүү сайн хувилбар руу шилжинэ." },

  { type: "h", text: "Онол — Browser-ийн 3 диалог" },
  { type: "code", lang: "js", code: `// 1) alert — зөвхөн мэдэгдэнэ, буцаах утгагүй
alert("Хадгалагдлаа!");

// 2) confirm — Тийм/Үгүй асууна, boolean буцаана
const ok = confirm("Устгах уу?");
if (ok) { /* устгана */ }

// 3) prompt — текст оруулуулна, string эсвэл null буцаана
const name = prompt("Нэрээ оруулна уу:", "Анхны утга");
if (name !== null) { /* хэрэглэнэ */ }`, },
  { type: "callout", variant: "warn", title: "Гурвуулаа хуудсыг ЗОГСООДОГ", text: "Диалог нээлттэй байхад JavaScript бүхэлдээ зогсдог. Хэрэглэгч хариулах хүртэл юу ч ажиллахгүй. Тийм учраас бодит апп-д ховор ашигладаг." },

  { type: "h", text: "Validation-д ашиглах" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState } from "react";

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  function handleAdd() {
    // 1) Хоосон эсэхийг шалгах
    if (text.trim() === "") {
      alert("Ажлын нэр хоосон байж болохгүй!");
      return;                       // ← цааш явахгүй
    }

    // 2) Урт шалгах
    if (text.trim().length < 3) {
      alert("Дор хаяж 3 тэмдэгт оруулна уу");
      return;
    }

    onAdd(text.trim());
    setText("");                    // input-ыг цэвэрлэнэ
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Нэмэх</button>
    </div>
  );
}`, },
  { type: "callout", variant: "tip", title: "trim() яагаад чухал вэ?", text: "`\"   \"` (зөвхөн зай) нь `\"\"` биш тул `text === \"\"` шалгалтыг давна. `.trim()` нь эхэн/төгсгөлийн зайг арилгадаг тул үнэн зөв шалгана." },

  { type: "h", text: "confirm — устгахын өмнө баталгаажуулах" },
  { type: "code", lang: "tsx", code: `function deleteTodo(id: string, text: string) {
  const ok = confirm(\`"\${text}" ажлыг устгах уу?\`);
  if (!ok) return;                 // Цуцлав

  setTodos(todos.filter((t) => t.id !== id));
}`, },

  { type: "h", text: "Яагаад бодит апп-д alert ашигладаггүй вэ?" },
  { type: "ul", items: [
    "**Хуудсыг зогсоодог** — хэрэглэгч дарах хүртэл юу ч ажиллахгүй.",
    "**Загварчилж болохгүй** — үйлдлийн системийн стандарт харагдац, брэндтэй тохирохгүй.",
    "**Гар утсанд эвгүй** — том, дэлгэцийг бүрхдэг.",
    "**Хэрэглэгч залхдаг** — олон удаа гарвал \"дахин бүү харуул\" гэж хаадаг.",
    "**Тест хийхэд төвөгтэй** — автомат тест диалогийг барихад хүндрэлтэй.",
  ] },

  { type: "h", text: "Илүү сайн хувилбарууд" },
  { type: "code", lang: "tsx", code: `// 1) Input доорх алдааны текст (хамгийн энгийн, хамгийн сайн)
const [error, setError] = useState("");

function handleAdd() {
  if (!text.trim()) {
    setError("Ажлын нэр заавал");
    return;
  }
  setError("");
  // ...
}

return (
  <div>
    <input
      value={text}
      onChange={(e) => { setText(e.target.value); setError(""); }}
      style={{ borderColor: error ? "red" : "#ccc" }}
    />
    {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
  </div>
);`, },
  { type: "code", lang: "tsx", code: `// 2) Toast мэдэгдэл (Sonner сан)
// npm install sonner
import { toast } from "sonner";

toast.success("Ажил нэмэгдлээ");
toast.error("Хоосон байж болохгүй");`, },
  { type: "code", lang: "tsx", code: `// 3) Modal баталгаажуулалт (shadcn/ui AlertDialog)
<AlertDialog>
  <AlertDialogTrigger>Устгах</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Устгах уу?</AlertDialogTitle>
    <AlertDialogAction onClick={handleDelete}>Тийм</AlertDialogAction>
    <AlertDialogCancel>Болих</AlertDialogCancel>
  </AlertDialogContent>
</AlertDialog>`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Validation — alert vs алдааны текст", code: `function App() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  function add() {
    if (!text.trim()) {
      setError("Хоосон байж болохгүй!");     // alert-аас илүү сайн
      return;
    }
    if (text.trim().length < 3) {
      setError("Дор хаяж 3 тэмдэгт");
      return;
    }
    setItems([...items, text.trim()]);
    setText("");
    setError("");
  }

  return (
    <div>
      <input
        value={text}
        onChange={(e) => { setText(e.target.value); setError(""); }}
        placeholder="Ажил бич..."
        style={{ borderColor: error ? "red" : "#ccc" }}
      />
      <button onClick={add}>Нэмэх</button>
      {error && <p style={{color:"red",fontSize:13,marginTop:4}}>{error}</p>}
      <ul>{items.map((i, n) => <li key={n}>{i}</li>)}</ul>
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "return бичихээ мартах", text: "`if (!text) { alert(...) }` гээд `return` бичихгүй бол доорх код үргэлжлээд хоосон todo нэмэгдэнэ." },
  { type: "callout", variant: "error", title: "trim() ашиглахгүй", text: "`text === \"\"` нь `\"   \"`-ыг барихгүй. `text.trim() === \"\"` гэж бич." },
  { type: "callout", variant: "warn", title: "alert хэт их ашиглах", text: "Хэрэглэгчийг залхаана. Input доорх текст эсвэл toast илүү тохиромжтой." },
  { type: "callout", variant: "error", title: "prompt-ийн null-ыг шалгахгүй", text: "Хэрэглэгч Cancel дарвал `null` буцна. `if (name !== null)` гэж шалга." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын талбарт хамгийн уртын хязгаар (20 тэмдэгт) нэм.",
    "Дунд: Давхардсан ажил нэмэхийг хориглох шалгалт нэм.",
    "Дунд: Амжилттай нэмэгдвэл ногоон \"Нэмэгдлээ ✓\" мессеж 2 секунд харуул.",
    "Хүнд: Устгах товч нэмж `confirm`-оор баталгаажуул, дараа нь тэрийг өөрийн modal-оор соль.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "`alert`, `confirm`, `prompt` гурав юугаараа ялгаатай вэ?",
    "`confirm` юу буцаадаг вэ?",
    "`trim()` яагаад чухал вэ?",
    "`return` бичихгүй бол юу болох вэ?",
    "Яагаад бодит апп-д alert ашиглах нь тохиромжгүй вэ (3 шалтгаан)?",
    "Alert-ыг юугаар солих нь дээр вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "alert() юу хийдэг вэ?", options: ["Мэдээлэл хадгална", "Хөтчид мессеж харуулна", "Сервер дуудна", "Хуудас хаана"], answer: 1 },
    { q: "Хоосон эсэхийг шалгах зөв арга?", options: ["text === null", 'text.trim() === ""', "text = 0", "text.length > 5"], answer: 1 },
    { q: "confirm() юу буцаадаг вэ?", options: ["string", "boolean", "null", "юу ч биш"], answer: 1 },
    { q: "prompt-д Cancel дарвал юу буцах вэ?", options: ['""', "null", "undefined", "false"], answer: 1 },
    { q: "Жинхэнэ төсөлд alert-ыг юугаар солих нь дээр вэ?", options: ["Юугаар ч үгүй", "toast / алдааны текст", "console.log", "сервер"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`alert` мэдэгдэнэ, `confirm` boolean, `prompt` текст буцаана.",
    "Гурвуулаа хуудсыг зогсоодог — бодит апп-д ховор ашиглана.",
    "Хоосон шалгахад заавал `.trim()` ашигла.",
    "Validation-д `return` бичихээ бүү март.",
    "Жинхэнэ апп-д: input доорх алдааны текст эсвэл toast ашигла.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Click, Change and Submit events** — хэрэглэгчийн бүх үйлдлийг барьж боловсруулна." },
];

// ===== m2l5 — Click, Change and Submit events =====
export const m2l5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "React-ийн event систем, controlled input, form submit, `preventDefault()`-ыг бүрэн эзэмшиж, бүтэн Todo form хийнэ." },

  { type: "h", text: "Онол — React-ийн event" },
  { type: "p", text: "React-д event нэрийг **camelCase**-ээр бичиж, утгад нь **функц** дамжуулна (текст биш)." },
  { type: "code", lang: "tsx", code: `// HTML                          React
onclick="handleClick()"     →   onClick={handleClick}
onchange="..."              →   onChange={handleChange}
onsubmit="..."              →   onSubmit={handleSubmit}`, },

  { type: "h", text: "Гол event-үүд" },
  { type: "ul", items: [
    "`onClick` — дарах (товч, div, ямар ч элемент)",
    "`onChange` — input-ийн утга өөрчлөгдөх (**товчлуур бүрт** ажиллана)",
    "`onSubmit` — form илгээгдэх (товч дарах эсвэл Enter)",
    "`onKeyDown` — товчлуур дарах (Enter, Escape барихад)",
    "`onFocus` / `onBlur` — талбарт орох / гарах",
  ] },

  { type: "h", text: "Функц дамжуулах 2 арга" },
  { type: "code", lang: "tsx", code: `// 1) Функцийн НЭРийг дамжуулах (параметргүй үед)
<button onClick={handleClick}>Дарах</button>

// 2) Arrow функцээр ороох (параметртэй үед)
<button onClick={() => handleDelete(todo.id)}>Устгах</button>

// ✗ БУРУУ — шууд дуудаж байна!
<button onClick={handleDelete(todo.id)}>Устгах</button>
//                ^^^^^^^^^^^^^^^^^^^^ render үед л ажиллана`, },
  { type: "callout", variant: "error", title: "Хамгийн түгээмэл алдаа", text: "`onClick={handleDelete(id)}` бичвэл функц RENDER үед шууд дуудагдана. Хэрэв тэр функц state өөрчилдөг бол хязгааргүй давталт үүсч \"Too many re-renders\" алдаа гарна. `onClick={() => handleDelete(id)}` гэж бич." },

  { type: "h", text: "Controlled input — React-ийн гол загвар" },
  { type: "p", text: "**Controlled input** гэдэг нь input-ийн утгыг **React state удирддаг** гэсэн үг. `value` + `onChange` хос үргэлж хамт байна." },
  { type: "code", lang: "tsx", code: `const [text, setText] = useState("");

<input
  value={text}                              // ← state-ээс утга авна
  onChange={(e) => setText(e.target.value)} // ← бичих бүрт state шинэчилнэ
/>`, },
  { type: "code", lang: "text", code: `Урсгал:
Хэрэглэгч "a" бичнэ
  → onChange ажиллана
  → setText("a")
  → re-render
  → input-ийн value = "a"
  → дэлгэцэд "a" харагдана`, },
  { type: "callout", variant: "warn", title: "value өгөөд onChange өгөхгүй бол", text: "Input бичихэд хариу үзүүлэхгүй болно (React түүнийг \"read-only\" гэж үзнэ). Консолд анхааруулга гарна. Хоёуланг нь хамт өг." },

  { type: "h", text: "e.target.value гэж юу вэ?" },
  { type: "code", lang: "tsx", code: `function handleChange(e) {
  console.log(e.target);        // <input> элемент өөрөө
  console.log(e.target.value);  // доторх текст
  console.log(e.target.name);   // name атрибут
  console.log(e.type);          // "change"
}

// Checkbox-д value биш checked ашиглана
<input type="checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} />`, },

  { type: "h", text: "Form ба preventDefault()" },
  { type: "p", text: "HTML form нь илгээгдэхэд **хуудсыг дахин ачаалдаг** (анхдагч зан). React апп-д энэ нь бүх state-ийг устгана. `e.preventDefault()` үүнээс сэргийлнэ." },
  { type: "code", lang: "tsx", code: `"use client";
import { useState, FormEvent } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();          // ← ХУУДАС ДАХИН АЧААЛАХААС СЭРГИЙЛНЭ
    if (!text.trim()) return;

    onAdd(text.trim());
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Todo бич..."
      />
      <button type="submit">Нэмэх</button>
    </form>
  );
}`, },
  { type: "callout", variant: "tip", title: "Яагаад form ашиглах вэ, зүгээр onClick биш үү?", text: "Form ашигласнаар Enter дарахад автоматаар илгээгддэг. Мөн screen reader зэрэг хэрэгсэл form-ыг зөв ойлгодог (accessibility)." },

  { type: "h", text: "type атрибут чухал" },
  { type: "code", lang: "tsx", code: `<form onSubmit={handleSubmit}>
  <button type="submit">Нэмэх</button>    {/* form илгээнэ */}
  <button type="button" onClick={reset}>Цэвэрлэх</button>  {/* илгээхгүй */}
</form>

// ⚠ type өгөөгүй товч form дотор байвал АВТОМАТААР submit болно!`, },

  { type: "h", text: "Бүтэн жишээ — Todo апп" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState, FormEvent } from "react";

interface Todo { id: string; text: string; done: boolean }

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: crypto.randomUUID(), text: text.trim(), done: false }]);
    setText("");
  }

  function toggle(id: string) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id: string) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Нэмэх</button>
      </form>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
              {t.text}
            </span>
            <button onClick={() => remove(t.id)}>×</button>
          </li>
        ))}
      </ul>

      <p>Нийт: {todos.length} · Үлдсэн: {todos.filter((t) => !t.done).length}</p>
    </div>
  );
}`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Бүтэн Todo апп", code: `function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text: text.trim(), done: false }]);
    setText("");
  }

  function toggle(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{display:"flex",gap:8}}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Todo бич, Enter дар..."
          style={{flex:1}}
        />
        <button type="submit">Нэмэх</button>
      </form>

      <ul style={{listStyle:"none",padding:0,marginTop:12}}>
        {todos.map((t) => (
          <li key={t.id} style={{display:"flex",gap:8,alignItems:"center",padding:"4px 0"}}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{flex:1,textDecoration:t.done?"line-through":"none"}}>{t.text}</span>
            <button onClick={() => remove(t.id)}>×</button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <p style={{fontSize:13,color:"#888"}}>
          Нийт: {todos.length} · Үлдсэн: {todos.filter((t) => !t.done).length}
        </p>
      )}
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "preventDefault мартах", text: "Form илгээхэд хуудас дахин ачаалж, бүх state алга болно. `e.preventDefault()` заавал." },
  { type: "callout", variant: "error", title: "Too many re-renders", text: "`onClick={handleDelete(id)}` гэж шууд дуудсан. `onClick={() => handleDelete(id)}` гэж arrow-оор ороо." },
  { type: "callout", variant: "error", title: "You provided a `value` prop without an `onChange` handler", text: "Controlled input-д хоёулаа хамт байх ёстой. `onChange` нэм." },
  { type: "callout", variant: "error", title: "Checkbox ажиллахгүй", text: "Checkbox-д `value` биш `checked` ашиглана: `checked={done} onChange={(e) => setDone(e.target.checked)}`." },
  { type: "callout", variant: "warn", title: "Form дотор type-гүй товч", text: "`<button>` type өгөөгүй бол default нь `submit`. Илгээхгүй товчинд `type=\"button\"` заавал бич." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын Todo апп-д \"Бүгдийг устгах\" товч нэм (`type=\"button\"` анхаар).",
    "Дунд: Enter дарахад л нэмэгддэг эсэхийг шалга, `preventDefault`-ыг устгаад юу болохыг үз.",
    "Дунд: `onKeyDown` ашиглан Escape дарахад input цэвэрлэгддэг болго.",
    "Хүнд: Todo-г давхар дарахад (`onDoubleClick`) засах горимд ордог болго.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "React-д event нэрийг яаж бичдэг вэ?",
    "`onClick={fn}` ба `onClick={fn()}` хоёрын ялгаа юу вэ?",
    "Controlled input гэж юу вэ, юу юу хэрэгтэй вэ?",
    "`e.target.value` юу вэ? Checkbox-д юу ашиглах вэ?",
    "`preventDefault()` юунаас сэргийлдэг вэ?",
    "Form ашиглах нь onClick-ээс юугаараа дээр вэ?",
    "Form доторх товчны `type` яагаад чухал вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Input-д бичих бүрт ажиллах event?", options: ["onClick", "onChange", "onSubmit", "onLoad"], answer: 1 },
    { q: "Form илгээхэд reload болохоос юугаар сэргийлэх вэ?", options: ["return", "e.preventDefault()", "alert()", "useState"], answer: 1 },
    { q: "Controlled input-д юу хэрэгтэй вэ?", options: ["value + onChange", "зөвхөн value", "зөвхөн onClick", "юу ч үгүй"], answer: 0 },
    { q: "Параметртэй функц дуудахад?", options: ["onClick={fn(id)}", "onClick={() => fn(id)}", "onClick=fn(id)", "onClick={{fn(id)}}"], answer: 1 },
    { q: "Checkbox-д ямар prop ашиглах вэ?", options: ["value", "checked", "selected", "on"], answer: 1 },
    { q: "Form дотор илгээхгүй товчинд?", options: ['type="submit"', 'type="button"', "type өгөхгүй", 'type="reset"'], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Event нэр camelCase, утга нь функц (дуудлага биш).",
    "Параметртэй бол `() => fn(id)` гэж ороо.",
    "Controlled input = `value` + `onChange` хос.",
    "Checkbox-д `checked` + `e.target.checked`.",
    "`onSubmit` + `e.preventDefault()` — form-ийн стандарт загвар.",
    "Form доторх илгээхгүй товчинд `type=\"button\"`.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Vercel** — Todo апп-аа интернэтэд нийтэлж, бусадтай хуваалцана." },
];

// ===== m2l6 — Vercel =====
export const m2l6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Git/GitHub-аар кодоо байршуулж, Vercel дээр үнэгүй deploy хийж, орчны хувьсагч тохируулж сурна." },

  { type: "h", text: "Онол — Deploy гэж юу вэ?" },
  { type: "p", text: "**Deploy** гэдэг нь өөрийн апп-аа интернэтэд байршуулж, дэлхийн хаанаас ч хандах боломжтой болгох. `localhost:3000` бол зөвхөн чиний компьютерт харагддаг." },
  { type: "code", lang: "text", code: `Чиний компьютер          Интернэт
localhost:3000     →     my-app.vercel.app
(зөвхөн чи)              (хэн ч)`, },
  { type: "p", text: "**Vercel** нь Next.js-ийг бүтээсэн компанийн платформ. Next.js апп deploy хийхэд хамгийн хялбар, хувийн төсөлд үнэгүй." },

  { type: "h", text: "Алхам 1 — Git repository үүсгэх" },
  { type: "code", lang: "bash", code: `# Төслийн хавтас дотроо
git init                        # Git эхлүүлэх
git add .                       # бүх файлыг бэлтгэх
git commit -m "first commit"    # хадгалах
git branch -M main              # үндсэн салбарын нэр`, },
  { type: "callout", variant: "warn", title: "Эхлээд .gitignore шалга", text: "`node_modules/`, `.env.local`, `.next/` заавал `.gitignore`-д байх ёстой. Next.js өөрөө үүсгэдэг ч шалгаж байгаарай." },

  { type: "h", text: "Алхам 2 — GitHub руу push" },
  { type: "ol", items: [
    "github.com дээр New repository дар.",
    "Нэр өгөөд Create (README, .gitignore НЭМЭХГҮЙ — аль хэдийн байгаа).",
    "Гарч ирэх командуудыг хуулж ажиллуул:",
  ] },
  { type: "code", lang: "bash", code: `git remote add origin https://github.com/username/my-app.git
git push -u origin main`, },

  { type: "h", text: "Алхам 3 — Vercel дээр deploy" },
  { type: "ol", items: [
    "vercel.com руу орж **GitHub-аар нэвтэр**.",
    "**Add New → Project** дар.",
    "GitHub repo-гоо олж **Import** дар.",
    "Framework автоматаар Next.js гэж танина — өөрчлөх шаардлагагүй.",
    "Хэрэв `.env.local` хувьсагч байгаа бол **Environment Variables** хэсэгт гараар нэм.",
    "**Deploy** дар → 1-2 минутын дараа `your-app.vercel.app` хаяг бэлэн.",
  ] },

  { type: "h", text: "Environment Variables — маш чухал" },
  { type: "p", text: "`.env.local` файл нь `.gitignore`-д байдаг тул GitHub руу **ОРДОГГҮЙ**. Тиймээс Vercel дээр гараар нэмэх ёстой." },
  { type: "code", lang: "bash", code: `# .env.local (чиний компьютерт)
MONGODB_URI=mongodb+srv://...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_API_URL=https://api.example.com`, },
  { type: "code", lang: "text", code: `Vercel → Project → Settings → Environment Variables

Name                    Value                  Environments
MONGODB_URI             mongodb+srv://...      ✓ Production ✓ Preview ✓ Development
CLERK_SECRET_KEY        sk_test_...            ✓ Production ✓ Preview ✓ Development`, },
  { type: "callout", variant: "error", title: "NEXT_PUBLIC_ угтварыг зөв ойлго", text: "`NEXT_PUBLIC_` угтвартай хувьсагч нь **хөтөчид ил гардаг**. API key, нууц үг зэрэгт ХЭЗЭЭ Ч бүү хэрэглэ. Зөвхөн нууц биш зүйлд (публик API хаяг гэх мэт)." },

  { type: "h", text: "Автомат deploy" },
  { type: "p", text: "Нэг удаа холбогдсоны дараа **push хийх бүрт автоматаар шинэчлэгдэнэ**:" },
  { type: "code", lang: "bash", code: `# Код өөрчлөөд
git add .
git commit -m "feat: filter нэмэв"
git push

# → Vercel автоматаар build хийж deploy хийнэ (1-2 минут)`, },
  { type: "callout", variant: "tip", title: "Preview deployment", text: "`main` биш өөр branch руу push хийвэл Vercel тусдаа \"preview\" хаяг үүсгэнэ. Үндсэн сайтад нөлөөлөхгүйгээр туршиж болно." },

  { type: "h", text: "Deploy хийхээс өмнө заавал шалга" },
  { type: "code", lang: "bash", code: `# Локал дээр production build ажиллаж байгаа эсэхийг шалга
npm run build

# ✓ амжилттай бол Vercel дээр ч ажиллана
# ✗ алдаа гарвал эхлээд энд зас — Vercel дээр ч ижил алдаа гарна`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Build failed — Type error", text: "TypeScript алдаа. Локал дээр `npm run build` ажиллуулж, алдааг заасан файл/мөрөөс зас." },
  { type: "callout", variant: "error", title: "Missing environment variable", text: "`.env.local` GitHub-д ордоггүй. Vercel → Settings → Environment Variables-д гараар нэмээд **Redeploy** хий." },
  { type: "callout", variant: "error", title: "Module not found: Can't resolve './Button'", text: "Файлын нэрний том/жижиг үсэг. Mac дээр `button.tsx` ба `Button.tsx` ижил гэж үзнэ, Linux (Vercel) дээр ӨӨР. Импортын нэрийг файлын нэртэй яг таруул." },
  { type: "callout", variant: "warn", title: "Env нэмсэн ч ажиллахгүй", text: "Env хувьсагч нь build үед шингэдэг. Нэмсний дараа заавал **Redeploy** хий (Deployments → ⋯ → Redeploy)." },
  { type: "callout", variant: "error", title: "node_modules GitHub-д орсон", text: "`.gitignore`-д `node_modules/` байгаа эсэхийг шалга. Орчихсон бол: `git rm -r --cached node_modules` → commit → push." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `npm run build` ажиллуулж алдаагүй эсэхийг шалга.",
    "Дунд: Todo апп-аа GitHub-д push хий.",
    "Дунд: Vercel дээр deploy хийж live хаягаа ав.",
    "Хүнд: Кодоо өөрчилж дахин push хийхэд автоматаар шинэчлэгдэхийг ажигла.",
    "Хүнд: `feature/test` branch үүсгэж push хийгээд preview deployment-ыг үз.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Deploy гэж юу вэ?",
    "Яагаад Next.js-д Vercel хамгийн тохиромжтой вэ?",
    "`.env.local` GitHub-д ордог уу? Тэгвэл яаж Vercel-д хүргэх вэ?",
    "`NEXT_PUBLIC_` угтвар юу хийдэг вэ, юунд болгоомжлох вэ?",
    "Deploy хийхээс өмнө юуг шалгах вэ?",
    "Env хувьсагч нэмсний дараа яагаад redeploy хийх ёстой вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Deploy гэж юу вэ?", options: ["Код устгах", "Апп-аа интернэтэд байршуулах", "Локал сервер", "Мэдээллийн сан"], answer: 1 },
    { q: "Next.js-д хамгийн тохиромжтой платформ?", options: ["Vercel", "Photoshop", "MongoDB", "Postman"], answer: 0 },
    { q: ".env хувьсагчийг Vercel дээр хаана нэмэх вэ?", options: ["GitHub-д push", "Settings → Environment Variables", "package.json", "layout.tsx"], answer: 1 },
    { q: "NEXT_PUBLIC_ угтвартай хувьсагч?", options: ["Нууцлагдана", "Хөтөчид ил гарна", "Ажиллахгүй", "Зөвхөн сервер дээр"], answer: 1 },
    { q: "Deploy-ээс өмнө юу шалгах вэ?", options: ["npm run dev", "npm run build", "npm test", "юу ч үгүй"], answer: 1 },
    { q: "Env нэмсний дараа юу хийх вэ?", options: ["Юу ч үгүй", "Redeploy", "Repo устгах", "npm install"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Deploy = апп-аа интернэтэд гаргах.",
    "GitHub → Vercel гэсэн урсгал: нэг удаа холбоод дараа нь push бүрт автомат.",
    "`.env.local` GitHub-д ордоггүй — Vercel дээр гараар нэм, дараа нь Redeploy.",
    "`NEXT_PUBLIC_` = хөтөчид ил. Нууцад бүү хэрэглэ.",
    "Deploy-ээс өмнө локал дээр `npm run build` шалга.",
    "🎉 2-р модуль дууслаа! Бүтэн интерактив апп хийж, интернэтэд гаргалаа.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**3-р модуль: Multi-Steps Form.** Validation, алдааны мессеж, animation-ийг мэргэжлийн түвшинд хийнэ." },
];
