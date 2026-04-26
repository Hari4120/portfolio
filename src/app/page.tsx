"use client";

import { useRef } from "react";
import Hero from "@/components/Hero";
import Summary from "@/components/Summary";
import Experience from "@/components/Experience";
import VelocityMetrics from "@/components/VelocityMetrics";
import BentoGrid from "@/components/BentoGrid";
import SkillsMarquee from "@/components/SkillsMarquee";
import Footer from "@/components/Footer";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="relative w-full selection:bg-white selection:text-black z-10">
      <Hero />
      <Summary />
      <Experience />
      <VelocityMetrics />
      <BentoGrid />
      <SkillsMarquee />
      <Footer />

      <Canvas
        eventSource={containerRef}
        className="pointer-events-none"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      >
        <View.Port />
      </Canvas>
    </main>
  );
}
