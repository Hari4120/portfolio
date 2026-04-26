"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function VelocityMetrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(row1Ref.current, {
      xPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(row2Ref.current, {
      xPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="w-full py-32 overflow-hidden border-t border-white/5">
      <div className="flex flex-col gap-8 md:gap-16 opacity-80 mix-blend-difference">
        <div ref={row1Ref} className="flex whitespace-nowrap gap-16 ml-[10vw]">
          <h2 className="text-[clamp(4rem,10vw,12rem)] font-black uppercase tracking-tighter leading-none text-transparent stroke-text">
            40% LATENCY REDUCTION
          </h2>
          <h2 className="text-[clamp(4rem,10vw,12rem)] font-black uppercase tracking-tighter leading-none text-white">
            40% LATENCY REDUCTION
          </h2>
        </div>

        <div ref={row2Ref} className="flex whitespace-nowrap gap-16 -ml-[50vw]">
          <h2 className="text-[clamp(4rem,10vw,12rem)] font-black uppercase tracking-tighter leading-none text-white">
            10K+ USER SYNCS
          </h2>
          <h2 className="text-[clamp(4rem,10vw,12rem)] font-black uppercase tracking-tighter leading-none text-transparent stroke-text">
            10K+ USER SYNCS
          </h2>
          <h2 className="text-[clamp(4rem,10vw,12rem)] font-black uppercase tracking-tighter leading-none text-white">
            10K+ USER SYNCS
          </h2>
        </div>
      </div>
      
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px white;
          color: transparent;
        }
      `}</style>
    </section>
  );
}
