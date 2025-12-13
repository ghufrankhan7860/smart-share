"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navbarConfig } from "@/config/navbar";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href={navbarConfig.logo.href} className="flex items-center gap-2">
          <img 
            src={navbarConfig.logo.src} 
            alt={navbarConfig.logo.alt} 
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {navbarConfig.logo.text}
          </span>
        </Link>
        
        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navbarConfig.links.map((link) => (
            link.hasDropdown ? (
              <div key={link.label} className="group relative cursor-pointer flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-brand-purple dark:hover:text-brand-purple transition-colors font-medium">
                {link.label}
                <ChevronDown className="w-4 h-4" />
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl rounded-xl p-2 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible translate-y-2 group-hover:translate-y-0">
                  {link.dropdownItems?.map((item) => (
                    <div key={item.label} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer text-slate-600 dark:text-slate-300 hover:text-brand-purple dark:hover:text-brand-purple">
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.label} href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-brand-purple dark:hover:text-brand-purple transition-colors font-medium">
                {link.label}
              </Link>
            )
          ))}
        </div>



        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium hover:border-brand-purple hover:text-brand-purple transition-all bg-white/50 dark:bg-slate-800/50"
          >
            {navbarConfig.actions.contact.label}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="p-6 space-y-4 flex flex-col">
              {navbarConfig.links.map((link) => (
                <Link key={link.label} href={link.href} className="text-lg font-medium text-slate-900 dark:text-white">
                  {link.label}
                </Link>
              ))}
              <hr className="border-slate-100 dark:border-slate-800" />
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-xl bg-brand-purple text-white font-bold"
              >
                {navbarConfig.actions.contact.label}
              </button>
              <div className="pt-4 flex justify-center">
                 <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
