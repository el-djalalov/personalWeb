import type { CollectionEntry } from "astro:content";

export type Site = {
  website: string;
  author: string;
  profile: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerIndex: number;
  postPerPage: number;
  scheduledPostMargin: number;
  showArchives?: boolean;
  editPost?: {
    url?: string;
    text?: string;
    appendFilePath?: boolean;
  };
  dynamicOgImage?: boolean;
};

export type SocialObjects = {
  name: SocialMedia;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export type SocialIcons = {
  [social in SocialMedia]: string;
};

export type SocialMedia =
  | "Github"
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "Mail"
  | "Twitter"
  | "Twitch"
  | "YouTube"
  | "WhatsApp"
  | "Snapchat"
  | "Pinterest"
  | "TikTok"
  | "CodePen"
  | "Discord"
  | "GitLab"
  | "Reddit"
  | "Skype"
  | "Steam"
  | "Telegram"
  | "Mastodon";

export type Frontmatter = {
  title: string;
  description: string;
  pubDatetime: Date;
  modDatetime?: Date | null;
  author?: string;
  slug?: string;
  featured?: boolean;
  draft?: boolean;
  tags?: string[];
  ogImage?: string;
  canonicalURL?: string;
  lang?: "en" | "uz";
  telegramMessageId?: number;
};
