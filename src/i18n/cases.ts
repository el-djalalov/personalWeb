import type { Language } from "@/content.config";
import type { ModuleId, Role } from "@/lib/demos/access";

/**
 * Case files: one per project, with the text for its demo. Build-log step
 * names and details stay in English (they read like log output).
 */

export type CaseId = "agro" | "topqir" | "tallinja" | "anzel" | "planner" | "cimp";
export const CASE_IDS: readonly CaseId[] = ["agro", "topqir", "tallinja", "anzel", "planner", "cimp"];
export const isCaseId = (value: string): value is CaseId => (CASE_IDS as readonly string[]).includes(value);

export interface Result {
  /** Shown as is when there is no count, e.g. "MVP" */
  value: string;
  /** When set, the tile counts up to `count` + `suffix` */
  count?: number;
  suffix?: string;
  label: string;
}

export interface CaseFile {
  id: CaseId;
  tag: string;
  title: string;
  line: string;
  link: { label: string; href: string };
  demoLabel: string;
  results: Result[];
  build: { name: string; detail: string }[];
}

export interface QuizQuestion {
  q: string;
  answers: [string, string, string, string];
  correct: number;
}

export interface BriefFact {
  text: string;
  source: number;
  /** Deal terms: hidden from members, replaced or dropped for investors */
  deal?: boolean;
  investor?: string;
}

export interface Brief {
  id: "renew" | "report";
  button: string;
  title: string;
  facts: BriefFact[];
  questions: string[];
  sources: string[];
}

export interface DemoCopy {
  map: {
    draw: string;
    finish: string;
    soil: string;
    tipStart: string;
    tipDraw: string;
    tipDone: string;
    tipDrag: string;
    area: string;
    edge: string;
    om: string;
    bands: [string, string, string];
    ha: string;
    aria: string;
  };
  quiz: {
    question: string;
    players: string;
    pick: string;
    locked: string;
    correct: string;
    wrong: string;
    slow: string;
    next: string;
    again: string;
    board: string;
    you: string;
    simulation: string;
    questions: QuizQuestion[];
  };
  bus: {
    raise: string;
    queue: string;
    controller: string;
    online: string;
    alarm: string;
    acknowledge: string;
    fire: string;
    tech: string;
    bus: string;
    idle: string;
    handledByYou: string;
    handledBy: string;
    shift: string;
    onTime: string;
    late: string;
    routes: [string, string, string];
    aria: string;
  };
  brief: {
    roles: Record<"staff" | "member" | "investor", string>;
    thinking: [string, string, string, string];
    facts: string;
    questions: string;
    sources: string;
    hidden: string;
    dealHidden: string;
    noSources: string;
    example: string;
    hover: string;
    briefs: [Brief, Brief];
  };
  planner: {
    sync: string;
    syncing: string;
    synced: string;
    search: string;
    backlog: string;
    upToDate: string;
    tip: string;
    example: string;
    tickets: Record<string, string>;
  };
  modules: {
    roles: Record<Role, string>;
    names: Record<ModuleId, string>;
    states: { active: string; read: string; none: string };
    plug: string;
    remove: string;
    sees: string;
    added: string;
  };
  loading: string;
}

export interface CasesCopy {
  tabsLabel: string;
  results: string;
  built: string;
  items: CaseFile[];
  demo: DemoCopy;
}

const LINKS = {
  agro: { label: "soilsync.bio ↗", href: "https://soilsync.bio" },
  topqir: { label: "topqir.uz ↗", href: "https://topqir.uz/" },
  tallinja: { label: "Tallinja ↗", href: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login" },
  anzel: { label: "anzel.ai ↗", href: "https://anzel.ai/" },
  planner: { label: "silberwal.ch ↗", href: "https://silberwal.ch/en/plasch/" },
  cimp: { label: "soft-control.ru ↗", href: "https://www.soft-control.ru/our-solutions/cimp/" },
} as const;

const BUILD: Record<CaseId, CaseFile["build"]> = {
  agro: [
    { name: "map.draw", detail: "Field borders" },
    { name: "map.render", detail: "Soil layers · ArcGIS" },
    { name: "geo.plan", detail: "Land planning" },
    { name: "insights", detail: "AI + gov data" },
    { name: "app", detail: "25+ pages · Next.js" },
  ],
  topqir: [
    { name: "migrate", detail: "React → Next.js" },
    { name: "realtime", detail: "Centrifugo sockets" },
    { name: "ai", detail: "Quiz generation" },
    { name: "seo", detail: "Organic growth" },
  ],
  tallinja: [
    { name: "realtime", detail: "Buses, shifts, depots" },
    { name: "alarms", detail: "All screens at once" },
    { name: "hand-off", detail: "One acts, rest resume" },
    { name: "queue", detail: "Ordered, none lost" },
  ],
  anzel: [
    { name: "knowledge", detail: "One club model" },
    { name: "assistants", detail: "Finished documents" },
    { name: "access", detail: "Role-scoped answers" },
    { name: "sources", detail: "Every fact cited" },
  ],
  planner: [
    { name: "auth", detail: "OAuth 2.0 + Jira" },
    { name: "sync", detail: "Tickets in real time" },
    { name: "search", detail: "40% faster" },
    { name: "ui", detail: "40+ components" },
  ],
  cimp: [
    { name: "modules", detail: "Plug in at runtime" },
    { name: "rbac", detail: "Role-based access" },
    { name: "api", detail: "150+ endpoints" },
    { name: "team", detail: "Code reviews" },
  ],
};

export const cases: Record<Language, CasesCopy> = {
  en: {
    tabsLabel: "Projects",
    results: "Results",
    built: "What I built",
    items: [
      {
        id: "agro",
        tag: "gis",
        title: "AgroNetZero",
        line: "Farmers draw their land, plan it and get soil insights from AI.",
        link: LINKS.agro,
        demoLabel: "Draw · drag corners · hover soil",
        results: [
          { value: "MVP", label: "Production ready" },
          { value: "ArcGIS", label: "Draw · create · render" },
          { value: "25+", count: 25, suffix: "+", label: "App pages" },
          { value: "Next.js 15", label: "Built from scratch" },
        ],
        build: BUILD.agro,
      },
      {
        id: "topqir",
        tag: "scale",
        title: "Topqir.uz",
        line: "Lessons become live multiplayer games. Play one round.",
        link: LINKS.topqir,
        demoLabel: "Your turn · answer fast",
        results: [
          { value: "352K", count: 352, suffix: "K", label: "Active users" },
          { value: "24M+", count: 24, suffix: "M+", label: "Events" },
          { value: "751K", count: 751, suffix: "K", label: "Organic sessions" },
          { value: "10+", count: 10, suffix: "+", label: "Countries" },
        ],
        build: BUILD.topqir,
      },
      {
        id: "tallinja",
        tag: "real-time",
        title: "Tallinja",
        line: "Live control for Malta's buses. No alarm gets lost.",
        link: LINKS.tallinja,
        demoLabel: "Click a bus · raise an alarm",
        results: [
          { value: "30%", count: 30, suffix: "%", label: "Faster bus search" },
          { value: "40+", count: 40, suffix: "+", label: "REST APIs" },
          { value: "3", count: 3, suffix: "", label: "Roles" },
          { value: "25+", count: 25, suffix: "+", label: "Components" },
        ],
        build: BUILD.tallinja,
      },
      {
        id: "anzel",
        tag: "ai",
        title: "anzel",
        line: "AI for the business of sport. Brief it like a colleague.",
        link: LINKS.anzel,
        demoLabel: "Pick a brief · switch role",
        results: [
          { value: "4", count: 4, suffix: "", label: "Audiences" },
          { value: "0", label: "Data used for training" },
          { value: "EU", label: "GDPR processing" },
          { value: "Human", label: "Decides, AI drafts" },
        ],
        build: BUILD.anzel,
      },
      {
        id: "planner",
        tag: "integration",
        title: "Planner",
        line: "Jira tickets flow in. Teams share out the work.",
        link: LINKS.planner,
        demoLabel: "Sync · search · drag to a person",
        results: [
          { value: "40%", count: 40, suffix: "%", label: "Faster task search" },
          { value: "30+", count: 30, suffix: "+", label: "REST APIs" },
          { value: "40+", count: 40, suffix: "+", label: "Components" },
          { value: "OAuth", label: "Jira sign-in" },
        ],
        build: BUILD.planner,
      },
      {
        id: "cimp",
        tag: "architecture",
        title: "CIMP",
        line: "Marketing platform for Rostelecom, built from modules.",
        link: LINKS.cimp,
        demoLabel: "Switch role · plug in a module",
        results: [
          { value: "150+", count: 150, suffix: "+", label: "REST APIs" },
          { value: "100+", count: 100, suffix: "+", label: "Features" },
          { value: "RBAC", label: "Access control" },
          { value: "2", count: 2, suffix: "", label: "Juniors mentored" },
        ],
        build: BUILD.cimp,
      },
    ],
    demo: {
      map: {
        draw: "Draw field",
        finish: "Finish",
        soil: "Soil layer",
        tipStart: "Drag a corner to edit the field",
        tipDraw: "Click to add corners. Click the first corner to close.",
        tipDone: "Drag a corner to edit. Hover the field for soil data.",
        tipDrag: "Area updates as you drag.",
        area: "Area",
        edge: "Edge",
        om: "Organic matter",
        bands: ["low", "mid", "high"],
        ha: "ha",
        aria: "Map demo. Draw a field, drag its corners, hover for soil data.",
      },
      quiz: {
        question: "Question",
        players: "Players",
        pick: "Pick an answer",
        locked: "Locked in. Waiting for the others…",
        correct: "Correct",
        wrong: "Not this one",
        slow: "Too slow this time",
        next: "Next question →",
        again: "Play again",
        board: "Leaderboard",
        you: "You",
        simulation: "Simulation",
        questions: [
          { q: "Which planet is the largest?", answers: ["Saturn", "Jupiter", "Neptune", "Earth"], correct: 1 },
          { q: "What is 7 × 8?", answers: ["48", "54", "56", "64"], correct: 2 },
          { q: "What is the capital of Uzbekistan?", answers: ["Samarkand", "Bukhara", "Khiva", "Tashkent"], correct: 3 },
        ],
      },
      bus: {
        raise: "Raise fire alarm",
        queue: "Queue",
        controller: "Controller",
        online: "online",
        alarm: "alarm",
        acknowledge: "Acknowledge",
        fire: "Fire alarm",
        tech: "Technical alarm",
        bus: "Bus",
        idle: "Watching routes, shifts and depots.",
        handledByYou: "You handled Bus {bus}. Report saved.",
        handledBy: "Handled by Controller {who}. Back to work.",
        shift: "Driver shift",
        onTime: "On time",
        late: "3 min late",
        routes: ["Valletta → Mosta", "Sliema → Marsaxlokk", "Rabat → Birgu"],
        aria: "Bus network map with moving buses",
      },
      brief: {
        roles: { staff: "Staff", member: "Member", investor: "Investor" },
        thinking: ["Reading 3 documents", "Checking audience data", "Applying {role} access rules", "Drafting"],
        facts: "Facts",
        questions: "Open questions",
        sources: "Sources",
        hidden: "hidden for your role",
        dealHidden: "Deal detail",
        noSources: "Source documents are not shared with investors",
        example: "Example data",
        hover: "Hover a source number",
        briefs: [
          {
            id: "renew",
            button: "Renewal case · shirt sponsor",
            title: "Renewal case · shirt sponsor",
            facts: [
              { text: "Contract ends 30 June 2027", source: 1 },
              { text: "Fee €1.2M per season, +4% a year", source: 1, deal: true, investor: "Fee band €1M to €1.5M per season" },
              { text: "41M TV impressions last season", source: 2 },
              { text: "9 of 12 activation rights used", source: 3, deal: true, investor: "Rights use rate across partners: 75%" },
            ],
            questions: ["Is a sleeve upgrade on the table?", "Who signs after their CMO change?"],
            sources: ["Partner contract 2024.pdf", "Season media report.xlsx", "Activation tracker"],
          },
          {
            id: "report",
            button: "Partner report · kit supplier",
            title: "Partner report · kit supplier",
            facts: [
              { text: "Kit deal runs until 2028", source: 1 },
              { text: "Replica shirt sales up 18% this season", source: 2, deal: true, investor: "Merchandise sales trend: up" },
              { text: "Logo seen in 46 match broadcasts", source: 3 },
              { text: "Royalty 12% on net sales", source: 1, deal: true },
            ],
            questions: ["Add the women's team kit numbers?"],
            sources: ["Kit supply agreement.pdf", "Retail sales export.csv", "Broadcast log"],
          },
        ],
      },
      planner: {
        sync: "Sync from Jira",
        syncing: "Syncing…",
        synced: "Synced ✓",
        search: "Search tickets",
        backlog: "Jira backlog",
        upToDate: "Already up to date with Jira",
        tip: "Tip: click a ticket, then click a person",
        example: "Example tickets",
        tickets: {
          "PLAN-142": "Fix login timeout",
          "PLAN-151": "Map export to PDF",
          "PLAN-153": "Invoice email template",
          "PLAN-120": "Sprint board filters",
          "PLAN-131": "Jira webhook retry",
          "PLAN-160": "Sprint report widget",
          "PLAN-161": "User roles page",
          "PLAN-162": "Dark mode tokens",
        },
      },
      modules: {
        roles: { admin: "Admin", marketer: "Marketer", analyst: "Analyst" },
        names: {
          loyalty: "Loyalty",
          campaigns: "Campaigns",
          bonuses: "Bonuses",
          retention: "Retention",
          crossmail: "Cross-mail",
          analytics: "Analytics",
          partner: "Partner offers",
        },
        states: { active: "active", read: "read only", none: "no access" },
        plug: "+ Plug in module",
        remove: "− Remove module",
        sees: "{role} sees {n} of {m} modules",
        added: "Module added. No redeploy needed.",
      },
      loading: "Loading demo…",
    },
  },

  uz: {
    tabsLabel: "Loyihalar",
    results: "Natijalar",
    built: "Nima qurdim",
    items: [
      {
        id: "agro",
        tag: "gis",
        title: "AgroNetZero",
        line: "Fermerlar yerini xaritada chizadi, rejalashtiradi va AI dan tuproq tahlilini oladi.",
        link: LINKS.agro,
        demoLabel: "Chizing · burchakni suring · tuproqqa olib boring",
        results: [
          { value: "MVP", label: "Ishga tayyor" },
          { value: "ArcGIS", label: "Chizish · yaratish · ko'rsatish" },
          { value: "25+", count: 25, suffix: "+", label: "Ilova sahifasi" },
          { value: "Next.js 15", label: "Noldan qurilgan" },
        ],
        build: BUILD.agro,
      },
      {
        id: "topqir",
        tag: "scale",
        title: "Topqir.uz",
        line: "Darslar jonli multiplayer o'yinlarga aylanadi. Bir raund o'ynab ko'ring.",
        link: LINKS.topqir,
        demoLabel: "Sizning navbatingiz · tez javob bering",
        results: [
          { value: "352K", count: 352, suffix: "K", label: "Faol foydalanuvchi" },
          { value: "24M+", count: 24, suffix: "M+", label: "Hodisa" },
          { value: "751K", count: 751, suffix: "K", label: "Organik sessiya" },
          { value: "10+", count: 10, suffix: "+", label: "Mamlakat" },
        ],
        build: BUILD.topqir,
      },
      {
        id: "tallinja",
        tag: "real-time",
        title: "Tallinja",
        line: "Malta avtobuslarini real vaqtda boshqarish. Birorta signal yo'qolmaydi.",
        link: LINKS.tallinja,
        demoLabel: "Avtobusni bosing · signal bering",
        results: [
          { value: "30%", count: 30, suffix: "%", label: "Tezroq avtobus qidiruvi" },
          { value: "40+", count: 40, suffix: "+", label: "REST API" },
          { value: "3", count: 3, suffix: "", label: "Rol" },
          { value: "25+", count: 25, suffix: "+", label: "Komponent" },
        ],
        build: BUILD.tallinja,
      },
      {
        id: "anzel",
        tag: "ai",
        title: "anzel",
        line: "Sport biznesi uchun AI. Unga hamkasbingizdek topshiriq bering.",
        link: LINKS.anzel,
        demoLabel: "Topshiriqni tanlang · rolni almashtiring",
        results: [
          { value: "4", count: 4, suffix: "", label: "Auditoriya" },
          { value: "0", label: "O'qitishga ishlatilgan ma'lumot" },
          { value: "EU", label: "GDPR bo'yicha ishlov" },
          { value: "Inson", label: "Qaror qiladi, AI yozadi" },
        ],
        build: BUILD.anzel,
      },
      {
        id: "planner",
        tag: "integration",
        title: "Planner",
        line: "Jira vazifalari kelib tushadi. Jamoa ishni taqsimlaydi.",
        link: LINKS.planner,
        demoLabel: "Sinxronlang · qidiring · odamga suring",
        results: [
          { value: "40%", count: 40, suffix: "%", label: "Tezroq vazifa qidiruvi" },
          { value: "30+", count: 30, suffix: "+", label: "REST API" },
          { value: "40+", count: 40, suffix: "+", label: "Komponent" },
          { value: "OAuth", label: "Jira orqali kirish" },
        ],
        build: BUILD.planner,
      },
      {
        id: "cimp",
        tag: "architecture",
        title: "CIMP",
        line: "Rostelecom uchun modullardan qurilgan marketing platformasi.",
        link: LINKS.cimp,
        demoLabel: "Rolni almashtiring · modul qo'shing",
        results: [
          { value: "150+", count: 150, suffix: "+", label: "REST API" },
          { value: "100+", count: 100, suffix: "+", label: "Funksiya" },
          { value: "RBAC", label: "Kirish nazorati" },
          { value: "2", count: 2, suffix: "", label: "Junior mentorligi" },
        ],
        build: BUILD.cimp,
      },
    ],
    demo: {
      map: {
        draw: "Maydon chizish",
        finish: "Tugatish",
        soil: "Tuproq qatlami",
        tipStart: "Maydonni o'zgartirish uchun burchakni suring",
        tipDraw: "Burchak qo'shish uchun bosing. Yopish uchun birinchi burchakni bosing.",
        tipDone: "Burchakni surib o'zgartiring. Tuproq ma'lumoti uchun maydonga olib boring.",
        tipDrag: "Surganingizda yuza yangilanadi.",
        area: "Yuza",
        edge: "Chegara",
        om: "Organik modda",
        bands: ["past", "o'rta", "yuqori"],
        ha: "ga",
        aria: "Xarita namunasi. Maydon chizing, burchaklarini suring, tuproq ma'lumotini ko'ring.",
      },
      quiz: {
        question: "Savol",
        players: "O'yinchilar",
        pick: "Javobni tanlang",
        locked: "Qabul qilindi. Boshqalarni kutamiz…",
        correct: "To'g'ri",
        wrong: "Bu emas",
        slow: "Bu safar ulgurmadingiz",
        next: "Keyingi savol →",
        again: "Qayta o'ynash",
        board: "Reyting",
        you: "Siz",
        simulation: "Simulyatsiya",
        questions: [
          { q: "Qaysi sayyora eng katta?", answers: ["Saturn", "Yupiter", "Neptun", "Yer"], correct: 1 },
          { q: "7 × 8 necha bo'ladi?", answers: ["48", "54", "56", "64"], correct: 2 },
          { q: "O'zbekiston poytaxti qaysi shahar?", answers: ["Samarqand", "Buxoro", "Xiva", "Toshkent"], correct: 3 },
        ],
      },
      bus: {
        raise: "Yong'in signalini berish",
        queue: "Navbat",
        controller: "Dispetcher",
        online: "onlayn",
        alarm: "signal",
        acknowledge: "Qabul qilish",
        fire: "Yong'in signali",
        tech: "Texnik signal",
        bus: "Avtobus",
        idle: "Yo'nalishlar, smenalar va depolarni kuzatmoqda.",
        handledByYou: "Siz {bus}-avtobus signalini hal qildingiz. Hisobot saqlandi.",
        handledBy: "{who} dispetcher hal qildi. Ishga qaytdik.",
        shift: "Haydovchi smenasi",
        onTime: "O'z vaqtida",
        late: "3 daqiqa kechikmoqda",
        routes: ["Valletta → Mosta", "Sliema → Marsaxlokk", "Rabat → Birgu"],
        aria: "Harakatdagi avtobuslar xaritasi",
      },
      brief: {
        roles: { staff: "Xodim", member: "A'zo", investor: "Investor" },
        thinking: ["3 ta hujjat o'qilmoqda", "Auditoriya ma'lumotlari tekshirilmoqda", "{role} uchun kirish qoidalari qo'llanmoqda", "Yozilmoqda"],
        facts: "Faktlar",
        questions: "Ochiq savollar",
        sources: "Manbalar",
        hidden: "sizning rolingiz uchun yashirin",
        dealHidden: "Shartnoma tafsiloti",
        noSources: "Manba hujjatlar investorlarga ko'rsatilmaydi",
        example: "Namuna ma'lumot",
        hover: "Manba raqamiga olib boring",
        briefs: [
          {
            id: "renew",
            button: "Shartnomani uzaytirish · forma homiysi",
            title: "Shartnomani uzaytirish · forma homiysi",
            facts: [
              { text: "Shartnoma 2027-yil 30-iyunda tugaydi", source: 1 },
              { text: "Mavsumiga €1,2M, har yili +4%", source: 1, deal: true, investor: "To'lov oralig'i: mavsumiga €1M dan €1,5M gacha" },
              { text: "O'tgan mavsum 41M TV ko'rish", source: 2 },
              { text: "12 ta aktivatsiya huquqidan 9 tasi ishlatilgan", source: 3, deal: true, investor: "Hamkorlar bo'yicha huquqlardan foydalanish: 75%" },
            ],
            questions: ["Yengdagi logotipga o'tish mumkinmi?", "Ularning marketing direktori almashgach, kim imzolaydi?"],
            sources: ["Hamkorlik shartnomasi 2024.pdf", "Mavsum media hisoboti.xlsx", "Aktivatsiya trekeri"],
          },
          {
            id: "report",
            button: "Hamkor hisoboti · forma yetkazuvchisi",
            title: "Hamkor hisoboti · forma yetkazuvchisi",
            facts: [
              { text: "Forma shartnomasi 2028-yilgacha", source: 1 },
              { text: "Muxlis formasi savdosi bu mavsum 18% oshdi", source: 2, deal: true, investor: "Mahsulot savdosi: o'sishda" },
              { text: "Logotip 46 ta o'yin translyatsiyasida ko'rindi", source: 3 },
              { text: "Sof savdodan 12% royalti", source: 1, deal: true },
            ],
            questions: ["Ayollar jamoasi formasi raqamlarini qo'shamizmi?"],
            sources: ["Forma yetkazib berish shartnomasi.pdf", "Savdo eksporti.csv", "Translyatsiyalar jurnali"],
          },
        ],
      },
      planner: {
        sync: "Jira dan sinxronlash",
        syncing: "Sinxronlanmoqda…",
        synced: "Sinxronlandi ✓",
        search: "Vazifalarni qidirish",
        backlog: "Jira backlog",
        upToDate: "Jira bilan allaqachon bir xil",
        tip: "Maslahat: vazifani bosing, keyin odamni bosing",
        example: "Namuna vazifalar",
        tickets: {
          "PLAN-142": "Kirish taym-autini tuzatish",
          "PLAN-151": "Xaritani PDF ga eksport",
          "PLAN-153": "Hisob-faktura email shabloni",
          "PLAN-120": "Sprint doskasi filtrlari",
          "PLAN-131": "Jira webhook qayta urinish",
          "PLAN-160": "Sprint hisoboti vidjeti",
          "PLAN-161": "Foydalanuvchi rollari sahifasi",
          "PLAN-162": "Tungi rejim tokenlari",
        },
      },
      modules: {
        roles: { admin: "Admin", marketer: "Marketolog", analyst: "Tahlilchi" },
        names: {
          loyalty: "Sodiqlik",
          campaigns: "Kampaniyalar",
          bonuses: "Bonuslar",
          retention: "Ushlab qolish",
          crossmail: "Kross-pochta",
          analytics: "Analitika",
          partner: "Hamkor takliflari",
        },
        states: { active: "faol", read: "faqat o'qish", none: "ruxsat yo'q" },
        plug: "+ Modul qo'shish",
        remove: "− Modulni olib tashlash",
        sees: "{role}: {m} ta moduldan {n} tasi ko'rinadi",
        added: "Modul qo'shildi. Qayta deploy kerak emas.",
      },
      loading: "Namuna yuklanmoqda…",
    },
  },

  ru: {
    tabsLabel: "Проекты",
    results: "Результаты",
    built: "Что я сделал",
    items: [
      {
        id: "agro",
        tag: "gis",
        title: "AgroNetZero",
        line: "Фермеры рисуют участок на карте, планируют его и получают анализ почвы от AI.",
        link: LINKS.agro,
        demoLabel: "Рисуйте · тяните углы · наведите на почву",
        results: [
          { value: "MVP", label: "Готов к работе" },
          { value: "ArcGIS", label: "Рисование · создание · отрисовка" },
          { value: "25+", count: 25, suffix: "+", label: "Страниц приложения" },
          { value: "Next.js 15", label: "С нуля" },
        ],
        build: BUILD.agro,
      },
      {
        id: "topqir",
        tag: "scale",
        title: "Topqir.uz",
        line: "Уроки превращаются в живые мультиплеерные игры. Сыграйте раунд.",
        link: LINKS.topqir,
        demoLabel: "Ваш ход · отвечайте быстро",
        results: [
          { value: "352K", count: 352, suffix: "K", label: "Активных пользователей" },
          { value: "24M+", count: 24, suffix: "M+", label: "Событий" },
          { value: "751K", count: 751, suffix: "K", label: "Органических сессий" },
          { value: "10+", count: 10, suffix: "+", label: "Стран" },
        ],
        build: BUILD.topqir,
      },
      {
        id: "tallinja",
        tag: "real-time",
        title: "Tallinja",
        line: "Управление автобусами Мальты в реальном времени. Ни одна тревога не теряется.",
        link: LINKS.tallinja,
        demoLabel: "Нажмите на автобус · поднимите тревогу",
        results: [
          { value: "30%", count: 30, suffix: "%", label: "Быстрее поиск автобуса" },
          { value: "40+", count: 40, suffix: "+", label: "REST API" },
          { value: "3", count: 3, suffix: "", label: "Роли" },
          { value: "25+", count: 25, suffix: "+", label: "Компонентов" },
        ],
        build: BUILD.tallinja,
      },
      {
        id: "anzel",
        tag: "ai",
        title: "anzel",
        line: "AI для спортивного бизнеса. Ставьте задачу, как коллеге.",
        link: LINKS.anzel,
        demoLabel: "Выберите задачу · смените роль",
        results: [
          { value: "4", count: 4, suffix: "", label: "Аудитории" },
          { value: "0", label: "Данных для обучения" },
          { value: "EU", label: "Обработка по GDPR" },
          { value: "Человек", label: "Решает, AI готовит" },
        ],
        build: BUILD.anzel,
      },
      {
        id: "planner",
        tag: "integration",
        title: "Planner",
        line: "Задачи из Jira приходят сами. Команда распределяет работу.",
        link: LINKS.planner,
        demoLabel: "Синхронизируйте · ищите · перетащите на человека",
        results: [
          { value: "40%", count: 40, suffix: "%", label: "Быстрее поиск задач" },
          { value: "30+", count: 30, suffix: "+", label: "REST API" },
          { value: "40+", count: 40, suffix: "+", label: "Компонентов" },
          { value: "OAuth", label: "Вход через Jira" },
        ],
        build: BUILD.planner,
      },
      {
        id: "cimp",
        tag: "architecture",
        title: "CIMP",
        line: "Маркетинговая платформа для Ростелекома из подключаемых модулей.",
        link: LINKS.cimp,
        demoLabel: "Смените роль · подключите модуль",
        results: [
          { value: "150+", count: 150, suffix: "+", label: "REST API" },
          { value: "100+", count: 100, suffix: "+", label: "Функций" },
          { value: "RBAC", label: "Контроль доступа" },
          { value: "2", count: 2, suffix: "", label: "Джуниора под менторством" },
        ],
        build: BUILD.cimp,
      },
    ],
    demo: {
      map: {
        draw: "Нарисовать поле",
        finish: "Готово",
        soil: "Слой почвы",
        tipStart: "Потяните угол, чтобы изменить поле",
        tipDraw: "Нажимайте, чтобы добавить углы. Нажмите на первый угол, чтобы замкнуть.",
        tipDone: "Тяните углы. Наведите на поле, чтобы увидеть почву.",
        tipDrag: "Площадь меняется, пока вы тянете.",
        area: "Площадь",
        edge: "Периметр",
        om: "Органика",
        bands: ["низко", "средне", "высоко"],
        ha: "га",
        aria: "Демо карты. Нарисуйте поле, потяните углы, наведите на почву.",
      },
      quiz: {
        question: "Вопрос",
        players: "Игроки",
        pick: "Выберите ответ",
        locked: "Ответ принят. Ждём остальных…",
        correct: "Верно",
        wrong: "Не этот",
        slow: "В этот раз не успели",
        next: "Следующий вопрос →",
        again: "Сыграть ещё",
        board: "Рейтинг",
        you: "Вы",
        simulation: "Симуляция",
        questions: [
          { q: "Какая планета самая большая?", answers: ["Сатурн", "Юпитер", "Нептун", "Земля"], correct: 1 },
          { q: "Сколько будет 7 × 8?", answers: ["48", "54", "56", "64"], correct: 2 },
          { q: "Какая столица Узбекистана?", answers: ["Самарканд", "Бухара", "Хива", "Ташкент"], correct: 3 },
        ],
      },
      bus: {
        raise: "Поднять пожарную тревогу",
        queue: "Очередь",
        controller: "Диспетчер",
        online: "онлайн",
        alarm: "тревога",
        acknowledge: "Принять",
        fire: "Пожарная тревога",
        tech: "Техническая тревога",
        bus: "Автобус",
        idle: "Следит за маршрутами, сменами и депо.",
        handledByYou: "Вы обработали автобус {bus}. Отчёт сохранён.",
        handledBy: "Обработал диспетчер {who}. Возвращаемся к работе.",
        shift: "Смена водителя",
        onTime: "По графику",
        late: "Опаздывает на 3 мин",
        routes: ["Валлетта → Моста", "Слима → Марсашлокк", "Рабат → Биргу"],
        aria: "Карта маршрутов с движущимися автобусами",
      },
      brief: {
        roles: { staff: "Сотрудник", member: "Участник", investor: "Инвестор" },
        thinking: ["Читаю 3 документа", "Проверяю данные аудитории", "Применяю правила доступа: {role}", "Пишу"],
        facts: "Факты",
        questions: "Открытые вопросы",
        sources: "Источники",
        hidden: "скрыто для вашей роли",
        dealHidden: "Условия сделки",
        noSources: "Исходные документы инвесторам не показываются",
        example: "Пример данных",
        hover: "Наведите на номер источника",
        briefs: [
          {
            id: "renew",
            button: "Продление · спонсор на форме",
            title: "Продление · спонсор на форме",
            facts: [
              { text: "Контракт заканчивается 30 июня 2027", source: 1 },
              { text: "€1,2M за сезон, +4% в год", source: 1, deal: true, investor: "Диапазон: от €1M до €1,5M за сезон" },
              { text: "41M ТВ-показов в прошлом сезоне", source: 2 },
              { text: "Использовано 9 из 12 прав активации", source: 3, deal: true, investor: "Использование прав по партнёрам: 75%" },
            ],
            questions: ["Возможен ли переход на рукав?", "Кто подписывает после смены их CMO?"],
            sources: ["Партнёрский контракт 2024.pdf", "Медиаотчёт за сезон.xlsx", "Трекер активаций"],
          },
          {
            id: "report",
            button: "Отчёт партнёру · поставщик формы",
            title: "Отчёт партнёру · поставщик формы",
            facts: [
              { text: "Контракт на форму до 2028 года", source: 1 },
              { text: "Продажи реплик формы выросли на 18% за сезон", source: 2, deal: true, investor: "Продажи мерча: рост" },
              { text: "Логотип в 46 трансляциях матчей", source: 3 },
              { text: "Роялти 12% от чистых продаж", source: 1, deal: true },
            ],
            questions: ["Добавить цифры по форме женской команды?"],
            sources: ["Договор поставки формы.pdf", "Выгрузка продаж.csv", "Журнал трансляций"],
          },
        ],
      },
      planner: {
        sync: "Синхронизировать с Jira",
        syncing: "Синхронизация…",
        synced: "Готово ✓",
        search: "Поиск задач",
        backlog: "Бэклог Jira",
        upToDate: "Уже синхронизировано с Jira",
        tip: "Совет: нажмите на задачу, затем на человека",
        example: "Пример задач",
        tickets: {
          "PLAN-142": "Исправить тайм-аут входа",
          "PLAN-151": "Экспорт карты в PDF",
          "PLAN-153": "Шаблон письма со счётом",
          "PLAN-120": "Фильтры доски спринта",
          "PLAN-131": "Повтор вебхука Jira",
          "PLAN-160": "Виджет отчёта по спринту",
          "PLAN-161": "Страница ролей",
          "PLAN-162": "Токены тёмной темы",
        },
      },
      modules: {
        roles: { admin: "Админ", marketer: "Маркетолог", analyst: "Аналитик" },
        names: {
          loyalty: "Лояльность",
          campaigns: "Кампании",
          bonuses: "Бонусы",
          retention: "Удержание",
          crossmail: "Кросс-рассылки",
          analytics: "Аналитика",
          partner: "Партнёрские офферы",
        },
        states: { active: "активен", read: "только чтение", none: "нет доступа" },
        plug: "+ Подключить модуль",
        remove: "− Убрать модуль",
        sees: "{role} видит {n} из {m} модулей",
        added: "Модуль подключён. Без передеплоя.",
      },
      loading: "Загружаю демо…",
    },
  },
};

export const getCasesCopy = (lang: Language): CasesCopy => cases[lang] ?? cases.en;

/** Replace {name} placeholders in a demo string. */
export const fill = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
