import type { SocialMediaData } from "./data";

function FooterIcon({ link, title, svg }: SocialMediaData) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-violet-900 dark:hover:text-white"
    >
      <span className="sr-only">{title}</span>
      {svg}
    </a>
  );
}

export default FooterIcon;
