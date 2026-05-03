"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";
import { siteContent } from "@/data/content";
import { FileDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function NavBar() {
  const lenis = useLenis();
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setIsOpen(false);
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.5 });
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-3 bg-slate-950/40 backdrop-blur-md border-b border-white/5 text-white transition-all duration-300">
        <div className="font-bold text-xl tracking-tighter uppercase">
          AB
        </div>
        <div className="flex gap-4 md:gap-8 items-center">
          {siteContent.nav.map((item, index) => (
            <a 
              key={index} 
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="hidden md:block text-xs md:text-sm font-bold uppercase tracking-widest hover:text-teal-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a 
            href={siteContent.config.resumePath}
            download
            className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest bg-teal-400/10 text-teal-400 px-4 py-2 rounded-full border border-teal-400/20 hover:bg-teal-400/20 hover:border-teal-400/50 transition-all"
          >
            Resume
            <FileDown className="w-4 h-4" />
          </a>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-teal-400 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            {siteContent.nav.map((item, index) => (
              <a 
                key={index} 
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-2xl font-bold uppercase tracking-widest text-white/80 hover:text-teal-400 border-b border-white/10 pb-4"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
