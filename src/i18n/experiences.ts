import type { Language } from "@/content.config";

export interface Experience {
  dates: string;
  role: string;
  company: string;
  description: string;
  logo: string;
  website: string;
  content: null;
}

export const experiences: Record<Language, Experience[]> = {
  en: [
    {
      dates: "Apr. 2026 - Present",
      role: "AI-Native Engineer",
      company: "Vention",
      description:
        "Pre-sale solutioning and AI engineering across 10+ prospective client projects — designed end-to-end architectures (service boundaries, API contracts, data models, AWS) and drove prompt- and context-engineering standards while mentoring engineers.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null,
    },
    {
      dates: "Nov. 2025 - Mar. 2026",
      role: "Full Stack Engineer",
      company: "Vention",
      description:
        "Delivered a full client MVP end to end with a spec-driven, AI-assisted (SDD) workflow — Node.js/NestJS backend, Next.js marketing site, React internal app, Redis caching, and PostgreSQL.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null,
    },
    {
      dates: "Jan. 2026 - June 2026",
      role: "Full-Stack Engineer & Architect",
      company: "Topqir.uz",
      description:
        "Kahoot-style EdTech platform with 350K+ active users. Led the React to Next.js migration, designed real-time multiplayer gameplay with Centrifugo (WebSockets), and built a multi-model AI orchestration system for teachers.",
      logo: "/images/experiences/topqir.png",
      website: "https://topqir.uz/",
      content: null,
    },
    {
      dates: "Dec. 2024 - Aug. 2025",
      role: "Software Engineer",
      company: "Valletta Software Development",
      description:
        "Built AgroNetZero, an AI- and GIS-powered soil analytics platform (25+ pages, front-end from scratch), and the Tallinja public transport control system with 40+ REST API integrations.",
      logo: "/images/experiences/valletta.jpeg",
      website: "https://www.vallettasoftware.com/",
      content: null,
    },
    {
      dates: "Sep. 2022 - Sep. 2024",
      role: "Sr. Front-end Developer",
      company: "Soft-Control",
      description:
        "Completed 2 projects: a Jira-integrated Project Management System and CIMP (Cross-Industrial Marketing Platform) for Rostelecom with 150+ REST APIs and role-based access control.",
      logo: "/images/experiences/SoftControl.png",
      website: "https://www.soft-control.ru/",
      content: null,
    },
    {
      dates: "July 2021 - May 2022",
      role: "Front-end Developer",
      company: "Intelligent Learning Centre",
      description:
        "Reworked the online registration flow of a student management system, driving a 120%+ monthly increase in registrations.",
      logo: "/images/experiences/Intelligent.webp",
      website: "https://intelligent-lc.uz/",
      content: null,
    },
    {
      dates: "Oct 2018 - June 2021",
      role: "Front-end Developer (Freelancer)",
      company: "Home",
      description:
        "Built front-ends for a construction company management system and landing pages for various businesses.",
      logo: "/images/experiences/home.png",
      website: "https://www.elyor.dev/",
      content: null,
    },
  ],
  uz: [
    {
      dates: "Apr. 2026 - Hozir",
      role: "AI-native muhandis",
      company: "Vention",
      description:
        "10+ potentsial mijoz loyihalari bo'yicha presale yechimlar va AI muhandisligi — to'liq arxitekturalarni (servis chegaralari, API kontraktlari, ma'lumot modellari, AWS) loyihaladim hamda prompt va kontekst muhandisligi standartlarini joriy qilib, muhandislarga mentorlik qildim.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null,
    },
    {
      dates: "Noy. 2025 - Mart 2026",
      role: "Full Stack Muhandis",
      company: "Vention",
      description:
        "Spec-driven, AI yordamidagi (SDD) ish jarayoni bilan to'liq mijoz MVP'sini yetkazdim — Node.js/NestJS backend, Next.js marketing sayti, React ichki ilova, Redis keshlash va PostgreSQL.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null,
    },
    {
      dates: "Yan. 2026 - Iyun 2026",
      role: "Full-Stack Muhandis va Arxitektor",
      company: "Topqir.uz",
      description:
        "350K+ faol foydalanuvchiga ega Kahoot uslubidagi EdTech platforma. React'dan Next.js'ga migratsiyani boshqardim, Centrifugo (WebSockets) asosida real-time multiplayer o'yinni loyihaladim va o'qituvchilar uchun ko'p modelli AI tizimini yaratdim.",
      logo: "/images/experiences/topqir.png",
      website: "https://topqir.uz/",
      content: null,
    },
    {
      dates: "Dek. 2024 - Avg. 2025",
      role: "Dasturchi",
      company: "Valletta Software Development",
      description:
        "AgroNetZero — AI va GIS asosidagi tuproq tahlili platformasi (25+ sahifa, front-end noldan) hamda 40+ REST API integratsiyali Tallinja jamoat transporti boshqaruv tizimini yaratdim.",
      logo: "/images/experiences/valletta.jpeg",
      website: "https://www.vallettasoftware.com/",
      content: null,
    },
    {
      dates: "Sen. 2022 - Sen. 2024",
      role: "Katta Front-end Dasturchi",
      company: "Soft-Control",
      description:
        "2 ta loyihani yakunladim: Jira bilan integratsiyalashgan Loyihalarni boshqarish tizimi va Rostelecom uchun CIMP (Sanoatlararo marketing platformasi) — 150+ REST API va rolga asoslangan kirish nazorati.",
      logo: "/images/experiences/SoftControl.png",
      website: "https://www.soft-control.ru/",
      content: null,
    },
    {
      dates: "Iyul 2021 - May 2022",
      role: "Front-end Dasturchi",
      company: "Intelligent Learning Centre",
      description:
        "Talabalarni boshqarish tizimining onlayn ro'yxatdan o'tish jarayonini qayta ishlab, oylik ro'yxatdan o'tishlarni 120%+ ga oshirdim.",
      logo: "/images/experiences/Intelligent.webp",
      website: "https://intelligent-lc.uz/",
      content: null,
    },
    {
      dates: "Okt 2018 - Iyun 2021",
      role: "Front-end Dasturchi (Frilanser)",
      company: "Uy",
      description:
        "Qurilish kompaniyasi uchun boshqaruv tizimi (front-end qismi) va turli bizneslar uchun landing sahifalar yaratdim.",
      logo: "/images/experiences/home.png",
      website: "https://www.elyor.dev/",
      content: null,
    },
  ],
  ru: [
    {
      dates: "Апр. 2026 - Настоящее время",
      role: "AI-native инженер",
      company: "Vention",
      description:
        "Пресейл-инжиниринг решений и AI-инжиниринг для 10+ потенциальных клиентских проектов — проектировал end-to-end архитектуры (границы сервисов, API-контракты, модели данных, AWS) и внедрял стандарты prompt- и context-инжиниринга, менторя инженеров.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null,
    },
    {
      dates: "Ноя. 2025 - Март 2026",
      role: "Full Stack инженер",
      company: "Vention",
      description:
        "Поставил полный клиентский MVP по spec-driven, AI-ассистированному (SDD) процессу — backend на Node.js/NestJS, маркетинговый сайт на Next.js, внутреннее приложение на React, кеширование Redis и PostgreSQL.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null,
    },
    {
      dates: "Янв. 2026 - Июнь 2026",
      role: "Full-Stack инженер и архитектор",
      company: "Topqir.uz",
      description:
        "EdTech-платформа в стиле Kahoot с 350K+ активных пользователей. Руководил миграцией с React на Next.js, спроектировал real-time мультиплеер на Centrifugo (WebSockets) и построил мультимодельную AI-систему для учителей.",
      logo: "/images/experiences/topqir.png",
      website: "https://topqir.uz/",
      content: null,
    },
    {
      dates: "Дек. 2024 - Авг. 2025",
      role: "Разработчик",
      company: "Valletta Software Development",
      description:
        "Создал AgroNetZero — AI/GIS-платформу анализа почвы (25+ страниц, front-end с нуля) и систему управления общественным транспортом Tallinja с интеграцией 40+ REST API.",
      logo: "/images/experiences/valletta.jpeg",
      website: "https://www.vallettasoftware.com/",
      content: null,
    },
    {
      dates: "Сен. 2022 - Сен. 2024",
      role: "Старший Front-end разработчик",
      company: "Soft-Control",
      description:
        "Завершил 2 проекта: систему управления проектами с интеграцией Jira и CIMP (кросс-индустриальная маркетинговая платформа) для Ростелекома — 150+ REST API и ролевая модель доступа.",
      logo: "/images/experiences/SoftControl.png",
      website: "https://www.soft-control.ru/",
      content: null,
    },
    {
      dates: "Июль 2021 - Май 2022",
      role: "Front-end разработчик",
      company: "Intelligent Learning Centre",
      description:
        "Переработал процесс онлайн-регистрации в системе управления студентами, увеличив ежемесячные регистрации более чем на 120%.",
      logo: "/images/experiences/Intelligent.webp",
      website: "https://intelligent-lc.uz/",
      content: null,
    },
    {
      dates: "Окт 2018 - Июнь 2021",
      role: "Front-end разработчик (Фрилансер)",
      company: "Дом",
      description:
        "Создал front-end системы управления для строительной компании и лендинги для различных бизнесов.",
      logo: "/images/experiences/home.png",
      website: "https://www.elyor.dev/",
      content: null,
    },
  ],
};

export function getExperiences(lang: Language): Experience[] {
  return experiences[lang] || experiences.en;
}
