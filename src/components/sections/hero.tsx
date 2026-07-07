"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { WordsReveal, Reveal } from "@/components/motion-primitives";
import { LineWavesCanvas } from "@/components/linewaves-canvas";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  // subtle parallax on the portrait as you scroll past the hero
  const { scrollYProgress } = useScroll();
  const portraitY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col overflow-hidden"
    >
      {/* generative wave field (cursor-reactive) */}
      <LineWavesCanvas className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

      {/* ambient color washes + grain (above canvas, below content) */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute -left-[15%] top-[8%] h-[55vh] w-[55vh] rounded-full bg-ember/12 blur-[140px]" />
        <div className="absolute -right-[6%] bottom-[18%] h-[45vh] w-[45vh] rounded-full bg-sage/10 blur-[140px]" />
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
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
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-28">
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

      {/* main — text left, portrait baseline-right (matches reference 1:1) */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1400px] flex-1 items-end px-5 pb-8 sm:px-8">
        <div className="grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-6">
          {/* LEFT: text block, bottom-aligned */}
          <div className="order-2 lg:order-1 lg:col-span-7 lg:pb-6">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
              className="font-accent mb-2 text-[clamp(0.95rem,1.6vw,1.15rem)] italic text-muted-foreground"
            >
              Hi, I&apos;m John Shannon.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
              className="eyebrow mb-6 flex items-center gap-3 text-ember"
            >
              <span className="inline-block h-px w-8 bg-ember" />
              Full-Stack Web Developer
            </motion.p>

            <h1 className="display text-foreground">
              <span className="block text-[clamp(2.6rem,9.5vw,8rem)]">
                <WordsReveal text="John" delay={0.36} />
              </span>
              <span className="block text-[clamp(2.6rem,9.5vw,8rem)]">
                <WordsReveal text="Shannon" delay={0.46} />
              </span>
              <span className="-mt-1 block text-[clamp(2.6rem,9.5vw,8rem)] sm:-mt-2">
                <WordsReveal
                  text="Rodriguez"
                  delay={0.58}
                  wordClassName="display-italic text-ember"
                />
              </span>
            </h1>

            <Reveal delay={0.82} className="mt-7 max-w-md">
              <p className="text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                I build the load-bearing software cities and small businesses
                actually depend on —{" "}
                <span className="text-foreground">
                  water bills, health records, vaccine counts, inventory and point-of-sale.
                </span>{" "}
                Magna Cum Laude candidate. President&apos;s List, four years running.
              </p>
            </Reveal>

            <Reveal delay={0.95} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
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

          {/* RIGHT: full-body portrait, standing on the baseline */}
          <div className="relative order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
            {/* soft ember glow behind the figure */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[70%] w-[80%] -translate-x-1/2 rounded-full bg-ember/15 blur-[90px]" />

            <motion.img
              src="/portrait.webp"
              alt="John Shannon O. Rodriguez posing — hand on chin, arm crossed, full-body portrait."
              style={{ y: portraitY }}
              initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
              className="relative z-10 h-[42vh] w-auto object-contain object-bottom drop-shadow-[0_24px_50px_rgba(0,0,0,0.45)] sm:h-[52vh] lg:h-[78vh] lg:max-h-[820px]"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-5 pb-6 sm:px-8">
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
