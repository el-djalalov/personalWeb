import type { Language } from "@/content.config";

// Translation keys and their values for each language
export const translations = {
  en: {
    // Hero section
    "hero.title": "AI-Native Engineer",

    // Section headers
    "section.contact": "Contact",

    // Blog index page
    "blog.title": "Blog",
    "blog.description":
      "Thoughts on web development, software architecture, and engineering best practices.",
    "blog.backToHome": "Back to Home",
    "blog.allPosts": "All Posts",
    "blog.noPosts": "No posts yet",
    "blog.checkBack": "Check back soon for new content!",
    "blog.subscribeRss": "Subscribe via RSS",
    "blog.post": "post",
    "blog.posts": "posts",
    // Russian 2–4 (and 22–24 …) form; other languages repeat "blog.posts"
    "blog.postsFew": "posts",
    "blog.taggedWith": "tagged with",

    // Blog post layout
    "blogPost.backToBlog": "Back to Blog",
    "blogPost.viewAllPosts": "View all posts →",
    "blogPost.updated": "Updated",
    "blogPost.authorBio":
      "AI-native engineer. Writing about AI-assisted engineering, spec-driven development, web development and software architecture.",

    // 404 page
    "error.404": "404",
    "error.notFound": "Sorry, we couldn't find this page.",
    "error.goHome":
      "Go to the home page, or press Ctrl K to find a section.",

    // Meta
    "meta.title": "Elyor Djalalov",
  },
  uz: {
    // Hero section
    "hero.title": "AI-native muhandis",

    // Section headers
    "section.contact": "Aloqa",

    // Blog index page
    "blog.title": "Blog",
    "blog.description":
      "Veb-dasturlash, dasturiy ta'minot arxitekturasi va muhandislik bo'yicha fikrlar.",
    "blog.backToHome": "Bosh sahifaga",
    "blog.allPosts": "Barcha maqolalar",
    "blog.noPosts": "Hali maqolalar yo'q",
    "blog.checkBack": "Tez orada yangi kontent uchun qaytib keling!",
    "blog.subscribeRss": "RSS orqali obuna bo'ling",
    "blog.post": "maqola",
    "blog.posts": "maqola",
    "blog.postsFew": "maqola",
    "blog.taggedWith": "bu tegda",

    // Blog post layout
    "blogPost.backToBlog": "Blogga qaytish",
    "blogPost.viewAllPosts": "Barcha maqolalar →",
    "blogPost.updated": "Yangilangan",
    "blogPost.authorBio":
      "AI-native muhandis. AI yordamidagi muhandislik, spetsifikatsiyaga asoslangan ishlab chiqish, veb-dasturlash va dasturiy ta'minot arxitekturasi haqida yozaman.",

    // 404 page
    "error.404": "404",
    "error.notFound": "Kechirasiz, bu sahifa topilmadi.",
    "error.goHome":
      "Bosh sahifaga o'ting yoki bo'limni topish uchun Ctrl K ni bosing.",

    // Meta
    "meta.title": "Elyor Djalalov",
  },
  ru: {
    // Hero section
    "hero.title": "AI-native инженер",

    // Section headers
    "section.contact": "Контакт",

    // Blog index page
    "blog.title": "Блог",
    "blog.description":
      "Мысли о веб-разработке, архитектуре ПО и лучших практиках инженерии.",
    "blog.backToHome": "На главную",
    "blog.allPosts": "Все статьи",
    "blog.noPosts": "Пока нет статей",
    "blog.checkBack": "Скоро появится новый контент!",
    "blog.subscribeRss": "Подписаться на RSS",
    "blog.post": "статья",
    "blog.posts": "статей",
    "blog.postsFew": "статьи",
    "blog.taggedWith": "с тегом",

    // Blog post layout
    "blogPost.backToBlog": "Назад в блог",
    "blogPost.viewAllPosts": "Все статьи →",
    "blogPost.updated": "Обновлено",
    "blogPost.authorBio":
      "AI-native инженер. Пишу об инженерии с ИИ, разработке на основе спецификаций, веб-разработке и архитектуре ПО.",

    // 404 page
    "error.404": "404",
    "error.notFound": "Извините, страница не найдена.",
    "error.goHome":
      "Перейдите на главную или нажмите Ctrl K, чтобы найти раздел.",

    // Meta
    "meta.title": "Элёр Джалалов",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

// Get translation for a key in a specific language
export function t(key: TranslationKey, lang: Language = "en"): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

// Get all translations for a language
export function getTranslations(lang: Language) {
  return translations[lang] || translations.en;
}

// Helper to get language from URL path or query parameter
export function getLangFromUrl(url: URL): Language {
  const pathname = url.pathname;

  // Check if path starts with /uz/ or /ru/
  if (pathname.startsWith("/uz/") || pathname === "/uz") {
    return "uz";
  }
  if (pathname.startsWith("/ru/") || pathname === "/ru") {
    return "ru";
  }

  // Fallback: check query parameter for backwards compatibility
  const langParam = url.searchParams.get("lang");
  if (langParam === "uz" || langParam === "ru") {
    return langParam;
  }

  return "en";
}

// Helper to build URL with language prefix
export function buildLangUrl(path: string, lang: Language): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // For English (default locale), don't add prefix
  if (lang === "en") {
    return `/${cleanPath}`;
  }

  // For other languages, add language prefix
  return `/${lang}/${cleanPath}`;
}
