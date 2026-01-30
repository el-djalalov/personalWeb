import { f as createAstro, c as createComponent, m as maybeRenderHead, g as addAttribute, b as renderScript, a as renderTemplate, r as renderComponent, d as renderSlot, h as renderTransition } from '../../chunks/astro/server_BrJBC0vc.mjs';
import 'piccolore';
import { g as getCollection, r as renderEntry } from '../../chunks/_astro_content_C0Q9j6eF.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_kndP0h5-.mjs';
import 'clsx';
import { jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { S as SUPPORTED_LANGUAGES, L as LANGUAGE_NAMES, D as DEFAULT_LANGUAGE } from '../../chunks/index_DcCMCcZ4.mjs';
import { t } from '../../chunks/translations_rIz2cuYn.mjs';
/* empty css                                    */
import readingTime from 'reading-time';
export { renderers } from '../../renderers.mjs';

const $$Astro$4 = createAstro("https://www.elyor.dev");
const $$SocialShare = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$SocialShare;
  const { title, url, description, tags = [] } = Astro2.props;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashTags = tags.map((tag) => tag.replace(/\s+/g, "")).join(",");
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${hashTags ? `&hashtags=${hashTags}` : ""}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };
  return renderTemplate`${maybeRenderHead()}<div class="social-share"> <h4 class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
Share this article
</h4> <div class="flex flex-wrap gap-3"> <!-- Twitter/X --> <a${addAttribute(shareLinks.twitter, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-900 dark:hover:bg-slate-700 hover:text-white transition-all duration-200 text-sm font-medium group" aria-label="Share on Twitter"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"> <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path> </svg> <span class="hidden sm:inline">Twitter</span> </a> <!-- LinkedIn --> <a${addAttribute(shareLinks.linkedin, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#0077B5] hover:text-white transition-all duration-200 text-sm font-medium" aria-label="Share on LinkedIn"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path> </svg> <span class="hidden sm:inline">LinkedIn</span> </a> <!-- Facebook --> <a${addAttribute(shareLinks.facebook, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#1877F2] hover:text-white transition-all duration-200 text-sm font-medium" aria-label="Share on Facebook"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"> <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path> </svg> <span class="hidden sm:inline">Facebook</span> </a> <!-- Telegram --> <a${addAttribute(shareLinks.telegram, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#0088cc] hover:text-white transition-all duration-200 text-sm font-medium" aria-label="Share on Telegram"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"> <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path> </svg> <span class="hidden sm:inline">Telegram</span> </a> <!-- Copy Link --> <button id="copy-link-btn" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-violet-600 hover:text-white transition-all duration-200 text-sm font-medium" aria-label="Copy link"${addAttribute(url, "data-url")}> <svg class="w-4 h-4 copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path> </svg> <svg class="w-4 h-4 check-icon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="btn-text">Copy</span> </button> <!-- Email --> <a${addAttribute(shareLinks.email, "href")} class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-200 text-sm font-medium" aria-label="Share via Email"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> <span class="hidden sm:inline">Email</span> </a> </div> </div> ${renderScript($$result, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/blog/SocialShare.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/blog/SocialShare.astro", void 0);

const $$Astro$3 = createAstro("https://www.elyor.dev");
const $$TableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$TableOfContents;
  const { headings } = Astro2.props;
  const filteredHeadings = headings.filter((h) => h.depth >= 2 && h.depth <= 3);
  return renderTemplate`${filteredHeadings.length > 0 && renderTemplate`${maybeRenderHead()}<nav class="toc" aria-label="Table of contents"><h4 class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-4">
On this page
</h4><ul class="space-y-2 text-sm">${filteredHeadings.map((heading) => renderTemplate`<li${addAttribute([
    "toc-item",
    heading.depth === 3 && "ml-4"
  ], "class:list")}><a${addAttribute(`#${heading.slug}`, "href")} class="toc-link block py-1 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors border-l-2 border-transparent hover:border-violet-500 pl-3 -ml-px"${addAttribute(heading.slug, "data-heading")}>${heading.text}</a></li>`)}</ul></nav>`}${renderScript($$result, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/blog/TableOfContents.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/blog/TableOfContents.astro", void 0);

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector("article");
      if (!article) return;
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const scrollableDistance = articleHeight - windowHeight + articleTop;
      const scrolledDistance = scrollY - articleTop;
      if (scrolledDistance <= 0) {
        setProgress(0);
      } else if (scrolledDistance >= scrollableDistance) {
        setProgress(100);
      } else {
        setProgress(scrolledDistance / scrollableDistance * 100);
      }
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 right-0 z-[60] h-1 bg-slate-200 dark:bg-slate-800", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-150 ease-out",
      style: { width: `${progress}%` },
      role: "progressbar",
      "aria-valuenow": Math.round(progress),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": "Reading progress"
    }
  ) });
}

const $$Astro$2 = createAstro("https://www.elyor.dev");
const $$LanguageSwitcher = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LanguageSwitcher;
  const { currentLang, availableLanguages, baseSlug } = Astro2.props;
  return renderTemplate`${availableLanguages.length > 1 && renderTemplate`${maybeRenderHead()}<div class="flex items-center gap-2"><svg class="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg><div class="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">${SUPPORTED_LANGUAGES.map((lang) => {
    const isAvailable = availableLanguages.includes(lang);
    const isCurrent = lang === currentLang;
    if (!isAvailable) return null;
    return renderTemplate`<a${addAttribute(`/blog/${baseSlug}?lang=${lang}`, "href")}${addAttribute([
      "px-3 py-1.5 text-sm font-medium transition-colors",
      isCurrent ? "bg-violet-600 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
    ], "class:list")}${addAttribute(isCurrent ? "true" : void 0, "aria-current")}>${LANGUAGE_NAMES[lang]}</a>`;
  })}</div></div>`}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/blog/LanguageSwitcher.astro", void 0);

const $$Astro$1 = createAstro("https://www.elyor.dev");
const $$BlogPostLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPostLayout;
  const { post, readingTime, headings, availableLanguages = [], currentLang = DEFAULT_LANGUAGE, baseSlug = post.id } = Astro2.props;
  const { title, description, pubDate, updatedDate, author, heroImage, tags, ogImage } = post.data;
  const dateLocales = {
    en: "en-US",
    uz: "uz-UZ",
    ru: "ru-RU"
  };
  const formattedDate = pubDate.toLocaleDateString(dateLocales[currentLang] || "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const formattedUpdatedDate = updatedDate?.toLocaleDateString(dateLocales[currentLang] || "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const postUrl = `https://www.elyor.dev/blog/${post.id}`;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${title} | Elyor's Blog`, "description": description, "image": ogImage || heroImage || "/og-image.png", "type": "article", "publishedTime": pubDate, "modifiedTime": updatedDate, "author": author, "tags": tags }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ReadingProgress", ReadingProgress, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/blog/ReadingProgress", "client:component-export": "default" })} ${maybeRenderHead()}<main class="max-w-4xl mx-auto px-4 py-8 pt-20"> <!-- Back to blog --> <a${addAttribute(currentLang === "en" ? "/blog" : `/blog?lang=${currentLang}`, "href")} class="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-8 group"> <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> ${t("blogPost.backToBlog", currentLang)} </a> <article class="blog-post"> <!-- Header --> <header class="mb-8"> <!-- Tags and Language Switcher --> <div class="flex flex-wrap items-center justify-between gap-4 mb-4"> ${tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2"> ${tags.map((tag) => renderTemplate`<a${addAttribute(`/blog/tag/${tag.toLowerCase()}`, "href")} class="px-3 py-1 text-xs font-medium rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors">
#${tag} </a>`)} </div>`} ${availableLanguages.length > 1 && renderTemplate`${renderComponent($$result2, "LanguageSwitcher", $$LanguageSwitcher, { "currentLang": currentLang, "availableLanguages": availableLanguages, "baseSlug": baseSlug })}`} </div> <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4"${addAttribute(renderTransition($$result2, "khbjhaqh", "", `blog-title-${post.id}`), "data-astro-transition-scope")}> ${title} </h1> <p class="text-lg text-slate-600 dark:text-slate-400 mb-6"> ${description} </p> <!-- Meta info --> <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-500 pb-6 border-b border-slate-200 dark:border-slate-800"> <div class="flex items-center gap-2"> <img src="/images/avatar.jpg"${addAttribute(author, "alt")} class="w-8 h-8 rounded-full object-cover" onerror="this.style.display='none'"> <span class="font-medium text-slate-700 dark:text-slate-300">${author}</span> </div> <time${addAttribute(pubDate.toISOString(), "datetime")} class="flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> ${formattedDate} </time> ${updatedDate && renderTemplate`<span class="flex items-center gap-1 text-violet-600 dark:text-violet-400"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path> </svg> ${t("blogPost.updated", currentLang)} ${formattedUpdatedDate} </span>`} <span class="flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ${readingTime} </span> </div> </header> <!-- Hero Image --> ${heroImage && renderTemplate`<div class="relative aspect-video mb-8 rounded-xl overflow-hidden"> <img${addAttribute(heroImage, "src")}${addAttribute(title, "alt")} class="w-full h-full object-cover"${addAttribute(renderTransition($$result2, "vnv2bu77", "", `blog-hero-${post.id}`), "data-astro-transition-scope")}> </div>`} <!-- Content area with TOC --> <div class="lg:grid lg:grid-cols-[1fr_220px] lg:gap-16"> <!-- Main content --> <div class="prose prose-slate dark:prose-invert prose-lg max-w-none
          prose-headings:scroll-mt-20 prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
          prose-code:font-mono
          prose-pre:my-6
          prose-blockquote:border-violet-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1
          prose-img:rounded-xl prose-img:shadow-lg
          prose-li:marker:text-violet-500
        "> ${renderSlot($$result2, $$slots["default"])} </div> <!-- Table of Contents (desktop) --> ${headings.length > 0 && renderTemplate`<aside class="hidden lg:block"> <div class="sticky top-24"> ${renderComponent($$result2, "TableOfContents", $$TableOfContents, { "headings": headings })} </div> </aside>`} </div> <!-- Social Share --> <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800"> ${renderComponent($$result2, "SocialShare", $$SocialShare, { "title": title, "url": postUrl, "description": description, "tags": tags })} </div> <!-- Author bio --> <div class="mt-8 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"> <div class="flex items-start gap-4"> <img src="/images/avatar.jpg"${addAttribute(author, "alt")} class="w-16 h-16 rounded-full object-cover flex-shrink-0" onerror="this.style.display='none'"> <div> <h3 class="font-semibold text-slate-900 dark:text-white">${author}</h3> <p class="text-sm text-slate-600 dark:text-slate-400 mt-1"> ${t("blogPost.authorBio", currentLang)} </p> <a${addAttribute(currentLang === "en" ? "/blog" : `/blog?lang=${currentLang}`, "href")} class="inline-flex items-center gap-1 text-sm text-violet-600 dark:text-violet-400 hover:underline mt-2"> ${t("blogPost.viewAllPosts", currentLang)} </a> </div> </div> </div> </article> </main> ` })}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/layouts/BlogPostLayout.astro", "self");

const $$Astro = createAstro("https://www.elyor.dev");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  const nonDraftPosts = posts.filter((post) => !post.data.draft);
  const postsByTranslationKey = /* @__PURE__ */ new Map();
  for (const post of nonDraftPosts) {
    const postId = post.id.replace(/\.(md|mdx)$/, "");
    const key = post.data.translationKey || postId;
    if (!postsByTranslationKey.has(key)) {
      postsByTranslationKey.set(key, []);
    }
    postsByTranslationKey.get(key).push(post);
  }
  const paths = [];
  for (const [translationKey, translations] of postsByTranslationKey) {
    const defaultPost = translations.find((p) => p.data.lang === "en") || translations[0];
    paths.push({
      params: { slug: translationKey },
      props: { translations, defaultPost }
    });
  }
  return paths;
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  let { translations, defaultPost } = Astro2.props;
  if (!translations || !defaultPost) {
    const posts = await getCollection("blog");
    const nonDraftPosts = posts.filter((post2) => !post2.data.draft);
    const slug = Astro2.params.slug;
    const postsByTranslationKey = /* @__PURE__ */ new Map();
    for (const post2 of nonDraftPosts) {
      const postId = post2.id.replace(/\.(md|mdx)$/, "");
      const key = post2.data.translationKey || postId;
      if (!postsByTranslationKey.has(key)) {
        postsByTranslationKey.set(key, []);
      }
      postsByTranslationKey.get(key).push(post2);
    }
    translations = postsByTranslationKey.get(slug || "") || [];
    if (translations.length === 0) {
      return Astro2.redirect("/blog");
    }
    defaultPost = translations.find((p) => p.data.lang === "en") || translations[0];
  }
  const url = new URL(Astro2.request.url);
  const requestedLang = url.searchParams.get("lang");
  const currentLang = requestedLang && SUPPORTED_LANGUAGES.includes(requestedLang) ? requestedLang : DEFAULT_LANGUAGE;
  const post = translations.find((p) => p.data.lang === currentLang) || defaultPost;
  const { Content, headings } = await renderEntry(post);
  const stats = readingTime(post.body || "");
  const availableLanguages = translations.map((p) => p.data.lang);
  const baseSlug = post.data.translationKey || post.id.replace(/\.(md|mdx)$/, "");
  return renderTemplate`${renderComponent($$result, "BlogPostLayout", $$BlogPostLayout, { "post": post, "readingTime": stats.text, "headings": headings, "availableLanguages": availableLanguages, "currentLang": currentLang, "baseSlug": baseSlug }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/pages/blog/[...slug].astro", void 0);

const $$file = "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
