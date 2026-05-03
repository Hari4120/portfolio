"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";
import LiquidEther from "./LiquidEther";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

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
      
      <div className="z-10 flex flex-col items-center gap-8 px-6 text-center w-full mt-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center bg-slate-950/50 p-6 md:p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl hover:border-teal-400/50 transition-colors pointer-events-auto">
          <a href={`mailto:${siteContent.config.email}`} className="font-mono text-sm tracking-widest uppercase hover:text-teal-400 transition-colors">
            {siteContent.config.email}
          </a>
          <span className="hidden md:block text-white/20">•</span>
          <span className="font-mono text-sm tracking-widest uppercase text-white/70">
            {siteContent.config.location}
          </span>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <a 
            href={siteContent.config.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 rounded-full border border-white/10 hover:border-teal-400/50 hover:bg-teal-400/10 transition-all duration-300 group"
          >
            <GithubIcon className="w-6 h-6 text-white/50 group-hover:text-teal-400 transition-colors" />
          </a>
          <a 
            href={siteContent.config.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 rounded-full border border-white/10 hover:border-teal-400/50 hover:bg-teal-400/10 transition-all duration-300 group"
          >
            <LinkedinIcon className="w-6 h-6 text-white/50 group-hover:text-teal-400 transition-colors" />
          </a>
        </div>
        
        <p className="font-mono text-white/30 text-xs tracking-widest uppercase pointer-events-none">
          &copy; {new Date().getFullYear()} {siteContent.config.author}. Engineered with Next.js, WebGL &amp; GSAP.
        </p>
      </div>
    </footer>
  );
}
