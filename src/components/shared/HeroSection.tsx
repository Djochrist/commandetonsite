import React from "react";
import { motion } from "framer-motion";
import { WhatsAppButton } from "./WhatsAppButton";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  badge?: string;
  imageComponent?: React.ReactNode;
}

export function HeroSection({ title, subtitle, badge, imageComponent }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            {badge && (
              <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                {badge}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <WhatsAppButton text="Contactez-nous aujourd'hui" className="w-full sm:w-auto text-lg px-8 py-4" />
            </div>
          </motion.div>

          {imageComponent && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full max-w-lg lg:max-w-none relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 aspect-[4/3] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                {imageComponent}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
