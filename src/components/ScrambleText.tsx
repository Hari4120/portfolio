"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "+-•~*/\\|";

export default function ScrambleText({ text, duration = 600, delay = 0 }: { text: string; duration?: number; delay?: number }) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, "\u00A0"));
  const [isScrambling, setIsScrambling] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;

    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const startScramble = () => {
      setIsScrambling(true);
      const startTime = Date.now();

      interval = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        if (progress >= 1) {
          setDisplayText(text);
          setIsScrambling(false);
          clearInterval(interval);
          return;
        }

        const scrambleCount = Math.floor(text.length * progress);
        const nextText = text.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < scrambleCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("");

        setDisplayText(nextText);
      }, 40);
    };

    if (delay > 0) {
      timeout = setTimeout(startScramble, delay);
    } else {
      startScramble();
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, duration, delay, isInView]);

  return (
    <span
      ref={ref}
      className={`transition-opacity duration-300 ${isScrambling ? "opacity-60 tracking-widest font-mono text-teal-400/80" : "opacity-100"}`}
    >
      {displayText}
    </span>
  );
}
