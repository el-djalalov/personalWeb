import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.elyor.dev/",
  author: "Elyor Djalalov",
  profile: "https://www.elyor.dev/",
  desc: "Personal website and blog of Elyor Djalalov - Senior Frontend Developer specializing in modern web technologies, Astro, React, and software development.",
  title: "Elyor Djalalov",
  ogImage: "elyor-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  editPost: {
    url: "https://github.com/yourusername/personalWeb/edit/main/src/content/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
  dynamicOgImage: true,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN", "ru-RU", "uz-UZ"], // BCP 47 Language Tags
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/yourusername",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:your-email@example.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yourusername",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://t.me/yourchannel",
    linkTitle: `${SITE.title} on Telegram`,
    active: true,
  },
];
