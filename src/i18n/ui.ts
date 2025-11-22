export const languages = {
  en: "English",
  ru: "Русский",
  uz: "O'zbek",
} as const;

export const defaultLang = "en";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.tags": "Tags",
    "nav.search": "Search",
    "nav.archives": "Archives",

    "blog.title": "Blog",
    "blog.recent": "Recent Posts",
    "blog.all": "All Posts",
    "blog.readMore": "Read more",
    "blog.publishedOn": "Published",
    "blog.updatedOn": "Updated",
    "blog.tags": "Tags",
    "blog.minuteRead": "min read",
    "blog.featured": "Featured",
    "blog.draft": "Draft",

    "translate.to": "Translate to",
    "translate.original": "Show original",
    "translate.translating": "Translating...",
    "translate.aiPowered": "AI-powered translation",
    "translate.notSupported": "Browser AI translation not available. Please use Chrome 138+ for AI-powered translation.",

    "search.placeholder": "Search blog posts...",
    "search.noResults": "No results found",

    "pagination.prev": "Previous",
    "pagination.next": "Next",

    "footer.copyright": "All rights reserved",
  },
  ru: {
    "nav.home": "Главная",
    "nav.about": "О нас",
    "nav.blog": "Блог",
    "nav.projects": "Проекты",
    "nav.contact": "Контакты",
    "nav.tags": "Теги",
    "nav.search": "Поиск",
    "nav.archives": "Архив",

    "blog.title": "Блог",
    "blog.recent": "Последние публикации",
    "blog.all": "Все публикации",
    "blog.readMore": "Читать далее",
    "blog.publishedOn": "Опубликовано",
    "blog.updatedOn": "Обновлено",
    "blog.tags": "Теги",
    "blog.minuteRead": "мин чтения",
    "blog.featured": "Избранное",
    "blog.draft": "Черновик",

    "translate.to": "Перевести на",
    "translate.original": "Показать оригинал",
    "translate.translating": "Перевод...",
    "translate.aiPowered": "Перевод с помощью ИИ",
    "translate.notSupported": "Перевод ИИ в браузере недоступен. Пожалуйста, используйте Chrome 138+ для перевода с помощью ИИ.",

    "search.placeholder": "Поиск по блогу...",
    "search.noResults": "Ничего не найдено",

    "pagination.prev": "Назад",
    "pagination.next": "Вперёд",

    "footer.copyright": "Все права защищены",
  },
  uz: {
    "nav.home": "Bosh sahifa",
    "nav.about": "Haqida",
    "nav.blog": "Blog",
    "nav.projects": "Loyihalar",
    "nav.contact": "Aloqa",
    "nav.tags": "Teglar",
    "nav.search": "Qidiruv",
    "nav.archives": "Arxiv",

    "blog.title": "Blog",
    "blog.recent": "So'nggi maqolalar",
    "blog.all": "Barcha maqolalar",
    "blog.readMore": "Batafsil",
    "blog.publishedOn": "Nashr qilingan",
    "blog.updatedOn": "Yangilangan",
    "blog.tags": "Teglar",
    "blog.minuteRead": "daqiqa o'qish",
    "blog.featured": "Tanlangan",
    "blog.draft": "Qoralama",

    "translate.to": "Tarjima qilish",
    "translate.original": "Asl nusxasini ko'rsatish",
    "translate.translating": "Tarjima qilinmoqda...",
    "translate.aiPowered": "AI yordamida tarjima",
    "translate.notSupported": "Brauzerda AI tarjimasi mavjud emas. Iltimos, AI tarjimasi uchun Chrome 138+ dan foydalaning.",

    "search.placeholder": "Blogdan qidiring...",
    "search.noResults": "Hech narsa topilmadi",

    "pagination.prev": "Avvalgi",
    "pagination.next": "Keyingi",

    "footer.copyright": "Barcha huquqlar himoyalangan",
  },
} as const;

export type UiKey = keyof typeof ui[typeof defaultLang];

export function useTranslations(lang: keyof typeof ui = defaultLang) {
  return function t(key: UiKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}
