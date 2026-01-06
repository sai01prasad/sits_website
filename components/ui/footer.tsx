"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Liquid particles
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = -20;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 2 + 1;
        this.radius = Math.random() * 3 + 1;
        this.alpha = Math.random() * 0.5 + 0.3;
        
        // Random color variations (indigo/purple theme)
        const colors = [
          "rgba(99, 102, 241, ", // indigo
          "rgba(139, 92, 246, ", // purple
          "rgba(168, 85, 247, ", // violet
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.vy;
        this.x += this.vx;

        // Liquid pooling effect at bottom
        if (this.y > canvas.offsetHeight - 100) {
          this.vy *= 0.95;
          this.vx *= 0.98;
          this.y = Math.min(this.y, canvas.offsetHeight - 50 + Math.random() * 50);
        }

        // Wave motion when settled
        if (this.vy < 0.5) {
          this.vx = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.5;
        }

        // Reset if out of bounds
        if (this.y > canvas.offsetHeight + 20 || this.x < -20 || this.x > canvas.offsetWidth + 20) {
          this.y = -20;
          this.x = Math.random() * canvas.offsetWidth;
          this.vx = (Math.random() - 0.5) * 2;
          this.vy = Math.random() * 2 + 1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ")";
        ctx.fill();

        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 3
        );
        gradient.addColorStop(0, this.color + (this.alpha * 0.5) + ")");
        gradient.addColorStop(1, this.color + "0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw liquid pool at bottom with wave effect
      ctx.globalCompositeOperation = "source-over";
      const gradient = ctx.createLinearGradient(0, canvas.offsetHeight - 150, 0, canvas.offsetHeight);
      gradient.addColorStop(0, "rgba(99, 102, 241, 0)");
      gradient.addColorStop(0.3, "rgba(99, 102, 241, 0.05)");
      gradient.addColorStop(0.7, "rgba(99, 102, 241, 0.1)");
      gradient.addColorStop(1, "rgba(99, 102, 241, 0.15)");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, canvas.offsetHeight);
      
      for (let x = 0; x <= canvas.offsetWidth; x += 20) {
        const wave = Math.sin(x * 0.02 + Date.now() * 0.001) * 8;
        ctx.lineTo(x, canvas.offsetHeight - 100 + wave);
      }
      
      ctx.lineTo(canvas.offsetWidth, canvas.offsetHeight);
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
    <footer className={cn("relative w-full overflow-hidden bg-white dark:bg-neutral-950", className)}>
      {/* Animated liquid background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ height: "100%" }}
      />

      {/* Smooth gradient transition from above section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/0 via-white/50 to-white dark:from-neutral-950/0 dark:via-neutral-950/50 dark:to-neutral-950 pointer-events-none" />
      
      {/* Gradient overlay for liquid depth effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-500/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-16 mb-12">
          {/* Logo and description */}
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
            
            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/80 dark:bg-neutral-900/80 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors shadow-sm hover:shadow-md"
                    style={{
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            )}
          </div>

          {/* Footer sections - Stacked on mobile, row on desktop */}
          <div className="flex flex-col md:flex-row md:justify-center lg:justify-end gap-12 md:gap-16 lg:gap-20">
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left min-w-[140px]">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
                  {section.title}
                </h3>
                <ul className="space-y-3.5">
                  {section.links.map((link, linkIndex) => (
                    <motion.li 
                      key={linkIndex} 
                      whileHover={{ x: 4 }} 
                      transition={{ duration: 0.2 }}
                      className="flex justify-center md:justify-start"
                    >
                      <a
                        href={link.href}
                        className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
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

        {/* Bottom bar */}
        <div className="pt-8 sm:pt-10 border-t border-neutral-200/80 dark:border-neutral-800/80">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 text-center md:text-left order-2 md:order-1">
              {bottomText}
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 order-1 md:order-2">
              <a
                href="#privacy"
                className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Liquid pool glow effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-indigo-500/8 via-indigo-500/3 to-transparent pointer-events-none" />
    </footer>
  );
}