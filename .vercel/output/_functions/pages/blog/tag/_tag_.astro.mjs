import { f as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../../chunks/astro/server_BrJBC0vc.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_kndP0h5-.mjs';
import { $ as $$BlogCard } from '../../../chunks/BlogCard_Cq_P0bQY.mjs';
import { g as getCollection } from '../../../chunks/_astro_content_C0Q9j6eF.mjs';
import readingTime from 'reading-time';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://www.elyor.dev");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  const allTags = [...new Set(posts.flatMap((post) => post.data.tags))].filter((tag) => tag && tag.trim() !== "");
  return allTags.map((tag) => ({
    params: { tag: tag.toLowerCase() },
    props: {
      tag,
      posts: posts.filter((post) => !post.data.draft && post.data.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    }
  }));
}
const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tag;
  const { tag, posts } = Astro2.props;
  if (!tag || !posts) {
    return Astro2.redirect("/blog");
  }
  const allPosts = await getCollection("blog");
  const allTags = [...new Set(allPosts.flatMap((post) => post.data.tags))].filter((tag2) => tag2 && tag2.trim() !== "").sort();
  function getReadingTime(body) {
    const stats = readingTime(body);
    return stats.text;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${tag} - Blog | Elyor Djalalov`, "description": `Articles tagged with ${tag} by Elyor Djalalov.` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-6xl mx-auto px-4 py-8 pt-20"> <!-- Header --> <header class="mb-12 text-center"> <a href="/blog" class="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-4 group"> <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
All Posts
</a> <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"> <span class="text-violet-600 dark:text-violet-400">#${tag}</span> </h1> <p class="text-lg text-slate-600 dark:text-slate-400"> ${posts.length} ${posts.length === 1 ? "post" : "posts"} tagged with <span class="font-medium">${tag}</span> </p> </header> <!-- Tags filter --> <div class="mb-8"> <div class="flex flex-wrap justify-center gap-2"> <a href="/blog" class="px-4 py-2 text-sm font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
All Posts
</a> ${allTags.map((t) => renderTemplate`<a${addAttribute(`/blog/tag/${t.toLowerCase()}`, "href")}${addAttribute([
    "px-4 py-2 text-sm font-medium rounded-full transition-colors",
    t.toLowerCase() === tag.toLowerCase() ? "bg-violet-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300"
  ], "class:list")}>
#${t} </a>`)} </div> </div> <!-- Posts grid --> ${posts.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "post": post, "readingTime": getReadingTime(post.body || "") })}`)} </div>` : renderTemplate`<div class="text-center py-20"> <p class="text-slate-500 dark:text-slate-400">
No posts found with this tag.
</p> </div>`} </main> ` })}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/pages/blog/tag/[tag].astro", void 0);

const $$file = "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/pages/blog/tag/[tag].astro";
const $$url = "/blog/tag/[tag]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tag,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
