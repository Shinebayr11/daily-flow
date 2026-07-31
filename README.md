# DailyFlow

Өдөр тутмын төлөвлөгөө болон дадал хянах орчин үеийн, responsive productivity dashboard.
A clean daily planner + habit tracker built with Next.js App Router, TypeScript, Tailwind, shadcn/ui, MongoDB and Clerk.

## Онцлог (Features)

- **Dashboard** — өнөөдрийн статистик, гүйцэтгэлийн хувь, habit streak, долоо хоногийн график.
- **Today** — timeline хэлбэрээр цагийн дарааллаар, checkbox-оор дуусгах, өдрийг дуусгах flow.
- **Tomorrow** — маргаашийн ажлаа урьдчилан бэлдэх, Top 3 priority сонгох.
- **Weekly Plan** — Даваа–Ням 7 хоногийн зорилго ба өдөр бүрийн ажлууд.
- **Habits** — дадал үүсгэх, өдөр тутам тэмдэглэх, 7 хоногийн хүснэгт, streak.
- **Calendar** — сарын харагдац, өдөр бүрийг гүйцэтгэлээр өнгөөр ялгах.
- **Statistics** — Recharts график, category distribution, гол үзүүлэлтүүд.
- **Daily Review** — өдрийн дүгнэлт, 1–5 одны үнэлгээ, mood.
- **Move to tomorrow** — хийгээгүй ажлыг зөвшөөрөлтэйгээр маргааш руу шилжүүлэх.
- Dark mode, responsive sidebar + mobile navigation, toast, form validation.

## Технологи (Tech stack)

Next.js 15 (App Router) · TypeScript · Tailwind CSS v3 · shadcn/ui · Radix UI · Lucide ·
MongoDB + Mongoose · Clerk (auth) · React Hook Form + Zod · SWR · Recharts · Sonner · next-themes.

## Урьдчилсан нөхцөл (Prerequisites)

- **Node.js 20.6+** (`--env-file` дэмждэг хувилбар)
- **MongoDB** — локал (`mongodb://127.0.0.1:27017/dailyflow`) эсвэл MongoDB Atlas
- **Clerk** аккаунт → https://dashboard.clerk.com (үнэгүй)

## Суулгах ба ажиллуулах (Setup)

```bash
# 1. Хамаарлуудыг суулгах
npm install

# 2. Орчны хувьсагч тохируулах
cp .env.local.example .env.local
#    .env.local дотор дараахыг бөглөнө:
#    - MONGODB_URI
#    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY (Clerk dashboard-аас)

# 3. Хөгжүүлэлтийн серверийг асаах
npm run dev
```

http://localhost:3000 нээгээд бүртгүүлж (sign up) орно.

### Demo data (сонголт)

Хоёр арга:

1. **UI**: Нэвтэрсний дараа **Settings → Add demo data** товч дарах.
2. **CLI**: Нэг удаа нэвтэрч Clerk user id (`user_...`) авч `.env.local` дотор `SEED_USER_ID`-д хийгээд:

```bash
npm run seed
```

## Clerk тохиргоо (5 алхам)

1. Clerk dashboard дээр шинэ application үүсгэнэ.
2. Email/password эсвэл Google зэрэг sign-in method сонгоно.
3. **API Keys** хэсгээс publishable + secret key-г хуулна.
4. `.env.local`-д буулгана.
5. Application-ийн allowed origins-д `http://localhost:3000` нэмэгдсэн эсэхийг шалгана.

`middleware.ts` нь `/`, `/sign-in`, `/sign-up`-аас бусад бүх route-ыг хамгаалдаг.

## Folder structure

```
src/
├── app/
│   ├── (app)/                 # Хамгаалагдсан хэсэг (shared sidebar layout)
│   │   ├── dashboard/  today/  tomorrow/  weekly-plan/
│   │   ├── habits/  calendar/  statistics/  daily-review/  settings/
│   │   └── layout.tsx
│   ├── (auth)/                # Clerk sign-in / sign-up
│   ├── api/                   # Route handlers (tasks, habits, weekly-plan, reviews, seed)
│   ├── layout.tsx  page.tsx  globals.css  providers.tsx
├── components/
│   ├── layout/   # AppSidebar, MobileNavigation, DashboardHeader, nav-items
│   ├── tasks/    # TaskCard, TaskList, TaskForm, AddTaskDialog, DailyTimeline, MoveToTomorrowDialog
│   ├── habits/   # HabitCard, WeeklyHabitGrid, AddHabitDialog
│   ├── weekly/   # WeeklyPlanner, GoalsEditor
│   ├── statistics/ # CompletionChart, DailyReviewForm
│   ├── shared/   # StatCard, ProgressCard, badges, EmptyState, LoadingSkeleton, ConfirmDeleteDialog, StarRating
│   └── ui/       # shadcn/ui primitives
├── hooks/        # use-tasks, use-habits, use-weekly-plan, use-reviews (SWR)
├── lib/          # mongodb, api, validations (Zod), date, serialize, constants, demo-data, ...
├── models/       # Mongoose: User, Task, Habit, WeeklyPlan, DailyReview
├── types/        # Domain types (DTOs)
└── utils/        # tasks (sort, stats)
scripts/seed.mjs  # Standalone demo-data seeder
```

## Загварчлал (Design)

- Primary: **indigo/violet** · Background: цайвар саарал · Card: цагаан
- Priority: High = улаан, Medium = улбар шар/шар, Low = ногоон
- Completion: 80–100% ногоон · 50–79% шар · 0–49% улаан
- Бүх өнгө `globals.css` доторх CSS variable-ээр удирдагдана (light + dark).

## Аюулгүй байдал (Security notes)

- Бүх нууц мэдээлэл зөвхөн `.env.local` дотор. `NEXT_PUBLIC_` prefix зөвхөн Clerk publishable key дээр (аюулгүй, зориулалтын дагуу).
- API route бүр `auth()`-оор хэрэглэгчийг шалгаж, өгөгдлийг `userId`-аар хязгаарлана. Хэрэглэгч зөвхөн өөрийн мэдээллийг харна.
- `MONGODB_URI`, `CLERK_SECRET_KEY` хэзээ ч client рүү дамждаггүй.

## Скриптүүд (Scripts)

```bash
npm run dev      # хөгжүүлэлт
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint
npm run seed     # demo data (SEED_USER_ID шаардлагатай)
```

## Дараагийн хувилбар (Roadmap / v2)

Эхний хувилбарт ороогүй, нэмж болох зүйлс:

- Ажлыг drag-and-drop-оор өөр өдөр рүү шилжүүлэх (одоо menu-гээр).
- Reminder-ийн бодит push notification (одоо өгөгдөл хадгалагдана).
- Repeat ажлуудыг автоматаар давтан үүсгэх cron.
- Habit frequency (тодорхой өдрүүд) дэлгэрэнгүй тохиргоо.

---

Made with Next.js. Асуулт гарвал `src/lib` доторх тайлбар comment-уудыг харна уу.
