"use client";

import { featuresConfig } from "@/config/features";
import { motion } from "framer-motion";

export default function FeaturesGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {featuresConfig.header.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {featuresConfig.header.description}
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuresConfig.list.map((f, i) => (
            <motion.div variants={item} key={i} className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 shadow-sm hover:shadow-xl transition-all group bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-800/80">
              <div className={`w-14 h-14 rounded-2xl ${f.color} dark:bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
