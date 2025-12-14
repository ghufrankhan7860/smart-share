"use client";

import Link from "next/link";
import { heroConfig } from "@/config/hero";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden bg-off-white dark:bg-slate-950">
            {/* Background Collage with Fade Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={heroConfig.image.src}
                    alt={heroConfig.image.alt}
                    className="hidden md:block w-full h-full object-cover opacity-60 dark:opacity-40"
                />
                {/* Radial gradient mask */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-background)_30%,_transparent_100%)] sm:bg-[radial-gradient(circle_at_center,_var(--color-background)_40%,_transparent_80%)]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white dark:from-slate-950/50 dark:via-slate-950/80 dark:to-slate-950"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-5xl px-6 flex flex-col items-center gap-8 mt-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                >
                    {heroConfig.title.line1} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                        {heroConfig.title.highlight}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-medium"
                >
                    {heroConfig.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-4"
                >
                    <Link
                        href={heroConfig.buttons.primary.href}
                        className="px-8 py-4 bg-brand-purple text-white rounded-full font-semibold text-lg hover:bg-purple-800 transition-all shadow-lg hover:shadow-brand-purple/25 transform hover:-translate-y-1"
                    >
                        {heroConfig.buttons.primary.text}
                    </Link>
                    <Link
                        href={heroConfig.buttons.secondary.href}
                        className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-semibold text-lg hover:border-brand-purple dark:hover:border-purple-400 hover:text-brand-purple dark:hover:text-purple-400 transition-all shadow-sm transform hover:-translate-y-1"
                    >
                        {heroConfig.buttons.secondary.text}
                    </Link>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid grid-cols-3 gap-8 md:gap-16 mt-16 py-8 border-t border-slate-200/60 dark:border-slate-800/60 w-full max-w-3xl"
                >
                    {heroConfig.stats.map((stat, i) => (
                        <div key={i} className={`flex flex-col items-center ${i === 1 ? 'border-l border-r border-slate-200 dark:border-slate-800 px-4' : ''}`}>
                            <span className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{stat.value}</span>
                            <span className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
