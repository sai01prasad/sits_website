"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
// GlowingEffect removed to keep wobble/parallax behavior

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
        "relative mx-auto w-full overflow-hidden rounded-2xl group",
        containerClassName
      )}
    >
      {/* Non-interactive CSS hover glow (behind content) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          zIndex: 0,
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.50), rgba(99,102,241,0.42), rgba(59,130,246,0.32))",
          filter: "blur(32px) saturate(1.35) brightness(1.08)",
          boxShadow:
            "0 30px 160px rgba(124,58,237,0.60), 0 0 280px rgba(99,102,241,0.42), 0 0 100px rgba(59,130,246,0.30)",
        }}
      />

      {/* Card content */}
      <div className="relative z-10 h-full rounded-2xl border border-black/40 bg-white/80 dark:bg-neutral-950/80 dark:border-white/30 backdrop-blur-2xl shadow-[0_40px_140px_rgba(15,23,42,0.22)] dark:shadow-[0_8px_30px_rgba(2,6,23,0.8)]">
        <motion.div
          style={{
            transform: hovered
              ? `translate3d(${-(mouse.x - 150) / 40}px, ${-(mouse.y - 150) / 40}px, 0) scale(1.03)`
              : "translate3d(0,0,0) scale(1)",
            transition: "transform 0.12s ease-out",
          }}
          className={cn("relative h-full px-6 py-16 sm:px-8", className)}
        >
         {/* <Noise /> */}
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
     // backgroundImage: "url(/noise.webp)",
      backgroundSize: "30%",
      maskImage: "radial-gradient(white, transparent 70%)",
    }}
  />
);
