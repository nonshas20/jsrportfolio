"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { WordsReveal, Reveal } from "@/components/motion-primitives";
import { LineWavesCanvas } from "@/components/linewaves-canvas";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* TiltCard — portrait card that tilts toward the cursor (desktop)      */
/* ------------------------------------------------------------------ */
function TiltCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [10, -10]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-12, 12]), {
    stiffness: 150,
    damping: 18,
  });

  // spotlight position
  const sx = useTransform(px, [0, 1], ["0%", "100%"]);
  const sy = useTransform(py, [0, 1], ["0%", "100%"]);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      className="relative"
      style={{ perspective: 1200 }}
    >
      {/* ember glow behind card */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-ember/20 blur-3xl" />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-[1.25rem] border border-line bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
      >
        {/* portrait */}
        <img
          src="/portrait.webp"
          alt="Portrait of John Shannon O. Rodriguez, full-stack web developer."
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: "translateZ(0)" }}
        />

        {/* ember spotlight overlay (follows cursor) */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [sx, sy],
              ([x, y]) =>
                `radial-gradient(220px circle at ${x} ${y}, color-mix(in oklch, var(--ember) 35%, transparent), transparent 70%)`
            ),
          }}
        />

        {/* bottom gradient + caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/15 to-transparent px-4 pb-4 pt-16">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/85">
            Fig. 01 — The Developer
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ember">
            JSR
          </span>
        </div>

        {/* top corner stamp (reused seal motif) */}
        <div className="pointer-events-none absolute right-3 top-3 z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/20 backdrop-blur-sm">
            <span className="display text-[0.95rem] leading-none text-white">
              JS<span className="text-ember">R</span>
            </span>
          </div>
        </div>

        {/* hairline frame */}
        <div className="pointer-events-none absolute inset-3 z-10 rounded-[0.75rem] border border-white/15" />
      </motion.div>

      {/* caption strip under card */}
      <div className="mt-4 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
        <span>Parañaque City · PH</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" /> Available
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col overflow-hidden pt-24 pb-10 sm:pt-28"
    >
      {/* generative wave field (cursor-reactive) */}
      <LineWavesCanvas className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

      {/* ambient color washes + grain (above canvas, below content) */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute -left-[15%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-ember/12 blur-[140px]" />
        <div className="absolute -right-[8%] bottom-[2%] h-[45vh] w-[45vh] rounded-full bg-sage/10 blur-[140px]" />
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="grain absolute inset-0" />
      </div>

      {/* vertical sidebar label (desktop only) */}
      <div className="pointer-events-none absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <span
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground"
          style={{ writingMode: "vertical-rl" }}
        >
          Portfolio ◦ MMXXV
        </span>
      </div>

      {/* top meta row */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="flex items-center justify-between"
        >
          <span className="eyebrow text-muted-foreground">John Shannon Rodriguez</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-background/40 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Open to work
          </span>
        </motion.div>
      </div>

      {/* main */}
      <div className="relative z-20 mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* left: type */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="eyebrow mb-5 flex items-center gap-3 text-muted-foreground"
          >
            <span className="inline-block h-px w-8 bg-ember" />
            Full-Stack Web Developer
          </motion.p>

          <h1 className="display text-foreground">
            <span className="block text-[clamp(2.6rem,10vw,8.4rem)]">
              <WordsReveal text="John" delay={0.3} />
            </span>
            <span className="block text-[clamp(2.6rem,10vw,8.4rem)]">
              <WordsReveal text="Shannon" delay={0.42} />
            </span>
            <span className="-mt-2 block text-[clamp(2.6rem,10vw,8.4rem)] sm:-mt-3">
              <WordsReveal
                text="Rodriguez"
                delay={0.56}
                wordClassName="display-italic text-ember"
              />
            </span>
          </h1>

          <Reveal delay={0.8} className="mt-8 max-w-md">
            <p className="text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
              I build the load-bearing software cities and small businesses
              actually depend on —{" "}
              <span className="text-foreground">
                water bills, health records, vaccine counts, inventory and point-of-sale.
              </span>{" "}
              Magna Cum Laude candidate. President&apos;s List, four years running.
            </p>
          </Reveal>

          <Reveal delay={0.95} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-ember" strokeWidth={1.6} />
              Parañaque City, Philippines
            </span>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-ember hover:text-ember"
            >
              View selected work
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} />
            </a>
          </Reveal>
        </div>

        {/* right: portrait tilt card */}
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <TiltCard />
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <motion.a
          href="#manifesto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.15 }}
          className="group inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line bg-background/40 backdrop-blur-sm">
            <ArrowDownRight
              className="h-4 w-4 text-ember transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              strokeWidth={1.6}
            />
          </span>
          Scroll to read
        </motion.a>
      </div>
    </section>
  );
}
