"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import PricingCard from "./ui/pricing-card";
import { Meteors } from "./ui/meteors";
import { DottedGlowBackground } from "./ui/dotted-glow-background";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { BackgroundBeams } from "./ui/background-beams";

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: "0px 0px -25% 0px",
  });

  const [category, setCategory] = useState<"consulting" | "development">("consulting");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const consultingMonthly = [
    {
      title: "Strategy Starter",
      price: "$800",
      period: "/month",
      description:
        "Perfect for businesses needing strategic guidance and consulting expertise.",
      features: [
        "15 hours of consulting/month",
        "Strategic business planning",
        "Market analysis & research",
        "Monthly strategy sessions",
        "Email and phone support",
        "Quarterly business reviews",
      ],
    },
    {
      title: "Growth Accelerator",
      price: "$1500",
      period: "/month",
      description:
        "Ideal for growing businesses that need comprehensive consulting support.",
      features: [
        "30 hours of consulting/month",
        "Advanced strategy development",
        "Competitive intelligence",
        "Bi-weekly consulting sessions",
        "Priority support access",
        "Custom growth roadmap",
      ],
    //   isHighlighted: true,
    },
    {
      title: "Enterprise Advisory",
      price: "$3000",
      period: "/month",
      description:
        "Best for established businesses requiring extensive consulting and advisory services.",
      features: [
        "60 hours of consulting/month",
        "Executive-level advisory",
        "Full market & operational analysis",
        "Weekly strategic sessions",
        "24/7 priority support",
        "Dedicated account manager",
      ],
    },
  ];

  const consultingYearly = [
    {
      title: "Strategy Starter",
      price: "$8000",
      period: "/year",
      description:
        "Perfect for businesses needing strategic guidance and consulting expertise.",
      features: [
        "15 hours of consulting/month",
        "Strategic business planning",
        "Market analysis & research",
        "Monthly strategy sessions",
        "Email and phone support",
        "Quarterly business reviews",
        "Save $1,600 annually",
      ],
    },
    {
      title: "Growth Accelerator",
      price: "$15000",
      period: "/year",
      description:
        "Ideal for growing businesses that need comprehensive consulting support.",
      features: [
        "30 hours of consulting/month",
        "Advanced strategy development",
        "Competitive intelligence",
        "Bi-weekly consulting sessions",
        "Priority support access",
        "Custom growth roadmap",
        "Save $3,000 annually",
      ],
      isHighlighted: true,
    },
    {
      title: "Enterprise Advisory",
      price: "$30000",
      period: "/year",
      description:
        "Best for established businesses requiring extensive consulting and advisory services.",
      features: [
        "60 hours of consulting/month",
        "Executive-level advisory",
        "Full market & operational analysis",
        "Weekly strategic sessions",
        "24/7 priority support",
        "Dedicated account manager",
        "Save $6,000 annually",
      ],
    },
  ];

  const developmentMonthly = [
    {
      title: "Build Starter",
      price: "$1200",
      period: "/month",
      description:
        "Perfect for startups and small businesses launching their first digital products.",
      features: [
        "20 hours of development/month",
        "Web or mobile app development",
        "Basic UI/UX design",
        "Monthly code reviews",
        "Bug fixes & maintenance",
        "1 custom integration",
      ],
    },
    {
      title: "Scale Pro",
      price: "$2500",
      period: "/month",
      description:
        "Ideal for growing businesses that need robust development and technical support.",
      features: [
        "50 hours of development/month",
        "Full-stack development",
        "Advanced UI/UX design",
        "Bi-weekly sprint planning",
        "Priority bug resolution",
        "3 custom integrations",
      ],
      isHighlighted: true,
    },
    {
      title: "Enterprise Build",
      price: "$5000",
      period: "/month",
      description:
        "Best for enterprises needing comprehensive development and dedicated engineering teams.",
      features: [
        "120 hours of development/month",
        "Dedicated dev team",
        "Complex architecture design",
        "Weekly sprint reviews",
        "24/7 technical support",
        "Unlimited integrations",
      ],
    },
  ];

  const developmentYearly = [
    {
      title: "Build Starter",
      price: "$12000",
      period: "/year",
      description:
        "Perfect for startups and small businesses launching their first digital products.",
      features: [
        "20 hours of development/month",
        "Web or mobile app development",
        "Basic UI/UX design",
        "Monthly code reviews",
        "Bug fixes & maintenance",
        "1 custom integration",
        "Save $2,400 annually",
      ],
    },
    {
      title: "Scale Pro",
      price: "$25000",
      period: "/year",
      description:
        "Ideal for growing businesses that need robust development and technical support.",
      features: [
        "50 hours of development/month",
        "Full-stack development",
        "Advanced UI/UX design",
        "Bi-weekly sprint planning",
        "Priority bug resolution",
        "3 custom integrations",
        "Save $5,000 annually",
      ],
      isHighlighted: true,
    },
    {
      title: "Enterprise Build",
      price: "$50000",
      period: "/year",
      description:
        "Best for enterprises needing comprehensive development and dedicated engineering teams.",
      features: [
        "120 hours of development/month",
        "Dedicated dev team",
        "Complex architecture design",
        "Weekly sprint reviews",
        "24/7 technical support",
        "Unlimited integrations",
        "Save $10,000 annually",
      ],
    },
  ];

  const getPlans = () => {
    if (category === "consulting") {
      return billingCycle === "monthly" ? consultingMonthly : consultingYearly;
    } else {
      return billingCycle === "monthly" ? developmentMonthly : developmentYearly;
    }
  };

  const plans = getPlans();

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden px-6 py-16 lg:px-8 lg:py-20"
    >
      <div className="relative">
        {/* Background Effects */}
        
        <div className="absolute w-full h-full overflow-hidden">
          <div className="absolute w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-primary/10 to-transparent blur-3xl" />
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

          {/* Category Toggle */}
          <motion.div
            className="mt-10 flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
           
            <div className="relative inline-flex items-center rounded-full border border-border bg-muted/50 p-1 backdrop-blur-sm">
              {/* Sliding background */}
              <motion.div
                className="absolute inset-y-1 rounded-full bg-background shadow-lg overflow-hidden"
                animate={{
                  x: category === "consulting" ? 4 : "calc(100% + 4px)",
                  width: category === "consulting" ? "calc(50% - 8px)" : "calc(50% - 8px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {/* Meteors Animation */}
                <Meteors number={60} />
                
              </motion.div>
              
              {/* Buttons */}
              <button
                onClick={() => setCategory("consulting")}
                className="relative z-10 px-8 py-3 text-sm font-medium transition-colors"
              >
                
                <motion.span
                  animate={{
                    color: category === "consulting" ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Consulting
                </motion.span>
              </button>
              
              <button
                onClick={() => setCategory("development")}
                className="relative z-10 px-8 py-3 text-sm font-medium transition-colors"
              >
                
                <motion.span
                  animate={{
                    color: category === "development" ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Development
                  
                </motion.span>
                
              </button>
            </div>
          </motion.div>

          {/* Billing Cycle Toggle */}
          {/* <motion.div
            className="mt-6 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span
              className={`text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            
            <button
              onClick={() =>
                setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
              }
              className="relative h-8 w-16 rounded-full bg-muted transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Toggle billing cycle"
            >
              <motion.div
                className="absolute top-1 h-6 w-6 rounded-full bg-primary shadow-md"
                animate={{
                  x: billingCycle === "monthly" ? 4 : 36,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            </button>

            <span
              className={`text-sm font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Yearly
              <span className="ml-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                Save 20%
              </span>
            </span>
          </motion.div> */}
        </motion.div>

        <motion.div
          key={`${category}-${billingCycle}`}
          className="mt-12 grid gap-8 lg:grid-cols-3 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={`${plan.title}-${category}-${billingCycle}`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 40,
                scale: isInView ? 1 : 0.95
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: index * 0.1,
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