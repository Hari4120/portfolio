"use client";

import { siteContent } from "@/data/content";

export default function SkillsMarquee() {
  const skills = siteContent.skills;
  
  const chunkSize = Math.ceil(skills.length / 4);
  const row1 = skills.slice(0, chunkSize);
  const row2 = skills.slice(chunkSize, chunkSize * 2);
  const row3 = skills.slice(chunkSize * 2, chunkSize * 3);
  const row4 = skills.slice(chunkSize * 3);

  const renderRow = (items: string[], direction: 'left' | 'right', speed: number) => {
    const ItemSet = () => (
      <div className="flex shrink-0 gap-6 md:gap-12 items-center">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="px-6 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 rounded-full hover:bg-teal-400 hover:text-black transition-colors duration-300 cursor-default"
          >
            <span className="text-xl md:text-4xl font-black uppercase tracking-tighter mix-blend-normal whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    );

    return (
      <div className="flex overflow-hidden w-[200vw] -ml-[50vw]">
        <div 
          className="flex gap-6 md:gap-12"
          style={{ animation: `marquee-${direction} ${speed}s linear infinite` }}
        >
          <ItemSet />
          <ItemSet />
          <ItemSet />
          <ItemSet />
        </div>
      </div>
    );
  };

  return (
    <section 
      id="skills" 
      className="w-full min-h-screen flex flex-col justify-center py-32 border-t border-white/10 overflow-hidden relative"
    >
      <div className="absolute top-24 w-full text-center z-10 px-6">
        <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">Technical Arsenal</p>
        <h2 className="text-5xl font-bold uppercase tracking-tight text-white">Full Stack Scope</h2>
      </div>

      <div className="flex flex-col gap-8 md:gap-16 mt-32">
        <div className="transform -rotate-1 scale-105">{renderRow(row1, 'left', 40)}</div>
        <div className="transform rotate-1 scale-105 mt-4">{renderRow(row2, 'right', 45)}</div>
        <div className="transform -rotate-1 scale-105 mt-4">{renderRow(row3, 'left', 35)}</div>
        <div className="transform rotate-1 scale-105 mt-4">{renderRow(row4, 'right', 50)}</div>
      </div>
      
      <div className="absolute inset-y-0 left-0 w-[15vw] bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
      <div className="absolute inset-y-0 right-0 w-[15vw] bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />
    </section>
  );
}
