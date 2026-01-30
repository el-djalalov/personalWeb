import { f as createAstro, c as createComponent, m as maybeRenderHead, g as addAttribute, h as renderTransition, a as renderTemplate } from './astro/server_BrJBC0vc.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://www.elyor.dev");
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { post, readingTime } = Astro2.props;
  const { title, description, pubDate, heroImage, tags, translationKey } = post.data;
  const postId = post.id.replace(/\.(md|mdx)$/, "");
  const postSlug = translationKey || postId;
  const formattedDate = pubDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return renderTemplate`${maybeRenderHead()}<article class="group relative flex flex-col h-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 hover:border-violet-300 dark:hover:border-violet-700"> <!-- Image --> <a${addAttribute(`/blog/${postSlug}`, "href")} class="relative aspect-video overflow-hidden"> ${heroImage ? renderTemplate`<img${addAttribute(heroImage, "src")}${addAttribute(title, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"${addAttribute(renderTransition($$result, "wklsv6vl", "", `blog-hero-${post.id}`), "data-astro-transition-scope")}>` : renderTemplate`<div class="w-full h-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center"${addAttribute(renderTransition($$result, "pq3oo2bh", "", `blog-hero-${post.id}`), "data-astro-transition-scope")}> <svg class="w-12 h-12 text-violet-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path> </svg> </div>`} <!-- Gradient overlay --> <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> </a> <!-- Content --> <div class="flex flex-col flex-1 p-5"> <!-- Tags --> ${tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-3"> ${tags.slice(0, 3).map((tag) => renderTemplate`<span class="px-2 py-0.5 text-xs font-medium rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"> ${tag} </span>`)} ${tags.length > 3 && renderTemplate`<span class="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
+${tags.length - 3} </span>`} </div>`} <!-- Title --> <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"${addAttribute(renderTransition($$result, "hwdjknqw", "", `blog-title-${post.id}`), "data-astro-transition-scope")}> <a${addAttribute(`/blog/${postSlug}`, "href")} class="before:absolute before:inset-0"> ${title} </a> </h2> <!-- Description --> <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1"> ${description} </p> <!-- Meta --> <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800"> <time${addAttribute(pubDate.toISOString(), "datetime")} class="flex items-center gap-1"> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> ${formattedDate} </time> <span class="flex items-center gap-1"> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ${readingTime} </span> </div> </div> </article>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/blog/BlogCard.astro", "self");

export { $$BlogCard as $ };
