import type { Language } from "@/content.config";

export interface Project {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: string;
}

export const projects: Record<Language, Project[]> = {
  en: [
    {
      description: "Kahoot-style interactive EdTech platform",
      title: "Topqir.uz",
      src: "/images/projects/topqir.webp",
      ctaText: "Visit",
      ctaLink: "https://topqir.uz/",
      content:
        "Interactive EdTech platform (B2B/B2C) for teachers, students and schools, where lessons turn into live multiplayer games. As Tech Lead — Full-Stack Engineer & Architect, I scaled the platform to 352K active users, 15M+ page views and 24M+ tracked events across 10+ countries, with organic-led growth of 751K organic-search sessions. Built with Next.js, real-time gameplay over WebSockets and an AI content-generation system for teachers.",
    },
    {
      description: "AI- and GIS-powered soil productivity platform",
      title: "AgroNetZero Bio Sync 365",
      src: "/images/projects/agroNetZeroLanding.webp",
      ctaText: "Visit",
      ctaLink: "https://soilsync.bio",
      content:
        "AI- and GIS-powered platform that turns soil analysis into charts, feedback and recommendations for farmers and landowners. Users create a profile, draw their land on the map, upload soil test results and get calculated insights. I architected the client-side application (25+ pages) from scratch in Next.js and TypeScript using clean architecture, delivered analytics dashboards, custom maps and multi-step wizards, and improved performance with server-side rendering.",
    },
    {
      description: "Real-time control system for Malta's national bus network",
      title: "Tallinja Public Transport Control System",
      src: "/images/projects/tallinja.webp",
      ctaText: "Visit",
      ctaLink: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login",
      content:
        "Real-time fleet monitoring and control system for Malta's national bus network: buses, driver shifts, routes, depots, fire and technical alarms. I built a scalable React 18 + TypeScript front-end, integrated 40+ REST APIs with caching and network optimisations, delivered 25+ reusable UI components and engineered a fire-alarm subsystem with freeze-until-action popups and alarm queueing so no critical event is lost. Improved bus-discovery efficiency by 30%.",
    },
    {
      description: "Project management system with Atlassian/Jira integration",
      title: "Planner — Project Management System",
      src: "/images/projects/planner.webp",
      ctaText: "Visit",
      ctaLink: "https://plasch.silberwal.ch/planner",
      content:
        "Project management system integrated with the Atlassian/Jira ecosystem, bringing Jira tickets and tasks straight into the Planner app where teams can allocate work efficiently. I architected a scalable React 18 + TypeScript front-end with OAuth 2.0 authentication integrated with Jira, 30+ REST APIs, WebSockets and a caching layer. Improved task-discovery efficiency by 40% and built 40+ reusable components.",
    },
    {
      description: "Cross-industrial marketing platform for Rostelecom",
      title: "CIMP Marketing Platform",
      src: "/images/projects/cimp.webp",
      ctaText: "Visit",
      ctaLink: "https://www.soft-control.ru/our-solutions/cimp/",
      content:
        "Cross-industrial marketing platform for Rostelecom, designed to run loyalty programs, campaigns, bonuses, customer-retention and cross-mail programs. Built as a dynamically extensible modular architecture. I designed a role-based access-control authentication system, integrated 150+ REST APIs and delivered 100+ features and components, while mentoring junior developers through code reviews.",
    },
  ],
  uz: [
    {
      description: "Kahoot uslubidagi interaktiv EdTech platforma",
      title: "Topqir.uz",
      src: "/images/projects/topqir.webp",
      ctaText: "Ochish",
      ctaLink: "https://topqir.uz/",
      content:
        "O'qituvchilar, o'quvchilar va maktablar uchun interaktiv EdTech platforma (B2B/B2C) — darslar jonli multiplayer o'yinlarga aylanadi. Tech Lead — Full-Stack Muhandis va Arxitektor sifatida platformani 10+ mamlakat bo'ylab 352K faol foydalanuvchi, 15M+ sahifa ko'rishlari va 24M+ kuzatilgan hodisalargacha kengaytirdim, 751K organik qidiruv sessiyalari bilan organik o'sishga erishdim. Next.js, WebSockets orqali real-time o'yin va o'qituvchilar uchun AI kontent yaratish tizimi asosida qurilgan.",
    },
    {
      description: "AI va GIS asosidagi tuproq unumdorligi platformasi",
      title: "AgroNetZero Bio Sync 365",
      src: "/images/projects/agroNetZeroLanding.webp",
      ctaText: "Ochish",
      ctaLink: "https://soilsync.bio",
      content:
        "Fermerlar va yer egalari uchun tuproq tahlilini diagrammalar, fikr-mulohaza va tavsiyalarga aylantiruvchi AI va GIS asosidagi platforma. Foydalanuvchilar profil yaratadi, xaritada yerini chizadi, tuproq tekshiruvi natijalarini yuklaydi va hisoblangan tavsiyalar oladi. Men mijoz tomonidagi ilovani (25+ sahifa) Next.js va TypeScript'da noldan toza arxitektura bilan loyihaladim, analitik dashboardlar, maxsus xaritalar va ko'p bosqichli wizardlar yaratdim hamda SSR bilan ishlash tezligini oshirdim.",
    },
    {
      description: "Malta milliy avtobus tarmog'i uchun real-time boshqaruv tizimi",
      title: "Tallinja Jamoat Transporti Boshqaruv Tizimi",
      src: "/images/projects/tallinja.webp",
      ctaText: "Ochish",
      ctaLink: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login",
      content:
        "Malta milliy avtobus tarmog'i uchun real vaqtda flotni kuzatish va boshqarish tizimi: avtobuslar, haydovchilar smenalari, yo'nalishlar, depolar, yong'in va texnik signallar. Men React 18 + TypeScript asosida kengaytiriladigan front-end yaratdim, keshlash va tarmoq optimizatsiyalari bilan 40+ REST API integratsiya qildim, 25+ qayta ishlatiladigan UI komponent yetkazdim va birorta muhim hodisa yo'qolmasligi uchun yong'in signali quyi tizimini ishlab chiqdim. Avtobus qidirish samaradorligini 30% ga oshirdim.",
    },
    {
      description: "Atlassian/Jira integratsiyali loyihalarni boshqarish tizimi",
      title: "Planner — Loyihalarni boshqarish tizimi",
      src: "/images/projects/planner.webp",
      ctaText: "Ochish",
      ctaLink: "https://plasch.silberwal.ch/planner",
      content:
        "Atlassian/Jira ekotizimi bilan integratsiyalashgan loyihalarni boshqarish tizimi — Jira chiptalari va vazifalarini to'g'ridan-to'g'ri Planner ilovasiga olib keladi va jamoalar ishni samarali taqsimlaydi. Men Jira bilan integratsiyalashgan OAuth 2.0 autentifikatsiya, 30+ REST API, WebSockets va keshlash qatlamiga ega React 18 + TypeScript front-end arxitekturasini yaratdim. Vazifa qidirish samaradorligini 40% ga oshirdim va 40+ qayta ishlatiladigan komponent qurdim.",
    },
    {
      description: "Rostelecom uchun sanoatlararo marketing platformasi",
      title: "CIMP marketing platformasi",
      src: "/images/projects/cimp.webp",
      ctaText: "Ochish",
      ctaLink: "https://www.soft-control.ru/our-solutions/cimp/",
      content:
        "Rostelecom uchun sanoatlararo marketing platformasi — sodiqlik dasturlari, aksiyalar, bonuslar, mijozlarni ushlab turish va kross-pochta dasturlarini boshqaradi. Dinamik kengaytiriladigan modulli arxitektura asosida qurilgan. Men rolga asoslangan kirish nazorati (RBAC) autentifikatsiya tizimini loyihaladim, 150+ REST API integratsiya qildim va 100+ funksiya va komponent yetkazdim, shu bilan birga kod tekshiruvlari orqali junior dasturchilarga mentorlik qildim.",
    },
  ],
  ru: [
    {
      description: "Интерактивная EdTech-платформа в стиле Kahoot",
      title: "Topqir.uz",
      src: "/images/projects/topqir.webp",
      ctaText: "Открыть",
      ctaLink: "https://topqir.uz/",
      content:
        "Интерактивная EdTech-платформа (B2B/B2C) для учителей, учеников и школ, где уроки превращаются в живые мультиплеерные игры. Как Tech Lead — Full-Stack инженер и архитектор, я масштабировал платформу до 352K активных пользователей, 15M+ просмотров страниц и 24M+ отслеживаемых событий в 10+ странах, с органическим ростом в 751K сессий из органического поиска. Построена на Next.js с real-time геймплеем через WebSockets и AI-системой генерации контента для учителей.",
    },
    {
      description: "AI/GIS-платформа продуктивности почвы",
      title: "AgroNetZero Bio Sync 365",
      src: "/images/projects/agroNetZeroLanding.webp",
      ctaText: "Открыть",
      ctaLink: "https://soilsync.bio",
      content:
        "AI/GIS-платформа, превращающая анализ почвы в графики, обратную связь и рекомендации для фермеров и землевладельцев. Пользователи создают профиль, рисуют участок на карте, загружают результаты анализа почвы и получают расчётные инсайты. Я спроектировал клиентское приложение (25+ страниц) с нуля на Next.js и TypeScript с чистой архитектурой, реализовал аналитические дашборды, кастомные карты и многошаговые мастера, а также улучшил производительность с помощью SSR.",
    },
    {
      description: "Real-time система управления национальной автобусной сетью Мальты",
      title: "Tallinja — Система управления общественным транспортом",
      src: "/images/projects/tallinja.webp",
      ctaText: "Открыть",
      ctaLink: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login",
      content:
        "Система мониторинга и управления автопарком национальной автобусной сети Мальты в реальном времени: автобусы, смены водителей, маршруты, депо, пожарные и технические сигналы. Я построил масштабируемый front-end на React 18 + TypeScript, интегрировал 40+ REST API с кешированием и сетевыми оптимизациями, реализовал 25+ переиспользуемых UI-компонентов и разработал подсистему пожарной сигнализации с блокирующими попапами и очередью сигналов, чтобы ни одно критическое событие не терялось. Повысил эффективность поиска автобусов на 30%.",
    },
    {
      description: "Система управления проектами с интеграцией Atlassian/Jira",
      title: "Planner — Система управления проектами",
      src: "/images/projects/planner.webp",
      ctaText: "Открыть",
      ctaLink: "https://plasch.silberwal.ch/planner",
      content:
        "Система управления проектами, интегрированная с экосистемой Atlassian/Jira: тикеты и задачи Jira попадают прямо в приложение Planner, где команды эффективно распределяют работу. Я спроектировал масштабируемый front-end на React 18 + TypeScript с OAuth 2.0-аутентификацией через Jira, 30+ REST API, WebSockets и слоем кеширования. Повысил эффективность поиска задач на 40% и создал 40+ переиспользуемых компонентов.",
    },
    {
      description: "Кросс-индустриальная маркетинговая платформа для Ростелекома",
      title: "Маркетинговая платформа CIMP",
      src: "/images/projects/cimp.webp",
      ctaText: "Открыть",
      ctaLink: "https://www.soft-control.ru/our-solutions/cimp/",
      content:
        "Кросс-индустриальная маркетинговая платформа для Ростелекома: программы лояльности, акции, бонусы, удержание клиентов и кросс-почтовые программы. Построена как динамически расширяемая модульная архитектура. Я спроектировал систему аутентификации с ролевой моделью доступа, интегрировал 150+ REST API и реализовал 100+ функций и компонентов, параллельно менторя junior-разработчиков через код-ревью.",
    },
  ],
};

export function getProjects(lang: Language): Project[] {
  return projects[lang] || projects.en;
}
