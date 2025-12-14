"use client";

import Link from "next/link";
import { ChevronDown, MessageSquare } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { navbarConfig } from "@/config/navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => setMounted(true), []);

    // Light mode scroll animations (0 to 200px)
    const bgLikeGlass = "rgba(255, 255, 255, 0.7)";
    const bgDark = "#000000";

    const bgColor = useTransform(scrollY, [0, 200], [bgLikeGlass, bgDark]);
    const logoColor = useTransform(scrollY, [0, 200], ["#0f172a", "#ffffff"]); // slate-900 -> white
    const navLinkColor = useTransform(scrollY, [0, 200], ["#475569", "#ffffff"]); // slate-600 -> white
    const btnBorderColor = useTransform(scrollY, [0, 200], ["rgba(226, 232, 240, 1)", "rgba(255, 255, 255, 0.2)"]); // slate-200 -> white/20
    const btnTextColor = useTransform(scrollY, [0, 200], ["#0f172a", "#ffffff"]); // slate-900 -> white
    const btnBgColor = useTransform(scrollY, [0, 200], ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.1)"]);

    const isLight = mounted && resolvedTheme === "light";

    // Conditional styles
    const navStyle = isLight ? { backgroundColor: bgColor } : {};
    const logoTextStyle = isLight ? { color: logoColor } : {};
    const linkTextStyle = isLight ? { color: navLinkColor } : {};
    const btnStyle = isLight ? {
        borderColor: btnBorderColor,
        color: btnTextColor,
        backgroundColor: btnBgColor
    } : {};

    return (
        <motion.nav
            key={resolvedTheme}
            initial={!mounted ? { y: -100 } : false}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={navStyle}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 glass"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href={navbarConfig.logo.href} className="flex items-center gap-2">
                    <img
                        src={navbarConfig.logo.src}
                        alt={navbarConfig.logo.alt}
                        className="w-18 h-18 rounded-lg object-cover"
                    />
                    <motion.span
                        style={logoTextStyle}
                        className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors"
                    >
                        {navbarConfig.logo.text}
                    </motion.span>
                </Link>

                {/* Center Links (Desktop) */}
                <div className="hidden md:flex items-center gap-8">
                    {navbarConfig.links.map((link) => (
                        link.hasDropdown ? (
                            <div key={link.label} className="group relative cursor-pointer flex items-center gap-1 font-medium hover:text-brand-purple dark:hover:text-brand-purple transition-colors">
                                <motion.div style={linkTextStyle} className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                                    <span>{link.label}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl rounded-xl p-2 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible translate-y-2 group-hover:translate-y-0">
                                    {link.dropdownItems?.map((item) => (
                                        <div key={item.label} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer text-slate-600 dark:text-slate-300 hover:text-brand-purple dark:hover:text-brand-purple">
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link key={link.label} href={link.href} className="font-medium hover:text-brand-purple dark:hover:text-brand-purple transition-colors">
                                <motion.span style={linkTextStyle} className="text-slate-600 dark:text-slate-300">
                                    {link.label}
                                </motion.span>
                            </Link>
                        )
                    ))}
                </div>



                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <ThemeToggle style={btnStyle} />
                    <motion.button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        style={btnStyle}
                        className="p-2 md:px-5 md:py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 bg-white/50 dark:bg-slate-800/50 hover:border-brand-purple hover:text-brand-purple transition-all font-medium flex items-center justify-center"
                        aria-label="Contact Us"
                    >
                        <span className="hidden md:inline">{navbarConfig.actions.contact.label}</span>
                        <MessageSquare className="w-5 h-5 md:hidden" />
                    </motion.button>
                </div>
            </div>


        </motion.nav>
    );
}
