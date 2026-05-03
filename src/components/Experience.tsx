"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";
import { BrainCircuit, MonitorSmartphone, ShieldAlert, Workflow, Zap, Server, LayoutDashboard, FlaskConical, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_ICONS = [BrainCircuit, MonitorSmartphone, ShieldAlert, Workflow, Zap, Server, LayoutDashboard, FlaskConical, Lock];

function DurationCounter({ period }: { period: string }) {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const calc = () => {
      try {
        const parts = period.split(/[-–—]/).map(s => s.trim());
        if (parts.length !== 2) return;

        let start = new Date(parts[0]);
        if (isNaN(start.getTime())) start = new Date(`${parts[0]} 01, ${parts[0]}`);

        let end = parts[1].toLowerCase() === 'present' ? new Date() : new Date(parts[1]);
        if (isNaN(end.getTime())) end = new Date(`${parts[1]} 12, 31`);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = Math.floor((diffDays % 365) % 30);

        let res = "";
        if (years > 0) res += `${years}y `;
        if (months > 0) res += `${months}m `;
        res += `${days}d`;

        setDuration(res);
      } catch (e) {
        // ignore
      }
    };
    calc();
    const interval = setInterval(calc, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, [period]);

  if (!duration) return null;

  return (
    <span className="text-[10px] text-teal-400 font-mono tracking-widest opacity-60">
      {duration}
    </span>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const [activeBlockIdx, setActiveBlockIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const updateIndex = (newIndex: number) => {
    setActiveBlockIdx((prev) => {
      if (prev !== newIndex) {
        setDirection(newIndex > prev ? 1 : -1);
      }
      return newIndex;
    });
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        scrub: true,
      });

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400",
          scrub: 1,
        }
      });

      entranceTl.fromTo('.left-col-elem',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      )
        .fromTo('.sticky-bg',
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo('.sticky-content',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 130%", // Starts fading out just before the section unpins
          end: "bottom 100%", // Finishes fading out exactly as it unpins
          scrub: 1,
        }
      });

      exitTl.to('.sticky-content', { opacity: 0, y: -20, duration: 0.6, ease: "power3.in" })
            .to('.sticky-bg', { opacity: 0, duration: 0.8, ease: "power2.in" }, "-=0.4")
            .to('.left-col-elem', { opacity: 0, x: -30, duration: 0.8, stagger: -0.2, ease: "power3.in" }, "-=0.6");
    });

    // Mobile specific basic entrance
    mm.add("(max-width: 767px)", () => {
      gsap.to('.left-col-elem', { opacity: 1, x: 0, duration: 0.8, stagger: 0.1 });
      gsap.to('.sticky-bg', { opacity: 1, duration: 0.8 });
      gsap.to('.sticky-content', { opacity: 1, y: 0, duration: 0.8 });
    });

    const rightItems = gsap.utils.toArray<HTMLElement>('.exp-item');
    rightItems.forEach((item) => {
      const icon = item.querySelector('.icon-element');

      gsap.fromTo(item,
        { opacity: 0.05 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(item,
        { opacity: 1 },
        {
          opacity: 0.01,
          immediateRender: false,
          scrollTrigger: {
            trigger: item,
            start: "center 30%",
            end: "center 15%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(icon,
        { scale: 0.5, rotate: -20 },
        {
          scale: 1,
          rotate: 0,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
          }
        }
      );
    });

    const blocks = gsap.utils.toArray<HTMLElement>('.company-block');
    blocks.forEach((block, index) => {
      ScrollTrigger.create({
        trigger: block,
        start: "top 75%",
        end: "bottom 75%",
        onEnter: () => updateIndex(index),
        onEnterBack: () => updateIndex(index),
        onLeaveBack: () => {
          if (index > 0) updateIndex(index - 1);
        }
      });
    });

  }, []);

  const allBlocks = siteContent.experienceBlocks;
  const activeBlock = allBlocks[activeBlockIdx] || allBlocks[0];
  let globalIconIdx = 0;

  return (
    <section id="experience" ref={sectionRef} className="w-full border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
        <div ref={leftColRef} className="w-full md:w-1/3 h-auto md:h-screen flex flex-col justify-center px-6 md:pr-12 lg:pr-24 py-12 md:py-0 border-b md:border-b-0 md:border-r border-white/10 relative z-10">
          <div className="p-8 md:p-0">
            <p className="left-col-elem opacity-0 text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">Professional Timeline</p>
            <h2 className="left-col-elem opacity-0 text-5xl md:text-7xl font-bold tracking-tighter text-white">Experience</h2>
            <p className="left-col-elem opacity-0 text-white/70 font-mono text-sm mt-6 uppercase tracking-widest leading-loose">
              Building enterprise-grade software across security, AI, and cloud infrastructure.
            </p>
          </div>
        </div>

        <div className="w-full md:w-2/3 pt-[30vh] pb-[50vh] px-6 md:pl-20 lg:pl-32 md:pr-12 flex flex-col relative">

          <div className="sticky top-[72px] md:top-[80px] z-30 pt-8 pb-8 mb-12 min-h-[160px]">
            <div className="sticky-bg opacity-0 absolute inset-0 bg-slate-950/95 blur-[10px] pointer-events-none" />

            <div className="sticky-content opacity-0 relative z-10 px-4 md:px-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeBlockIdx}
                  custom={direction}
                  variants={{
                    initial: (dir: number) => ({ opacity: 0, y: dir > 0 ? 20 : -20 }),
                    animate: { opacity: 1, y: 0 },
                    exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -20 : 20 }),
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-teal-400 font-mono text-xs tracking-widest uppercase">
                      {activeBlock.period}
                    </p>
                    {activeBlock.period.toLowerCase().includes("present") && (
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf] animate-pulse" />
                    )}
                  </div>
                  <div className="flex items-end gap-4">
                    <h3 className="text-3xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-sm">
                      {activeBlock.company}
                    </h3>
                    <DurationCounter period={activeBlock.period} />
                  </div>
                  <p className="text-white/60 font-mono text-sm mt-2 tracking-wide max-w-xl min-h-[40px]">
                    {activeBlock.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-[60vh] md:pt-[80vh]">
            {allBlocks.map((block, blockIdx) => {
              const blockItems = block.items.map((exp, idx) => {
                const iconIdx = globalIconIdx++;
                const Icon = ALL_ICONS[iconIdx % ALL_ICONS.length];
                return (
                  <div key={idx} className="exp-item flex flex-col gap-6 relative opacity-10 mb-[20vh]">
                    <div className="absolute left-[1.65rem] top-14 w-px h-[30vh] bg-gradient-to-b from-teal-400/50 via-teal-400/10 to-transparent z-0 pointer-events-none" />
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                        <Icon className="icon-element w-8 h-8 text-teal-400 shrink-0" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                        {exp.title}
                      </h3>
                    </div>
                    <p className="text-white text-lg md:text-xl leading-relaxed font-mono pl-20 pb-8">
                      {exp.description}
                    </p>
                  </div>
                );
              });

              return (
                <div key={blockIdx} className="company-block relative mb-[20vh]">
                  <div className="flex flex-col">
                    {blockItems}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}