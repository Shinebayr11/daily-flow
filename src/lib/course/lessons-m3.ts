import type { ContentBlock } from "./types";

// m3l1 — Validation
export const m3l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Form-ийн өгөгдлийг шалгах (validation) буюу зөв эсэхийг React Hook Form + Zod-оор шалгаж сурна." },
  { type: "h", text: "Онол — Validation гэж юу вэ?" },
  { type: "p", text: "**Validation** нь хэрэглэгчийн оруулсан өгөгдөл зөв эсэхийг шалгах. Жишээ: нэр хоосон биш, имэйл зөв форматтай, нууц үг 6+ тэмдэгт. Бид **React Hook Form** (форм удирдах) + **Zod** (дүрэм тодорхойлох)-ыг ашиглана." },
  { type: "callout", variant: "tip", title: "Яагаад Zod?", text: "Zod-оор \"нэр заавал, имэйл зөв формат\" гэх дүрмийг нэг дор бичээд, React Hook Form түүнийг ашиглан автоматаар шалгадаг. Гараар if бичих шаардлагагүй." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "code", lang: "bash", code: `npm install react-hook-form zod @hookform/resolvers` },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1) Дүрмээ Zod-оор тодорхойлно
const schema = z.object({
  name: z.string().min(1, "Нэр заавал"),
  email: z.string().email("Имэйл буруу"),
});
type FormData = z.infer<typeof schema>;   // төрлийг автоматаар гаргана

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("name")} placeholder="Нэр" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email")} placeholder="Имэйл" />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Илгээх</button>
    </form>
  );
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`schema` — Zod-оор дүрэм: name заавал, email зөв формат.",
    "`register(\"name\")` — input-ыг форматай холбоно.",
    "`errors.name` — дүрэм зөрчвөл алдааны мессеж энд орно.",
    "`handleSubmit` — эхлээд validation хийж, зөв бол л data өгнө.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "resolver өгөхөө мартах", text: "`useForm({ resolver: zodResolver(schema) })` гэж resolver өгөхгүй бол Zod дүрэм ажиллахгүй." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `phone` талбар нэмж заавал болго.",
    "Дунд: name-ийг дор хаяж 2 тэмдэгт болго (`.min(2)`).",
    "Хүнд: Насны талбар нэмж зөвхөн тоо (`z.number()`) болго.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Validation юуг шалгадаг вэ?", options: ["Өгөгдөл зөв эсэх", "Интернэт хурд", "CSS", "Сервер"], answer: 0 },
    { q: "Дүрэм тодорхойлоход аль сан?", options: ["Zod", "Axios", "Recharts", "Sonner"], answer: 0 },
    { q: "Форм удирдахад аль сан?", options: ["React Hook Form", "Next Router", "Prisma", "bcrypt"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Validation = өгөгдөл зөв эсэхийг шалгах.", "Zod-оор дүрэм, React Hook Form-оор форм удирдана.", "`errors`-оор алдааг харуулна."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Handle Error Message** — алдааны мессежийг сайхан харуулж, input-ыг тодотгоно." },
];

// m3l2 — Handle Error Message
export const m3l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Validation-ийн алдааг хэрэглэгчид ойлгомжтой харуулж, буруу input-ыг улаанаар тодотгож сурна." },
  { type: "h", text: "Онол" },
  { type: "p", text: "Зөвхөн \"алдаатай\" гэж хэлэх нь хангалтгүй — хаана, яагаад алдаатайг тод харуулах ёстой. Input доор улаан текст, input-ийн хүрээг улаан болгох нь хамгийн түгээмэл." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `<div>
  <input
    {...register("email")}
    className={\`border rounded p-2 \${
      errors.email ? "border-red-500" : "border-gray-300"
    }\`}
    placeholder="Имэйл"
  />
  {/* алдаа байвал улаан текст */}
  {errors.email && (
    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
  )}
</div>` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`errors.email ? \"border-red-500\" : \"border-gray-300\"` — алдаатай бол хүрээ улаан.",
    "`{errors.email && <p>...}` — алдаа байвал л мессеж харуулна.",
    "`errors.email.message` — Zod-д бичсэн мессеж (\"Имэйл буруу\").",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "errors.email.message заримдаа undefined", text: "`errors.email &&` гэж эхлээд шалгаж байж `.message`-д хандах ёстой (optional chaining `errors.email?.message` ч болно)." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Бүх талбарт улаан хүрээ + мессеж нэм.",
    "Дунд: Алдаатай үед input дэргэд ⚠ icon харуул.",
    "Хүнд: Амжилттай илгээгдвэл ногоон \"Амжилттай\" мессеж харуул.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Алдааны мессежийг хаанаас авах вэ?", options: ["errors.field.message", "data.error", "console", "state"], answer: 0 },
    { q: "Буруу input-ыг яаж тодотгодог вэ?", options: ["Хүрээг улаан болгож", "Устгаж", "Нуух", "Дуугаар"], answer: 0 },
    { q: "Мессежийг хэзээ харуулах вэ?", options: ["Үргэлж", "Зөвхөн алдаатай үед", "Хэзээ ч үгүй", "Load үед"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Алдааг тод (улаан текст + хүрээ) харуулна.", "`errors.field.message`-ийг ашиглана.", "Зөвхөн алдаатай үед л харуулна."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Framer Motion** — алхмуудын хооронд гөлгөр animation нэмнэ." },
];

// m3l3 — Framer Motion
export const m3l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Framer Motion сангаар component-д гөлгөр animation (гарч ирэх, шилжих) нэмж сурна." },
  { type: "h", text: "Онол — Framer Motion" },
  { type: "p", text: "**Framer Motion** нь React-д зориулсan animation сан. `motion.div` ашиглаад `initial`, `animate` заахад л component гөлгөр хөдөлдөг. Multi-step form-ийн алхмуудын шилжилтэд тохиромжтой." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "code", lang: "bash", code: `npm install framer-motion` },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "tsx", code: `"use client";
import { motion } from "framer-motion";

export default function Step() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}   // эхлэл: тунгалаг, баруун талд
      animate={{ opacity: 1, x: 0 }}    // төгсгөл: харагдана, голд
      transition={{ duration: 0.3 }}    // 0.3 секундэд
    >
      <h2>Алхам 1</h2>
    </motion.div>
  );
}` },
  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`motion.div` — энгийн div-ийг animation-тай болгоно.",
    "`initial` — эхний байдал (харагдахаас өмнө).",
    "`animate` — эцсийн байдал (харагдах үед).",
    "`transition` — хурд, хугацаа.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: '"use client" мартах', text: "Framer Motion интерактив тул component-д `\"use client\"` заавал хэрэгтэй." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `x: 50`-г `y: 50` болгож дээрээс уруу гарч ирүүл.",
    "Дунд: `duration`-ыг өөрчилж хурдыг тохируул.",
    "Хүнд: Multi-step form-ийн 3 алхамд animation нэм.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Framer Motion юунд зориулагдсан вэ?", options: ["Animation", "Мэдээллийн сан", "Auth", "Routing"], answer: 0 },
    { q: "Animation-тай div?", options: ["<motion.div>", "<div motion>", "<animate>", "<div />"], answer: 0 },
    { q: "Эхний байдлыг заах prop?", options: ["animate", "initial", "start", "from"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Framer Motion-оор гөлгөр animation нэмнэ.",
    "`motion.div` + `initial`/`animate`/`transition`.",
    "3-р модуль дууслаа! 🎉",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**4-р модуль: Movie Web Application.** Routing, API, useEffect, SSR/CSR зэрэг том сэдвүүд эхэлнэ." },
];
