import { c as createComponent, m as maybeRenderHead, a as renderTemplate, f as createAstro, g as addAttribute, r as renderComponent, i as createTransitionScope, b as renderScript } from './astro/server_BrJBC0vc.mjs';
import colors from 'piccolore';
import 'clsx';
import 'js-yaml';
import 'smol-toml';
import path, { relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import '@astrojs/markdown-remark';
import { slug } from 'github-slugger';
import 'xxhash-wasm';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import { s as slash } from './path_tbLlI_c1.mjs';
import 'common-ancestor-path';
import { C as CONTENT_LAYER_TYPE, L as LIVE_CONTENT_TYPE, d as defineCollection } from './_astro_content_Vv25P74v.mjs';
import './index_MaT6fT73.mjs';
import { existsSync, promises } from 'node:fs';
import pLimit from 'p-limit';
import picomatch from 'picomatch';
import { glob as glob$1 } from 'tinyglobby';
import { g as getLangFromUrl, t } from './translations_rIz2cuYn.mjs';
/* empty css                          */
/* empty css                         */

const $$Logo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="/" class="h-5 text-base group relative z-30 flex items-center space-x-1.5 text-black dark:text-white font-semibold pointer-events-auto"> <span class="text-xl -translate-y-0.5 group-hover:-rotate-12 group-hover:scale-[1.2] ease-in-out duration-300 text-muted-foreground">✦</span> <!-- Logo Text --> <span class="-translate-y-0.5 dark:text-slate-400 text-slate-700"> ED </span> </a>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/logo.astro", void 0);

const isWindows = typeof process !== "undefined" && process.platform === "win32";
function normalizePath(id) {
  return path.posix.normalize(isWindows ? slash(id) : id);
}

function generateIdDefault({ entry, base, data }) {
  if (data.slug) {
    return data.slug;
  }
  const entryURL = new URL(encodeURI(entry), base);
  const { slug } = getContentEntryIdAndSlug({
    entry: entryURL,
    contentDir: base,
    collection: ""
  });
  return slug;
}
function checkPrefix(pattern, prefix) {
  if (Array.isArray(pattern)) {
    return pattern.some((p) => p.startsWith(prefix));
  }
  return pattern.startsWith(prefix);
}
function glob(globOptions) {
  if (checkPrefix(globOptions.pattern, "../")) {
    throw new Error(
      "Glob patterns cannot start with `../`. Set the `base` option to a parent directory instead."
    );
  }
  if (checkPrefix(globOptions.pattern, "/")) {
    throw new Error(
      "Glob patterns cannot start with `/`. Set the `base` option to a parent directory or use a relative path instead."
    );
  }
  const generateId = globOptions?.generateId ?? generateIdDefault;
  const fileToIdMap = /* @__PURE__ */ new Map();
  return {
    name: "glob-loader",
    load: async ({ config, logger, watcher, parseData, store, generateDigest, entryTypes }) => {
      const renderFunctionByContentType = /* @__PURE__ */ new WeakMap();
      const untouchedEntries = new Set(store.keys());
      const isLegacy = globOptions._legacy;
      const emulateLegacyCollections = !config.legacy.collections;
      async function syncData(entry, base, entryType, oldId) {
        if (!entryType) {
          logger.warn(`No entry type found for ${entry}`);
          return;
        }
        const fileUrl = new URL(encodeURI(entry), base);
        const contents = await promises.readFile(fileUrl, "utf-8").catch((err) => {
          logger.error(`Error reading ${entry}: ${err.message}`);
          return;
        });
        if (!contents && contents !== "") {
          logger.warn(`No contents found for ${entry}`);
          return;
        }
        const { body, data } = await entryType.getEntryInfo({
          contents,
          fileUrl
        });
        const id = generateId({ entry, base, data });
        if (oldId && oldId !== id) {
          store.delete(oldId);
        }
        let legacyId;
        if (isLegacy) {
          const entryURL = new URL(encodeURI(entry), base);
          const legacyOptions = getContentEntryIdAndSlug({
            entry: entryURL,
            contentDir: base,
            collection: ""
          });
          legacyId = legacyOptions.id;
        }
        untouchedEntries.delete(id);
        const existingEntry = store.get(id);
        const digest = generateDigest(contents);
        const filePath2 = fileURLToPath(fileUrl);
        if (existingEntry && existingEntry.digest === digest && existingEntry.filePath) {
          if (existingEntry.deferredRender) {
            store.addModuleImport(existingEntry.filePath);
          }
          if (existingEntry.assetImports?.length) {
            store.addAssetImports(existingEntry.assetImports, existingEntry.filePath);
          }
          fileToIdMap.set(filePath2, id);
          return;
        }
        const relativePath2 = posixRelative(fileURLToPath(config.root), filePath2);
        const parsedData = await parseData({
          id,
          data,
          filePath: filePath2
        });
        if (entryType.getRenderFunction) {
          if (isLegacy && data.layout) {
            logger.error(
              `The Markdown "layout" field is not supported in content collections in Astro 5. Ignoring layout for ${JSON.stringify(entry)}. Enable "legacy.collections" if you need to use the layout field.`
            );
          }
          let render = renderFunctionByContentType.get(entryType);
          if (store.has(id)) {
            logger.warn(
              `Duplicate id "${id}" found in ${filePath2}. Later items with the same id will overwrite earlier ones.`
            );
          }
          if (!render) {
            render = await entryType.getRenderFunction(config);
            renderFunctionByContentType.set(entryType, render);
          }
          let rendered = void 0;
          try {
            rendered = await render?.({
              id,
              data,
              body,
              filePath: filePath2,
              digest
            });
          } catch (error) {
            logger.error(`Error rendering ${entry}: ${error.message}`);
          }
          store.set({
            id,
            data: parsedData,
            body,
            filePath: relativePath2,
            digest,
            rendered,
            assetImports: rendered?.metadata?.imagePaths,
            legacyId
          });
        } else if ("contentModuleTypes" in entryType) {
          store.set({
            id,
            data: parsedData,
            body,
            filePath: relativePath2,
            digest,
            deferredRender: true,
            legacyId
          });
        } else {
          store.set({ id, data: parsedData, body, filePath: relativePath2, digest, legacyId });
        }
        fileToIdMap.set(filePath2, id);
      }
      const baseDir = new URL(globOptions.base, config.root) ;
      if (!baseDir.pathname.endsWith("/")) {
        baseDir.pathname = `${baseDir.pathname}/`;
      }
      const filePath = fileURLToPath(baseDir);
      const relativePath = relative(fileURLToPath(config.root), filePath);
      const exists = existsSync(baseDir);
      if (!exists) {
        logger.warn(`The base directory "${fileURLToPath(baseDir)}" does not exist.`);
      }
      const files = await glob$1(globOptions.pattern, {
        cwd: fileURLToPath(baseDir),
        expandDirectories: false
      });
      if (exists && files.length === 0) {
        logger.warn(
          `No files found matching "${globOptions.pattern}" in directory "${relativePath}"`
        );
        return;
      }
      function configForFile(file) {
        const ext = file.split(".").at(-1);
        if (!ext) {
          logger.warn(`No extension found for ${file}`);
          return;
        }
        return entryTypes.get(`.${ext}`);
      }
      const limit = pLimit(10);
      const skippedFiles = [];
      const contentDir = new URL("content/", config.srcDir);
      function isInContentDir(file) {
        const fileUrl = new URL(file, baseDir);
        return fileUrl.href.startsWith(contentDir.href);
      }
      const configFiles = new Set(
        ["config.js", "config.ts", "config.mjs"].map((file) => new URL(file, contentDir).href)
      );
      function isConfigFile(file) {
        const fileUrl = new URL(file, baseDir);
        return configFiles.has(fileUrl.href);
      }
      await Promise.all(
        files.map((entry) => {
          if (isConfigFile(entry)) {
            return;
          }
          if (!emulateLegacyCollections && isInContentDir(entry)) {
            skippedFiles.push(entry);
            return;
          }
          return limit(async () => {
            const entryType = configForFile(entry);
            await syncData(entry, baseDir, entryType);
          });
        })
      );
      const skipCount = skippedFiles.length;
      if (skipCount > 0) {
        const patternList = Array.isArray(globOptions.pattern) ? globOptions.pattern.join(", ") : globOptions.pattern;
        logger.warn(
          `The glob() loader cannot be used for files in ${colors.bold("src/content")} when legacy mode is enabled.`
        );
        if (skipCount > 10) {
          logger.warn(
            `Skipped ${colors.green(skippedFiles.length)} files that matched ${colors.green(patternList)}.`
          );
        } else {
          logger.warn(`Skipped the following files that matched ${colors.green(patternList)}:`);
          skippedFiles.forEach((file) => logger.warn(`\u2022 ${colors.green(file)}`));
        }
      }
      untouchedEntries.forEach((id) => store.delete(id));
      if (!watcher) {
        return;
      }
      watcher.add(filePath);
      const matchesGlob = (entry) => !entry.startsWith("../") && picomatch.isMatch(entry, globOptions.pattern);
      const basePath = fileURLToPath(baseDir);
      async function onChange(changedPath) {
        const entry = posixRelative(basePath, changedPath);
        if (!matchesGlob(entry)) {
          return;
        }
        const entryType = configForFile(changedPath);
        const baseUrl = pathToFileURL(basePath);
        const oldId = fileToIdMap.get(changedPath);
        await syncData(entry, baseUrl, entryType, oldId);
        logger.info(`Reloaded data from ${colors.green(entry)}`);
      }
      watcher.on("change", onChange);
      watcher.on("add", onChange);
      watcher.on("unlink", async (deletedPath) => {
        const entry = posixRelative(basePath, deletedPath);
        if (!matchesGlob(entry)) {
          return;
        }
        const id = fileToIdMap.get(deletedPath);
        if (id) {
          store.delete(id);
          fileToIdMap.delete(deletedPath);
        }
      });
    }
  };
}

const entryTypeSchema = z$1.object({
  id: z$1.string({
    invalid_type_error: "Content entry `id` must be a string"
    // Default to empty string so we can validate properly in the loader
  })
}).passthrough();
z$1.union([
  z$1.array(entryTypeSchema),
  z$1.record(
    z$1.string(),
    z$1.object({
      id: z$1.string({
        invalid_type_error: "Content entry `id` must be a string"
      }).optional()
    }).passthrough()
  )
]);
const collectionConfigParser = z$1.union([
  z$1.object({
    type: z$1.literal("content").optional().default("content"),
    schema: z$1.any().optional()
  }),
  z$1.object({
    type: z$1.literal("data"),
    schema: z$1.any().optional()
  }),
  z$1.object({
    type: z$1.literal(CONTENT_LAYER_TYPE),
    schema: z$1.any().optional(),
    loader: z$1.union([
      z$1.function(),
      z$1.object({
        name: z$1.string(),
        load: z$1.function(
          z$1.tuple(
            [
              z$1.object({
                collection: z$1.string(),
                store: z$1.any(),
                meta: z$1.any(),
                logger: z$1.any(),
                config: z$1.any(),
                entryTypes: z$1.any(),
                parseData: z$1.any(),
                renderMarkdown: z$1.any(),
                generateDigest: z$1.function(z$1.tuple([z$1.any()], z$1.string())),
                watcher: z$1.any().optional(),
                refreshContextData: z$1.record(z$1.unknown()).optional()
              })
            ],
            z$1.unknown()
          )
        ),
        schema: z$1.any().optional(),
        render: z$1.function(z$1.tuple([z$1.any()], z$1.unknown())).optional()
      })
    ]),
    /** deprecated */
    _legacy: z$1.boolean().optional()
  }),
  z$1.object({
    type: z$1.literal(LIVE_CONTENT_TYPE).optional().default(LIVE_CONTENT_TYPE),
    schema: z$1.any().optional(),
    loader: z$1.function()
  })
]);
z$1.object({
  collections: z$1.record(collectionConfigParser)
});
function getContentEntryIdAndSlug({
  entry,
  contentDir,
  collection
}) {
  const relativePath = getRelativeEntryPath(entry, collection, contentDir);
  const withoutFileExt = relativePath.replace(new RegExp(path.extname(relativePath) + "$"), "");
  const rawSlugSegments = withoutFileExt.split(path.sep);
  const slug$1 = rawSlugSegments.map((segment) => slug(segment)).join("/").replace(/\/index$/, "");
  const res = {
    id: normalizePath(relativePath),
    slug: slug$1
  };
  return res;
}
function getRelativeEntryPath(entry, collection, contentDir) {
  const relativeToContent = path.relative(fileURLToPath(contentDir), fileURLToPath(entry));
  const relativeToCollection = path.relative(collection, relativeToContent);
  return relativeToCollection;
}
function posixifyPath(filePath) {
  return filePath.split(path.sep).join("/");
}
function posixRelative(from, to) {
  return posixifyPath(path.relative(from, to));
}

const SUPPORTED_LANGUAGES = ["en", "uz", "ru"];
const DEFAULT_LANGUAGE = "en";
const LANGUAGE_NAMES = {
  en: "English",
  uz: "O'zbekcha",
  ru: "Русский"
};
defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Elyor Djalalov"),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Social sharing
    ogImage: z.string().optional(),
    canonicalUrl: z.string().optional(),
    // Multi-language support
    // Language of this post (en, uz, ru)
    lang: z.enum(SUPPORTED_LANGUAGES).default("en"),
    // Slug to group translations together (e.g., "engineering-behind-simple")
    translationKey: z.string().optional()
  })
});

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro("https://www.elyor.dev");
const $$LanguageSwitcher = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LanguageSwitcher;
  const currentLang = getLangFromUrl(Astro2.url);
  const currentPath = Astro2.url.pathname;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div class="relative" id="lang-switcher-container"> <button id="lang-switcher-btn" class="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" aria-label="Select language" aria-expanded="false"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path> </svg> <span class="hidden sm:inline">', '</span> <span class="sm:hidden">', '</span> <svg class="w-3 h-3 transition-transform" id="lang-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </button> <div id="lang-dropdown" class="absolute right-0 top-full mt-1 py-1 min-w-[120px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg opacity-0 invisible transition-all duration-200 z-50"> ', ' </div> </div> <script>\n  function initLangSwitcher() {\n    const btn = document.getElementById("lang-switcher-btn");\n    const dropdown = document.getElementById("lang-dropdown");\n    const chevron = document.getElementById("lang-chevron");\n\n    if (!btn || !dropdown || !chevron) return;\n\n    let isOpen = false;\n\n    function toggle() {\n      isOpen = !isOpen;\n      btn.setAttribute("aria-expanded", isOpen.toString());\n\n      if (isOpen) {\n        dropdown.classList.remove("opacity-0", "invisible");\n        dropdown.classList.add("opacity-100", "visible");\n        chevron.classList.add("rotate-180");\n      } else {\n        dropdown.classList.add("opacity-0", "invisible");\n        dropdown.classList.remove("opacity-100", "visible");\n        chevron.classList.remove("rotate-180");\n      }\n    }\n\n    function close() {\n      if (isOpen) {\n        isOpen = false;\n        btn.setAttribute("aria-expanded", "false");\n        dropdown.classList.add("opacity-0", "invisible");\n        dropdown.classList.remove("opacity-100", "visible");\n        chevron.classList.remove("rotate-180");\n      }\n    }\n\n    btn.addEventListener("click", (e) => {\n      e.stopPropagation();\n      toggle();\n    });\n\n    document.addEventListener("click", (e) => {\n      if (!btn.contains(e.target) && !dropdown.contains(e.target)) {\n        close();\n      }\n    });\n\n    document.addEventListener("keydown", (e) => {\n      if (e.key === "Escape") {\n        close();\n      }\n    });\n  }\n\n  // Initialize on page load\n  initLangSwitcher();\n\n  // Re-initialize after Astro page transitions\n  document.addEventListener("astro:after-swap", initLangSwitcher);\n<\/script>'])), maybeRenderHead(), LANGUAGE_NAMES[currentLang], currentLang.toUpperCase(), SUPPORTED_LANGUAGES.map((lang) => {
    const isActive = lang === currentLang;
    const langUrl = lang === "en" ? currentPath : `${currentPath}${currentPath.includes("?") ? "&" : "?"}lang=${lang}`;
    return renderTemplate`<a${addAttribute(langUrl, "href")}${addAttribute([
      "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
      isActive ? "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
    ], "class:list")}${addAttribute(lang, "data-lang")}> <span class="w-5 text-center">${isActive ? "\u2713" : ""}</span> ${LANGUAGE_NAMES[lang]} </a>`;
  }));
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/LanguageSwitcher.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://www.elyor.dev");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const lang = getLangFromUrl(Astro2.url);
  const menus = [
    { name: t("nav.about", lang), url: "/", id: "home" },
    { name: t("nav.work", lang), url: "/#experience", id: "work" },
    { name: t("nav.projects", lang), url: "/#projects", id: "projects" },
    { name: t("nav.blog", lang), url: "/#blog", id: "blog" },
    { name: t("nav.contact", lang), url: "/#contact", id: "contact" }
  ];
  return renderTemplate(_a || (_a = __template(["<!-- This is an invisible div with relative position so that it takes up the height of the menu (because menu is absolute/fixed) -->", '<div class="relative h-16 md:h-20 opacity-0 pointer-events-none" aria-hidden="true" data-astro-cid-4qda7igl></div> <header id="header" class="fixed top-0 left-0 right-0 z-50 h-14 md:top-3 w-full transition-all duration-300 pointer-events-none" data-astro-cid-4qda7igl> <div class="flex items-center justify-between h-14 px-4 lg:max-w-7xl md:mx-auto border border-transparent select-none lg:rounded-xl gap-4 md:gap-2 pointer-events-auto" data-astro-cid-4qda7igl> ', ' <!-- Desktop Navigation --> <nav class="hidden md:flex relative z-30 text-sm justify-end text-slate-500" data-astro-cid-4qda7igl', '> <div class="ease-out duration-300 items-center justify-center relative flex w-auto" data-astro-cid-4qda7igl> ', ' </div> </nav> <div class="flex items-center gap-3 md:gap-2" data-astro-cid-4qda7igl> ', ' <button id="themeToggle" aria-label="Toggle theme" class="flex items-center justify-center w-9 h-9 md:w-auto md:h-auto md:pl-4 rounded-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none md:border-0 cursor-pointer text-slate-700 dark:text-slate-400" data-astro-cid-4qda7igl> <div class="relative flex items-center justify-center w-5 h-5 md:w-6 md:h-6 overflow-hidden" data-astro-cid-4qda7igl> <svg class="absolute w-6 h-6 transition duration-500 transform ease" id="sun" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-4qda7igl><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" data-astro-cid-4qda7igl></path></svg> <svg class="absolute hidden w-6 h-6 transition duration-500 transform ease" id="moon" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-4qda7igl><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" data-astro-cid-4qda7igl></path></svg> </div> </button> </div> </div> </header> <!-- Mobile Bottom Navigation Bar --> <nav id="bottomNav" class="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-t border-slate-200/50 dark:border-slate-800/50 safe-area-bottom" data-astro-cid-4qda7igl> <div class="flex items-center justify-around h-16 px-2" data-astro-cid-4qda7igl> <!-- Home --> <a href="/" data-nav="home" class="bottom-nav-link flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20" data-astro-cid-4qda7igl> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" data-astro-cid-4qda7igl> <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-astro-cid-4qda7igl></path> </svg> <span class="text-[10px] font-medium" data-astro-cid-4qda7igl>', '</span> </a> <!-- Work/Experience --> <a href="/#experience" data-nav="work" class="bottom-nav-link flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20" data-astro-cid-4qda7igl> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" data-astro-cid-4qda7igl> <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-astro-cid-4qda7igl></path> </svg> <span class="text-[10px] font-medium" data-astro-cid-4qda7igl>', '</span> </a> <!-- Projects --> <a href="/#projects" data-nav="projects" class="bottom-nav-link flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20" data-astro-cid-4qda7igl> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" data-astro-cid-4qda7igl> <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" data-astro-cid-4qda7igl></path> </svg> <span class="text-[10px] font-medium" data-astro-cid-4qda7igl>', '</span> </a> <!-- Blog --> <a href="/#blog" data-nav="blog" class="bottom-nav-link flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20" data-astro-cid-4qda7igl> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" data-astro-cid-4qda7igl> <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" data-astro-cid-4qda7igl></path> </svg> <span class="text-[10px] font-medium" data-astro-cid-4qda7igl>', '</span> </a> <!-- Contact --> <a href="/#contact" data-nav="contact" class="bottom-nav-link flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20" data-astro-cid-4qda7igl> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" data-astro-cid-4qda7igl> <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-astro-cid-4qda7igl></path> </svg> <span class="text-[10px] font-medium" data-astro-cid-4qda7igl>', `</span> </a> </div> </nav> <!-- Spacer for bottom nav on mobile --> <div class="md:hidden h-16" aria-hidden="true" data-astro-cid-4qda7igl></div> <!-- This script for blocking flash on refresh page in dark mode --> <script>
  function applyTheme() {
    localStorage.theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }

  document.addEventListener("astro:after-swap", applyTheme);
  applyTheme();

  // Scroll handling for header is done in main.js

  // Bottom nav active state based on scroll position
  function initBottomNav() {
    const sections = ['home', 'experience', 'projects', 'blog', 'contact'];
    const navLinks = document.querySelectorAll('.bottom-nav-link');

    function updateActiveLink() {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check if at top of page
      if (window.scrollY < 100) {
        setActiveLink('home');
        return;
      }

      // Find current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveLink(sections[i]);
          return;
        }
      }
    }

    function setActiveLink(activeId) {
      navLinks.forEach(link => {
        const navId = link.getAttribute('data-nav');
        if (navId === activeId || (activeId === 'experience' && navId === 'work')) {
          link.classList.add('text-violet-600', 'dark:text-violet-400', 'bg-violet-50', 'dark:bg-violet-900/20');
          link.classList.remove('text-slate-500', 'dark:text-slate-400');
        } else {
          link.classList.remove('text-violet-600', 'dark:text-violet-400', 'bg-violet-50', 'dark:bg-violet-900/20');
          link.classList.add('text-slate-500', 'dark:text-slate-400');
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink(); // Initial check
  }

  initBottomNav();
  document.addEventListener("astro:after-swap", initBottomNav);
<\/script> `])), maybeRenderHead(), renderComponent($$result, "Logo", $$Logo, { "data-astro-cid-4qda7igl": true }), addAttribute(createTransitionScope($$result, "qumitgsz"), "data-astro-transition-persist"), menus.map((menu) => {
    return renderTemplate`<a${addAttribute(menu.url, "data-target")}${addAttribute(menu.url, "href")} class="text-xs sm:text-sm relative flex items-center justify-center px-1 sm:px-3 font-medium tracking-wide text-center w-auto hover:text-violet-900 dark:hover:text-white text-slate-700 dark:text-slate-400" data-astro-cid-4qda7igl> ${menu.name} </a>`;
  }), renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, { "data-astro-cid-4qda7igl": true }), t("nav.about", lang), t("nav.work", lang), t("nav.projects", lang), t("nav.blog", lang), t("nav.contact", lang));
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/home/header.astro", "self");

const $$Astro = createAstro("https://www.elyor.dev");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "/home/elyorbekdjalalov/Documents/projects/personalWeb/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);

export { $$Header as $, DEFAULT_LANGUAGE as D, LANGUAGE_NAMES as L, SUPPORTED_LANGUAGES as S, $$Index as a };
