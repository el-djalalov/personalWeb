import { useEffect, useRef, useState } from "react";

const CursorGlow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop and respect motion preferences
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsVisible(true);

    let frame = 0;
    const moveCursor = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Center the 400px glow; the CSS transition smooths the movement
        glowRef.current?.style.setProperty(
          "translate",
          `${e.clientX - 200}px ${e.clientY - 200}px`,
        );
      });
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 opacity-30 dark:opacity-20 transition-[translate] duration-150 ease-out"
      style={{
        translate: "-100px -100px",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(124, 58, 237, 0) 70%)", // Violet glow
        filter: "blur(40px)",
      }}
    />
  );
};

export default CursorGlow;
