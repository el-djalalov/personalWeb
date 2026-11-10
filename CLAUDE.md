# Portfolio Website - Claude Code Instructions

## Project Overview
Personal portfolio website built with **Astro 5** and **React 18**, using Tailwind CSS for styling and shadcn/ui components.

**Live site:** https://www.elyor.dev

## Tech Stack
- **Framework:** Astro 5.x (static site generation)
- **UI Library:** React 18 (for interactive components)
- **Styling:** Tailwind CSS 3.x with CSS variables for theming
- **Components:** shadcn/ui (New York style)
- **Icons:** Lucide React, Tabler Icons
- **Animations:** Framer Motion
- **Package Manager:** Yarn 1.22

## Project Structure
```
src/
├── assets/          # Static assets (images, fonts)
├── collections/     # Content collections (if using Astro content)
├── components/      # All components
│   ├── ui/          # shadcn/ui components (button, skeleton, etc.)
│   ├── home/        # Homepage sections
│   ├── contact/     # Contact section
│   ├── experience/  # Experience/work history
│   ├── projects/    # Projects showcase
│   └── footer/      # Footer component
├── layouts/         # Astro layouts
├── lib/             # Utilities (cn function for class merging)
├── pages/           # Astro pages (file-based routing)
└── styles/          # Global CSS (globals.css)
```

## Commands
```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn preview  # Preview production build
```

## Code Conventions

### Styling
- Use **Tailwind CSS** utility classes for all styling
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Follow shadcn/ui theming with CSS variables (defined in globals.css)
- Dark is the default for everyone; `.light` on `<html>` switches to light when the visitor picks it (see `src/components/theme/`). `:root` in globals.css holds the dark tokens and `:root.light` the light ones; put colours there rather than `.dark .x` selectors
- Palette is "Periwinkle". Besides the shadcn tokens there are `--acc`, `--acc2`, `--surf2`, `--good`, `--warn`, `--crit` and `--log-*` (Tailwind colours `acc`, `acc2`, `surf2`, `log-*`). Tokens are HSL triplets: use `hsl(var(--x) / alpha)`
- Fonts are self-hosted IBM Plex (Sans, Sans Condensed for headings via `font-display`, Mono). Condensed has no Cyrillic, so `:lang(ru)` swaps headings to Plex Sans

### Components
- **Astro components** (`.astro`) for static content
- **React components** (`.tsx`) for interactive elements
- shadcn/ui components live in `src/components/ui/`
- Use `client:*` directives for React components in Astro files

### Imports
Use path aliases configured in tsconfig.json:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### TypeScript
- Strict mode enabled with `strictNullChecks`
- JSX uses React runtime (`react-jsx`)

## shadcn/ui Setup
- Style: **New York**
- Base color: **Neutral**
- Icon library: **Lucide**
- Add new components: `npx shadcn@latest add <component-name>`

## Important Notes
- This is a **static site** (SSG) - no server-side rendering
- Deployed to Vercel
- Custom domain: elyor.dev
- Google Analytics integration present
