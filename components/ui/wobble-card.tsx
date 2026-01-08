"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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
    opacity: hovered ? 0.45 : 0,
    filter: "blur(50px)",
    transform: "scale(1.25)",
    maskImage: "radial-gradient(circle at center, transparent 25%, black 80%)", // smaller center
    background: `
      repeating-conic-gradient(
        from 236.84deg at 50% 50%,
        rgba(99,102,241,0.24) 0%,       /* increased by ~30% */
        rgba(139,92,246,0.21) calc(25% / var(--repeating-conic-gradient-times)),
        rgba(168,85,247,0.18) calc(50% / var(--repeating-conic-gradient-times)),
        rgba(99,102,241,0.21) calc(75% / var(--repeating-conic-gradient-times)),
        rgba(139,92,246,0.24) calc(100% / var(--repeating-conic-gradient-times))
      )
    `,
    ["--repeating-conic-gradient-times" as any]: 3,
  }}
/>
{/* High-intensity neon border glow */}
<div
  className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
  style={{
    opacity: hovered ? 1 : 0,
    padding: "3px", // much thicker border
    filter: "blur(6px) brightness(1.8) saturate(2.8)",
    background: `
      linear-gradient(
        135deg,
        #4338CA,  /* deep electric indigo */
        #9333EA,  /* strong neon purple */
        #E879F9,  /* hot pink neon */
        #4338CA
      )
    `,
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  }}
/>
{/* Transparent glass surface */}
     <div className="relative z-10 h-full rounded-2xl border border-white/30 bg-white/5 backdrop-blur-2xl shadow-lg">
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
          {children}
<motion.button
  initial={{ opacity: 0, y: 6 }}
  animate={{
    opacity: hovered ? 1 : 0,
    y: hovered ? 0 : 6,
  }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="
    absolute bottom-8 right-8
    flex items-center justify-center gap-2
    text-sm font-medium
    text-white/90
    hover:text-white
    transition-all
    bg-white/20
   
    rounded-lg
    px-4 py-2
    shadow-md
    hover:shadow-xl
    border border-white/30
    cursor-pointer
    outline-none
  "
>
  <span>Learn</span>
  {/* Neon Glowing Bulb */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={`w-5 h-5 transition-all duration-300`}
    style={{
      color: hovered ? "#A855F7" : "#E0E0FF", // neon purple on hover, subtle off-hover
      filter: hovered
        ? "drop-shadow(0 0 4px #A855F7) drop-shadow(0 0 8px #D8B4FE) drop-shadow(0 0 12px #9333EA)"
        : "drop-shadow(0 0 0 rgba(0,0,0,0))",
    }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2a7 7 0 00-7 7c0 2.867 1.5 5.25 3.5 6.5V18h7v-2.5c2-1.25 3.5-3.633 3.5-6.5a7 7 0 00-7-7zM9 22h6"
    />
  </svg>
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
