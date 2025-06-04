import React from "react";
import type { SocialMediaData } from "./data";

function FooterIcon({ link: url, title, svg }: SocialMediaData) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const link = document.createElement("a");
    link.href = url;
    link.rel = "noopener noreferrer";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <span
      onClick={handleClick}
      className="cursor-pointer text-muted-foreground hover:text-violet-900 dark:hover:text-white"
    >
      <span className="sr-only">{title}</span>
      {svg}
    </span>
  );
}

export default FooterIcon;
