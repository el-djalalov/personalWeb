import { c as createComponent, m as maybeRenderHead, a as renderTemplate, r as renderComponent, f as createAstro, g as addAttribute, b as renderScript } from './astro/server_BrJBC0vc.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Square = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="w-full h-auto bg-white dark:bg-slate-950 aspect-square {classes}"></div>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/home/square.astro", void 0);

const $$SquareLine = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="relative flex w-full divide-x h-[30px] sm:h-[45px] md:h-[60px] xl:h-[88px] divide-slate-300 dark:divide-slate-700 divide-dashed"> ${renderComponent($$result, "Square", $$Square, {})} ${renderComponent($$result, "Square", $$Square, {})} ${renderComponent($$result, "Square", $$Square, {})} ${renderComponent($$result, "Square", $$Square, {})} ${renderComponent($$result, "Square", $$Square, {})} ${renderComponent($$result, "Square", $$Square, {})} ${renderComponent($$result, "Square", $$Square, {})} ${renderComponent($$result, "Square", $$Square, {})} ${renderComponent($$result, "Square", $$Square, {})} </div>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/home/square-line.astro", void 0);

const $$SquareLines = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="absolute w-screen h-auto" style="z-index:-1"> <div class="absolute top-0 left-0 w-1/2 h-auto bg-slate-100 dark:bg-slate-800"> <div class="absolute inset-0 z-30 w-full h-full pointer-events-none bg-gradient-to-tl from-white dark:from-slate-950 from-50% via-90% to-100% via-transparent to-transparent"></div> <div class="flex flex-col w-full h-full border-t border-l divide-y divide-dashed divide-slate-300 dark:divide-slate-600 border-slate-300 dark:border-slate-900"> ${renderComponent($$result, "SquareLine", $$SquareLine, {})} ${renderComponent($$result, "SquareLine", $$SquareLine, {})} ${renderComponent($$result, "SquareLine", $$SquareLine, {})} ${renderComponent($$result, "SquareLine", $$SquareLine, {})} ${renderComponent($$result, "SquareLine", $$SquareLine, {})} ${renderComponent($$result, "SquareLine", $$SquareLine, {})} </div> </div> <div class="absolute top-0 right-0 w-1/2 h-auto bg-slate-100 dark:bg-slate-800"> <div class="absolute inset-0 z-30 w-full h-full pointer-events-none bg-gradient-to-tr from-white dark:from-slate-950 from-50% via-90% to-100% via-transparent to-transparent"></div> <div class="flex flex-col w-full h-full border-t border-l divide-y divide-dashed divide-slate-300 dark:divide-slate-600 border-slate-300 dark:border-slate-900"> ${renderComponent($$result, "SquareLine", $$SquareLine, {})} ${renderComponent($$result, "SquareLine", $$SquareLine, {})} ${renderComponent($$result, "SquareLine", $$SquareLine, {})} ${renderComponent($$result, "SquareLine", $$SquareLine, {})} ${renderComponent($$result, "SquareLine", $$SquareLine, {})} ${renderComponent($$result, "SquareLine", $$SquareLine, {})} </div> </div> </div>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/home/square-lines.astro", void 0);

const $$Astro = createAstro("https://www.elyor.dev");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/elyorbekdjalalov/Documents/projects/personalWeb/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/node_modules/astro/components/ClientRouter.astro", void 0);

const translations = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.work": "Work",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    // Hero section
    "hero.greeting": "Hi, I'm Elyor",
    "hero.title": "Team Lead / Sr. Front-end developer",
    "hero.downloadResume": "Download Resume",
    // Section headers
    "section.experience": "Work experience",
    "section.projects": "Apps I build",
    "section.blog": "Latest from blog",
    "section.contact": "Contact",
    // Experience section
    "experience.title": "Experience",
    // Projects section
    "projects.title": "My Projects",
    "projects.description": "Here are <u>some</u> of my recent projects. I'm always working on something new, so check back often!",
    "projects.visit": "Visit",
    // Contact section
    "contact.title": "Let's Connect",
    "contact.description": "If you want to stay up to date with my work be sure to join my channel on",
    "contact.telegram": "Telegram",
    "contact.orEmail": ", or you can send me an",
    "contact.email": "email",
    "contact.willReply": "and I'll be sure to get back to you.",
    // Blog preview (homepage)
    "blogPreview.title": "Latest Posts",
    "blogPreview.comingSoon": "Blog posts coming soon!",
    "blogPreview.morePosts": "More Posts",
    // Blog index page
    "blog.title": "Blog",
    "blog.description": "Thoughts on web development, software architecture, and engineering best practices.",
    "blog.backToHome": "Back to Home",
    "blog.allPosts": "All Posts",
    "blog.noPosts": "No posts yet",
    "blog.checkBack": "Check back soon for new content!",
    "blog.subscribeRss": "Subscribe via RSS",
    // Blog post layout
    "blogPost.backToBlog": "Back to Blog",
    "blogPost.viewAllPosts": "View all posts →",
    "blogPost.updated": "Updated",
    "blogPost.authorBio": "Team Lead & Sr. Front-end Developer. Writing about web development, software architecture, and engineering best practices.",
    // 404 page
    "error.404": "404",
    "error.notFound": "Sorry, we couldn't find this page.",
    "error.goHome": "But dont worry, you can find plenty of other things on our homepage.",
    // Footer
    "footer.copyright": "Elyor Djalalov",
    // Meta
    "meta.title": "Elyor Djalalov",
    "meta.description": "Elyor Djalalov - Team Lead & Sr. Front-end Developer. Portfolio showcasing web development projects and skills."
  },
  uz: {
    // Navigation
    "nav.about": "Men haqimda",
    "nav.work": "Ish",
    "nav.projects": "Loyihalar",
    "nav.blog": "Blog",
    "nav.contact": "Aloqa",
    // Hero section
    "hero.greeting": "Salom, men Elyor",
    "hero.title": "Jamoa rahbari / Katta Front-end dasturchi",
    "hero.downloadResume": "Rezyumeni yuklash",
    // Section headers
    "section.experience": "Ish tajribasi",
    "section.projects": "Yaratgan ilovalarim",
    "section.blog": "Blogdan so'nggi yangiliklar",
    "section.contact": "Aloqa",
    // Experience section
    "experience.title": "Tajriba",
    // Projects section
    "projects.title": "Loyihalarim",
    "projects.description": "Mana so'nggi loyihalarimdan <u>ba'zilari</u>. Doimo yangi narsalar ustida ishlayapman, shuning uchun tez-tez qaytib keling!",
    "projects.visit": "Ochish",
    // Contact section
    "contact.title": "Bog'lanaylik",
    "contact.description": "Agar ishlarim bilan tanishib borishni istasangiz, Telegram kanalimga qo'shiling",
    "contact.telegram": "Telegram",
    "contact.orEmail": ", yoki menga",
    "contact.email": "email",
    "contact.willReply": "yuboring va men albatta javob beraman.",
    // Blog preview (homepage)
    "blogPreview.title": "So'nggi maqolalar",
    "blogPreview.comingSoon": "Tez orada blog maqolalari!",
    "blogPreview.morePosts": "Ko'proq maqolalar",
    // Blog index page
    "blog.title": "Blog",
    "blog.description": "Veb-dasturlash, dasturiy ta'minot arxitekturasi va muhandislik bo'yicha fikrlar.",
    "blog.backToHome": "Bosh sahifaga",
    "blog.allPosts": "Barcha maqolalar",
    "blog.noPosts": "Hali maqolalar yo'q",
    "blog.checkBack": "Tez orada yangi kontent uchun qaytib keling!",
    "blog.subscribeRss": "RSS orqali obuna bo'ling",
    // Blog post layout
    "blogPost.backToBlog": "Blogga qaytish",
    "blogPost.viewAllPosts": "Barcha maqolalar →",
    "blogPost.updated": "Yangilangan",
    "blogPost.authorBio": "Jamoa rahbari va Katta Front-end dasturchi. Veb-dasturlash, dasturiy ta'minot arxitekturasi va muhandislik haqida yozaman.",
    // 404 page
    "error.404": "404",
    "error.notFound": "Kechirasiz, bu sahifa topilmadi.",
    "error.goHome": "Lekin xavotir olmang, bosh sahifada boshqa ko'p narsalarni topishingiz mumkin.",
    // Footer
    "footer.copyright": "Elyor Djalalov",
    // Meta
    "meta.title": "Elyor Djalalov",
    "meta.description": "Elyor Djalalov - Jamoa rahbari va Katta Front-end dasturchi. Veb-dasturlash loyihalari va ko'nikmalari."
  },
  ru: {
    // Navigation
    "nav.about": "Обо мне",
    "nav.work": "Работа",
    "nav.projects": "Проекты",
    "nav.blog": "Блог",
    "nav.contact": "Контакт",
    // Hero section
    "hero.greeting": "Привет, я Элёр",
    "hero.title": "Тимлид / Старший Front-end разработчик",
    "hero.downloadResume": "Скачать резюме",
    // Section headers
    "section.experience": "Опыт работы",
    "section.projects": "Мои приложения",
    "section.blog": "Последнее из блога",
    "section.contact": "Контакт",
    // Experience section
    "experience.title": "Опыт",
    // Projects section
    "projects.title": "Мои проекты",
    "projects.description": "Вот <u>некоторые</u> из моих последних проектов. Я всегда работаю над чем-то новым, так что заходите почаще!",
    "projects.visit": "Открыть",
    // Contact section
    "contact.title": "Давайте свяжемся",
    "contact.description": "Если вы хотите быть в курсе моей работы, подписывайтесь на мой канал в",
    "contact.telegram": "Telegram",
    "contact.orEmail": ", или отправьте мне",
    "contact.email": "email",
    "contact.willReply": "и я обязательно отвечу.",
    // Blog preview (homepage)
    "blogPreview.title": "Последние статьи",
    "blogPreview.comingSoon": "Скоро появятся статьи!",
    "blogPreview.morePosts": "Больше статей",
    // Blog index page
    "blog.title": "Блог",
    "blog.description": "Мысли о веб-разработке, архитектуре ПО и лучших практиках инженерии.",
    "blog.backToHome": "На главную",
    "blog.allPosts": "Все статьи",
    "blog.noPosts": "Пока нет статей",
    "blog.checkBack": "Скоро появится новый контент!",
    "blog.subscribeRss": "Подписаться на RSS",
    // Blog post layout
    "blogPost.backToBlog": "Назад в блог",
    "blogPost.viewAllPosts": "Все статьи →",
    "blogPost.updated": "Обновлено",
    "blogPost.authorBio": "Тимлид и Старший Front-end разработчик. Пишу о веб-разработке, архитектуре ПО и лучших практиках инженерии.",
    // 404 page
    "error.404": "404",
    "error.notFound": "Извините, страница не найдена.",
    "error.goHome": "Но не волнуйтесь, на главной странице вы найдёте много другого интересного.",
    // Footer
    "footer.copyright": "Элёр Джалалов",
    // Meta
    "meta.title": "Элёр Джалалов",
    "meta.description": "Элёр Джалалов - Тимлид и Старший Front-end разработчик. Портфолио с проектами и навыками веб-разработки."
  }
};
function t(key, lang = "en") {
  return translations[lang]?.[key] || translations.en[key] || key;
}
function getLangFromUrl(url) {
  const langParam = url.searchParams.get("lang");
  if (langParam && ["en", "uz", "ru"].includes(langParam)) {
    return langParam;
  }
  return "en";
}

export { $$ClientRouter as $, $$SquareLines as a, getLangFromUrl as g, t };
