"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { View, PerspectiveCamera } from "@react-three/drei";
import { motion, Variants } from "framer-motion";
import * as THREE from "three";
import { siteContent } from "@/data/content";

function ParticleGrid() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;

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
          style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)", lineHeight: 1 }}
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
