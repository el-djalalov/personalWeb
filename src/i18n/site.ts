import type { Language } from "@/content.config";

/** Text for the page shell: header, menu, bottom bar and footer. */
export interface SiteCopy {
  name: string;
  nav: {
    home: string;
    skills: string;
    work: string;
    jobs: string;
    writing: string;
    contact: string;
    blog: string;
  };
  search: string;
  menu: string;
  menuLabel: string;
  placeholder: string;
  noMatch: string;
  keyHints: string;
  groups: { sections: string; cases: string; actions: string };
  actions: {
    switchTheme: string;
    copyEmail: string;
    emailCopied: string;
    allPosts: string;
  };
  localTime: string;
  social: string;
  /** Accessible names for shared controls */
  a11y: { theme: string; toc: string; tocLabel: string; readingProgress: string; language: string };
}

export const site: Record<Language, SiteCopy> = {
  en: {
    name: "Elyor Djalalov",
    nav: {
      home: "Home",
      skills: "Skills",
      work: "Work",
      jobs: "Jobs",
      writing: "Writing",
      contact: "Contact",
      blog: "Blog",
    },
    search: "Search",
    menu: "Menu",
    menuLabel: "Site menu",
    placeholder: "Jump to a section, project or action…",
    noMatch: "No match",
    keyHints: "↑ ↓ move · Enter open · Esc close",
    groups: { sections: "Sections", cases: "Case files", actions: "Actions" },
    actions: {
      switchTheme: "Switch theme",
      copyEmail: "Copy email",
      emailCopied: "Email copied",
      allPosts: "All posts",
    },
    localTime: "Local time",
    social: "Social links",
    a11y: { theme: "Dark theme", toc: "On this page", tocLabel: "Table of contents", readingProgress: "Reading progress", language: "Language" },
  },
  uz: {
    name: "Elyor Djalalov",
    nav: {
      home: "Bosh sahifa",
      skills: "Ko'nikmalar",
      work: "Ishlar",
      jobs: "Tajriba",
      writing: "Maqolalar",
      contact: "Aloqa",
      blog: "Blog",
    },
    search: "Qidirish",
    menu: "Menyu",
    menuLabel: "Sayt menyusi",
    placeholder: "Bo'lim, loyiha yoki amalni tanlang…",
    noMatch: "Hech narsa topilmadi",
    keyHints: "↑ ↓ tanlash · Enter ochish · Esc yopish",
    groups: { sections: "Bo'limlar", cases: "Loyihalar", actions: "Amallar" },
    actions: {
      switchTheme: "Mavzuni almashtirish",
      copyEmail: "Emailni nusxalash",
      emailCopied: "Email nusxalandi",
      allPosts: "Barcha maqolalar",
    },
    localTime: "Mahalliy vaqt",
    social: "Ijtimoiy tarmoqlar",
    a11y: { theme: "Tungi mavzu", toc: "Ushbu sahifada", tocLabel: "Mundarija", readingProgress: "O'qish jarayoni", language: "Til" },
  },
  ru: {
    name: "Элёр Джалалов",
    nav: {
      home: "Главная",
      skills: "Навыки",
      work: "Проекты",
      jobs: "Опыт",
      writing: "Статьи",
      contact: "Контакты",
      blog: "Блог",
    },
    search: "Поиск",
    menu: "Меню",
    menuLabel: "Меню сайта",
    placeholder: "Раздел, проект или действие…",
    noMatch: "Ничего не найдено",
    keyHints: "↑ ↓ выбор · Enter открыть · Esc закрыть",
    groups: { sections: "Разделы", cases: "Проекты", actions: "Действия" },
    actions: {
      switchTheme: "Сменить тему",
      copyEmail: "Скопировать email",
      emailCopied: "Email скопирован",
      allPosts: "Все статьи",
    },
    localTime: "Местное время",
    social: "Соцсети",
    a11y: { theme: "Тёмная тема", toc: "На этой странице", tocLabel: "Оглавление", readingProgress: "Прогресс чтения", language: "Язык" },
  },
};

export const getSiteCopy = (lang: Language): SiteCopy => site[lang] ?? site.en;

export const CONTACT = {
  email: "info@elyor.dev",
  telegramChannel: "https://www.t.me/elDevBlog",
  telegram: "https://www.t.me/ElyorDjalalov",
  github: "https://github.com/el-djalalov",
  linkedin: "https://www.linkedin.com/in/eldjalalov",
  credly: "https://www.credly.com/badges/7ded7162-bdcc-4f18-a4a0-56a9e8239abf",
} as const;
