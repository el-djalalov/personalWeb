import type { SocialMediaData } from "./data";

function FooterIcon({ link: url, title, svg }: SocialMediaData) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center text-muted-foreground hover:text-violet-900 dark:hover:text-white transition-colors duration-200"
      aria-label={title}
    >
      <span className="sr-only">{title}</span>
      {svg}
    </a>
  );
}

export default FooterIcon;
