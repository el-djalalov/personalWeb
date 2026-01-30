import { f as createAstro, c as createComponent, m as maybeRenderHead, a as renderTemplate, g as addAttribute, d as renderSlot, r as renderComponent, e as renderHead, b as renderScript, h as renderTransition } from '../chunks/astro/server_BrJBC0vc.mjs';
import 'piccolore';
import { $ as $$Header, a as $$Index$1 } from '../chunks/index_Dyi-08Jf.mjs';
import { g as getLangFromUrl, t, $ as $$ClientRouter, a as $$SquareLines } from '../chunks/translations_rIz2cuYn.mjs';
import 'clsx';
/* empty css                                  */
/* empty css                                 */
import { $ as $$Image } from '../chunks/_astro_assets_DVSwKH0P.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Download } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useId, useRef, useCallback } from 'react';
import { g as getCollection } from '../chunks/_astro_content_CaRowrjE.mjs';
import readingTime from 'reading-time';
export { renderers } from '../renderers.mjs';

const experiences = {
  en: [
    {
      dates: "Nov. 2025 - Present",
      role: "Sr. Software Engineer",
      company: "Vention",
      description: "Working on a platform for automating manufacturing equipment. Building new features and improving existing ones.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null
    },
    {
      dates: "Dec. 2024 - Apr. 2025",
      role: "Sr. Front-end Developer / TL",
      company: "Valletta Software Development",
      description: "Building complex systems, working on a large-scale projects for major clients in Transport and Agro sectors.",
      logo: "/images/experiences/valletta.jpeg",
      website: "https://www.vallettasoftware.com/",
      content: null
    },
    {
      dates: "Sep. 2022 - Nov. 2024",
      role: "Sr. Front-end Developer",
      company: "Soft-Control",
      description: "Completed 2 projects: Project Management System and CIMP (Cross-industrial marketing platform)",
      logo: "/images/experiences/SoftControl.png",
      website: "https://www.soft-control.ru/",
      content: null
    },
    {
      dates: "July 2021 - May 2022",
      role: "Front-end Developer",
      company: "Intelligent Learning Centre",
      description: "Completed 2 projects: Student Management System and landing page for online courses",
      logo: "/images/experiences/Intelligent.webp",
      website: "https://intelligent-lc.uz/",
      content: null
    },
    {
      dates: "Oct 2018 - June 2021",
      role: "Front-end Developer (Freelancer)",
      company: "Home",
      description: "Project description: Management system for construction company (front-end part) and landing pages for different businesses",
      logo: "/images/experiences/home.png",
      website: "https://www.elyor.dev/",
      content: null
    }
  ],
  uz: [
    {
      dates: "Noy. 2025 - Hozir",
      role: "Katta Dasturchi",
      company: "Vention",
      description: "Ishlab chiqarish uskunalarini avtomatlashtirish platformasi ustida ishlash. Yangi funksiyalar qo'shish va mavjudlarini yaxshilash.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null
    },
    {
      dates: "Dek. 2024 - Apr. 2025",
      role: "Katta Front-end Dasturchi / Jamoa rahbari",
      company: "Valletta Software Development",
      description: "Murakkab tizimlarni yaratish, Transport va Agro sektorlaridagi yirik mijozlar uchun keng miqyosli loyihalar ustida ishlash.",
      logo: "/images/experiences/valletta.jpeg",
      website: "https://www.vallettasoftware.com/",
      content: null
    },
    {
      dates: "Sen. 2022 - Noy. 2024",
      role: "Katta Front-end Dasturchi",
      company: "Soft-Control",
      description: "2 ta loyihani yakunladim: Loyihalarni boshqarish tizimi va CIMP (Sanoatlararo marketing platformasi)",
      logo: "/images/experiences/SoftControl.png",
      website: "https://www.soft-control.ru/",
      content: null
    },
    {
      dates: "Iyul 2021 - May 2022",
      role: "Front-end Dasturchi",
      company: "Intelligent Learning Centre",
      description: "2 ta loyihani yakunladim: Talabalarni boshqarish tizimi va onlayn kurslar uchun landing sahifa",
      logo: "/images/experiences/Intelligent.webp",
      website: "https://intelligent-lc.uz/",
      content: null
    },
    {
      dates: "Okt 2018 - Iyun 2021",
      role: "Front-end Dasturchi (Frilanser)",
      company: "Uy",
      description: "Loyiha tavsifi: Qurilish kompaniyasi uchun boshqaruv tizimi (front-end qismi) va turli bizneslar uchun landing sahifalar",
      logo: "/images/experiences/home.png",
      website: "https://www.elyor.dev/",
      content: null
    }
  ],
  ru: [
    {
      dates: "Ноя. 2025 - Настоящее время",
      role: "Старший разработчик",
      company: "Vention",
      description: "Работа над платформой автоматизации производственного оборудования. Создание новых функций и улучшение существующих.",
      logo: "/images/experiences/vention_logo.jpeg",
      website: "https://ventionteams.com/",
      content: null
    },
    {
      dates: "Дек. 2024 - Апр. 2025",
      role: "Старший Front-end разработчик / Тимлид",
      company: "Valletta Software Development",
      description: "Создание сложных систем, работа над крупными проектами для клиентов в транспортном и аграрном секторах.",
      logo: "/images/experiences/valletta.jpeg",
      website: "https://www.vallettasoftware.com/",
      content: null
    },
    {
      dates: "Сен. 2022 - Ноя. 2024",
      role: "Старший Front-end разработчик",
      company: "Soft-Control",
      description: "Завершил 2 проекта: Система управления проектами и CIMP (Кросс-индустриальная маркетинговая платформа)",
      logo: "/images/experiences/SoftControl.png",
      website: "https://www.soft-control.ru/",
      content: null
    },
    {
      dates: "Июль 2021 - Май 2022",
      role: "Front-end разработчик",
      company: "Intelligent Learning Centre",
      description: "Завершил 2 проекта: Система управления студентами и лендинг для онлайн-курсов",
      logo: "/images/experiences/Intelligent.webp",
      website: "https://intelligent-lc.uz/",
      content: null
    },
    {
      dates: "Окт 2018 - Июнь 2021",
      role: "Front-end разработчик (Фрилансер)",
      company: "Дом",
      description: "Описание проекта: Система управления для строительной компании (front-end часть) и лендинги для различных бизнесов",
      logo: "/images/experiences/home.png",
      website: "https://www.elyor.dev/",
      content: null
    }
  ]
};
function getExperiences(lang) {
  return experiences[lang] || experiences.en;
}

const projects = {
  en: [
    {
      description: "Control system for public transport",
      title: "Tallinja Public Transport Control System",
      src: "/images/projects/tallinja.webp",
      ctaText: "Visit",
      ctaLink: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login",
      content: "This is an application where controllers can have real time data of all the buses, bus drivers shifts/efficiency, Routes, Depots, Fire and technical Alarms and so on. It provides different roles Super, Admin and Controller with relevant privileges. Controllers will leave a report form covering all the accomplished work to the next shift controller."
    },
    {
      description: "AgronetZero is a platform for farmers...",
      title: "AgronetZero Bio Sync 365",
      src: "/images/projects/agroNetZeroLanding.webp",
      ctaText: "Visit",
      ctaLink: "https://soilsync.bio",
      content: "An app for farmers and landowners, where they can create profile, draw land on the map, upload their soil test result and get calculated feedback with different charts and recommendations. It also provides many other helpful insights into soil productivity combining the power of AI and other government databases."
    },
    {
      description: "The cross-industrial CIMP marketing platform...",
      title: "CIMP marketing platform",
      src: "/images/projects/cimp.webp",
      ctaText: "Visit",
      ctaLink: "https://www.soft-control.ru/our-solutions/cimp/",
      content: "CIMP is designed to run and manage marketing programs of various orientations - loyalty programs, camping, bonuses, customer retention programs, software and cross-mail programs, and other programs. The solution is a dynamically extensible modular architecture in the form of a component set, each of which implements a piece of logic of separate business processes."
    },
    {
      description: "Project planner app is designed for companies who...",
      title: "Project management system",
      src: "/images/projects/planner.webp",
      ctaText: "Visit",
      ctaLink: "https://plasch.silberwal.ch/planner",
      content: "Project planner app is designed for companies who are seeking to integrate into Jira and bring Jira Tickets and tasks right into the Planner app where you can efficiently divide tickets to team members. By assigning specific tasks and setting ticket status to Pending, In progress and Done, you will gain a greater control of your team members with exact allocation dates."
    },
    {
      description: "Simple video app with full of features...",
      title: "UzVideo",
      src: "/images/projects/uzVideo.webp",
      ctaText: "Visit",
      ctaLink: "https://uz-video.vercel.app/?genre=fetchTrending",
      content: "UzVideo is a simple video app with full of features like search, trending, subscriptions, liked videos, watch later and history. It also has a dark mode and light mode. The app is built with React, Redux, Tailwind CSS and uses the IMD Data API v3 to fetch videos. The app is responsive and works on all devices. It also has a beautiful UI with animations and transitions. The app is deployed on Vercel and is open source on GitHub."
    }
  ],
  uz: [
    {
      description: "Jamoat transporti uchun boshqaruv tizimi",
      title: "Tallinja Jamoat Transporti Boshqaruv Tizimi",
      src: "/images/projects/tallinja.webp",
      ctaText: "Ochish",
      ctaLink: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login",
      content: "Bu ilova orqali nazoratchilar barcha avtobuslar, avtobuslar haydovchilarining smenalari/samaradorligi, yo'nalishlar, depolar, yong'in va texnik signallar haqida real vaqt ma'lumotlarini olishlari mumkin. U Super, Admin va Nazoratchi kabi turli rollarni tegishli imtiyozlar bilan ta'minlaydi. Nazoratchilar keyingi smena nazoratchilariga bajarilgan ishlarni qamrab oluvchi hisobot shakli qoldiradilar."
    },
    {
      description: "AgronetZero - fermerlar uchun platforma...",
      title: "AgronetZero Bio Sync 365",
      src: "/images/projects/agroNetZeroLanding.webp",
      ctaText: "Ochish",
      ctaLink: "https://soilsync.bio",
      content: "Fermerlar va yer egalari uchun ilova, ular profil yaratishi, xaritada yer chizishi, tuproq tekshiruvi natijalarini yuklashi va turli diagrammalar va tavsiyalar bilan hisoblangan fikr-mulohazalarni olishi mumkin. Shuningdek, sun'iy intellekt va boshqa davlat ma'lumotlar bazalarini birlashtirgan holda tuproq unumdorligi haqida boshqa ko'plab foydali ma'lumotlarni taqdim etadi."
    },
    {
      description: "CIMP sanoatlararo marketing platformasi...",
      title: "CIMP marketing platformasi",
      src: "/images/projects/cimp.webp",
      ctaText: "Ochish",
      ctaLink: "https://www.soft-control.ru/our-solutions/cimp/",
      content: "CIMP turli yo'nalishdagi marketing dasturlarini boshqarish uchun mo'ljallangan - sodiqlik dasturlari, aksiyalar, bonuslar, mijozlarni ushlab turish dasturlari, dasturiy ta'minot va kross-pochta dasturlari va boshqa dasturlar. Yechim har biri alohida biznes jarayonlarining mantiqiy qismini amalga oshiradigan komponentlar to'plami shaklida dinamik ravishda kengaytiriladigan modulli arxitektura hisoblanadi."
    },
    {
      description: "Loyihalarni rejalashtirish ilovasi kompaniyalar uchun...",
      title: "Loyihalarni boshqarish tizimi",
      src: "/images/projects/planner.webp",
      ctaText: "Ochish",
      ctaLink: "https://plasch.silberwal.ch/planner",
      content: "Loyihalarni rejalashtirish ilovasi Jira bilan integratsiya qilishni va Jira chipta va vazifalarini to'g'ridan-to'g'ri Planner ilovasiga olib kelishni xohlaydigan kompaniyalar uchun mo'ljallangan, bu yerda siz chiptalarni jamoa a'zolariga samarali taqsimlashingiz mumkin. Muayyan vazifalarni tayinlash va chipta holatini Kutilmoqda, Jarayonda va Bajarildi deb belgilash orqali siz jamoa a'zolaringizni aniq ajratish sanalari bilan kattaroq nazorat qilasiz."
    },
    {
      description: "Ko'plab funksiyalarga ega oddiy video ilova...",
      title: "UzVideo",
      src: "/images/projects/uzVideo.webp",
      ctaText: "Ochish",
      ctaLink: "https://uz-video.vercel.app/?genre=fetchTrending",
      content: "UzVideo - qidiruv, trendlar, obunalar, yoqtirilgan videolar, keyinroq ko'rish va tarix kabi ko'plab funksiyalarga ega oddiy video ilova. Unda qorong'i va yorug' rejimlar ham mavjud. Ilova React, Redux, Tailwind CSS bilan qurilgan va videolarni olish uchun IMD Data API v3 dan foydalanadi. Ilova javob beruvchi va barcha qurilmalarda ishlaydi. Unda animatsiyalar va o'tishlar bilan chiroyli UI ham mavjud. Ilova Vercel-da joylashtirilgan va GitHub-da ochiq manba."
    }
  ],
  ru: [
    {
      description: "Система управления общественным транспортом",
      title: "Tallinja Система Управления Общественным Транспортом",
      src: "/images/projects/tallinja.webp",
      ctaText: "Открыть",
      ctaLink: "https://lemon-ocean-07a841803.4.azurestaticapps.net/auth/login",
      content: "Это приложение, где контролёры могут получать данные в реальном времени обо всех автобусах, сменах/эффективности водителей, маршрутах, депо, пожарных и технических сигналах и т.д. Оно предоставляет различные роли: Супер, Администратор и Контролёр с соответствующими привилегиями. Контролёры оставляют форму отчёта, охватывающую всю выполненную работу, для следующей смены."
    },
    {
      description: "AgronetZero - платформа для фермеров...",
      title: "AgronetZero Bio Sync 365",
      src: "/images/projects/agroNetZeroLanding.webp",
      ctaText: "Открыть",
      ctaLink: "https://soilsync.bio",
      content: "Приложение для фермеров и землевладельцев, где они могут создать профиль, нарисовать участок на карте, загрузить результаты анализа почвы и получить расчётную обратную связь с различными графиками и рекомендациями. Также предоставляет множество других полезных сведений о продуктивности почвы, объединяя мощь ИИ и государственных баз данных."
    },
    {
      description: "Кросс-индустриальная маркетинговая платформа CIMP...",
      title: "Маркетинговая платформа CIMP",
      src: "/images/projects/cimp.webp",
      ctaText: "Открыть",
      ctaLink: "https://www.soft-control.ru/our-solutions/cimp/",
      content: "CIMP предназначен для запуска и управления маркетинговыми программами различной направленности - программами лояльности, акциями, бонусами, программами удержания клиентов, программными и кросс-почтовыми программами и другими. Решение представляет собой динамически расширяемую модульную архитектуру в виде набора компонентов, каждый из которых реализует часть логики отдельных бизнес-процессов."
    },
    {
      description: "Приложение для планирования проектов...",
      title: "Система управления проектами",
      src: "/images/projects/planner.webp",
      ctaText: "Открыть",
      ctaLink: "https://plasch.silberwal.ch/planner",
      content: "Приложение для планирования проектов разработано для компаний, которые хотят интегрироваться с Jira и перенести тикеты и задачи Jira прямо в приложение Planner, где можно эффективно распределять тикеты между членами команды. Назначая конкретные задачи и устанавливая статус тикета как Ожидание, В работе и Готово, вы получаете больший контроль над членами команды с точными датами распределения."
    },
    {
      description: "Простое видео-приложение с множеством функций...",
      title: "UzVideo",
      src: "/images/projects/uzVideo.webp",
      ctaText: "Открыть",
      ctaLink: "https://uz-video.vercel.app/?genre=fetchTrending",
      content: "UzVideo - простое видео-приложение с множеством функций: поиск, тренды, подписки, понравившиеся видео, посмотреть позже и история. Также есть тёмный и светлый режимы. Приложение создано с помощью React, Redux, Tailwind CSS и использует IMD Data API v3 для получения видео. Приложение адаптивное и работает на всех устройствах. Также имеет красивый UI с анимациями и переходами. Приложение развёрнуто на Vercel и имеет открытый исходный код на GitHub."
    }
  ]
};
function getProjects(lang) {
  return projects[lang] || projects.en;
}

const $$Astro$4 = createAstro("https://www.elyor.dev");
const $$Separator = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Separator;
  const { text } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative my-20"> <div class="relative w-full pl-5 overflow-x-hidden md:pl-0"> <div class="absolute w-full h-px bg-gradient-to-r from-transparent to-white md:from-white dark:from-transparent dark:to-slate-950 md:dark:from-slate-950 md:via-transparent md:dark:via-transparent md:to-white md:dark:to-slate-950"></div> <div class="w-full h-px border-t border-dashed border-slate-400 dark:border-slate-600"></div> </div> <div class="absolute flex items-center justify-center w-auto h-auto px-3 py-1.5 uppercase tracking-widest space-x-1 text-[0.6rem] md:-translate-x-1/2 -translate-y-1/2 border rounded-full bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 left-0 md:ml-0 ml-5 md:left-1/2 border-slate-100 dark:border-slate-800 shadow-sm"> <p class="leading-none font-bold">${text}</p> <div class="flex items-center justify-center w-5 h-5 translate-x-1 border rounded-full border-slate-400 dark:border-slate-800"> <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"></path></svg> </div> </div> </div>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/separator.astro", void 0);

const $$Astro$3 = createAstro("https://www.elyor.dev");
const $$Main = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Main;
  const lang = getLangFromUrl(Astro2.url);
  return renderTemplate`<html${addAttribute(lang, "lang")}${addAttribute(renderTransition($$result, "vs4vuqov", "none", "root"), "data-astro-transition-scope")}> <head><title>${t("meta.title", lang)}</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(t("meta.description", lang), "content")}><meta name="author" content="Elyor Djalalov"><meta name="keywords" content="Elyor Djalalov, Frontend Developer, React, Astro, Web Development, Portfolio"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url" content="https://elyor.dev/"><meta property="og:title" content="Elyor Djalalov - Team Lead & Sr. Front-end Developer"><meta property="og:description" content="Personal portfolio showcasing web development projects and skills."><meta property="og:image" content="/og-image.png"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url" content="https://elyor.dev/"><meta property="twitter:title" content="Elyor Djalalov - Team Lead & Sr. Front-end Developer"><meta property="twitter:description" content="Personal portfolio showcasing web development projects and skills."><meta property="twitter:image" content="/og-image.png"><link rel="icon" type="image/x-icon" href="/favicon.ico">${renderSlot($$result, $$slots["head"])}${renderComponent($$result, "ClientRouter", $$ClientRouter, { "fallback": "animate" })}${renderHead()}</head> <body class="antialiased bg-white dark:bg-slate-950 w-full overflow-x-hidden"> ${renderComponent($$result, "SquareLines", $$SquareLines, {})} ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Separator", $$Separator, { "text": t("section.experience", lang) })} ${renderSlot($$result, $$slots["experience"])} ${renderComponent($$result, "Separator", $$Separator, { "text": t("section.projects", lang) })} ${renderSlot($$result, $$slots["projects"])} ${renderComponent($$result, "Separator", $$Separator, { "text": t("section.blog", lang) })} ${renderSlot($$result, $$slots["blog"])} ${renderComponent($$result, "Separator", $$Separator, { "text": t("section.contact", lang) })} ${renderSlot($$result, $$slots["contacts"])} ${renderSlot($$result, $$slots["footer"])} ${renderScript($$result, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/layouts/main.astro?astro&type=script&index=0&lang.ts")} ${renderComponent($$result, "SpeedInsights", $$Index$1, {})} </body></html>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/layouts/main.astro", "self");

const myImage = new Proxy({"src":"/_astro/AvatarMe.C1e0VIFV.webp","width":1272,"height":1920,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/assets/images/AvatarMe.webp";
							}
							
							return target[name];
						}
					});

const translations$3 = {
  en: "Download Resume",
  uz: "Rezyumeni yuklash",
  ru: "Скачать резюме"
};
function DownloadButton({ lang = "en" }) {
  const handleClick = (e) => {
    e.preventDefault();
  };
  const buttonText = translations$3[lang] || translations$3.en;
  return /* @__PURE__ */ jsx("div", { className: "bg-background flex justify-center items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative inline-flex group", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-cyan-700 via-fuchsia-700 to-blue-700 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt" }),
    /* @__PURE__ */ jsxs(
      motion.button,
      {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        title: buttonText,
        "aria-label": buttonText,
        className: "relative inline-flex items-center justify-center px-4 py-4 text-lg font-bold text-white transition-all duration-200 bg-background font-pj rounded-xl",
        onClick: handleClick,
        children: [
          /* @__PURE__ */ jsx(
            Download,
            {
              size: "18",
              className: "mr-4 text-slate-700 dark:text-slate-200"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-slate-700 dark:text-slate-200 text-sm", children: buttonText })
        ]
      }
    )
  ] }) });
}

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

const translations$2 = {
  en: {
    title: "My Projects",
    descriptionPrefix: "Here are ",
    descriptionHighlight: "some",
    descriptionSuffix: " of my recent projects. I'm always working on something new, so check back often!"
  },
  uz: {
    title: "Loyihalarim",
    descriptionPrefix: "Mana so'nggi loyihalarimdan ",
    descriptionHighlight: "ba'zilari",
    descriptionSuffix: ". Doimo yangi narsalar ustida ishlayapman, shuning uchun tez-tez qaytib keling!"
  },
  ru: {
    title: "Мои проекты",
    descriptionPrefix: "Вот ",
    descriptionHighlight: "некоторые",
    descriptionSuffix: " из моих последних проектов. Я всегда работаю над чем-то новым, так что заходите почаще!"
  }
};
const Projects = ({ lang = "en" }) => {
  const projects = getProjects(lang);
  const t = translations$2[lang] || translations$2.en;
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const onKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      setActive(null);
    }
  }, []);
  useEffect(() => {
    document.body.style.overflow = active && typeof active === "object" ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, onKeyDown]);
  useOutsideClick(ref, () => setActive(null));
  return /* @__PURE__ */ jsxs("section", { className: "relative max-w-5xl mx-auto py-8 px-4 lg:px-0", id: "projects", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx(
        "h2",
        {
          className: "flex flex-row mb-5 font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl\n                    bg-gradient-to-r from-cyan-900 via-fuchsia-800 to-blue-700 bg-clip-text text-transparent transition-all duration-300 ease-in-out",
          children: t.title
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "mb-6 text-base dark:text-muted-foreground", children: [
        t.descriptionPrefix,
        /* @__PURE__ */ jsx("u", { children: t.descriptionHighlight }),
        t.descriptionSuffix
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: active && typeof active === "object" && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 bg-black/20 h-full w-full z-50"
      }
    ) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: active && typeof active === "object" && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 grid place-items-center z-[100]", children: [
      /* @__PURE__ */ jsx(
        motion.button,
        {
          layout: true,
          onClick: () => setActive(null),
          "aria-label": "Close project detail",
          className: "flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
        },
        `button-${active.title}-${id}`
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          transition: { type: "spring", stiffness: 300, damping: 30 },
          layoutId: `card-${active.title}-${id}`,
          ref,
          className: "w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-slate-50 dark:bg-slate-900 sm:rounded-3xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsx(motion.div, { layoutId: `image-${active.title}-${id}`, children: /* @__PURE__ */ jsx(
              "img",
              {
                loading: "lazy",
                width: 200,
                height: 200,
                src: active.src,
                alt: active.title,
                className: "w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start p-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    motion.h3,
                    {
                      layoutId: `title-${active.title}-${id}`,
                      className: "font-medium text-slate-700 dark:text-neutral-200 text-base",
                      children: active.title
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.p,
                    {
                      layoutId: `description-${active.description}-${id}`,
                      className: "text-slate-600 dark:text-slate-400 text-base",
                      children: active.description
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  motion.a,
                  {
                    layout: true,
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    href: active.ctaLink,
                    target: "_blank",
                    className: "px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-slate-900",
                    children: active.ctaText
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-4 relative px-4", children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  layout: true,
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "text-slate-500 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-slate-300 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]",
                  children: /* @__PURE__ */ jsx("p", { children: active.content })
                }
              ) })
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("ul", { className: "max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4", children: projects.map((card) => /* @__PURE__ */ jsx(
      motion.li,
      {
        whileHover: { y: -5 },
        layoutId: `card-${card.title}-${id}`,
        onClick: () => setActive(card),
        className: "flex flex-col shadow-xl hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-xl cursor-pointer",
        children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 flex-col w-full", children: [
          /* @__PURE__ */ jsx(motion.div, { layoutId: `image-${card.title}-${id}`, children: /* @__PURE__ */ jsx(
            "img",
            {
              loading: "lazy",
              width: 200,
              height: 200,
              src: card.src,
              alt: card.title,
              className: "h-60 w-full rounded-t-xl object-cover object-top"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-start flex-col p-4", children: [
            /* @__PURE__ */ jsx(
              motion.h3,
              {
                layoutId: `title-${card.title}-${id}`,
                className: "font-medium text-slate-800 dark:text-slate-200 text-center md:text-left text-base",
                children: card.title
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                layoutId: `description-${card.description}-${id}`,
                className: "text-slate-500 dark:text-slate-400 text-center md:text-left text-base",
                children: card.description
              }
            )
          ] })
        ] })
      },
      card.title
    )) })
  ] });
};

const $$Astro$2 = createAstro("https://www.elyor.dev");
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Contact;
  const { lang: propLang } = Astro2.props;
  const lang = propLang || getLangFromUrl(Astro2.url);
  return renderTemplate`${maybeRenderHead()}<section class="relative max-w-5xl mx-auto py-8 px-4 lg:px-0" id="contact"> <div class="z-50"> <h2 class="flex flex-row mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight
bg-gradient-to-r from-cyan-900 via-fuchsia-800 to-blue-700 bg-clip-text text-transparent transition-all duration-300 ease-in-out"> ${t("contact.title", lang)} </h2> <p class="text-sm leading-6 text-slate-700 dark:text-slate-400 sm:text-base lg:text-base"> ${t("contact.description", lang)} <a href="https://www.t.me/elDevBlog" target="_blank" class="text-cyan-600 underline hover:text-violet-900 dark:hover:text-white"> ${t("contact.telegram", lang)}</a>${t("contact.orEmail", lang)} <a href="mailto:info@elyor.dev" class="text-cyan-600 underline hover:text-violet-900 dark:hover:text-white">${t("contact.email", lang)}</a> ${t("contact.willReply", lang)} </p> </div> </section>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/contact/contact.astro", void 0);

const Data = [
  {
    title: "Telegram",
    link: "https://www.t.me/ElyorDjalalov",
    svg: /* @__PURE__ */ jsx(
      "svg",
      {
        width: "24",
        height: "24",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 28 28",
        fill: "none",
        stroke: "currentColor",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "telegram-1",
            d: "M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"
          }
        )
      }
    )
  },
  {
    title: "Facebook",
    link: "https://www.facebook.com/elyor.djalalov",
    svg: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 28 28",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        className: "lucide lucide-facebook",
        children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
      }
    )
  },
  {
    title: "GitHub",
    link: "https://github.com/el-djalalov",
    svg: /* @__PURE__ */ jsx(
      "svg",
      {
        fill: "currentColor",
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        width: "24",
        height: "24",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
            clipRule: "evenodd"
          }
        )
      }
    )
  },
  {
    title: "LindkedIn",
    link: "https://www.linkedin.com/in/eldjalalov",
    svg: /* @__PURE__ */ jsx(
      "svg",
      {
        fill: "currentColor",
        "aria-hidden": "true",
        width: "24",
        height: "24",
        viewBox: "0 0 26 26",
        children: /* @__PURE__ */ jsx("path", { d: "M 21.125 0 L 4.875 0 C 2.183594 0 0 2.183594 0 4.875 L 0 21.125 C 0 23.816406 2.183594 26 4.875 26 L 21.125 26 C 23.816406 26 26 23.816406 26 21.125 L 26 4.875 C 26 2.183594 23.816406 0 21.125 0 Z M 8.039063 22.070313 L 4 22.070313 L 3.976563 9.976563 L 8.015625 9.976563 Z M 5.917969 8.394531 L 5.894531 8.394531 C 4.574219 8.394531 3.722656 7.484375 3.722656 6.351563 C 3.722656 5.191406 4.601563 4.3125 5.945313 4.3125 C 7.289063 4.3125 8.113281 5.191406 8.140625 6.351563 C 8.140625 7.484375 7.285156 8.394531 5.917969 8.394531 Z M 22.042969 22.070313 L 17.96875 22.070313 L 17.96875 15.5 C 17.96875 13.910156 17.546875 12.828125 16.125 12.828125 C 15.039063 12.828125 14.453125 13.558594 14.171875 14.265625 C 14.066406 14.519531 14.039063 14.867188 14.039063 15.222656 L 14.039063 22.070313 L 9.945313 22.070313 L 9.921875 9.976563 L 14.015625 9.976563 L 14.039063 11.683594 C 14.5625 10.875 15.433594 9.730469 17.519531 9.730469 C 20.105469 9.730469 22.039063 11.417969 22.039063 15.046875 L 22.039063 22.070313 Z" })
      }
    )
  }
];

function FooterIcon({ link: url, title, svg }) {
  const handleClick = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = url;
    link.rel = "noopener noreferrer";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return /* @__PURE__ */ jsxs(
    "span",
    {
      onClick: handleClick,
      className: "cursor-pointer text-muted-foreground hover:text-violet-900 dark:hover:text-white",
      children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: title }),
        svg
      ]
    }
  );
}

const translations$1 = {
  en: "Elyor Djalalov",
  uz: "Elyor Djalalov",
  ru: "Элёр Джалалов"
};
function Footer({ lang = "en" }) {
  const copyrightName = translations$1[lang] || translations$1.en;
  return /* @__PURE__ */ jsx("footer", { className: "bg-white border-t mt-20 dark:bg-background border-slate-200 dark:border-slate-800", children: /* @__PURE__ */ jsxs("div", { className: "container flex items-center py-8 mx-auto px-4 md:px-7 w-full md:max-w-7xl justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center items-center", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/",
          "aria-label": "Home",
          className: "h-5 text-base group relative z-30 flex items-center space-x-1.5 text-black dark:text-white font-semibold",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl -translate-y-0.5 group-hover:-rotate-12 group-hover:scale-[1.2] ease-in-out duration-300 text-muted-foreground", children: "✦" }),
            /* @__PURE__ */ jsx("span", { className: "-translate-y-0.5 dark:text-slate-400 text-slate-700", children: "ED" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-sm  text-slate-700 dark:text-slate-400 dark:text-muted-foreground sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-300 dark:sm:border-slate-700 sm:mt-0", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        copyrightName
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: Data.map((icon, index) => {
      return /* @__PURE__ */ jsx(
        FooterIcon,
        {
          title: icon.title,
          link: icon.link,
          svg: icon.svg
        },
        index
      );
    }) })
  ] }) });
}

function InteractiveLink({
  website,
  company,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: website,
      target: "_blank",
      rel: "noopener noreferrer",
      onClickCapture: (e) => {
        e.stopPropagation();
      },
      className: "relative z-100 mb-1 text-sm font-medium text-slate-700 dark:text-slate-300",
      ...rest,
      children: company
    }
  );
}

function AboutExperience({
  logo,
  dates,
  role,
  company,
  description,
  website
}) {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col justify-start pl-12 bg-background", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute pointer-events-none top-0 left-0 z-10 bg-white flex items-center justify-center -translate-x-1/2 border rounded-full dark:bg-background w-14 h-14 border-slate-400 dark:border-slate-500", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: logo,
        width: 26,
        height: 26,
        alt: company,
        loading: "lazy",
        className: "text-white"
      }
    ) }),
    /* @__PURE__ */ jsx("span", { className: "text-xs uppercase dark:text-muted-foreground trackign-widest text-slate-700 dark:text-slate-400", children: dates }),
    /* @__PURE__ */ jsx("h3", { className: "my-1 text-lg font-bold text-slate-700 dark:text-slate-200", children: role }),
    website ? /* @__PURE__ */ jsx(InteractiveLink, { website, company }) : /* @__PURE__ */ jsx("span", { className: "mb-1 text-sm font-medium text-slate-700 dark:text-slate-300", children: company }),
    /* @__PURE__ */ jsx("p", { className: "text-sm font-light text-muted-foreground", children: description })
  ] });
}

const translations = {
  en: "Experience",
  uz: "Tajriba",
  ru: "Опыт"
};
function ExperienceSection({ lang = "en" }) {
  const experiences = getExperiences(lang);
  const title = translations[lang] || translations.en;
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "relative z-20 max-w-5xl mx-auto py-8 px-4 lg:px-0",
      id: "experience",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "flex flex-row mb-5 font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-cyan-900 via-fuchsia-800 to-blue-700 bg-clip-text text-transparent transition-all duration-300 ease-in-out", children: title }),
        /* @__PURE__ */ jsx("div", { className: "px-6 py-10 card", children: experiences.map(
          (exp, idx) => idx !== experiences.length - 1 ? /* @__PURE__ */ jsx(
            "div",
            {
              className: "pb-10 border-l border-slate-300 dark:border-slate-500",
              children: /* @__PURE__ */ jsx(AboutExperience, { ...exp })
            },
            exp.company
          ) : /* @__PURE__ */ jsx(AboutExperience, { ...exp }, exp.company)
        ) })
      ]
    }
  );
}

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let particles = [];
    let animationFrameId;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    class Particle {
      x;
      y;
      size;
      speedX;
      speedY;
      color;
      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        const colors = [
          "rgba(22, 78, 99, 0.4)",
          // cyan-900
          "rgba(134, 25, 143, 0.4)",
          // fuchsia-800
          "rgba(29, 78, 216, 0.4)"
          // blue-700
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const init = () => {
      particles = [];
      const numberOfParticles = Math.min(window.innerWidth * 0.05, 50);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    init();
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30"
    }
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 1e-3
  });
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-blue-500 origin-left z-[100]",
      style: { scaleX }
    }
  );
};

const CursorGlow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 opacity-30 dark:opacity-20",
      style: {
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(124, 58, 237, 0) 70%)",
        // Violet glow
        filter: "blur(40px)"
      }
    }
  );
};

const $$Astro$1 = createAstro("https://www.elyor.dev");
const $$BlogPreview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPreview;
  const { lang: propLang } = Astro2.props;
  const lang = propLang || getLangFromUrl(Astro2.url);
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 3);
  function getReadingTime(body) {
    const stats = readingTime(body);
    return stats.text;
  }
  const dateLocales = {
    en: "en-US",
    uz: "uz-UZ",
    ru: "ru-RU"
  };
  return renderTemplate`${maybeRenderHead()}<section class="relative z-20 max-w-5xl mx-auto py-8 px-4 lg:px-0" id="blog"> <h2 class="flex flex-row mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-cyan-900 via-fuchsia-800 to-blue-700 bg-clip-text text-transparent transition-all duration-300 ease-in-out"> ${t("blogPreview.title", lang)} </h2> ${posts.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"> ${posts.map((post) => {
    const { title, description, pubDate, heroImage, tags, translationKey } = post.data;
    const postId = post.id.replace(/\.(md|mdx)$/, "");
    const postSlug = translationKey || postId;
    const formattedDate = pubDate.toLocaleDateString(dateLocales[lang] || "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    const readTime = getReadingTime(post.body || "");
    return renderTemplate`<article class="group relative flex flex-col h-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 hover:border-violet-300 dark:hover:border-violet-700 card"> <!-- Image --> <a${addAttribute(`/blog/${postSlug}`, "href")} class="relative aspect-video overflow-hidden"> ${heroImage ? renderTemplate`<img${addAttribute(heroImage, "src")}${addAttribute(title, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">` : renderTemplate`<div class="w-full h-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center"> <svg class="w-12 h-12 text-violet-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path> </svg> </div>`} <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> </a> <!-- Content --> <div class="flex flex-col flex-1 p-5"> <!-- Tags --> ${tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-3"> ${tags.slice(0, 2).map((tag) => renderTemplate`<span class="px-2 py-0.5 text-xs font-medium rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"> ${tag} </span>`)} </div>`} <!-- Title --> <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"> <a${addAttribute(`/blog/${postSlug}`, "href")} class="before:absolute before:inset-0"> ${title} </a> </h3> <!-- Description --> <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1"> ${description} </p> <!-- Meta --> <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800"> <time${addAttribute(pubDate.toISOString(), "datetime")} class="flex items-center gap-1"> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> ${formattedDate} </time> <span class="flex items-center gap-1"> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ${readTime} </span> </div> </div> </article>`;
  })} </div>` : renderTemplate`<div class="text-center py-12"> <p class="text-slate-500 dark:text-slate-400"> ${t("blogPreview.comingSoon", lang)} </p> </div>`} <!-- More Posts Button --> <div class="flex justify-center"> <a${addAttribute(lang === "en" ? "/blog" : `/blog?lang=${lang}`, "href")} class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 group"> ${t("blogPreview.morePosts", lang)} <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </section>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/blog/BlogPreview.astro", void 0);

const $$Astro = createAstro("https://www.elyor.dev");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const lang = getLangFromUrl(Astro2.url);
  return renderTemplate`${renderComponent($$result, "Layout", $$Main, {}, { "blog": ($$result2) => renderTemplate`${renderComponent($$result2, "BlogPreview", $$BlogPreview, { "slot": "blog", "lang": lang })}`, "contacts": ($$result2) => renderTemplate`${renderComponent($$result2, "Contact", $$Contact, { "slot": "contacts", "lang": lang })}`, "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ScrollProgress", ScrollProgress, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/home/ScrollProgress", "client:component-export": "default" })} ${renderComponent($$result2, "CursorGlow", CursorGlow, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/home/CursorGlow", "client:component-export": "default" })} ${maybeRenderHead()}<div class="relative"> ${renderComponent($$result2, "ParticleBackground", ParticleBackground, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/home/ParticleBackground", "client:component-export": "default" })} <div class="relative z-20 flex flex-col-reverse max-w-6xl md:mt-14 mx-auto gap-8 items-center md:flex-row justify-between"> <div class="flex flex-col flex-1 elementAnimate justify-center items-center md:justify-start md:items-start gap-4"> <h1 class="-translate-x-2 flex mb-5 text-6xl font-bold leading-tight sm:text-6xl md:text-8xl lg:text-[110px]
bg-gradient-to-r from-cyan-900 via-fuchsia-800 to-blue-700 bg-clip-text text-transparent transition-all duration-300 ease-in-out animate-text-gradient"> ${t("hero.greeting", lang)} </h1> <p class="mb-8 md:mb-10
        font-semibold
        text-slate-800
        dark:text-slate-200
        text-xl"> ${t("hero.title", lang)} </p> ${renderComponent($$result2, "DownloadButton", DownloadButton, { "client:load": true, "lang": lang, "client:component-hydration": "load", "client:component-path": "@/components/home/DownloadButton.jsx", "client:component-export": "default" })} </div> <!-- Hero image --> <div class="relative md:flex md:w-1/3"> <div class="relative z-50 w-56 md:w-96 elementAnimate"> <div class="absolute bottom-0 z-40 w-14 h-14 -translate-x-7 translate-y-10 lg:top-auto top-0 lg:-translate-y-[330px] rounded-full"> <span class="elementAnimate relative z-20 flex items-center justify-center w-full h-full text-2xl border-8 border-white rounded-full dark:border-slate-950 bg-slate-100 dark:bg-background"> <span class="flex items-center justify-center w-full h-full bg-white border border-dashed rounded-full dark:bg-background border-slate-300 dark:border-slate-700">👋</span> </span> </div> <div class="relative z-30 px-2"> ${renderComponent($$result2, "Image", $$Image, { "quality": "high", "alt": "Hero image", "src": myImage, "loading": "eager", "fetchpriority": "high", "decoding": "auto", "class": "elementAnimate relative w-80 mx-auto" })} </div> <div class="absolute bottom-0 right-0 z-20 w-full h-[280px] md:h-[350px] lg:h-[420px] translate-x-0 -translate-y-px border border-dashed rounded-2xl bg-gradient-to-r dark:from-slate-950/60 dark:via-black/40 dark:to-slate-950/60 from-white via-slate-50 to-white border-slate-300 dark:border-slate-700"></div> </div> </div> </div> </div>      `, "experience": ($$result2) => renderTemplate`${renderComponent($$result2, "ExperienceSection", ExperienceSection, { "slot": "experience", "client:visible": true, "lang": lang, "client:component-hydration": "visible", "client:component-path": "@/components/experience/ExperienceSection", "client:component-export": "default" })}`, "footer": ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", Footer, { "slot": "footer", "client:visible": true, "lang": lang, "client:component-hydration": "visible", "client:component-path": "@/components/footer/footer", "client:component-export": "default" })}`, "projects": ($$result2) => renderTemplate`${renderComponent($$result2, "Projects", Projects, { "slot": "projects", "client:visible": true, "lang": lang, "client:component-hydration": "visible", "client:component-path": "@/components/projects", "client:component-export": "default" })}` })}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/pages/index.astro", void 0);

const $$file = "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
