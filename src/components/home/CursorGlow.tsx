import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorGlow = () => {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 20, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only enable on desktop and respect motion preferences
        if (window.matchMedia("(pointer: coarse)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 200); // Center the 400px glow
            cursorY.set(e.clientY - 200);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 opacity-30 dark:opacity-20"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(124, 58, 237, 0) 70%)', // Violet glow
                filter: 'blur(40px)'
            }}
        />
    );
};

export default CursorGlow;
