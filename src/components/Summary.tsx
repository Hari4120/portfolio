"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { View, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const NUM_NODES = 64;
const GRID_SIZE = 8;
const SPACING = 2.5;

const monolithPos = Array.from({ length: NUM_NODES }, (_, i) => {
  const x = (i % 4) - 1.5;
  const y = Math.floor((i / 4) % 4) - 1.5;
  const z = Math.floor(i / 16) - 1.5;
  return new THREE.Vector3(x * 0.8, y * 0.8 + 1, z * 0.8);
});

const scatterPos = Array.from({ length: NUM_NODES }, () =>
  new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20)
);

const gridPos = Array.from({ length: NUM_NODES }, (_, i) => {
  const x = (i % GRID_SIZE) - GRID_SIZE / 2 + 0.5;
  const z = Math.floor(i / GRID_SIZE) - GRID_SIZE / 2 + 0.5;
  return new THREE.Vector3(x * SPACING, 0, z * SPACING);
});

const neighborsList = (() => {
  const list: [number, number][] = [];
  for (let i = 0; i < NUM_NODES; i++) {
    const col = i % GRID_SIZE;
    const row = Math.floor(i / GRID_SIZE);
    if (col < GRID_SIZE - 1) list.push([i, i + 1]);
    if (row < GRID_SIZE - 1) list.push([i, i + GRID_SIZE]);
  }
  return list;
})();

function SystemNodes({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const serverRef = useRef<THREE.InstancedMesh>(null);
  const _dummy = useRef(new THREE.Object3D()).current;
  const _color = useRef(new THREE.Color()).current;
  const _posI = useRef(new THREE.Vector3()).current;
  const _vec3 = useRef(new THREE.Vector3()).current;

  useFrame(({ clock }) => {
    if (!meshRef.current || !serverRef.current) return;
    const p = progressRef.current;
    const p1 = Math.min(Math.max((p - 0.0) / 0.2, 0), 1);
    const p2 = Math.min(Math.max((p - 0.2) / 0.2, 0), 1);
    const p4 = Math.min(Math.max((p - 0.6) / 0.2, 0), 1);
    const p5 = Math.min(Math.max((p - 0.8) / 0.2, 0), 1);
    const time = clock.getElapsedTime();

    for (let i = 0; i < NUM_NODES; i++) {
      _posI.lerpVectors(monolithPos[i], scatterPos[i], p1).lerp(gridPos[i], p2);

      if (p5 > 0) {
        _posI.x += (Math.random() - 0.5) * 0.15 * p5;
        _posI.z += (Math.random() - 0.5) * 0.15 * p5;
      }

      _dummy.position.copy(_posI);
      _dummy.scale.set(1, 1, 1);
      _dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, _dummy.matrix);

      const serverScaleY = p4 * 5 + (Math.sin(time * 8 + i) * 0.8 * p5);
      _dummy.position.copy(_posI).add(_vec3.set(0, -serverScaleY / 2, 0));
      _dummy.scale.set(0.5, serverScaleY, 0.5);
      _dummy.updateMatrix();
      serverRef.current.setMatrixAt(i, _dummy.matrix);

      const radius = p2 * 25;
      const distFromCenter = _posI.length();
      if (distFromCenter < radius) _color.setHex(0x2dd4bf);
      else _color.setHex(0x334155);

      meshRef.current.setColorAt(i, _color);
      serverRef.current.setColorAt(i, _color);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    serverRef.current.instanceMatrix.needsUpdate = true;
    if (serverRef.current.instanceColor) serverRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NUM_NODES]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={serverRef} args={[undefined, undefined, NUM_NODES]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial transparent opacity={0.3} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function SystemConnections({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const traceDotsRef = useRef<THREE.Points>(null);

  const linePositions = useMemo(() => new Float32Array(neighborsList.length * 6), []);
  const lineColors = useMemo(() => new Float32Array(neighborsList.length * 6), []);
  const particlePositions = useMemo(() => new Float32Array(neighborsList.length * 3), []);
  const tracePositions = useMemo(() => new Float32Array(neighborsList.length * 3), []);

  const _posI = useRef(new THREE.Vector3()).current;
  const _posN = useRef(new THREE.Vector3()).current;
  const _pt = useRef(new THREE.Vector3()).current;

  const particleIndices = useMemo(() => {
    const arr = new Float32Array(neighborsList.length);
    for (let i = 0; i < arr.length; i++) arr[i] = i % 4;
    return arr;
  }, []);

  const [atlasTexture, setAtlasTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#22d3ee";
      const paths = [
        "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
        "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
        "M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm0 12a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z",
        "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      ];
      paths.forEach((p, i) => {
        ctx.save();
        ctx.translate(i * 64 + 10, 10);
        ctx.scale(1.8, 1.8);
        ctx.fill(new Path2D(p));
        ctx.restore();
      });
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    setAtlasTexture(tex);
  }, []);

  const particleMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      atlas: { value: null },
      uOpacity: { value: 1.0 }
    },
    vertexShader: `
      attribute float iconIdx;
      varying float vIdx;
      void main() {
        vIdx = iconIdx;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 400.0 / -mvPosition.z; 
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D atlas;
      uniform float uOpacity;
      varying float vIdx;
      void main() {
        vec2 uv = gl_PointCoord;
        uv.y = 1.0 - uv.y;
        uv.x = (uv.x + vIdx) * 0.25;
        vec4 texColor = texture2D(atlas, uv);
        gl_FragColor = vec4(texColor.rgb, texColor.a * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }), []);

  useEffect(() => {
    if (atlasTexture && particlesRef.current?.material) {
      const material = particlesRef.current.material as THREE.ShaderMaterial;
      material.uniforms.atlas.value = atlasTexture;
      material.needsUpdate = true;
    }
  }, [atlasTexture]);

  useFrame(({ clock }) => {
    if (!linesRef.current || !particlesRef.current || !traceDotsRef.current) return;
    const p = progressRef.current;
    const p1 = Math.min(Math.max((p - 0.0) / 0.2, 0), 1);
    const p2 = Math.min(Math.max((p - 0.2) / 0.2, 0), 1);
    const p3 = Math.min(Math.max((p - 0.4) / 0.2, 0), 1);
    const p5 = Math.min(Math.max((p - 0.8) / 0.2, 0), 1);
    const time = clock.getElapsedTime();

    const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
    const colors = linesRef.current.geometry.attributes.color.array as Float32Array;
    const partPos = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const tracePos = traceDotsRef.current.geometry.attributes.position.array as Float32Array;

    let lineIdx = 0;
    let colorIdx = 0;
    let partIdx = 0;
    let traceIdx = 0;

    const radius = p2 * 25;

    neighborsList.forEach(([i, n]) => {
      _posI.lerpVectors(monolithPos[i], scatterPos[i], p1).lerp(gridPos[i], p2);
      _posN.lerpVectors(monolithPos[n], scatterPos[n], p1).lerp(gridPos[n], p2);

      positions[lineIdx++] = _posI.x;
      positions[lineIdx++] = _posI.y;
      positions[lineIdx++] = _posI.z;
      positions[lineIdx++] = _posN.x;
      positions[lineIdx++] = _posN.y;
      positions[lineIdx++] = _posN.z;

      const dI = _posI.length();
      const dN = _posN.length();

      if (dI < radius) { colors[colorIdx++] = 0.17; colors[colorIdx++] = 0.83; colors[colorIdx++] = 0.75; }
      else { colors[colorIdx++] = 0.20; colors[colorIdx++] = 0.25; colors[colorIdx++] = 0.33; }

      if (dN < radius) { colors[colorIdx++] = 0.17; colors[colorIdx++] = 0.83; colors[colorIdx++] = 0.75; }
      else { colors[colorIdx++] = 0.20; colors[colorIdx++] = 0.25; colors[colorIdx++] = 0.33; }

      const minD = Math.min(dI, dN);
      const maxD = Math.max(dI, dN);

      if (radius > minD && radius < maxD) {
        const t = (radius - minD) / (maxD - minD);
        const start = dI < dN ? _posI : _posN;
        const end = dI < dN ? _posN : _posI;
        _pt.copy(start).lerp(end, t);
        tracePos[traceIdx++] = _pt.x;
        tracePos[traceIdx++] = _pt.y + 0.05;
        tracePos[traceIdx++] = _pt.z;
      } else {
        tracePos[traceIdx++] = 999; tracePos[traceIdx++] = 999; tracePos[traceIdx++] = 999;
      }

      if (p3 > 0) {
        const speed = 2.0;
        const travel = (time * speed + i * 0.1) % 1;
        _pt.copy(_posI).lerp(_posN, travel);
        partPos[partIdx++] = _pt.x;
        partPos[partIdx++] = _pt.y + 0.1;
        partPos[partIdx++] = _pt.z;
      } else {
        partPos[partIdx++] = 999; partPos[partIdx++] = 999; partPos[partIdx++] = 999;
      }
    });

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    traceDotsRef.current.geometry.attributes.position.needsUpdate = true;

    (linesRef.current.material as THREE.LineBasicMaterial).opacity = p1 * 0.3;
    if (particlesRef.current.material instanceof THREE.ShaderMaterial) {
      particlesRef.current.material.uniforms.uOpacity.value = p3 * 1.0;
    }
    (traceDotsRef.current.material as THREE.PointsMaterial).opacity = (p2 > 0 && p2 < 1) ? 0.3 : 0;
  });

  return (
    <group>
      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0} depthWrite={false} />
      </lineSegments>
      <points ref={particlesRef} frustumCulled={false} material={particleMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
          <bufferAttribute attach="attributes-iconIdx" args={[particleIndices, 1]} />
        </bufferGeometry>
      </points>
      <points ref={traceDotsRef} frustumCulled={false}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[tracePositions, 3]} /></bufferGeometry>
        <pointsMaterial color="#f8fafc" size={0.7} transparent depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

function CameraManager({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const _vec3 = useRef(new THREE.Vector3()).current;

  useFrame((state) => {
    const p = progressRef.current;
    const p4 = Math.min(Math.max((p - 0.6) / 0.2, 0), 1);
    const p5 = Math.min(Math.max((p - 0.8) / 0.2, 0), 1);
    const target = _vec3.set(THREE.MathUtils.lerp(0, 18, p4), THREE.MathUtils.lerp(22, 14, p4), THREE.MathUtils.lerp(0.1, 18, p4));
    if (p5 > 0) { target.x += (Math.random() - 0.5) * 0.5 * p5; target.y += (Math.random() - 0.5) * 0.5 * p5; }
    state.camera.position.lerp(target, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

import { siteContent } from "@/data/content";

const texts = siteContent.summaryPhases;

const wordVariants = {
  hidden: (d: number) => ({ opacity: 0, filter: "blur(10px)", x: d * 20 }),
  visible: { opacity: 1, filter: "blur(0px)", x: 0, transition: { duration: 0.6 } },
  exit: (d: number) => ({ opacity: 0, filter: "blur(10px)", x: d * -20, transition: { duration: 0.4 } })
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.02 } }
};

export default function Summary() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [activePhase, setActivePhase] = useState(0);
  const [load, setLoad] = useState(10);
  const [showUI, setShowUI] = useState(false);
  const [direction, setDirection] = useState(1);

  useGSAP(() => {
    if (!containerRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=400%",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const phase = Math.min(Math.floor(self.progress * 5), 4);
        setActivePhase((prev) => {
          if (prev !== phase) {
            setDirection(phase > prev ? 1 : -1);
            return phase;
          }
          return prev;
        });
        if (self.progress > 0.8) {
          setShowUI(true);
          setLoad(Math.min(99.9, 10 + ((self.progress - 0.8) / 0.2) * 90));
        } else setShowUI(false);
      }
    });
    return () => trigger.kill();
  }, []);

  return (
    <section id="summary" ref={containerRef} className="relative z-10 w-full h-screen border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <View className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 22, 0.1]} fov={45} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
          <SystemNodes progressRef={progressRef} />
          <SystemConnections progressRef={progressRef} />
          <CameraManager progressRef={progressRef} />
        </View>
      </div>

      <AnimatePresence>
        {showUI && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="absolute top-24 md:top-32 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 bg-slate-950/50 backdrop-blur-xl border border-slate-800 p-6 md:p-8 rounded-2xl text-teal-400 z-50 flex flex-col gap-3 md:gap-4 shadow-[0_0_20px_rgba(45,212,191,0.05)] w-[90%] max-w-[300px] md:w-64">
            <div className="flex justify-between gap-12 font-bold text-sm tracking-widest"><span>SYSTEM LOAD</span><span className="text-white">{load.toFixed(1)}%</span></div>
            <div className="flex justify-between gap-12 font-bold text-sm tracking-widest"><span>UPTIME</span><span className="text-teal-400">100.00%</span></div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2 border border-slate-700/50"><div className="h-full bg-teal-400 shadow-[0_0_10px_#2dd4bf]" style={{ width: `${load}%` }} /></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center pb-24 md:pb-32 px-8">
        <AnimatePresence custom={direction}>
          <motion.h2
            key={activePhase}
            custom={direction}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-24 md:bottom-32 text-2xl md:text-4xl font-bold max-w-4xl text-center text-white tracking-tight leading-relaxed drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] [text-shadow:0_0_20px_rgba(255,255,255,0.4)] flex flex-wrap justify-center gap-[0.25em]"
          >
            {texts[activePhase].split(" ").map((word, i) => (
              <motion.span key={i} custom={direction} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </AnimatePresence>
      </div>
    </section>
  );
}