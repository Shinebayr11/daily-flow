import type { ContentBlock } from "./types";

// ===== m6l1 — MVC Architecture =====
export const m6l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "MVC архитектурын зорилгыг ойлгож, backend кодоо Model / Controller / Router болгон зөв салгаж, том төсөлд ажиллах бүтэц барина." },

  { type: "h", text: "Онол — Асуудал: бүх зүйл нэг файлд" },
  { type: "code", lang: "ts", code: `// ✗ Бүх зүйл нэг route файлд — 300 мөр болоод удирдах боломжгүй
export async function POST(req: NextRequest) {
  // 1) Оролт шалгах
  const body = await req.json();
  if (!body.name || body.name.length < 2) return badRequest("...");
  if (!body.price || body.price < 0) return badRequest("...");

  // 2) Нэвтрэлт шалгах
  const token = req.headers.get("authorization")?.split(" ")[1];
  const user = jwt.verify(token, SECRET);
  if (user.role !== "admin") return forbidden();

  // 3) DB холбогдох
  await mongoose.connect(process.env.MONGODB_URI);

  // 4) Бизнес логик
  const exists = await Food.findOne({ name: body.name });
  if (exists) return conflict("Аль хэдийн байна");
  const discounted = body.price * (1 - body.discount / 100);

  // 5) Хадгалах
  const food = await Food.create({ ...body, finalPrice: discounted });

  // 6) Хариу
  return NextResponse.json(food, { status: 201 });
}`, },
  { type: "p", text: "Асуудал: **6 өөр хариуцлага нэг функцэд**. Туршихад хэцүү, дахин ашиглах боломжгүй, хоёр хүн зэрэг ажиллахад мөргөлдөнө." },

  { type: "h", text: "MVC — хариуцлагыг салгах" },
  { type: "code", lang: "text", code: `┌──────────┐   1. хүсэлт   ┌────────┐  2. чиглүүлнэ  ┌────────────┐
│  Client  │ ────────────→ │ Router │ ─────────────→ │ Controller │
└──────────┘               └────────┘                └─────┬──────┘
     ↑                                                     │ 3. өгөгдөл асууна
     │                                                     ↓
     │                                              ┌────────────┐
     │                                              │   Model    │
     │                                              └─────┬──────┘
     │                                                    │ 4. DB
     │              5. хариу                              ↓
     └──────────────────────────────────────────  ┌────────────┐
                                                  │  Database  │
                                                  └────────────┘`, },
  { type: "ul", items: [
    "**Model** — өгөгдлийн бүтэц, DB-тэй ажиллах. \"Хоол ямар талбартай вэ?\"",
    "**Controller** — бизнес логик. \"Хоол нэмэхэд юу болох ёстой вэ?\"",
    "**Router** — хаяг ба controller-ыг холбоно. \"Аль хаяг аль функц рүү?\"",
    "**View** — харагдах хэсэг (Next.js-д React component).",
  ] },
  { type: "callout", variant: "tip", title: "Гол зарчим — Separation of Concerns", text: "Файл бүр НЭГ л зүйлийг хариуцна. Ингэснээр: алдаа хаана байгааг хурдан олно, нэг хэсгийг өөрчлөхөд бусад нь эвдрэхгүй, тус тусад нь тест бичиж болно." },

  { type: "h", text: "Folder structure" },
  { type: "code", lang: "text", code: `src/
├── models/
│   ├── Food.ts              өгөгдлийн бүтэц
│   ├── Category.ts
│   └── Order.ts
├── controllers/
│   ├── food.controller.ts   бизнес логик
│   └── order.controller.ts
├── services/                 (нэмэлт давхарга — том төсөлд)
│   └── payment.service.ts
├── lib/
│   ├── mongodb.ts           DB холболт
│   └── validations.ts       Zod схемүүд
├── middleware/
│   └── auth.ts              нэвтрэлт шалгах
└── app/api/
    └── foods/route.ts       Router (Next.js)`, },

  { type: "h", text: "Model — өгөгдлийн бүтэц" },
  { type: "code", lang: "ts", code: `// models/Food.ts — ЗӨВХӨН бүтэц, логик БАЙХГҮЙ
import mongoose, { Schema, InferSchemaType } from "mongoose";

const foodSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type FoodDoc = InferSchemaType<typeof foodSchema>;

// HMR үед дахин зарлагдахаас сэргийлнэ
export const Food = mongoose.models.Food ?? mongoose.model("Food", foodSchema);`, },

  { type: "h", text: "Controller — бизнес логик" },
  { type: "code", lang: "ts", code: `// controllers/food.controller.ts
import { Food } from "@/models/Food";
import { connectToDatabase } from "@/lib/mongodb";

export async function listFoods(categoryId?: string) {
  await connectToDatabase();

  const filter = categoryId ? { categoryId, isAvailable: true } : { isAvailable: true };
  return Food.find(filter).sort({ createdAt: -1 }).lean();
}

export async function createFood(data: {
  name: string;
  price: number;
  categoryId: string;
  discount?: number;
}) {
  await connectToDatabase();

  // Бизнес дүрэм 1 — давхардуулахгүй
  const exists = await Food.findOne({ name: data.name });
  if (exists) {
    throw new AppError("Ийм нэртэй хоол аль хэдийн байна", 409, "FOOD_EXISTS");
  }

  // Бизнес дүрэм 2 — хямдралыг тооцоолно
  const finalPrice = data.discount
    ? data.price * (1 - data.discount / 100)
    : data.price;

  return Food.create({ ...data, finalPrice });
}`, },
  { type: "callout", variant: "tip", title: "Controller-д HTTP байхгүй", text: "Controller нь `req`, `res`, `NextResponse` мэдэхгүй байх нь хамгийн зөв. Ингэснээр Express, Next.js, тэр бүү хэл CLI-аас ч дуудаж болно. Алдааг `throw` хийж, router-т барина." },

  { type: "h", text: "Router — холбогч" },
  { type: "code", lang: "ts", code: `// app/api/foods/route.ts — НИМГЭН байх ёстой
import { NextRequest, NextResponse } from "next/server";
import { listFoods, createFood } from "@/controllers/food.controller";
import { foodSchema } from "@/lib/validations";
import { badRequest, serverError } from "@/lib/api-errors";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const categoryId = req.nextUrl.searchParams.get("category") ?? undefined;
    const foods = await listFoods(categoryId);
    return NextResponse.json(foods);
  } catch (err) {
    console.error("GET /api/foods", err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  try {
    const parsed = foodSchema.safeParse(await req.json());
    if (!parsed.success) return badRequest("Буруу өгөгдөл", parsed.error.flatten());

    const food = await createFood(parsed.data);
    return NextResponse.json(food, { status: 201 });
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    console.error("POST /api/foods", err);
    return serverError();
  }
}`, },

  { type: "h", text: "Урсгалыг эцсээс эцэс хүртэл" },
  { type: "code", lang: "text", code: `POST /api/foods { name: "Пицца", price: 25000 }
  ↓
[Router]      Zod-оор формат шалгана → буруу бол 400
  ↓
[Controller]  Давхардал шалгана → байвал throw AppError(409)
              Хямдрал тооцоолно
  ↓
[Model]       Food.create() → Mongoose схемээр дахин шалгана
  ↓
[Database]    MongoDB-д хадгална
  ↓
[Router]      201 + үүссэн объект буцаана`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Router-т бизнес логик бичих", text: "Route файл 100 мөрөөс хэтэрвэл логикоо controller руу гаргах цаг болжээ. Route бол зөвхөн: оролт шалгах → controller дуудах → хариу буцаах." },
  { type: "callout", variant: "error", title: "Model дотор бизнес логик", text: "Model бол зөвхөн бүтэц. \"Захиалга 50,000-аас их бол хүргэлт үнэгүй\" гэх мэт дүрмийг controller/service-д бич." },
  { type: "callout", variant: "warn", title: "Controller-т NextResponse ашиглах", text: "HTTP-ээс хамааралтай болж дахин ашиглах боломж алдагдана. `throw` хийж router-т барь." },
  { type: "callout", variant: "error", title: "Хэт эрт хуваах", text: "3 route-тай жижиг төсөлд MVC хэрэггүй — дэмий төвөгтэй болно. Файл томорч эхлэхэд салга." },
  { type: "callout", variant: "warn", title: "Controller хоорондоо дуудалцах", text: "A → B → C гэж гинжлэвэл circular import үүсч болно. Нийтлэг логикийг `services/`-д гарга." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: M, V, C гурвын хариуцлагыг өөрийн үгээр бич.",
    "Дунд: `models/`, `controllers/` хавтас үүсгэж нэг нөөцийг салга.",
    "Дунд: Route файлаа 30 мөрөөс богино болгож чадах эсэхээ шалга.",
    "Хүнд: Controller-оос `NextResponse` ашиглахаа болиод `throw` руу шилжүүл.",
    "Хүнд: 2 controller-т хэрэгтэй логикийг `services/` руу гарга.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "MVC-ийн 3 хэсэг тус бүр юу хариуцах вэ?",
    "Бүх зүйлийг нэг файлд бичвэл ямар 3 асуудал гарах вэ?",
    "Controller-д яагаад HTTP объект байх ёсгүй вэ?",
    "Router хэр урт байх ёстой вэ?",
    "Бизнес дүрмийг хаана бичих вэ?",
    "Хэзээ MVC хэрэггүй вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Model юу хариуцах вэ?", options: ["Өгөгдлийн бүтэц ба DB", "UI", "Routing", "CSS"], answer: 0 },
    { q: "Бизнес логик хаана вэ?", options: ["Model", "Controller", "Router", "View"], answer: 1 },
    { q: "Хаяг ба функцийг холбогч?", options: ["Model", "Controller", "Router", "Service"], answer: 2 },
    { q: "MVC-ийн гол зарчим?", options: ["Хурд", "Separation of Concerns", "Бага код", "Аюулгүй"], answer: 1 },
    { q: "Controller-д байх ЁСГҮЙ зүйл?", options: ["Бизнес дүрэм", "NextResponse", "Model дуудалт", "Тооцоолол"], answer: 1 },
    { q: "Route файл ямар байх нь дээр вэ?", options: ["Нимгэн", "Зузаан", "Хамаагүй", "Бүх логиктой"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "MVC = хариуцлагыг салгах. Файл бүр НЭГ зүйл хариуцна.",
    "Model = бүтэц · Controller = логик · Router = холбогч · View = UI.",
    "Router нимгэн: шалгах → дуудах → буцаах.",
    "Controller-д HTTP объект байхгүй, алдааг `throw` хийнэ.",
    "Жижиг төсөлд хэт эрт бүү хуваа.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**MongoDB** — өгөгдлийн санг үүсгэж холбоно." },
];

// ===== m6l2 — MongoDB =====
export const m6l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "MongoDB Atlas дээр кластер үүсгэж, аюулгүй холбож, үндсэн query бичиж, индекс ойлгож сурна." },

  { type: "h", text: "Онол — MongoDB гэж юу вэ?" },
  { type: "p", text: "**MongoDB** нь баримт (document) хэлбэрээр өгөгдөл хадгалдаг NoSQL сан. Мөр багана биш — JSON шиг объект хадгална." },
  { type: "code", lang: "text", code: `SQL (PostgreSQL)          MongoDB
Database                  Database
├── Table (foods)         ├── Collection (foods)
│   ├── Row               │   ├── Document
│   └── Column            │   └── Field
└── JOIN                  └── $lookup / populate

// MongoDB баримт — JSON шиг
{
  _id: ObjectId("65a1b2c3d4e5f6a7b8c9d0e1"),
  name: "Пицца",
  price: 25000,
  ingredients: ["бяслаг", "гурил", "улаан лооль"],   ← массив шууд
  nutrition: { calories: 800, protein: 30 }          ← үүрлэсэн объект
}`, },

  { type: "h", text: "Atlas дээр кластер үүсгэх" },
  { type: "ol", items: [
    "mongodb.com/cloud/atlas → бүртгүүл (үнэгүй M0 багц).",
    "**Build a Database** → **M0 FREE** сонго. Бүс: өөрт ойрхон.",
    "**Database Access** → Add New Database User → нэр, нууц үг үүсгэ (нууц үгээ хадгал!).",
    "**Network Access** → Add IP Address → dev-д `0.0.0.0/0` (бүх IP).",
    "**Database → Connect → Drivers** → холболтын мөрийг хуулж ав.",
  ] },
  { type: "code", lang: "bash", code: `# .env.local
MONGODB_URI=mongodb+srv://<хэрэглэгч>:<нууц үг>@cluster0.xxxxx.mongodb.net/foodapp?retryWrites=true&w=majority
#                          ↑ өөрийн         ↑ өөрийн              ↑ DB-ийн нэр
#                            нэрээр           нууц үгээр            (заавал бич!)`, },
  { type: "callout", variant: "error", title: "Хамгийн түгээмэл 2 алдаа", text: "(1) `<password>` гэсэн загварыг жинхэнэ нууц үгээр солиогүй. (2) Нууц үгэнд `@`, `#`, `/` байвал URL эвдэрнэ — `encodeURIComponent` хийх эсвэл эдгээргүй нууц үг сонго." },
  { type: "callout", variant: "warn", title: "Production-д 0.0.0.0/0 бүү үлдээ", text: "Дэлхийн хэн ч холбогдож болно гэсэн үг. Production-д hosting-ийн тодорхой IP-г л зөвшөөр." },

  { type: "h", text: "Холболтыг кэшлэх — Next.js-д ЗААВАЛ" },
  { type: "code", lang: "ts", code: `// lib/mongodb.ts
import mongoose, { type Mongoose } from "mongoose";

// Dev горимд hot-reload бүрт шинэ холболт үүсэхээс сэргийлнэ
let cached = (global as any).mongooseCache as
  | { conn: Mongoose | null; promise: Promise<Mongoose> | null }
  | undefined;

if (!cached) {
  cached = (global as any).mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached!.conn) return cached!.conn;          // аль хэдийн холбогдсон

  // Дуудагдах үед уншина — build үед байхгүй байж болно
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI тохируулаагүй байна");

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(uri, { bufferCommands: false });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}`, },
  { type: "callout", variant: "error", title: "Яагаад кэшлэх ёстой вэ?", text: "Кэшлэхгүй бол файл хадгалах бүрт шинэ холболт үүсч, хэдхэн минутын дараа Atlas-ийн холболтын хязгаарт хүрч \"Too many connections\" алдаа өгнө." },

  { type: "h", text: "Үндсэн query-үүд" },
  { type: "code", lang: "ts", code: `// ҮҮСГЭХ
await Food.create({ name: "Пицца", price: 25000 });
await Food.insertMany([{ ... }, { ... }]);

// УНШИХ
await Food.find();                                  // бүгд
await Food.find({ price: { $lt: 30000 } });         // 30000-аас бага
await Food.findById(id);
await Food.findOne({ name: "Пицца" });

// Хослуулах
await Food.find({ categoryId, isAvailable: true })
  .sort({ price: 1 })        // 1 = өсөхөөр, -1 = буурахаар
  .skip(20)                  // эхний 20-г алгасах (хуудаслалт)
  .limit(10)                 // 10-ыг авах
  .select("name price")      // зөвхөн эдгээр талбар
  .lean();                   // энгийн объект (хурдан)

// ЗАСАХ
await Food.findByIdAndUpdate(id, { price: 28000 }, { new: true });
await Food.updateMany({ categoryId }, { $set: { isAvailable: false } });
await Food.findByIdAndUpdate(id, { $inc: { views: 1 } });     // нэмэгдүүлэх

// УСТГАХ
await Food.findByIdAndDelete(id);
await Food.deleteMany({ isAvailable: false });`, },

  { type: "h", text: "Query операторууд" },
  { type: "code", lang: "ts", code: `// Харьцуулах
{ price: { $gt: 20000 } }          // их
{ price: { $gte: 20000 } }         // их буюу тэнцүү
{ price: { $lt: 50000 } }          // бага
{ price: { $lte: 50000 } }         // бага буюу тэнцүү
{ price: { $ne: 0 } }              // тэнцүү биш
{ status: { $in: ["new", "paid"] } }    // жагсаалтад байгаа
{ status: { $nin: ["cancelled"] } }     // жагсаалтад байхгүй

// Логик
{ $or: [{ price: { $lt: 10000 } }, { isPromo: true }] }
{ $and: [{ isAvailable: true }, { stock: { $gt: 0 } }] }

// Текст хайлт (регистр үл хамаарах)
{ name: { $regex: "пиц", $options: "i" } }

// Массив
{ ingredients: "бяслаг" }                    // агуулж байгаа
{ ingredients: { $all: ["бяслаг", "гурил"] } }   // бүгдийг агуулсан
{ ingredients: { $size: 3 } }                // яг 3 элементтэй

// Байгаа эсэх
{ discount: { $exists: true } }`, },

  { type: "h", text: "Индекс — хурдны түлхүүр" },
  { type: "p", text: "Индексгүй бол MongoDB бүх баримтыг нэг нэгээр шалгана (collection scan). 100,000 баримттай бол маш удаан." },
  { type: "code", lang: "ts", code: `// Схемд зарлах
const foodSchema = new Schema({
  name: { type: String, index: true },              // энгийн индекс
  email: { type: String, unique: true },            // давхардахгүй
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", index: true },
});

// Нийлмэл индекс — хамт хайдаг талбаруудад
foodSchema.index({ categoryId: 1, price: -1 });

// Текст индекс — бүтэн текст хайлт
foodSchema.index({ name: "text", description: "text" });`, },
  { type: "callout", variant: "tip", title: "Хаана индекс тавих вэ?", text: "`find()`-ийн шүүлтэнд, `sort()`-д байнга орж байгаа талбарт. Гэхдээ индекс бүр бичих үйлдлийг бага зэрэг удаашруулдаг тул хэрэгтэйг нь л тавь." },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "bad auth : authentication failed", text: "Хэрэглэгчийн нэр/нууц үг буруу, эсвэл `<password>` загварыг солиогүй. Atlas → Database Access → Edit Password." },
  { type: "callout", variant: "error", title: "Could not connect to any servers / IP whitelist", text: "Network Access-д IP нэмээгүй. `0.0.0.0/0` нэм (dev-д)." },
  { type: "callout", variant: "error", title: "OverwriteModelError: Cannot overwrite model", text: "`mongoose.model()`-ыг 2 удаа дуудсан. `mongoose.models.Food ?? mongoose.model(...)` гэж хамгаал." },
  { type: "callout", variant: "warn", title: "URI-д DB-ийн нэр байхгүй", text: "`.../?retryWrites` гэж шууд асуултын тэмдэг байвал `test` гэсэн default DB руу бичнэ. `/foodapp?retryWrites` гэж нэрээ бич." },
  { type: "callout", variant: "error", title: "MONGODB_URI-г NEXT_PUBLIC_ болгох", text: "DB нууц үг хөтөчид ил гарна! `NEXT_PUBLIC_` угтвар БҮҮ ашигла." },
  { type: "callout", variant: "warn", title: ".lean() мартах", text: "`.lean()`-гүй бол Mongoose бүрэн баримт объект үүсгэнэ (удаан, санах ой их). Зөвхөн уншиж байвал `.lean()` нэм." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Atlas дээр үнэгүй кластер үүсгэж `.env.local`-д URI тавь.",
    "Дунд: `connectToDatabase` кэштэй холболт бич.",
    "Дунд: CRUD 4 үйлдлийг тус бүр туршиж үз.",
    "Хүнд: `$gt`, `$in`, `$regex` ашиглан нийлмэл шүүлт бич.",
    "Хүнд: `categoryId + price` нийлмэл индекс нэмж хурдыг харьцуул.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "MongoDB-д table, row, column-ыг юу гэж нэрлэдэг вэ?",
    "Холболтыг яагаад кэшлэх ёстой вэ?",
    "`MONGODB_URI`-г яагаад `NEXT_PUBLIC_` болгож болохгүй вэ?",
    "`.lean()` юу хийдэг, хэзээ ашиглах вэ?",
    "`$gt`, `$in`, `$regex` тус бүр юу хийдэг вэ?",
    "Индекс юунд хэрэгтэй, хаана тавих вэ?",
    "`bad auth` алдаа гарвал юу шалгах вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "MongoDB ямар төрлийн сан вэ?", options: ["SQL", "NoSQL (document)", "Graph", "Key-value"], answer: 1 },
    { q: "Table-ийн MongoDB дэх нэр?", options: ["Collection", "Document", "Field", "Index"], answer: 0 },
    { q: "URI-г хаана хадгалах вэ?", options: [".env.local", "код дотор", "GitHub", "localStorage"], answer: 0 },
    { q: "\"Их\" оператор?", options: ["$lt", "$gt", "$in", "$ne"], answer: 1 },
    { q: "Хурдан унших горим?", options: [".lean()", ".fast()", ".raw()", ".quick()"], answer: 0 },
    { q: "Query хурдасгах?", options: ["Индекс", "Илүү RAM", "limit", "sort"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "MongoDB = document сан. Collection → Document → Field.",
    "Atlas M0 үнэгүй. URI-д DB нэр заавал бич.",
    "Холболтыг кэшлэ — эс бөгөөс dev-д холболт дуусна.",
    "`$gt/$in/$regex` — шүүлтийн үндсэн операторууд.",
    "Зөвхөн уншихад `.lean()`, хайдаг талбарт индекс.",
    "URI-г хэзээ ч `NEXT_PUBLIC_` бүү болго.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**NoSQL** — SQL-тэй харьцуулж, өгөгдлийн загварчлалыг сурна." },
];

// ===== m6l3 — NoSQL =====
export const m6l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "NoSQL ба SQL-ийн ялгааг ойлгож, embed эсвэл reference алийг сонгохоо шийдэж, өгөгдлөө зөв загварчилж сурна." },

  { type: "h", text: "Онол — Хоёр ертөнц" },
  { type: "code", lang: "text", code: `                    SQL                    NoSQL (MongoDB)
Бүтэц               Хатуу (schema)         Уян хатан
Хамаарал            JOIN                   Embed / reference
Гүйлгээ             Хүчтэй ACID            Дэмждэг (сүүлийн хувилбарт)
Өргөжүүлэх          Босоо (илүү хүчтэй PC) Хэвтээ (олон сервер)
Хэл                 SQL                    JS-тэй төстэй API
Хэзээ?              Банк, нягтлан бодох    Контент, каталог, лог`, },
  { type: "callout", variant: "tip", title: "Аль нь \"дээр\" вэ?", text: "Аль нь ч биш. Мөнгө шилжүүлэг зэрэг хатуу тууштай байдал шаардсанд SQL. Бүтэц нь өөрчлөгддөг, хурдан хөгжүүлэх шаардлагатай зүйлд NoSQL. Олон компани хоёуланг нь хэрэглэдэг." },

  { type: "h", text: "Хамгийн чухал шийдвэр — Embed эсвэл Reference?" },
  { type: "code", lang: "ts", code: `// 1) EMBED — дотор нь шууд хадгална
{
  _id: "order1",
  customer: "Бат",
  items: [                          // ← захиалгын дотор
    { name: "Пицца", price: 25000, qty: 2 },
    { name: "Кола", price: 3000, qty: 1 },
  ],
  total: 53000,
}
// ✓ Нэг query-ээр бүгдийг авна (хурдан)
// ✓ Захиалгын үеийн үнэ ХӨЛДӨНӨ (дараа үнэ өөрчлөгдсөн ч хэвээр)
// ✗ Хоолны нэр өөрчлөгдвөл хуучин захиалгад хуучин нэр үлдэнэ

// 2) REFERENCE — зөвхөн id хадгална
{
  _id: "order1",
  customerId: ObjectId("user1"),
  items: [
    { foodId: ObjectId("food1"), qty: 2 },
  ],
}
// ✓ Нэг газар засвал бүх газар шинэчлэгдэнэ
// ✓ Өгөгдөл давхардахгүй
// ✗ Нэмэлт query (populate) хэрэгтэй`, },
  { type: "code", lang: "text", code: `ШИЙДВЭРИЙН ДҮРЭМ

EMBED хий хэрэв:
✓ Хамт уншигддаг (захиалга + түүний бараа)
✓ Тухайн эцэггүйгээр утгагүй (сэтгэгдэл → нийтлэл)
✓ Тоо нь хязгаартай (хаяг: 1-5, бараа: 1-50)
✓ Түүхэн утга хадгалах ёстой (захиалгын үеийн үнэ)

REFERENCE хий хэрэв:
✓ Бие даан ашиглагддаг (хэрэглэгч, хоол)
✓ Олон газраас заагддаг (нэг хоол → 1000 захиалгад)
✓ Тоо нь хязгааргүй өсдөг (хэрэглэгчийн бүх захиалга)
✓ Байнга шинэчлэгддэг (үнэ, нэр)`, },
  { type: "callout", variant: "error", title: "16MB хязгаар", text: "MongoDB баримт хамгийн ихдээ 16MB. Хязгааргүй өсдөг массивыг embed хийвэл (жишээ: хэрэглэгчийн бүх лог) нэг өдөр энэ хязгаарт хүрч бичих боломжгүй болно." },

  { type: "h", text: "Практик жишээ — Food Delivery" },
  { type: "code", lang: "ts", code: `// User — reference-ээр
{ _id, name, email, passwordHash, role: "user" | "admin" }

// Category — бие даасан
{ _id, name: "Пицца", image }

// Food — category руу reference
{ _id, name, price, categoryId: ObjectId, image, isAvailable }

// Order — хосолсон загвар
{
  _id,
  userId: ObjectId,              // ← reference (хэрэглэгч бие даасан)

  items: [                       // ← EMBED (захиалгатай хамт унших)
    {
      foodId: ObjectId,          //   аль хоол болохыг мэдэхийн тулд
      name: "Пицца",             //   ХӨЛДӨӨСӨН нэр
      price: 25000,              //   ХӨЛДӨӨСӨН үнэ ← маш чухал!
      qty: 2,
    },
  ],

  address: {                     // ← EMBED (энэ захиалгынх)
    district: "СБД", detail: "1-р байр 12 тоот", phone: "99112233",
  },

  total: 53000,
  status: "pending" | "preparing" | "delivering" | "delivered",
  createdAt: Date,
}`, },
  { type: "callout", variant: "tip", title: "Яагаад үнийг хөлдөөх вэ?", text: "Зөвхөн `foodId` хадгалвал маргааш үнэ 30000 болоход өчигдрийн захиалга ч 30000 харагдана — санхүүгийн бүртгэл эвдэрнэ. Захиалгын үеийн үнийг ЗААВАЛ хуулж хадгал." },

  { type: "h", text: "Схемгүй гэдэг нь \"дүрэмгүй\" гэсэн үг БИШ" },
  { type: "code", lang: "ts", code: `// MongoDB өөрөө схем шаарддаггүй ч, Mongoose-оор ЗААВАЛ тодорхойл
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "preparing", "delivering", "delivered", "cancelled"],
    default: "pending",
  },
  total: { type: Number, required: true, min: 0 },
});

// Ингэснээр:
// ✓ Буруу төрөл орохгүй
// ✓ status-д санамсаргүй утга орохгүй
// ✓ TypeScript төрөл гарна`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Бүгдийг embed хийх", text: "Хэрэглэгчийн доторх захиалгын массив хязгааргүй өснө → 16MB хязгаар. Захиалгыг тусдаа collection болго." },
  { type: "callout", variant: "error", title: "Бүгдийг reference хийх", text: "SQL шиг бодож бүх зүйлийг салгавал нэг хуудас гаргахад 10 query хэрэгтэй болно. Хамт уншигддагийг embed хий." },
  { type: "callout", variant: "error", title: "Захиалгад үнэ хуулаагүй", text: "Зөвхөн `foodId` хадгалбал үнэ өөрчлөгдөхөд түүх эвдэрнэ. Нэр, үнийг хуулж хөлдөө." },
  { type: "callout", variant: "warn", title: "Схем огт тодорхойлохгүй", text: "\"NoSQL бол уян хатан\" гэж схемгүй ажиллавал 3 сарын дараа ямар талбар байгааг хэн ч мэдэхгүй болно. Mongoose схем ЗААВАЛ бич." },
  { type: "callout", variant: "warn", title: "Хэт гүн үүрлүүлэх", text: "3-4 давхар үүрлэсэн объект нь query бичих, шинэчлэхэд маш хэцүү. 2 давхраас гүнзгий болвол салгахыг бод." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: SQL ба NoSQL-ийн 4 ялгааг хүснэгт болго.",
    "Дунд: Food Delivery-ийн 4 collection-ыг зурж embed/reference шийд.",
    "Дунд: Захиалгад яагаад үнэ хуулах ёстойг жишээгээр тайлбарла.",
    "Хүнд: Блог систем загварчил (нийтлэл, сэтгэгдэл, шошго) — аль нь embed вэ?",
    "Хүнд: Mongoose схемээ `enum`, `required`, `min`-тэй бүрэн бич.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "SQL ба NoSQL-ийн үндсэн ялгаа юу вэ?",
    "Embed хэзээ зөв вэ (4 нөхцөл)?",
    "Reference хэзээ зөв вэ (4 нөхцөл)?",
    "16MB хязгаар яагаад чухал вэ?",
    "Захиалгад үнийг яагаад хуулж хадгалдаг вэ?",
    "\"Схемгүй\" гэдэг схем бичих хэрэггүй гэсэн үг үү?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "MongoDB ямар сан вэ?", options: ["Relational", "Document (NoSQL)", "Graph", "Key-value"], answer: 1 },
    { q: "Захиалгын бараа — аль нь дээр вэ?", options: ["Embed", "Reference", "Аль нь ч биш", "Хамаагүй"], answer: 0 },
    { q: "Баримтын дээд хэмжээ?", options: ["1MB", "16MB", "100MB", "Хязгааргүй"], answer: 1 },
    { q: "Хязгааргүй өсдөг жагсаалт?", options: ["Embed", "Reference (тусдаа collection)", "Массив", "Объект"], answer: 1 },
    { q: "Захиалгад үнийг яах вэ?", options: ["Зөвхөн foodId", "Үнийг хуулж хөлдөөх", "populate", "Тооцоолох"], answer: 1 },
    { q: "Mongoose схем яагаад хэрэгтэй вэ?", options: ["Хурдан болно", "Бүтэц ба төрлийг баталгаажуулна", "Заавал биш", "MongoDB шаардана"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "SQL хатуу бүтэцтэй, NoSQL уян хатан. Аль нь ч дээр биш — зорилгоос хамаарна.",
    "Хамт уншигддаг, хязгаартай, түүхэн утгатайг **embed**.",
    "Бие даасан, олон газраас заагддаг, өсдөгийг **reference**.",
    "16MB хязгаарыг үргэлж санаж бай.",
    "Захиалгад нэр, үнийг хуулж **хөлдөө**.",
    "Схемгүй ≠ дүрэмгүй — Mongoose схем заавал бич.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Router** — backend-ийн чиглүүлэлтийг зохион байгуулна." },
];

// ===== m6l4 — Router =====
export const m6l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Backend router-ийг зөв зохион байгуулж, үүрлэсэн нөөц, query, дундын middleware-ийг ойлгож сурна." },

  { type: "h", text: "Онол — Router-ийн үүрэг" },
  { type: "p", text: "Router нь \"аль хаяг, ямар method → аль функц\" гэсэн **зураглал**. Логик агуулах ёсгүй, зөвхөн чиглүүлнэ." },
  { type: "code", lang: "text", code: `Хүсэлт: DELETE /api/foods/abc123
   ↓
Router: "DELETE + /api/foods/:id → deleteFood controller"
   ↓
Controller: бизнес логик
   ↓
Хариу`, },

  { type: "h", text: "Next.js — файлын бүтэц нь router" },
  { type: "code", lang: "text", code: `app/api/
├── foods/
│   ├── route.ts                    GET, POST  /api/foods
│   └── [id]/
│       ├── route.ts                GET, PATCH, DELETE  /api/foods/:id
│       └── reviews/
│           └── route.ts            /api/foods/:id/reviews
├── categories/
│   └── route.ts                    /api/categories
├── orders/
│   ├── route.ts                    /api/orders
│   └── [id]/
│       ├── route.ts
│       └── status/
│           └── route.ts            PATCH /api/orders/:id/status
└── auth/
    ├── login/route.ts
    └── register/route.ts`, },
  { type: "code", lang: "ts", code: `// app/api/foods/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as controller from "@/controllers/food.controller";
import { notFound, serverError } from "@/lib/api-errors";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const food = await controller.getFood(id);
    if (!food) return notFound("Хоол олдсонгүй");
    return NextResponse.json(food);
  } catch (err) {
    console.error("GET /api/foods/:id", err);
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    await controller.deleteFood(id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/foods/:id", err);
    return serverError();
  }
}`, },

  { type: "h", text: "Үүрлэсэн нөөц (nested resources)" },
  { type: "code", lang: "text", code: `/api/foods/:foodId/reviews          нэг хоолны сэтгэгдлүүд
/api/orders/:orderId/items          нэг захиалгын барaанууд
/api/users/:userId/orders           нэг хэрэглэгчийн захиалгууд

⚠ 2 давхраас гүнзгий бүү яв:
✗ /api/users/:uid/orders/:oid/items/:iid/reviews
✓ /api/orders/:oid/items   эсвэл   /api/items/:iid`, },
  { type: "code", lang: "ts", code: `// app/api/foods/[id]/reviews/route.ts
export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;           // энэ бол foodId
  const reviews = await controller.listReviews(id);
  return NextResponse.json(reviews);
}`, },

  { type: "h", text: "Query параметр — шүүлт, эрэмбэ, хуудаслалт" },
  { type: "code", lang: "ts", code: `// GET /api/foods?category=abc&min=10000&max=50000&sort=price&page=2&limit=20
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const category = sp.get("category") ?? undefined;
  const min = sp.get("min") ? Number(sp.get("min")) : undefined;
  const max = sp.get("max") ? Number(sp.get("max")) : undefined;
  const sort = sp.get("sort") ?? "-createdAt";

  // ⚠ Хязгаар тавь — эс бөгөөс limit=999999 гэж явуулж серверийг унагаана
  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(sp.get("limit") ?? 20)));

  const result = await controller.listFoods({ category, min, max, sort, page, limit });

  return NextResponse.json({
    data: result.items,
    pagination: {
      page,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    },
  });
}`, },
  { type: "callout", variant: "error", title: "limit-д хязгаар тавихаа бүү март", text: "`?limit=1000000` гэж явуулбал сервер бүх өгөгдлийг санах ойд ачаалж унана. `Math.min(100, ...)` заавал." },

  { type: "h", text: "Express-д Router" },
  { type: "code", lang: "js", code: `// routes/food.routes.js
import express from "express";
import * as controller from "../controllers/food.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Нээлттэй
router.get("/", controller.list);
router.get("/:id", controller.getOne);

// Зөвхөн нэвтэрсэн
router.post("/:id/reviews", requireAuth, controller.addReview);

// Зөвхөн админ — олон middleware гинжлэх
router.post("/", requireAuth, requireAdmin, controller.create);
router.patch("/:id", requireAuth, requireAdmin, controller.update);
router.delete("/:id", requireAuth, requireAdmin, controller.remove);

export default router;`, },
  { type: "code", lang: "js", code: `// index.js
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);`, },

  { type: "h", text: "Route-ийн дараалал (Express-д)" },
  { type: "code", lang: "js", code: `// ✗ БУРУУ — "featured" нь :id гэж ойлгогдоно
router.get("/:id", controller.getOne);
router.get("/featured", controller.getFeatured);    // хэзээ ч хүрэхгүй!

// ✓ ЗӨВ — тодорхойг нь эхэлж бич
router.get("/featured", controller.getFeatured);
router.get("/:id", controller.getOne);`, },
  { type: "callout", variant: "tip", title: "Next.js-д энэ асуудал байхгүй", text: "Файлын бүтцэд `foods/featured/route.ts` болон `foods/[id]/route.ts` тусдаа файл. Next.js статик замыг динамикаас түрүүлж шалгадаг." },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "404 — route олдохгүй", text: "Next.js-д файлын нэр `route.ts` мөн эсэх, Express-д `app.use()` бичсэн эсэхээ шалга." },
  { type: "callout", variant: "error", title: "405 Method Not Allowed", text: "Тэр method-ыг экспортлоогүй. `export async function PATCH` нэм." },
  { type: "callout", variant: "warn", title: "Route дараалал (Express)", text: "`/:id`-ыг тодорхой замуудын ДАРАА бич." },
  { type: "callout", variant: "error", title: "Router-т бизнес логик", text: "Route файл 50 мөрөөс хэтэрвэл controller руу гарга." },
  { type: "callout", variant: "warn", title: "Хэт гүн үүрлэлт", text: "3+ давхар nested route нь уншихад хэцүү. Хавтгайруул." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `/api/categories` GET, POST route үүсгэ.",
    "Дунд: `/api/foods/[id]` PATCH, DELETE нэм.",
    "Дунд: `?page`, `?limit`-д хязгаар тавьж хуудаслалт хий.",
    "Хүнд: `/api/foods/[id]/reviews` үүрлэсэн route хий.",
    "Хүнд: Express-д тодорхой ба динамик замын дарааллыг туршиж алдааг хар.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Router-ийн үүрэг юу вэ?",
    "Next.js-д route яаж үүсгэдэг вэ?",
    "Үүрлэсэн нөөц гэж юу вэ, хэр гүн байх нь зохимжтой вэ?",
    "`limit`-д яагаад хязгаар тавих ёстой вэ?",
    "Express-д route дараалал яагаад чухал вэ?",
    "405 алдаа юу гэсэн үг вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Router юу хийдэг вэ?", options: ["Хаягийг функцтэй холбоно", "DB хадгална", "UI зурна", "Токен үүсгэнэ"], answer: 0 },
    { q: "Next.js-д API файлын нэр?", options: ["page.tsx", "route.ts", "router.ts", "api.ts"], answer: 1 },
    { q: "Динамик segment?", options: ["(id)", "[id]", "{id}", ":id (Next-д)"], answer: 1 },
    { q: "Хуудаслалтын параметр?", options: ["?page & ?limit", "?skip only", "body-д", "header-т"], answer: 0 },
    { q: "405 юу гэсэн үг вэ?", options: ["Олдсонгүй", "Method дэмжигдээгүй", "Эрх байхгүй", "Сервер унасан"], answer: 1 },
    { q: "Router хэр урт байх вэ?", options: ["Нимгэн", "Зузаан", "Хамаагүй", "Бүх логиктой"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Router = хаяг → функц зураглал. Логикгүй, нимгэн.",
    "Next.js: хавтас + `route.ts`, `[id]` динамик.",
    "Үүрлэсэн нөөц 2 давхраас илүү бүү яв.",
    "`limit`-д ЗААВАЛ дээд хязгаар тавь.",
    "Express-д тодорхой замыг `:id`-аас өмнө бич.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Controller** — бизнес логикийг зөв бичнэ." },
];

// ===== m6l5 — Controller =====
export const m6l5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Controller-т бизнес логик бичих, HTTP-ээс хараат бус болгох, service давхарга нэмэх, тестлэх боломжтой код бичихийг сурна." },

  { type: "h", text: "Онол — Controller юу хийдэг вэ?" },
  { type: "p", text: "Controller бол **бизнес дүрмүүдийн байр**. \"Захиалга үүсгэхэд яг юу болох ёстой вэ?\" гэсэн асуултын хариу энд байна." },
  { type: "code", lang: "text", code: `Захиалга үүсгэх бизнес дүрмүүд:
1. Бүх хоол байгаа эсэхийг шалгах
2. Нөөц хүрэлцэх эсэхийг шалгах
3. Нийт дүнг СЕРВЕР дээр тооцоолох (клиентэд итгэхгүй!)
4. 50,000-аас дээш бол хүргэлт үнэгүй
5. Хямдралын код байвал хэрэглэх
6. Захиалгыг хадгалах
7. Нөөцийг хасах
8. Хэрэглэгчид имэйл илгээх

← Энэ бүхэн CONTROLLER-т`, },

  { type: "h", text: "Бүтэн жишээ" },
  { type: "code", lang: "ts", code: `// controllers/order.controller.ts
import { Order } from "@/models/Order";
import { Food } from "@/models/Food";
import { connectToDatabase } from "@/lib/mongodb";
import { AppError } from "@/lib/errors";

interface CreateOrderInput {
  userId: string;
  items: { foodId: string; qty: number }[];
  address: { district: string; detail: string; phone: string };
  promoCode?: string;
}

export async function createOrder(input: CreateOrderInput) {
  await connectToDatabase();

  if (input.items.length === 0) {
    throw new AppError("Захиалга хоосон байна", 400, "EMPTY_ORDER");
  }

  // 1) Бүх хоолыг НЭГ query-ээр авна (N+1-ээс сэргийлнэ)
  const foodIds = input.items.map((i) => i.foodId);
  const foods = await Food.find({ _id: { $in: foodIds } }).lean();

  // 2) Хурдан хайхын тулд Map болгоно
  const foodMap = new Map(foods.map((f) => [String(f._id), f]));

  // 3) Шалгах + үнийг СЕРВЕР дээр тооцоолох
  let subtotal = 0;
  const orderItems = input.items.map((item) => {
    const food = foodMap.get(item.foodId);

    if (!food) {
      throw new AppError(\`Хоол олдсонгүй: \${item.foodId}\`, 404, "FOOD_NOT_FOUND");
    }
    if (!food.isAvailable) {
      throw new AppError(\`"\${food.name}" одоогоор боломжгүй\`, 409, "FOOD_UNAVAILABLE");
    }
    if (item.qty < 1 || item.qty > 20) {
      throw new AppError("Тоо ширхэг 1-20 хооронд байна", 400, "INVALID_QTY");
    }

    subtotal += food.price * item.qty;

    // Нэр, үнийг ХӨЛДӨӨЖ хадгална
    return { foodId: food._id, name: food.name, price: food.price, qty: item.qty };
  });

  // 4) Хүргэлтийн төлбөр — бизнес дүрэм
  const deliveryFee = subtotal >= 50000 ? 0 : 3000;

  // 5) Хямдрал
  const discount = input.promoCode ? await applyPromo(input.promoCode, subtotal) : 0;

  const total = subtotal + deliveryFee - discount;

  // 6) Хадгалах
  const order = await Order.create({
    userId: input.userId,
    items: orderItems,
    address: input.address,
    subtotal,
    deliveryFee,
    discount,
    total,
    status: "pending",
  });

  return order.toObject();
}`, },
  { type: "callout", variant: "error", title: "Үнийг хэзээ ч клиентээс бүү ав", text: "Frontend-ээс `total: 100` гэж явуулбал халдагч 25,000 төгрөгийн пиццаг 100 төгрөгөөр авна. Үнийг ЗААВАЛ сервер дээр DB-ээс уншиж тооцоол." },

  { type: "h", text: "N+1 асуудал" },
  { type: "code", lang: "ts", code: `// ✗ N+1 — 20 барaатай захиалгад 21 query!
for (const item of input.items) {
  const food = await Food.findById(item.foodId);   // давталт бүрт query
  subtotal += food.price * item.qty;
}

// ✓ Нэг query
const foods = await Food.find({ _id: { $in: foodIds } }).lean();
const foodMap = new Map(foods.map((f) => [String(f._id), f]));`, },
  { type: "callout", variant: "tip", title: "Map яагаад вэ?", text: "`foods.find(f => f.id === id)` нь массивыг эхнээс нь хайдаг (O(n)). `Map.get(id)` шууд олдог (O(1)). 100 барaатай захиалгад мэдэгдэхүйц ялгаа." },

  { type: "h", text: "Service давхарга — хэзээ хэрэгтэй вэ?" },
  { type: "code", lang: "ts", code: `// Олон controller-т хэрэгтэй логикийг service-д гарга
// services/pricing.service.ts
export function calculateDeliveryFee(subtotal: number, distance: number) {
  if (subtotal >= 50000) return 0;
  if (distance <= 3) return 3000;
  return 3000 + Math.ceil(distance - 3) * 500;
}

export async function applyPromo(code: string, subtotal: number) {
  const promo = await Promo.findOne({ code, isActive: true });
  if (!promo) throw new AppError("Хямдралын код буруу", 400, "INVALID_PROMO");
  if (promo.expiresAt < new Date()) throw new AppError("Хугацаа дууссан", 400, "PROMO_EXPIRED");
  if (subtotal < promo.minAmount) {
    throw new AppError(\`Хамгийн багадаа \${promo.minAmount}₮\`, 400, "PROMO_MIN");
  }
  return Math.round(subtotal * promo.percent / 100);
}`, },

  { type: "h", text: "Эрх шалгах" },
  { type: "code", lang: "ts", code: `export async function updateOrderStatus(
  orderId: string,
  newStatus: string,
  actor: { id: string; role: string },
) {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError("Захиалга олдсонгүй", 404);

  // Эзэмшигч эсвэл админ л өөрчилж болно
  const isOwner = String(order.userId) === actor.id;
  const isAdmin = actor.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new AppError("Эрх хүрэлцэхгүй", 403, "FORBIDDEN");
  }

  // Хэрэглэгч зөвхөн цуцлах эрхтэй
  if (isOwner && !isAdmin && newStatus !== "cancelled") {
    throw new AppError("Зөвхөн цуцлах боломжтой", 403, "FORBIDDEN");
  }

  // Төлөвийн шилжилтийн дүрэм
  const allowed: Record<string, string[]> = {
    pending: ["preparing", "cancelled"],
    preparing: ["delivering", "cancelled"],
    delivering: ["delivered"],
    delivered: [],
    cancelled: [],
  };

  if (!allowed[order.status]?.includes(newStatus)) {
    throw new AppError(
      \`"\${order.status}" төлвөөс "\${newStatus}" рүү шилжих боломжгүй\`,
      409, "INVALID_TRANSITION",
    );
  }

  order.status = newStatus;
  await order.save();
  return order.toObject();
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Клиентээс ирсэн үнэд итгэх", text: "Хамгийн аюултай алдаа. Үнэ, хямдрал, нийт дүнг заавал сервер дээр DB-ээс тооцоол." },
  { type: "callout", variant: "error", title: "N+1 query", text: "Давталт дотор `await findById` бичих. `$in`-ээр нэг query болго." },
  { type: "callout", variant: "warn", title: "Controller-т NextResponse", text: "HTTP-ээс хараат болно. `throw new AppError(...)` хийж route-д барь." },
  { type: "callout", variant: "error", title: "Эрх шалгахгүй", text: "`orderId` мэдэж байвал хэн ч өөр хүний захиалгыг харна. Эзэмшигч эсэхийг ЗААВАЛ шалга." },
  { type: "callout", variant: "warn", title: "Controller 200 мөр давсан", text: "Хэт олон хариуцлага. Service давхарга нэмж хуваа." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Захиалга үүсгэх 5 бизнес дүрмийг жагсаа.",
    "Дунд: `createOrder` controller бичиж үнийг сервер дээр тооцоол.",
    "Дунд: N+1 асуудлыг `$in`-ээр шийд.",
    "Хүнд: Төлөвийн шилжилтийн дүрмийг хэрэгжүүл.",
    "Хүнд: `pricing.service.ts` гарган хүргэлт, хямдралын логикийг салга.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Controller юу хариуцах вэ?",
    "Яагаад үнийг клиентээс авч болохгүй вэ?",
    "N+1 асуудал гэж юу вэ, яаж шийдэх вэ?",
    "Map яагаад массиваас хурдан вэ?",
    "Service давхарга хэзээ хэрэгтэй вэ?",
    "Эрх шалгалтыг хаана бичих вэ?",
    "Төлөвийн шилжилтийн дүрэм яагаад хэрэгтэй вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Бизнес логик хаана вэ?", options: ["Router", "Controller", "Model", "View"], answer: 1 },
    { q: "Нийт дүнг хаана тооцоолох вэ?", options: ["Frontend", "Server (DB-ээс)", "Хоёуланд", "Хэрэглэгч оруулна"], answer: 1 },
    { q: "N+1 query-г яаж шийдэх вэ?", options: ["$in-ээр нэг query", "Илүү RAM", "Кэш", "index"], answer: 0 },
    { q: "Controller алдааг яаж мэдэгдэх вэ?", options: ["NextResponse", "throw AppError", "console.log", "return null"], answer: 1 },
    { q: "Өөр хүний захиалга харахаас сэргийлэх?", options: ["Эзэмшигч шалгах", "URL нуух", "HTTPS", "Кэш"], answer: 0 },
    { q: "O(1) хайлт?", options: ["Array.find", "Map.get", "filter", "forEach"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Controller = бизнес дүрмүүдийн байр.",
    "Үнэ, дүнг ЗААВАЛ сервер дээр DB-ээс тооцоол.",
    "Давталт дотор query бүү бич — `$in` + `Map`.",
    "Алдааг `throw`, HTTP-г route-д үлдээ.",
    "Эзэмшигч/эрхийг заавал шалга.",
    "Controller томорвол service давхарга нэм.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**TypeScript (backend)** — сервер талын кодыг төрөлжүүлнэ." },
];

// ===== m6l6 — TypeScript =====
export const m6l6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Backend-д TypeScript ашиглаж, Mongoose төрөл гаргаж, ажиллах үеийн баталгаа (Zod) нэмж, `any`-гүй код бичнэ." },

  { type: "h", text: "Онол — Backend-д TS яагаад чухал вэ?" },
  { type: "p", text: "Frontend-д алдаа гарвал нэг хэрэглэгч UI эвдэрсэн харна. Backend-д алдаа гарвал **өгөгдөл эвдэрнэ** — засахад маш хэцүү." },
  { type: "code", lang: "ts", code: `// JS — чимээгүй эвдэрнэ
async function createOrder(data) {
  const total = data.items.reduce((s, i) => s + i.price * i.quantity, 0);
  //                                                    ↑ талбарын нэр нь "qty"
  // → NaN гарна → DB-д total: NaN хадгалагдана → тайлан эвдэрнэ

  await Order.create({ ...data, total });
}`, },
  { type: "code", lang: "ts", code: `// TS — бичиж байхад л зогсооно
interface OrderItem { foodId: string; price: number; qty: number }

async function createOrder(data: { items: OrderItem[] }) {
  const total = data.items.reduce((s, i) => s + i.price * i.quantity, 0);
  //                                                    ~~~~~~~~
  // ✗ Property 'quantity' does not exist. Did you mean 'qty'?
}`, },

  { type: "h", text: "Mongoose-оос төрөл гаргах" },
  { type: "code", lang: "ts", code: `import mongoose, { Schema, InferSchemaType, HydratedDocument } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        foodId: { type: Schema.Types.ObjectId, ref: "Food", required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true, min: 1 },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "preparing", "delivering", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// Схемээс төрлийг АВТОМАТААР гаргана — гараар бичих шаардлагагүй
export type OrderDoc = InferSchemaType<typeof orderSchema>;

// Mongoose методуудтай баримт
export type OrderHydrated = HydratedDocument<OrderDoc>;

export const Order =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);`, },
  { type: "callout", variant: "tip", title: "InferSchemaType-ийн ач холбогдол", text: "Схемдээ шинэ талбар нэмэхэд төрөл нь өөрөө шинэчлэгдэнэ. Гараар interface бичвэл хоёр газар засах ёстой болж, мартах эрсдэлтэй." },

  { type: "h", text: "lean() болон ObjectId — түгээмэл занга" },
  { type: "code", lang: "ts", code: `// .lean() нь _id-г ObjectId хэвээр буцаана — string БИШ
const doc = await Order.findById(id).lean();
// doc._id нь ObjectId

// ✗ Энэ хөрвүүлэлт TS-д алдаа өгнө
const bad = doc as OrderDoc & { _id: string };
//   Type 'ObjectId' is not comparable to type 'string'

// ✓ Туслах төрөл үүсгэ
import type { Types } from "mongoose";

type Meta = { _id: Types.ObjectId | string; createdAt?: Date; updatedAt?: Date };
export type Lean<T> = T & Meta;

const good = doc as Lean<OrderDoc>;       // ✓ ажиллана`, },
  { type: "code", lang: "ts", code: `// Client рүү дамжуулах цэвэр төрөл
export interface OrderDTO {
  id: string;
  items: { name: string; price: number; qty: number }[];
  total: number;
  status: string;
  createdAt: string;
}

export function serializeOrder(doc: Lean<OrderDoc>): OrderDTO {
  return {
    id: String(doc._id),
    items: doc.items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
    total: doc.total,
    status: doc.status,
    createdAt: doc.createdAt?.toISOString() ?? "",
  };
}`, },

  { type: "h", text: "Zod — ажиллах үеийн баталгаа" },
  { type: "code", lang: "ts", code: `// ⚠ TypeScript зөвхөн БИЧИХ үед шалгана. Ажиллах үед байхгүй!
// Гаднаас ирсэн өгөгдөлд Zod ЗААВАЛ хэрэгтэй.

import { z } from "zod";

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      foodId: z.string().regex(/^[0-9a-fA-F]{24}$/, "ObjectId буруу"),
      qty: z.number().int().min(1).max(20),
    }),
  ).min(1, "Дор хаяж нэг бараа"),

  address: z.object({
    district: z.string().min(1),
    detail: z.string().min(1).max(200),
    phone: z.string().regex(/^[0-9]{8}$/, "8 оронтой дугаар"),
  }),

  promoCode: z.string().optional(),
});

// Төрөл автоматаар
export type CreateOrderInput = z.infer<typeof createOrderSchema>;`, },
  { type: "code", lang: "ts", code: `// Route-д ашиглах
export async function POST(req: NextRequest) {
  const parsed = createOrderSchema.safeParse(await req.json());
  if (!parsed.success) {
    return badRequest("Буруу өгөгдөл", parsed.error.flatten());
  }
  // parsed.data нь CreateOrderInput төрөлтэй, БАТАЛГААЖСАН
  const order = await createOrder({ ...parsed.data, userId });
}`, },
  { type: "callout", variant: "error", title: "TypeScript ≠ ажиллах үеийн хамгаалалт", text: "`const body = await req.json() as CreateOrderInput` гэж бичих нь ЗҮГЭЭР Л ХУДАЛ. Ажиллах үед юу ч шалгагдахгүй. Zod ашигла." },

  { type: "h", text: "Хэрэгтэй загварууд" },
  { type: "code", lang: "ts", code: `// 1) Ялгаварласан нэгдэл (discriminated union)
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; code: string };

async function getOrder(id: string): Promise<Result<OrderDTO>> {
  const doc = await Order.findById(id).lean();
  if (!doc) return { ok: false, error: "Олдсонгүй", code: "NOT_FOUND" };
  return { ok: true, data: serializeOrder(doc as Lean<OrderDoc>) };
}

const r = await getOrder(id);
if (r.ok) {
  console.log(r.data.total);      // TS мэднэ: data байна
} else {
  console.log(r.error);           // TS мэднэ: error байна
}

// 2) Тогтмолуудаас төрөл гаргах
const ORDER_STATUSES = ["pending", "preparing", "delivering", "delivered"] as const;
type OrderStatus = typeof ORDER_STATUSES[number];
// "pending" | "preparing" | "delivering" | "delivered"

// 3) env хувьсагчийг төрөлжүүлэх
const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),
});
export const env = envSchema.parse(process.env);   // эхлэхэд л шалгана`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "as-аар хүчээр хөрвүүлэх", text: "`req.json() as T` нь ямар ч баталгаа өгөхгүй. Zod-оор parse хий." },
  { type: "callout", variant: "error", title: "ObjectId is not comparable to string", text: "`.lean()`-ийн `_id` нь ObjectId. `Lean<T>` туслах төрөл ашигла." },
  { type: "callout", variant: "warn", title: "any хэрэглэх", text: "Backend-д `any` бол өгөгдөл эвдрэх зам. `unknown` + шалгалт эсвэл Zod." },
  { type: "callout", variant: "error", title: "process.env шалгахгүй ашиглах", text: "`process.env.X` нь `string | undefined`. Эхлэхэд нэг удаа Zod-оор шалгавал цаашид найдвартай." },
  { type: "callout", variant: "warn", title: "Схем ба interface хоёрыг гараар синк хийх", text: "`InferSchemaType` ашигла — автоматаар таарна." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `InferSchemaType`-ээр схемээс төрөл гарга.",
    "Дунд: `Lean<T>` туслах төрөл бичиж route-уудад хэрэглэ.",
    "Дунд: `serializeOrder` DTO функц бич.",
    "Хүнд: Zod схем бичиж `z.infer`-ээр input төрөл гарга.",
    "Хүнд: `Result<T>` discriminated union хэрэгжүүлж үз.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Backend-д TS яагаад илүү чухал вэ?",
    "`InferSchemaType` юу хийдэг вэ?",
    "`.lean()`-ийн `_id` ямар төрөлтэй вэ, яагаад асуудал болдог вэ?",
    "TypeScript ажиллах үед шалгадаг уу?",
    "Zod яагаад заавал хэрэгтэй вэ?",
    "`as` хөрвүүлэлт ямар эрсдэлтэй вэ?",
    "Discriminated union юунд хэрэгтэй вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Схемээс төрөл гаргах?", options: ["InferSchemaType", "typeof", "SchemaType", "ModelType"], answer: 0 },
    { q: "TypeScript хэзээ шалгадаг вэ?", options: ["Ажиллах үед", "Compile үед", "Хоёуланд", "Хэзээ ч үгүй"], answer: 1 },
    { q: "Гаднаас ирсэн өгөгдлийг юугаар шалгах вэ?", options: ["as", "interface", "Zod", "typeof"], answer: 2 },
    { q: "`.lean()` _id төрөл?", options: ["string", "ObjectId", "number", "any"], answer: 1 },
    { q: "Аль нь муу практик вэ?", options: ["unknown", "any", "Zod", "interface"], answer: 1 },
    { q: "env хувьсагчийг яах вэ?", options: ["Шууд ашиглах", "Эхлэхэд Zod-оор шалгах", "as string", "any"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Backend-ийн алдаа өгөгдлийг эвдэнэ — TS илүү чухал.",
    "`InferSchemaType`-ээр схемээс төрөл автоматаар гарга.",
    "`.lean()` нь ObjectId буцаана — `Lean<T>` туслах төрөл.",
    "TS зөвхөн compile үед. Ажиллах үеийн баталгаа = Zod.",
    "`as` бол худал амлалт. `any`-аас зайлсхий.",
    "env хувьсагчийг эхлэхэд нэг удаа шалга.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Middleware** — хүсэлт бүрт ажиллах давхарга." },
];

// ===== m6l7 — Middleware =====
export const m6l7: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Middleware-ийн ажиллах зарчмыг ойлгож, Next.js middleware.ts болон Express middleware хоёуланг бичиж сурна." },

  { type: "h", text: "Онол — Middleware гэж юу вэ?" },
  { type: "p", text: "Хүсэлт эцсийн зорилгодоо хүрэхээс ӨМНӨ дамжих **шүүлтүүрийн гинж**. Тус бүр нь: (1) хүсэлтийг өөрчилж болно, (2) цааш нь дамжуулж болно, (3) зогсоож хариу буцааж болно." },
  { type: "code", lang: "text", code: `Хүсэлт
  ↓
[1. Лог]         → бичээд цааш
  ↓
[2. CORS]        → header нэмээд цааш
  ↓
[3. Rate limit]  → хэт олон бол ЗОГСООНО (429)
  ↓
[4. Auth]        → токен буруу бол ЗОГСООНО (401)
  ↓
[5. Route]       → эцсийн зорилго
  ↓
Хариу`, },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Онгоцны буудал: бүртгэл → аюулгүйн шалгалт → паспорт → онгоц. Аль ч цэгт зогсоож болно. Middleware яг ижил." },

  { type: "h", text: "Next.js middleware.ts" },
  { type: "code", lang: "ts", code: `// src/middleware.ts — төслийн ҮНДСЭНД (app/ дотор БИШ)
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Нэвтрэлт шалгах
  const token = req.cookies.get("session")?.value;

  if (pathname.startsWith("/dashboard") && !token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", pathname);       // буцаж очих хаяг
    return NextResponse.redirect(url);
  }

  // 2) Header нэмэх
  const res = NextResponse.next();
  res.headers.set("X-Request-Id", crypto.randomUUID());
  return res;
}

// Аль хаягуудад ажиллахыг заана
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    // Статик файлуудыг алгасах
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};`, },
  { type: "callout", variant: "error", title: "Edge Runtime-ийн хязгаарлалт", text: "Next.js middleware нь Edge дээр ажилладаг: Node.js API (`fs`, `crypto` бүрэн хувилбар), Mongoose, bcrypt ажиллахгүй. DB шалгалт хийж болохгүй — зөвхөн cookie байгаа эсэхийг хар. Жинхэнэ баталгаажуулалтыг route дотор хий." },

  { type: "h", text: "Express middleware — өөрөө бичих" },
  { type: "code", lang: "js", code: `// middleware/logger.js
export function logger(req, res, next) {
  const start = Date.now();

  // Хариу дуусахад ажиллана
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(\`\${req.method} \${req.path} \${res.statusCode} - \${ms}ms\`);
  });

  next();
}`, },
  { type: "code", lang: "js", code: `// middleware/auth.js
import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Токен байхгүй" });
  }

  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    req.user = payload;              // дараагийн handler-т дамжина
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Токен хугацаа дууссан", code: "TOKEN_EXPIRED" });
    }
    return res.status(401).json({ error: "Токен буруу" });
  }
}

// Үүрэг шалгах — requireAuth-ийн ДАРАА ажиллана
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Нэвтрээгүй" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Эрх хүрэлцэхгүй" });
    }
    next();
  };
}

// Ашиглах
router.delete("/:id", requireAuth, requireRole("admin"), controller.remove);`, },

  { type: "h", text: "Rate limiting" },
  { type: "code", lang: "ts", code: `// Энгийн санах ойн хувилбар (нэг серверт л ажиллана)
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(ip: string, limit = 60, windowMs = 60_000) {
  const now = Date.now();
  const rec = hits.get(ip);

  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (rec.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((rec.resetAt - now) / 1000) };
  }

  rec.count++;
  return { ok: true, remaining: limit - rec.count };
}`, },
  { type: "callout", variant: "warn", title: "Production-д санах ойн rate limit хангалтгүй", text: "Vercel/Render дээр олон instance ажилладаг тул тус бүр өөрийн Map-тай болно. Redis (Upstash) эсвэл `@upstash/ratelimit` ашигла." },

  { type: "h", text: "Route дотор дахин баталгаажуулах" },
  { type: "code", lang: "ts", code: `// lib/auth.ts — route бүрт дуудна
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCurrentUser() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string; role: string;
    };
    return { id: payload.sub, role: payload.role };
  } catch {
    return null;
  }
}

// Route-д
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  if (user.role !== "admin") return forbidden();
  // ...
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "middleware.ts буруу байрлалд", text: "`src/middleware.ts` эсвэл root-д. `app/middleware.ts` дотор бол ОГТ ажиллахгүй, ямар ч алдаа өгөхгүй." },
  { type: "callout", variant: "error", title: "Middleware-д Mongoose ашиглах", text: "Edge runtime-д ажиллахгүй. \"Module not found: Can't resolve 'fs'\" гэх мэт алдаа гарна." },
  { type: "callout", variant: "error", title: "next() мартах (Express)", text: "Хүсэлт хөлдөнө. `next()` эсвэл `res.send()` — аль нэгийг заавал." },
  { type: "callout", variant: "warn", title: "matcher-т статик файл орсон", text: "Зураг, CSS бүрт middleware ажиллаж хуудсыг удаашруулна. `_next/static`-ыг хас." },
  { type: "callout", variant: "error", title: "Зөвхөн middleware-д найдах", text: "Middleware-ыг тойрч API руу шууд хандаж болно. Route дотор ЗААВАЛ дахин шалга." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `src/middleware.ts` үүсгэж хүсэлт бүрийг логло.",
    "Дунд: `/dashboard`-д нэвтрээгүй бол `/login` руу чиглүүл.",
    "Дунд: `matcher`-ээр статик файлуудыг алгас.",
    "Хүнд: Express-д `requireAuth` + `requireRole` middleware бич.",
    "Хүнд: Энгийн rate limit хэрэгжүүлж 429 буцаа.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Middleware юу хийж чадах вэ (3 зүйл)?",
    "`middleware.ts` хаана байх ёстой вэ?",
    "Edge runtime-д юу ажиллахгүй вэ?",
    "`matcher` юунд хэрэгтэй вэ?",
    "Express-д `next()` дуудахгүй бол юу болох вэ?",
    "Яагаад route дотор дахин шалгах ёстой вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Middleware хэзээ ажиллах вэ?", options: ["Route-оос өмнө", "Route-ын дараа", "Хэзээ ч үгүй", "Build үед"], answer: 0 },
    { q: "Next.js middleware файл хаана вэ?", options: ["app/middleware.ts", "src/middleware.ts эсвэл root", "pages/", "api/"], answer: 1 },
    { q: "Аль route-д ажиллахыг заах?", options: ["config.matcher", "export path", "routes", "filter"], answer: 0 },
    { q: "Edge runtime-д ажиллахгүй нь?", options: ["fetch", "Mongoose", "cookies", "URL"], answer: 1 },
    { q: "Express-д цааш дамжуулах?", options: ["next()", "continue()", "send()", "return"], answer: 0 },
    { q: "Middleware хангалттай юу?", options: ["Тийм", "Үгүй — route дотор дахин шалга", "Заримдаа", "Route хэрэггүй"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Middleware = хүсэлтийн замд байрлах шүүлтүүр. Дамжуулах эсвэл зогсооно.",
    "Next.js: `src/middleware.ts` + `config.matcher`. Edge runtime — Mongoose байхгүй.",
    "Express: `(req, res, next)`, `next()` заавал.",
    "Middleware-ыг тойрч болно — route дотор дахин шалга.",
    "Rate limit production-д Redis шаардана.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Mongoose ODM** — MongoDB-тэй ажиллах хүчирхэг давхарга." },
];

// ===== m6l8 — Mongoose ODM =====
export const m6l8: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Mongoose-ийн схем, validation, hook, virtual, метод зэрэг бүх боломжийг эзэмшинэ." },

  { type: "h", text: "Онол — ODM гэж юу вэ?" },
  { type: "p", text: "**ODM (Object Document Mapper)** нь JavaScript объект ба MongoDB баримт хоорондын гүүр. Mongoose нь MongoDB-ийн драйвер дээр нэмээд:" },
  { type: "ul", items: [
    "**Схем** — бүтэц тодорхойлно (MongoDB өөрөө шаарддаггүй).",
    "**Validation** — хадгалахаас өмнө шалгана.",
    "**Type casting** — `\"25\"` текстийг 25 тоо болгоно.",
    "**Hook** — өмнө/дараа ажиллах код.",
    "**Populate** — reference-ийг дүүргэнэ (JOIN шиг).",
    "**Query builder** — гинжлэсэн API.",
  ] },

  { type: "h", text: "Схемийн бүрэн жишээ" },
  { type: "code", lang: "ts", code: `import mongoose, { Schema, InferSchemaType } from "mongoose";

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Нэр заавал"],       // захиалгат мессеж
      trim: true,                            // хоёр талын зайг арилгана
      minlength: [2, "Хамгийн багадаа 2 тэмдэгт"],
      maxlength: 100,
    },

    slug: {
      type: String,
      unique: true,                          // давхардахгүй (индекс үүснэ)
      lowercase: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Үнэ сөрөг байж болохгүй"],
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",                       // populate хийхэд хэрэгтэй
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: {
        values: ["draft", "active", "archived"],
        message: "{VALUE} буруу төлөв",
      },
      default: "draft",
    },

    tags: [String],                          // текстийн массив

    nutrition: {                             // үүрлэсэн объект
      calories: Number,
      protein: Number,
    },

    // Захиалгат шалгалт
    discount: {
      type: Number,
      default: 0,
      validate: {
        validator: (v: number) => v >= 0 && v <= 90,
        message: "Хямдрал 0-90% хооронд",
      },
    },
  },
  {
    timestamps: true,          // createdAt, updatedAt автоматаар
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export type FoodDoc = InferSchemaType<typeof foodSchema>;`, },

  { type: "h", text: "Virtual — хадгалагдахгүй талбар" },
  { type: "code", lang: "ts", code: `// DB-д хадгалагдахгүй ч уншиж болно
foodSchema.virtual("finalPrice").get(function () {
  return Math.round(this.price * (1 - this.discount / 100));
});

// Ашиглах
const food = await Food.findById(id);
console.log(food.finalPrice);       // тооцоологдоно

// ⚠ virtual-аар query хийж БОЛОХГҮЙ
await Food.find({ finalPrice: { $lt: 20000 } });   // ажиллахгүй!`, },

  { type: "h", text: "Hook (middleware) — өмнө/дараа" },
  { type: "code", lang: "ts", code: `// Хадгалахаас ӨМНӨ — slug автоматаар үүсгэх
foodSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/\\s+/g, "-");
  }
  next();
});

// Нууц үгийг hash хийх (User схемд)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();    // ⚠ заавал шалга
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Устгасны ДАРАА — холбоотой өгөгдлийг цэвэрлэх
foodSchema.post("findOneAndDelete", async function (doc) {
  if (doc) await Review.deleteMany({ foodId: doc._id });
});`, },
  { type: "callout", variant: "error", title: "isModified шалгахаа бүү март", text: "Нууц үг hash хийх hook-д `isModified(\"password\")` шалгахгүй бол хэрэглэгч нэрээ солих бүрт нууц үг ДАХИН hash хийгдэж, нэвтэрч чадахгүй болно." },
  { type: "callout", variant: "warn", title: "Hook хаана ажилладаггүй вэ?", text: "`pre(\"save\")` нь `updateOne`, `findOneAndUpdate`, `insertMany`-д ажиллахгүй. Тэдгээрт `pre(\"findOneAndUpdate\")` тусад нь бич." },

  { type: "h", text: "Метод ба статик" },
  { type: "code", lang: "ts", code: `// Инстансын метод — нэг баримт дээр
userSchema.methods.comparePassword = function (plain: string) {
  return bcrypt.compare(plain, this.password);
};

const user = await User.findOne({ email });
const ok = await user.comparePassword("нууцүг");

// Статик метод — Model дээр
foodSchema.statics.findActive = function () {
  return this.find({ status: "active" });
};

const active = await Food.findActive();

// Query helper — гинжлэж болно
foodSchema.query.byCategory = function (id: string) {
  return this.where({ categoryId: id });
};

await Food.find().byCategory(catId).sort("-createdAt");`, },

  { type: "h", text: "Validation ажиллах/ажиллахгүй тохиолдол" },
  { type: "code", lang: "ts", code: `// ✓ Validation АЖИЛЛАНА
await Food.create({ ... });
const f = new Food({ ... }); await f.save();

// ✗ Validation АЖИЛЛАХГҮЙ (анхдагчаар)
await Food.updateOne({ _id }, { price: -500 });        // сөрөг үнэ орно!
await Food.findByIdAndUpdate(id, { price: -500 });

// ✓ Шийдэл — runValidators
await Food.findByIdAndUpdate(id, { price: -500 }, {
  new: true,
  runValidators: true,     // ← ЗААВАЛ нэм
});`, },
  { type: "callout", variant: "error", title: "Хамгийн далд Mongoose занга", text: "`findByIdAndUpdate` нь анхдагчаар validation ажиллуулдаггүй. `runValidators: true` нэмэхээ мартвал DB-д хүчингүй өгөгдөл орно." },

  { type: "h", text: "Алдаа барих" },
  { type: "code", lang: "ts", code: `try {
  await Food.create(data);
} catch (err) {
  // Validation алдаа
  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.values(err.errors).map((e) => e.message);
    return badRequest("Буруу өгөгдөл", details);
  }

  // Давхардал (unique зөрчсөн)
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyPattern)[0];
    return NextResponse.json(
      { error: \`Энэ \${field} аль хэдийн бүртгэгдсэн\` },
      { status: 409 },
    );
  }

  // Буруу ObjectId
  if (err instanceof mongoose.Error.CastError) {
    return badRequest("ID буруу форматтай");
  }

  throw err;
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "OverwriteModelError", text: "`mongoose.models.Food ?? mongoose.model(\"Food\", schema)` гэж hot-reload-оос хамгаал." },
  { type: "callout", variant: "error", title: "runValidators мартах", text: "`findByIdAndUpdate` validation алгасна. `{ runValidators: true }` нэм." },
  { type: "callout", variant: "error", title: "E11000 duplicate key", text: "`unique: true` талбар давхардсан. 409 буцаа, `err.code === 11000` шалга." },
  { type: "callout", variant: "error", title: "CastError: Cast to ObjectId failed", text: "24 тэмдэгтийн hex биш утга дамжуулсан. Урьдчилан `mongoose.isValidObjectId(id)` шалга." },
  { type: "callout", variant: "warn", title: "Virtual-аар query хийх", text: "Virtual нь DB-д байхгүй тул `find({ finalPrice: ... })` ажиллахгүй. Aggregate ашигла." },
  { type: "callout", variant: "warn", title: "unique нь validation биш", text: "`unique: true` бол зөвхөн индекс. Индекс үүсээгүй бол давхардал орно. Production-д индексээ шалга." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `required`, `min`, `enum`, `default`-тай схем бич.",
    "Дунд: `pre(\"save\")` hook-оор slug автоматаар үүсгэ.",
    "Дунд: `virtual`-аар `finalPrice` тооцоол.",
    "Хүнд: `runValidators`-гүй update хийж сөрөг үнэ орохыг батал, дараа нь зас.",
    "Хүнд: `11000`, `ValidationError`, `CastError` гурвыг тусад нь барь.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "ODM гэж юу вэ, Mongoose юу нэмдэг вэ?",
    "`virtual` гэж юу вэ, ямар хязгаартай вэ?",
    "`pre(\"save\")` hook хаана ажиллахгүй вэ?",
    "`isModified` яагаад чухал вэ?",
    "`findByIdAndUpdate`-д validation ажиллах уу?",
    "`11000` алдаа юу гэсэн үг вэ?",
    "`unique: true` validation мөн үү?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Mongoose юу вэ?", options: ["ODM", "ORM", "Database", "Framework"], answer: 0 },
    { q: "Заавал талбар?", options: ["required: true", "must: true", "notNull", "index"], answer: 0 },
    { q: "createdAt автоматаар?", options: ["timestamps: true", "auto: true", "dates: true", "гараар"], answer: 0 },
    { q: "Хадгалахын өмнөх hook?", options: ['pre("save")', 'post("save")', "beforeSave", "onSave"], answer: 0 },
    { q: "findByIdAndUpdate-д validation?", options: ["Автомат", "runValidators: true хэрэгтэй", "Ажиллахгүй", "Заавал биш"], answer: 1 },
    { q: "E11000 юу вэ?", options: ["Холболт тасарсан", "Давхардсан түлхүүр", "Validation", "Timeout"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Mongoose = схем + validation + hook + populate.",
    "`virtual` = тооцоологдох талбар, query хийж болохгүй.",
    "`pre(\"save\")` нь update-д ажиллахгүй; `isModified` заавал шалга.",
    "`findByIdAndUpdate`-д `runValidators: true` нэм.",
    "`11000` = давхардал → 409. `CastError` = буруу ObjectId → 400.",
    "HMR-ээс `mongoose.models.X ?? ...`-аар хамгаал.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Model** — схемээ бодит хэрэглээнд оруулна." },
];

// ===== m6l9 — Model =====
export const m6l9: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Model-ийг зөв зохион байгуулж, харилцан хамаарлыг тодорхойлж, дахин ашиглагдах query бичиж сурна." },

  { type: "h", text: "Онол — Model гэж юу вэ?" },
  { type: "code", lang: "text", code: `Схем (Schema)  =  Барилгын зураг     "хоол ямар талбартай вэ"
Model          =  Барилгын компани   "хоолтой ажиллах хэрэгсэл"
Document       =  Барилга            "нэг тодорхой хоол"

const schema = new Schema({ ... });               ← зураг
const Food = mongoose.model("Food", schema);      ← компани
const pizza = await Food.create({ ... });         ← барилга`, },

  { type: "h", text: "Food Delivery-ийн бүх model" },
  { type: "code", lang: "ts", code: `// models/User.ts
const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },   // ⚠ select: false
  role: { type: String, enum: ["user", "admin"], default: "user" },
  addresses: [{                                    // EMBED — цөөхөн
    label: String,
    district: String,
    detail: String,
    phone: String,
  }],
}, { timestamps: true });`, },
  { type: "callout", variant: "tip", title: "select: false гэж юу вэ?", text: "Энэ талбар анхдагчаар query-д ОРОХГҮЙ. Нууц үг санамсаргүй хариунд орох эрсдэлийг арилгана. Хэрэгтэй үед `.select(\"+password\")` гэж тусгайлан асууна." },
  { type: "code", lang: "ts", code: `// models/Category.ts
const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true, lowercase: true },
  image: String,
  order: { type: Number, default: 0 },       // харагдах дараалал
}, { timestamps: true });

// models/Food.ts
const foodSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 90 },
  image: String,
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

// Нийлмэл индекс — хамт хайдаг талбарууд
foodSchema.index({ categoryId: 1, isAvailable: 1 });
foodSchema.index({ name: "text", description: "text" });`, },
  { type: "code", lang: "ts", code: `// models/Order.ts
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },

  items: [{                                  // EMBED + хөлдөөсөн утга
    foodId: { type: Schema.Types.ObjectId, ref: "Food", required: true },
    name: { type: String, required: true },     // хөлдөөсөн
    price: { type: Number, required: true },    // хөлдөөсөн
    qty: { type: Number, required: true, min: 1 },
  }],

  address: {
    district: { type: String, required: true },
    detail: { type: String, required: true },
    phone: { type: String, required: true },
  },

  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending", "preparing", "delivering", "delivered", "cancelled"],
    default: "pending",
    index: true,
  },

  paymentMethod: { type: String, enum: ["cash", "card", "qpay"], default: "cash" },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

orderSchema.index({ userId: 1, createdAt: -1 });   // "миний захиалгууд"`, },

  { type: "h", text: "Хамаарлын төрлүүд" },
  { type: "code", lang: "text", code: `1-to-1     User ↔ Profile
           → profileId эсвэл embed

1-to-many  Category → олон Food
           → Food дотор categoryId (олон талд заана) ✓
           → Category дотор foodIds массив (өсдөг тул муу) ✗

many-to-many  Food ↔ Tag
           → Food дотор tagIds массив (цөөхөн бол)
           → эсвэл FoodTag дундын collection (олон бол)`, },
  { type: "callout", variant: "tip", title: "Дүрэм: \"олон\" талд заа", text: "Category доторх `foodIds` массив нь хязгааргүй өснө. Food доторх `categoryId` нь үргэлж нэг утга. Тиймээс үргэлж \"олон\" талд reference хадгал." },

  { type: "h", text: "Дахин ашиглагдах query" },
  { type: "code", lang: "ts", code: `// Статик методоор нийтлэг query-г нэг газар
foodSchema.statics.findAvailable = function (categoryId?: string) {
  const filter: Record<string, unknown> = { isAvailable: true };
  if (categoryId) filter.categoryId = categoryId;
  return this.find(filter).sort({ createdAt: -1 });
};

orderSchema.statics.findByUser = function (userId: string, limit = 20) {
  return this.find({ userId }).sort({ createdAt: -1 }).limit(limit).lean();
};

// Ашиглах
const foods = await Food.findAvailable(catId);
const myOrders = await Order.findByUser(userId);`, },

  { type: "h", text: "Тоолуур шинэчлэх — атомик үйлдэл" },
  { type: "code", lang: "ts", code: `// ✗ БУРУУ — уралдаан (race condition)
const food = await Food.findById(id);
food.reviewCount = food.reviewCount + 1;
await food.save();
// 2 хүн зэрэг сэтгэгдэл бичвэл нэг нь алдагдана

// ✓ ЗӨВ — атомик $inc
await Food.findByIdAndUpdate(id, { $inc: { reviewCount: 1 } });

// Дундаж үнэлгээ шинэчлэх
await Food.findByIdAndUpdate(id, [
  {
    $set: {
      rating: {
        $divide: [
          { $add: [{ $multiply: ["$rating", "$reviewCount"] }, newRating] },
          { $add: ["$reviewCount", 1] },
        ],
      },
      reviewCount: { $add: ["$reviewCount", 1] },
    },
  },
]);`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "ref-ийн нэр таарахгүй", text: "`ref: \"Category\"` нь `mongoose.model(\"Category\", ...)`-тэй ЯГ таарах ёстой. `\"categories\"` гэж бичвэл populate ажиллахгүй." },
  { type: "callout", variant: "error", title: "Нууц үг хариунд орсон", text: "`select: false` тавь. Мөн `toJSON` transform-оор хас." },
  { type: "callout", variant: "warn", title: "Индекс байхгүй", text: "`categoryId`, `userId` зэрэг байнга хайдаг талбарт индекс тавь. 10,000 баримтаас хойш ялгаа мэдэгдэнэ." },
  { type: "callout", variant: "error", title: "Тоолуурыг гараар нэмэх", text: "`x.count = x.count + 1; save()` нь уралдаанд алдагдана. `$inc` ашигла." },
  { type: "callout", variant: "warn", title: "Хязгааргүй өсдөг массив", text: "`user.orderIds` шиг массив 16MB хязгаарт хүрнэ. Order дотор `userId` хадгал." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `User`, `Category`, `Food`, `Order` 4 model бич.",
    "Дунд: Нууц үгэнд `select: false` тавьж туршиж үз.",
    "Дунд: Байнга хайдаг талбарт индекс нэм.",
    "Хүнд: `findAvailable`, `findByUser` статик метод бич.",
    "Хүнд: `$inc`-ээр тоолуур шинэчилж уралдаанаас сэргийл.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Schema, Model, Document гурвын ялгаа юу вэ?",
    "`select: false` юу хийдэг вэ?",
    "1-to-many хамаарлыг аль талд хадгалах вэ, яагаад?",
    "Статик метод юунд хэрэгтэй вэ?",
    "`$inc` яагаад гараар нэмэхээс дээр вэ?",
    "Индексийг хаана тавих вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Model-ийг юунаас үүсгэдэг вэ?", options: ["Schema", "Document", "Collection", "Query"], answer: 0 },
    { q: "Хамаарал зааж өгөх талбар?", options: ["ref", "link", "join", "relation"], answer: 0 },
    { q: "Нууц үгийг хариунаас нуух?", options: ["hidden: true", "select: false", "private: true", "secret"], answer: 1 },
    { q: "1-to-many-г аль талд хадгалах вэ?", options: ["\"нэг\" талд массив", "\"олон\" талд id", "Хоёуланд", "Хамаагүй"], answer: 1 },
    { q: "Тоолуур нэмэх атомик оператор?", options: ["$set", "$inc", "$push", "$add"], answer: 1 },
    { q: "Индекс юу өгөх вэ?", options: ["Хурдан query", "Бага зай", "Аюулгүй", "Validation"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Schema = зураг · Model = хэрэгсэл · Document = нэг баримт.",
    "`select: false`-ээр нууц талбарыг нуу.",
    "1-to-many: \"олон\" талд `ref` хадгал.",
    "Статик методоор давхардсан query-г нэгтгэ.",
    "Тоолуурт `$inc` — гараар нэмбэл уралдаанд алдагдана.",
    "Байнга хайдаг талбарт индекс.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Render.io (Deployment)** — backend-ээ интернэтэд гаргана." },
];

// ===== m6l10 — Render.io (Deployment) =====
export const m6l10: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Backend-ээ Render дээр байршуулж, орчны хувьсагч тохируулж, түгээмэл deployment алдаануудыг шийдэж сурна." },

  { type: "h", text: "Онол — Deployment гэж юу вэ?" },
  { type: "p", text: "Локал компьютер дээр ажиллаж буй кодыг **интернэтээс хандах боломжтой сервер** дээр байрлуулах. Локал `localhost:3000` бол зөвхөн чиний машин дээр." },
  { type: "code", lang: "text", code: `Frontend (Next.js)  →  Vercel
Backend (Express)   →  Render / Railway / Fly.io
Database            →  MongoDB Atlas
Зураг               →  Cloudinary

Next.js бүхэлдээ    →  Vercel (frontend + API нэг дор)`, },

  { type: "h", text: "Render дээр байршуулах" },
  { type: "ol", items: [
    "Кодоо GitHub руу push хий (`.env` файлыг **БҮҮ** оруул).",
    "render.com → бүртгүүл → **New → Web Service**.",
    "GitHub repo-гоо холбо.",
    "**Build Command**: `npm install && npm run build` (эсвэл зөвхөн `npm install`).",
    "**Start Command**: `npm start`.",
    "**Environment** таб → орчны хувьсагчаа нэг бүрчлэн нэм.",
    "**Create Web Service** → лог хараад дуусахыг хүлээ.",
  ] },
  { type: "code", lang: "json", code: `// package.json — ЗААВАЛ зөв байх ёстой
{
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"          ← Render үүнийг дуудна
  },
  "engines": {
    "node": ">=20.0.0"                 ← Node хувилбарыг тогтоо
  }
}`, },
  { type: "code", lang: "js", code: `// index.js — порт ба host заавал зөв
const PORT = process.env.PORT || 3000;
//           ↑ Render өөрөө PORT өгнө. Хатуу 3000 бичвэл АЖИЛЛАХГҮЙ

app.listen(PORT, "0.0.0.0", () => {
  //              ↑ бүх интерфэйсээс сонсоно (заавал)
  console.log(\`Сервер \${PORT} дээр\`);
});`, },
  { type: "callout", variant: "error", title: "Хамгийн түгээмэл 2 deployment алдаа", text: "(1) `process.env.PORT` ашиглаагүй — Render порт өгдөг, чиний 3000 сонсогдохгүй. (2) `\"0.0.0.0\"` заагаагүй — зөвхөн localhost сонсож, гаднаас хандахгүй." },

  { type: "h", text: "Орчны хувьсагч" },
  { type: "code", lang: "bash", code: `# Render → Environment таб дээр нэмнэ
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/foodapp
JWT_SECRET=урт_санамсаргүй_мөр_дор_хаяж_32_тэмдэгт
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=https://my-app.vercel.app
NODE_ENV=production`, },
  { type: "code", lang: "bash", code: `# Хүчтэй нууц үүсгэх
openssl rand -base64 32
# эсвэл
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`, },
  { type: "callout", variant: "error", title: ".env файлыг GitHub-д бүү оруул", text: "`.gitignore`-д `.env*` байгаа эсэхийг шалга. Санамсаргүй оруулсан бол: тэр даруйд бүх key/нууц үгээ СОЛИ. Түүхээс устгасан ч хэн нэгэн харсан байж болно." },

  { type: "h", text: "CORS — frontend холбогдохгүй бол" },
  { type: "code", lang: "js", code: `import cors from "cors";

const allowed = [
  process.env.FRONTEND_URL,          // production
  "http://localhost:3000",           // dev
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Postman зэрэг origin-гүй хүсэлтийг зөвшөөрнө
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error("CORS: зөвшөөрөгдөөгүй домэйн"));
  },
  credentials: true,
}));`, },

  { type: "h", text: "Health check ба унтах асуудал" },
  { type: "code", lang: "js", code: `// Render үүнийг ашиглаж сервер амьд эсэхийг шалгана
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});`, },
  { type: "callout", variant: "warn", title: "Үнэгүй багц 15 минутын дараа унтдаг", text: "Render-ийн үнэгүй сервис 15 мин хөдөлгөөнгүй бол унтаж, дараагийн хүсэлт 30-50 секунд хүлээнэ. Шийдэл: төлбөртэй багц, эсвэл 10 минут тутам `/health` рүү ping хийх (cron-job.org үнэгүй)." },

  { type: "h", text: "Production-д бэлтгэх" },
  { type: "code", lang: "js", code: `// 1) Аюулгүйн header
import helmet from "helmet";
app.use(helmet());

// 2) Хариуг шахах
import compression from "compression";
app.use(compression());

// 3) Body хэмжээ хязгаарлах
app.use(express.json({ limit: "1mb" }));

// 4) Rate limit
import rateLimit from "express-rate-limit";
app.use("/api", rateLimit({ windowMs: 60_000, max: 100 }));

// 5) Алдааны лог — production-д дэлгэрэнгүй бүү харуул
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production"
      ? "Серверийн алдаа"
      : err.message,
  });
});`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Application failed to respond", text: "`process.env.PORT` ашиглаагүй эсвэл `\"0.0.0.0\"` заагаагүй. Хоёуланг нь зас." },
  { type: "callout", variant: "error", title: "Cannot find module", text: "Сан `devDependencies`-д байна. Production-д суудаггүй. `dependencies` руу зөөх: `npm i --save <нэр>`." },
  { type: "callout", variant: "error", title: "MongoServerError: bad auth", text: "Render дээрх `MONGODB_URI` буруу, эсвэл Atlas Network Access-д Render-ийн IP байхгүй. `0.0.0.0/0` нэм." },
  { type: "callout", variant: "error", title: "CORS блоклож байна", text: "`FRONTEND_URL`-ыг Render-д тохируулаагүй, эсвэл сүүлд `/` тэмдэгттэй бичсэн (`https://app.com/` ≠ `https://app.com`)." },
  { type: "callout", variant: "warn", title: "Эхний хүсэлт маш удаан", text: "Үнэгүй багцын унтах зан. Health check ping тохируул." },
  { type: "callout", variant: "error", title: "Build амжилтгүй — файл олдохгүй", text: "Linux нь үсгийн том жижгийг ялгадаг. `Button.tsx` ≠ `button.tsx`. macOS/Windows дээр ажиллаад Linux дээр унана." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `package.json`-д `start` script болон `engines` нэм.",
    "Дунд: `process.env.PORT` ба `\"0.0.0.0\"` ашигла.",
    "Дунд: Render дээр орчны хувьсагчаа бүгдийг нэм.",
    "Хүнд: CORS-ыг зөвхөн өөрийн frontend домэйнд зөвшөөр.",
    "Хүнд: `/health` endpoint нэмж 10 мин тутам ping тохируул.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Яагаад `process.env.PORT` ашиглах ёстой вэ?",
    "`\"0.0.0.0\"` юу гэсэн үг вэ?",
    "Нууц мэдээллийг хаана хадгалах вэ?",
    "`.env` санамсаргүй GitHub-д орвол юу хийх вэ?",
    "Үнэгүй багцын гол сул тал юу вэ?",
    "Linux дээр build унах түгээмэл шалтгаан юу вэ?",
    "Production-д алдааны дэлгэрэнгүйг яагаад нуух вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Портыг яаж авах вэ?", options: ["Хатуу 3000", "process.env.PORT", "random", "8080"], answer: 1 },
    { q: "Нууц мэдээлэл хаана вэ?", options: ["Код дотор", "Environment variables", "GitHub", "README"], answer: 1 },
    { q: "Render Start Command?", options: ["npm run dev", "npm start", "node .", "npm test"], answer: 1 },
    { q: "Cannot find module шалтгаан?", options: ["devDependencies-д байна", "Интернэт", "Порт", "CORS"], answer: 0 },
    { q: "Үнэгүй багц хэдэн минутын дараа унтдаг вэ?", options: ["5", "15", "60", "Унтдаггүй"], answer: 1 },
    { q: "Linux дээр build унах шалтгаан?", options: ["Файлын нэрийн үсгийн ялгаа", "RAM", "Node хувилбар", "Интернэт"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`process.env.PORT` + `\"0.0.0.0\"` — хоёулаа заавал.",
    "Нууцыг Environment Variables-д, `.env`-ыг GitHub-д хэзээ ч бүү оруул.",
    "`start` script, `engines`, `dependencies` зөв эсэхийг шалга.",
    "CORS-д frontend домэйнээ (сүүлийн `/`-гүй) нэм.",
    "Үнэгүй багц унтдаг — health check ping.",
    "Linux үсгийн том жижгийг ялгадаг.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Mongoose population** — reference-ийг дүүргэж холбоотой өгөгдөл татна." },
];

// ===== m6l11 — Mongoose population =====
export const m6l11: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`populate()`-ээр холбоотой өгөгдлийг татаж, шүүж, гүнзгийрүүлж, гүйцэтгэлийн эрсдэлээс сэргийлж сурна." },

  { type: "h", text: "Онол — Асуудал" },
  { type: "code", lang: "ts", code: `// DB-д зөвхөн id хадгалагдсан байна
const food = await Food.findById(id).lean();
console.log(food);
// { _id: ..., name: "Пицца", categoryId: ObjectId("65a...") }
//                            ↑ хэрэглэгчид "65a1b2c3..." гэж харуулах уу?

// Гараар татвал 2 query
const category = await Category.findById(food.categoryId);
console.log(category.name);   // "Пицца"`, },
  { type: "p", text: "`populate()` нь үүнийг автоматаар хийж, объектыг **id-ийн оронд шууд оруулж** өгнө." },

  { type: "h", text: "Үндсэн хэрэглээ" },
  { type: "code", lang: "ts", code: `const food = await Food.findById(id).populate("categoryId").lean();

// Одоо:
// {
//   _id: ...,
//   name: "Пицца",
//   categoryId: { _id: ..., name: "Пицца", slug: "pizza", image: "..." }
//                 ↑ бүтэн объект болов
// }

console.log(food.categoryId.name);   // "Пицца"`, },
  { type: "callout", variant: "error", title: "ref байхгүй бол ажиллахгүй", text: "Схемд `ref: \"Category\"` заасан байх ЁСТОЙ. `ref`-ийн нэр нь `mongoose.model(\"Category\", ...)`-ийн эхний аргументтэй ЯГ таарна." },

  { type: "h", text: "Зөвхөн хэрэгтэй талбарыг" },
  { type: "code", lang: "ts", code: `// Бүх талбарыг татах нь дэмий — зөвхөн хэрэгтэйг нь
await Food.find()
  .populate("categoryId", "name slug")        // зөвхөн 2 талбар
  .lean();

// Объект хэлбэрээр — илүү тодорхой
await Food.find()
  .populate({
    path: "categoryId",
    select: "name slug -_id",                 // -_id = _id-г хасах
  })
  .lean();`, },

  { type: "h", text: "Олон талбарыг зэрэг" },
  { type: "code", lang: "ts", code: `const order = await Order.findById(id)
  .populate("userId", "name email phone")
  .populate("items.foodId", "name image")     // массив доторх reference
  .lean();

// Массиваар ч болно
await Order.findById(id).populate([
  { path: "userId", select: "name email" },
  { path: "items.foodId", select: "name image" },
]);`, },

  { type: "h", text: "Үүрлэсэн populate (гүн)" },
  { type: "code", lang: "ts", code: `// Захиалга → хоол → түүний ангилал
await Order.findById(id).populate({
  path: "items.foodId",
  select: "name image categoryId",
  populate: {                                 // ← дотор нь дахин
    path: "categoryId",
    select: "name",
  },
});`, },
  { type: "callout", variant: "warn", title: "Гүн populate үнэтэй", text: "Давхарга бүр нэмэлт query. 3 давхар populate = 4 query. Заавал хэрэгтэй эсэхээ бод — ихэнхдээ нэрийг нь захиалгад хуулж хадгалсан нь дээр." },

  { type: "h", text: "Populate + шүүлт" },
  { type: "code", lang: "ts", code: `// match — populate хийсний ДАРАА шүүнэ
await Order.find()
  .populate({
    path: "items.foodId",
    match: { isAvailable: true },      // боломжгүй бол null болно
    select: "name price",
  });

// ⚠ Анхаар: match таарахгүй бол тэр талбар null болно, баримт өөрөө үлдэнэ
// Хэрэв "тэр өгөгдөлтэй баримтуудыг л" авах бол шүүх хэрэгтэй:
const orders = await Order.find().populate({ path: "userId", match: { role: "admin" } });
const adminOrders = orders.filter((o) => o.userId !== null);`, },

  { type: "h", text: "Virtual populate — эсрэг чиглэлд" },
  { type: "code", lang: "ts", code: `// Category дотор foodIds БАЙХГҮЙ ч, түүний хоолнуудыг авмаар байна
categorySchema.virtual("foods", {
  ref: "Food",
  localField: "_id",              // Category-ийн _id
  foreignField: "categoryId",     // Food-ийн categoryId
});

// Схемд virtual-ыг JSON-д оруулахыг заа
categorySchema.set("toJSON", { virtuals: true });
categorySchema.set("toObject", { virtuals: true });

// Ашиглах
const cat = await Category.findById(id).populate("foods");
console.log(cat.foods);          // тухайн ангилалын бүх хоол

// Зөвхөн тоог нь
categorySchema.virtual("foodCount", {
  ref: "Food",
  localField: "_id",
  foreignField: "categoryId",
  count: true,                    // ← зөвхөн тоо
});`, },

  { type: "h", text: "Гүйцэтгэл — populate vs хуулбарлах" },
  { type: "code", lang: "text", code: `Хэзээ populate?
✓ Өгөгдөл байнга өөрчлөгддөг (хоолны нэр, зураг)
✓ Ховор уншигддаг (админ хуудас)
✓ Хамгийн сүүлийн утга хэрэгтэй

Хэзээ хуулбарлах (denormalize)?
✓ Байнга уншигддаг (жагсаалт)
✓ Түүхэн утга хэрэгтэй (захиалгын үнэ)
✓ Өөрчлөгдөх нь ховор

Жишээ — Order.items:
{ foodId, name, price, qty }
  ↑ id     ↑ хуулбар — populate хэрэггүй, түүх ч хадгалагдана ✓`, },
  { type: "code", lang: "ts", code: `// populate үнэхээр удаан бол aggregate ашиглаж болно
const orders = await Order.aggregate([
  { $match: { userId: new mongoose.Types.ObjectId(userId) } },
  {
    $lookup: {
      from: "users",              // ⚠ collection нэр (олон тоо, жижиг үсэг)
      localField: "userId",
      foreignField: "_id",
      as: "user",
      pipeline: [{ $project: { name: 1, email: 1 } }],
    },
  },
  { $unwind: "$user" },
]);`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "populate ажиллахгүй / null буцаана", text: "(1) Схемд `ref` байхгүй. (2) `ref`-ийн нэр model-ийн нэртэй таарахгүй. (3) Заасан баримт устсан." },
  { type: "callout", variant: "error", title: "Schema hasn't been registered for model", text: "Populate хийж буй model-ыг импортлоогүй. Тухайн model файлыг дор хаяж нэг удаа import хий." },
  { type: "callout", variant: "warn", title: "Бүх талбарыг populate хийх", text: "Хэрэглэгчийн нууц үг ч орж ирж болзошгүй. `select` заавал заа." },
  { type: "callout", variant: "error", title: "N+1 — давталт дотор populate", text: "`for (const o of orders) await o.populate(...)` — маш удаан. Query-д нэг удаа `.populate()` дууд." },
  { type: "callout", variant: "warn", title: "lean() + virtual", text: "`.lean()` ашиглавал virtual-ууд орохгүй. Хэрэгтэй бол `.lean()`-гүй, эсвэл `mongoose-lean-virtuals` плагин." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `Food`-ийн `categoryId`-г populate хийж нэрийг харуул.",
    "Дунд: `select`-ээр зөвхөн 2 талбар ав.",
    "Дунд: `Order`-т `userId` болон `items.foodId` хоёуланг populate хий.",
    "Хүнд: Virtual populate-ээр Category → foods холбоо үүсгэ.",
    "Хүнд: `$lookup`-той aggregate бичиж populate-тай харьцуул.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "`populate()` юу хийдэг вэ?",
    "Схемд юу байх ёстой вэ?",
    "`select` яагаад чухал вэ?",
    "Virtual populate юунд хэрэгтэй вэ?",
    "Хэзээ populate биш хуулбарлах нь дээр вэ?",
    "`match` ямар онцлогтой вэ?",
    "`.lean()` populate-д хэрхэн нөлөөлдөг вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "populate юу хийдэг вэ?", options: ["id-г бүтэн объектоор солино", "Устгана", "Хадгална", "Шүүнэ"], answer: 0 },
    { q: "Схемд заавал байх талбар?", options: ["ref", "link", "populate", "join"], answer: 0 },
    { q: "Зөвхөн зарим талбар авах?", options: ["select", "filter", "pick", "only"], answer: 0 },
    { q: "Эсрэг чиглэлийн холбоо?", options: ["virtual populate", "reverse", "backref", "$lookup only"], answer: 0 },
    { q: "Захиалгын хоолны нэрийг яах вэ?", options: ["Үргэлж populate", "Хуулж хадгалах", "Аль нь ч биш", "Virtual"], answer: 1 },
    { q: "Aggregate-д JOIN оператор?", options: ["$join", "$lookup", "$populate", "$ref"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "`populate()` = id-г бүтэн объектоор солино. Схемд `ref` заавал.",
    "`select`-ээр хэрэгтэй талбарыг л ав.",
    "Үүрлэсэн populate үнэтэй — 3 давхар = 4 query.",
    "Virtual populate — эсрэг чиглэлийн холбоо.",
    "Түүхэн утгыг populate биш ХУУЛЖ хадгал.",
    "Aggregate-д `$lookup`.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Mongoose Aggregate** — нийлмэл тайлан, статистик." },
];

// ===== m6l12 — Mongoose Aggregate =====
export const m6l12: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Aggregation pipeline-ийн үе шатуудыг ойлгож, бодит тайлан, статистик гаргаж сурна." },

  { type: "h", text: "Онол — Pipeline гэж юу вэ?" },
  { type: "p", text: "**Aggregation** нь өгөгдлийг **конвейер (pipeline)**-ээр дамжуулж боловсруулах систем. Үе шат бүр өмнөхийн үр дүнг авч, өөрчилж, дараагийнх руу дамжуулна." },
  { type: "code", lang: "text", code: `Бүх захиалга (10,000)
  ↓ $match      энэ сарынх     → 800
  ↓ $unwind     барaа тус бүр  → 2,400
  ↓ $group      хоолоор нэгтгэ → 45
  ↓ $sort       борлуулалтаар  → 45
  ↓ $limit      эхний 10       → 10
Үр дүн: хамгийн их зарагдсан 10 хоол`, },
  { type: "callout", variant: "tip", title: "Яагаад aggregate вэ?", text: "\"Энэ сарын нийт орлого\", \"хамгийн их зарагдсан хоол\", \"өдөр тутмын борлуулалт\" зэргийг `find()`-ээр гаргаж болохгүй. Бүх өгөгдлийг татаад JS-д тооцоолвол удаан бөгөөд санах ой их иднэ. Aggregate нь DB дээр тооцоолно." },

  { type: "h", text: "Үндсэн үе шатууд" },
  { type: "code", lang: "ts", code: `await Order.aggregate([
  // 1) $match — шүүнэ (find шиг). ЭХЭНД тавь — өгөгдөл багасна
  { $match: { status: "delivered", createdAt: { $gte: startOfMonth } } },

  // 2) $group — нэгтгэнэ
  {
    $group: {
      _id: "$userId",                       // юугаар бүлэглэх
      orderCount: { $sum: 1 },              // тоо
      totalSpent: { $sum: "$total" },       // нийлбэр
      avgOrder: { $avg: "$total" },         // дундаж
      maxOrder: { $max: "$total" },         // хамгийн их
      firstOrder: { $min: "$createdAt" },   // хамгийн эрт
    },
  },

  // 3) $sort — эрэмбэлнэ
  { $sort: { totalSpent: -1 } },

  // 4) $limit — хязгаарлана
  { $limit: 10 },

  // 5) $project — талбар сонгож нэрлэнэ
  {
    $project: {
      _id: 0,                               // хасах
      userId: "$_id",                       // нэр солих
      orderCount: 1,
      totalSpent: 1,
      avgOrder: { $round: ["$avgOrder", 0] },
    },
  },
]);`, },
  { type: "callout", variant: "error", title: "$match-ыг ЭХЭНД тавь", text: "Эхэнд тавьвал индекс ашиглагдаж, дараагийн үе шатууд бага өгөгдөлтэй ажиллана. Сүүлд тавьбал бүх өгөгдлийг боловсруулаад дараа нь шүүх болно — олон дахин удаан." },

  { type: "h", text: "$unwind — массивыг задлах" },
  { type: "code", lang: "text", code: `Өмнө нь (1 баримт):
{ _id: "o1", items: [{ name: "Пицца", qty: 2 }, { name: "Кола", qty: 1 }] }

$unwind: "$items" дараа (2 баримт):
{ _id: "o1", items: { name: "Пицца", qty: 2 } }
{ _id: "o1", items: { name: "Кола", qty: 1 } }

→ Одоо барaа тус бүрээр бүлэглэж болно`, },
  { type: "code", lang: "ts", code: `// Хамгийн их зарагдсан 10 хоол
const topFoods = await Order.aggregate([
  { $match: { status: "delivered" } },
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.foodId",
      name: { $first: "$items.name" },
      totalQty: { $sum: "$items.qty" },
      revenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } },
    },
  },
  { $sort: { totalQty: -1 } },
  { $limit: 10 },
]);`, },

  { type: "h", text: "Огноогоор бүлэглэх" },
  { type: "code", lang: "ts", code: `// Өдөр тутмын борлуулалт
const daily = await Order.aggregate([
  { $match: { createdAt: { $gte: from, $lt: to }, status: "delivered" } },
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      orders: { $sum: 1 },
      revenue: { $sum: "$total" },
    },
  },
  { $sort: { _id: 1 } },
]);
// [{ _id: "2026-07-01", orders: 23, revenue: 580000 }, ...]

// Сараар
{ $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, ... } }

// Долоо хоногийн өдрөөр (1=Ням)
{ $group: { _id: { $dayOfWeek: "$createdAt" }, ... } }`, },

  { type: "h", text: "$lookup — JOIN" },
  { type: "code", lang: "ts", code: `await Order.aggregate([
  { $match: { status: "delivered" } },
  {
    $lookup: {
      from: "users",              // ⚠ COLLECTION нэр (олон тоо, жижиг үсэг)
      localField: "userId",
      foreignField: "_id",
      as: "user",                 // массив болж ирнэ
      pipeline: [{ $project: { name: 1, email: 1 } }],
    },
  },
  { $unwind: "$user" },           // массивыг объект болгоно
  {
    $project: {
      total: 1,
      "user.name": 1,
      "user.email": 1,
    },
  },
]);`, },
  { type: "callout", variant: "error", title: "from нь MODEL нэр биш COLLECTION нэр", text: "`mongoose.model(\"User\", ...)` → collection нь `users` (олон тоо, жижиг үсэг). `from: \"User\"` гэж бичвэл хоосон массив ирнэ, алдаа ч өгөхгүй." },

  { type: "h", text: "$facet — олон тайланг зэрэг" },
  { type: "code", lang: "ts", code: `// Нэг query-ээр dashboard-ийн бүх өгөгдөл
const [dashboard] = await Order.aggregate([
  { $match: { createdAt: { $gte: startOfMonth } } },
  {
    $facet: {
      summary: [
        { $group: { _id: null, orders: { $sum: 1 }, revenue: { $sum: "$total" } } },
      ],
      byStatus: [
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ],
      topFoods: [
        { $unwind: "$items" },
        { $group: { _id: "$items.name", qty: { $sum: "$items.qty" } } },
        { $sort: { qty: -1 } },
        { $limit: 5 },
      ],
      daily: [
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            revenue: { $sum: "$total" },
          },
        },
        { $sort: { _id: 1 } },
      ],
    },
  },
]);

console.log(dashboard.summary[0]);   // { orders: 234, revenue: 5800000 }
console.log(dashboard.topFoods);     // [{ _id: "Пицца", qty: 89 }, ...]`, },

  { type: "h", text: "Нөхцөлт тооцоолол" },
  { type: "code", lang: "ts", code: `{
  $group: {
    _id: null,
    total: { $sum: 1 },
    delivered: { $sum: { $cond: [{ $eq: ["$status", "delivered"] }, 1, 0] } },
    cancelled: { $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] } },
  },
}

// $switch — олон нөхцөл
{
  $project: {
    tier: {
      $switch: {
        branches: [
          { case: { $gte: ["$totalSpent", 500000] }, then: "gold" },
          { case: { $gte: ["$totalSpent", 200000] }, then: "silver" },
        ],
        default: "bronze",
      },
    },
  },
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "ObjectId-г string-ээр харьцуулах", text: "`$match: { userId: \"65a1...\" }` ажиллахгүй. `new mongoose.Types.ObjectId(userId)` гэж хөрвүүл." },
  { type: "callout", variant: "error", title: "$lookup хоосон буцаана", text: "`from` нь collection нэр (`users`), model нэр (`User`) биш." },
  { type: "callout", variant: "warn", title: "$match-ыг сүүлд тавих", text: "Гүйцэтгэл олон дахин муудна. Эхэнд тавь." },
  { type: "callout", variant: "error", title: "$unwind-ийн дараа тоо буруу", text: "`$unwind` баримтын тоог үржүүлдэг. Захиалгын тоог `$unwind`-ийн ДАРАА `$sum: 1` гэж тоолвол барaаны тоо гарна. `$addToSet` эсвэл өмнө нь тоол." },
  { type: "callout", variant: "warn", title: "Aggregate нь Mongoose схемийг тоохгүй", text: "Хариу нь энгийн объект — virtual, getter, төрөл хөрвүүлэлт ажиллахгүй. Гараар боловсруул." },
  { type: "callout", variant: "error", title: "Санах ойн хязгаар", text: "Үе шат тус бүр 100MB хязгаартай. `{ allowDiskUse: true }` нэм, эсвэл `$match`-ээр эрт багасга." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `$match` + `$group`-ээр нийт орлогыг гарга.",
    "Дунд: `$unwind` + `$group`-ээр хамгийн их зарагдсан 5 хоол ол.",
    "Дунд: `$dateToString`-ээр өдөр тутмын борлуулалт гарга.",
    "Хүнд: `$lookup`-оор хэрэглэгчийн нэрийг захиалгад нэм.",
    "Хүнд: `$facet`-ээр dashboard-ийн 4 тайланг нэг query-д багтаа.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Aggregation pipeline гэж юу вэ?",
    "Яагаад `$match`-ыг эхэнд тавих ёстой вэ?",
    "`$unwind` юу хийдэг вэ, ямар гаж нөлөөтэй вэ?",
    "`$lookup`-ийн `from`-д юу бичих вэ?",
    "`$facet` юунд хэрэгтэй вэ?",
    "ObjectId-г `$match`-д яаж харьцуулах вэ?",
    "Aggregate нь Mongoose схемийг ашигладаг уу?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Шүүх үе шат?", options: ["$match", "$group", "$sort", "$project"], answer: 0 },
    { q: "Нэгтгэх үе шат?", options: ["$match", "$group", "$limit", "$unwind"], answer: 1 },
    { q: "Массивыг задлах?", options: ["$unwind", "$split", "$flat", "$array"], answer: 0 },
    { q: "JOIN хийх?", options: ["$join", "$lookup", "$populate", "$merge"], answer: 1 },
    { q: "$match-ыг хаана тавих вэ?", options: ["Эхэнд", "Сүүлд", "Дунд", "Хамаагүй"], answer: 0 },
    { q: "Олон тайланг зэрэг?", options: ["$facet", "$multi", "$parallel", "$all"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Aggregate = үе шаттай конвейер. DB дээр тооцоолно.",
    "`$match` ЭХЭНД — индекс ашиглана, өгөгдөл багасна.",
    "`$group` нэгтгэнэ, `$unwind` массив задална (тоо үржинэ).",
    "`$lookup`-ийн `from` = collection нэр (олон тоо).",
    "`$facet`-ээр олон тайланг нэг query-д.",
    "ObjectId-г `new mongoose.Types.ObjectId()`-ээр хөрвүүл.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**useContext** — frontend-д глобал төлөв удирдана." },
];

// ===== m6l13 — useContext =====
export const m6l13: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Context API-аар глобал төлөв хуваалцаж, prop drilling-ээс салж, гүйцэтгэлийн зангаас сэргийлж сурна." },

  { type: "h", text: "Онол — Prop drilling асуудал" },
  { type: "code", lang: "text", code: `App (cart байна)
 └── Layout (cart хэрэггүй ч дамжуулна)
      └── Header (cart хэрэггүй ч дамжуулна)
           └── Nav (cart хэрэггүй ч дамжуулна)
                └── CartIcon (ЭНД хэрэгтэй!)

→ 3 component дэмий prop дамжуулна
→ Шинэ талбар нэмэхэд 4 газар засах ёстой`, },
  { type: "code", lang: "tsx", code: `// ✗ Prop drilling
<Layout cart={cart} setCart={setCart}>
  <Header cart={cart} setCart={setCart}>
    <Nav cart={cart} setCart={setCart}>
      <CartIcon cart={cart} setCart={setCart} />`, },

  { type: "h", text: "Context — шийдэл" },
  { type: "code", lang: "tsx", code: `// contexts/CartContext.tsx
"use client";
import { createContext, useContext, useState, useMemo, useCallback } from "react";

interface CartItem { foodId: string; name: string; price: number; qty: number }

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (foodId: string) => void;
  updateQty: (foodId: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
}

// undefined-ээр эхлүүлбэл Provider-гүй хэрэглэсэн эсэхийг барьж болно
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // useCallback — функц бүр render-т шинээр үүсэхээс сэргийлнэ
  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.foodId === item.foodId);
      if (exists) {
        return prev.map((i) =>
          i.foodId === item.foodId ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((foodId: string) => {
    setItems((prev) => prev.filter((i) => i.foodId !== foodId));
  }, []);

  const updateQty = useCallback((foodId: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.foodId === foodId ? { ...i, qty } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  // useMemo — утга бүр render-т шинэ объект болохоос сэргийлнэ
  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem,
    removeItem,
    updateQty,
    clear,
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    count: items.reduce((s, i) => s + i.qty, 0),
  }), [items, addItem, removeItem, updateQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Захиалгат hook — хэрэглэхэд хялбар, алдааг барина
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart-ыг CartProvider дотор ашиглана уу");
  }
  return ctx;
}`, },

  { type: "h", text: "Provider-ыг байрлуулах" },
  { type: "code", lang: "tsx", code: `// app/layout.tsx
import { CartProvider } from "@/contexts/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}`, },
  { type: "code", lang: "tsx", code: `// Ямар ч гүнд ашиглана — prop дамжуулах шаардлагагүй
"use client";
import { useCart } from "@/contexts/CartContext";

export function CartIcon() {
  const { count, total } = useCart();

  return (
    <button className="relative">
      🛒
      {count > 0 && (
        <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1.5 text-xs text-white">
          {count}
        </span>
      )}
    </button>
  );
}`, },

  { type: "h", text: "Гүйцэтгэлийн занга" },
  { type: "code", lang: "tsx", code: `// ✗ БУРУУ — render бүрт ШИНЭ объект → бүх хэрэглэгч дахин зурагдана
<CartContext.Provider value={{ items, addItem, total }}>

// ✓ ЗӨВ — useMemo-оор тогтворжуул
const value = useMemo(() => ({ items, addItem, total }), [items, addItem, total]);
<CartContext.Provider value={value}>`, },
  { type: "code", lang: "tsx", code: `// Байнга өөрчлөгддөг ба тогтвортойг САЛГА
const CartStateContext = createContext<CartItem[]>([]);
const CartActionsContext = createContext<Actions | undefined>(undefined);

// Зөвхөн үйлдэл хэрэгтэй component нь items өөрчлөгдөхөд дахин зурагдахгүй
export function AddButton({ food }) {
  const { addItem } = useCartActions();     // items-д захиалга өгөөгүй
  return <button onClick={() => addItem(food)}>Нэмэх</button>;
}`, },
  { type: "callout", variant: "warn", title: "Context бүх хэрэглэгчийг дахин зурдаг", text: "Context утга өөрчлөгдөхөд `useContext` дуудсан БҮХ component дахин зурагдана — `React.memo` ч аврахгүй. Тиймээс байнга өөрчлөгддөг өгөгдлийг context-д хийхээс болгоомжил." },

  { type: "h", text: "localStorage-тэй хадгалах" },
  { type: "code", lang: "tsx", code: `export function CartProvider({ children }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Ачаалахад унших — ⚠ useState-ийн эхний утгад ХИЙЖ БОЛОХГҮЙ (SSR)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // буруу JSON бол үл тоомсорло
    }
    setLoaded(true);
  }, []);

  // Өөрчлөгдөх бүрт хадгалах
  useEffect(() => {
    if (loaded) localStorage.setItem("cart", JSON.stringify(items));
  }, [items, loaded]);
  // ↑ loaded шалгахгүй бол эхний render-т хоосон массиваар дарж бичнэ!
}`, },
  { type: "callout", variant: "error", title: "Hydration алдаа", text: "`useState(() => JSON.parse(localStorage.getItem(\"cart\")))` гэж бичвэл сервер дээр `localStorage` байхгүй тул унана. `useEffect` дотор унш." },

  { type: "h", text: "Хэзээ Context, хэзээ өөр зүйл?" },
  { type: "code", lang: "text", code: `Context ашигла:
✓ Сэдэв (theme), хэл, нэвтэрсэн хэрэглэгч
✓ Сагс, мэдэгдэл — ховор өөрчлөгддөг глобал төлөв
✓ 3+ давхарт prop дамжуулах шаардлагатай

Context БҮҮ ашигла:
✗ Серверийн өгөгдөл → SWR / React Query (кэш, revalidate)
✗ Формын төлөв → React Hook Form
✗ URL-д багтах зүйл → searchParams
✗ Зөвхөн 1-2 давхарт → энгийн prop

Том, нийлмэл төлөв → Zustand, Jotai (илүү сайн гүйцэтгэл)`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "createContext only works in Client Components", text: "Context файлд `\"use client\"` заавал. Мөн түүнийг ашигладаг component-д ч." },
  { type: "callout", variant: "error", title: "Context утга undefined", text: "Provider-ээр ороогүй. `useCart`-д алдаа шидэх шалгалт бичвэл шалтгааныг шууд харна." },
  { type: "callout", variant: "warn", title: "Хэт олон дахин зурагдаж байна", text: "`value`-г `useMemo`-гүй өгсөн. Мөн state/actions-ыг 2 context болгож салга." },
  { type: "callout", variant: "error", title: "localStorage is not defined", text: "Сервер дээр байхгүй. `useEffect` дотор л ашигла." },
  { type: "callout", variant: "warn", title: "Серверийн өгөгдлийг context-д хийх", text: "Кэш, revalidate, алдаа боловсруулалт бүгдийг гараар бичих болно. SWR ашигла." },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "Сагсны context", code: `const CartContext = React.createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const add = (food) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === food.id);
      if (found) return prev.map((i) => i.id === food.id ? {...i, qty: i.qty+1} : i);
      return [...prev, { ...food, qty: 1 }];
    });
  };

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

function Badge() {
  const { count, total } = React.useContext(CartContext);
  return (
    <div style={{padding:8,background:"#eef",borderRadius:6,marginBottom:12}}>
      🛒 {count} ширхэг · {total.toLocaleString()}₮
    </div>
  );
}

function FoodList() {
  const { add } = React.useContext(CartContext);
  const foods = [
    { id:1, name:"Пицца", price:25000 },
    { id:2, name:"Бургер", price:15000 },
    { id:3, name:"Кола", price:3000 },
  ];
  return (
    <div>
      {foods.map((f) => (
        <div key={f.id} style={{display:"flex",justifyContent:"space-between",
          padding:8,borderBottom:"1px solid #eee"}}>
          <span>{f.name} — {f.price.toLocaleString()}₮</span>
          <button onClick={() => add(f)}>Нэмэх</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Badge />
      <FoodList />
      <p style={{fontSize:12,color:"#888",marginTop:8}}>
        Badge болон FoodList хооронд prop дамжуулаагүй ч холбогдож байна
      </p>
    </CartProvider>
  );
}`, },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Туршилтын сагсанд \"хасах\" товч нэм.",
    "Дунд: Тоо ширхэг өөрчлөх (+/−) хийж 0 болвол устга.",
    "Дунд: `useCart` захиалгат hook бичиж Provider-гүй үед алдаа шид.",
    "Хүнд: `useMemo` ашиглаж утгыг тогтворжуул.",
    "Хүнд: State ба Actions-ыг 2 context болгож салга.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Prop drilling гэж юу вэ?",
    "Context-ийн 3 хэсэг юу вэ?",
    "Захиалгат hook яагаад бичдэг вэ?",
    "`useMemo` яагаад чухал вэ?",
    "Context утга өөрчлөгдөхөд юу болох вэ?",
    "Серверийн өгөгдлийг яагаад context-д хийж болохгүй вэ?",
    "`localStorage`-ыг хаана унших ёстой вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Prop drilling-ийн шийдэл?", options: ["Context", "useState", "useEffect", "props"], answer: 0 },
    { q: "Context үүсгэх?", options: ["createContext", "useContext", "Provider", "newContext"], answer: 0 },
    { q: "Утга унших?", options: ["createContext", "useContext", "Provider", "consumer"], answer: 1 },
    { q: "Context файлд юу хэрэгтэй вэ?", options: ['"use client"', '"use server"', "async", "юу ч үгүй"], answer: 0 },
    { q: "Дахин зурагдалт багасгах?", options: ["useMemo-оор value тогтворжуулах", "useState", "useRef", "props"], answer: 0 },
    { q: "Серверийн өгөгдөлд юу дээр вэ?", options: ["Context", "SWR", "useState", "localStorage"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Context = prop drilling-ийн шийдэл. `createContext` + `Provider` + `useContext`.",
    "Захиалгат hook (`useCart`) бичиж алдааг эрт барь.",
    "`value`-г `useMemo`, функцүүдийг `useCallback`.",
    "Context өөрчлөгдөхөд БҮХ хэрэглэгч дахин зурагдана.",
    "Серверийн өгөгдөлд SWR, формд RHF ашигла.",
    "`localStorage`-ыг `useEffect` дотор л унш.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Authorization** — эрхийн хяналт." },
];

// ===== m6l14 — Authorization =====
export const m6l14: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Authentication ба Authorization-ийн ялгааг ойлгож, үүрэг болон эзэмшигчид суурилсан хяналтыг backend, frontend хоёуланд хэрэгжүүлнэ." },

  { type: "h", text: "Онол — Хоёр өөр асуулт" },
  { type: "code", lang: "text", code: `Authentication (Нэвтрэлт)     "Чи хэн бэ?"
  → Имэйл + нууц үг шалгах
  → Токен өгөх
  → Амжилтгүй бол 401

Authorization (Эрх)           "Чи юу хийж болох вэ?"
  → Үүрэг, эзэмшил шалгах
  → Амжилтгүй бол 403

⚠ Дарааллаар: эхлээд AuthN, дараа нь AuthZ`, },
  { type: "callout", variant: "tip", title: "Санахад хялбар", text: "AuthN = **N**ame (хэн бэ). AuthZ = **Z**one (хаана орж болох вэ). Паспорт бол AuthN, VIP тасалбар бол AuthZ." },

  { type: "h", text: "RBAC — үүрэгт суурилсан" },
  { type: "code", lang: "ts", code: `// lib/permissions.ts
export const ROLES = ["user", "staff", "admin"] as const;
export type Role = typeof ROLES[number];

export const PERMISSIONS = {
  user: [
    "order:create",
    "order:read:own",
    "order:cancel:own",
    "review:create",
  ],
  staff: [
    "order:read:all",
    "order:update:status",
    "food:read",
  ],
  admin: [
    "order:*",
    "food:*",
    "user:*",
    "category:*",
  ],
} as const;

export function can(role: Role, permission: string): boolean {
  const perms: readonly string[] = PERMISSIONS[role] ?? [];

  return perms.some((p) => {
    if (p === permission) return true;
    // "order:*" нь "order:" -ээр эхэлсэн бүгдийг зөвшөөрнө
    if (p.endsWith(":*")) return permission.startsWith(p.slice(0, -1));
    return false;
  });
}

// Ашиглах
can("user", "order:create");        // true
can("user", "order:read:all");      // false
can("admin", "order:read:all");     // true ("order:*")`, },

  { type: "h", text: "Эзэмшигчид суурилсан хяналт" },
  { type: "code", lang: "ts", code: `// Үүрэг хангалттай биш — өөрийн захиалгыг л харах ёстой
export async function getOrder(orderId: string, actor: { id: string; role: Role }) {
  const order = await Order.findById(orderId).lean();
  if (!order) throw new AppError("Захиалга олдсонгүй", 404);

  const isOwner = String(order.userId) === actor.id;
  const canReadAll = can(actor.role, "order:read:all");

  if (!isOwner && !canReadAll) {
    // ⚠ 404 буцаах нь илүү аюулгүй — тухайн id байгаа эсэхийг ч мэдэгдэхгүй
    throw new AppError("Захиалга олдсонгүй", 404);
  }

  return order;
}`, },
  { type: "callout", variant: "tip", title: "403 эсвэл 404?", text: "403 буцаавал \"тийм id-тай захиалга БАЙНА, гэхдээ чинийх биш\" гэдгийг мэдэгдэнэ. Нууц мэдээлэлтэй нөөцөд 404 буцаах нь илүү аюулгүй (existence hiding)." },

  { type: "h", text: "Массаар хандах эрсдэл — IDOR" },
  { type: "code", lang: "ts", code: `// ✗ АЮУЛТАЙ — IDOR (Insecure Direct Object Reference)
export async function GET(req, { params }) {
  const { id } = await params;
  const order = await Order.findById(id);      // хэн ч дурын id оруулж болно!
  return NextResponse.json(order);
}

// ✓ АЮУЛГҮЙ — query-д эзэмшигчийг шууд оруул
const order = await Order.findOne({ _id: id, userId: actor.id });
if (!order) return notFound();

// Админд бол өөр query
const filter = can(actor.role, "order:read:all")
  ? { _id: id }
  : { _id: id, userId: actor.id };
const order = await Order.findOne(filter);`, },
  { type: "callout", variant: "error", title: "IDOR бол хамгийн түгээмэл эмзэг байдал", text: "URL дэх id-г 1-ээр нэмэгдүүлээд өөр хүний өгөгдлийг харах. Query-дээ эзэмшигчийн шүүлтийг ЗААВАЛ оруул — дараа нь шалгах биш." },

  { type: "h", text: "Frontend талд" },
  { type: "code", lang: "tsx", code: `// hooks/usePermission.ts
"use client";
import { useAuth } from "@/contexts/AuthContext";
import { can } from "@/lib/permissions";

export function usePermission(permission: string) {
  const { user } = useAuth();
  if (!user) return false;
  return can(user.role, permission);
}

// Component
export function AdminButton() {
  const canDelete = usePermission("food:delete");
  if (!canDelete) return null;
  return <button>Устгах</button>;
}`, },
  { type: "callout", variant: "error", title: "Frontend хяналт бол ЗӨВХӨН UX", text: "Товч нуух нь аюулгүй байдал БИШ. Хэрэглэгч DevTools нээж API руу шууд хүсэлт явуулна. Backend дээр ЗААВАЛ дахин шалга — үргэлж." },

  { type: "h", text: "Хамгаалагдсан бүтэц" },
  { type: "code", lang: "text", code: `Давхарга 1: middleware.ts     токен байгаа эсэх (хурдан шүүлт)
Давхарга 2: route handler     токен ЗӨВ эсэх (jwt.verify)
Давхарга 3: controller        үүрэг ба эзэмшил
Давхарга 4: DB query          эзэмшигчийн шүүлт query-д

→ Аль нэг нь алдсан ч дараагийнх нь барина (defense in depth)`, },
  { type: "code", lang: "ts", code: `// Бүрэн жишээ — route
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  // 1) AuthN
  const actor = await getCurrentUser();
  if (!actor) return unauthorized();

  // 2) AuthZ — үүрэг
  if (!can(actor.role, "food:delete")) return forbidden();

  try {
    const { id } = await params;

    // 3) Байгаа эсэх
    const deleted = await Food.findByIdAndDelete(id);
    if (!deleted) return notFound("Хоол олдсонгүй");

    // 4) Аудит лог
    console.info("food.deleted", { foodId: id, by: actor.id });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/foods/:id", err);
    return serverError();
  }
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Зөвхөн frontend-д шалгах", text: "Товч нуусан нь хамгаалалт биш. Backend-д заавал." },
  { type: "callout", variant: "error", title: "IDOR — эзэмшигч шалгахгүй", text: "`findById(id)` шууд. `findOne({ _id: id, userId })` гэж query-д оруул." },
  { type: "callout", variant: "error", title: "Үүргийг клиентээс авах", text: "`body.role` эсвэл localStorage-аас role уншиж болохгүй — хэн ч `admin` гэж бичнэ. Токен доторх (сервер гарын үсэг зурсан) утгыг ашигла." },
  { type: "callout", variant: "warn", title: "401 ба 403 андуурах", text: "Нэвтрээгүй = 401 (login руу). Эрх байхгүй = 403 (login руу явуулах утгагүй)." },
  { type: "callout", variant: "warn", title: "Аудит лог байхгүй", text: "Устгах, эрх өөрчлөх зэрэг чухал үйлдлийг хэн, хэзээ хийснийг логло." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: AuthN ба AuthZ-ийн ялгааг жишээтэй бич.",
    "Дунд: `can(role, permission)` функц бичиж `*` дэмжүүл.",
    "Дунд: Эзэмшигч шалгалтыг query-д оруулж IDOR-оос сэргийл.",
    "Хүнд: 4 давхаргат хамгаалалтыг нэг route-д бүрэн хэрэгжүүл.",
    "Хүнд: Чухал үйлдлүүдэд аудит лог нэм.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "AuthN ба AuthZ-ийн ялгаа юу вэ?",
    "RBAC гэж юу вэ?",
    "Эзэмшигчид суурилсан хяналт яагаад хэрэгтэй вэ?",
    "IDOR гэж юу вэ, яаж сэргийлэх вэ?",
    "403 биш 404 буцаах нь хэзээ дээр вэ?",
    "Frontend хяналт хангалттай юу?",
    "Үүргийг хаанаас унших ёстой вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "\"Чи хэн бэ?\"", options: ["Authentication", "Authorization", "Validation", "Encryption"], answer: 0 },
    { q: "\"Юу хийж болох вэ?\"", options: ["Authentication", "Authorization", "Session", "Cookie"], answer: 1 },
    { q: "Эрх хүрэхгүй status?", options: ["401", "403", "404", "400"], answer: 1 },
    { q: "IDOR-оос сэргийлэх?", options: ["Query-д эзэмшигч оруулах", "URL нуух", "HTTPS", "Кэш"], answer: 0 },
    { q: "Үүргийг хаанаас авах вэ?", options: ["Токен доторх утга", "body.role", "localStorage", "query"], answer: 0 },
    { q: "Frontend хяналт юу вэ?", options: ["Аюулгүй байдал", "Зөвхөн UX", "Хангалттай", "Backend-ийн оронд"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "AuthN = хэн бэ (401) · AuthZ = юу хийж болох вэ (403).",
    "RBAC + эзэмшигчийн шалгалт хоёулаа хэрэгтэй.",
    "IDOR-оос сэргийлэхийн тулд эзэмшигчийг QUERY-д оруул.",
    "Үүргийг зөвхөн токеноос унш — клиентээс хэзээ ч биш.",
    "Frontend хяналт = UX. Backend = аюулгүй байдал.",
    "Чухал үйлдэлд аудит лог.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**JWT** — токенд суурилсан нэвтрэлт." },
];

// ===== m6l15 — JWT =====
export const m6l15: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "JWT-ийн бүтэц, гарын үсгийн зарчим, хугацаа, refresh token, хадгалах аргыг эзэмшинэ." },

  { type: "h", text: "Онол — JWT гэж юу вэ?" },
  { type: "p", text: "**JWT (JSON Web Token)** нь хэрэглэгчийн мэдээллийг агуулсан, серверийн гарын үсэгтэй текст. Сервер session хадгалахгүй тул stateless." },
  { type: "code", lang: "text", code: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9  .  eyJzdWIiOiIxMjMiLCJyb2xlIjoi...  .  SflKxwRJSMeKKF2QT4f...
└──────── HEADER ────────┘              └────── PAYLOAD ──────┘         └──── SIGNATURE ────┘

HEADER    { "alg": "HS256", "typ": "JWT" }
PAYLOAD   { "sub": "123", "role": "user", "iat": 1234567890, "exp": 1234654290 }
SIGNATURE HMACSHA256(base64(header) + "." + base64(payload), SECRET)`, },
  { type: "callout", variant: "error", title: "JWT нь ШИФРЛЭГДСЭН БИШ — зөвхөн кодлогдсон", text: "jwt.io дээр буулгавал payload-ыг ХЭН Ч уншина. Нууц үг, хувийн мэдээлэл ХЭЗЭЭ Ч бүү хий. Гарын үсэг нь зөвхөн ӨӨРЧЛӨГДӨӨГҮЙГ баталгаажуулна." },

  { type: "h", text: "Гарын үсэг яаж хамгаалдаг вэ?" },
  { type: "code", lang: "text", code: `Халдагч payload-ыг өөрчилье гэж оролдвол:
{ "sub": "123", "role": "user" }  →  { "sub": "123", "role": "admin" }

Гэхдээ гарын үсэг нь хуучин payload-аас тооцоологдсон.
Сервер шалгахдаа:
  1. Ирсэн header + payload-аас гарын үсгийг ДАХИН тооцоолно
  2. Ирсэн гарын үсэгтэй харьцуулна
  3. Таарахгүй → ТАТГАЛЗАНА

→ SECRET-ыг мэдэхгүй бол зөв гарын үсэг үүсгэж чадахгүй`, },

  { type: "h", text: "Токен үүсгэх ба шалгах" },
  { type: "code", lang: "bash", code: `npm install jsonwebtoken
npm install -D @types/jsonwebtoken`, },
  { type: "code", lang: "ts", code: `// lib/jwt.ts
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  throw new Error("JWT_SECRET дор хаяж 32 тэмдэгт байх ёстой");
}

export interface TokenPayload {
  sub: string;        // хэрэглэгчийн id (стандарт нэр)
  role: string;
}

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, SECRET!, {
    expiresIn: "15m",              // богино хугацаа
    issuer: "foodapp",
  });
}

export function signRefreshToken(userId: string) {
  return jwt.sign({ sub: userId, type: "refresh" }, SECRET!, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, SECRET!) as TokenPayload;
  } catch (err) {
    // TokenExpiredError, JsonWebTokenError, NotBeforeError
    return null;
  }
}`, },
  { type: "code", lang: "bash", code: `# Хүчтэй SECRET үүсгэх
openssl rand -base64 48`, },

  { type: "h", text: "Нэвтрэх урсгал" },
  { type: "code", lang: "ts", code: `// app/api/auth/login/route.ts
export async function POST(req: NextRequest) {
  const parsed = loginSchema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Буруу өгөгдөл");

  const { email, password } = parsed.data;
  await connectToDatabase();

  // select: false тул тусгайлан асууна
  const user = await User.findOne({ email }).select("+password");

  // ⚠ "имэйл олдсонгүй" ба "нууц үг буруу" ялгаж БҮҮ хэл
  // → халдагч ямар имэйл бүртгэлтэйг мэдэх болно
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { error: "Имэйл эсвэл нууц үг буруу" },
      { status: 401 },
    );
  }

  const token = signToken({ sub: String(user._id), role: user.role });

  const res = NextResponse.json({
    user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
  });

  // httpOnly cookie-д хадгална
  res.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,
    path: "/",
  });

  return res;
}`, },
  { type: "callout", variant: "error", title: "Алдааны мессежийг нэгтгэ", text: "\"Имэйл олдсонгүй\" гэж хэлбэл халдагч ямар имэйлүүд бүртгэлтэйг тодорхойлж чадна (user enumeration). Үргэлж \"Имэйл эсвэл нууц үг буруу\"." },

  { type: "h", text: "Хаана хадгалах вэ?" },
  { type: "code", lang: "text", code: `                    localStorage    httpOnly cookie
XSS-д хулгайлагдах  ✗ ТИЙМ          ✓ Үгүй (JS хандаж чадахгүй)
CSRF эрсдэл          ✓ Үгүй          ✗ Байна (sameSite-ээр шийднэ)
Автоматаар явна      ✗ гараар        ✓ тийм
Дэд домэйнд          ✗               ✓
SSR-д уншигдана      ✗               ✓

→ ЗӨВЛӨМЖ: httpOnly + secure + sameSite: "lax"`, },
  { type: "callout", variant: "error", title: "localStorage-д токен бүү хадгал", text: "Аль ч гуравдагч скрипт (сурталчилгаа, analytics, эвдэрсэн npm сан) `localStorage.getItem(\"token\")` уншиж чадна. Нэг XSS = бүх хэрэглэгчийн бүртгэл алдагдана." },

  { type: "h", text: "Refresh token" },
  { type: "code", lang: "text", code: `Асуудал: богино хугацаа (15 мин) = хэрэглэгч байнга дахин нэвтрэх
         урт хугацаа (30 хоног) = хулгайлагдвал 30 хоног ашиглагдана

Шийдэл — 2 токен:
  Access token   15 минут   API дуудахад
  Refresh token  7 хоног    зөвхөн шинэ access авахад

Урсгал:
1. Нэвтрэх → access + refresh хоёуланг өгнө
2. API дуудна → 401 ирлээ (access хугацаа дууссан)
3. /api/auth/refresh → refresh-ээр шинэ access авна
4. Анхны хүсэлтийг ДАХИН явуулна
5. Refresh ч дууссан бол → нэвтрэх хуудас`, },
  { type: "code", lang: "ts", code: `// app/api/auth/refresh/route.ts
export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh")?.value;
  if (!refreshToken) return unauthorized();

  try {
    const payload = jwt.verify(refreshToken, SECRET!) as { sub: string; type: string };
    if (payload.type !== "refresh") return unauthorized();

    // Хэрэглэгч устсан/хоригдсон эсэхийг шалга
    const user = await User.findById(payload.sub).lean();
    if (!user) return unauthorized();

    const newAccess = signToken({ sub: String(user._id), role: user.role });

    const res = NextResponse.json({ ok: true });
    res.cookies.set("session", newAccess, { httpOnly: true, maxAge: 900, path: "/" });
    return res;
  } catch {
    return unauthorized();
  }
}`, },

  { type: "h", text: "JWT-ийн сул тал" },
  { type: "code", lang: "text", code: `✗ ЦУЦЛАХ БОЛОМЖГҮЙ
   Токен өгсний дараа хугацаа дуустал хүчинтэй.
   "Гарах" дарсан ч токен ажиллана.

   Шийдлүүд:
   • Богино хугацаа (15 мин) + refresh
   • Хар жагсаалт (Redis) — гэхдээ энэ stateless байдлыг алдагдуулна
   • tokenVersion талбар — нууц үг солиход өсгөнө, токенд хадгална

✗ Хэмжээ том
   Cookie-д 4KB хязгаар. Payload-д их зүйл хийж болохгүй.

✗ Payload хуучирна
   Хэрэглэгчийг admin болгосон ч токен дахь role хуучин хэвээр.`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "JWT_SECRET сул эсвэл кодод бичсэн", text: "Кодод бичвэл GitHub-д гарна → хэн ч admin токен үүсгэнэ. `.env`-д, дор хаяж 32 тэмдэгт, санамсаргүй." },
  { type: "callout", variant: "error", title: "Payload-д нууц мэдээлэл", text: "JWT кодлогдсон болохоос шифрлэгдээгүй. Нууц үг, картын дугаар бүү хий." },
  { type: "callout", variant: "error", title: "jwt.decode ашиглах", text: "`decode` нь гарын үсгийг ШАЛГАХГҮЙ — хэн ч хуурамч токен зохиож болно. `jwt.verify` ашигла." },
  { type: "callout", variant: "warn", title: "expiresIn өгөхгүй", text: "Хугацаагүй токен үүрд хүчинтэй. Заавал заа." },
  { type: "callout", variant: "error", title: "Токеныг localStorage-д", text: "XSS-д хулгайлагдана. httpOnly cookie ашигла." },
  { type: "callout", variant: "warn", title: "Middleware-д jwt.verify (Edge)", text: "`jsonwebtoken` сан Edge runtime-д ажиллахгүй. `jose` сан ашигла, эсвэл middleware-т зөвхөн cookie байгаа эсэхийг хар." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `openssl rand`-аар SECRET үүсгэж `.env.local`-д тавь.",
    "Дунд: `signToken`, `verifyToken` функц бич.",
    "Дунд: Login route хийж httpOnly cookie тавь.",
    "Хүнд: Access + refresh хоёр токентой систем хий.",
    "Хүнд: `jwt.io` дээр токеноо буулгаж payload уншигдахыг батал.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "JWT-ийн 3 хэсэг юу вэ?",
    "JWT шифрлэгдсэн үү?",
    "Гарын үсэг юуг баталгаажуулдаг вэ?",
    "Токеныг хаана хадгалах нь хамгийн аюулгүй вэ?",
    "Refresh token яагаад хэрэгтэй вэ?",
    "JWT-ийн гол сул тал юу вэ?",
    "`decode` ба `verify`-ийн ялгаа юу вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "JWT-ийн хэсгүүд?", options: ["Header, Payload, Signature", "Head, Body", "User, Pass", "Key, Value"], answer: 0 },
    { q: "Payload уншигдах уу?", options: ["Үгүй, шифрлэгдсэн", "Тийм, зөвхөн кодлогдсон", "Зөвхөн сервер", "Хэзээ ч үгүй"], answer: 1 },
    { q: "Хамгийн аюулгүй хадгалах газар?", options: ["localStorage", "httpOnly cookie", "sessionStorage", "URL"], answer: 1 },
    { q: "Гарын үсгийг шалгах функц?", options: ["jwt.decode", "jwt.verify", "jwt.read", "jwt.parse"], answer: 1 },
    { q: "Хугацаа заах сонголт?", options: ["expiresIn", "ttl", "maxAge", "timeout"], answer: 0 },
    { q: "JWT-ийн сул тал?", options: ["Удаан", "Цуцлахад хэцүү", "Аюултай", "Том сан"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "JWT = Header.Payload.Signature. Кодлогдсон, шифрлэгдээгүй.",
    "Гарын үсэг = өөрчлөгдөөгүйн баталгаа. SECRET нууц.",
    "httpOnly + secure + sameSite cookie-д хадгал.",
    "Access 15 мин + refresh 7 хоног.",
    "`verify` ашигла, `decode` БИШ.",
    "Цуцлахад хэцүү — богино хугацаа + tokenVersion.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**bcrypt** — нууц үгийг аюулгүй хадгална." },
];

// ===== m6l16 — bcrypt =====
export const m6l16: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Нууц үгийг яагаад, яаж hash хийхийг ойлгож, bcrypt-ийг зөв ашиглаж, нууц үг сэргээх урсгал бичнэ." },

  { type: "h", text: "Онол — Яагаад hash хийх вэ?" },
  { type: "code", lang: "text", code: `✗ Энгийн текстээр хадгалах
  DB: { email: "bat@mail.com", password: "myPassword123" }
  → DB алдагдвал БҮХ хэрэглэгчийн нууц үг ил
  → Ихэнх хүн ижил нууц үгийг олон сайтад хэрэглэдэг
  → Тэдний банк, имэйл ч алдагдана

✓ Hash хийж хадгалах
  DB: { email: "bat@mail.com", password: "$2b$10$N9qo8uLO..." }
  → DB алдагдсан ч жинхэнэ нууц үгийг сэргээх боломжгүй`, },
  { type: "p", text: "**Hash** нь нэг талын функц: нууц үг → hash хийж болно, гэхдээ hash → нууц үг **буцаах боломжгүй**." },

  { type: "h", text: "Яагаад MD5/SHA256 биш bcrypt вэ?" },
  { type: "code", lang: "text", code: `MD5 / SHA256:
  ✗ МАШ хурдан (секундэд тэрбум удаа)
  ✗ Халдагч секундэд 10 тэрбум таамаг шалгана
  ✗ Rainbow table — урьдчилан тооцоолсон hash-ийн сан

bcrypt:
  ✓ САНААТАЙ УДААН (тохируулж болно)
  ✓ Salt автоматаар — ижил нууц үг ч өөр hash
  ✓ cost хүчин зүйл — компьютер хурдсах тусам нэмэгдүүлж болно`, },
  { type: "code", lang: "text", code: `Salt гэж юу вэ?
Ижил нууц үг → ижил hash бол:
  Хэрэглэгч А: "123456" → "e10adc3949ba59ab..."
  Хэрэглэгч Б: "123456" → "e10adc3949ba59ab..."   ← ижил!
  → Нэгийг тайлбал бүгдийг мэдэв

bcrypt салтай:
  Хэрэглэгч А: "123456" → "$2b$10$AbC...xyz"
  Хэрэглэгч Б: "123456" → "$2b$10$DeF...uvw"   ← ӨӨР ✓`, },

  { type: "h", text: "Ашиглах" },
  { type: "code", lang: "bash", code: `npm install bcryptjs
npm install -D @types/bcryptjs

# bcrypt (native) илүү хурдан ч суулгахад асуудалтай байж болно.
# bcryptjs бол цэвэр JS — хаана ч ажиллана.`, },
  { type: "code", lang: "ts", code: `import bcrypt from "bcryptjs";

// Hash хийх — бүртгүүлэхэд
const hash = await bcrypt.hash(plainPassword, 10);
//                                            ↑ cost (rounds)
// "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
//  │   │  └─ salt + hash
//  │   └─ cost = 10 (2^10 = 1024 давталт)
//  └─ алгоритмын хувилбар

// Шалгах — нэвтрэхэд
const isValid = await bcrypt.compare(plainPassword, hash);
// true / false`, },
  { type: "code", lang: "text", code: `Cost сонголт (нэг hash хийхэд ойролцоогоор):
  8   ~25ms    хэт хурдан
  10  ~100ms   ✓ ЗӨВЛӨМЖТЭЙ (2026)
  12  ~400ms   өндөр аюулгүй, нэвтрэх удаашрах
  14  ~1.5s    хэт удаан

→ Хэрэглэгчид 100ms мэдэгдэхгүй, харин халдагчид 100ms × тэрбум = боломжгүй`, },
  { type: "callout", variant: "error", title: "compare-ыг гараар бүү бич", text: "`hash(input) === storedHash` гэж бичвэл ажиллахгүй (salt өөр). Мөн `===` нь цагийн халдлагад (timing attack) эмзэг. `bcrypt.compare` ашигла — тогтмол хугацаанд харьцуулдаг." },

  { type: "h", text: "Mongoose hook-той" },
  { type: "code", lang: "ts", code: `// models/User.ts
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8, select: false },
  name: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// Хадгалахын өмнө автоматаар hash
userSchema.pre("save", async function (next) {
  // ⚠ ЗААВАЛ шалга — эс бөгөөс нэр солих бүрт дахин hash хийнэ
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Харьцуулах метод
userSchema.methods.comparePassword = function (plain: string) {
  return bcrypt.compare(plain, this.password);
};

// JSON-д нууц үг ХЭЗЭЭ Ч оруулахгүй
userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});`, },
  { type: "callout", variant: "error", title: "isModified шалгахгүй бол", text: "Хэрэглэгч профайлаа шинэчлэх бүрт аль хэдийн hash хийсэн утга ДАХИН hash хийгдэнэ. Дараа нь ямар ч нууц үгээр нэвтэрч чадахгүй болно — маш төвөгтэй алдаа." },

  { type: "h", text: "Бүртгүүлэх ба нэвтрэх" },
  { type: "code", lang: "ts", code: `// Бүртгүүлэх
export async function POST(req: NextRequest) {
  const parsed = registerSchema.safeParse(await req.json());
  if (!parsed.success) return badRequest("Буруу өгөгдөл", parsed.error.flatten());

  await connectToDatabase();

  const exists = await User.findOne({ email: parsed.data.email });
  if (exists) {
    return NextResponse.json(
      { error: "Энэ имэйл бүртгэлтэй байна" },
      { status: 409 },
    );
  }

  // pre("save") hook нь hash-ыг автоматаар хийнэ
  const user = await User.create(parsed.data);

  return NextResponse.json(
    { id: String(user._id), name: user.name, email: user.email },
    { status: 201 },
  );
}`, },
  { type: "code", lang: "ts", code: `// Нэвтрэх
const user = await User.findOne({ email }).select("+password");

// ⚠ Хоёр нөхцөлийг НЭГ мессежээр
if (!user || !(await user.comparePassword(password))) {
  return NextResponse.json({ error: "Имэйл эсвэл нууц үг буруу" }, { status: 401 });
}`, },

  { type: "h", text: "Нууц үгийн шаардлага" },
  { type: "code", lang: "ts", code: `const passwordSchema = z.string()
  .min(8, "Хамгийн багадаа 8 тэмдэгт")
  .max(72, "72 тэмдэгтээс ихгүй")          // ⚠ bcrypt-ийн хязгаар!
  .regex(/[a-z]/, "Жижиг үсэг агуулна")
  .regex(/[A-Z]/, "Том үсэг агуулна")
  .regex(/[0-9]/, "Тоо агуулна");

// Түгээмэл нууц үгийг хориглох
const COMMON = ["password", "12345678", "qwerty123", "admin123"];
const schema = passwordSchema.refine(
  (p) => !COMMON.includes(p.toLowerCase()),
  "Хэтэрхий түгээмэл нууц үг",
);`, },
  { type: "callout", variant: "error", title: "bcrypt-ийн 72 байтын хязгаар", text: "bcrypt зөвхөн эхний 72 байтыг ашиглана. Урт нууц үг чимээгүй тасарна. Zod-оор 72-оор хязгаарлах, эсвэл урьдчилан SHA256 хийж богиносгох." },

  { type: "h", text: "Нууц үг сэргээх" },
  { type: "code", lang: "ts", code: `import crypto from "crypto";

// 1) Хүсэлт — токен үүсгэж имэйлээр илгээнэ
export async function requestReset(email: string) {
  const user = await User.findOne({ email });

  // ⚠ Хэрэглэгч байхгүй ч ИЖИЛ хариу буцаа (enumeration-ээс сэргийлнэ)
  if (!user) return { ok: true };

  const rawToken = crypto.randomBytes(32).toString("hex");

  // DB-д HASH хийж хадгална — DB алдагдсан ч токен ашиглагдахгүй
  user.resetTokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);   // 1 цаг
  await user.save();

  await sendEmail(email, \`https://app.com/reset?token=\${rawToken}\`);
  return { ok: true };
}

// 2) Шинэ нууц үг тавих
export async function resetPassword(rawToken: string, newPassword: string) {
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  const user = await User.findOne({
    resetTokenHash: tokenHash,
    resetTokenExpiry: { $gt: new Date() },
  }).select("+password");

  if (!user) throw new AppError("Токен буруу эсвэл хугацаа дууссан", 400);

  user.password = newPassword;          // pre("save") hash хийнэ
  user.resetTokenHash = undefined;      // нэг удаа л ашиглана
  user.resetTokenExpiry = undefined;
  await user.save();
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Нууц үгийг энгийн текстээр хадгалах", text: "Хамгийн ноцтой алдаа. Хэзээ ч бүү хий." },
  { type: "callout", variant: "error", title: "MD5/SHA256 ашиглах", text: "Хэт хурдан — халдагч секундэд тэрбум таамаг шалгана. bcrypt/argon2 ашигла." },
  { type: "callout", variant: "error", title: "isModified мартах", text: "Профайл шинэчлэх бүрт дахин hash → нэвтэрч чадахгүй болно." },
  { type: "callout", variant: "error", title: "Нууц үг хариунд орох", text: "`select: false` + `toJSON` transform хоёуланг нь тавь." },
  { type: "callout", variant: "warn", title: "Cost хэт бага/өндөр", text: "8-аас бага бол сул, 14-өөс дээш бол нэвтрэх удаан. 10-12 хооронд." },
  { type: "callout", variant: "warn", title: "72 байтын хязгаар", text: "Урт нууц үг чимээгүй тасарна. Zod-оор хязгаарла." },
  { type: "callout", variant: "error", title: "Reset токеныг DB-д ил хадгалах", text: "DB алдагдвал бүх бүртгэлийг эзэмшинэ. SHA256 hash хийж хадгал." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `bcrypt.hash` ба `compare`-ыг туршиж үз.",
    "Дунд: `pre(\"save\")` hook-оор автомат hash хий (`isModified`-той).",
    "Дунд: `comparePassword` метод нэмж login route бич.",
    "Хүнд: Zod-оор нууц үгийн бүрэн шаардлага бич (72 хязгаартай).",
    "Хүнд: Нууц үг сэргээх токеныг hash хийж хадгалах урсгал хий.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Яагаад нууц үгийг hash хийдэг вэ?",
    "Яагаад MD5/SHA256 тохиромжгүй вэ?",
    "Salt юу шийддэг вэ?",
    "Cost хүчин зүйл юу вэ, хэд байх нь зохимжтой вэ?",
    "`isModified` яагаад чухал вэ?",
    "bcrypt-ийн уртын хязгаар хэд вэ?",
    "Reset токеныг яагаад hash хийж хадгалах вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Нууц үгийг яаж хадгалах вэ?", options: ["Энгийн текстээр", "bcrypt hash", "Base64", "Шифрлэж"], answer: 1 },
    { q: "Hash-аас нууц үг сэргээх боломжтой юу?", options: ["Тийм", "Үгүй", "Заримдаа", "Түлхүүртэй бол"], answer: 1 },
    { q: "Шалгах функц?", options: ["bcrypt.hash", "bcrypt.compare", "===", "match"], answer: 1 },
    { q: "Зөвлөмжтэй cost?", options: ["4", "10-12", "20", "1"], answer: 1 },
    { q: "Salt юу шийддэг вэ?", options: ["Ижил нууц үг өөр hash", "Хурд", "Хэмжээ", "Шифрлэлт"], answer: 0 },
    { q: "bcrypt-ийн уртын хязгаар?", options: ["32", "64", "72 байт", "128"], answer: 2 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Нууц үгийг hash хийж хадгал — энгийн текст ХЭЗЭЭ Ч биш.",
    "bcrypt санаатай удаан + salt автомат. MD5/SHA256 БИШ.",
    "Cost 10-12. `bcrypt.compare` ашигла.",
    "`isModified(\"password\")` шалгахаа бүү март.",
    "`select: false` + `toJSON` transform.",
    "72 байтын хязгаарыг Zod-оор барь.",
    "Reset токеныг hash хийж, хугацаатай, нэг удаагийн.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Cloudinary** — зураг байршуулах, оптимизац хийх." },
];

// ===== m6l17 — Cloudinary =====
export const m6l17: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Зургийг Cloudinary-д аюулгүй байршуулж, автоматаар оптимизац хийж, хувиргалт ашиглаж сурна." },

  { type: "h", text: "Онол — Зургийг хаана хадгалах вэ?" },
  { type: "code", lang: "text", code: `✗ MongoDB-д base64-ээр
  → 16MB хязгаар, DB асар том болно, маш удаан

✗ Серверийн файлын систем
  → Vercel/Render-д дахин deploy хийхэд УСТАНА (ephemeral)
  → Олон instance-д хуваалцахгүй
  → CDN байхгүй

✓ Cloudinary / S3 / UploadThing
  → CDN-ээр дэлхий даяар хурдан
  → Автомат оптимизац, хувиргалт
  → Хязгааргүй өргөжинө`, },

  { type: "h", text: "Тохируулах" },
  { type: "code", lang: "bash", code: `npm install cloudinary

# .env.local
CLOUDINARY_CLOUD_NAME=таны_cloud_name
CLOUDINARY_API_KEY=таны_api_key
CLOUDINARY_API_SECRET=таны_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=таны_cloud_name   # зөвхөн энэ нь ил байж болно`, },
  { type: "callout", variant: "error", title: "API_SECRET-ыг NEXT_PUBLIC_ бүү болго", text: "Cloud name ил байж болно (зургийн URL-д ямар ч байсан харагдана). Гэхдээ API_KEY, API_SECRET хоёрыг ил гаргавал хэн ч чиний бүртгэлд зураг байршуулж, устгаж чадна." },
  { type: "code", lang: "ts", code: `// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };`, },

  { type: "h", text: "Сервер талаар байршуулах" },
  { type: "code", lang: "ts", code: `// app/api/upload/route.ts
import { cloudinary } from "@/lib/cloudinary";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_SIZE = 5 * 1024 * 1024;                      // 5MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
  // 1) Нэвтрэлт — эс бөгөөс хэн ч зураг цутгана
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const form = await req.formData();
  const file = form.get("file") as File | null;

  // 2) Шалгалт
  if (!file) return badRequest("Файл байхгүй");
  if (file.size > MAX_SIZE) return badRequest("Файл 5MB-аас их байна");
  if (!ALLOWED.includes(file.type)) return badRequest("Зөвхөн JPEG, PNG, WebP");

  // 3) File → Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 4) Урсгалаар байршуулах
  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "foodapp/foods",
            resource_type: "image",
            transformation: [
              { width: 1200, height: 1200, crop: "limit" },   // хэт томыг багасгана
              { quality: "auto:good" },                       // автомат чанар
              { fetch_format: "auto" },                       // WebP/AVIF автомат
            ],
          },
          (err, res) => (err || !res ? reject(err) : resolve(res as any)),
        )
        .end(buffer);
    },
  );

  return NextResponse.json({
    url: result.secure_url,
    publicId: result.public_id,      // ⚠ устгахад хэрэгтэй — ЗААВАЛ хадгал
  });
}`, },
  { type: "callout", variant: "error", title: "publicId-г DB-д хадгалахаа бүү март", text: "Зөвхөн URL хадгалвал дараа нь тэр зургийг Cloudinary-ээс устгах боломжгүй болно. Хэрэглэгч зургаа солих бүрт хуучин нь үлдэж, санах ой дүүрнэ." },

  { type: "h", text: "Frontend талд" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState } from "react";

export function ImageUpload({ onDone }: { onDone: (url: string, id: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Клиент талын хурдан шалгалт (UX)
    if (file.size > 5 * 1024 * 1024) {
      setError("Файл 5MB-аас их байна");
      return;
    }

    // Шууд урьдчилан харуулах
    setPreview(URL.createObjectURL(file));
    setError("");
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);

      // ⚠ Content-Type ГАРААР бүү тавь
      const res = await fetch("/api/upload", { method: "POST", body: fd });

      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error ?? "Байршуулж чадсангүй");
      }

      const { url, publicId } = await res.json();
      onDone(url, publicId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} />
      {uploading && <p className="text-sm text-gray-500">Байршуулж байна...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {preview && <img src={preview} alt="" className="mt-2 h-32 rounded object-cover" />}
    </div>
  );
}`, },

  { type: "h", text: "Хувиргалт — URL дээр шууд" },
  { type: "code", lang: "text", code: `Эх URL:
https://res.cloudinary.com/demo/image/upload/v123/food.jpg

Хувиргалт нэмэх — /upload/ болон хувилбарын хооронд:
.../upload/w_400,h_300,c_fill/v123/food.jpg

Түгээмэл параметрүүд:
w_400          өргөн 400px
h_300          өндөр 300px
c_fill         дүүргэж тайрна
c_limit        харьцаа хадгалж багасгана (томруулахгүй)
c_thumb,g_face царайг төвд байлгаж жижиг зураг
q_auto         чанар автоматаар
f_auto         формат автоматаар (WebP/AVIF)
e_blur:300     бүдгэрүүлэх
r_max          дугуй болгох

Жишээ — оптимизацтай thumbnail:
.../upload/w_300,h_300,c_fill,q_auto,f_auto/v123/food.jpg`, },
  { type: "code", lang: "ts", code: `// Туслах функц
export function cldUrl(publicId: string, opts: string = "q_auto,f_auto") {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return \`https://res.cloudinary.com/\${cloud}/image/upload/\${opts}/\${publicId}\`;
}

// Ашиглах
cldUrl(food.imageId, "w_300,h_300,c_fill,q_auto,f_auto");   // жагсаалтад
cldUrl(food.imageId, "w_1200,q_auto,f_auto");                // дэлгэрэнгүйд`, },

  { type: "h", text: "Устгах ба солих" },
  { type: "code", lang: "ts", code: `// Устгах
await cloudinary.uploader.destroy(publicId);

// Солих — хуучныг устгаад шинийг тавь
export async function replaceImage(foodId: string, newFile: File) {
  const food = await Food.findById(foodId);
  if (!food) throw new AppError("Олдсонгүй", 404);

  const uploaded = await uploadToCloudinary(newFile);

  // Шинэ нь амжилттай болсны ДАРАА хуучныг устга
  if (food.imageId) {
    await cloudinary.uploader.destroy(food.imageId).catch((e) => {
      console.error("Хуучин зураг устгаж чадсангүй", e);   // тасалдуулахгүй
    });
  }

  food.image = uploaded.secure_url;
  food.imageId = uploaded.public_id;
  await food.save();
}`, },

  { type: "h", text: "next/image-тэй" },
  { type: "code", lang: "js", code: `// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};
export default nextConfig;`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "API_SECRET ил гарах", text: "`NEXT_PUBLIC_` бүү ашигла, зөвхөн серверийн код дотор." },
  { type: "callout", variant: "error", title: "Нэвтрэлт шалгахгүй upload route", text: "Хэн ч дурын хэмжээний файл цутгаж, квотыг чинь дуусгана. `getCurrentUser` заавал." },
  { type: "callout", variant: "error", title: "publicId хадгалаагүй", text: "Зургийг хэзээ ч устгаж чадахгүй болно. DB-д `imageId` талбар нэм." },
  { type: "callout", variant: "error", title: "FormData-д Content-Type тавих", text: "boundary эвдэрч сервер уншиж чадахгүй. Хөтөчид даатга." },
  { type: "callout", variant: "warn", title: "Хэмжээ, төрөл шалгаагүй", text: "100MB видео, .exe файл орж ирж болно. Сервер талд ЗААВАЛ шалга (клиент талын шалгалтыг тойрч болно)." },
  { type: "callout", variant: "warn", title: "Оптимизацгүй эх зураг харуулах", text: "5MB зураг жагсаалтад ачаалахад хуудас маш удаан. `q_auto,f_auto` + хэмжээ заа." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Cloudinary бүртгэл үүсгэж `.env.local` тохируул.",
    "Дунд: `/api/upload` route бичиж хэмжээ, төрөл шалга.",
    "Дунд: `publicId`-г DB-д хадгалж устгах функц хий.",
    "Хүнд: `cldUrl` туслах функц бичиж жагсаалт/дэлгэрэнгүйд өөр хэмжээ ашигла.",
    "Хүнд: Зураг солиход хуучныг автоматаар устгадаг болго.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Яагаад зургийг серверийн диск дээр хадгалж болохгүй вэ?",
    "Аль орчны хувьсагч ил байж болох вэ?",
    "`publicId` яагаад хэрэгтэй вэ?",
    "Upload route-д яагаад нэвтрэлт шалгах ёстой вэ?",
    "`q_auto,f_auto` юу хийдэг вэ?",
    "FormData илгээхэд Content-Type яах вэ?",
    "Сервер талд юу шалгах ёстой вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Зургийг хаана хадгалах вэ?", options: ["MongoDB base64", "Cloudinary/S3", "Серверийн диск", "localStorage"], answer: 1 },
    { q: "API_SECRET-ыг яах вэ?", options: ["NEXT_PUBLIC_", "Зөвхөн серверт", "Код дотор", "GitHub-д"], answer: 1 },
    { q: "Устгахад юу хэрэгтэй вэ?", options: ["URL", "publicId", "нэр", "хэмжээ"], answer: 1 },
    { q: "Формат автоматаар сонгох?", options: ["q_auto", "f_auto", "w_auto", "c_auto"], answer: 1 },
    { q: "FormData-д Content-Type?", options: ["Гараар тавих", "Тавихгүй", "application/json", "text/plain"], answer: 1 },
    { q: "Хэмжээ шалгалт хаана заавал вэ?", options: ["Зөвхөн клиент", "Сервер дээр", "Хэрэггүй", "Cloudinary-д"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Зургийг Cloudinary/S3-д — DB эсвэл серверийн диск дээр БИШ.",
    "`API_SECRET` зөвхөн серверт. Cloud name ил байж болно.",
    "Upload route-д нэвтрэлт + хэмжээ + төрөл ЗААВАЛ шалга.",
    "`publicId`-г DB-д хадгал — эс бөгөөс устгаж чадахгүй.",
    "`q_auto,f_auto` + хэмжээ = хурдан хуудас.",
    "FormData-д Content-Type гараар бүү тавь.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Formik** — өөр нэгэн формын сан." },
];

// ===== m6l18 — Formik =====
export const m6l18: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Formik-ийн ажиллах зарчмыг ойлгож, React Hook Form-той харьцуулж, аль нь хэзээ тохирохыг шийдэж сурна." },

  { type: "h", text: "Онол — Formik гэж юу вэ?" },
  { type: "p", text: "**Formik** нь React-ийн хамгийн эртний формын сангуудын нэг. Утга, алдаа, touched төлөв, submit боловсруулалтыг удирдана. Ихэвчлэн **Yup**-тай хамт хэрэглэгддэг." },
  { type: "code", lang: "bash", code: `npm install formik yup`, },

  { type: "h", text: "useFormik hook" },
  { type: "code", lang: "tsx", code: `"use client";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().min(2, "Хамгийн багадаа 2 тэмдэгт").required("Нэр заавал"),
  email: Yup.string().email("Имэйл буруу").required("Имэйл заавал"),
  password: Yup.string().min(6, "6+ тэмдэгт").required("Нууц үг заавал"),
});

export default function SignupForm() {
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Бүртгэж чадсангүй");
        resetForm();
        setStatus({ success: "Амжилттай бүртгэгдлээ" });
      } catch (err) {
        setStatus({ error: err instanceof Error ? err.message : "Алдаа" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Нэр"
      />
      {/* touched шалгах нь чухал — хараахан хүрээгүй талбарт алдаа харуулахгүй */}
      {formik.touched.name && formik.errors.name && (
        <p className="text-sm text-red-500">{formik.errors.name}</p>
      )}

      <input
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Имэйл"
      />
      {formik.touched.email && formik.errors.email && (
        <p className="text-sm text-red-500">{formik.errors.email}</p>
      )}

      <button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
        {formik.isSubmitting ? "Илгээж байна..." : "Бүртгүүлэх"}
      </button>
    </form>
  );
}`, },

  { type: "h", text: "Component хэлбэр — код богиносгох" },
  { type: "code", lang: "tsx", code: `import { Formik, Form, Field, ErrorMessage } from "formik";

<Formik
  initialValues={{ name: "", email: "" }}
  validationSchema={schema}
  onSubmit={(values) => console.log(values)}
>
  {({ isSubmitting, values, setFieldValue }) => (
    <Form>
      <Field name="name" placeholder="Нэр" />
      <ErrorMessage name="name" component="p" className="text-red-500" />

      <Field name="email" type="email" placeholder="Имэйл" />
      <ErrorMessage name="email" component="p" className="text-red-500" />

      {/* Select */}
      <Field as="select" name="category">
        <option value="">Сонгоно уу</option>
        <option value="pizza">Пицца</option>
      </Field>

      {/* Textarea */}
      <Field as="textarea" name="note" rows={3} />

      <button type="submit" disabled={isSubmitting}>Илгээх</button>
    </Form>
  )}
</Formik>`, },

  { type: "h", text: "FieldArray — динамик талбарууд" },
  { type: "code", lang: "tsx", code: `import { FieldArray } from "formik";

<Formik initialValues={{ items: [{ name: "", qty: 1 }] }} onSubmit={...}>
  {({ values }) => (
    <Form>
      <FieldArray name="items">
        {({ push, remove }) => (
          <>
            {values.items.map((_, i) => (
              <div key={i} className="flex gap-2">
                <Field name={\`items.\${i}.name\`} placeholder="Нэр" />
                <Field name={\`items.\${i}.qty\`} type="number" />
                <button type="button" onClick={() => remove(i)}>×</button>
              </div>
            ))}
            <button type="button" onClick={() => push({ name: "", qty: 1 })}>
              Бараа нэмэх
            </button>
          </>
        )}
      </FieldArray>
      <button type="submit">Илгээх</button>
    </Form>
  )}
</Formik>`, },

  { type: "h", text: "Formik vs React Hook Form" },
  { type: "code", lang: "text", code: `                        Formik              React Hook Form
Гүйцэтгэл               ✗ товч бүрт          ✓ uncontrolled,
                          re-render            re-render бага
Bundle                  ~13KB                ~9KB
Validation              Yup                  Zod / Yup / гараар
TypeScript              дунд зэрэг           маш сайн
API                     controlled           uncontrolled
Сурахад                 ✓ ойлгомжтой         дунд зэрэг
Идэвхтэй хөгжил         ✗ удаашралтай        ✓ идэвхтэй
Нийгэмлэг               том (хуучин төсөл)   ✓ өсөж буй

→ ШИНЭ төсөлд: React Hook Form + Zod
→ Хуучин төсөл, багийн туршлага: Formik + Yup`, },
  { type: "callout", variant: "warn", title: "Formik-ийн гүйцэтгэлийн сул тал", text: "Formik нь controlled input ашигладаг тул товч дарах БҮРТ бүх формын component дахин зурагдана. 5-10 талбартай бол мэдэгдэхгүй, 30+ талбартай том формд мэдэгдэхүйц удаашрана." },

  { type: "h", text: "Ижил формыг хоёр аргаар" },
  { type: "code", lang: "tsx", code: `// Formik
const formik = useFormik({
  initialValues: { email: "" },
  validationSchema: Yup.object({ email: Yup.string().email().required() }),
  onSubmit: (values) => console.log(values),
});

<input
  name="email"
  value={formik.values.email}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>
{formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}

// React Hook Form — богино, re-render бага
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(z.object({ email: z.string().email() })),
});

<input {...register("email")} />
{errors.email && <p>{errors.email.message}</p>}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "name атрибут мартах", text: "Formik нь `name`-ээр талбарыг таньдаг. Байхгүй бол `values` шинэчлэгдэхгүй, чимээгүй ажиллахгүй." },
  { type: "callout", variant: "warn", title: "touched шалгахгүй", text: "`errors.name && ...` гэж бичвэл форм нээгмэгц бүх алдаа улаанаар харагдана. `touched.name && errors.name` гэж бич." },
  { type: "callout", variant: "error", title: "setSubmitting(false) мартах", text: "`isSubmitting` үүрд `true` хэвээр үлдэж товч дахин дарагдахгүй болно. `finally`-д заавал." },
  { type: "callout", variant: "warn", title: "onBlur өгөхгүй", text: "`touched` хэзээ ч `true` болохгүй → алдаа огт харагдахгүй." },
  { type: "callout", variant: "error", title: '"use client" мартах', text: "Formik бол hook — Client Component шаардана." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `useFormik`-ээр 2 талбартай форм хий.",
    "Дунд: `touched`-той алдаа харуулж, `onBlur` холбо.",
    "Дунд: `<Formik>` component хэлбэрт хөрвүүлж кодоо богиносго.",
    "Хүнд: `FieldArray`-ээр динамик барааны жагсаалт хий.",
    "Хүнд: Ижил формыг RHF-ээр бичиж мөрийн тоог харьцуул.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Formik юу удирддаг вэ?",
    "`touched` юунд хэрэгтэй вэ?",
    "`useFormik` ба `<Formik>`-ийн ялгаа юу вэ?",
    "`FieldArray` юунд хэрэгтэй вэ?",
    "Formik-ийн гүйцэтгэлийн сул тал юу вэ?",
    "Шинэ төсөлд алийг сонгох вэ, яагаад?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Formik юу вэ?", options: ["Формын сан", "Router", "DB", "CSS сан"], answer: 0 },
    { q: "Formik ихэвчлэн юутай хамт вэ?", options: ["Zod", "Yup", "Joi", "Ajv"], answer: 1 },
    { q: "Утгыг хаанаас авах вэ?", options: ["formik.values", "formik.data", "formik.state", "values()"], answer: 0 },
    { q: "Динамик талбарын component?", options: ["FieldArray", "FieldList", "ArrayField", "DynamicField"], answer: 0 },
    { q: "Formik-ийн сул тал?", options: ["Товч бүрт re-render", "Validation байхгүй", "TS дэмждэггүй", "Үнэтэй"], answer: 0 },
    { q: "Шинэ төсөлд зөвлөмж?", options: ["Formik + Yup", "React Hook Form + Zod", "Гараар", "jQuery"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Formik = формын төлөвийг удирдана. Yup-тай хослоно.",
    "`values`, `errors`, `touched`, `isSubmitting` — гол талбарууд.",
    "`touched && errors` гэж шалгаж алдаа харуул.",
    "`FieldArray` — динамик талбарууд.",
    "Controlled тул товч бүрт re-render — том формд удаан.",
    "Шинэ төсөлд RHF + Zod, хуучинд Formik + Yup.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Yup** — схемд суурилсан validation." },
];

// ===== m6l19 — Yup =====
export const m6l19: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Yup-аар нийлмэл validation схем бичиж, нөхцөлт дүрэм, захиалгат шалгалт хийж, Zod-той харьцуулж сурна." },

  { type: "h", text: "Онол — Yup гэж юу вэ?" },
  { type: "p", text: "**Yup** нь JavaScript-ийн схемд суурилсан validation сан. Дүрмийг тунхаглаж бичээд, өгөгдлийг шалгана. Formik-ийн стандарт хамтрагч." },
  { type: "code", lang: "bash", code: `npm install yup`, },

  { type: "h", text: "Үндсэн төрлүүд" },
  { type: "code", lang: "ts", code: `import * as Yup from "yup";

const schema = Yup.object({
  // Текст
  name: Yup.string()
    .trim()
    .min(2, "Хамгийн багадаа 2 тэмдэгт")
    .max(50, "50-аас ихгүй")
    .required("Нэр заавал"),

  email: Yup.string()
    .email("Имэйл буруу форматтай")
    .lowercase()
    .required("Имэйл заавал"),

  phone: Yup.string()
    .matches(/^[0-9]{8}$/, "8 оронтой дугаар")
    .required(),

  url: Yup.string().url("Хаяг буруу").nullable(),

  // Тоо
  age: Yup.number()
    .typeError("Тоо оруулна уу")        // ⚠ хөрвүүлэлт амжилтгүй болвол
    .integer("Бүхэл тоо")
    .min(18, "18-аас дээш")
    .max(120)
    .required(),

  price: Yup.number().positive("Эерэг тоо").required(),

  // Boolean
  terms: Yup.boolean()
    .oneOf([true], "Нөхцөлийг зөвшөөрнө үү")
    .required(),

  // Сонголт
  role: Yup.string()
    .oneOf(["user", "admin"], "Буруу үүрэг")
    .default("user"),

  // Огноо
  birthDate: Yup.date()
    .max(new Date(), "Ирээдүйн огноо байж болохгүй")
    .required(),

  // Массив
  tags: Yup.array()
    .of(Yup.string().min(2))
    .min(1, "Дор хаяж нэг шошго")
    .max(5, "5-аас ихгүй"),

  // Үүрлэсэн объект
  address: Yup.object({
    district: Yup.string().required("Дүүрэг заавал"),
    detail: Yup.string().required(),
  }),
});`, },

  { type: "h", text: "Талбар хоорондын шалгалт" },
  { type: "code", lang: "ts", code: `const schema = Yup.object({
  password: Yup.string().min(6).required(),

  // ref — өөр талбарыг заана
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна")
    .required("Давтан оруулна уу"),

  startDate: Yup.date().required(),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "Дуусах огноо эхлэхээс хойш байна")
    .required(),
});`, },

  { type: "h", text: "Нөхцөлт validation — when()" },
  { type: "code", lang: "ts", code: `const schema = Yup.object({
  deliveryType: Yup.string().oneOf(["pickup", "delivery"]).required(),

  // Зөвхөн хүргэлт сонгосон үед хаяг шаардана
  address: Yup.string().when("deliveryType", {
    is: "delivery",
    then: (s) => s.required("Хүргэлтийн хаяг заавал"),
    otherwise: (s) => s.notRequired(),
  }),

  // Олон нөхцөл
  discountCode: Yup.string().when(["isMember", "total"], {
    is: (isMember: boolean, total: number) => isMember && total > 50000,
    then: (s) => s.required("Гишүүний код заавал"),
  }),

  // Захиалгат функц
  companyName: Yup.string().when("accountType", ([type], schema) =>
    type === "business" ? schema.required("Компанийн нэр заавал") : schema,
  ),
});`, },

  { type: "h", text: "Захиалгат шалгалт — test()" },
  { type: "code", lang: "ts", code: `// Энгийн
const schema = Yup.object({
  username: Yup.string().test(
    "no-spaces",                        // нэр
    "Зай агуулж болохгүй",              // мессеж
    (value) => !value?.includes(" "),   // шалгалт
  ),
});

// Асинхрон — DB шалгах
const schema = Yup.object({
  email: Yup.string()
    .email()
    .test("unique-email", "Энэ имэйл бүртгэлтэй байна", async (value) => {
      if (!value) return true;
      const res = await fetch(\`/api/check-email?email=\${value}\`);
      const { available } = await res.json();
      return available;
    }),
});`, },
  { type: "callout", variant: "warn", title: "Асинхрон test-ийг болгоомжтой", text: "Товч бүрт API дуудагдаж болзошгүй. `mode: \"onBlur\"` ашиглах эсвэл debounce хий. Мөн backend дээр ЗААВАЛ дахин шалга — уралдаанаас болж хоёр хүн зэрэг бүртгүүлж чадна." },

  { type: "h", text: "Шалгах" },
  { type: "code", lang: "ts", code: `// Бүгдийг шалгах — эхний алдаанд зогсоно
try {
  const valid = await schema.validate(data);
  console.log(valid);
} catch (err) {
  if (err instanceof Yup.ValidationError) {
    console.log(err.message);       // эхний алдаа
    console.log(err.path);          // аль талбар
  }
}

// БҮХ алдааг цуглуулах
try {
  await schema.validate(data, { abortEarly: false });
} catch (err) {
  if (err instanceof Yup.ValidationError) {
    console.log(err.errors);        // ["Нэр заавал", "Имэйл буруу"]

    // Талбараар бүлэглэх
    const byField: Record<string, string> = {};
    err.inner.forEach((e) => {
      if (e.path) byField[e.path] = e.message;
    });
  }
}

// Зөвхөн зөв эсэхийг мэдэх
const ok = await schema.isValid(data);      // true / false

// Синхрон хувилбар (async test байхгүй үед)
schema.validateSync(data, { abortEarly: false });`, },
  { type: "callout", variant: "error", title: "abortEarly анхдагчаар true", text: "Эхний алдаанд зогсдог тул зөвхөн НЭГ алдаа харагдана. Формд бүх алдааг харуулахын тулд `{ abortEarly: false }` заавал." },

  { type: "h", text: "TypeScript-тэй" },
  { type: "code", lang: "ts", code: `import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().required(),
  age: Yup.number().required(),
});

// Схемээс төрөл гаргах
type FormData = Yup.InferType<typeof schema>;
// { name: string; age: number }

// ⚠ Yup-ийн төрөл гаргалт Zod-оос сул — заримдаа
// optional/required-ыг зөв танихгүй байх тохиолдол гардаг`, },

  { type: "h", text: "Yup vs Zod" },
  { type: "code", lang: "text", code: `                    Yup                  Zod
TypeScript          дунд зэрэг           ✓ маш сайн (эхнээсээ TS)
Bundle              ~20KB                ~13KB
Формын сан          Formik-ийн стандарт  RHF-тэй сайн
Хөрвүүлэлт          автомат (сул тал ч)  тодорхой (.coerce)
Асинхрон validation ✓ сайн               ✓ (.refine async)
Алдааны мессеж      ✓ уян хатан          ✓ уян хатан
Хөгжил              удаашралтай          ✓ идэвхтэй

→ ШИНЭ төсөлд: Zod
→ Formik ашиглаж байвал: Yup`, },
  { type: "code", lang: "ts", code: `// Ижил дүрэм — хоёр аргаар
// Yup
Yup.object({
  email: Yup.string().email("Имэйл буруу").required("Заавал"),
  age: Yup.number().min(18, "18+").required(),
});

// Zod
z.object({
  email: z.string().min(1, "Заавал").email("Имэйл буруу"),
  age: z.coerce.number().min(18, "18+"),
});`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "abortEarly мартах", text: "Зөвхөн эхний алдаа харагдана. `{ abortEarly: false }` нэм." },
  { type: "callout", variant: "error", title: "Тоон талбарт typeError өгөхгүй", text: "Хоосон текст оруулбал \"must be a `number` type\" гэсэн англи мессеж гарна. `.typeError(\"Тоо оруулна уу\")` нэм." },
  { type: "callout", variant: "warn", title: "required() дараалал", text: "`.required()`-ыг сүүлд бич. `.required().min(2)` биш `.min(2).required()`." },
  { type: "callout", variant: "error", title: "when()-д ref буруу", text: "`when(\"fieldName\", ...)` дэх нэр яг талбарын нэртэй таарах ёстой. Үүрлэсэн бол `\"parent.field\"`." },
  { type: "callout", variant: "warn", title: "Асинхрон test товч бүрт", text: "Rate limit-д хүрнэ. `onBlur` эсвэл debounce ашигла." },
  { type: "callout", variant: "error", title: "Зөвхөн frontend-д шалгах", text: "Yup бол клиент талын тав тух. Backend дээр ЗААВАЛ дахин шалга." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `string`, `number`, `boolean` бүхий схем бич.",
    "Дунд: `oneOf(Yup.ref(...))`-ээр нууц үг давтахыг шалга.",
    "Дунд: `when()`-ээр нөхцөлт талбар хий.",
    "Хүнд: `test()`-ээр захиалгат шалгалт нэм.",
    "Хүнд: `abortEarly: false`-оор бүх алдааг талбараар бүлэглэ.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Yup юу хийдэг вэ?",
    "`oneOf` болон `Yup.ref` юунд хэрэгтэй вэ?",
    "`when()` юу хийдэг вэ?",
    "`test()` хэзээ ашиглах вэ?",
    "`abortEarly` анхдагчаар юу вэ, яагаад асуудалтай вэ?",
    "`typeError` яагаад хэрэгтэй вэ?",
    "Yup ба Zod-ын гол ялгаа юу вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Yup юу вэ?", options: ["Validation сан", "Формын сан", "Router", "DB"], answer: 0 },
    { q: "Заавал талбар?", options: [".required()", ".must()", ".need()", ".notNull()"], answer: 0 },
    { q: "Өөр талбарыг заах?", options: ["Yup.ref", "Yup.link", "Yup.get", "Yup.field"], answer: 0 },
    { q: "Нөхцөлт дүрэм?", options: ["when()", "if()", "case()", "cond()"], answer: 0 },
    { q: "Бүх алдааг авах?", options: ["abortEarly: false", "all: true", "full: true", "errors: all"], answer: 0 },
    { q: "Захиалгат шалгалт?", options: ["test()", "custom()", "check()", "validate()"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Yup = схемд суурилсан validation, Formik-ийн хамтрагч.",
    "`Yup.ref` + `oneOf` — талбар харьцуулах.",
    "`when()` — нөхцөлт дүрэм. `test()` — захиалгат шалгалт.",
    "`{ abortEarly: false }` — бүх алдааг цуглуул.",
    "Тоон талбарт `typeError` заавал.",
    "Шинэ төсөлд Zod, Formik-той бол Yup.",
    "Frontend validation = тав тух. Backend = аюулгүй байдал.",
    "🎉 6-р модуль дууслаа! Бүрэн full-stack чадвартай боллоо.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**7-р модуль: AI Integration.** AI загварууд, Hugging Face, Gemini API." },
];
