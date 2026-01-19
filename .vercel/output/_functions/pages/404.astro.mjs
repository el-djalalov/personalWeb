import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate, b as renderScript, d as renderSlot, e as renderHead, f as createAstro } from '../chunks/astro/server_BrJBC0vc.mjs';
import 'piccolore';
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { $ as $$ClientRouter, a as $$SquareLines, g as getLangFromUrl, t } from '../chunks/translations_rIz2cuYn.mjs';
export { renderers } from '../renderers.mjs';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        destructive: "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline: "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const $$ErrorPage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex w-full items-center justify-center"> <a href="/"> ${renderComponent($$result, "Button", Button, { "className": "" }, { "default": ($$result2) => renderTemplate` Go back ` })} </a> </div>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/components/ErrorPage.astro", void 0);

const $$ErrorLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><title>Elyor Djalalov</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Personal portfolio"><link rel="icon" type="image/x-icon" href="/favicon.ico">${renderScript($$result, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/layouts/ErrorLayout.astro?astro&type=script&index=0&lang.ts")}${renderSlot($$result, $$slots["head"])}${renderComponent($$result, "ClientRouter", $$ClientRouter, { "fallback": "animate" })}${renderHead()}</head> <body class="antialiased bg-white dark:bg-slate-950 w-screen h-full"> ${renderComponent($$result, "SquareLines", $$SquareLines, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "ErrorPage", $$ErrorPage, {})} </body></html>`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/layouts/ErrorLayout.astro", void 0);

const $$Astro = createAstro("https://www.elyor.dev");
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const lang = getLangFromUrl(Astro2.url);
  return renderTemplate`${renderComponent($$result, "ErrorLayout", $$ErrorLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative z-20 max-w-2xl mx-auto my-12 px-7 lg:px-0"> <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8"> <div class="max-w-md text-center"> <h2 class="mb-8 font-bold text-9xl"> <span class="sr-only">Error</span> <span class="text-primary text-slate-900 dark:text-slate-100">${t("error.404", lang)}</span> </h2> <p class="text-3xl font-semibold md:text-3xl dark:text-slate-400"> ${t("error.notFound", lang)} </p> <p class="mt-4 mb-8 text-lg text-muted dark:text-slate-400"> ${t("error.goHome", lang)} </p> </div> </div> </section> ` })}`;
}, "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/pages/404.astro", void 0);

const $$file = "/home/elyorbekdjalalov/Documents/projects/personalWeb/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
