"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "../../ui/glowing-effect";

/**
 * 1. External Particle Class
 * Moved outside the component to prevent compilation errors and
 * optimize performance during re-renders.
 */
class Particle {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  radius: number = 0;
  alpha: number = 0;
  color: string = "";

  constructor(canvasWidth: number) {
    this.reset(canvasWidth, true);
  }

  reset(canvasWidth: number, isFirstInit = false) {
    this.x = Math.random() * canvasWidth;
    // If it's the first run, spread particles across the height
    this.y = isFirstInit ? Math.random() * -500 : -20;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = Math.random() * 2 + 1;
    this.radius = Math.random() * 3 + 1;
    this.alpha = Math.random() * 0.5 + 0.3;

    const colors = [
      "rgba(99, 102, 241, ", // indigo
      "rgba(139, 92, 246, ", // purple
      "rgba(168, 85, 247, ", // violet
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.y += this.vy;
    this.x += this.vx;

    // Liquid pooling logic
    if (this.y > canvasHeight - 100) {
      this.vy *= 0.95;
      this.vx *= 0.98;
      this.y = Math.min(this.y, canvasHeight - 50 + Math.random() * 50);
    }

    // Gentle wave movement
    if (this.vy < 0.5) {
      this.vx = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.5;
    }

    // Recycle particle
    if (
      this.y > canvasHeight + 20 ||
      this.x < -20 ||
      this.x > canvasWidth + 20
    ) {
      this.reset(canvasWidth);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ")";
    ctx.fill();

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius * 3
    );
    gradient.addColorStop(0, this.color + this.alpha * 0.5 + ")");
    gradient.addColorStop(1, this.color + "0)");
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

interface FooterProps {
  className?: string;
  logo?: React.ReactNode;
  description?: string;
  sections?: {
    title: string;
    links: { name: string; href: string }[];
  }[];
  socialLinks?: {
    icon: React.ReactNode;
    href: string;
    label: string;
  }[];
  bottomText?: string;
}

// Custom Glowing Line Component
const GlowingLine = ({ className }: { className?: string }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lineRef.current) {
        const rect = lineRef.current.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const percentage = (relativeX / rect.width) * 100;
        setMouseX(percentage);

        // Check if mouse is near the line (within 100px vertically)
        const isNear =
          e.clientY >= rect.top - 100 && e.clientY <= rect.bottom + 100;
        setIsHovering(isNear);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={lineRef}
      className={cn("absolute inset-x-0 h-px overflow-visible", className)}
    >
      {/* Base line */}
      <div className="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50" />

      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 h-px"
        style={{
          background: `linear-gradient(90deg, 
            rgba(99, 102, 241, 0) 0%, 
            rgba(99, 102, 241, 0.8) ${mouseX}%, 
            rgba(139, 92, 246, 0.6) ${mouseX + 5}%, 
            rgba(168, 85, 247, 0) 100%)`,
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Glow spot */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-32 h-8 rounded-full blur-xl"
        style={{
          left: `${mouseX}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.4) 30%, transparent 70%)",
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        animate={{
          left: `${mouseX}%`,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />
    </div>
  );
};

export default function Footer({
  className,
  logo,
  description = "Building the future, one line of code at a time.",
  sections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "FAQ", href: "#faq" },
        { name: "Documentation", href: "#docs" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#privacy" },
        { name: "Terms", href: "#terms" },
        { name: "Cookies", href: "#cookies" },
        { name: "Licenses", href: "#licenses" },
      ],
    },
  ],
  socialLinks = [],
  bottomText = "© 2024 Your Company. All rights reserved.",
}: FooterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let canvasWidth = 0;
    let canvasHeight = 0;

    const resizeCanvas = () => {
      canvasWidth = canvas.offsetWidth;
      canvasHeight = canvas.offsetHeight;
      canvas.width = canvasWidth * window.devicePixelRatio;
      canvas.height = canvasHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Check if mobile device (screen width < 768px for mobile)
    const isMobile = window.innerWidth < 768;

    // Adjust particle count based on screen size
    // Mobile: 30 particles, Tablet/Desktop: 150 particles
    const particleCount = isMobile ? 30 : 150;

    // Create particles array using the external class
    const particles: Particle[] = Array.from(
      { length: particleCount },
      () => new Particle(canvasWidth)
    );

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach((particle) => {
        particle.update(canvasWidth, canvasHeight);
        particle.draw(ctx);
      });

      // Liquid pool at bottom
      ctx.globalCompositeOperation = "source-over";
      const poolGradient = ctx.createLinearGradient(
        0,
        canvasHeight - 150,
        0,
        canvasHeight
      );
      poolGradient.addColorStop(0, "rgba(99, 102, 241, 0)");
      poolGradient.addColorStop(0.3, "rgba(99, 102, 241, 0.05)");
      poolGradient.addColorStop(1, "rgba(99, 102, 241, 0.15)");

      ctx.fillStyle = poolGradient;
      ctx.beginPath();
      ctx.moveTo(0, canvasHeight);

      for (let x = 0; x <= canvasWidth; x += 20) {
        const wave = Math.sin(x * 0.02 + Date.now() * 0.001) * 8;
        ctx.lineTo(x, canvasHeight - 100 + wave);
      }

      ctx.lineTo(canvasWidth, canvasHeight);
      ctx.closePath();
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <footer
      className={cn(
        "relative w-full overflow-hidden bg-white dark:bg-neutral-950",
        className
      )}
    >
      {/* Top border with glowing effect */}
      <GlowingLine className="top-0 z-20" />

      {/* Animated liquid background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ height: "100%" }}
      />

      {/* Smooth gradient transition from above section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/0 via-white/50 to-white dark:from-neutral-950/0 dark:via-neutral-950/50 dark:to-neutral-950 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-16 mb-12">
          {/* Brand area */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:max-w-md">
            <div className="mb-6">
              {logo || (
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Your Logo
                </div>
              )}
            </div>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 max-w-sm">
              {description}
            </p>

            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-white/80 dark:bg-neutral-900/80 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-indigo-500 transition-colors shadow-sm"
                    style={{ backdropFilter: "blur(10px)" }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            )}
          </div>

          {/* Links area */}
          <div className="flex flex-col md:flex-row md:justify-center lg:justify-end gap-12 md:gap-16 lg:gap-20">
            {sections.map((section, index) => (
              <div
                key={index}
                className="flex flex-col items-center md:items-start text-center md:text-left min-w-[140px]"
              >
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
                  {section.title}
                </h3>
                <ul className="space-y-3.5">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={linkIndex} whileHover={{ x: 4 }}>
                      <a
                        href={link.href}
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-indigo-500 transition-colors"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar with glowing divider */}
        <div className="relative pt-8">
          {/* Glowing divider line */}
          <GlowingLine className="top-0" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 text-center md:text-left order-2 md:order-1">
              {bottomText}
            </p>
            <div className="flex gap-6 order-1 md:order-2">
              <a
                href="#privacy"
                className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-indigo-500 font-medium"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-indigo-500 font-medium"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
    </footer>
  );
}
