"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "./glowing-effect";
import { BackgroundBeamsWithCollision } from "./background-beams-with-collision";

interface FaqSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  items: {
    question: string;
    answer: string;
  }[];
  contactInfo?: {
    title: string;
    description: string;
    buttonText: string;
    onContact?: () => void;
  };
}

export default React.forwardRef<HTMLElement, FaqSectionProps>(
  function FaqSection(
    {
      className,
      title,
      description,
      items,
      contactInfo,
      ...props
    }: FaqSectionProps,
    ref
  ) {
    return (
      <BackgroundBeamsWithCollision
        className={cn(
          "py-16 w-full px-3 flex flex-col items-center justify-center !bg-transparent !h-auto isolate",
          className
        )}
      >
        <section
          ref={ref}
          className="w-full relative z-10"
          {...props}
        >
          <div className="container">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center mb-12"
            >
              <h2 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">
                {title}
              </h2>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </motion.div>

            {/* FAQ Items */}
            <div className="max-w-2xl mx-auto space-y-2">
              {items?.map((item, index) => (
                <FaqItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  index={index}
                />
              ))}
            </div>

            {/* Contact Section */}
            {contactInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-md mx-auto mt-12 p-6 rounded-lg text-center"
              >
                <div className="inline-flex items-center justify-center p-1.5 rounded-full mb-4">
                  <Mail className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  {contactInfo.title}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {contactInfo.description}
                </p>
                <Button size="sm" onClick={contactInfo.onContact}>
                  {contactInfo.buttonText}
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </BackgroundBeamsWithCollision>
    );
  }
);

// Internal FaqItem component
const FaqItem = React.forwardRef<
  HTMLDivElement,
  {
    question: string;
    answer: string;
    index: number;
  }
>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { question, answer, index } = props;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={cn(
        "group rounded-lg overflow-visible relative",
        "transition-all duration-200 ease-in-out"
      )}
    >
      {/* Glowing border effect */}
      <div style={{ borderRadius: "0.5rem" }}>
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
      
      <div 
        className={cn(
          "bg-white/80 dark:bg-neutral-950/80 relative rounded-lg",
          "transition-all duration-200",
          !isOpen && "hover:bg-white/90 dark:hover:bg-neutral-950/90"
        )}
        style={{
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
        }}
      >
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 h-auto justify-between hover:bg-transparent"
        >
          <h3
            className={cn(
              "text-base font-medium transition-colors duration-200 text-left",
              "text-neutral-700 dark:text-neutral-300",
              isOpen && "text-neutral-900 dark:text-neutral-100"
            )}
          >
            {question}
          </h3>
          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "p-0.5 rounded-full shrink-0",
              "transition-colors duration-200",
              isOpen ? "text-indigo-500" : "text-neutral-600 dark:text-neutral-400"
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </Button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
            >
              <div className="px-6 pb-4 pt-2">
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed"
                >
                  {answer}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});
FaqItem.displayName = "FaqItem";