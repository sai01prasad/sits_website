"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "motion/react";

import { BackgroundBeams } from "../..//ui/backgrounds/background-beams";

export function HeroSection() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      if (typeof window === "undefined") return false;
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      )
        return true;
      return document.documentElement.classList.contains("dark");
    } catch (e) {
      return false;
    }
  });
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Ensure state matches the actual document class on mount
    try {
      setIsDark(document.documentElement.classList.contains("dark"));
    } catch (err) {
      // ignore
    }
    setMounted(true);
    const handler = (e: Event) => {
      try {
        const ev = e as CustomEvent<{ isDark: boolean }>;
        if (ev?.detail && typeof ev.detail.isDark === "boolean") {
          setIsDark(ev.detail.isDark);
        } else {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      } catch (err) {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };

    window.addEventListener("theme-change", handler as EventListener);
    return () =>
      window.removeEventListener("theme-change", handler as EventListener);
  }, []);

  return (
    <div className="min-h-screen flex  flex-col items-center justify-center">
      <div className="px-2 sm:px-4 relative flex flex-col items-center justify-center">
        <div className="relative w-full flex items-center justify-center">
          <h1 className="relative z-10 mx-auto max-w-5xl text-center text-3xl sm:text-5xl md:text-5xl lg:text-8xl xl:text-9xl font-medium text-slate-700 dark:text-slate-100 leading-tight">
            {"Sai IT Solutions".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className={
                  //   "mr-1 sm:mr-2 md:mr-4 lg:mr-6 inline-block bg-clip-text  text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 drop-shadow-md dark:drop-shadow-2xl"
                  //
                  //"mr-1 sm:mr-2 md:mr-4 lg:mr-6 inline-block bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 dark:from-gray-300 dark:via-gray-500 dark:to-gray-900 drop-shadow-md dark:drop-shadow-2xl"
                  //"mr-1 sm:mr-2 md:mr-4 lg:mr-6 inline-block bg-clip-text text-transparent bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-500 drop-shadow-md dark:drop-shadow-2xl"
                  "mr-1 sm:mr-2 md:mr-4 lg:mr-6 inline-block bg-clip-text text-transparent bg-gradient-to-b from-slate-300 via-blue-200 to-slate-600 dark:from-slate-200 dark:via-blue-100 dark:to-slate-500 drop-shadow-md dark:drop-shadow-2xl"

                  //"mr-1 sm:mr-2 md:mr-4 lg:mr-6 inline-block bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-zinc-300 to-stone-600 dark:from-gray-100 dark:via-zinc-200 dark:to-stone-500 drop-shadow-md dark:drop-shadow-2xl"
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <div className="absolute top-full mt-2 sm:mt-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[95%] md:w-[40rem] h-32 sm:h-40 lg:h-48 pointer-events-none z-0">
            {/* Gradients */}
            <div className="absolute inset-x-2 sm:inset-x-5 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-2 sm:inset-x-5 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-8 sm:inset-x-12 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/3 sm:w-1/4 blur-sm" />
            <div className="absolute inset-x-8 sm:inset-x-12 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/3 sm:w-1/4" />

            {/* Core component
            <SparklesCore
              background="transparent"
              minSize={0.3}
              maxSize={0.8}
              particleDensity={600}
              className="w-full h-full"
            />

            {/* Radial Gradient to prevent sharp edges (render after mount to avoid theme flicker) */}
            {/* {mounted && (
              <div
                className={
                  "absolute inset-0 w-full h-full " +
                  (isDark ? "bg-black" : "bg-white/70") +
                  " [mask-image:radial-gradient(180px_100px_at_top,transparent_20%,white)] sm:[mask-image:radial-gradient(280px_150px_at_top,transparent_20%,white)] md:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] lg:[mask-image:radial-gradient(450px_250px_at_top,transparent_20%,white)] z-0"
                }
              ></div>
            )}  */}
          </div>
        </div>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-xl tracking-widest font-normal text-neutral-600 dark:text-neutral-200"
        >
          Transforming Ideas into Web3 Reality
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explore Now
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default HeroSection;
