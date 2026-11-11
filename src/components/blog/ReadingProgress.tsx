import { useEffect, useState } from "react";

interface Props {
  /** Accessible name, in the page language */
  label: string;
}

export default function ReadingProgress({ label }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Calculate how far through the article we've scrolled
      const scrollableDistance = articleHeight - windowHeight + articleTop;
      const scrolledDistance = scrollY - articleTop;

      if (scrolledDistance <= 0) {
        setProgress(0);
      } else if (scrolledDistance >= scrollableDistance) {
        setProgress(100);
      } else {
        setProgress((scrolledDistance / scrollableDistance) * 100);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-60 h-1 bg-secondary">
      <div
        className="h-full bg-linear-to-r from-acc to-acc2 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      />
    </div>
  );
}
