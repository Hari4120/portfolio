"use client";

import { useLenis } from "lenis/react";
import { siteContent } from "@/data/content";

export default function NavBar() {
  const lenis = useLenis();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.5 });
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-slate-950/40 backdrop-blur-md border-b border-white/5 text-white transition-all duration-300">
      <div className="font-bold text-xl tracking-tighter uppercase">
        AB
      </div>
      <div className="flex gap-4 md:gap-8 items-center">
        {siteContent.nav.map((item, index) => (
          <a 
            key={index} 
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="text-xs md:text-sm font-bold uppercase tracking-widest hover:text-teal-400 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
