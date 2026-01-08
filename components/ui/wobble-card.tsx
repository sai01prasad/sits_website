"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Meteors } from "@/components/ui/meteors";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMouse({ x: 0, y: 0 });
      }}
      style={{
        transform: hovered
          ? `translate3d(${(mouse.x - 150) / 30}px, ${(mouse.y - 150) / 30}px, 0)`
          : "translate3d(0,0,0)",
        transition: "transform 0.12s ease-out",
      }}
      className={cn(
        "relative mx-auto w-full overflow-hidden rounded-2xl",
        containerClassName
      )}
    >
      {/* Conic gradient hover glow */}
<div
  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
  style={{
    opacity: hovered ? 0.95 : 0,
    filter: "blur(90px)",
    transform: "scale(1.5)",
    maskImage: "radial-gradient(circle at center, transparent 20%, black 85%)",
    background: `
      repeating-conic-gradient(
        from 236.84deg at 50% 50%,
        rgba(68, 71, 246, 0.6) 0%,
        rgba(139,92,246,0.55) calc(25% / var(--repeating-conic-gradient-times)),
        rgba(167, 74, 253, 0.48) calc(50% / var(--repeating-conic-gradient-times)),
        rgba(71, 73, 241, 0.55) calc(75% / var(--repeating-conic-gradient-times)),
        rgba(118, 70, 228, 0.6) calc(100% / var(--repeating-conic-gradient-times))
      )
    `,
    ["--repeating-conic-gradient-times" as any]: 1,
  }}
/>
{/* High-intensity neon border glow */}
<div
  className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
  style={{
    opacity: hovered ? 1 : 0,
    padding: "10px", // much thicker border for high visibility
    filter: "blur(12px) brightness(2.8) saturate(3.8)",
    background: `
      linear-gradient(
        135deg,
        #3d34e9ff,  /* intense indigo */
        #A78BFA,  /* vivid lavender */
        #FB7185,  /* bright pink */
        #4F46E5
      )
    `,
    boxShadow: "0 0 40px rgba(168,85,247,0.75), 0 0 100px rgba(168,85,247,0.45), 0 10px 40px rgba(0,0,0,0.08)",
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  }}
/>
{/* Transparent glass surface */}
    <div className="relative z-10 h-full rounded-2xl border border-neutral-200/40 bg-white/80 dark:bg-neutral-950/80 dark:border-white/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_30px_rgba(2,6,23,0.8)]">
        <motion.div
          style={{
            transform: hovered
              ? `translate3d(${-(mouse.x - 150) / 40}px, ${-(mouse.y - 150) / 40}px, 0) scale(1.03)`
              : "translate3d(0,0,0) scale(1)",
            transition: "transform 0.12s ease-out",
          }}
          className={cn("relative h-full px-6 py-16 sm:px-8", className)}
        >
          <Noise />
          {hovered && <Meteors number={18} className="pointer-events-none" />}
          {children}
<motion.button
  type="button"
  aria-label="Learn more"
  initial={{ opacity: 0, y: 4 }}
  animate={{
    opacity: hovered ? 1 : 0,
    y: hovered ? 0 : 4,
  }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="absolute bottom-8 right-8"
>
  <button className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/90 dark:bg-slate-950 px-3 py-1 text-sm font-medium text-neutral-900 dark:text-white backdrop-blur-3xl">
      {/* Bulb icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`w-5 h-5 mr-2 transition-all duration-300`}
        style={{
          color: hovered ? "#A855F7" : "#E0E0FF",
          filter: hovered
            ? "drop-shadow(0 0 4px #A855F7) drop-shadow(0 0 8px #D8B4FE)"
            : "none",
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2a7 7 0 00-7 7c0 2.867 1.5 5.25 3.5 6.5V18h7v-2.5c2-1.25 3.5-3.633 3.5-6.5a7 7 0 00-7-7zM9 22h6"
        />
      </svg>
      <span>Learn</span>
    </span>
  </button>
</motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

const Noise = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage: "url(/noise.webp)",
      backgroundSize: "30%",
      maskImage: "radial-gradient(white, transparent 70%)",
    }}
  />
);
