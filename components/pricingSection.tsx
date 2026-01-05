"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PricingCard from "./ui/pricing-card";
import { Meteors } from "./ui/meteors";

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: "0px 0px -25% 0px",
  });

  const plans = [
    {
      title: "Basic Plan",
      price: "$500",
      description:
        "Perfect for small businesses looking to get started with professional design services.",
      features: [
        "10 hours of design work/month",
        "Access to expert designers",
        "Standard design support",
        "Monthly design reviews",
        "Email support",
        "1 custom branding project/year",
      ],
    },
    {
      title: "Standard Plan",
      price: "$1000",
      description:
        "Ideal for growing businesses that need more design support and personalized attention.",
      features: [
        "25 hours of design work/month",
        "Access to expert designers",
        "Priority designer access",
        "Bi-weekly design reviews",
        "Email and phone support",
        "2 custom branding projects/year",
      ],
      isHighlighted: true,
    },
    {
      title: "Premium Plan",
      price: "$2000",
      description:
        "Best for established businesses needing continuous and comprehensive design support.",
      features: [
        "70 hours of design work/month",
        "Access to expert designers",
        "Priority project delivery",
        "Weekly design reviews",
        "Email, phone, and video support",
        "3 custom branding projects/year",
      ],
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden px-6 py-16 lg:px-8 lg:py-20"
    >
      <div className="relative">
        {/* Background Effects */}
        
        <div className="absolute w-full h-full overflow-hidden">
            
          <div className="absolute w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-primary/10 to-transparent blur-3xl" />
           
          {/* Animated grid background */}
          {/* <motion.div
          className="absolute w-full h-full left-0 top-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px),
                             linear-gradient(hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            y,
          }}
        /> */}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
             
          <h2 className="bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-5xl font-semibold text-transparent sm:text-6xl lg:text-7xl">
            See Our <span className="italic">Pricing Plans</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Choose the plan that best suits your needs and unlock exceptional
            design services tailored to your business.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-8 lg:grid-cols-3 lg:mt-16"
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.2,
              }}
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}