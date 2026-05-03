"use client";

import { useRef, MouseEvent, useState, useEffect } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { siteContent } from "@/data/content";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireframeGraph() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (mesh.current) {
      mesh.current.rotation.x = s.clock.getElapsedTime() * 0.5;
      mesh.current.rotation.y = s.clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#2dd4bf" wireframe />
    </mesh>
  );
}

function LowPolyPadlock() {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (s.pointer.x * Math.PI) / 4, 0.1);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -(s.pointer.y * Math.PI) / 4, 0.1);
    }
  });
  return (
    <group ref={group}>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.2, 1, 0.5]} />
        <meshBasicMaterial color="#2dd4bf" wireframe />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.4, 0.1, 4, 8, Math.PI]} />
        <meshBasicMaterial color="#2dd4bf" wireframe />
      </mesh>
    </group>
  );
}

function SecurityShield() {
  const mesh = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (mesh.current && ring.current) {
      const time = s.clock.getElapsedTime();
      mesh.current.rotation.z = time * 0.5;
      ring.current.scale.setScalar(1 + Math.sin(time * 3) * 0.05);
    }
  });
  return (
    <group>
      <mesh ref={mesh}>
        <torusGeometry args={[0.8, 0.05, 3, 16]} />
        <meshBasicMaterial color="#2dd4bf" wireframe />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[0.6, 0.02, 8, 32]} />
        <meshBasicMaterial color="#2dd4bf" />
      </mesh>
    </group>
  );
}

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } },
};

function BentoCard({ project, index }: { project: typeof siteContent.projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { margin: "-50% 0px -50% 0px" });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 min-h-[350px] ${project.colSpan} p-[1px] ${isInView ? 'is-active' : ''}`}
    >
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:group-[.is-active]:opacity-100 z-20"
        style={{ background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(45, 212, 191, 0.15) 0%, transparent 100%)' }}
      />
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#2dd4bf_360deg)] opacity-0 group-hover:opacity-30 max-md:group-[.is-active]:opacity-30 animate-[spin_4s_linear_infinite] z-0 pointer-events-none" />
      
      <div className="relative rounded-[15px] bg-slate-950/90 backdrop-blur-3xl z-10 flex flex-col flex-1 overflow-hidden">
        <div className="h-8 border-b border-white/5 flex items-center justify-between px-4 bg-white/[0.02]">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-red-500 max-md:group-[.is-active]:bg-red-500 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-yellow-500 max-md:group-[.is-active]:bg-yellow-500 transition-colors delay-75" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-green-500 max-md:group-[.is-active]:bg-green-500 transition-colors delay-150" />
          </div>
          <span className="text-[10px] font-mono text-slate-500 tracking-widest">SYS.MOD.0{index + 1}</span>
        </div>

        <div className="flex-1 p-8 flex flex-col justify-end gap-6 relative">
          <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-teal-400/5 border border-teal-400/20 shadow-[0_0_15px_rgba(45,212,191,0.05)] overflow-hidden">
            <Canvas className="w-full h-full cursor-none">
              <PerspectiveCamera makeDefault position={[0, 0, 3]} />
              <ambientLight intensity={0.5} />
              {project.animationType === 'pulse' && <WireframeGraph />}
              {project.animationType === 'orbit' && <LowPolyPadlock />}
              {project.animationType === 'secure' && <SecurityShield />}
            </Canvas>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-50 mb-2">
              {project.title}
            </h3>
            <p className="text-slate-400 font-mono text-sm tracking-wide leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4 border-t border-white/5 mt-auto">
            {project.telemetry.map((metric, i) => (
              <div key={i} className="flex flex-col gap-1 p-2 bg-black/20 rounded-md border border-white/5">
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">{metric.label}</span>
                <span className="text-xs text-teal-400 font-mono font-bold tracking-wider">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section id="projects" className="w-full py-32 px-6 md:px-12 border-t border-white/10" style={{ perspective: "1000px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">Architecture &amp; Execution</p>
          <h2 className="text-5xl font-bold uppercase tracking-tight text-white">Featured Engineering</h2>
        </div>
        
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-250px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {siteContent.projects.map((project, idx) => (
            <BentoCard key={idx} project={project} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
