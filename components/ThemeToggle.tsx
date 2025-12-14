"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
    style?: MotionProps["style"];
}

export function ThemeToggle({ className, style, ...props }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 opacity-50" />
        );
    }

    return (
        <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
                "p-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors",
                className
            )}
            style={style}
            aria-label="Toggle theme"
            {...props as any}
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
            </div>
        </motion.button>
    );
}
