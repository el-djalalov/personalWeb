import { f as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_BrJBC0vc.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DoMMNBCe.mjs';
import { $ as $$BlogCard } from '../chunks/BlogCard_Cq_P0bQY.mjs';
import { g as getCollection } from '../chunks/_astro_content_CaRowrjE.mjs';
import readingTime from 'reading-time';
import { g as getLangFromUrl, t } from '../chunks/translations_rIz2cuYn.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://www.elyor.dev");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const lang = getLangFromUrl(Astro2.url);
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const allTags = [...new Set(posts.flatMap((post) => post.data.tags))].sort();
  function getReadingTime(body) {
    const stats = readingTime(body);
    return stats.text;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${t("blog.title", lang)} | ${t("meta.title", lang)}`, "description": t("blog.description", lang) }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-6xl mx-auto px-4 py-8 pt-20"> <!-- Back button --> <a${addAttribute(lang === "en" ? "/" : `/?lang=${lang}`, "href")} class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-8"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> ${t("blog.backToHome", lang)} </a> <!-- Header --> <header class="mb-12 text-center"> <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"> ${t("blog.title", lang)} </h1> <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"> ${t("blog.description", lang)} </p> </header> <!-- Tags filter --> ${allTags.length > 0 && renderTemplate`<div class="mb-8"> <div class="flex flex-wrap justify-center gap-2"> <a${addAttribute(lang === "en" ? "/blog" : `/blog?lang=${lang}`, "href")} class="px-4 py-2 text-sm font-medium rounded-full bg-violet-600 text-white transition-colors"> ${t("blog.allPosts", lang)} </a> ${allTags.map((tag) => renderTemplate`<a${addAttribute(lang === "en" ? `/blog/tag/${tag.toLowerCase()}` : `/blog/tag/${tag.toLowerCase()}?lang=${lang}`, "href")} class="px-4 py-2 text-sm font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
#${tag} </a>`)} </div> </div>`} <!-- Posts grid --> ${posts.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "post": post, "readingTime": getReadingTime(post.body || "") })}`)} </div>` : renderTemplate`<div class="text-center py-20"> <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"> <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path> </svg> </div> <h2 class="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2"> ${t("blog.noPosts", lang)} </h2> <p class="text-slate-500 dark:text-slate-400"> ${t("blog.checkBack", lang)} </p> </div>`} <!-- RSS Feed link --> <div class="mt-12 text-center"> <a href="/rss.xml" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/40 transition-colors"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"> <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"></path> </svg> ${t("blog.subscribeRss", lang)} </a> </div> </main> ` })}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/pages/blog/index.astro", void 0);

const $$file = "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
