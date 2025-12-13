"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Check, Info } from "lucide-react";
import { pricingConfig } from "@/config/pricing";

export default function PricingSlider() {
  const { controls, output, text } = pricingConfig;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  
  const [budget, setBudget] = useState(50000);
  const [duration, setDuration] = useState(controls.duration.options[0]);
  const [counts, setCounts] = useState({ micro: 0, medium: 0, large: 0 });

  useEffect(() => {
    const effectiveBudget = budget * duration.multiplier;
    setCounts({
      micro: Math.floor(effectiveBudget / output.tiers[0].cost),
      medium: Math.floor(effectiveBudget / output.tiers[1].cost),
      large: Math.floor(effectiveBudget / output.tiers[2].cost),
    });
  }, [budget, duration, output.tiers]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: text.currency,
      maximumSignificantDigits: 3,
    }).format(val);
  };

  return (
    <section ref={containerRef} className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Controls */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              {text.heading.line1} <br />
              <span className="text-brand-purple">{text.heading.line2}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {text.description}
            </p>
          </motion.div>

          {/* Budget Slider */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex justify-between items-end mb-6">
              <label className="text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-sm">{controls.budget.label}</label>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(budget)}</div>
            </div>
            
            <input 
              type="range" 
              min={controls.budget.min} 
              max={controls.budget.max} 
              step={controls.budget.step} 
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-purple dark:accent-brand-purple"
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
              <span>{controls.budget.minLabel}</span>
              <span>{controls.budget.maxLabel}</span>
            </div>
          </motion.div>

          {/* Duration Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-slate-500 font-semibold uppercase tracking-wider text-sm block mb-4">{controls.duration.label}</label>
            <div className="grid grid-cols-3 gap-4">
              {controls.duration.options.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDuration(d)}
                  className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                    duration.value === d.value 
                      ? 'border-brand-purple bg-purple-50 dark:bg-purple-900/20 text-brand-purple' 
                      : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-600'
                  }`}
                >
                  {d.tag && (
                    <span className="absolute -top-3 px-2 py-0.5 bg-brand-lime text-black text-[10px] font-bold rounded-full uppercase tracking-wide">
                      {d.tag}
                    </span>
                  )}
                  <span className="font-bold">{d.label}</span>
                  <span className="text-xs opacity-70">x{d.multiplier} multiplier</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Output */}
        <div className="relative">
          {/* Decorative backdrop */}
          <motion.div 
            style={{ rotate }}
            className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40 rounded-3xl scale-105 opacity-50"
          ></motion.div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            className="relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 space-y-6"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-4">{output.title}</h3>
            
            {output.tiers.map((tier) => (
              <div key={tier.id} className={`p-6 rounded-2xl border ${tier.color} dark:bg-opacity-5 flex items-center justify-between`}>
                <div>
                  <div className="font-bold text-lg">{tier.label}</div>
                  <div className="text-xs opacity-80 font-medium mt-1">{tier.desc}</div>
                </div>
                <div className="flex items-end gap-1">
                  <motion.span 
                    key={counts[tier.id as keyof typeof counts]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-black tracking-tight"
                  >
                    {counts[tier.id as keyof typeof counts]}
                  </motion.span>
                  <span className="mb-2 font-medium opacity-70">creators</span>
                </div>
              </div>
            ))}

            <div className="pt-4 flex items-center gap-2 text-slate-400 text-sm">
              <Info className="w-4 h-4" />
              <span>{output.disclaimer}</span>
            </div>
            
            <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              {output.cta}
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
