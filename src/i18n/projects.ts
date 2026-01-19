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
      description: "Control system for public transport",
      title: "Tallinja Public Transport Control System",
      src: "/images/projects/tallinja.webp",
      ctaText: "Visit",
      ctaLink: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login",
      content:
        "This is an application where controllers can have real time data of all the buses, bus drivers shifts/efficiency, Routes, Depots, Fire and technical Alarms and so on. It provides different roles Super, Admin and Controller with relevant privileges. Controllers will leave a report form covering all the accomplished work to the next shift controller.",
    },
    {
      description: "AgronetZero is a platform for farmers...",
      title: "AgronetZero Bio Sync 365",
      src: "/images/projects/agroNetZeroLanding.webp",
      ctaText: "Visit",
      ctaLink: "https://soilsync.bio",
      content:
        "An app for farmers and landowners, where they can create profile, draw land on the map, upload their soil test result and get calculated feedback with different charts and recommendations. It also provides many other helpful insights into soil productivity combining the power of AI and other government databases.",
    },
    {
      description: "The cross-industrial CIMP marketing platform...",
      title: "CIMP marketing platform",
      src: "/images/projects/cimp.webp",
      ctaText: "Visit",
      ctaLink: "https://www.soft-control.ru/our-solutions/cimp/",
      content:
        "CIMP is designed to run and manage marketing programs of various orientations - loyalty programs, camping, bonuses, customer retention programs, software and cross-mail programs, and other programs. The solution is a dynamically extensible modular architecture in the form of a component set, each of which implements a piece of logic of separate business processes.",
    },
    {
      description: "Project planner app is designed for companies who...",
      title: "Project management system",
      src: "/images/projects/planner.webp",
      ctaText: "Visit",
      ctaLink: "https://plasch.silberwal.ch/planner",
      content:
        "Project planner app is designed for companies who are seeking to integrate into Jira and bring Jira Tickets and tasks right into the Planner app where you can efficiently divide tickets to team members. By assigning specific tasks and setting ticket status to Pending, In progress and Done, you will gain a greater control of your team members with exact allocation dates.",
    },
    {
      description: "Simple video app with full of features...",
      title: "UzVideo",
      src: "/images/projects/uzVideo.webp",
      ctaText: "Visit",
      ctaLink: "https://uz-video.vercel.app/?genre=fetchTrending",
      content:
        "UzVideo is a simple video app with full of features like search, trending, subscriptions, liked videos, watch later and history. It also has a dark mode and light mode. The app is built with React, Redux, Tailwind CSS and uses the IMD Data API v3 to fetch videos. The app is responsive and works on all devices. It also has a beautiful UI with animations and transitions. The app is deployed on Vercel and is open source on GitHub.",
    },
  ],
  uz: [
    {
      description: "Jamoat transporti uchun boshqaruv tizimi",
      title: "Tallinja Jamoat Transporti Boshqaruv Tizimi",
      src: "/images/projects/tallinja.webp",
      ctaText: "Ochish",
      ctaLink: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login",
      content:
        "Bu ilova orqali nazoratchilar barcha avtobuslar, avtobuslar haydovchilarining smenalari/samaradorligi, yo'nalishlar, depolar, yong'in va texnik signallar haqida real vaqt ma'lumotlarini olishlari mumkin. U Super, Admin va Nazoratchi kabi turli rollarni tegishli imtiyozlar bilan ta'minlaydi. Nazoratchilar keyingi smena nazoratchilariga bajarilgan ishlarni qamrab oluvchi hisobot shakli qoldiradilar.",
    },
    {
      description: "AgronetZero - fermerlar uchun platforma...",
      title: "AgronetZero Bio Sync 365",
      src: "/images/projects/agroNetZeroLanding.webp",
      ctaText: "Ochish",
      ctaLink: "https://soilsync.bio",
      content:
        "Fermerlar va yer egalari uchun ilova, ular profil yaratishi, xaritada yer chizishi, tuproq tekshiruvi natijalarini yuklashi va turli diagrammalar va tavsiyalar bilan hisoblangan fikr-mulohazalarni olishi mumkin. Shuningdek, sun'iy intellekt va boshqa davlat ma'lumotlar bazalarini birlashtirgan holda tuproq unumdorligi haqida boshqa ko'plab foydali ma'lumotlarni taqdim etadi.",
    },
    {
      description: "CIMP sanoatlararo marketing platformasi...",
      title: "CIMP marketing platformasi",
      src: "/images/projects/cimp.webp",
      ctaText: "Ochish",
      ctaLink: "https://www.soft-control.ru/our-solutions/cimp/",
      content:
        "CIMP turli yo'nalishdagi marketing dasturlarini boshqarish uchun mo'ljallangan - sodiqlik dasturlari, aksiyalar, bonuslar, mijozlarni ushlab turish dasturlari, dasturiy ta'minot va kross-pochta dasturlari va boshqa dasturlar. Yechim har biri alohida biznes jarayonlarining mantiqiy qismini amalga oshiradigan komponentlar to'plami shaklida dinamik ravishda kengaytiriladigan modulli arxitektura hisoblanadi.",
    },
    {
      description: "Loyihalarni rejalashtirish ilovasi kompaniyalar uchun...",
      title: "Loyihalarni boshqarish tizimi",
      src: "/images/projects/planner.webp",
      ctaText: "Ochish",
      ctaLink: "https://plasch.silberwal.ch/planner",
      content:
        "Loyihalarni rejalashtirish ilovasi Jira bilan integratsiya qilishni va Jira chipta va vazifalarini to'g'ridan-to'g'ri Planner ilovasiga olib kelishni xohlaydigan kompaniyalar uchun mo'ljallangan, bu yerda siz chiptalarni jamoa a'zolariga samarali taqsimlashingiz mumkin. Muayyan vazifalarni tayinlash va chipta holatini Kutilmoqda, Jarayonda va Bajarildi deb belgilash orqali siz jamoa a'zolaringizni aniq ajratish sanalari bilan kattaroq nazorat qilasiz.",
    },
    {
      description: "Ko'plab funksiyalarga ega oddiy video ilova...",
      title: "UzVideo",
      src: "/images/projects/uzVideo.webp",
      ctaText: "Ochish",
      ctaLink: "https://uz-video.vercel.app/?genre=fetchTrending",
      content:
        "UzVideo - qidiruv, trendlar, obunalar, yoqtirilgan videolar, keyinroq ko'rish va tarix kabi ko'plab funksiyalarga ega oddiy video ilova. Unda qorong'i va yorug' rejimlar ham mavjud. Ilova React, Redux, Tailwind CSS bilan qurilgan va videolarni olish uchun IMD Data API v3 dan foydalanadi. Ilova javob beruvchi va barcha qurilmalarda ishlaydi. Unda animatsiyalar va o'tishlar bilan chiroyli UI ham mavjud. Ilova Vercel-da joylashtirilgan va GitHub-da ochiq manba.",
    },
  ],
  ru: [
    {
      description: "Система управления общественным транспортом",
      title: "Tallinja Система Управления Общественным Транспортом",
      src: "/images/projects/tallinja.webp",
      ctaText: "Открыть",
      ctaLink: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login",
      content:
        "Это приложение, где контролёры могут получать данные в реальном времени обо всех автобусах, сменах/эффективности водителей, маршрутах, депо, пожарных и технических сигналах и т.д. Оно предоставляет различные роли: Супер, Администратор и Контролёр с соответствующими привилегиями. Контролёры оставляют форму отчёта, охватывающую всю выполненную работу, для следующей смены.",
    },
    {
      description: "AgronetZero - платформа для фермеров...",
      title: "AgronetZero Bio Sync 365",
      src: "/images/projects/agroNetZeroLanding.webp",
      ctaText: "Открыть",
      ctaLink: "https://soilsync.bio",
      content:
        "Приложение для фермеров и землевладельцев, где они могут создать профиль, нарисовать участок на карте, загрузить результаты анализа почвы и получить расчётную обратную связь с различными графиками и рекомендациями. Также предоставляет множество других полезных сведений о продуктивности почвы, объединяя мощь ИИ и государственных баз данных.",
    },
    {
      description: "Кросс-индустриальная маркетинговая платформа CIMP...",
      title: "Маркетинговая платформа CIMP",
      src: "/images/projects/cimp.webp",
      ctaText: "Открыть",
      ctaLink: "https://www.soft-control.ru/our-solutions/cimp/",
      content:
        "CIMP предназначен для запуска и управления маркетинговыми программами различной направленности - программами лояльности, акциями, бонусами, программами удержания клиентов, программными и кросс-почтовыми программами и другими. Решение представляет собой динамически расширяемую модульную архитектуру в виде набора компонентов, каждый из которых реализует часть логики отдельных бизнес-процессов.",
    },
    {
      description: "Приложение для планирования проектов...",
      title: "Система управления проектами",
      src: "/images/projects/planner.webp",
      ctaText: "Открыть",
      ctaLink: "https://plasch.silberwal.ch/planner",
      content:
        "Приложение для планирования проектов разработано для компаний, которые хотят интегрироваться с Jira и перенести тикеты и задачи Jira прямо в приложение Planner, где можно эффективно распределять тикеты между членами команды. Назначая конкретные задачи и устанавливая статус тикета как Ожидание, В работе и Готово, вы получаете больший контроль над членами команды с точными датами распределения.",
    },
    {
      description: "Простое видео-приложение с множеством функций...",
      title: "UzVideo",
      src: "/images/projects/uzVideo.webp",
      ctaText: "Открыть",
      ctaLink: "https://uz-video.vercel.app/?genre=fetchTrending",
      content:
        "UzVideo - простое видео-приложение с множеством функций: поиск, тренды, подписки, понравившиеся видео, посмотреть позже и история. Также есть тёмный и светлый режимы. Приложение создано с помощью React, Redux, Tailwind CSS и использует IMD Data API v3 для получения видео. Приложение адаптивное и работает на всех устройствах. Также имеет красивый UI с анимациями и переходами. Приложение развёрнуто на Vercel и имеет открытый исходный код на GitHub.",
    },
  ],
};

export function getProjects(lang: Language): Project[] {
  return projects[lang] || projects.en;
}
