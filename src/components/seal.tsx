"use client";

import { motion } from "framer-motion";

/**
 * Rotating editorial seal: circular text orbiting a monogram.
 * Used as the hero "portrait" stand-in — deliberate craft over a stock photo.
 */
export function Seal({ className }: { className?: string }) {
  const ring = "JOHN SHANNON RODRIGUEZ — FULL-STACK DEVELOPER — ";
  return (
    <div className={`relative ${className ?? ""}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="relative aspect-square w-full"
      >
        {/* rotating text ring */}
        <svg
          viewBox="0 0 200 200"
          className="animate-spin-slow absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <path
              id="seal-path"
              d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
              fill="none"
            />
          </defs>
          <text
            className="fill-foreground/70 font-mono"
            style={{
              fontSize: "10.5px",
              letterSpacing: "2.6px",
              textTransform: "uppercase",
            }}
          >
            <textPath href="#seal-path" startOffset="0">
              {ring}
            </textPath>
          </text>
        </svg>

        {/* static tick ring */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="currentColor"
            className="text-foreground/15"
            strokeWidth="0.75"
          />
          <circle
            cx="100"
            cy="100"
            r="58"
            fill="none"
            stroke="currentColor"
            className="text-ember/40"
            strokeWidth="0.75"
            strokeDasharray="2 5"
          />
        </svg>

        {/* center monogram */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="display text-foreground text-[2.4em] leading-none">
            JS<span className="text-ember">R</span>
          </span>
          <span className="eyebrow mt-2 text-muted-foreground">est. 2021</span>
        </div>
      </motion.div>
    </div>
  );
}
