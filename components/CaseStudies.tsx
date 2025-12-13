"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudiesConfig } from "@/config/case-studies";

export default function CaseStudies() {
  const { header, cases, cta } = caseStudiesConfig;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  return (
    <section className="py-24 bg-white dark:bg-black text-slate-900 dark:text-white overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 dark:bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 md:gap-0">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{header.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">{header.subtitle}</p>
          </div>
          <div className="flex gap-4 relative z-20">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border border-slate-200 dark:border-white/20 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-14 h-14 rounded-full border border-slate-200 dark:border-white/20 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[600px] md:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 h-full items-center"
            >
              {/* Content Left */}
              <div className="space-y-8">
                <div className="text-brand-purple dark:text-brand-lime font-bold tracking-wider uppercase text-sm">
                  CASE STUDY: {cases[currentIndex].brand}
                </div>
                <h3 className="text-3xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
                  {cases[currentIndex].title}
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-white/10">
                  {cases[currentIndex].stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-2 text-brand-purple dark:text-brand-lime font-bold hover:underline underline-offset-4 mt-4">
                  {cta.text} <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Content Right (Visual) */}
              <div className={`w-full aspect-video md:h-full rounded-3xl ${cases[currentIndex].image} relative overflow-hidden group shadow-xl`}>
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                {/* Mock UI elements to make it look like a campaign preview */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/30 dark:bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/40 dark:border-white/20 shadow-lg">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-200 opacity-80"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-2 w-3/4 bg-white dark:bg-slate-200/50 rounded opacity-80"></div>
                        <div className="h-2 w-1/2 bg-white dark:bg-slate-200/30 rounded opacity-60"></div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
