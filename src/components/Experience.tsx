"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";
import { BrainCircuit, MonitorSmartphone, ShieldAlert, Workflow, Zap, Server, LayoutDashboard } from "lucide-react";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const expIcons = [BrainCircuit, MonitorSmartphone, ShieldAlert, Workflow, Zap, Server, LayoutDashboard];

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColRef.current,
      scrub: true,
    });

    const rightItems = gsap.utils.toArray<HTMLElement>('.exp-item');
    rightItems.forEach((item) => {
      const icon = item.querySelector('.icon-element');

      gsap.fromTo(item,
        { opacity: 0.1 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            onUpdate: (self) => {
              if (self.progress > 0.9) {
                gsap.to(item, { opacity: 0.1, overwrite: "auto", duration: 0.3 });
              } else if (self.progress > 0.1) {
                gsap.to(item, { opacity: 1, overwrite: "auto", duration: 0.3 });
              } else {
                gsap.to(item, { opacity: 0.1, overwrite: "auto", duration: 0.3 });
              }
            },
            onEnter: () => {
              gsap.fromTo(icon, { scale: 0.5, rotate: -20 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" });
            },
            onEnterBack: () => {
              gsap.fromTo(icon, { scale: 0.5, rotate: 20 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" });
            }
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="w-full border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
        <div ref={leftColRef} className="w-full md:w-1/3 h-screen flex flex-col justify-center px-6 py-12 md:py-0 border-b md:border-b-0 md:border-r border-white/10 relative z-10">
          <div className="p-8">
            <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">Aug 2024 – Present</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">iCompaas</h2>
            <p className="text-white/70 font-mono text-sm mt-6 uppercase tracking-widest leading-loose">
              B2B cloud compliance &amp; security management platform serving regulated enterprises.
            </p>
          </div>
        </div>

        <div className="w-full md:w-2/3 py-[50vh] px-6 md:px-16 flex flex-col gap-[30vh]">
          {siteContent.experiences.map((exp, idx) => {
            const Icon = expIcons[idx] || Zap;
            return (
              <div key={idx} className="exp-item flex flex-col gap-6 relative opacity-10">
                <div className="absolute left-[1.65rem] top-16 w-px h-[calc(100%+8rem)] bg-gradient-to-b from-teal-400/50 via-teal-400/10 to-transparent" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                    <Icon className="icon-element w-8 h-8 text-teal-400 shrink-0" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                    {exp.title}
                  </h3>
                </div>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed font-mono pl-20 pb-8">
                  {exp.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
