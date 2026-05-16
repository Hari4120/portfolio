"use client";

import { useRef, MouseEvent } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { siteContent } from "@/data/content";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireframeGraph() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (mesh.current) {
      mesh.current.rotation.x = s.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = s.clock.getElapsedTime() * 0.15;
    }
  });
  return (
    <mesh ref={mesh} scale={1.2}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function DashboardChart() {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(s.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  return (
    <group ref={group} scale={1.2} position={[0, -0.5, 0]}>
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[2.5, 1.8]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.05} side={THREE.DoubleSide} />
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.5, 1.8)]} />
          <lineBasicMaterial color="#2dd4bf" transparent opacity={0.2} />
        </lineSegments>
      </mesh>

      <mesh position={[-0.8, -0.2, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.2]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-0.3, 0.2, 0]}>
        <boxGeometry args={[0.3, 1.6, 0.2]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.2, -0.1, 0]}>
        <boxGeometry args={[0.3, 1.0, 0.2]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.7, -0.4, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.2]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.7} />
      </mesh>

      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([-1, -0.2, 0.2, -0.5, 0.4, 0.2, 0, 0, 0.2, 0.5, 0.6, 0.2, 1, 0.1, 0.2]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.8} linewidth={2} />
      </line>
    </group>
  );
}

function LowPolyPadlock() {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (s.pointer.x * Math.PI) / 4, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -(s.pointer.y * Math.PI) / 4, 0.05);
    }
  });
  return (
    <group ref={group} scale={1.8}>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.2, 1, 0.5]} />
        <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.4, 0.1, 4, 8, Math.PI]} />
        <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.5} />
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
      mesh.current.rotation.z = time * 0.2;
      ring.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }
  });
  return (
    <group scale={1.8}>
      <mesh ref={mesh}>
        <torusGeometry args={[0.8, 0.05, 3, 16]} />
        <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[0.6, 0.02, 8, 32]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } },
};

function BentoCard({ project, index }: { project: typeof siteContent.projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { margin: "-20% 0px -20% 0px" });

  const rawDesc = project.description;
  const stackMatch = rawDesc.match(/\(([^)]+)\)$/);
  const techStack = stackMatch ? stackMatch[1] : "";
  const mainDesc = rawDesc.replace(/\s*\([^)]+\)$/, "");
  const sentences = mainDesc.split(". ").filter(s => s.length > 0).map(s => s.endsWith(".") ? s : s + ".");

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
      className={`group relative flex flex-col justify-between overflow-hidden border-r border-b border-white/10 bg-transparent min-h-[450px] ${project.colSpan} p-8 md:p-12 ${isInView ? 'is-active' : ''}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 max-md:group-[.is-active]:opacity-100 md:group-hover:opacity-100 z-20"
        style={{ background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(45, 212, 191, 0.08) 0%, transparent 100%)' }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-[60%] md:w-[40%] flex items-center justify-center opacity-[0.08] pointer-events-none z-0 transition-opacity duration-700 max-md:group-[.is-active]:opacity-20 md:group-hover:opacity-20">
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          {project.animationType === 'pulse' && <WireframeGraph />}
          {project.animationType === 'orbit' && <LowPolyPadlock />}
          {project.animationType === 'secure' && <SecurityShield />}
          {project.animationType === 'chart' && <DashboardChart />}
        </Canvas>
      </div>

      <div className="relative z-10 w-full lg:w-3/4 flex flex-col gap-6">
        <div className="flex items-center gap-3 text-teal-400 font-mono text-[10px] tracking-[0.3em] uppercase opacity-80">
          <span className="w-1.5 h-1.5 bg-teal-400" />
          SYS.MOD.0{index + 1}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white uppercase leading-none">
            {project.title.split(" — ")[0]}
          </h3>
          {project.title.split(" — ")[1] && (
            <p className="text-teal-400/80 font-mono text-sm tracking-widest mt-1">
              {project.title.split(" — ")[1]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {sentences.map((sentence, i) => (
            <p key={i} className="text-white/60 font-sans text-sm md:text-base leading-relaxed">
              {sentence}
            </p>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 mt-16 pt-8 border-t border-white/10 w-full">
        {techStack && (
          <p className="font-mono text-[9px] uppercase tracking-widest">
            <span className="text-white/30 mr-3">[STACK]</span>
            <span className="text-teal-400/70">{techStack}</span>
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {project.telemetry.map((metric, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <span className="text-[9px] text-white/30 font-mono uppercase tracking-[0.2em]">{metric.label}</span>
              <span className="text-sm md:text-base text-white font-mono font-medium tracking-wide">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section id="projects" className="w-full py-32 px-6 md:px-12 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col gap-4">
          <p className="text-teal-400 font-mono text-sm tracking-[0.3em] uppercase">Architecture & Execution</p>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            Featured<br />Engineering
          </h2>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10"
        >
          {siteContent.projects.map((project, idx) => (
            <BentoCard key={idx} project={project} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}