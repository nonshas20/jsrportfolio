"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import GlassSurface from "@/components/glass-surface";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 48));

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? "px-3 pt-3 sm:px-5 sm:pt-5" : "px-5 pt-3 sm:px-8 sm:pt-4"
      }`}
    >
      {/* When scrolled: floating GlassSurface pill. When at top: plain bar. */}
      {scrolled ? (
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={18}
          backgroundOpacity={0}
          saturation={1.6}
          brightness={62}
          opacity={0.92}
          blur={10}
          distortionScale={-160}
          greenOffset={8}
          blueOffset={16}
          className="!w-full max-w-[1400px] shadow-float"
        >
          <div className="flex w-full max-w-[1400px] items-center justify-between px-3 py-2 sm:px-4">
            <NavContent />
          </div>
        </GlassSurface>
      ) : (
        <div className="flex h-16 w-full max-w-[1400px] items-center justify-between">
          <NavContent />
        </div>
      )}
    </motion.header>
  );
}

function NavContent() {
  return (
    <>
      <Link
        href="#top"
        className="group flex items-center gap-3"
        aria-label="John Shannon Rodriguez — back to top"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line font-mono text-[0.7rem] tracking-tight text-foreground/80 transition-colors group-hover:border-ember group-hover:text-ember">
          JSR
        </span>
        <span className="hidden font-display text-[0.95rem] leading-none text-foreground sm:block">
          John Shannon<span className="text-ember">.</span>
        </span>
      </Link>

      <div className="flex items-center gap-1 sm:gap-2">
        <div className="mr-1 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
        <span className="mx-1 hidden h-5 w-px bg-line md:block" />
        <a
          href="mailto:johnshannonrodriguez20@gmail.com"
          className="mr-1 hidden rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:border-ember hover:text-ember lg:inline-block"
        >
          Get in touch
        </a>
        <ThemeToggle />
      </div>
    </>
  );
}
