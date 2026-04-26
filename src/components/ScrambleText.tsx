"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?/~`";

export default function ScrambleText({ text, duration = 500, delay = 0 }: { text: string; duration?: number; delay?: number }) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, "\u00A0")); // start with empty spaces to hold size
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
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
      }, 30);
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
  }, [text, duration, delay]);

  return <span className={isScrambling ? "font-mono opacity-80" : ""}>{displayText}</span>;
}
