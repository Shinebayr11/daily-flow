import type { ContentBlock } from "./types";

// ===== Thinking in React (m1l3) =====
export const thinkingInReact: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Дизайн харангуутаа \"энэ ямар component-ууд вэ?\" гэж бодох чадвар эзэмшинэ. Энэ бол React хөгжүүлэгчийн хамгийн чухал ур чадвар." },

  { type: "h", text: "Онол — Яагаад энэ чухал вэ?" },
  { type: "p", text: "React-ийн синтаксыг 2 хоногт сурч болно. Гэхдээ \"UI-г яаж хуваах вэ?\" гэдэг нь туршлагаас ирдэг. Буруу хуваавал код түвэгтэй, засварлахад хэцүү болдог. Зөв хуваавал шинэ боломж нэмэхэд 10 минут л зарцуулна." },

  { type: "h", text: "React-ийн албан ёсны 5 алхам" },
  { type: "ol", items: [
    "**Дизайныг component-д хуваа** — шугам зурж хэсэглэ.",
    "**Статик хувилбарыг бүтээ** — state огт хэрэглэхгүй, зөвхөн props-оор өгөгдөл дамжуулж зур.",
    "**Хамгийн бага state-ийг ол** — юу нь өөрчлөгддөг вэ?",
    "**State хаана байх ёстойг тодорхойл** — тэр state-ийг хэрэглэдэг бүх component-ийн хамгийн ойрын нийтлэг эцэг.",
    "**Урвуу урсгал нэм** — хүүхэд component эцгийн state-ийг өөрчлөх боломж (callback функц).",
  ] },

  { type: "h", text: "Алхам 1 — Хуваах дүрэм" },
  { type: "p", text: "Хаана шугам татах вэ? Хамгийн энгийн шалгуур: **нэг component нэг л ажил хийх ёстой** (single responsibility). Хэрэв \"энэ component юу хийдэг вэ?\" гэсэн асуултад \"...бас...\" гэж хариулж байвал хуваах хэрэгтэй." },
  { type: "p", text: "Жишээ: YouTube-ийн нүүр хуудсыг задалъя." },
  { type: "code", lang: "text", code: `┌─────────────────────────────────────────┐
│ [Logo]  [SearchBar]        [UserMenu]   │ ← Header
├──────────┬──────────────────────────────┤
│          │ ┌────────┐ ┌────────┐        │
│ Sidebar  │ │VideoCard│ │VideoCard│      │ ← VideoGrid
│          │ └────────┘ └────────┘        │
│ - Нүүр   │ ┌────────┐ ┌────────┐        │
│ - Trends │ │VideoCard│ │VideoCard│      │
│          │ └────────┘ └────────┘        │
└──────────┴──────────────────────────────┘

Component мод:
App
├── Header
│   ├── Logo
│   ├── SearchBar
│   └── UserMenu
├── Sidebar
│   └── SidebarLink (олон удаа давтагдана)
└── VideoGrid
    └── VideoCard (олон удаа давтагдана)
        ├── Thumbnail
        └── VideoInfo`, },
  { type: "callout", variant: "tip", title: "Давтагдаж байвал component болго", text: "Хэрэв нэг зүйл 2+ удаа давтагдаж байвал тэр нь бараг үргэлж тусдаа component байх ёстой. VideoCard-ыг 20 удаа хуулж бичихийн оронд нэг удаа бичээд props-оор өөр өгөгдөл өгнө." },

  { type: "h", text: "Алхам 2 — Статик хувилбар эхлээд" },
  { type: "p", text: "Шинэ хүмүүсийн хамгийн түгээмэл алдаа: эхнээсээ state, event, API бүгдийг зэрэг хийх гэж оролдох. Оронд нь **эхлээд хөдөлгөөнгүй, зөвхөн харагддаг** хувилбарыг бүтээ." },
  { type: "code", lang: "tsx", code: `// Алхам 2: статик — state огт байхгүй, зөвхөн props
function VideoCard({ title, channel, views }) {
  return (
    <div>
      <div className="h-32 bg-gray-200" />   {/* thumbnail орлуулсан */}
      <h3>{title}</h3>
      <p>{channel} · {views} үзсэн</p>
    </div>
  );
}

function VideoGrid({ videos }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {videos.map((v) => <VideoCard key={v.id} {...v} />)}
    </div>
  );
}`, },
  { type: "callout", variant: "tip", title: "Яагаад статик эхлээд?", text: "Статик хувилбар нь \"бичих их, бодох бага\". State нэмэх нь \"бичих бага, бодох их\". Хоёуланг зэрэг хийвэл тархи ачаалагдаж алдаа гардаг. Тусад нь хий." },

  { type: "h", text: "Алхам 3 — Хамгийн бага state-ийг олох" },
  { type: "p", text: "Өгөгдөл бүрээс асуу: **\"Энэ өөрчлөгддөг үү?\"** Өөрчлөгддөггүй бол state биш. Мөн **\"Өөр зүйлээс тооцоолж болох уу?\"** Болно гэвэл state биш." },
  { type: "code", lang: "text", code: `YouTube жишээ дээр:
✗ videos жагсаалт      → props-оор ирнэ, өөрчлөгддөггүй → state БИШ
✓ searchText           → хэрэглэгч бичнэ → STATE
✓ isSidebarOpen        → товч дарахад солигдоно → STATE
✗ filteredVideos       → videos + searchText-ээс тооцоолно → state БИШ!
✗ videoCount           → videos.length гэж тооцоолно → state БИШ`, },
  { type: "callout", variant: "error", title: "Хамгийн түгээмэл алдаа", text: "Тооцоолж болох зүйлийг state болгох. `const [count, setCount] = useState(items.length)` — буруу! Учир нь items өөрчлөгдөхөд count-ыг гараар шинэчлэх шаардлагатай болж, эрт орой хэзээ нэгэн цагт мартаж алдаа гарна. Зүгээр л `items.length` гэж бич." },

  { type: "h", text: "Алхам 4 — State хаана байх вэ?" },
  { type: "p", text: "Дүрэм: тэр state-ийг **уншдаг эсвэл өөрчилдөг бүх component-ийн хамгийн ойрын нийтлэг эцэг**-т байрлуулна." },
  { type: "code", lang: "text", code: `searchText-ийг хэн ашигладаг вэ?
- SearchBar (бичнэ)
- VideoGrid (шүүнэ)

Хамгийн ойрын нийтлэг эцэг: App
→ searchText нь App-д байна, доош props-оор дамжина`, },
  { type: "code", lang: "tsx", code: `function App() {
  const [searchText, setSearchText] = useState("");     // ← state энд

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      {/* доош props-оор дамжуулж байна */}
      <SearchBar value={searchText} onChange={setSearchText} />
      <VideoGrid videos={filtered} />
    </div>
  );
}`, },
  { type: "callout", variant: "tip", title: "\"Lifting state up\"", text: "Хоёр component нэг өгөгдөл хуваалцах шаардлагатай бол state-ийг тэдний нийтлэг эцэг рүү \"өргөх\" (lift up) хэрэгтэй. Энэ бол React-ийн үндсэн загвар." },

  { type: "h", text: "Алхам 5 — Урвуу урсгал" },
  { type: "p", text: "Props доош урсдаг. Гэтэл SearchBar (хүүхэд) нь App (эцэг)-ийн state-ийг өөрчлөх хэрэгтэй. Үүнийг **функцийг props-оор доош дамжуулж** шийднэ." },
  { type: "code", lang: "tsx", code: `function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}                              // ← өгөгдөл доош
      onChange={(e) => onChange(e.target.value)} // ← үйлдэл дээш
      placeholder="Хайх..."
    />
  );
}`, },
  { type: "code", lang: "text", code: `App (state энд)
 │  value ↓          ↑ onChange (функц)
 └── SearchBar

Өгөгдөл доошоо, үйл явдал дээшээ.`, },

  { type: "h", text: "Амьдралын жишээ" },
  { type: "p", text: "Байшин барихтай адил. Эхлээд төлөвлөгөө зурна (component хуваах), дараа нь араг ясыг барина (статик), дараа нь цахилгаан, ус татна (state). Хэн ч ханаа босгохоос өмнө утас суулгадаггүй." },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Бүх зүйлийг нэг component-д бичих", text: "1000 мөр код нэг файлд байвал засварлах боломжгүй болно. Шийдэл: нэг component нэг ажил." },
  { type: "callout", variant: "error", title: "Хэт эрт хуваах", text: "Эсрэг талдаа 5 мөр код бүрийг component болгох нь бас муу. 3-аас доош мөр, дахин ашиглагдахгүй бол хуваах шаардлагагүй." },
  { type: "callout", variant: "error", title: "Тооцоолж болох зүйлийг state болгох", text: "`filteredItems`, `totalPrice`, `itemCount` — эдгээрийг state биш, render бүрт тооцоол." },
  { type: "callout", variant: "warn", title: "State-ийг хэт дээр байрлуулах", text: "Зөвхөн нэг component ашигладаг state-ийг App-д тавих нь илүүц. Хэрэглэгддэг хамгийн ойр газарт нь тавь." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: Instagram-ын нэг постыг ямар component-уудад хуваахыг цаасан дээр зур.",
    "Дунд: Тэдгээрийн дотроос давтагддаг (reusable) component аль нь болохыг тэмдэглэ.",
    "Дунд: Аль өгөгдөл нь state, аль нь props болохыг жагсаа (like тоо, зураг, тайлбар...).",
    "Хүнд: `likeCount` state хаана байх ёстойг тодорхойлж, яагаад тэнд байх ёстойг тайлбарла.",
    "Хүнд: Дэлгүүрийн сагсны UI-г бүрэн задалж, component мод, state жагсаалтыг гарга.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "React-аар бодох 5 алхам юу вэ?",
    "Component хуваах гол шалгуур юу вэ?",
    "Яагаад эхлээд статик хувилбарыг бүтээх нь дээр вэ?",
    "Ямар өгөгдөл state байх ёстой вэ, ямар нь биш вэ?",
    "State-ийг хаана байрлуулах вэ?",
    "\"Lifting state up\" гэж юу вэ?",
    "Хүүхэд component эцгийн state-ийг яаж өөрчлөх вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "React-аар бодох эхний алхам юу вэ?", options: ["State нэмэх", "Дэлгэцийг component-д хуваах", "Deploy хийх", "CSS бичих"], answer: 1 },
    { q: "Давтагддаг хэсгийг яах вэ?", options: ["Олон удаа хуулах", "Нэг reusable component болгох", "Устгах", "Зурагаар солих"], answer: 1 },
    { q: "Аль нь state БАЙХ ЁСГҮЙ вэ?", options: ["Хайлтын текст", "items.length-ээс тооцоолсон тоо", "Modal нээлттэй эсэх", "Сонгосон таб"], answer: 1 },
    { q: "2 component нэг өгөгдөл хуваалцвал?", options: ["Тус бүрд хуулах", "Нийтлэг эцэг рүү өргөх (lift up)", "Global хувьсагч", "localStorage"], answer: 1 },
    { q: "Хүүхэд эцгийн state-ийг яаж өөрчлөх вэ?", options: ["Шууд өөрчилнө", "Функцийг props-оор доош дамжуулна", "Боломжгүй", "import хийнэ"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "1) Хуваа → 2) Статикаар бүтээ → 3) State-ийг ол → 4) Хаана байхыг тодорхойл → 5) Урвуу урсгал нэм.",
    "Нэг component нэг ажил. Давтагдаж байвал component болго.",
    "Өөрчлөгддөггүй, эсвэл тооцоолж болох зүйл нь state БИШ.",
    "State-ийг ашигладаг бүх component-ийн хамгийн ойрын нийтлэг эцэгт байрлуулна.",
    "Өгөгдөл доошоо (props), үйл явдал дээшээ (callback функц).",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Components** — component-уудыг бодитоор бичиж, файлд салгаж, угсарч сурна." },
];

// ===== Nesting Components (m1l5) =====
export const nestingComponents: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "Олон түвшний үүрлэсэн (nested) бүтэц зохион байгуулж, өгөгдлийг доош дамжуулж, гүн nesting-ийн асуудлыг ойлгоно." },

  { type: "h", text: "Онол — Nesting гэж юу вэ?" },
  { type: "p", text: "**Nesting (үүрлэх)** гэдэг нь нэг component дотор өөр component-ыг дуудах. Ингэснээр жижиг component-уудаас том UI угсардаг — яг лего шиг." },
  { type: "p", text: "Бодит апп-ын component мод 4-6 түвшин гүн байх нь хэвийн:" },
  { type: "code", lang: "text", code: `App
└── Layout
    ├── Header
    │   └── Nav
    │       └── NavLink  ← 5 дахь түвшин
    └── UserList
        └── UserRow
            ├── Avatar
            └── UserInfo
                └── Badge`, },

  { type: "h", text: "Жишээ — 3 түвшний бүтэц" },
  { type: "code", lang: "tsx", code: `// 1-р түвшин: хамгийн жижиг
function Avatar({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    // Зураг байхгүй бол эхний үсгийг харуулна
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
        {alt[0]}
      </div>
    );
  }
  return <img src={src} alt={alt} className="h-10 w-10 rounded-full" />;
}`, },
  { type: "code", lang: "tsx", code: `// 2-р түвшин: Avatar-ыг дотроо агуулна
function UserRow({ name, email, avatar }: {
  name: string; email: string; avatar?: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b py-2">
      <Avatar src={avatar} alt={name} />   {/* ← nested */}
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
}`, },
  { type: "code", lang: "tsx", code: `// 3-р түвшин: UserRow-г олон удаа дуудна
function UserList({ users }: { users: User[] }) {
  if (users.length === 0) return <p>Хэрэглэгч алга</p>;

  return (
    <div>
      {users.map((u) => (
        <UserRow key={u.id} name={u.name} email={u.email} avatar={u.avatar} />
      ))}
    </div>
  );
}`, },

  { type: "h", text: "Props гүн дамжуулах — prop drilling" },
  { type: "p", text: "Гүн nesting-т нэг асуудал гардаг: дээд түвшний өгөгдлийг доод түвшинд хүргэхийн тулд **дундах бүх component-оор дамжуулах** шаардлагатай болдог. Үүнийг **prop drilling** гэнэ." },
  { type: "code", lang: "tsx", code: `// theme-ийг Badge хүртэл 4 түвшин дамжуулж байна
function App() {
  const theme = "dark";
  return <UserList users={users} theme={theme} />;
}

function UserList({ users, theme }) {
  //                       ^^^^^ өөрөө ашиглахгүй, зөвхөн дамжуулж байна
  return users.map((u) => <UserRow key={u.id} user={u} theme={theme} />);
}

function UserRow({ user, theme }) {
  //                     ^^^^^ мөн адил зөвхөн дамжуулж байна
  return <UserInfo user={user} theme={theme} />;
}

function UserInfo({ user, theme }) {
  return <Badge theme={theme}>{user.role}</Badge>;   // ← эцэст нь ашиглагдав
}`, },
  { type: "callout", variant: "warn", title: "Prop drilling муу юу?", text: "2-3 түвшин бол хэвийн. 4+ түвшин болбол Context API (6-р модульд үзнэ) ашиглах нь дээр. Гэхдээ эрт бүү оптимизаци хий — эхлээд props-оор эхэл." },

  { type: "h", text: "Composition — өөр нэг шийдэл" },
  { type: "p", text: "Заримдаа `children` ашиглаад prop drilling-ээс зайлсхийж болно:" },
  { type: "code", lang: "tsx", code: `// ✗ Prop drilling
<Layout sidebarItems={items} headerTitle={title} />

// ✓ Composition — component-оо шууд дотор нь тавьж байна
<Layout>
  <Header title={title} />
  <Sidebar items={items} />
</Layout>

// Layout нь items, title-ийн талаар огт мэдэхгүй!
function Layout({ children }) {
  return <div className="flex">{children}</div>;
}`, },

  { type: "h", text: "Өөрөө туршиж үз" },
  { type: "playground", mode: "react", title: "3 түвшний nesting", code: `function Avatar({ name }) {
  return (
    <div style={{
      width:40, height:40, borderRadius:"50%", background:"#e0e7ff",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontWeight:"bold", color:"#4f46e5"
    }}>
      {name[0]}
    </div>
  );
}

function UserRow({ name, email }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:"1px solid #eee"}}>
      <Avatar name={name} />
      <div>
        <div style={{fontWeight:500}}>{name}</div>
        <div style={{fontSize:13,color:"#888"}}>{email}</div>
      </div>
    </div>
  );
}

function UserList({ users }) {
  return <div>{users.map((u) => <UserRow key={u.id} name={u.name} email={u.email} />)}</div>;
}

function App() {
  const users = [
    { id: 1, name: "Bat-Erdene", email: "bat@mail.com" },
    { id: 2, name: "Sara", email: "sara@mail.com" },
    { id: 3, name: "Tuya", email: "tuya@mail.com" },
  ];
  return <UserList users={users} />;
}`, },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "import хийхээ мартах", text: "`Avatar`-ыг import хийхгүй бол `<Avatar />` дээр \"Avatar is not defined\" гэсэн алдаа гарна." },
  { type: "callout", variant: "error", title: "key-г буруу газар тавих", text: "`.map()` дотор БУЦААЖ БУЙ хамгийн гадна элемент дээр key байх ёстой. `<UserRow key={u.id} />` — зөв. `<UserRow><div key={...}/></UserRow>` — буруу." },
  { type: "callout", variant: "warn", title: "Хэт гүн nesting", text: "7-8 түвшин болбол бүтцээ дахин бодох цаг болсон. Дунд түвшний component-уудыг нэгтгэх эсвэл composition ашиглаж болох уу гэдгийг шалга." },
  { type: "callout", variant: "error", title: "Component-ыг дотор нь зарлах", text: "`function UserList() { function UserRow() {...} }` — render бүрт UserRow шинээр үүсч, React түүнийг өөр component гэж үзэн бүх төлөвийг устгана. Гадна нь зарла." },

  { type: "h", text: "Дасгал" },
  { type: "lab", mode: "react", title: "Дасгал — Component модыг гүнзгийрүүлэх", starter: `function UserRow({ user }) {
  return <li>{user.name}</li>;
}

function UserList({ users }) {
  return (
    <ul>
      {users.map((u) => (
        <UserRow key={u.id} user={u} />
      ))}
    </ul>
  );
}

function App() {
  const users = [
    { id: 1, name: "Бат", role: "admin" },
    { id: 2, name: "Сараа", role: "user" },
  ];

  return <UserList users={users} />;
}`, steps: [
    {
      task: "Массивт 2 хэрэглэгч нэмж жагсаалтыг уртасга. `key` зөв ажиллаж байгааг console-оос шалга.",
      hint: "`id` нь давхардахгүй байх ёстой. Давхардвал React анхааруулга өгнө.",
    },
    {
      task: "`Avatar` component үүсгээд `UserRow` дотор дууд — нэрийн эхний үсгийг дугуй дотор харуул.",
      hint: "`user.name[0]` эхний үсгийг өгнө. `style={{borderRadius:\"50%\"}}` дугуй болгоно.",
      solution: `function Avatar({ name }) {
  return (
    <span style={{
      display: "inline-flex", width: 28, height: 28,
      borderRadius: "50%", background: "#e0e7ff",
      alignItems: "center", justifyContent: "center",
      marginRight: 8, fontSize: 13,
    }}>
      {name[0]}
    </span>
  );
}

function UserRow({ user }) {
  return (
    <li style={{ display: "flex", alignItems: "center", padding: 4 }}>
      <Avatar name={user.name} />
      {user.name}
    </li>
  );
}`,
    },
    {
      task: "`UserInfo` component нэмж (нэр + үүрэг), `UserRow` нь `Avatar` + `UserInfo` гэсэн 2 хүүхэдтэй болго.",
      hint: "Одоо мод нь App → UserList → UserRow → (Avatar, UserInfo) болно.",
    },
    {
      task: "`Badge` component үүсгэж `UserInfo` дотор дууд — admin бол өөр өнгөтэй. 4 түвшний гүн болно.",
      hint: "`{role === \"admin\" ? \"#fee2e2\" : \"#e5e7eb\"}` гэж өнгийг нөхцөлтэй өг.",
    },
    {
      task: "Одоо `theme` гэсэн утгыг App-аас Badge хүртэл prop-оор дамжуулж үз. Хэдэн component дундуур дамжив?",
      hint: "App → UserList → UserRow → UserInfo → Badge = 4 дамжуулалт. Энэ бол prop drilling. Дараагийн модульд Context-оор шийднэ.",
    },
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "Nesting гэж юу вэ?",
    "Component мод хэдэн түвшин байх нь хэвийн вэ?",
    "Prop drilling гэж юу вэ, хэзээ асуудал болдог вэ?",
    "Composition (`children`) яаж prop drilling-ээс зайлсхийхэд тусалдаг вэ?",
    "`.map()` доторх key-г хаана тавих ёстой вэ?",
    "Component-ыг өөр component дотор зарлавал юу болох вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Nesting гэж юу вэ?", options: ["Component устгах", "Component дотор component дуудах", "CSS файл", "Сервер"], answer: 1 },
    { q: "Nested component ашиглахад юу хэрэгтэй вэ?", options: ["import", "database", "npm install", "юу ч хэрэггүй"], answer: 0 },
    { q: "Prop drilling гэж юу вэ?", options: ["Props-ыг олон түвшнээр дамжуулах", "Props устгах", "State үүсгэх", "API дуудах"], answer: 0 },
    { q: "Component-ыг өөр component дотор зарлавал?", options: ["Хурдан болно", "Render бүрт шинээр үүсч төлөв алдагдана", "Юу ч болохгүй", "Алдаа өгнө"], answer: 1 },
    { q: "Prop drilling хэт гүн болвол?", options: ["Context API ашигла", "Илүү олон props нэм", "Component устга", "CSS зас"], answer: 0 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "Nesting = component дотор component. 4-6 түвшин хэвийн.",
    "Жижиг component-уудаас том UI угсарна.",
    "Prop drilling = олон түвшнээр props дамжуулах. 4+ түвшин бол Context бод.",
    "`children` composition-оор дундах component-ыг өгөгдлөөс чөлөөлж болно.",
    "Component-ыг ХЭЗЭЭ Ч өөр component дотор зарлаж болохгүй.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**Props** — component-д гаднаас мэдээлэл дамжуулж уян хатан болгоно." },
];

// ===== ES Modules Handling (m1l8) =====
export const esModules: ContentBlock[] = [
  { type: "h", text: "Хичээлийн зорилго" },
  { type: "p", text: "`export`/`import`-ийн бүх хэлбэрийг эзэмшиж, файл хооронд код хуваалцаж, зам (path) зөв бичиж сурна." },

  { type: "h", text: "Онол — Яагаад module хэрэгтэй вэ?" },
  { type: "p", text: "Эхэн үед JavaScript-д бүх код нэг файлд байдаг байсан. Том төсөл дээр энэ нь: нэрийн мөргөлдөөн, файл хоорондын хамаарал ойлгомжгүй, дахин ашиглах боломжгүй гэсэн асуудал үүсгэдэг байв." },
  { type: "p", text: "**ES Modules** (2015 оноос) нь кодыг файлд хувааж, `export`-оор гаргаж, `import`-оор авах стандарт систем. React component бүрийг өөр файлаас ашиглахад заавал хэрэгтэй." },

  { type: "h", text: "export default — нэг үндсэн экспорт" },
  { type: "code", lang: "tsx", code: `// components/Button.tsx
export default function Button() {
  return <button>Дарах</button>;
}

// эсвэл доод талд нь
function Button() { ... }
export default Button;`, },
  { type: "code", lang: "tsx", code: `// Ашиглах — { } ХЭРЭГГҮЙ, нэрийг дураараа өгч болно
import Button from "@/components/Button";
import MyButton from "@/components/Button";    // мөн ажиллана!`, },
  { type: "callout", variant: "tip", title: "Хэзээ default ашиглах вэ?", text: "Файл нэг л гол зүйл экспортлодог бол (ихэвчлэн component). Next.js-ийн `page.tsx`, `layout.tsx` заавал `export default` шаарддаг." },

  { type: "h", text: "export (named) — олон нэртэй экспорт" },
  { type: "code", lang: "tsx", code: `// lib/utils.ts
export const PI = 3.14;
export const APP_NAME = "DailyFlow";

export function formatDate(d: Date) {
  return d.toLocaleDateString("mn-MN");
}

export interface User {
  id: string;
  name: string;
}`, },
  { type: "code", lang: "tsx", code: `// Ашиглах — { } ЗААВАЛ, нэр яг таарах ёстой
import { PI, APP_NAME, formatDate } from "@/lib/utils";

// Нэрийг өөрчилж авах (as)
import { PI as CIRCLE_PI } from "@/lib/utils";

// Төрлийг тусад нь (илүү тодорхой, build-д хурдан)
import type { User } from "@/lib/utils";`, },

  { type: "h", text: "Хоёуланг зэрэг" },
  { type: "code", lang: "tsx", code: `// lib/config.ts
const config = { apiUrl: "https://api.example.com" };
export default config;              // default
export const VERSION = "1.0";       // named
export const TIMEOUT = 5000;        // named`, },
  { type: "code", lang: "tsx", code: `// default-ыг эхэнд { }-гүй, named-ыг { } дотор
import config, { VERSION, TIMEOUT } from "@/lib/config";

console.log(config.apiUrl, VERSION, TIMEOUT);`, },

  { type: "h", text: "Замын төрлүүд (path)" },
  { type: "code", lang: "tsx", code: `// 1) Absolute — @ товчлол ашиглана (ЗӨВЛӨМЖТЭЙ)
import Button from "@/components/Button";
//                  ^ @ = src/ хавтас

// 2) Relative — одоогийн файлаас харьцангуй
import Button from "./Button";          // ижил хавтас
import Button from "../Button";         // нэг дээш
import Button from "../../components/Button";  // хоёр дээш

// 3) node_modules-ээс (суулгасан сан)
import { useState } from "react";
import axios from "axios";`, },
  { type: "p", text: "`@` товчлол хаанаас ирдэг вэ? `tsconfig.json`-д тохируулагдсан:" },
  { type: "code", lang: "json", code: `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]     ← @ нь src/-ийг заана
    }
  }
}`, },
  { type: "callout", variant: "tip", title: "Яагаад @ илүү дээр вэ?", text: "`../../../components/Button` гэсэн зам файлаа зөөвөл эвдэрдэг. `@/components/Button` хаана ч байсан ажиллана." },

  { type: "h", text: "Бүх зүйлийг нэг дор авах" },
  { type: "code", lang: "tsx", code: `// Бүх named export-ыг нэг объект болгож авна
import * as utils from "@/lib/utils";

console.log(utils.PI);
console.log(utils.formatDate(new Date()));`, },

  { type: "h", text: "Дахин экспортлох (barrel file)" },
  { type: "p", text: "Олон component-ыг нэг газраас гаргах загвар:" },
  { type: "code", lang: "tsx", code: `// components/index.ts — "barrel" файл
export { default as Button } from "./Button";
export { default as Card } from "./Card";
export { default as Header } from "./Header";`, },
  { type: "code", lang: "tsx", code: `// Одоо нэг мөрөөр олныг авна
import { Button, Card, Header } from "@/components";

// Оронд нь:
// import Button from "@/components/Button";
// import Card from "@/components/Card";
// import Header from "@/components/Header";`, },
  { type: "callout", variant: "warn", title: "Barrel файлын сул тал", text: "Том төсөлд build удаашруулж болзошгүй (бүх файлыг ачаалдаг). Жижиг төсөлд асуудалгүй." },

  { type: "h", text: "Түгээмэл алдаа" },
  { type: "callout", variant: "error", title: "Module has no default export", text: "`export default` байхгүй файлаас `import X from` гэж авсан. Эсвэл `import { X } from` гэж { }-тэй ав." },
  { type: "callout", variant: "error", title: "'X' has no exported member 'Y'", text: "Named export-ын нэр буруу бичсэн эсвэл тэр нэрээр export хийгээгүй. Файл руугаа орж экспортын нэрийг шалга." },
  { type: "callout", variant: "error", title: "Module not found: Can't resolve '@/...'", text: "Зам буруу эсвэл файл байхгүй. `@/` = `src/` гэдгийг санаж, файлын байршлаа шалга. Мөн `tsconfig.json`-д `paths` тохируулагдсан эсэхийг хар." },
  { type: "callout", variant: "error", title: "default-ыг { } дотор авах", text: "`import { Button } from \"./Button\"` — Button нь default export бол { }-гүй авна: `import Button from \"./Button\"`." },
  { type: "callout", variant: "warn", title: "Дугуй хамаарал (circular import)", text: "A файл B-г, B файл A-г import хийвэл undefined утга гарч болзошгүй. Ерөнхий кодыг 3 дахь файл руу гарга." },

  { type: "h", text: "Дасгал" },
  { type: "exercise", items: [
    "Хялбар: `lib/utils.ts` файл үүсгэж `APP_NAME` named export нэм.",
    "Дунд: `math.ts` файл үүсгэж `add`, `sub` функцүүдийг named export хийгээд ашигла.",
    "Дунд: Нэг файлд default болон named хоёуланг нь хийж, нэг мөрөөр import хий.",
    "Хүнд: `components/index.ts` barrel файл үүсгэж 3 component-ыг нэг мөрөөр import хий.",
    "Хүнд: `import * as` хэлбэрийг туршиж, ямар үед тохиромжтойг бич.",
  ] },

  { type: "h", text: "Шалгах асуулт" },
  { type: "ol", items: [
    "ES Modules гэж юу вэ, ямар асуудлыг шийддэг вэ?",
    "`export default` ба `export` (named)-ийн ялгаа юу вэ?",
    "Default export-ыг import хийхэд { } хэрэгтэй юу?",
    "`@/` товчлол хаанаас ирдэг вэ, юуг заадаг вэ?",
    "`import type` яагаад ашигладаг вэ?",
    "Barrel файл гэж юу вэ, ямар давуу/сул талтай вэ?",
  ] },

  { type: "h", text: "Quiz" },
  { type: "quiz", questions: [
    { q: "Нэг файлд default export хэдэн удаа байж болох вэ?", options: ["Хэдэн ч", "Нэг л удаа", "Хоёр", "Тэг"], answer: 1 },
    { q: "Named export-ыг яаж import хийх вэ?", options: ["{ } дотор нэрээр", "{ }-гүй", "* -оор", "import хэрэггүй"], answer: 0 },
    { q: "@/ юуг заадаг вэ?", options: ["node_modules", "src/ хавтас", "интернэт", "public/"], answer: 1 },
    { q: "`export default` байхгүй файлаас `import X from` гэвэл?", options: ["Ажиллана", "\"has no default export\" алдаа", "undefined", "Автоматаар үүснэ"], answer: 1 },
    { q: "Нэрийг өөрчилж import хийх түлхүүр үг?", options: ["as", "rename", "alias", "to"], answer: 0 },
    { q: "Next.js-ийн page.tsx юу шаарддаг вэ?", options: ["named export", "export default", "хоёуланг", "экспорт хэрэггүй"], answer: 1 },
  ] },

  { type: "h", text: "Дүгнэлт" },
  { type: "ul", items: [
    "ES Modules-аар код файл хооронд хуваалцана.",
    "`export default` — файлд нэг удаа, import дээр { }-гүй, нэрийг дураараа.",
    "`export` (named) — олон удаа, import дээр { }-тэй, нэр яг таарна.",
    "`@/` = `src/`. Relative зам (`../../`)-аас илүү найдвартай.",
    "`import type` — зөвхөн төрөл авахад ашиглана.",
    "🎉 1-р модуль дууслаа! React-ийн суурь ойлголтуудыг эзэмшлээ.",
  ] },
  { type: "h", text: "Дараагийн хичээл" },
  { type: "p", text: "**2-р модуль: Todo Web Application.** CSS Modules, useState, event, localStorage-оор бүрэн интерактив апп хийнэ." },
];
