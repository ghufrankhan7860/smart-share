"use client";

import { socialProofConfig } from "@/config/social-proof";
import { motion } from "framer-motion";

export default function SocialProof() {
  const { title, brands } = socialProofConfig;
  
  // duplicate for seamless scroll
  const marqueeBrands = [...brands, ...brands, ...brands];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
      </div>
      
      <div className="relative w-full overflow-hidden pause-on-hover px-4">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10"></div>

        <div className="flex animate-scroll whitespace-nowrap w-max gap-32 items-center py-4">
          {marqueeBrands.map((brand, i) => (
            <div 
              key={i} 
              className={`text-4xl md:text-5xl font-black opacity-30 hover:opacity-100 transition-all cursor-pointer ${brand.color} saturate-0 hover:saturate-100 duration-500 hover:scale-110 transform`}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
