"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { View, PerspectiveCamera } from "@react-three/drei";
import { motion, Variants } from "framer-motion";
import * as THREE from "three";
import { siteContent } from "@/data/content";
import { FileDown } from "lucide-react";

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

function ParticleGrid() {
  const pointsRef = useRef<THREE.Points>(null);
  const [count, setCount] = useState(1000);

  useEffect(() => {
    const handleResize = () => setCount(window.innerWidth < 768 ? 800 : 3000);
    handleResize(); // init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
    }
    return pos;
  }, [count]);

  const scrollRef = useRef(0);
  const lastScrollRef = useRef(0);
  const currentRotRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => scrollRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const currentScroll = scrollRef.current;
    const velocity = currentScroll - lastScrollRef.current;
    lastScrollRef.current = currentScroll;

    currentRotRef.current += delta * 0.05 + velocity * 0.001;
    pointsRef.current.rotation.y = currentRotRef.current;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;

    const targetX = (state.pointer.x * state.viewport.width) / 20;
    const targetY = (state.pointer.y * state.viewport.height) / 20;
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.02);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.02);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function FadeInText({ text }: { text: string }) {
  return (
    <motion.span 
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      className="inline-block relative text-teal-400 font-bold drop-shadow-[0_0_10px_rgba(45,212,191,0.4)]"
    >
      {text}
    </motion.span>
  );
}

const sentence: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.05 },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <View className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
          <ParticleGrid />
        </View>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none" />
      </div>

      <div className="z-10 text-center flex flex-col items-center justify-center w-full h-full px-4 mt-12 mix-blend-difference">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.8)_0%,transparent_50%)] pointer-events-none -z-10" />
        <motion.h1
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="font-bold uppercase tracking-tighter text-white flex justify-center w-full"
          style={{ fontSize: "clamp(1.8rem, 6vw, 8rem)", lineHeight: 1 }}
        >
          {siteContent.hero.heading.split("").map((char, index) => (
            <motion.span key={index} variants={letter} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        
        <div className="mt-8 text-sm md:text-xl font-mono tracking-[0.2em] uppercase text-white/80 max-w-2xl text-center min-h-[30px]">
          <FadeInText text={siteContent.hero.tagline} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 flex items-center gap-4"
        >
          <a 
            href={siteContent.config.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-white/20 hover:border-teal-400/60 hover:bg-teal-400/10 transition-all duration-300 group"
          >
            <GithubIcon className="w-5 h-5 text-white/70 group-hover:text-teal-400 transition-colors" />
          </a>
          <a 
            href={siteContent.config.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-white/20 hover:border-teal-400/60 hover:bg-teal-400/10 transition-all duration-300 group"
          >
            <LinkedinIcon className="w-5 h-5 text-white/70 group-hover:text-teal-400 transition-colors" />
          </a>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
