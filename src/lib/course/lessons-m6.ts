import type { ContentBlock } from "./types";

// m6l1 — MVC Architecture
export const m6l1: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "MVC архитектурыг ойлгож, backend кодоо Model / Controller / Router болгон зөв салгана." },
  { type: "h", text: "Онол — MVC гэж юу вэ?" },
  { type: "ul", items: [
    "**Model** — өгөгдлийн бүтэц, DB-тэй харилцах хэсэг.",
    "**View** — харагдах хэсэг (бидний хувьд Next.js frontend).",
    "**Controller** — логик: хүсэлт хүлээж авч, Model-ыг дуудаж, хариу буцаана.",
    "**Router** — аль URL ямар controller-ыг дуудахыг заана.",
  ] },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Ресторан: Router = зөөгч (захиалга авна), Controller = тогооч (хийнэ), Model = агуулах (орц хадгална), View = таваг дээрх хоол." },
  { type: "h", text: "Folder structure" },
  { type: "code", lang: "text", code: `backend/
├── src/
│   ├── index.ts              ← сервер асаах
│   ├── models/
│   │   ├── user.model.ts
│   │   └── food.model.ts
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   └── food.controller.ts
│   ├── routes/
│   │   ├── user.route.ts
│   │   └── food.route.ts
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   └── utils/
│       └── db.ts
└── package.json` },
  { type: "h", text: "Яагаад салгадаг вэ?" },
  { type: "ul", items: [
    "Нэг файлд бүхнийг бичвэл 1000+ мөр болж, засварлах боломжгүй болно.",
    "Алдаа хаана байгааг хурдан олно.",
    "Багаар ажиллахад мөргөлдөөн бага гарна.",
    "Нэг controller-ыг олон route-д дахин ашиглаж болно.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Controller дотор DB схем бичих", text: "Схем бол Model-ийн ажил. Controller зөвхөн логик бичнэ." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: MVC-ийн 3 давхаргыг өөрийн үгээр тайлбарла.",
    "Дунд: Food Delivery-д хэрэгтэй model-уудыг жагсаа.",
    "Хүнд: Дээрх folder structure-ыг компьютер дээрээ үүсгэ.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "DB-тэй харилцдаг давхарга?", options: ["View", "Model", "Router", "Middleware"], answer: 1 },
    { q: "Логик бичдэг нь?", options: ["Model", "Controller", "Router", "View"], answer: 1 },
    { q: "URL-ыг controller-той холбодог нь?", options: ["Router", "Model", "View", "DB"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Model = өгөгдөл, Controller = логик, Router = зам.", "Файлаа давхаргаар салгаж цэгцэлнэ.", "Багаар ажиллахад зайлшгүй."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**MongoDB** — өгөгдлөө хаана, хэрхэн хадгалахыг судална." },
];

// m6l2 — MongoDB
export const m6l2: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "MongoDB-ийн үндсэн ойлголт, Atlas дээр DB үүсгэж холбогдоно." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**MongoDB** нь баримт (document) хэлбэрээр өгөгдөл хадгалдаг NoSQL сан. Мөр/багана биш, JSON шиг объектоор хадгална." },
  { type: "ul", items: [
    "**Database** — бүх өгөгдлийн сав (ж: `food-delivery`).",
    "**Collection** — ижил төрлийн баримтуудын бүлэг (ж: `users`) — SQL-ийн хүснэгттэй адил.",
    "**Document** — нэг бичлэг (ж: нэг хэрэглэгч) — JSON шиг.",
    "**_id** — баримт бүрийн давтагдашгүй дугаар (ObjectId).",
  ] },
  { type: "code", lang: "json", code: `// users collection доторх нэг document
{
  "_id": ObjectId("65f1a2b3c4d5e6f7a8b9c0d1"),
  "name": "Bat",
  "email": "bat@mail.com",
  "role": "user",
  "createdAt": "2026-01-15T10:00:00Z"
}` },
  { type: "h", text: "Atlas дээр DB үүсгэх" },
  { type: "ol", items: [
    "cloud.mongodb.com дээр бүртгүүл.",
    "Free (M0) cluster үүсгэ.",
    "Database Access → хэрэглэгч үүсгэ (нууц үгээ тэмдэглэ).",
    "Network Access → Allow access from anywhere (0.0.0.0/0).",
    "Connect → Drivers → connection string-ээ хуул.",
  ] },
  { type: "code", lang: "bash", code: `# .env
MONGODB_URI=mongodb+srv://user:password@cluster.xxxxx.mongodb.net/food-delivery` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "bad auth : authentication failed", text: "Нууц үг буруу эсвэл `<password>` хаалт үлдсэн. Database Access-ээс нууц үгээ дахин тавь (тусгай тэмдэггүй)." },
  { type: "callout", variant: "error", title: "Холболт timeout болох", text: "Network Access дээр IP чинь зөвшөөрөгдөөгүй. 0.0.0.0/0 нэм." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Database, Collection, Document-ийн ялгааг бич.",
    "Дунд: Atlas дээр үнэгүй cluster үүсгэ.",
    "Хүнд: Connection string-ээ `.env`-д тавьж туршиж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "MongoDB-д нэг бичлэгийг юу гэдэг вэ?", options: ["Row", "Document", "Table", "Column"], answer: 1 },
    { q: "Ижил төрлийн баримтуудын бүлэг?", options: ["Database", "Collection", "Document", "Index"], answer: 1 },
    { q: "Баримт бүрийн давтагдашгүй талбар?", options: ["id", "_id", "key", "uid"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["MongoDB = document (JSON шиг) хадгалдаг NoSQL сан.", "Database > Collection > Document шатлал.", "Atlas дээр үнэгүй cluster үүсгэж болно."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**NoSQL** — SQL-ээс юугаараа ялгаатай, хэзээ алийг сонгохыг үзнэ." },
];

// m6l3 — NoSQL
export const m6l3: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "SQL ба NoSQL-ийн ялгаа, давуу/сул талыг ойлгож зөв сонголт хийнэ." },
  { type: "h", text: "Онол" },
  { type: "ul", items: [
    "**SQL** (PostgreSQL, MySQL) — хүснэгт, мөр, багана. Схем хатуу тогтсон. Холбоос (JOIN) хүчтэй.",
    "**NoSQL** (MongoDB) — document. Схем уян хатан. Хурдан бичдэг, өргөжүүлэхэд амар.",
  ] },
  { type: "code", lang: "text", code: `SQL (хүснэгт)              NoSQL (document)
┌────┬──────┬───────┐      {
│ id │ name │ email │        "_id": 1,
├────┼──────┼───────┤        "name": "Bat",
│ 1  │ Bat  │ b@... │        "email": "b@...",
└────┴──────┴───────┘        "tags": ["vip"]     ← массив шууд хадгална
                            }` },
  { type: "h", text: "Хэзээ алийг сонгох вэ?" },
  { type: "ul", items: [
    "NoSQL: бүтэц өөрчлөгддөг, хурдан хөгжүүлэх, их хэмжээний бичилт (ж: log, chat).",
    "SQL: хатуу дүрэм, олон хүснэгтийн нарийн холбоос, гүйлгээ (банк, санхүү).",
    "Бодит байдал: төслөөс хамаарна, хоёуланг нь мэдэх нь хамгийн сайн.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "warn", title: "NoSQL = схемгүй гэж ойлгох", text: "Mongoose-оор схем тодорхойлдог. Уян хатан ≠ дүрэмгүй." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: SQL ба NoSQL-ийн 3 ялгааг бич.",
    "Дунд: Food Delivery-д аль нь тохиромжтойг шалтгаантай бич.",
    "Хүнд: Банкны системд яагаад SQL илүү тохиромжтойг тайлбарла.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "MongoDB аль ангилалд вэ?", options: ["SQL", "NoSQL", "Cache", "File"], answer: 1 },
    { q: "SQL-ийн хүчтэй тал?", options: ["Уян хатан схем", "JOIN ба гүйлгээ", "Зөвхөн хурд", "Схемгүй"], answer: 1 },
    { q: "NoSQL-д массивыг яаж хадгалах вэ?", options: ["Тусдаа хүснэгтэд", "Document дотор шууд", "Боломжгүй", "Текст болгож"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["SQL = хүснэгт, хатуу схем, JOIN.", "NoSQL = document, уян хатан, хурдан.", "Төслөөс хамааран сонгоно."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Router** — URL-уудаа зохион байгуулж, controller-той холбоно." },
];

// m6l4 — Router
export const m6l4: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Express Router-ээр route-уудаа тусдаа файлд зохион байгуулна." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Router** нь холбогдох route-уудыг нэг файлд бүлэглэж, үндсэн апп-д залгадаг механизм. `index.ts` цэвэрхэн үлдэнэ." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `// src/routes/food.route.ts
import { Router } from "express";
import {
  getFoods, getFoodById, createFood, updateFood, deleteFood,
} from "../controllers/food.controller";
import { authMiddleware, adminOnly } from "../middlewares/auth.middleware";

const foodRouter = Router();

foodRouter.get("/", getFoods);                              // нээлттэй
foodRouter.get("/:id", getFoodById);
foodRouter.post("/", authMiddleware, adminOnly, createFood); // зөвхөн admin
foodRouter.put("/:id", authMiddleware, adminOnly, updateFood);
foodRouter.delete("/:id", authMiddleware, adminOnly, deleteFood);

export default foodRouter;` },
  { type: "code", lang: "ts", code: `// src/index.ts — router-уудаа залгах
import express from "express";
import foodRouter from "./routes/food.route";
import userRouter from "./routes/user.route";

const app = express();
app.use(express.json());

app.use("/api/foods", foodRouter);   // /api/foods, /api/foods/:id
app.use("/api/users", userRouter);

app.listen(8000);` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Route дараалал буруу", text: "`/:id` нь `/popular`-аас ӨМНӨ байвал \"popular\"-ыг id гэж уншина. Тодорхой замуудаа эхэнд бич." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `category.route.ts` файл үүсгэж 2 route бич.",
    "Дунд: `index.ts`-д залгаж туршиж үз.",
    "Хүнд: Route дараалал буруу бол юу болохыг туршиж хар.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Router юунд зориулагдсан вэ?", options: ["Route-уудыг бүлэглэх", "DB холбох", "CSS", "Auth"], answer: 0 },
    { q: "Router-ыг апп-д яаж залгах вэ?", options: ["app.get()", "app.use('/api/x', router)", "app.router()", "app.add()"], answer: 1 },
    { q: "`/:id` хаана байх ёстой вэ?", options: ["Эхэнд", "Тодорхой замуудын дараа", "Хамаагүй", "Файлын гадна"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Router = route-уудын бүлэг.", "`app.use(\"/api/x\", router)`-ээр залгана.", "Dynamic route (`/:id`) сүүлд байрлана."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Controller** — бизнес логикоо тусад нь бичнэ." },
];

// m6l5 — Controller
export const m6l5: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Controller функцүүд бичиж, CRUD логикоо route-оос салгана." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Controller** нь хүсэлтийг хүлээж авч, өгөгдлийг шалгаж, Model-ыг дуудаж, хариу буцаадаг функц. Route зөвхөн \"хаана\", controller \"юу хийхийг\" заана." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `// src/controllers/food.controller.ts
import { Request, Response } from "express";
import { Food } from "../models/food.model";

// GET /api/foods
export const getFoods = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const foods = await Food.find(filter).populate("category");
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: "Хоолны жагсаалт авахад алдаа гарлаа" });
  }
};

// POST /api/foods
export const createFood = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "name ба price заавал" });
    }

    const food = await Food.create({ name, price, category });
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ error: "Хоол үүсгэхэд алдаа гарлаа" });
  }
};

// DELETE /api/foods/:id
export const deleteFood = async (req: Request, res: Response) => {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Хоол олдсонгүй" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Устгахад алдаа гарлаа" });
  }
};` },
  { type: "h", text: "Сайн controller-ийн шинж" },
  { type: "ul", items: [
    "Нэг функц = нэг үйлдэл.",
    "try/catch заавал.",
    "Validation эхэнд хийж 400 буцаана.",
    "Зөв status code (200/201/204/404/500).",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "await мартах", text: "`const foods = Food.find()` бол Promise. `await` тавь." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `getFoodById` controller бич.",
    "Дунд: `updateFood`-д validation нэм.",
    "Хүнд: Бүх controller-т try/catch болон зөв status code нэм.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Controller юу хийдэг вэ?", options: ["Логик, хариу буцаах", "Зөвхөн CSS", "DB схем", "Route зам"], answer: 0 },
    { q: "Үүсгэсний status?", options: ["200", "201", "204", "400"], answer: 1 },
    { q: "Алдаа барихад?", options: ["if/else", "try/catch", "switch", "for"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Controller = логик + хариу.", "Нэг функц нэг үйлдэл, try/catch заавал.", "Validation → зөв status code."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**TypeScript (backend)** — Request/Response-ыг төрөлжүүлж аюулгүй болгоно." },
];

// m6l6 — TypeScript (backend)
export const m6l6: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Express-ийн Request/Response-ыг төрөлжүүлж, custom type нэмж сурна." },
  { type: "h", text: "Онол" },
  { type: "p", text: "Backend дээр TypeScript ашиглавал `req.body`, `req.params` доторх өгөгдлийн бүтэц тодорхой болж, алдааг эрт илрүүлнэ." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `import { Request, Response } from "express";

// Body-ийн бүтцийг тодорхойлно
interface CreateFoodBody {
  name: string;
  price: number;
  category?: string;
}

// Request<Params, ResBody, ReqBody, Query>
export const createFood = async (
  req: Request<object, object, CreateFoodBody>,
  res: Response,
) => {
  const { name, price } = req.body;   // одоо автомат санамж ажиллана
  // ...
};

// Params-тай
export const getFood = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;   // id нь string гэж мэдэгдэнэ
};` },
  { type: "h", text: "JWT хэрэглэгчийг req-д нэмэх" },
  { type: "code", lang: "ts", code: `// src/types/express.d.ts — Express-ийн Request-ыг өргөтгөнө
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };   // auth middleware энд тавина
    }
  }
}
export {};` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Property 'user' does not exist on type 'Request'", text: "Дээрх `express.d.ts` файлыг үүсгэж Request-ыг өргөтгө." },
  { type: "callout", variant: "error", title: "any ашиглах", text: "`req: any` бол TypeScript-ийн утгыг алдагдуулна. Зөв төрлөө бич." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `CreateUserBody` interface бич.",
    "Дунд: Controller-даа Request-ийн generic-ийг ашигла.",
    "Хүнд: `express.d.ts` үүсгэж `req.user` нэм.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Body-ийн төрлийг хаана заах вэ?", options: ["Request-ийн 3 дахь generic", "Response", "params", "query"], answer: 0 },
    { q: "req.user нэмэхэд юу хэрэгтэй вэ?", options: ["any", "declare global өргөтгөл", "JSON", "middleware л хангалттай"], answer: 1 },
    { q: "Муу практик нь?", options: ["interface", "generic", "any", "type"], answer: 2 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["`Request<Params, ResBody, ReqBody, Query>` generic ашиглана.", "`declare global`-оор Request-ыг өргөтгөнө.", "`any`-аас зайлсхий."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Middleware** — хүсэлтийн замд орших шүүлтүүрүүд." },
];

// m6l7 — Middleware
export const m6l7: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Middleware гэж юу вэ, `next()`-ийн үүрэг, өөрийн middleware бичихийг сурна." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Middleware** нь хүсэлт controller-т хүрэхээс ӨМНӨ ажилладаг функц. Шалгах, өөрчлөх, зогсоох боломжтой. `next()` дуудвал дараагийнх руу шилжинэ." },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Онгоцны буудлын шалгалт: тасалбар шалгах → ачаа шалгах → аюулгүй байдал → онгоц. Алхам бүр middleware. Аль нэгэнд нь тэнцэхгүй бол цааш явахгүй." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `import { Request, Response, NextFunction } from "express";

// 1) Лог бичих middleware
export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();   // заавал дуудна, эс бөгөөс хүсэлт гацна!
};

// 2) Хэрэглэгч нэвтэрсэн эсэхийг шалгах
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Нэвтэрч орно уу" });   // зогсооно
  }
  next();
};

// 3) Зөвхөн admin
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Танд эрх байхгүй" });
  }
  next();
};` },
  { type: "code", lang: "ts", code: `// Ашиглах
app.use(logger);                                    // бүх route-д
app.get("/profile", authMiddleware, getProfile);    // зөвхөн энэ route-д
app.post("/foods", authMiddleware, adminOnly, createFood);  // дараалан` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Хүсэлт гацаж хариу ирэхгүй", text: "`next()` дуудаагүй эсвэл хариу буцаагаагүй. Middleware заавал `next()` эсвэл `res.json()` хийх ёстой." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: logger middleware бичиж туршиж үз.",
    "Дунд: Тодорхой route-д л ажилладаг middleware нэм.",
    "Хүнд: `next()`-ийг устгаад юу болохыг ажигла.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Middleware хэзээ ажиллах вэ?", options: ["Controller-ийн дараа", "Controller-т хүрэхээс өмнө", "Хэзээ ч үгүй", "Зөвхөн алдаанд"], answer: 1 },
    { q: "Дараагийнх руу шилжүүлэх функц?", options: ["continue()", "next()", "pass()", "go()"], answer: 1 },
    { q: "Эрх байхгүй үед?", options: ["401", "403", "404", "500"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Middleware = controller-ийн өмнөх шүүлтүүр.", "`next()` заавал дуудна, эс бөгөөс гацна.", "Дараалан олон middleware залгаж болно."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Mongoose ODM** — MongoDB-тэй ажиллахыг хялбарчилна." },
];

// m6l8 — Mongoose ODM
export const m6l8: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Mongoose-оор MongoDB-д холбогдож, схем тодорхойлж, CRUD хийнэ." },
  { type: "h", text: "Онол — ODM гэж юу вэ?" },
  { type: "p", text: "**ODM** (Object Document Mapper) нь MongoDB-ийн document-ыг JavaScript объект болгон хөрвүүлж, схем шалгалт, validation нэмдэг сан. **Mongoose** бол хамгийн түгээмэл нь." },
  { type: "h", text: "Холболт" },
  { type: "code", lang: "bash", code: `npm install mongoose` },
  { type: "code", lang: "ts", code: `// src/utils/db.ts
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✓ MongoDB холбогдлоо");
  } catch (err) {
    console.error("✗ MongoDB алдаа:", err);
    process.exit(1);   // холбогдоогүй бол серверийг зогсооно
  }
};` },
  { type: "h", text: "CRUD аргууд" },
  { type: "code", lang: "ts", code: `// Үүсгэх
const food = await Food.create({ name: "Пицца", price: 25000 });

// Олох
const all = await Food.find();                          // бүгд
const one = await Food.findById(id);                    // id-гаар
const filtered = await Food.find({ price: { $lt: 30000 } });  // 30000-аас бага

// Засах
await Food.findByIdAndUpdate(id, { price: 28000 }, { new: true });

// Устгах
await Food.findByIdAndDelete(id);

// Тоолох
const count = await Food.countDocuments({ category: catId });` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "OverwriteModelError", text: "Нэг model-ыг 2 удаа зарласан. `models.Food ?? model(\"Food\", schema)` гэж хамгаал." },
  { type: "callout", variant: "error", title: "findByIdAndUpdate хуучин утга буцаана", text: "`{ new: true }` сонголт нэмбэл шинэчлэгдсэн утга буцаана." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `connectDB` бичиж серверт дууд.",
    "Дунд: `find` дээр filter нэмж туршиж үз.",
    "Хүнд: `countDocuments` ашиглаж статистик гарга.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "ODM гэж юу вэ?", options: ["Object Document Mapper", "Online Data Manager", "Open DB Model", "Output Data Method"], answer: 0 },
    { q: "Шинэчилсэн утга буцаах сонголт?", options: ["{ new: true }", "{ return: true }", "{ fresh: true }", "автомат"], answer: 0 },
    { q: "Бүх баримт олох арга?", options: ["getAll()", "find()", "select()", "all()"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Mongoose = MongoDB-ийн ODM.", "`create/find/findById/findByIdAndUpdate/findByIdAndDelete`.", "`{ new: true }` шинэчилсэн утга буцаана."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Model** — схем тодорхойлж, validation нэмнэ." },
];

// m6l9 — Model
export const m6l9: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Mongoose schema/model бичиж, validation, default, timestamps нэмнэ." },
  { type: "h", text: "Кодын жишээ — User model" },
  { type: "code", lang: "ts", code: `// src/models/user.model.ts
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: [true, "Имэйл заавал"],   // custom мессеж
      unique: true,                       // давхардахгүй
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["user", "admin"],   // зөвхөн эдгээр утга
      default: "user",
    },
    address: { type: String, default: "" },
  },
  { timestamps: true },   // createdAt, updatedAt автоматаар
);

export const User = models.User ?? model("User", userSchema);` },
  { type: "h", text: "Food model (холбоостой)" },
  { type: "code", lang: "ts", code: `// src/models/food.model.ts
import { Schema, model, models, Types } from "mongoose";

const foodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" },
    ingredients: { type: String, default: "" },
    category: {
      type: Types.ObjectId,     // өөр collection руу заана
      ref: "FoodCategory",      // аль collection бэ
      required: true,
    },
  },
  { timestamps: true },
);

export const Food = models.Food ?? model("Food", foodSchema);` },
  { type: "h", text: "Түгээмэл validation" },
  { type: "ul", items: [
    "`required: true` — заавал байх",
    "`unique: true` — давхардахгүй (index үүсгэнэ)",
    "`minlength` / `maxlength` — текстийн урт",
    "`min` / `max` — тооны хязгаар",
    "`enum: [...]` — зөвхөн заасан утгууд",
    "`default: ...` — өгөөгүй үед автоматаар",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "E11000 duplicate key error", text: "`unique: true` талбарт давхардсан утга оруулсан (ж: бүртгэлтэй имэйл). 409 буцааж мэдэгд." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `FoodCategory` model бич.",
    "Дунд: `Order` model-д `status` enum нэм.",
    "Хүнд: `OrderItem`-д ref болон quantity нэмж бич.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "createdAt автоматаар нэмэх сонголт?", options: ["{ timestamps: true }", "{ auto: true }", "{ date: true }", "гараар"], answer: 0 },
    { q: "Зөвхөн тодорхой утга зөвшөөрөх?", options: ["required", "enum", "unique", "default"], answer: 1 },
    { q: "Давхардсан имэйлийн алдаа?", options: ["E11000", "404", "ECONN", "TypeError"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Schema = өгөгдлийн бүтэц + дүрэм.", "required/unique/enum/default/min-max validation.", "`{ timestamps: true }` огноог автоматаар нэмнэ."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Render.io (Deployment)** — backend-ээ интернэтэд гаргана." },
];

// m6l10 — Render.io
export const m6l10: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Express backend-ээ Render.com дээр үнэгүй deploy хийнэ." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Render** нь Node.js сервер байршуулах үнэгүй платформ. Vercel нь frontend-д тохиромжтой бол Render нь байнга ажилладаг backend-д зориулагдсан." },
  { type: "h", text: "Бэлтгэл" },
  { type: "code", lang: "json", code: `// package.json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",                 // TypeScript → JavaScript
    "start": "node dist/index.js"   // Render үүнийг ажиллуулна
  }
}` },
  { type: "code", lang: "ts", code: `// src/index.ts — PORT-ыг орчноос авах ЁСТОЙ
const PORT = process.env.PORT || 8000;   // Render өөрөө PORT өгдөг
app.listen(PORT, () => console.log(\`Port \${PORT}\`));` },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "ol", items: [
    "Кодоо GitHub-д push хий.",
    "render.com → New → Web Service.",
    "GitHub repo-гоо холбо.",
    "Build Command: `npm install && npm run build`",
    "Start Command: `npm start`",
    "Environment → `MONGODB_URI`, `JWT_SECRET` зэргийг нэм.",
    "Create Web Service дар.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Port scan timeout", text: "`process.env.PORT`-ыг ашиглаагүй, хатуу 8000 бичсэн. Render-ийн өгсөн PORT-ыг ашигла." },
  { type: "callout", variant: "warn", title: "Эхний хүсэлт удаан", text: "Үнэгүй багц 15 мин идэвхгүй бол унтдаг. Эхний хүсэлт 30-50 сек болдог — хэвийн." },
  { type: "callout", variant: "error", title: "CORS алдаа", text: "Frontend-ийн домэйныг зөвшөөр: `app.use(cors({ origin: \"https://your-app.vercel.app\" }))`." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `build` ба `start` script нэм.",
    "Дунд: `process.env.PORT` ашиглаж засварла.",
    "Хүнд: Render дээр deploy хийж live URL ав.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Backend-д тохиромжтой платформ?", options: ["Render", "Figma", "Postman", "npm"], answer: 0 },
    { q: "PORT-ыг хаанаас авах вэ?", options: ["Хатуу бичих", "process.env.PORT", "package.json", "DB"], answer: 1 },
    { q: "Нууц утгуудыг хаана тавих вэ?", options: ["Код дотор", "Environment Variables", "GitHub", "README"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Render = backend deploy хийх үнэгүй платформ.", "`process.env.PORT` заавал ашиглана.", "Env хувьсагчийг Render дээр нэмнэ."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Mongoose population** — холбоотой өгөгдлийг хамт татна." },
];

// m6l11 — Mongoose population
export const m6l11: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`ref` болон `populate()`-ээр холбоотой document-уудыг хамт татна." },
  { type: "h", text: "Онол" },
  { type: "p", text: "MongoDB-д SQL-ийн JOIN байхгүй. Оронд нь `ObjectId`-гаар холбоод, **`populate()`**-ээр тэр баримтыг дүүргэж татдаг." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `// Model дээр ref заана
const foodSchema = new Schema({
  name: String,
  category: { type: Types.ObjectId, ref: "FoodCategory" },
});

// populate-гүй → зөвхөн id ирнэ
const foods = await Food.find();
// [{ name: "Пицца", category: "65f1a2..." }]

// populate-тэй → бүтэн объект ирнэ
const foods2 = await Food.find().populate("category");
// [{ name: "Пицца", category: { _id: "65f1a2...", name: "Fast Food" } }]

// Зөвхөн хэрэгтэй талбар
const foods3 = await Food.find().populate("category", "name");

// Олон түвшин (Order → items → food)
const orders = await Order.find()
  .populate("user", "name email")
  .populate({
    path: "items",
    populate: { path: "food", select: "name price" },
  });` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "populate ажиллахгүй, зөвхөн id ирнэ", text: "Schema дээр `ref` заагаагүй, эсвэл `ref`-ийн нэр model-ийн нэртэй яг таарахгүй байна." },
  { type: "callout", variant: "warn", title: "Хэт олон populate удаашруулна", text: "Зөвхөн хэрэгтэй талбарыг `select`-ээр ав. Хэт олон түвшин бол aggregate ашигла." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Food-ийн category-г populate хий.",
    "Дунд: Зөвхөн `name` талбарыг сонгож ав.",
    "Хүнд: Order → items → food гэсэн 2 түвшин populate хий.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Холбоотой баримт татах арга?", options: ["join()", "populate()", "include()", "with()"], answer: 1 },
    { q: "Schema дээр юу заах ёстой вэ?", options: ["ref", "link", "join", "fk"], answer: 0 },
    { q: "Зөвхөн зарим талбар авах?", options: ["filter", "select", "where", "only"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["`ref` + `populate()` = MongoDB-ийн JOIN.", "`select`-ээр хэрэгтэй талбараа л ав.", "Гүн populate удаашруулж болзошгүй."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Mongoose Aggregate** — нарийн тооцоолол, статистик хийнэ." },
];

// m6l12 — Mongoose Aggregate
export const m6l12: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Aggregation pipeline-аар бүлэглэх, тоолох, дундаж гаргах зэрэг тооцоолол хийнэ." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Aggregate** нь өгөгдлийг үе шаттайгаар (pipeline) боловсруулах хэрэгсэл. Шат бүр өмнөхийн үр дүнг авч дараагийнх руу дамжуулна." },
  { type: "h", text: "Гол шатууд" },
  { type: "ul", items: [
    "`$match` — шүүх (WHERE)",
    "`$group` — бүлэглэх (GROUP BY)",
    "`$sort` — эрэмбэлэх",
    "`$limit` — тоог хязгаарлах",
    "`$lookup` — өөр collection-той нэгтгэх (JOIN)",
    "`$project` — талбар сонгох",
  ] },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `// Ангилал бүрийн хоолны тоо, дундаж үнэ
const stats = await Food.aggregate([
  { $match: { price: { $gt: 0 } } },          // 1) шүүх
  {
    $group: {                                  // 2) бүлэглэх
      _id: "$category",                        //    юугаар бүлэглэх
      count: { $sum: 1 },                      //    тоолох
      avgPrice: { $avg: "$price" },            //    дундаж
      maxPrice: { $max: "$price" },
    },
  },
  { $sort: { count: -1 } },                    // 3) буурахаар эрэмбэлэх
  { $limit: 5 },                               // 4) эхний 5
]);

// Хамгийн их захиалагдсан хоол
const top = await Order.aggregate([
  { $unwind: "$items" },                       // массивыг задлах
  { $group: { _id: "$items.food", total: { $sum: "$items.quantity" } } },
  { $sort: { total: -1 } },
  { $limit: 10 },
]);` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "$ тэмдэг мартах", text: "Талбар заахдаа `\"$price\"` гэж `$`-тай бичнэ. `\"price\"` гэвэл текст гэж үзнэ." },
  { type: "callout", variant: "warn", title: "$match-ыг сүүлд тавих", text: "`$match`-ыг ЭХЭНД тавибал өгөгдөл багасаж, хамаагүй хурдан болно." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Ангилал бүрийн хоолны тоог гарга.",
    "Дунд: Дундаж үнийг нэмж тооцоол.",
    "Хүнд: Захиалгын нийт дүнг сараар бүлэглэ.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Бүлэглэх шат?", options: ["$match", "$group", "$sort", "$limit"], answer: 1 },
    { q: "Шүүх шат?", options: ["$match", "$group", "$project", "$unwind"], answer: 0 },
    { q: "$match-ыг хаана тавих нь хурдан вэ?", options: ["Эхэнд", "Сүүлд", "Дунд", "Хамаагүй"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Aggregate = үе шаттай боловсруулалт (pipeline).", "`$match → $group → $sort → $limit` түгээмэл дараалал.", "Талбарыг `$` тэмдэгтэй заана."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**useContext** — frontend дээр global state удирдана." },
];

// m6l13 — useContext
export const m6l13: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Context API-аар хэрэглэгч болон сагсны төлөвийг апп даяар хуваалцана." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Context** нь props-ыг олон түвшин дамжуулахгүйгээр (prop drilling) өгөгдлийг апп даяар хуваалцах арга. Хэрэглэгчийн мэдээлэл, сагс зэрэгт тохиромжтой." },
  { type: "h", text: "Кодын жишээ — Cart Context" },
  { type: "code", lang: "tsx", code: `"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem { id: string; name: string; price: number; qty: number }

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        // Байвал тоог нэмнэ
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, total }}>
      {children}
    </CartContext.Provider>
  );
}

// Хялбар ашиглах hook
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart-ыг CartProvider дотор ашиглана уу");
  return ctx;
}` },
  { type: "code", lang: "tsx", code: `// app/layout.tsx — апп-аа ороож өгнө
import { CartProvider } from "@/context/cart-context";

export default function RootLayout({ children }) {
  return (
    <html><body>
      <CartProvider>{children}</CartProvider>
    </body></html>
  );
}

// Дурын component дотор
const { items, addItem, total } = useCart();` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "useCart-ыг Provider-гүй дуудах", text: "Component нь `<CartProvider>` дотор байх ёстой. layout.tsx-д ороосон эсэхээ шалга." },
  { type: "callout", variant: "error", title: "State шууд өөрчлөх", text: "`items.push(x)` (буруу). `setItems([...items, x])` гэж шинэ массив үүсгэ." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `UserContext` үүсгэж нэвтэрсэн хэрэглэгчийг хадгал.",
    "Дунд: Cart-д `increaseQty`/`decreaseQty` нэм.",
    "Хүнд: Сагсыг localStorage-д хадгалж хуудас сэргээхэд үлдээ.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Context юуг шийддэг вэ?", options: ["Prop drilling", "Routing", "DB холболт", "CSS"], answer: 0 },
    { q: "Provider-ыг хаана тавих вэ?", options: ["Хамгийн доор", "layout/root дээр", "API дотор", "model-д"], answer: 1 },
    { q: "Context ямар component-д ажиллах вэ?", options: ["Server", "Client", "Хоёулаа", "Аль нь ч биш"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Context = апп даяар хуваалцах state.", "Provider-ээр ороож, custom hook-оор ашиглана.", "Client Component-д л ажиллана."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Authorization** — хэн юу хийж болохыг хянана." },
];

// m6l14 — Authorization
export const m6l14: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Authentication ба Authorization-ийн ялгааг ойлгож, role-д суурилсан хамгаалалт хийнэ." },
  { type: "h", text: "Онол — Хоёрын ялгаа" },
  { type: "ul", items: [
    "**Authentication (нэвтрэлт)** — \"Чи хэн бэ?\" Нэвтрэх, токен шалгах.",
    "**Authorization (эрх)** — \"Чи үүнийг хийж болох уу?\" Role шалгах.",
  ] },
  { type: "callout", variant: "tip", title: "Амьдралын жишээ", text: "Зочид буудал: Authentication = ресепшн дээр үнэмлэх шалгуулах. Authorization = таны түлхүүр зөвхөн 302 тоот, VIP давхарт нээхгүй." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `// src/middlewares/auth.middleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// 1) Authentication — токен шалгах
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];   // "Bearer xxx"
  if (!token) return res.status(401).json({ error: "Нэвтэрч орно уу" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string; role: string;
    };
    req.user = decoded;    // дараагийн middleware/controller ашиглана
    next();
  } catch {
    return res.status(401).json({ error: "Токен буруу эсвэл хугацаа дууссан" });
  }
};

// 2) Authorization — эрх шалгах
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Танд энэ эрх байхгүй" });
  }
  next();
};` },
  { type: "code", lang: "ts", code: `// Ашиглах — дараалал чухал: эхлээд хэн бэ, дараа нь эрхтэй юу
foodRouter.post("/", authMiddleware, adminOnly, createFood);
orderRouter.get("/my", authMiddleware, getMyOrders);   // нэвтэрсэн хэн ч болно` },
  { type: "h", text: "Frontend талд" },
  { type: "code", lang: "tsx", code: `// Admin хуудсыг хамгаалах
"use client";
import { useUser } from "@/context/user-context";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const { user, loading } = useUser();
  if (loading) return <p>Уншиж байна...</p>;
  if (user?.role !== "admin") redirect("/");
  return <div>Admin dashboard</div>;
}` },
  { type: "callout", variant: "warn", title: "Frontend хамгаалалт хангалтгүй", text: "Хөтөч дээрх шалгалтыг тойрч болно. Backend дээр ЗААВАЛ дахин шалга." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Authentication ба Authorization-ийн ялгааг бич.",
    "Дунд: `adminOnly` middleware бичиж route-д хэрэглэ.",
    "Хүнд: 401 болон 403 хоёрыг ялгаж буцаадаг болго.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "\"Чи хэн бэ?\" гэдэг нь?", options: ["Authentication", "Authorization", "Validation", "Encryption"], answer: 0 },
    { q: "Нэвтэрсэн ч эрх байхгүй бол?", options: ["401", "403", "404", "500"], answer: 1 },
    { q: "Жинхэнэ хамгаалалт хаана байх ёстой вэ?", options: ["Зөвхөн frontend", "Backend дээр заавал", "localStorage", "CSS"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Authentication = хэн бэ (401). Authorization = эрхтэй юу (403).", "Middleware-ийн дараалал: auth → role.", "Backend дээр заавал шалгана."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**JWT** — токен үүсгэж, нэвтрэлтийг хэрэгжүүлнэ." },
];

// m6l15 — JWT
export const m6l15: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "JWT токен үүсгэх, шалгах, frontend-д хадгалахыг сурна." },
  { type: "h", text: "Онол — JWT гэж юу вэ?" },
  { type: "p", text: "**JWT** (JSON Web Token) нь хэрэглэгчийн мэдээллийг агуулсан, гарын үсэгтэй текст. Сервер session хадгалахгүйгээр хэрэглэгчийг таньдаг." },
  { type: "code", lang: "text", code: `eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMyIsInJvbGUiOiJ1c2VyIn0.SflKxwRJ...
└──── header ────┘ └────── payload ──────┘ └── signature ──┘
   алгоритм          өгөгдөл (нууц БИШ!)      баталгаа` },
  { type: "callout", variant: "warn", title: "Payload нууцлагдаагүй!", text: "JWT-ийн payload-ыг хэн ч уншиж чадна (зөвхөн base64). Нууц үг, картын дугаар БҮҮ хий. Гарын үсэг нь зөвхөн өөрчлөгдөөгүйг батална." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "bash", code: `npm install jsonwebtoken
npm install -D @types/jsonwebtoken` },
  { type: "code", lang: "ts", code: `import jwt from "jsonwebtoken";

// Токен үүсгэх (нэвтрэх үед)
const token = jwt.sign(
  { id: user._id, role: user.role },       // payload
  process.env.JWT_SECRET!,                  // нууц түлхүүр
  { expiresIn: "7d" },                      // 7 хоногийн дараа дуусна
);

// Токен шалгах (middleware дотор)
const decoded = jwt.verify(token, process.env.JWT_SECRET!);
// { id: "...", role: "user", iat: ..., exp: ... }` },
  { type: "h", text: "Frontend талд" },
  { type: "code", lang: "tsx", code: `// Нэвтрэх
const { data } = await axios.post("/api/auth/login", { email, password });
localStorage.setItem("token", data.token);

// Дараагийн хүсэлтүүдэд header-ээр илгээх
axios.get("/api/orders/my", {
  headers: { Authorization: \`Bearer \${localStorage.getItem("token")}\` },
});` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "jwt malformed", text: "Токен буруу форматтай — ихэвчлэн `\"Bearer \"` угтварыг салгаагүй. `.split(\" \")[1]` хий." },
  { type: "callout", variant: "error", title: "JWT_SECRET-ыг код дотор бичих", text: "`.env`-д хадгална. GitHub-д хэзээ ч бүү push хий." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: JWT-ийн 3 хэсгийг нэрлэ.",
    "Дунд: Login controller-т токен үүсгэ.",
    "Хүнд: jwt.io дээр өөрийн токеноо задалж үз.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "JWT-ийн payload нууцлагдсан уу?", options: ["Тийм", "Үгүй — хэн ч уншина", "Заримдаа", "Зөвхөн сервер"], answer: 1 },
    { q: "Токен үүсгэх функц?", options: ["jwt.verify", "jwt.sign", "jwt.decode", "jwt.create"], answer: 1 },
    { q: "Header-т яаж илгээх вэ?", options: ["Authorization: Bearer <token>", "token: <token>", "body-д", "query-д"], answer: 0 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["JWT = header.payload.signature.", "`jwt.sign` үүсгэнэ, `jwt.verify` шалгана.", "Payload нууц биш — эмзэг мэдээлэл бүү хий."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**bcrypt** — нууц үгийг аюулгүй хадгална." },
];

// m6l16 — bcrypt
export const m6l16: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "bcrypt-ээр нууц үгийг хэшлэн хадгалж, нэвтрэх үед харьцуулна." },
  { type: "h", text: "Онол — Яагаад хэшлэх вэ?" },
  { type: "p", text: "Нууц үгийг **хэзээ ч задгай хадгалж болохгүй**. DB алдагдвал бүх хэрэглэгчийн нууц үг задарна. **bcrypt** нь буцаах боломжгүй хэлбэрт хувиргадаг." },
  { type: "callout", variant: "tip", title: "Hash vs Encrypt", text: "Encrypt = буцааж тайлж болно (2 талын). Hash = буцаах боломжгүй (нэг талын). Нууц үгэнд ЗААВАЛ hash ашиглана." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "bash", code: `npm install bcryptjs
npm install -D @types/bcryptjs` },
  { type: "code", lang: "ts", code: `import bcrypt from "bcryptjs";

// Бүртгүүлэх — хэшлэж хадгална
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: "Имэйл бүртгэлтэй" });

  // 10 = salt rounds (их байх тусам аюулгүй ч удаан)
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashed, name });
  res.status(201).json({ id: user._id, email: user.email });   // password БҮҮ буцаа
};

// Нэвтрэх — харьцуулна
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Имэйл эсвэл нууц үг буруу" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Имэйл эсвэл нууц үг буруу" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
};` },
  { type: "callout", variant: "tip", title: "Аюулгүй байдлын жижиг заль", text: "Имэйл олдоогүй ч, нууц үг буруу ч ИЖИЛ мессеж буцаа. Ингэснээр аль имэйл бүртгэлтэйг таахаас сэргийлнэ." },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Нууц үгийг задгай хадгалах", text: "`password: req.body.password` (маш аюултай). Заавал `bcrypt.hash` хий." },
  { type: "callout", variant: "error", title: "password-ыг хариунд буцаах", text: "User объектыг бүтнээр буцаавал hash ил гарна. Хэрэгтэй талбарыг л сонгож буцаа." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Hash ба encrypt-ийн ялгааг бич.",
    "Дунд: signup controller бичиж hash хий.",
    "Хүнд: login-д bcrypt.compare ашиглаж токен буцаа.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Нууц үгийг яаж хадгалах вэ?", options: ["Задгай", "bcrypt hash", "base64", "JSON"], answer: 1 },
    { q: "Нэвтрэхэд харьцуулах функц?", options: ["bcrypt.hash", "bcrypt.compare", "jwt.verify", "==="], answer: 1 },
    { q: "Hash-ийг буцааж тайлж болох уу?", options: ["Тийм", "Үгүй", "Заримдаа", "Зөвхөн admin"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Нууц үгийг заавал `bcrypt.hash`-ээр хадгална.", "Нэвтрэхэд `bcrypt.compare`.", "Hash-ийг хариунд хэзээ ч бүү буцаа."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Cloudinary** — зураг байршуулах үйлчилгээ." },
];

// m6l17 — Cloudinary
export const m6l17: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Cloudinary-д зураг байршуулж, URL-ыг DB-д хадгална." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Cloudinary** нь зураг хадгалах, оновчлох үүлэн үйлчилгээ. Зургийг өөрийн серверт хадгалахын оронд Cloudinary-д тавиад зөвхөн **URL**-ыг DB-д хадгална." },
  { type: "h", text: "Хийж үзэх алхам" },
  { type: "ol", items: [
    "cloudinary.com дээр үнэгүй бүртгүүл.",
    "Dashboard-аас Cloud name, API Key, API Secret-ээ ав.",
    "Settings → Upload → Upload preset үүсгэ (Unsigned).",
    "`.env`-д хадгал.",
  ] },
  { type: "code", lang: "bash", code: `# .env.local (frontend)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset` },
  { type: "h", text: "Frontend — зураг илгээх" },
  { type: "code", lang: "tsx", code: `"use client";
import { useState } from "react";

export default function ImageUpload({ onUploaded }) {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));   // урьдчилан харах
    setLoading(true);

    // FormData — файл илгээхэд ашиглана
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const res = await fetch(
      \`https://api.cloudinary.com/v1_1/\${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload\`,
      { method: "POST", body: formData },
    );
    const data = await res.json();

    onUploaded(data.secure_url);   // энэ URL-ыг DB-д хадгална
    setLoading(false);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFile} />
      {loading && <p>Байршуулж байна...</p>}
      {preview && <img src={preview} alt="preview" width={160} />}
    </div>
  );
}` },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Upload preset must be whitelisted", text: "Preset-ээ **Unsigned** болгож тохируул (Settings → Upload)." },
  { type: "callout", variant: "error", title: "API Secret-ыг frontend-д ил гаргах", text: "`NEXT_PUBLIC_`-ээр Secret-ыг БҮҮ гарга. Unsigned preset нь Secret шаарддаггүй." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Cloudinary бүртгүүлж preset үүсгэ.",
    "Дунд: Зураг сонгоод preview харуул.",
    "Хүнд: Байршуулаад буцаж ирсэн URL-ыг DB-д хадгал.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "DB-д юуг хадгалах вэ?", options: ["Зургийн файл", "Зургийн URL", "Base64", "Хоосон"], answer: 1 },
    { q: "Файл илгээхэд юу ашиглах вэ?", options: ["JSON", "FormData", "query", "params"], answer: 1 },
    { q: "Frontend-ээс шууд upload хийхэд preset ямар байх вэ?", options: ["Signed", "Unsigned", "Private", "Locked"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Cloudinary-д зураг тавьж URL-ыг DB-д хадгална.", "`FormData`-аар файл илгээнэ.", "API Secret-ыг frontend-д хэзээ ч бүү гарга."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Formik** — form удирдах өөр нэг түгээмэл сан." },
];

// m6l18 — Formik
export const m6l18: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Formik-ээр form төлөв, validation, submit-ыг удирдана." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Formik** нь React form-ыг удирдах сан. Утга, алдаа, touched төлөв, submit-ыг өөрөө хөтөлдөг тул useState олон удаа бичих шаардлагагүй." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "bash", code: `npm install formik yup` },
  { type: "code", lang: "tsx", code: `"use client";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Имэйл буруу").required("Заавал"),
      password: Yup.string().min(6, "Хамгийн багадаа 6 тэмдэгт").required("Заавал"),
    }),
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}          // талбараас гарахад touched болно
        placeholder="Имэйл"
      />
      {/* Зөвхөн хүрсэн (touched) бөгөөд алдаатай бол харуулна */}
      {formik.touched.email && formik.errors.email && (
        <p style={{ color: "red" }}>{formik.errors.email}</p>
      )}

      <input
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password && formik.errors.password && (
        <p style={{ color: "red" }}>{formik.errors.password}</p>
      )}

      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
      </button>
    </form>
  );
}` },
  { type: "h", text: "Formik vs React Hook Form" },
  { type: "ul", items: [
    "Formik — тодорхой, уншихад ойлгомжтой. Илүү олон re-render хийдэг.",
    "React Hook Form — илүү хурдан (uncontrolled), код богино.",
    "Хоёулаа сайн; багийн стандартаа дага.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "name атрибут дутуу", text: "`handleChange` нь `name`-ээр аль талбар болохыг таньдаг. `name=\"email\"` заавал бич." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Formik-ээр нэвтрэх form хий.",
    "Дунд: `confirmPassword` талбар нэмж таарч байгааг шалга.",
    "Хүнд: Мөн формыг React Hook Form-оор бичиж харьцуул.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Formik юуг удирддаг вэ?", options: ["Form төлөв, validation", "Routing", "DB", "Auth"], answer: 0 },
    { q: "Алдааг хэзээ харуулах нь зөв бэ?", options: ["Үргэлж", "touched болсны дараа", "Submit хийсний дараа л", "Хэзээ ч үгүй"], answer: 1 },
    { q: "handleChange юугаар талбарыг таних вэ?", options: ["id", "name", "class", "key"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: ["Formik = form төлөв + validation удирдагч.", "`values`, `errors`, `touched`, `handleChange`, `handleSubmit`.", "`name` атрибут заавал."] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Yup** — validation схем бичих сан." },
];

// m6l19 — Yup
export const m6l19: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Yup-аар validation схем бичиж, нарийн дүрэм тавина." },
  { type: "h", text: "Онол" },
  { type: "p", text: "**Yup** нь объектын бүтэц, дүрмийг тодорхойлдог validation сан. Formik-тэй хамт хамгийн түгээмэл ашиглагддаг (Zod-той төстэй)." },
  { type: "h", text: "Кодын жишээ" },
  { type: "code", lang: "ts", code: `import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .min(2, "Хамгийн багадаа 2 тэмдэгт")
    .max(50, "Хэтэрхий урт")
    .required("Нэр заавал"),

  email: Yup.string()
    .email("Имэйл буруу форматтай")
    .required("Имэйл заавал"),

  password: Yup.string()
    .min(6, "Хамгийн багадаа 6 тэмдэгт")
    .matches(/[0-9]/, "Дор хаяж нэг тоо байх ёстой")
    .required("Нууц үг заавал"),

  // Өөр талбартай харьцуулах
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна")
    .required("Давтан оруулна уу"),

  age: Yup.number()
    .min(18, "18-аас дээш насны байх")
    .required("Нас заавал"),

  phone: Yup.string()
    .matches(/^[0-9]{8}$/, "8 оронтой дугаар оруулна уу")
    .optional(),
});` },
  { type: "h", text: "Түгээмэл дүрмүүд" },
  { type: "ul", items: [
    "`.required(msg)` — заавал",
    "`.min(n)` / `.max(n)` — урт эсвэл утгын хязгаар",
    "`.email()` — имэйл формат",
    "`.matches(regex, msg)` — өөрийн загвар",
    "`.oneOf([...])` — тодорхой утгуудын нэг",
    "`.ref(\"field\")` — өөр талбарыг заана",
  ] },
  { type: "h", text: "Yup vs Zod" },
  { type: "ul", items: [
    "Yup — Formik-тэй уламжлалт хос, JS төслүүдэд түгээмэл.",
    "Zod — TypeScript-д илүү сайн (`z.infer`-ээр төрөл автоматаар гарна).",
    "TypeScript төсөлд Zod илүү тохиромжтой.",
  ] },
  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "oneOf ажиллахгүй", text: "`Yup.ref(\"password\")`-ыг массив дотор бич: `.oneOf([Yup.ref(\"password\")], msg)`." },
  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Нэр, имэйл шалгах схем бич.",
    "Дунд: Нууц үг давтахыг `oneOf`-ээр шалга.",
    "Хүнд: Утасны дугаарыг regex-ээр шалга.",
  ] },
  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Өөр талбарыг заах?", options: ["Yup.ref()", "Yup.link()", "Yup.same()", "Yup.get()"], answer: 0 },
    { q: "Заавал болгох?", options: [".must()", ".required()", ".need()", ".force()"], answer: 1 },
    { q: "TypeScript-д илүү тохирох нь?", options: ["Yup", "Zod", "Ялгаагүй", "Аль нь ч биш"], answer: 1 },
  ] },
  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Yup = validation схем бичих сан.",
    "`required/min/max/email/matches/oneOf` түгээмэл.",
    "6-р модуль дууслаа! Full-Stack апп бүтээх бүх хэрэгсэл бэлэн боллоо 🎉",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**7-р модуль: AI Image Model.** AI загвар, Gemini API-г апп-даа холбоно." },
];
