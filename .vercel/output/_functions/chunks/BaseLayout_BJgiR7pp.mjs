import { f as createAstro, c as createComponent, g as addAttribute, d as renderSlot, r as renderComponent, e as renderHead, b as renderScript, h as renderTransition, a as renderTemplate, F as Fragment } from './astro/server_BrJBC0vc.mjs';
import 'piccolore';
import { $ as $$Header, a as $$Index } from './index_C3Bumi94.mjs';
import { $ as $$ClientRouter, a as $$SquareLines } from './translations_rIz2cuYn.mjs';
/* empty css                          */
/* empty css                         */

const $$Astro = createAstro("https://www.elyor.dev");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description,
    image = "/og-image.png",
    canonicalUrl,
    type = "website",
    publishedTime,
    modifiedTime,
    author = "Elyor Djalalov",
    tags = []
  } = Astro2.props;
  const siteUrl = "https://www.elyor.dev";
  const currentUrl = canonicalUrl || new URL(Astro2.url.pathname, siteUrl).href;
  const ogImageUrl = image.startsWith("http") ? image : new URL(image, siteUrl).href;
  return renderTemplate`<html lang="en"${addAttribute(renderTransition($$result, "mo47iqwu", "initial", ""), "data-astro-transition-scope")}> <head><title>${title}</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><meta name="author"${addAttribute(author, "content")}>${tags.length > 0 && renderTemplate`<meta name="keywords"${addAttribute(tags.join(", "), "content")}>`}<link rel="canonical"${addAttribute(currentUrl, "href")}><!-- Open Graph / Facebook --><meta property="og:type"${addAttribute(type, "content")}><meta property="og:url"${addAttribute(currentUrl, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(ogImageUrl, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:site_name" content="Elyor Djalalov">${type === "article" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime.toISOString(), "content")}>`}${modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime.toISOString(), "content")}>`}<meta property="article:author"${addAttribute(author, "content")}>${tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`)}` })}`}<!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"${addAttribute(currentUrl, "content")}><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImageUrl, "content")}><meta name="twitter:creator" content="@elyor_dev"><!-- RSS Feed --><link rel="alternate" type="application/rss+xml" title="Elyor's Blog RSS Feed" href="/rss.xml"><link rel="icon" type="image/x-icon" href="/favicon.ico">${renderSlot($$result, $$slots["head"])}${renderComponent($$result, "ClientRouter", $$ClientRouter, { "fallback": "animate" })}${renderHead()}</head> <body class="antialiased bg-white dark:bg-slate-950 w-screen min-h-screen"> ${renderComponent($$result, "SquareLines", $$SquareLines, {})} ${renderComponent($$result, "Header", $$Header, {})} <div${addAttribute(renderTransition($$result, "qh66ozj4", "fade", ""), "data-astro-transition-scope")}> ${renderSlot($$result, $$slots["default"])} </div> ${renderScript($$result, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")} ${renderComponent($$result, "SpeedInsights", $$Index, {})} </body></html>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/layouts/BaseLayout.astro", "self");

export { $$BaseLayout as $ };
