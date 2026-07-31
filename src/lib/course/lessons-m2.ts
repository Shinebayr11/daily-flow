import type { ContentBlock } from "./types";

// m2l1 — CSS Modules Introduction
export const m2l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "CSS Modules гэж юу вэ, Tailwind-аас юугаараа ялгаатайг ойлгож, component-д загвар өгч сурна." },
  { type: "h", text: "Онол — CSS Modules" },
  { type: "p", text: "**CSS Modules** нь `.module.css` өргөтгөлтэй файл. Түүн доторх класс нэр зөвхөн тухайн component-д үйлчилдэг — өөр газар мөргөлдөхгүй (scoped)." },
  { type: "callout", variant: "tip", title: "CSS Modules vs Tailwind", text: "CSS Modules — тусдаа .css файлд дүрэм бичнэ. Tailwind — шууд className дотор бэлэн класс (жишээ `p-4`, `text-xl`) ашиглана. Хоёулаа зөв, төслөөс хамаарна." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "css", code: `/* Button.module.css */
.button {
  background: indigo;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
}` },
  { type: "code", lang: "tsx", code: `// Button.tsx
import styles from "./Button.module.css";

export default function Button() {
  // styles.button → өвөрмөц болгож хувиргасан класс нэр
  return <button className={styles.button}>Дарах</button>;
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`import styles from \"./Button.module.css\"` — классуудыг объект болгон авна.",
    "`styles.button` — CSS доторх `.button` классыг заана.",
    "React үүнийг давтагдашгүй нэр болгож хувиргадаг тул мөргөлдөхгүй.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "className='button' гэж шууд бичих", text: "CSS Modules-д `styles.button` гэж бичнэ, шууд текст биш. Мөн файл нэр `.module.css`-ээр төгсөх ёстой." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `Button.module.css`-д hover өнгө нэм.",
    "Дунд: `Card.module.css` үүсгэж Card component-д хэрэглэ.",
    "Хүнд: Мөн адил товчийг Tailwind классаар бич — 2 аргыг харьцуул.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "CSS Modules файлын өргөтгөл?", options: [".css", ".module.css", ".style.js", ".tsx"], answer: 1 },
    { q: "CSS Modules-ийн давуу тал?", options: ["Класс scoped, мөргөлдөхгүй", "Илүү удаан", "JS хэрэггүй", "Зөвхөн сервер"], answer: 0 },
    { q: "Tailwind-д загварыг хаана бичих вэ?", options: ["Тусдаа .css файлд", "className дотор бэлэн класс", "layout.tsx-д", "package.json-д"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "CSS Modules = scoped загвар (.module.css).",
    "`styles.className` хэлбэрээр ашиглана.",
    "Tailwind бол өөр арга — className дотор бэлэн класс.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**useState hook** — component-д \"санах ой\" (state) нэмж, өгөгдлөө өөрчилж сурна." },
];

// m2l2 — useState hook
export const m2l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "State гэж юу вэ, useState hook-ийг хэрхэн ашиглаж утга хадгалах, өөрчлөхийг сурна." },
  { type: "h", text: "Онол — State гэж юу вэ?" },
  { type: "p", text: "**State** нь component-ийн санах ой — цаг хугацаанд өөрчлөгддөг өгөгдөл. Жишээ: тоолуурын тоо, input-ийн текст. State өөрчлөгдвөл дэлгэц автоматаар шинэчлэгддэг." },
  { type: "callout", variant: "tip", title: "State vs энгийн хувьсагч", text: "Энгийн `let count = 0` өөрчлөгдвөл дэлгэц шинэчлэгддэггүй. State өөрчлөгдвөл React дахин зурдаг (re-render). Тийм учраас интерактив өгөгдөлд state ашиглана." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `"use client";              // useState-д заавал хэрэгтэй
import { useState } from "react";

export default function Counter() {
  // [одоогийн утга, өөрчлөх функц] = useState(эхний утга)
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Тоо: {count}
    </button>
  );
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`const [count, setCount] = useState(0)` — `count` одоогийн утга, `setCount` түүнийг өөрчлөх функц, `0` эхний утга.",
    "`setCount(count + 1)` — state-ийг шинэчилнэ → component re-render болно.",
    "State-ийг ШУУД `count = 5` гэж өөрчилж болохгүй — заавал `setCount` ашиглана.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "useState only works in Client Components", text: "Файлын дээд талд `\"use client\"` бичээгүй. useState ашиглах бол заавал нэм." },
  { type: "callout", variant: "error", title: "State-ийг шууд өөрчлөх", text: "`count = count + 1` (буруу). `setCount(count + 1)` (зөв) ашиглаж React-д мэдэгд." },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "useState тоолуур", code: `function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Тоо: {count}</p>
      <button onClick={() => setCount(count + 1)}>Нэмэх</button>
    </div>
  );
}` },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: \"Хасах\" товч нэмж count-ыг 1-ээр бууруул.",
    "Дунд: \"Reset\" товч нэмж count-ыг 0 болго.",
    "Хүнд: `text` нэртэй string state үүсгэж, товч дарахад өөрчил.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "useState юуг буцаадаг вэ?", options: ["Зөвхөн утга", "[утга, өөрчлөх функц]", "Функц", "CSS"], answer: 1 },
    { q: "State-ийг яаж өөрчлөх вэ?", options: ["Шууд =", "set функцээр", "let-ээр", "өөрчлөх боломжгүй"], answer: 1 },
    { q: "State өөрчлөгдөхөд юу болдог вэ?", options: ["Юу ч болохгүй", "Re-render", "Алдаа", "Хуудас хаагдана"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "State = өөрчлөгддөг өгөгдөл (санах ой).",
    "`const [x, setX] = useState(эхний)`.",
    "Заавал set функцээр өөрчилнө → re-render.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Rendering Lists** — массив өгөгдлийг `.map()`-ээр дэлгэцэд жагсаалт болгож харуулна." },
];

// m2l3 — Rendering Lists
export const m2l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Массив өгөгдлийг `.map()`-ээр жагсаалт болгон харуулж, `key`-г зөв ашиглана." },
  { type: "h", text: "Онол" },
  { type: "p", text: "Todo, бүтээгдэхүүн гэх мэт олон зүйлийг массивд хадгалаад, `.map()`-ээр дэлгэцэд зурдаг. Элемент бүрт давтагдашгүй **`key`** заавал өгнө." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState } from "react";

export default function TodoList() {
  const [todos] = useState([
    { id: 1, text: "Ном унших" },
    { id: 2, text: "Дасгал хийх" },
  ]);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>   {/* key = id */}
      ))}
    </ul>
  );
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`todos` — объектуудын массив, тус бүр `id` ба `text`-тэй.",
    "`.map()` — элемент бүрийг `<li>` болгон хувиргана.",
    "`key={todo.id}` — давтагдашгүй id ашиглана (index биш нь дээр).",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "warn", title: 'Each child ... unique "key"', text: ".map() дотор key өгөөгүй. Элемент бүрт `key={...}` нэм." },
  { type: "callout", variant: "error", title: "Objects are not valid as a React child", text: "Объектыг шууд харуулах гэсэн. `{todo}` биш `{todo.text}` гэж талбарыг нь харуул." },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Жагсаалт зурах", code: `function App() {
  const [todos] = useState([
    { id: 1, text: "Ном унших" },
    { id: 2, text: "Дасгал хийх" },
  ]);
  return (
    <ul>
      {todos.map((t) => <li key={t.id}>{t.text}</li>)}
    </ul>
  );
}` },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `todos`-д 3 дахь зүйл нэм.",
    "Дунд: Хоосон массив үед \"Хоосон байна\" гэж харуул (conditional).",
    "Хүнд: Массивын урттай (todos.length) тоог доор нь харуул.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Массивыг жагсаалт болгоход?", options: [".map()", ".push()", ".log()", ".join()"], answer: 0 },
    { q: "key-д хамгийн тохиромжтой нь?", options: ["index", "давтагдашгүй id", "текст", "тэг"], answer: 1 },
    { q: "Объектыг харуулахад?", options: ["{obj}", "{obj.field}", "{[obj]}", "боломжгүй"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Массивыг `.map()`-ээр жагсаалт болгоно.", "Элемент бүрт давтагдашгүй `key` (ихэвчлэн id).", "Объектын талбарыг нэрээр нь харуулна."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**alert** — хэрэглэгчид анхааруулга харуулж, validation-д ашиглана." },
];

// m2l4 — alert
export const m2l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`alert()`-ийг ашиглан хэрэглэгчид мессеж харуулж, энгийн validation хийж сурна." },
  { type: "h", text: "Онол" },
  { type: "p", text: "`alert(\"текст\")` нь хөтчийн жижиг цонхонд мессеж гаргадаг browser функц. Ихэвчлэн хоосон input зэрэг буруу үйлдлийг мэдэгдэхэд ашигладаг (жинхэнэ апп-д toast-оор солино)." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState } from "react";

export default function AddTodo() {
  const [text, setText] = useState("");

  function handleAdd() {
    if (text.trim() === "") {
      alert("Хоосон байж болохгүй!");   // энгийн validation
      return;
    }
    // ... энд todo нэмнэ
    setText("");
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Нэмэх</button>
    </div>
  );
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`text.trim() === \"\"` — хоосон (эсвэл зөвхөн зай) эсэхийг шалгана.",
    "`alert(...)` — анхааруулга харуулна.",
    "`return` — цааш үргэлжлэхгүй, todo нэмэгдэхгүй.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "warn", title: "alert хэт их ашиглах", text: "alert хэрэглэгчийг залхаадаг. Жинхэнэ төсөлд toast (жишээ Sonner) эсвэl input доорх алдааны текст ашиглах нь дээр." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Текст 3 тэмдэгтээс богино бол alert харуул.",
    "Дунд: alert-ыг устгаад оронд нь улаан текст `<p>` харуул.",
    "Хүнд: Хоосон биш үед л \"Амжилттай\" alert харуул.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "alert() юу хийдэг вэ?", options: ["Мэдээлэл хадгална", "Хөтчид мессеж харуулна", "Сервер дуудна", "Хуудас хаана"], answer: 1 },
    { q: "Хоосон эсэхийг шалгах зөв арга?", options: ["text === null", 'text.trim() === ""', "text = 0", "text.length > 5"], answer: 1 },
    { q: "Жинхэнэ төсөлд alert-ыг юугаар солих нь дээр вэ?", options: ["Юугаар ч үгүй", "toast / алдааны текст", "console.log", "sserver"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["`alert()` — хурдан мессеж харуулах browser функц.", "Хоосон input-ийг `trim()`-ээр шалгана.", "Жинхэнэ апп-д toast/алдааны текст илүү тохиромжтой."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Click, Change and Submit events** — хэрэглэгчийн үйлдлүүдийг барьж боловсруулна." },
];

// m2l5 — Click, Change and Submit events
export const m2l5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "onClick, onChange, onSubmit event-үүд болон `preventDefault()`-ийг ашиглаж form боловсруулна." },
  { type: "h", text: "Онол — Event гэж юу вэ?" },
  { type: "ul", items: [
    "`onClick` — товч эсвэл элемент дээр дарах.",
    "`onChange` — input-ийн утга өөрчлөгдөх (бичих) бүрт.",
    "`onSubmit` — form илгээгдэх үед (form-ийн доторх товч дарах / Enter).",
    "`e.preventDefault()` — form илгээгдэхэд хуудас дахин ачаалахаас сэргийлнэ.",
  ] },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState } from "react";

export default function TodoForm() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();          // хуудас reload болохоос сэргийлнэ
    if (!text.trim()) return;
    setTodos([...todos, text]);  // шинэ todo нэмнэ
    setText("");                 // input-ыг цэвэрлэнэ
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}  // бичих бүрт
        placeholder="Todo бич..."
      />
      <button type="submit">Нэмэх</button>          {/* onClick биш submit */}
    </form>
  );
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`onChange` — бичих бүрт `setText`-ээр state шинэчилнэ (controlled input).",
    "`onSubmit` + `preventDefault()` — form илгээхэд reload болохгүй.",
    "`[...todos, text]` — хуучин массив дээр шинэ утга нэмнэ (spread).",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "preventDefault мартах", text: "onSubmit дээр `e.preventDefault()` дуудахгүй бол хуудас дахин ачаалж, state алдагдана." },
  { type: "callout", variant: "error", title: "value байхгүй controlled input", text: "`value={text}` өгөхгүй бол input-ийг state удирдахгүй. value + onChange хосоор ашигла." },
  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Todo нэмэх form", code: `function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, text]);
    setText("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Todo бич..." />
        <button type="submit">Нэмэх</button>
      </form>
      <ul>{todos.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  );
}` },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Нэмсэн todos-оо доор жагсааж харуул (map).",
    "Дунд: Todo хоосон бол alert харуул.",
    "Хүнд: Enter дарахад л нэмэгддэг болгож туршиж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Input-д бичих бүрт ажиллах event?", options: ["onClick", "onChange", "onSubmit", "onLoad"], answer: 1 },
    { q: "Form илгээхэд reload болохоос юугаар сэргийлэх вэ?", options: ["return", "e.preventDefault()", "alert()", "useState"], answer: 1 },
    { q: "Controlled input-д юу хэрэгтэй вэ?", options: ["value + onChange", "зөвхөн value", "зөвхөн onClick", "юу ч үгүй"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["onClick/onChange/onSubmit — гол event-үүд.", "`preventDefault()` form reload-оос сэргийлнэ.", "Controlled input = value + onChange."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Vercel** — Todo апп-аа интернэтэд үнэгүй нийтэлж (deploy) сурна." },
];

// m2l6 — Vercel
export const m2l6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Next.js төслөө GitHub-аар дамжуулж Vercel дээр үнэгүй deploy хийж сурна." },
  { type: "h", text: "Онол — Deploy гэж юу вэ?" },
  { type: "p", text: "**Deploy** гэдэг нь өөрийн апп-аа интернэтэд байршуулж, бусад хүн хаягаар нь орж үзэх боломжтой болгох. **Vercel** бол Next.js-д зориулагдсан хамгийн хялбар үнэгүй платформ." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "ol", items: [
    "Төслөө GitHub дээр repository болгож push хий.",
    "vercel.com руу орж GitHub-аар нэвтэр.",
    "\"Add New → Project\" дарж тухайн repo-гоо сонго.",
    "Хэрэв .env хувьсагч байвал \"Environment Variables\"-д нэм.",
    "\"Deploy\" дар → хэдэн секундын дараа `your-app.vercel.app` хаяг бэлэн болно.",
  ] },
  { type: "code", lang: "bash", code: `# GitHub-д анх удаа push хийх
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <repo-URL>
git push -u origin main` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Build failed", text: "Локал дээр `npm run build` амжилттай болж байгаа эсэхийг эхлээд шалга. Алдаа гарвал засаад дахин push хий — Vercel автоматаар дахин deploy хийнэ." },
  { type: "callout", variant: "error", title: ".env хувьсагч ажиллахгүй", text: "`.env.local` GitHub-д орохгүй (gitignore). Тиймээс хувьсагчуудаа Vercel-ийн Settings → Environment Variables-д гараар нэм." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Todo апп-аа GitHub-д push хий.",
    "Дунд: Vercel дээр deploy хийж, live хаягаа найзтайгаа хуваалц.",
    "Хүнд: Кодоо өөрчилж дахин push хийхэд Vercel автоматаар шинэчлэгдэхийг ажигла.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Deploy гэж юу вэ?", options: ["Код устгах", "Апп-аа интернэтэд байршуулах", "Локал сервер", "Мэдээллийн сан"], answer: 1 },
    { q: "Next.js-д хамгийн хялбар үнэгүй платформ?", options: ["Vercel", "Photoshop", "MongoDB", "Postman"], answer: 0 },
    { q: ".env хувьсагчийг Vercel дээр хаана нэмэх вэ?", options: ["GitHub-д push", "Environment Variables", "package.json", "layout.tsx"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Deploy = апп-аа интернэтэд гаргах.",
    "GitHub → Vercel гэсэн урсгалаар хялбар deploy хийнэ.",
    "`.env` хувьсагчийг Vercel-д гараар нэмнэ. 2-р модуль дууслаа! 🎉",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**3-р модуль: Multi-Steps Form.** Validation, алдааны мессеж, Framer Motion animation-ийг сурна." },
];
