import type { ContentBlock } from "./types";

// ===== m3l1 — Validation =====
export const m3l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Validation яагаад хэрэгтэйг ойлгож, React Hook Form + Zod-оор мэргэжлийн түвшинд хэрэгжүүлж, олон алхамт форм барьж сурна." },

  { type: "h", text: "Онол — Validation гэж юу вэ, яагаад хэрэгтэй вэ?" },
  { type: "p", text: "**Validation** нь хэрэглэгчийн оруулсан өгөгдөл зөв эсэхийг шалгах. Гурван шалтгаанаар зайлшгүй:" },
  { type: "ul", items: [
    "**Хэрэглэгчид туслах** — \"имэйл буруу байна\" гэж шууд хэлбэл засах боломжтой.",
    "**Өгөгдлийн чанар** — DB-д хог өгөгдөл орохоос сэргийлнэ.",
    "**Аюулгүй байдал** — санаатай хортой оролтоос хамгаална.",
  ] },
  { type: "callout", variant: "warn", title: "Frontend validation ХАНГАЛТГҮЙ", text: "Хөтөч дээрх шалгалтыг хэн ч тойрч болно (DevTools нээгээд шууд API дуудна). Backend дээр ЗААВАЛ дахин шалга. Frontend validation бол зөвхөн хэрэглэгчийн тав тухын төлөө." },

  { type: "h", text: "Гараар бичихэд ямар байдаг вэ?" },
  { type: "code", lang: "tsx", code: `// Гараар — маш их код, засварлахад хэцүү
const [errors, setErrors] = useState({});

function validate() {
  const e = {};
  if (!name) e.name = "Нэр заавал";
  else if (name.length < 2) e.name = "Хамгийн багадаа 2 тэмдэгт";

  if (!email) e.email = "Имэйл заавал";
  else if (!/^[^@]+@[^@]+\\.[^@]+$/.test(email)) e.email = "Имэйл буруу";

  if (!password) e.password = "Нууц үг заавал";
  else if (password.length < 6) e.password = "6+ тэмдэгт";

  if (password !== confirm) e.confirm = "Таарахгүй байна";

  setErrors(e);
  return Object.keys(e).length === 0;
}
// ... 10 талбартай бол 60 мөр код!`, },
  { type: "p", text: "Энэ бол ажилладаг ч: урт, давхардсан, туршихад хэцүү, өөрчлөхөд амархан алдаа гаргадаг. **Zod + React Hook Form** үүнийг шийднэ." },

  { type: "h", text: "Zod — дүрмийг тунхаглах" },
  { type: "code", lang: "bash", code: `npm install react-hook-form zod @hookform/resolvers`, },
  { type: "code", lang: "ts", code: `import { z } from "zod";

// Бүх дүрэм нэг дор, уншихад ойлгомжтой
const schema = z.object({
  name: z.string()
    .min(2, "Хамгийн багадаа 2 тэмдэгт")
    .max(50, "Хэтэрхий урт"),

  email: z.string()
    .min(1, "Имэйл заавал")
    .email("Имэйл буруу форматтай"),

  password: z.string()
    .min(6, "Хамгийн багадаа 6 тэмдэгт")
    .regex(/[0-9]/, "Дор хаяж нэг тоо байх ёстой"),

  age: z.coerce.number()               // текстийг тоо болгож хөрвүүлнэ
    .min(18, "18-аас дээш насны байх"),

  terms: z.boolean()
    .refine((v) => v === true, "Нөхцөлийг зөвшөөрнө үү"),
});

// Төрөл автоматаар гарна — гараар бичих шаардлагагүй!
type FormData = z.infer<typeof schema>;
// { name: string; email: string; password: string; age: number; terms: boolean }`, },
  { type: "callout", variant: "tip", title: "z.infer гэж юу вэ?", text: "Zod схемээс TypeScript төрлийг автоматаар гаргана. Схемээ өөрчлөхөд төрөл нь өөрөө шинэчлэгдэнэ — хоёр газар засах шаардлагагүй." },

  { type: "h", text: "React Hook Form — формыг удирдах" },
  { type: "code", lang: "tsx", code: `"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Хамгийн багадаа 2 тэмдэгт"),
  email: z.string().email("Имэйл буруу"),
});
type FormData = z.infer<typeof schema>;

export default function SignupForm() {
  const {
    register,           // input-ыг форматай холбоно
    handleSubmit,       // submit-ыг ороож validation хийнэ
    reset,              // формыг цэвэрлэнэ
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),      // ← Zod-ыг холбож байна
    defaultValues: { name: "", email: "" },
  });

  async function onSubmit(data: FormData) {
    // Энд хүрсэн бол data 100% зөв байна
    await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Нэр" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email")} placeholder="Имэйл" />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Илгээж байна..." : "Илгээх"}
      </button>
    </form>
  );
}`, },

  { type: "h", text: "Кодын тайлбар" },
  { type: "ul", items: [
    "`register(\"name\")` — input-ыг форматай холбоно. `value`, `onChange`, `onBlur`, `ref` бүгдийг өөрөө өгнө.",
    "`handleSubmit(onSubmit)` — эхлээд validation хийнэ. Зөв бол л `onSubmit`-ыг дуудаж, цэвэр `data` өгнө.",
    "`errors.name.message` — Zod-д бичсэн мессеж энд ирнэ.",
    "`isSubmitting` — илгээж байх үед `true`. Товч дахин дарахаас сэргийлнэ.",
    "`defaultValues` — эхний утга. Заавал өгөх нь дээр (controlled/uncontrolled анхааруулгаас сэргийлнэ).",
  ] },
  { type: "callout", variant: "tip", title: "Яагаад RHF хурдан вэ?", text: "Ердийн `useState` формд бичих товч бүрт бүх component re-render болдог. React Hook Form нь uncontrolled input ашигладаг тул бичих үед re-render болдоггүй — 10+ талбартай формд мэдэгдэхүйц хурдан." },

  { type: "h", text: "Хоёр талбарыг харьцуулах (нууц үг давтах)" },
  { type: "code", lang: "ts", code: `const schema = z.object({
  password: z.string().min(6, "6+ тэмдэгт"),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Нууц үг таарахгүй байна",
  path: ["confirmPassword"],       // алдааг ЭНЭ талбарт харуулна
});`, },

  { type: "h", text: "Multi-step form — олон алхам" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Алхам бүрийн схемийг тусад нь
const step1 = z.object({
  name: z.string().min(2, "Нэр заавал"),
  email: z.string().email("Имэйл буруу"),
  phone: z.string().regex(/^[0-9]{8}$/, "8 оронтой дугаар"),
});

const step2 = z.object({
  password: z.string().min(6, "6+ тэмдэгт"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Нууц үг таарахгүй",
  path: ["confirmPassword"],
});

// Бүгдийг нэгтгэсэн схем
const fullSchema = step1.and(step2);
type FormData = z.infer<typeof fullSchema>;

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const { register, handleSubmit, trigger, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(fullSchema), mode: "onBlur" });

  // Дараагийн алхам руу орохын өмнө ЗӨВХӨН энэ алхмын талбарыг шалгана
  async function next() {
    const fields = step === 1
      ? (["name", "email", "phone"] as const)
      : (["password", "confirmPassword"] as const);

    const valid = await trigger(fields);   // ← гараар validation дуудаж байна
    if (valid) setStep(step + 1);
  }

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      {/* Явцын заалт */}
      <p>Алхам {step} / 3</p>

      {step === 1 && (
        <>
          <input {...register("name")} placeholder="Нэр" />
          {errors.name && <p>{errors.name.message}</p>}
          <input {...register("email")} placeholder="Имэйл" />
          {errors.email && <p>{errors.email.message}</p>}
          <input {...register("phone")} placeholder="Утас" />
          {errors.phone && <p>{errors.phone.message}</p>}
        </>
      )}

      {step === 2 && (
        <>
          <input type="password" {...register("password")} placeholder="Нууц үг" />
          {errors.password && <p>{errors.password.message}</p>}
          <input type="password" {...register("confirmPassword")} placeholder="Давтах" />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </>
      )}

      {step === 3 && <p>Мэдээллээ шалгаад илгээнэ үү.</p>}

      {/* Навигац */}
      {step > 1 && <button type="button" onClick={() => setStep(step - 1)}>Буцах</button>}
      {step < 3 && <button type="button" onClick={next}>Дараах</button>}
      {step === 3 && <button type="submit">Илгээх</button>}
    </form>
  );
}`, },
  { type: "callout", variant: "tip", title: "trigger() юу хийдэг вэ?", text: "Зөвхөн заасан талбаруудыг гараар шалгана. Multi-step формд зайлшгүй — эхний алхамд 2-р алхмын талбар хоосон байгаа тул бүхэл формыг шалгавал үргэлж алдаатай гарна." },

  { type: "h", text: "mode — validation хэзээ ажиллах вэ?" },
  { type: "code", lang: "tsx", code: `useForm({
  mode: "onSubmit",   // (default) зөвхөн илгээхэд
  mode: "onBlur",     // талбараас гарахад — ЗӨВЛӨМЖТЭЙ
  mode: "onChange",   // бичих бүрт — түрэмгий санагдаж болно
  mode: "onTouched",  // нэг удаа хүрсний дараа
});`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "resolver өгөхөө мартах", text: "`useForm({ resolver: zodResolver(schema) })` гэж resolver өгөхгүй бол Zod дүрэм огт ажиллахгүй, `errors` үргэлж хоосон байна." },
  { type: "callout", variant: "error", title: "register-ийг spread хийхгүй", text: "`<input register(\"name\") />` — буруу. `<input {...register(\"name\")} />` гэж spread хий." },
  { type: "callout", variant: "error", title: "Тоон талбар string ирдэг", text: "HTML input үргэлж string буцаана. `z.number()` дээр алдаа өгнө. `z.coerce.number()` ашигла — автоматаар хөрвүүлнэ." },
  { type: "callout", variant: "error", title: "A component is changing an uncontrolled input to be controlled", text: "`defaultValues` өгөөгүй. `useForm({ defaultValues: { name: \"\" } })` гэж бүх талбарт анхны утга өг." },
  { type: "callout", variant: "warn", title: "Multi-step-д бүх талбарыг шалгах", text: "`trigger()`-т талбаруудыг заахгүй бол бүхэл формыг шалгаж, дараагийн алхмын хоосон талбараас болж хэзээ ч цаашлахгүй." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `phone` талбар нэмж, 8 оронтой тоо байхыг шалга.",
    "Дунд: `age` талбар нэмж `z.coerce.number().min(18)` ашигла.",
    "Дунд: Нууц үг давтах шалгалтыг `.refine()`-ээр хий.",
    "Хүнд: `mode: \"onBlur\"` болон `\"onChange\"`-ыг сольж туршиж, аль нь хэрэглэгчид тухтай болохыг бич.",
    "Хүнд: 3 алхамт формыг `trigger()`-тэй бүрэн ажиллуул.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Validation яагаад хэрэгтэй вэ (3 шалтгаан)?",
    "Frontend validation хангалттай юу? Яагаад?",
    "Zod юу хийдэг, React Hook Form юу хийдэг вэ?",
    "`z.infer` юунд хэрэгтэй вэ?",
    "`register()` юу хийдэг вэ?",
    "`handleSubmit` энгийн `onSubmit`-оос юугаараа ялгаатай вэ?",
    "Multi-step формд `trigger()` яагаад хэрэгтэй вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Validation юуг шалгадаг вэ?", options: ["Өгөгдөл зөв эсэх", "Интернэт хурд", "CSS", "Сервер"], answer: 0 },
    { q: "Дүрэм тодорхойлоход аль сан?", options: ["Zod", "Axios", "Recharts", "Sonner"], answer: 0 },
    { q: "Форм удирдахад аль сан?", options: ["React Hook Form", "Next Router", "Prisma", "bcrypt"], answer: 0 },
    { q: "Zod схемээс төрөл гаргах?", options: ["z.type()", "z.infer<typeof schema>", "typeof schema", "z.get()"], answer: 1 },
    { q: "Тоон input-д ямар Zod ашиглах вэ?", options: ["z.number()", "z.coerce.number()", "z.string()", "z.int()"], answer: 1 },
    { q: "Frontend validation хангалттай юу?", options: ["Тийм", "Үгүй — backend дээр дахин шалгана", "Заримдаа", "Backend хэрэггүй"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Validation = өгөгдөл зөв эсэхийг шалгах. Frontend + backend хоёуланд.",
    "Zod = дүрмийг тунхаглана, `z.infer`-ээр төрөл автоматаар гарна.",
    "React Hook Form = формыг удирдана, re-render бага.",
    "`resolver: zodResolver(schema)` — хоёрыг холбоно.",
    "Тоон талбарт `z.coerce.number()`, харьцуулахад `.refine()`.",
    "Multi-step-д `trigger([талбарууд])` ашиглана.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Handle Error Message** — алдааг хэрэглэгчид ойлгомжтой, гоё харуулна." },
];

// ===== m3l2 — Handle Error Message =====
export const m3l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Алдааг хэзээ, хаана, ямар байдлаар харуулах вэ гэдгийг UX талаас нь ойлгож, хүртээмжтэй (accessible) хэрэгжүүлнэ." },

  { type: "h", text: "Онол — Сайн алдааны мессежийн 4 шинж" },
  { type: "ol", items: [
    "**Тодорхой** — юу буруу болохыг хэлнэ (\"Алдаа гарлаа\" биш).",
    "**Ойрхон** — тухайн талбарын дэргэд, формын дээд талд биш.",
    "**Цаг тохирсон** — бичиж байхад биш, талбараас гарахад.",
    "**Заавартай** — яаж засахыг хэлнэ.",
  ] },
  { type: "code", lang: "text", code: `✗ Муу мессежүүд          ✓ Сайн мессежүүд
"Алдаа"                   "Имэйл буруу форматтай (жишээ: name@mail.com)"
"Invalid input"           "Нууц үг дор хаяж 6 тэмдэгттэй байх ёстой"
"Талбар буруу"            "Утасны дугаар 8 оронтой байна"
"Error 400"               "Энэ имэйл аль хэдийн бүртгэгдсэн байна"`, },

  { type: "h", text: "Хэзээ харуулах вэ? — touched ойлголт" },
  { type: "p", text: "Хэрэглэгч талбарт хараахан хүрээгүй байхад \"Нэр заавал\" гэж улаанаар харуулах нь **буруу** — тэр хараахан бичих гэж завдаагүй байна." },
  { type: "code", lang: "text", code: `Хэрэглэгчийн замнал:
1. Форм нээгдэв          → алдаа ХАРУУЛАХГҮЙ
2. Нэр талбарт орлоо     → алдаа ХАРУУЛАХГҮЙ
3. Хоосон орхиод гарлаа  → одоо АЛДАА ХАРУУЛНА (onBlur)
4. Засаж эхэллээ         → алдаа шууд АРИЛНА (onChange)`, },
  { type: "code", lang: "tsx", code: `const { register, formState: { errors, touchedFields } } = useForm({
  resolver: zodResolver(schema),
  mode: "onBlur",              // ← талбараас гарахад шалгана
  reValidateMode: "onChange",  // ← нэг алдсаны дараа бичих бүрт дахин шалгана
});`, },

  { type: "h", text: "Дахин ашиглагдах Field component" },
  { type: "code", lang: "tsx", code: `// components/Field.tsx
interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {children}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}`, },
  { type: "code", lang: "tsx", code: `// Ашиглах — код хамаагүй цэвэрхэн болно
<Field label="Имэйл" error={errors.email?.message}>
  <input
    {...register("email")}
    className={\`w-full rounded border p-2 \${
      errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
    }\`}
  />
</Field>`, },

  { type: "h", text: "Хүртээмж (accessibility)" },
  { type: "p", text: "Харааны бэрхшээлтэй хэрэглэгч screen reader ашигладаг. Улаан өнгө тэдэнд хүрэхгүй — ARIA атрибут хэрэгтэй." },
  { type: "code", lang: "tsx", code: `<input
  id="email"
  {...register("email")}
  aria-invalid={errors.email ? "true" : "false"}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && (
  <p id="email-error" role="alert" className="text-sm text-red-500">
    {errors.email.message}
  </p>
)}`, },
  { type: "ul", items: [
    "`aria-invalid` — талбар алдаатай гэдгийг мэдэгдэнэ.",
    "`aria-describedby` — алдааны текстийг талбартай холбоно.",
    "`role=\"alert\"` — screen reader шинэ алдааг шууд уншина.",
    "Өнгө **дангаараа** бүү найд — icon эсвэл текст нэм (өнгө ялгагдахгүй хүн бий).",
  ] },

  { type: "h", text: "Серверийн алдааг харуулах" },
  { type: "code", lang: "tsx", code: `const { setError, formState: { errors } } = useForm(...);

async function onSubmit(data: FormData) {
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { error } = await res.json();

      // Тодорхой талбарт алдаа тавих
      if (error === "EMAIL_TAKEN") {
        setError("email", { message: "Энэ имэйл бүртгэлтэй байна" });
        return;
      }

      // Ерөнхий алдаа — тусгай "root" талбарт
      setError("root", { message: "Серверийн алдаа. Дахин оролдоно уу." });
    }
  } catch {
    setError("root", { message: "Сүлжээний алдаа. Холболтоо шалгана уу." });
  }
}

// Ерөнхий алдааг формын дээд талд харуулна
{errors.root && (
  <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
    {errors.root.message}
  </div>
)}`, },

  { type: "h", text: "Амжилтын хариу" },
  { type: "code", lang: "tsx", code: `const { formState: { isSubmitSuccessful } } = useForm(...);

{isSubmitSuccessful && (
  <div className="rounded border border-green-300 bg-green-50 p-3 text-green-700">
    ✓ Амжилттай бүртгэгдлээ!
  </div>
)}

// Эсвэл toast
import { toast } from "sonner";
toast.success("Амжилттай бүртгэгдлээ");`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Алдааны мессеж харуулах", code: `function App() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  // Энгийн validation (Zod-гүйгээр зарчмыг харуулж байна)
  const error =
    !touched ? "" :
    !email.trim() ? "Имэйл заавал" :
    !email.includes("@") ? "Имэйл буруу форматтай (жишээ: name@mail.com)" :
    "";

  return (
    <div>
      <label style={{display:"block",fontSize:14,marginBottom:4}}>Имэйл</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="name@mail.com"
        style={{
          width:"100%", padding:8, borderRadius:6,
          border: error ? "1px solid #ef4444" : "1px solid #ccc",
          background: error ? "#fef2f2" : "white",
        }}
      />
      {error && (
        <p role="alert" style={{color:"#ef4444",fontSize:13,marginTop:4}}>
          ⚠ {error}
        </p>
      )}
      {!error && touched && email && (
        <p style={{color:"#16a34a",fontSize:13,marginTop:4}}>✓ Зөв</p>
      )}
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "errors.email.message дээр алдаа өгөх", text: "`errors.email` байхгүй үед `.message`-д хандвал унана. `errors.email?.message` эсвэл `errors.email && ...` гэж хамгаал." },
  { type: "callout", variant: "warn", title: "Формыг нээнгүүт бүх алдааг харуулах", text: "Хэрэглэгч юу ч хийгээгүй байхад улаан болгох нь дарамттай. `mode: \"onBlur\"` ашигла." },
  { type: "callout", variant: "warn", title: "Зөвхөн өнгөөр ялгах", text: "Өнгө ялгадаггүй хүн (color blind) байдаг. Icon (⚠) эсвэл текст заавал нэм." },
  { type: "callout", variant: "error", title: "Алдааг зөвхөн дээд талд харуулах", text: "10 талбартай формд \"Алдаа гарлаа\" гэж дээр бичвэл хаана нь буруу болохыг олохгүй. Талбар бүрийн дэргэд харуул." },
  { type: "callout", variant: "warn", title: "Илгээж байхад товч дахин дарагдах", text: "`disabled={isSubmitting}` нэм — эс бөгөөс хэрэглэгч 3 удаа дарж 3 хүсэлт явуулна." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын талбарт хамгийн богино уртын шалгалт (5 тэмдэгт) нэм.",
    "Дунд: Дахин ашиглагдах `Field` component бичиж 3 талбарт хэрэглэ.",
    "Дунд: `aria-invalid`, `role=\"alert\"` нэмж хүртээмжтэй болго.",
    "Хүнд: Серверийн алдааг `setError(\"root\", ...)`-оор формын дээд талд харуул.",
    "Хүнд: Амжилттай илгээгдвэл ногоон мессеж 3 секунд харуулаад алга болдог болго.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Сайн алдааны мессежийн 4 шинж юу вэ?",
    "Алдааг хэзээ харуулах нь зөв вэ?",
    "`mode: \"onBlur\"` ба `reValidateMode: \"onChange\"` юу хийдэг вэ?",
    "Хүртээмжийн (a11y) 3 атрибут юу вэ?",
    "Яагаад зөвхөн өнгөөр ялгаж болохгүй вэ?",
    "Серверийн ерөнхий алдааг хаана харуулах вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Алдааны мессежийг хаанаас авах вэ?", options: ["errors.field.message", "data.error", "console", "state"], answer: 0 },
    { q: "Буруу input-ыг яаж тодотгодог вэ?", options: ["Хүрээг улаан болгож + icon", "Устгаж", "Нуух", "Дуугаар"], answer: 0 },
    { q: "Мессежийг хэзээ харуулах вэ?", options: ["Үргэлж", "Талбараас гарсны дараа (onBlur)", "Хэзээ ч үгүй", "Load үед"], answer: 1 },
    { q: "Screen reader-т алдааг мэдэгдэх атрибут?", options: ["class", 'role="alert"', "id", "style"], answer: 1 },
    { q: "Серверийн ерөнхий алдааг хаана тавих вэ?", options: ['setError("root")', "alert()", "console.log", "хаана ч биш"], answer: 0 },
    { q: "Илгээж байхад товчийг яах вэ?", options: ["Хэвээр", "disabled={isSubmitting}", "нуух", "улаан болгох"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Тодорхой, ойрхон, цаг тохирсон, заавартай мессеж бич.",
    "`mode: \"onBlur\"` + `reValidateMode: \"onChange\"` — хамгийн тухтай.",
    "Дахин ашиглагдах `Field` component бичвэл код цэвэрхэн.",
    "`aria-invalid`, `aria-describedby`, `role=\"alert\"` — хүртээмж.",
    "Өнгө дангаараа хангалтгүй — icon/текст нэм.",
    "Серверийн алдааг `setError`-оор зөв талбарт тавь.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Framer Motion** — алхмуудын хооронд гөлгөр шилжилт нэмнэ." },
];

// ===== m3l3 — Framer Motion =====
export const m3l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Framer Motion-ийн үндсэн ойлголтуудыг эзэмшиж, multi-step формын шилжилтэд гөлгөр animation нэмж, гүйцэтгэлд болгоомжтой хандаж сурна." },

  { type: "h", text: "Онол — Яагаад animation хэрэгтэй вэ?" },
  { type: "p", text: "Animation бол чимэглэл биш — **мэдээлэл дамжуулдаг**:" },
  { type: "ul", items: [
    "**Орон зайн ойлголт** — шинэ зүйл хаанаас ирснийг харуулна.",
    "**Анхаарал татах** — чухал өөрчлөлтийг мэдэгдэнэ.",
    "**Тасалдлыг зөөлрүүлэх** — гэнэт солигдохоос илүү тархинд эвтэйхэн.",
    "**Чанарын мэдрэмж** — апп нягт нямбай хийгдсэн мэт санагдана.",
  ] },
  { type: "callout", variant: "warn", title: "Хэт их animation муу", text: "Бүх зүйл хөдөлж байвал анхаарал сарниж, апп удаан санагдана. Animation 200-400ms байвал зохимжтой. 1 секундээс урт бол хэрэглэгч залхана." },

  { type: "h", text: "Суулгах ба үндсэн ойлголт" },
  { type: "code", lang: "bash", code: `npm install framer-motion`, },
  { type: "code", lang: "tsx", code: `"use client";                     // ЗААВАЛ — интерактив
import { motion } from "framer-motion";

export default function Box() {
  return (
    <motion.div                    // энгийн div биш, motion.div
      initial={{ opacity: 0, y: 20 }}    // эхлэл: тунгалаг, 20px доор
      animate={{ opacity: 1, y: 0 }}     // төгсгөл: харагдана, байрандаа
      transition={{ duration: 0.3 }}     // 0.3 секундэд
    >
      <h2>Сайн уу!</h2>
    </motion.div>
  );
}`, },
  { type: "ul", items: [
    "`initial` — component үүсэх мөчид ямар байх вэ.",
    "`animate` — эцсийн байдал. React энэ хоёрын хооронд гөлгөр шилжинэ.",
    "`exit` — component устахад ямар байх вэ (AnimatePresence хэрэгтэй).",
    "`transition` — хурд, төрөл, саатал.",
  ] },

  { type: "h", text: "Түгээмэл animation-ууд" },
  { type: "code", lang: "tsx", code: `// Дээрээс доош гарч ирэх
initial={{ opacity: 0, y: -20 }}  animate={{ opacity: 1, y: 0 }}

// Баруунаас зүүн тийш гулсах
initial={{ opacity: 0, x: 50 }}   animate={{ opacity: 1, x: 0 }}

// Томрох
initial={{ scale: 0.8, opacity: 0 }}  animate={{ scale: 1, opacity: 1 }}

// Эргэх
initial={{ rotate: -180 }}  animate={{ rotate: 0 }}`, },

  { type: "h", text: "transition — хөдөлгөөний чанар" },
  { type: "code", lang: "tsx", code: `// 1) Хугацаанд суурилсан
transition={{ duration: 0.3, ease: "easeOut" }}
// ease: "linear" | "easeIn" | "easeOut" | "easeInOut"

// 2) Физикт суурилсан (илүү байгалийн)
transition={{ type: "spring", stiffness: 300, damping: 25 }}
//   stiffness ↑ = хурдан,  damping ↑ = бага найгана

// 3) Саатуулах (дараалуулж гаргах)
transition={{ duration: 0.3, delay: 0.1 }}`, },

  { type: "h", text: "AnimatePresence — устахад animation хийх" },
  { type: "p", text: "Component устахад React түүнийг **шууд** DOM-оос авдаг. `AnimatePresence` нь animation дуустал хүлээдэг." },
  { type: "code", lang: "tsx", code: `"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Toast() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>Харуулах</button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}      // ← устахад
            transition={{ duration: 0.2 }}
          >
            Мэдэгдэл!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`, },

  { type: "h", text: "Multi-step form-д хэрэглэх" },
  { type: "code", lang: "tsx", code: `"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);   // 1 = урагш, -1 = хойш

  function goNext() { setDirection(1); setStep(step + 1); }
  function goBack() { setDirection(-1); setStep(step - 1); }

  return (
    <div style={{ overflow: "hidden" }}>       {/* ← гадуур гарахыг нуух */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}                            {/* ← key солигдоход animation ажиллана */}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.25 }}
        >
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </motion.div>
      </AnimatePresence>

      <button onClick={goBack} disabled={step === 1}>Буцах</button>
      <button onClick={goNext} disabled={step === 3}>Дараах</button>
    </div>
  );
}`, },
  { type: "callout", variant: "tip", title: "mode=\"wait\" гэж юу вэ?", text: "Хуучин элемент бүрэн алга болсны ДАРАА шинийг оруулна. Үгүй бол хоёулаа зэрэг харагдаж эмх замбараагүй болно." },
  { type: "callout", variant: "error", title: "key заавал", text: "`AnimatePresence` доторх элементэд `key` байх ёстой. `key={step}` — алхам солигдоход React \"өөр элемент\" гэж үзэж exit/initial ажиллана." },

  { type: "h", text: "Hover ба tap" },
  { type: "code", lang: "tsx", code: `<motion.button
  whileHover={{ scale: 1.05 }}      // хулгана дээгүүр
  whileTap={{ scale: 0.95 }}        // дарах мөчид
  transition={{ duration: 0.15 }}
>
  Дарах
</motion.button>`, },

  { type: "h", text: "Дараалуулж гаргах (stagger)" },
  { type: "code", lang: "tsx", code: `<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.08 } },   // 0.08с зайтай
  }}
>
  {items.map((item) => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      {item.text}
    </motion.li>
  ))}
</motion.ul>`, },

  { type: "h", text: "Хүртээмж — хөдөлгөөн багасгах" },
  { type: "p", text: "Зарим хүн хөдөлгөөнөөс толгой эргэдэг (vestibular disorder). Үйлдлийн системд \"Reduce motion\" тохиргоо байдаг — үүнийг хүндэтгэ." },
  { type: "code", lang: "tsx", code: `import { useReducedMotion } from "framer-motion";

function Card() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.3 }}
    >
      Агуулга
    </motion.div>
  );
}`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Алхам солих animation (CSS-ээр)", code: `function App() {
  const [step, setStep] = useState(1);

  // Playground-д framer-motion байхгүй тул CSS transition-оор
  // ижил зарчмыг харуулж байна
  return (
    <div>
      <p style={{fontSize:13,color:"#888"}}>Алхам {step} / 3</p>

      <div
        key={step}
        style={{
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 8,
          animation: "slideIn 0.3s ease-out",
        }}
      >
        {step === 1 && <div><b>Алхам 1</b><p>Нэр, имэйл</p></div>}
        {step === 2 && <div><b>Алхам 2</b><p>Нууц үг</p></div>}
        {step === 3 && <div><b>Алхам 3</b><p>Баталгаажуулах</p></div>}
      </div>

      <style>{"@keyframes slideIn { from { opacity:0; transform:translateX(40px);} to {opacity:1; transform:translateX(0);} }"}</style>

      <div style={{marginTop:12,display:"flex",gap:8}}>
        <button onClick={() => setStep(step - 1)} disabled={step === 1}>Буцах</button>
        <button onClick={() => setStep(step + 1)} disabled={step === 3}>Дараах</button>
      </div>
    </div>
  );
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: '"use client" мартах', text: "Framer Motion интерактив тул component-д `\"use client\"` заавал. Үгүй бол \"createContext only works in Client Components\" гэсэн алдаа гарна." },
  { type: "callout", variant: "error", title: "exit animation ажиллахгүй", text: "`AnimatePresence`-ээр ороогүй, эсвэл доторх элементэд `key` байхгүй. Хоёуланг нь шалга." },
  { type: "callout", variant: "warn", title: "Layout үсэрч байна", text: "Animation хийж буй элементийн эцэгт `overflow: hidden` нэм. Мөн өндөр өөрчлөгдөж байвал `layout` prop ашигла." },
  { type: "callout", variant: "warn", title: "Animation удаан/сааталтай", text: "`width`, `height`, `top`, `left` зэргийг animate хийвэл хөтөч бүх layout-ыг дахин тооцоолно. `transform` (x, y, scale, rotate) болон `opacity` ашигла — GPU дээр ажиллана." },
  { type: "callout", variant: "error", title: "Bundle хэт томорсон", text: "Framer Motion ~50KB. Зөвхөн хэрэгтэй хуудсанд `dynamic import`-оор ачаал, эсвэл энгийн зүйлд CSS transition ашигла." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын талбарын animation-ыг дээрээс доош (`translateY`) болго.",
    "Дунд: `duration`-ыг 0.1 ба 1.0 болгож туршиж, аль нь тухтай болохыг бич.",
    "Дунд: Буцах товч дарахад эсрэг чиглэлд шилжүүлдэг болго (`direction`).",
    "Хүнд: Жинхэнэ төсөлдөө framer-motion суулгаж `AnimatePresence`-тэй multi-step form хий.",
    "Хүнд: `useReducedMotion` нэмж хүртээмжтэй болго.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Animation яагаад хэрэгтэй вэ (зөвхөн гоо сайхны төлөө юу)?",
    "`initial`, `animate`, `exit` тус бүр юу заадаг вэ?",
    "`AnimatePresence` юунд хэрэгтэй вэ?",
    "`mode=\"wait\"` юу хийдэг вэ?",
    "Яагаад `key` заавал хэрэгтэй вэ?",
    "Ямар CSS шинжийг animate хийвэл хурдан вэ, ямрыг нь болгоомжлох вэ?",
    "`useReducedMotion` юунд хэрэгтэй вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Framer Motion юунд зориулагдсан вэ?", options: ["Animation", "Мэдээллийн сан", "Auth", "Routing"], answer: 0 },
    { q: "Animation-тай div?", options: ["<motion.div>", "<div motion>", "<animate>", "<div />"], answer: 0 },
    { q: "Эхний байдлыг заах prop?", options: ["animate", "initial", "start", "from"], answer: 1 },
    { q: "Устахад animation хийхэд юу хэрэгтэй вэ?", options: ["AnimatePresence + key", "зөвхөн exit", "useState", "CSS"], answer: 0 },
    { q: "Аль нь GPU дээр хурдан ажиллах вэ?", options: ["width, height", "transform, opacity", "top, left", "margin"], answer: 1 },
    { q: "Animation хэдэн секунд байх нь зохимжтой вэ?", options: ["2-3 сек", "0.2-0.4 сек", "5 сек", "хамаагүй"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Animation бол мэдээлэл дамжуулах хэрэгсэл — 200-400ms байвал зохимжтой.",
    "`motion.div` + `initial`/`animate`/`transition`.",
    "Устах animation-д `AnimatePresence` + `key` заавал.",
    "`mode=\"wait\"` — хуучин гарсны дараа шинэ орно.",
    "`transform`/`opacity` хурдан, `width`/`height` удаан.",
    "`useReducedMotion`-оор хүртээмжийг хангана.",
    "🎉 3-р модуль дууслаа!",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**4-р модуль: Movie Web Application.** Routing, API, SSR/CSR — бодит өгөгдөлтэй ажиллаж эхэлнэ." },
];
