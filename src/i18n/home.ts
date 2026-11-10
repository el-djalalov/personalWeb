import type { Language } from "@/content.config";

/**
 * All home page text, one object per language. The HomeCopy type makes a
 * missing Uzbek or Russian text a type error (`yarn typecheck`, which runs
 * before every build).
 *
 * Agent-log step names and details stay in English in every language: they
 * read like log output. The sentences around them are translated.
 */

export type RunId = "design" | "cloud" | "agents" | "ship";
export type SkillId = "system" | "cloud" | "agents" | "product";

export interface RunStep {
  name: string;
  detail: string;
  why: string;
}

export interface Run {
  id: RunId;
  steps: RunStep[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Skill {
  id: SkillId;
  title: string;
  text: string;
  proof: string;
}

export interface HomeCopy {
  meta: { description: string };
  hero: {
    who: string;
    titleA: string;
    titleB: string;
    lead: string;
    cert: string;
    /** Read by screen readers after the badge text */
    certMore: string;
    ctaWork: string;
    ctaSkills: string;
    resume: string;
    logLabel: string;
    logHint: string;
  };
  runs: Run[];
  stats: Stat[];
  skills: { title: string; hint: string; items: Skill[] };
  work: { title: string; hint: string };
  jobs: { title: string; hint: string };
  writing: { title: string; allPosts: string; empty: string; readTime: string };
  contact: {
    line1: string;
    before: string;
    ring: string;
    after: string;
    button: string;
    note: string;
    telegram: string;
  };
}

const CERT = "Claude Certified Architect · Anthropic";

export const home: Record<Language, HomeCopy> = {
  en: {
    meta: {
      description:
        "Elyor Djalalov, full-stack and AI-native engineer. System design, cloud architecture on AWS, AI agents, and products used by 352K people.",
    },
    hero: {
      who: "Elyor Djalalov · systems · cloud · AI",
      titleA: "I design systems, wire in AI,",
      titleB: "and ship them to real users.",
      lead: "Full-stack and AI-native engineer at Vention. Eight years of products, from cloud systems to AI agents.",
      cert: CERT,
      certMore: "Foundations. Verify on Credly, opens in a new tab",
      ctaWork: "See case files",
      ctaSkills: "What I build",
      resume: "Resume (PDF)",
      logLabel: "Example runs. Pick a run, then click a step to read what it means.",
      logHint: "example run · click a step",
    },
    runs: [
      {
        id: "design",
        steps: [
          { name: "intake", detail: "12 user flows", why: "Turn goals into flows and limits." },
          { name: "boundaries", detail: "4 services · 2 queues", why: "Split the system where data and teams split." },
          { name: "contracts", detail: "18 endpoints · OpenAPI", why: "Agree on APIs before anyone builds." },
          { name: "data", detail: "12 tables · 3 indexes", why: "Model data for the queries you will run." },
          { name: "load", detail: "5k rps · p95 120 ms", why: "Check the design against real traffic." },
        ],
      },
      {
        id: "cloud",
        steps: [
          { name: "plan", detail: "terraform · 34 resources", why: "Infrastructure as code, reviewed like code." },
          { name: "network", detail: "VPC · 3 AZs · private subnets", why: "Nothing is public unless it has to be." },
          { name: "compute", detail: "containers · autoscale 2 → 12", why: "Scale with real traffic." },
          { name: "data", detail: "Postgres · Redis · backups", why: "Managed data with tested restores." },
          { name: "observe", detail: "alarms · dashboards · traces", why: "Know about problems before users do." },
        ],
      },
      {
        id: "agents",
        steps: [
          { name: "context", detail: "1,240 docs indexed", why: "Give agents the knowledge they need, and only that." },
          { name: "orchestrate", detail: "planner + 3 sub-agents", why: "Split big jobs into small steps you can check." },
          { name: "tools", detail: "6 MCP tools · typed output", why: "Agents act only through well-defined tools." },
          { name: "guard", detail: "role-scoped access", why: "Agents see only what the user may see." },
          { name: "eval", detail: "96% answers grounded", why: "Measure answers before you ship them." },
        ],
      },
      {
        id: "ship",
        steps: [
          { name: "spec", detail: "14 requirements", why: "Write down what done means." },
          { name: "build", detail: "3 agents · 41 files", why: "AI agents build, I review." },
          { name: "test", detail: "212 tests passing", why: "Every change proves itself." },
          { name: "deploy", detail: "canary 10% → 100%", why: "Release safely, roll back fast." },
        ],
      },
    ],
    stats: [
      { value: 352, suffix: "K", label: "Users · Topqir" },
      { value: 10, suffix: "+", label: "Architectures · Vention" },
      { value: 150, suffix: "+", label: "APIs · CIMP" },
      { value: 8, suffix: "", label: "Years shipping" },
    ],
    skills: {
      title: "What I build",
      hint: "Pick one",
      items: [
        { id: "system", title: "System design", text: "Clear service boundaries, API contracts and data models.", proof: "10+ client architectures · Vention" },
        { id: "cloud", title: "Cloud architecture", text: "Mostly AWS. Systems that scale with traffic and stay private.", proof: "AWS designs for Vention clients" },
        { id: "agents", title: "AI agents", text: "Agent architecture, multi-agent orchestration, tools and MCP, with evals.", proof: CERT },
        { id: "product", title: "Full-stack product", text: "Next.js to Postgres, with real-time data in between.", proof: "352K users · Topqir" },
      ],
    },
    work: { title: "Case files", hint: "Try each one" },
    jobs: { title: "Where I worked", hint: "2018 → now" },
    writing: { title: "Writing", allPosts: "All posts →", empty: "Posts coming soon.", readTime: "{n} min read" },
    contact: {
      line1: "Have a product or system in mind?",
      before: "Let's ",
      ring: "build",
      after: " it.",
      button: "Email me ↗",
      note: "Architecture, an MVP or an AI feature. Write to me.",
      telegram: "Telegram channel",
    },
  },

  uz: {
    meta: {
      description:
        "Elyor Djalalov, full-stack va AI-native muhandis. Tizim dizayni, AWS bulut arxitekturasi, AI agentlar va 352K kishi foydalanadigan mahsulotlar.",
    },
    hero: {
      who: "Elyor Djalalov · tizimlar · bulut · AI",
      titleA: "Tizimlarni loyihalayman, AI ni ulayman",
      titleB: "va ularni haqiqiy foydalanuvchilarga yetkazaman.",
      lead: "Vention'da full-stack va AI-native muhandis. Bulut tizimlaridan AI agentlargacha, sakkiz yillik mahsulot tajribasi.",
      cert: CERT,
      certMore: "Foundations. Credly'da tekshirish, yangi oynada ochiladi",
      ctaWork: "Loyihalarni ko'rish",
      ctaSkills: "Nima quraman",
      resume: "Rezyume (PDF)",
      logLabel: "Namuna jarayonlar. Jarayonni tanlang, keyin qadamni bosing.",
      logHint: "namuna · qadamni bosing",
    },
    runs: [
      {
        id: "design",
        steps: [
          { name: "intake", detail: "12 user flows", why: "Maqsadlarni oqimlar va cheklovlarga aylantiraman." },
          { name: "boundaries", detail: "4 services · 2 queues", why: "Tizimni ma'lumotlar va jamoalar ajraladigan joyda bo'laman." },
          { name: "contracts", detail: "18 endpoints · OpenAPI", why: "Qurishdan oldin API larni kelishib olamiz." },
          { name: "data", detail: "12 tables · 3 indexes", why: "Ma'lumotlarni haqiqiy so'rovlar uchun modellashtiraman." },
          { name: "load", detail: "5k rps · p95 120 ms", why: "Dizaynni haqiqiy trafik bilan tekshiraman." },
        ],
      },
      {
        id: "cloud",
        steps: [
          { name: "plan", detail: "terraform · 34 resources", why: "Infratuzilma kod sifatida, kod kabi ko'rib chiqiladi." },
          { name: "network", detail: "VPC · 3 AZs · private subnets", why: "Kerak bo'lmasa, hech narsa ochiq emas." },
          { name: "compute", detail: "containers · autoscale 2 → 12", why: "Haqiqiy trafikka qarab kengayadi." },
          { name: "data", detail: "Postgres · Redis · backups", why: "Tiklanishi sinalgan boshqariladigan ma'lumotlar." },
          { name: "observe", detail: "alarms · dashboards · traces", why: "Muammolarni foydalanuvchilardan oldin bilaman." },
        ],
      },
      {
        id: "agents",
        steps: [
          { name: "context", detail: "1,240 docs indexed", why: "Agentlarga faqat kerakli bilimni beraman." },
          { name: "orchestrate", detail: "planner + 3 sub-agents", why: "Katta ishni tekshirsa bo'ladigan kichik qadamlarga bo'laman." },
          { name: "tools", detail: "6 MCP tools · typed output", why: "Agentlar faqat aniq belgilangan vositalar orqali ishlaydi." },
          { name: "guard", detail: "role-scoped access", why: "Agent faqat foydalanuvchi ko'ra oladigan narsani ko'radi." },
          { name: "eval", detail: "96% answers grounded", why: "Javoblarni chiqarishdan oldin o'lchayman." },
        ],
      },
      {
        id: "ship",
        steps: [
          { name: "spec", detail: "14 requirements", why: "Tayyor degani nima ekanini yozib qo'yaman." },
          { name: "build", detail: "3 agents · 41 files", why: "AI agentlar quradi, men ko'rib chiqaman." },
          { name: "test", detail: "212 tests passing", why: "Har bir o'zgarish testdan o'tadi." },
          { name: "deploy", detail: "canary 10% → 100%", why: "Xavfsiz chiqaraman, tez qaytaraman." },
        ],
      },
    ],
    stats: [
      { value: 352, suffix: "K", label: "Foydalanuvchi · Topqir" },
      { value: 10, suffix: "+", label: "Arxitektura · Vention" },
      { value: 150, suffix: "+", label: "API · CIMP" },
      { value: 8, suffix: "", label: "Yillik tajriba" },
    ],
    skills: {
      title: "Nima quraman",
      hint: "Birini tanlang",
      items: [
        { id: "system", title: "Tizim dizayni", text: "Aniq servis chegaralari, API kontraktlar va ma'lumot modellari.", proof: "10+ mijoz arxitekturasi · Vention" },
        { id: "cloud", title: "Bulut arxitekturasi", text: "Asosan AWS. Trafik bilan kengayadigan va yopiq qoladigan tizimlar.", proof: "Vention mijozlari uchun AWS dizaynlari" },
        { id: "agents", title: "AI agentlar", text: "Agent arxitekturasi, ko'p agentli orkestratsiya, vositalar va MCP, baholash bilan.", proof: CERT },
        { id: "product", title: "Full-stack mahsulot", text: "Next.js dan Postgres gacha, orada real vaqt ma'lumotlari bilan.", proof: "352K foydalanuvchi · Topqir" },
      ],
    },
    work: { title: "Loyihalar", hint: "Har birini sinab ko'ring" },
    jobs: { title: "Qayerda ishlaganman", hint: "2018 → hozir" },
    writing: { title: "Maqolalar", allPosts: "Barcha maqolalar →", empty: "Tez orada maqolalar.", readTime: "{n} daqiqa o'qish" },
    contact: {
      line1: "Loyiha yoki tizim g'oyangiz bormi?",
      before: "Keling, uni ",
      ring: "quraylik",
      after: ".",
      button: "Menga yozing ↗",
      note: "Arxitektura, MVP yoki AI funksiya. Menga yozing.",
      telegram: "Telegram kanal",
    },
  },

  ru: {
    meta: {
      description:
        "Элёр Джалалов, full-stack и AI-native инженер. Проектирование систем, облачная архитектура на AWS, AI-агенты и продукты для 352K пользователей.",
    },
    hero: {
      who: "Элёр Джалалов · системы · облако · AI",
      titleA: "Проектирую системы, встраиваю AI",
      titleB: "и довожу их до реальных пользователей.",
      lead: "Full-stack и AI-native инженер в Vention. Восемь лет продуктов: от облачных систем до AI-агентов.",
      cert: CERT,
      certMore: "Foundations. Проверить на Credly, откроется в новой вкладке",
      ctaWork: "Смотреть проекты",
      ctaSkills: "Что я делаю",
      resume: "Резюме (PDF)",
      logLabel: "Примеры запусков. Выберите запуск и нажмите на шаг.",
      logHint: "пример запуска · нажмите на шаг",
    },
    runs: [
      {
        id: "design",
        steps: [
          { name: "intake", detail: "12 user flows", why: "Превращаю цели в сценарии и ограничения." },
          { name: "boundaries", detail: "4 services · 2 queues", why: "Делю систему там, где расходятся данные и команды." },
          { name: "contracts", detail: "18 endpoints · OpenAPI", why: "Согласуем API до начала разработки." },
          { name: "data", detail: "12 tables · 3 indexes", why: "Моделирую данные под реальные запросы." },
          { name: "load", detail: "5k rps · p95 120 ms", why: "Проверяю архитектуру реальной нагрузкой." },
        ],
      },
      {
        id: "cloud",
        steps: [
          { name: "plan", detail: "terraform · 34 resources", why: "Инфраструктура как код, с ревью как у кода." },
          { name: "network", detail: "VPC · 3 AZs · private subnets", why: "Ничего публичного без необходимости." },
          { name: "compute", detail: "containers · autoscale 2 → 12", why: "Масштабируется по реальной нагрузке." },
          { name: "data", detail: "Postgres · Redis · backups", why: "Управляемые данные с проверенным восстановлением." },
          { name: "observe", detail: "alarms · dashboards · traces", why: "Узнаю о проблемах раньше пользователей." },
        ],
      },
      {
        id: "agents",
        steps: [
          { name: "context", detail: "1,240 docs indexed", why: "Даю агентам только нужные знания." },
          { name: "orchestrate", detail: "planner + 3 sub-agents", why: "Делю большие задачи на проверяемые шаги." },
          { name: "tools", detail: "6 MCP tools · typed output", why: "Агенты действуют только через чётко описанные инструменты." },
          { name: "guard", detail: "role-scoped access", why: "Агент видит только то, что разрешено пользователю." },
          { name: "eval", detail: "96% answers grounded", why: "Измеряю качество ответов до релиза." },
        ],
      },
      {
        id: "ship",
        steps: [
          { name: "spec", detail: "14 requirements", why: "Фиксирую, что значит «готово»." },
          { name: "build", detail: "3 agents · 41 files", why: "AI-агенты пишут код, я делаю ревью." },
          { name: "test", detail: "212 tests passing", why: "Каждое изменение подтверждено тестами." },
          { name: "deploy", detail: "canary 10% → 100%", why: "Безопасный релиз и быстрый откат." },
        ],
      },
    ],
    stats: [
      { value: 352, suffix: "K", label: "Пользователей · Topqir" },
      { value: 10, suffix: "+", label: "Архитектур · Vention" },
      { value: 150, suffix: "+", label: "API · CIMP" },
      { value: 8, suffix: "", label: "Лет опыта" },
    ],
    skills: {
      title: "Что я делаю",
      hint: "Выберите",
      items: [
        { id: "system", title: "Проектирование систем", text: "Чёткие границы сервисов, API-контракты и модели данных.", proof: "10+ архитектур для клиентов · Vention" },
        { id: "cloud", title: "Облачная архитектура", text: "В основном AWS. Системы, которые масштабируются и остаются закрытыми.", proof: "AWS-архитектуры для клиентов Vention" },
        { id: "agents", title: "AI-агенты", text: "Архитектура агентов, мультиагентная оркестрация, инструменты и MCP, с оценкой качества.", proof: CERT },
        { id: "product", title: "Full-stack продукт", text: "От Next.js до Postgres, с данными в реальном времени.", proof: "352K пользователей · Topqir" },
      ],
    },
    work: { title: "Проекты", hint: "Попробуйте каждый" },
    jobs: { title: "Где я работал", hint: "2018 → сейчас" },
    writing: { title: "Статьи", allPosts: "Все статьи →", empty: "Скоро здесь будут статьи.", readTime: "{n} мин чтения" },
    contact: {
      line1: "Есть идея продукта или системы?",
      before: "Давайте её ",
      ring: "построим",
      after: ".",
      button: "Написать мне ↗",
      note: "Архитектура, MVP или AI-функция. Напишите мне.",
      telegram: "Telegram-канал",
    },
  },
};

export const getHomeCopy = (lang: Language): HomeCopy => home[lang] ?? home.en;
