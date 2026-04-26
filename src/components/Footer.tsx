"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";
import LiquidEther from "./LiquidEther";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const monolithRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(monolithRef.current,
      { scale: 5, opacity: 0, y: 150 },
      {
        scale: 1, opacity: 1, y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="w-full pt-32 pb-16 border-t border-white/10 flex flex-col items-center justify-between min-h-screen overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full z-0 opacity-100 mix-blend-screen pointer-events-auto">
        <LiquidEther
          colors={['#4c1d95', '#9333ea', '#d8b4fe']}
          mouseForce={20}
          cursorSize={100}
          resolution={0.25}
          isViscous={false}
          autoDemo={true}
          autoSpeed={0.25}
          autoIntensity={1.2}
          autoResumeDelay={2000}
          takeoverDuration={0.5}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 z-0 pointer-events-none" />

      <div className="z-10 flex flex-col items-center justify-center select-none mt-auto mb-16 w-full pointer-events-none">
        <h2 
          ref={monolithRef}
          className="text-[clamp(3rem,12vw,15rem)] font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap origin-center"
        >
          LET&apos;S BUILD
        </h2>
      </div>
      
      <div className="z-10 flex flex-col items-center gap-12 px-6 text-center w-full mt-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center bg-slate-950/50 p-6 md:p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl hover:border-teal-400/50 transition-colors pointer-events-auto">
          <a href={`mailto:${siteContent.config.email}`} className="font-mono text-sm tracking-widest uppercase hover:text-teal-400 transition-colors">
            {siteContent.config.email}
          </a>
          <span className="hidden md:block text-white/20">•</span>
          <span className="font-mono text-sm tracking-widest uppercase text-white/70">
            {siteContent.config.phone}
          </span>
          <span className="hidden md:block text-white/20">•</span>
          <span className="font-mono text-sm tracking-widest uppercase text-white/70">
            {siteContent.config.location}
          </span>
        </div>
        
        <p className="font-mono text-white/30 text-xs tracking-widest uppercase pointer-events-none">
          &copy; {new Date().getFullYear()} {siteContent.config.author}. Engineered with Next.js, WebGL &amp; GSAP.
        </p>
      </div>
    </footer>
  );
}
