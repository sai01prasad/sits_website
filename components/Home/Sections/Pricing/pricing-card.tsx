"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { Meteors } from "../../../ui/meteors";
import { GlowingEffect } from "../../../ui/glowing-effect";

interface Plan {
  title: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted?: boolean;
}

interface PricingCardProps {
  plan: Plan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Animate shine effect on hover
  useAnimationFrame((t) => {
    if (shineRef.current && buttonRef.current?.matches(":hover")) {
      const x = Math.sin(t * 0.001) * 100;
      shineRef.current.style.transform = `translateX(${x}%)`;
    }

    // Animate glow effect for highlighted card
    if (plan.isHighlighted && cardRef.current) {
      const x = Math.sin(t * 0.001) * 20;
      const y = Math.cos(t * 0.002) * 20;
      cardRef.current.style.setProperty("--glow-x", `${x}px`);
      cardRef.current.style.setProperty("--glow-y", `${y}px`);
    }
  });

  return (
    <motion.div
      ref={cardRef}
      className={`relative group h-full ${plan.isHighlighted ? "z-10" : ""}`}
      whileHover={{ translateY: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ borderRadius: "1.5rem" }}>
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
      </div>
      {/* Card glow effect - all sides */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-indigo-500/40 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      {/* Card container with navbar-style backdrop blur and shadow */}
      <div
        className="relative rounded-3xl bg-white/80 dark:bg-neutral-950/80 p-8 h-full flex flex-col overflow-hidden"
        style={{
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      >
        {/* Meteors background effect */}
        {/* <Meteors number={20} /> */}

        {/* Content */}
        <div className="space-y-6 flex-1 flex flex-col relative z-10">
          {/* Header */}
          <div className="space-y-4">
            <motion.h3
              className="text-2xl font-normal text-neutral-800 dark:text-neutral-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {plan.title}
            </motion.h3>
            <motion.div
              className="text-neutral-900 dark:text-neutral-50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-4xl font-bold tracking-tight">
                {plan.price}
              </span>
              <span className="text-xl text-neutral-600 dark:text-neutral-400 font-normal">
                /Month
              </span>
            </motion.div>
            <motion.p
              className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {plan.description}
            </motion.p>
          </div>

          {/* Divider with gradient */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />

          {/* Features list */}
          <motion.ul
            className="space-y-4 flex-1"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {plan.features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Check className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                <span className="text-[15px] text-neutral-700 dark:text-neutral-300">
                  {feature}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Subscribe button */}
          <div className="relative mt-8">
            <div className="absolute -inset-[1px] rounded-xl">
              <div className="absolute inset-[-2px] rounded-xl bg-gradient-to-r from-indigo-500/50 via-indigo-500/70 to-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            </div>

            <motion.button
              ref={buttonRef}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full rounded-xl bg-indigo-500/10 px-6 py-3 text-neutral-800 dark:text-neutral-100 backdrop-blur-xs overflow-hidden"
            >
              <div ref={shineRef} className="absolute inset-0">
                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              <div className="absolute inset-0 rounded-xl border border-neutral-200 dark:border-neutral-800" />

              <span className="relative text-lg font-normal">Subscribe</span>
              <Meteors number={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
