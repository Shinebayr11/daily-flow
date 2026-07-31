import type { ContentBlock } from "./types";

// ========== 7-р модуль: AI Image Model ==========

// m7l1 — What is AI
export const m7l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "AI, Machine Learning, Generative AI гэж юу вэ гэдгийг энгийнээр ойлгоно." },
  { type: "h", text: "Онол" },
  { type: "ul", items: [
    "**AI (Хиймэл оюун)** — хүний оюуны үйлдлийг дуурайдаг программ.",
    "**Machine Learning** — дүрмийг гараар бичихийн оронд **өгөгдлөөс сурдаг** арга.",
    "**Deep Learning** — олон давхарга бүхий нейрон сүлжээ ашигладаг ML-ийн салбар.",
    "**Generative AI** — шинэ агуулга (текст, зураг, код) **үүсгэдэг** AI.",
  ] },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Хүүхдэд \"муур\" гэж юу болохыг дүрмээр тайлбарлахгүй — олон муурны зураг үзүүлнэ. ML яг ингэж сурдаг: олон жишээ хараад загвар (pattern) олж авдаг." },
  { type: "h", text: "Хаана ашиглагддаг вэ?" },
  { type: "ul", items: [
    "Зураг таних (нүүр, объект)",
    "Текст боловсруулах (орчуулга, дүгнэлт)",
    "Санал болгох систем (YouTube, Spotify)",
    "Агуулга үүсгэх (ChatGPT, Midjourney)",
  ] },
  { type: "h", text: "Түгээмэл ойлгомжгүй зүйл" },
  { type: "callout", variant: "warn", title: "AI үргэлж зөв гэж бодох", text: "AI загвар \"итгэлтэйгээр буруу\" хариу өгч болно (hallucination). Чухал мэдээллийг заавал шалга." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: AI, ML, Generative AI гурвын ялгааг бич.",
    "Дунд: Өдөр тутам ашигладаг 3 AI үйлчилгээг нэрлэ.",
    "Хүнд: Яагаад ML нь дүрэм бичихээс давуу талтай вэ — жишээгээр тайлбарла.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "ML юунаас суралцдаг вэ?", options: ["Гараар бичсэн дүрэм", "Өгөгдөл", "CSS", "Интернэт хурд"], answer: 1 },
    { q: "Шинэ агуулга үүсгэдэг AI?", options: ["Generative AI", "Classifier", "Database", "Compiler"], answer: 0 },
    { q: "Hallucination гэж юу вэ?", options: ["Хурдан хариу", "Итгэлтэйгээр буруу хариулах", "Алдааны код", "Зураг"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["AI ⊃ ML ⊃ Deep Learning.", "Generative AI шинэ агуулга үүсгэнэ.", "AI буруу хариу өгч болно — шалгах хэрэгтэй."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**AI models** — загварын төрлүүдийг судална." },
];

// m7l2 — AI models
export const m7l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Text, Image, Multimodal загваруудын ялгааг ойлгож, зөв сонгоно." },
  { type: "h", text: "Онол — Model гэж юу вэ?" },
  { type: "p", text: "**AI model** нь их хэмжээний өгөгдөл дээр сургагдсан математик систем. Оролт (prompt) авч, гаралт (хариу) буцаана." },
  { type: "h", text: "Төрлүүд" },
  { type: "ul", items: [
    "**Text model** (GPT, Gemini, Claude) — текст ойлгож, текст үүсгэнэ.",
    "**Image model** (Stable Diffusion, DALL·E) — текстээс зураг үүсгэнэ.",
    "**Multimodal** (Gemini, GPT-4o) — текст + зураг хамт ойлгоно.",
    "**Embedding model** — текстийг тоон вектор болгож, төстэй байдлыг хэмжинэ.",
  ] },
  { type: "h", text: "Манай апп-д ямар загвар хэрэгтэй вэ?" },
  { type: "code", lang: "text", code: `Tab 1: Image Analysis      → Multimodal (зураг оруулж тайлбарлуулна)
Tab 2: Ingredient Recognition → Multimodal (хоолны зурагнаас орц)
Tab 3: Image Creator       → Image model (текстээс зураг үүсгэнэ)` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Text model-д зураг илгээх", text: "Зөвхөн текст загварт зураг өгвөл ажиллахгүй. Multimodal загвар сонго." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: 3 төрлийн загварыг нэрлэ.",
    "Дунд: Аль tab-д ямар загвар хэрэгтэйг тааруул.",
    "Хүнд: Multimodal загварын давуу талыг тайлбарла.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Зураг + текст хамт ойлгодог нь?", options: ["Text model", "Multimodal", "Embedding", "Classifier"], answer: 1 },
    { q: "Текстээс зураг үүсгэдэг нь?", options: ["Image model", "Text model", "Database", "Router"], answer: 0 },
    { q: "Ingredient Recognition-д аль хэрэгтэй вэ?", options: ["Text model", "Multimodal", "Embedding", "Аль нь ч биш"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Text / Image / Multimodal / Embedding гэсэн үндсэн төрлүүд.", "Даалгавартаа тохирох загвараа сонгоно.", "Зураг ойлгуулах бол multimodal."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**How to use it** — prompt бичих ур чадвар." },
];

// m7l3 — How to use it
export const m7l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Prompt гэж юу вэ, сайн prompt хэрхэн бичихийг сурна." },
  { type: "h", text: "Онол — Prompt" },
  { type: "p", text: "**Prompt** нь AI-д өгөх заавар. Чанартай prompt = чанартай хариу. Тодорхой, дэлгэрэнгүй, форматаа зааж өгвөл илүү сайн үр дүн гарна." },
  { type: "h", text: "Сайн prompt-ийн 4 бүрэлдэхүүн" },
  { type: "ol", items: [
    "**Үүрэг** — \"Чи туршлагатай тогооч байна.\"",
    "**Даалгавар** — \"Энэ зурган дээрх орцуудыг тодорхойл.\"",
    "**Формат** — \"Жагсаалт хэлбэрээр, орц бүрийн хажууд итгэлийн хувь.\"",
    "**Хязгаарлалт** — \"Зөвхөн харагдаж буй орцыг бич, таамаглахгүй.\"",
  ] },
  { type: "code", lang: "text", code: `❌ Муу prompt:
"Энэ зураг юу вэ?"

✓ Сайн prompt:
"Чи хоол судлаач. Энэ зурган дээрх хоолны боломжит орцуудыг тодорхойл.
Хариултаа Монгол хэлээр, дугаарласан жагсаалтаар бич.
Орц бүрийн хажууд итгэлтэй байдлыг (өндөр/дунд/бага) заа.
Тодорхой харагдаж буй зүйлийг л бич, таамаглал бүү хий."` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "warn", title: "Хэт ерөнхий prompt", text: "\"Сайн бич\" гэхээс илүү \"3 өгүүлбэрт, албан бус өнгө аястайгаар бич\" гэвэл үр дүн тогтвортой болно." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Муу prompt-ыг сайжруулж бич.",
    "Дунд: Image Analysis tab-д зориулсан prompt зохио.",
    "Хүнд: Ижил даалгаварт 2 өөр prompt бичиж үр дүнг харьцуул.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Prompt гэж юу вэ?", options: ["AI-д өгөх заавар", "Алдааны код", "DB хүснэгт", "CSS класс"], answer: 0 },
    { q: "Сайн prompt-д юу байх ёстой вэ?", options: ["Зөвхөн асуулт", "Үүрэг, даалгавар, формат, хязгаарлалт", "Урт үг", "Emoji"], answer: 1 },
    { q: "Тогтвортой үр дүнд юу тусалдаг вэ?", options: ["Ерөнхий бичих", "Форматаа зааж өгөх", "Богино бичих", "Англиар бичих"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Prompt = AI-д өгөх заавар.", "Үүрэг + даалгавар + формат + хязгаарлалт.", "Тодорхой байх тусам үр дүн сайн."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Hugging Face** — нээлттэй AI загваруудын сан." },
];

// m7l4 — Using Huggingface models
export const m7l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Hugging Face-ээс загвар сонгож, Inference API-аар зураг үүсгэнэ." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Hugging Face** нь нээлттэй AI загваруудын хамгийн том сан. Мянга мянган загварыг үнэгүй туршиж, API-аар дуудаж болно." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "ol", items: [
    "huggingface.co дээр бүртгүүл.",
    "Settings → Access Tokens → New token (Read эрхтэй).",
    "Токеноо `.env.local`-д хадгал.",
  ] },
  { type: "code", lang: "bash", code: `# .env.local — NEXT_PUBLIC_ БҮҮ хэрэглэ!
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxx` },
  { type: "h", text: "Кодын жишээ — Server Route" },
  { type: "code", lang: "ts", code: `// app/api/generate-image/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt заавал" }, { status: 400 });
    }

    const res = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method: "POST",
        headers: {
          Authorization: \`Bearer \${process.env.HUGGINGFACE_API_KEY}\`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      },
    );

    if (res.status === 401) {
      return NextResponse.json({ error: "API key буруу" }, { status: 401 });
    }
    if (res.status === 429) {
      return NextResponse.json(
        { error: "Хэт олон хүсэлт. Түр хүлээнэ үү." },
        { status: 429 },
      );
    }
    if (res.status === 503) {
      return NextResponse.json(
        { error: "Загвар ачаалагдаж байна, 20 секундын дараа дахин оролдоно уу." },
        { status: 503 },
      );
    }

    // Хариу нь зургийн binary — base64 болгож буцаана
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return NextResponse.json({ image: \`data:image/png;base64,\${base64}\` });
  } catch {
    return NextResponse.json({ error: "Зураг үүсгэж чадсангүй" }, { status: 500 });
  }
}` },
  { type: "h", text: "Түгээмэл алдааны кодууд" },
  { type: "ul", items: [
    "**401** — API key буруу/байхгүй.",
    "**402** — Төлбөрийн хязгаар хэтэрсэн.",
    "**429** — Хэт олон хүсэлт (rate limit). Түр хүлээнэ.",
    "**503** — Загвар ачаалагдаж байна (эхний удаа түгээмэл).",
  ] },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Hugging Face токен авч `.env.local`-д тавь.",
    "Дунд: API Route бичиж Postman-аар туршиж үз.",
    "Хүнд: 429, 503 алдаанд ойлгомжтой мессеж харуул.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "429 юу гэсэн үг вэ?", options: ["Key буруу", "Хэт олон хүсэлт", "Олдсонгүй", "Серверийн алдаа"], answer: 1 },
    { q: "API key-г хаана ашиглах вэ?", options: ["Client component", "Server route", "localStorage", "URL"], answer: 1 },
    { q: "503 ямар утгатай вэ?", options: ["Загвар ачаалагдаж байна", "Key дууссан", "Prompt буруу", "Интернэт байхгүй"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Hugging Face = нээлттэй загваруудын сан.", "API key-г заавал Server Route-д ашиглана.", "401/429/503 алдааг тусад нь боловсруул."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Gemini API** — Google-ийн multimodal загварыг холбоно." },
];

// m7l5 — Gemini API
export const m7l5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Gemini API-аар зураг шинжлэх, орц таних боломжийг апп-даа нэмнэ." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "ol", items: [
    "aistudio.google.com дээр ор.",
    "\"Get API key\" дарж түлхүүр үүсгэ.",
    "`.env.local`-д хадгал (NEXT_PUBLIC_ БҮҮ хэрэглэ).",
  ] },
  { type: "code", lang: "bash", code: `npm install @google/generative-ai` },
  { type: "code", lang: "bash", code: `# .env.local
GEMINI_API_KEY=AIzaSy...` },
  { type: "h", text: "Кодын жишээ — зураг шинжлэх" },
  { type: "code", lang: "ts", code: `// app/api/analyze-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mode } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "Зураг заавал" }, { status: 400 });
    }

    // Tab-аас хамаарч prompt өөрчлөгдөнө
    const prompt =
      mode === "ingredients"
        ? "Чи хоол судлаач. Энэ зурган дээрх хоолны боломжит орцуудыг Монгол хэлээр дугаарласан жагсаалтаар бич. Зөвхөн харагдаж буйг бич."
        : "Энэ зурган дээр юу байгааг Монгол хэлээр дэлгэрэнгүй тайлбарла.";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64.split(",")[1],   // "data:image/png;base64," хэсгийг хасна
          mimeType: "image/jpeg",
        },
      },
    ]);

    return NextResponse.json({ text: result.response.text() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Шинжилж чадсангүй" }, { status: 500 });
  }
}` },
  { type: "h", text: "Frontend — зураг илгээх" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState } from "react";

export default function ImageAnalysis() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);  // base64
    reader.readAsDataURL(file);
  }

  async function analyze() {
    setLoading(true); setError(""); setResult("");
    try {
      const res = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: image, mode: "analyze" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFile} />
      {image && <img src={image} alt="preview" width={240} />}
      <button onClick={analyze} disabled={!image || loading}>
        {loading ? "Шинжилж байна..." : "Шинжлэх"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <p>{result}</p>}
    </div>
  );
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "API key ил гарах", text: "`NEXT_PUBLIC_GEMINI_API_KEY` гэвэл хөтөчид ил гарч, хэн ч хулгайлж болно. Заавал Server Route ашигла." },
  { type: "callout", variant: "error", title: "Invalid image data", text: "base64-ийн `data:image/png;base64,` угтварыг хасаагүй. `.split(\",\")[1]` хий." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Gemini API key авч `.env.local`-д тавь.",
    "Дунд: Image Analysis tab-ыг ажиллуул.",
    "Хүнд: Ingredient Recognition tab-д тусдаа prompt өг.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "API key-г хаана хадгалах вэ?", options: [".env.local (NEXT_PUBLIC-гүй)", "Component дотор", "localStorage", "GitHub"], answer: 0 },
    { q: "Зургийг ямар хэлбэрээр илгээх вэ?", options: ["URL", "base64 (inlineData)", "FormData л", "Тексt"], answer: 1 },
    { q: "Key-г хамгаалах хамгийн зөв арга?", options: ["Server Route/Action", "Client component", "Нуух", "Хамаагүй"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Gemini = multimodal (текст + зураг) загвар.",
    "API key заавал Server Route дотор, `NEXT_PUBLIC_`-гүй.",
    "Loading/error төлөвийг заавал харуул. 7-р модуль дууслаа! 🎉",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**8-р модуль: Article Summarizer.** PostgreSQL, Prisma ORM-той танилцана." },
];

// ========== 8-р модуль: Article Summarizer & Quiz Generator ==========

// m8l1 — PostgreSQL (Neon database)
export const m8l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "SQL, relational database, PostgreSQL-ийн үндсийг ойлгож, Neon дээр DB үүсгэнэ." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**PostgreSQL** нь хамгийн түгээмэл нээлттэй SQL сан. Өгөгдлийг **хүснэгт** (table), **мөр** (row), **багана** (column) хэлбэрээр хатуу схемтэйгээр хадгална." },
  { type: "code", lang: "text", code: `articles хүснэгт
┌────┬──────────────┬─────────────────┬────────────┐
│ id │ title        │ content         │ userId     │  ← багана (column)
├────┼──────────────┼─────────────────┼────────────┤
│ 1  │ React гэж... │ React бол...    │ 5          │  ← мөр (row)
│ 2  │ SQL үндэс    │ SQL нь...       │ 5          │
└────┴──────────────┴─────────────────┴────────────┘
  ↑ Primary Key                          ↑ Foreign Key` },
  { type: "ul", items: [
    "**Primary Key (PK)** — мөр бүрийн давтагдашгүй дугаар (`id`).",
    "**Foreign Key (FK)** — өөр хүснэгтийн PK-г заана (`userId`).",
    "**Schema** — хүснэгтийн бүтэц, урьдчилан тодорхойлогдоно.",
  ] },
  { type: "h", text: "Neon дээр DB үүсгэх" },
  { type: "ol", items: [
    "neon.tech дээр бүртгүүл (үнэгүй).",
    "New Project → нэр өгч үүсгэ.",
    "Connection string-ээ хуул (`postgresql://...`).",
    "`.env`-д `DATABASE_URL` нэрээр хадгал.",
  ] },
  { type: "code", lang: "bash", code: `# .env
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require"` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "SSL connection required", text: "Neon-д `?sslmode=require` заавал байх ёстой. Connection string-ээ бүтнээр хуул." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: PK ба FK-ийн ялгааг бич.",
    "Дунд: Neon дээр үнэгүй DB үүсгэ.",
    "Хүнд: `DATABASE_URL`-ээ `.env`-д тавь.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Мөр бүрийн давтагдашгүй дугаар?", options: ["Foreign Key", "Primary Key", "Index", "Column"], answer: 1 },
    { q: "PostgreSQL ямар төрлийн сан вэ?", options: ["NoSQL", "SQL (relational)", "Cache", "File"], answer: 1 },
    { q: "Neon юу вэ?", options: ["Үүлэн PostgreSQL", "AI загвар", "CSS сан", "Хөтөч"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["PostgreSQL = хүснэгт, хатуу схемтэй SQL сан.", "PK = давтагдашгүй id, FK = өөр хүснэгт рүү заана.", "Neon = үнэгүй үүлэн PostgreSQL."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Prisma ORM** — SQL бичихгүйгээр DB-тэй ажиллана." },
];

// m8l2 — Prisma ORM
export const m8l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Prisma schema бичиж, migration хийж, Prisma Client-ээр CRUD хийнэ." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Prisma** нь TypeScript-д зориулсан ORM. Схемээ нэг файлд бичээд, бүрэн төрөлжүүлсэн (typed) client автоматаар үүсгэдэг — SQL гараар бичих шаардлагагүй." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "code", lang: "bash", code: `npm install prisma --save-dev
npm install @prisma/client
npx prisma init` },
  { type: "h", text: "Schema бичих" },
  { type: "code", lang: "text", code: `// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  articles  Article[]              // 1 хэрэглэгч → олон нийтлэл
  createdAt DateTime  @default(now())
}

model Article {
  id        String    @id @default(cuid())
  title     String
  content   String    @db.Text
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  summary   Summary?               // 1 нийтлэл → 1 дүгнэлт
  quiz      Quiz?
  createdAt DateTime  @default(now())
}

model Summary {
  id        String   @id @default(cuid())
  content   String   @db.Text
  keyPoints String[]                // гол санаанууд
  articleId String   @unique
  article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
}

model Quiz {
  id        String     @id @default(cuid())
  articleId String     @unique
  article   Article    @relation(fields: [articleId], references: [id], onDelete: Cascade)
  questions Question[]
}

model Question {
  id      String   @id @default(cuid())
  text    String
  options String[]
  answer  Int
  quizId  String
  quiz    Quiz     @relation(fields: [quizId], references: [id], onDelete: Cascade)
}` },
  { type: "h", text: "Migration ба Client" },
  { type: "code", lang: "bash", code: `# Схемийг DB рүү буулгах (хүснэгт үүснэ)
npx prisma migrate dev --name init

# Client-ээ шинэчлэх
npx prisma generate

# DB-г нүдээр харах
npx prisma studio` },
  { type: "h", text: "Prisma Client — CRUD" },
  { type: "code", lang: "ts", code: `// lib/prisma.ts — dev дээр олон холболт үүсгэхээс сэргийлнэ
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;` },
  { type: "code", lang: "ts", code: `// Үүсгэх
const article = await prisma.article.create({
  data: { title, content, userId },
});

// Олох (холбоотой өгөгдөлтэй хамт)
const articles = await prisma.article.findMany({
  where: { userId },
  include: { summary: true, quiz: { include: { questions: true } } },
  orderBy: { createdAt: "desc" },
});

// Нэгийг олох
const one = await prisma.article.findUnique({ where: { id } });

// Зөвхөн зарим талбар
const titles = await prisma.article.findMany({
  select: { id: true, title: true },
});

// Засах / Устгах
await prisma.article.update({ where: { id }, data: { title: "Шинэ" } });
await prisma.article.delete({ where: { id } });` },
  { type: "h", text: "include vs select" },
  { type: "ul", items: [
    "`include` — холбоотой хүснэгтийг НЭМЖ татна (бүх талбартай).",
    "`select` — зөвхөн заасан талбаруудыг татна (бусдыг хасна).",
    "Хоёуланг нэг түвшинд зэрэг ашиглаж болохгүй.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "@prisma/client did not initialize yet", text: "`npx prisma generate` ажиллуулаагүй. Схем өөрчлөх бүрт дахин ажиллуул." },
  { type: "callout", variant: "error", title: "Too many connections", text: "Dev дээр PrismaClient олон удаа үүссэн. Дээрх `lib/prisma.ts` загварыг ашигла." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `prisma init` хийж schema-гаа тохируул.",
    "Дунд: `User` ба `Article` model бичиж migrate хий.",
    "Хүнд: `include`-ээр summary болон quiz-ыг хамт тат.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Схемийг DB рүү буулгах команд?", options: ["prisma generate", "prisma migrate dev", "prisma studio", "prisma init"], answer: 1 },
    { q: "Холбоотой өгөгдөл татах?", options: ["include", "join", "with", "populate"], answer: 0 },
    { q: "DB-г нүдээр харах?", options: ["prisma studio", "prisma view", "prisma ui", "prisma show"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Prisma = TypeScript ORM, typed client автоматаар үүснэ.", "`migrate dev` схемийг буулгана, `generate` client шинэчилнэ.", "`include` холбоотойг татна, `select` талбар сонгоно."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Relation database** — хүснэгт хоорондын холбоог гүнзгий үзнэ." },
];

// m8l3 — Relation database
export const m8l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "One-to-one, one-to-many, many-to-many холбоог ойлгож Prisma-д бичнэ." },
  { type: "h", text: "Онол — 3 төрлийн холбоо" },
  { type: "ul", items: [
    "**One-to-One (1:1)** — нэг нийтлэл → нэг дүгнэлт.",
    "**One-to-Many (1:N)** — нэг хэрэглэгч → олон нийтлэл.",
    "**Many-to-Many (N:M)** — нэг нийтлэл → олон таг, нэг таг → олон нийтлэл.",
  ] },
  { type: "h", text: "One-to-Many" },
  { type: "code", lang: "text", code: `model User {
  id       String    @id @default(cuid())
  articles Article[]                      // олон тал — массив
}

model Article {
  id     String @id @default(cuid())
  userId String                           // FK
  user   User   @relation(fields: [userId], references: [id])
}` },
  { type: "h", text: "One-to-One" },
  { type: "code", lang: "text", code: `model Article {
  id      String   @id @default(cuid())
  summary Summary?                        // сонголттой (?)
}

model Summary {
  id        String  @id @default(cuid())
  articleId String  @unique               // @unique → 1:1 болгоно
  article   Article @relation(fields: [articleId], references: [id])
}` },
  { type: "h", text: "Many-to-Many" },
  { type: "code", lang: "text", code: `model Article {
  id   String @id @default(cuid())
  tags Tag[]                              // Prisma холбоос хүснэгтийг өөрөө үүсгэнэ
}

model Tag {
  id       String    @id @default(cuid())
  name     String    @unique
  articles Article[]
}` },
  { type: "h", text: "onDelete — устгахад юу болох вэ?" },
  { type: "ul", items: [
    "`Cascade` — эцэг устахад хүүхэд нь ч устана (нийтлэл уствал дүгнэлт устана).",
    "`SetNull` — FK нь null болно.",
    "`Restrict` — хүүхэдтэй байвал устгахыг зөвшөөрөхгүй.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "1:1 биш 1:N болчихсон", text: "FK талбарт `@unique` тавиагүй. `articleId String @unique` гэж заавал бич." },
  { type: "callout", variant: "error", title: "Foreign key constraint failed", text: "Байхгүй id рүү заасан, эсвэл хүүхэдтэй мөрийг устгах гэсэн. `onDelete: Cascade` авч үз." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: 3 төрлийн холбоог жишээгээр бич.",
    "Дунд: Quiz ба Question-ийн холбоог бич.",
    "Хүнд: Article ↔ Tag many-to-many нэмж migrate хий.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Нэг хэрэглэгч → олон нийтлэл?", options: ["1:1", "1:N", "N:M", "холбоогүй"], answer: 1 },
    { q: "1:1 болгоход FK-д юу нэмэх вэ?", options: ["@id", "@unique", "@default", "@relation"], answer: 1 },
    { q: "Эцэг устахад хүүхдийг устгах?", options: ["Cascade", "SetNull", "Restrict", "NoAction"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["1:1, 1:N, N:M гэсэн 3 үндсэн холбоо.", "1:1-д FK дээр `@unique`.", "`onDelete: Cascade` хамааралтай мөрийг цэвэрлэнэ."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Gemini API** — AI дүгнэлт, quiz үүсгэж DB-д хадгална." },
];

// m8l4 — Gemini API (summarizer)
export const m8l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Gemini-ээр нийтлэлээс дүгнэлт, гол санаа, quiz үүсгэж DB-д хадгална." },
  { type: "h", text: "Онол — JSON хэлбэрээр хариу авах" },
  { type: "p", text: "AI-аас чөлөөт текст авбал задлахад хэцүү. Prompt дотор **яг ямар JSON бүтэц** хэрэгтэйг заавал зааж өгвөл кодоор боловсруулахад амар." },
  { type: "h", text: "Кодын жишээ — API Route" },
  { type: "code", lang: "ts", code: `// app/api/summarize/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { title, content, userId } = await req.json();

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Гарчиг ба агуулга заавал" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // JSON бүтцийг ТОДОРХОЙ зааж өгнө
    const prompt = \`Дараах нийтлэлийг уншаад Монгол хэлээр боловсруул.
Зөвхөн JSON буцаа, өөр текст бүү нэм:

{
  "summary": "3-5 өгүүлбэрт дүгнэлт",
  "keyPoints": ["гол санаа 1", "гол санаа 2", "гол санаа 3"],
  "questions": [
    { "text": "асуулт", "options": ["A", "B", "C", "D"], "answer": 0 }
  ]
}

5 асуулт үүсгэ. answer нь зөв хариултын индекс (0-3).

Гарчиг: \${title}
Агуулга: \${content}\`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    // AI заримдаа \\\`\\\`\\\`json ... \\\`\\\`\\\` дотор бичдэг — цэвэрлэнэ
    const cleaned = raw.replace(/\\\`\\\`\\\`json|\\\`\\\`\\\`/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // DB-д нэг дор хадгална (nested create)
    const article = await prisma.article.create({
      data: {
        title,
        content,
        userId,
        summary: {
          create: { content: parsed.summary, keyPoints: parsed.keyPoints },
        },
        quiz: {
          create: {
            questions: { create: parsed.questions },
          },
        },
      },
      include: { summary: true, quiz: { include: { questions: true } } },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Дүгнэлт үүсгэж чадсангүй" }, { status: 500 });
  }
}` },
  { type: "h", text: "Markdown харуулах" },
  { type: "code", lang: "bash", code: `npm install react-markdown` },
  { type: "code", lang: "tsx", code: `"use client";
import ReactMarkdown from "react-markdown";

export default function SummaryView({ text }: { text: string }) {
  return (
    <div className="prose">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Unexpected token in JSON", text: "AI markdown кодын блок дотор JSON бичсэн. Дээрх `.replace()`-ээр цэвэрлээд `JSON.parse` хий." },
  { type: "callout", variant: "warn", title: "AI формат зөрчих", text: "Заримдаа заасан бүтцийг дагахгүй. `JSON.parse`-ыг try/catch дотор бич, алдвал дахин оролдох боломж өг." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: JSON бүтэц заасан prompt бич.",
    "Дунд: API Route-оор дүгнэлт үүсгэж туршиж үз.",
    "Хүнд: Үр дүнг DB-д nested create-ээр хадгал.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "AI-аас найдвартай бүтэц авахад?", options: ["Чөлөөт текст хүсэх", "JSON бүтцийг зааж өгөх", "Богино prompt", "Англиар бичих"], answer: 1 },
    { q: "Markdown харуулах сан?", options: ["react-markdown", "axios", "prisma", "zod"], answer: 0 },
    { q: "Холбоотой өгөгдлийг нэг дор үүсгэх?", options: ["nested create", "populate", "join", "merge"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Prompt дотор JSON бүтцийг тодорхой заа.",
    "Хариуг цэвэрлээд `JSON.parse` хийнэ (try/catch-тай).",
    "Prisma nested create-ээр холбоотой өгөгдлийг нэг дор хадгална. 8-р модуль дууслаа! 🎉",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**9-р модуль: Git, GitHub ба Team Project.** Багаар ажиллах ур чадвар." },
];

// ========== 9-р модуль: Team Project ==========

// m9l1 — Github Branch
export const m9l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Git-ийн үндсэн командууд, branch, Pull Request, merge conflict-ыг эзэмшинэ." },
  { type: "h", text: "Онол — Git ба GitHub" },
  { type: "ul", items: [
    "**Git** — кодын өөрчлөлтийг хөтөлдөг систем (компьютер дээр).",
    "**GitHub** — Git репозиторийг интернэтэд хадгалж, хуваалцдаг платформ.",
    "**Branch (салбар)** — үндсэн кодыг эвдэхгүйгээр тусад нь ажиллах хуулбар.",
  ] },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Branch = ном бичихдээ гол гар бичмэлээ хөндөхгүйгээр хуулбар дээр туршиж засах. Сайн болвол л гол руугаа нэгтгэнэ." },
  { type: "h", text: "Үндсэн командууд" },
  { type: "code", lang: "bash", code: `git init                    # шинэ repo эхлүүлэх
git status                  # ямар файл өөрчлөгдсөнийг харах
git add .                   # бүх өөрчлөлтийг бэлтгэх
git commit -m "Мессеж"      # хадгалах
git log --oneline           # түүхийг харах

git remote add origin <URL> # GitHub-тай холбох
git push -u origin main     # илгээх
git pull                    # татах
git clone <URL>             # хуулж авах` },
  { type: "h", text: "Branch-ийн ажлын урсгал" },
  { type: "code", lang: "bash", code: `# 1) Шинэ салбар үүсгэж шилжих
git switch -c feature/login       # (хуучин: git checkout -b)

# 2) Ажиллаад commit хийх
git add .
git commit -m "feat: нэвтрэх хуудас нэмэв"

# 3) GitHub руу илгээх
git push -u origin feature/login

# 4) GitHub дээр Pull Request үүсгэх → code review → merge

# 5) main руу буцаад шинэчлэх
git switch main
git pull` },
  { type: "h", text: "Merge conflict засах" },
  { type: "p", text: "Хоёр хүн нэг мөрийг өөрчилвөл Git өөрөө шийдэж чадахгүй — гараар засна." },
  { type: "code", lang: "text", code: `<<<<<<< HEAD
const title = "Миний апп";        ← чиний өөрчлөлт
=======
const title = "Бидний апп";       ← нөгөө хүнийх
>>>>>>> feature/login

// Аль нэгийг сонгож (эсвэл нийлүүлж), <<<< ==== >>>> мөрүүдийг УСТГА:
const title = "Бидний апп";` },
  { type: "code", lang: "bash", code: `# Заасны дараа
git add .
git commit -m "fix: merge conflict шийдэв"` },
  { type: "h", text: ".gitignore — нууцаа хамгаалах" },
  { type: "code", lang: "text", code: `node_modules/
.env
.env.local
.next/
dist/
.DS_Store` },
  { type: "callout", variant: "error", title: ".env-ээ push хийчихвэл", text: "Түлхүүрээ ТЭР ДАРУЙ солиод шинээр үүсгэ. Түүхээс устгасан ч хэн нэгэн аль хэдийн харсан байж болно." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Repo үүсгэж эхний commit хий.",
    "Дунд: `feature/xxx` салбар үүсгэж push хий.",
    "Хүнд: Санаатай conflict үүсгэж засаж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Шинэ салбар үүсгэж шилжих?", options: ["git branch", "git switch -c", "git merge", "git pull"], answer: 1 },
    { q: "Өөрчлөлт хадгалах?", options: ["git save", "git commit", "git push", "git add"], answer: 1 },
    { q: ".env-ийг яах ёстой вэ?", options: ["push хийх", ".gitignore-д нэмэх", "README-д бичих", "хуваалцах"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["`add → commit → push` үндсэн урсгал.", "Ажил бүрийг тусдаа branch дээр хий.", "`.env`-ийг заавал `.gitignore`-д нэм."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Stand Up** — багийн өдөр тутмын уулзалт, Agile-ийн үндэс." },
];

// m9l2 — Stand Up
export const m9l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Agile-ийн үндэс, stand-up уулзалт, багийн үүргүүдийг ойлгоно." },
  { type: "h", text: "Онол — Stand-up гэж юу вэ?" },
  { type: "p", text: "**Stand-up** нь өдөр бүр 10-15 минут явагддаг богино уулзалт. Хүн бүр 3 асуултад хариулна:" },
  { type: "ol", items: [
    "Өчигдөр юу хийсэн бэ?",
    "Өнөөдөр юу хийх вэ?",
    "Ямар саад тотгор байна вэ?",
  ] },
  { type: "callout", variant: "tip", title: "Яагаад зогсоод хийдэг вэ?", text: "Зогсоод хийвэл богино байдаг. Уулзалт нь мэдээлэл солилцох зорилготой — асуудлыг шийдэх бол дараа нь тусад нь ярина." },
  { type: "h", text: "Agile-ийн үндэс" },
  { type: "ul", items: [
    "**Sprint** — 1-2 долоо хоногийн ажлын мөчлөг.",
    "**Backlog** — хийх ажлуудын жагсаалт.",
    "**Sprint planning** — энэ мөчлөгт юу хийхээ төлөвлөх.",
    "**Retrospective** — мөчлөгийн төгсгөлд юу сайн болсон, юуг сайжруулахыг ярих.",
  ] },
  { type: "h", text: "Багийн үүргүүд" },
  { type: "ul", items: [
    "**Frontend** — UI, component, хэрэглэгчийн харилцаа.",
    "**Backend** — API, DB, аюулгүй байдал.",
    "**Team lead** — ажлыг хуваарилах, PR review хийх.",
    "**QA** — туршиж алдаа олох.",
    "Жижиг багт нэг хүн олон үүрэг гүйцэтгэдэг.",
  ] },
  { type: "h", text: "Сайн stand-up-ийн зөвлөмж" },
  { type: "ul", items: [
    "Богино бай — хүн бүр 1-2 минут.",
    "Саад тотгороо нуухгүй хэл — тусламж эрт авбал цаг хэмнэнэ.",
    "Техникийн гүн маргааныг дараа нь тусад нь ярь.",
  ] },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Stand-up-ийн 3 асуултыг бич.",
    "Дунд: Өнөөдрийн ажлаа 3 асуултын хэлбэрээр бич.",
    "Хүнд: Багийнхаа үүргийг хуваарилж төлөвлөгөө гарга.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Stand-up хэр удаан үргэлжлэх вэ?", options: ["1 цаг", "10-15 минут", "Бүтэн өдөр", "Хамаагүй"], answer: 1 },
    { q: "Sprint гэж юу вэ?", options: ["Ажлын мөчлөг", "Алдаа", "Branch", "Тест"], answer: 0 },
    { q: "Мөчлөгийн төгсгөлийн уулзалт?", options: ["Planning", "Retrospective", "Stand-up", "Review"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Stand-up = өдөр тутмын 3 асуулттай богино уулзалт.", "Sprint, backlog, retrospective — Agile-ийн үндэс.", "Саад тотгороо эрт хэлэх нь чухал."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Github project** — ажлаа самбар дээр зохион байгуулна." },
];

// m9l3 — Github project
export const m9l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "GitHub Projects самбар, Issue, PR review ашиглан багаар ажиллаж, эцсийн төслөө deploy хийнэ." },
  { type: "h", text: "GitHub Projects — Kanban самбар" },
  { type: "code", lang: "text", code: `┌──────────┬─────────────┬──────────┬────────┐
│  Todo    │ In Progress │  Review  │  Done  │
├──────────┼─────────────┼──────────┼────────┤
│ Cart UI  │ Login API   │ Food CRUD│ Setup  │
│ Payment  │             │          │ Models │
└──────────┴─────────────┴──────────┴────────┘` },
  { type: "ol", items: [
    "Repo → Projects → New project → Board сонго.",
    "Todo, In Progress, Review, Done багана үүсгэ.",
    "Issue үүсгэж багана руу чирнэ.",
    "Issue бүрийг хүнд оноож (assign), тэмдэг (label) өг.",
  ] },
  { type: "h", text: "Issue сайн бичих" },
  { type: "code", lang: "text", code: `Гарчиг: [Feature] Сагсанд хоол нэмэх

Тайлбар:
Хэрэглэгч хоолны дэлгэрэнгүй хуудаснаас "Сагсанд нэмэх"
товч дарж хоолоо сагсанд хийх боломжтой байх.

Хүлээгдэж буй үр дүн:
- [ ] Товч дарахад сагсанд нэмэгдэнэ
- [ ] Сагсны icon дээр тоо шинэчлэгдэнэ
- [ ] Аль хэдийн байвал тоо нэмэгдэнэ
- [ ] Toast мессеж харагдана

Assignee: @bat
Label: frontend, feature` },
  { type: "h", text: "Pull Request ба Code Review" },
  { type: "ol", items: [
    "Feature branch дээр ажиллаж push хий.",
    "GitHub дээр PR үүсгэ (юу өөрчилснөө тайлбарла).",
    "Reviewer томил.",
    "Reviewer сэтгэгдэл бичнэ → засна → дахин push.",
    "Approve авсны дараа merge хий.",
    "Branch-ээ устга.",
  ] },
  { type: "callout", variant: "tip", title: "Main branch хамгаалах", text: "Settings → Branches → Add rule: \"Require pull request before merging\" + \"Require approvals\". Ингэснээр main руу шууд push хийхээс сэргийлнэ." },
  { type: "h", text: "Эцсийн deployment" },
  { type: "ul", items: [
    "**Frontend** → Vercel (GitHub repo холбоод автоматаар).",
    "**Backend** → Render (build + start command).",
    "**DB** → MongoDB Atlas эсвэл Neon.",
    "Env хувьсагчдыг платформ бүр дээр тусад нь нэмнэ.",
    "Backend-ийн CORS-д frontend домэйныг зөвшөөр.",
  ] },
  { type: "h", text: "README бичих" },
  { type: "code", lang: "text", code: `# Төслийн нэр

Товч танилцуулга.

## Технологи
Next.js, TypeScript, Express, MongoDB...

## Суулгах
\\\`\\\`\\\`bash
npm install
cp .env.example .env.local
npm run dev
\\\`\\\`\\\`

## Орчны хувьсагч
- MONGODB_URI
- JWT_SECRET

## Демо
https://your-app.vercel.app

## Багийн гишүүд
- Bat — Frontend
- Sara — Backend` },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: GitHub Project самбар үүсгэж 4 багана хий.",
    "Дунд: 3 Issue бичиж хүмүүст оноо.",
    "Хүнд: PR үүсгэж review хийлгээд merge хий, дараа нь deploy хий.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Main branch-ыг яаж хамгаалах вэ?", options: ["Branch protection rule", "Устгах", "Private болгох", "Хамгаалах боломжгүй"], answer: 0 },
    { q: "Кодоо нэгтгэхийн өмнө юу хийх вэ?", options: ["Шууд push", "PR + code review", "Устгах", "Хуулах"], answer: 1 },
    { q: "Frontend-ээ хаана deploy хийх вэ?", options: ["Vercel", "MongoDB", "Postman", "Figma"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "GitHub Projects-оор ажлаа Kanban самбар дээр хөтөлнө.",
    "PR + code review = чанартай код.",
    "Frontend → Vercel, Backend → Render, DB → Atlas/Neon.",
    "🎉 Баяр хүргэе! Та Full-Stack хөтөлбөрөө бүрэн дуусгалаа!",
  ] },
  { type: "h", text: "Дараа нь юу хийх вэ?" },
  { type: "p", text: "Өөрийн санаагаар төсөл хийж portfolio-доо нэм. GitHub-аа цэгцэл, README сайн бич, LinkedIn дээрээ төслүүдээ тавь. Дараа нь Docker, CI/CD, testing (Jest), WebSocket зэрэг сэдвүүд рүү орж болно." },
];
