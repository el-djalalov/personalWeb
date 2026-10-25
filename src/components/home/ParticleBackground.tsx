import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId = 0;
        let running = false;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                if (!canvas) {
                    this.x = 0;
                    this.y = 0;
                } else {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;

                // Brand colors: cyan-900, fuchsia-800, blue-700
                // Using HSLA for better theme adaptability if needed, but RGBA is fine
                const colors = [
                    'rgba(22, 78, 99, 0.4)',   // cyan-900
                    'rgba(134, 25, 143, 0.4)', // fuchsia-800
                    'rgba(29, 78, 216, 0.4)'   // blue-700
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                if (!canvas) return;
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = Math.min(window.innerWidth * 0.05, 50); // Responsive count
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            if (running) animationFrameId = requestAnimationFrame(animate);
        };

        init();

        // Only animate while the hero is on screen; no point burning CPU and
        // battery on a canvas nobody can see
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !running) {
                running = true;
                animate();
            } else if (!entry.isIntersecting && running) {
                running = false;
                cancelAnimationFrame(animationFrameId);
            }
        });
        observer.observe(canvas);

        return () => {
            observer.disconnect();
            running = false;
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30"
        />
    );
};

export default ParticleBackground;
