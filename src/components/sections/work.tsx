"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { WordsReveal, Reveal, ParallaxImage } from "@/components/motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectChapter({ project, flip }: { project: Project; flip: boolean }) {
  const accentText =
    project.accent === "ember" ? "text-ember" : "text-sage";

  return (
    <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
      {/* IMAGE SIDE */}
      <div
        className={`relative ${
          flip ? "lg:order-2 lg:col-span-7" : "lg:order-1 lg:col-span-7"
        }`}
      >
        {/* floating index */}
        <motion.span
          initial={{ opacity: 0, x: flip ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`pointer-events-none absolute -top-10 z-10 select-none display text-[7rem] leading-none text-foreground/10 sm:text-[9rem] ${
            flip ? "right-0" : "left-0"
          }`}
          aria-hidden="true"
        >
          {project.index}
        </motion.span>

        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 1.05, ease: EASE }}
          className="relative overflow-hidden rounded-xl border border-line bg-card ember-glow"
        >
          {/* filmstrip labels */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foreground/70">
            <span>FIG. {project.index}</span>
            <span className={accentText}>● {project.name}</span>
          </div>
          <div className="aspect-[16/11] w-full">
            <ParallaxImage
              src={project.image}
              alt={project.imageAlt}
              strength={40}
              className="h-full w-full"
              imgClassName="h-full"
            />
          </div>
          {/* bottom gradient + caption */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-10">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/85">
              {project.system}
            </span>
          </div>
        </motion.div>
      </div>

      {/* TEXT SIDE */}
      <div
        className={`${
          flip ? "lg:order-1 lg:col-span-5" : "lg:order-2 lg:col-span-5"
        }`}
      >
        <Reveal className="eyebrow mb-5 flex items-center gap-3 text-muted-foreground">
          <span className={`inline-block h-px w-8 ${accentText === "text-ember" ? "bg-ember" : "bg-sage"}`} />
          {project.index} / Selected Work
        </Reveal>

        <h3 className="display text-[clamp(2.4rem,5.5vw,4rem)] text-foreground">
          <WordsReveal text={project.name} />
        </h3>

        <Reveal delay={0.15} className="mt-3">
          <p className={`display display-italic text-[clamp(1.05rem,2vw,1.4rem)] ${accentText}`}>
            {project.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-6">
          <p className="text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
            {project.story}
          </p>
        </Reveal>

        {/* tech tags */}
        <Reveal delay={0.35} className="mt-7">
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] tracking-tight text-foreground/75"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* facts */}
        <Reveal delay={0.45}>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
            {project.facts.map((f) => (
              <div key={f.label} className="bg-background p-4">
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="mt-1 text-[0.85rem] leading-snug text-foreground">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* section header */}
        <div className="mb-16 flex flex-col gap-6 sm:mb-24 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal className="eyebrow mb-5 flex items-center gap-3 text-muted-foreground">
              <span className="inline-block h-px w-8 bg-ember" />
              Selected Work
            </Reveal>
            <h2 className="display max-w-2xl text-balance text-[clamp(2rem,6vw,4.2rem)] text-foreground">
              <WordsReveal text="Five systems," />{" "}
              <span className="display-italic text-ember">
                <WordsReveal text="each carrying real weight." delay={0.2} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2} className="max-w-xs">
            <p className="text-sm leading-relaxed text-muted-foreground">
              From a city&apos;s water bills to a café&apos;s counter — production
              software, deployed and in daily use.
            </p>
          </Reveal>
        </div>

        {/* chapters */}
        <div className="flex flex-col gap-28 sm:gap-40">
          {projects.map((p, i) => (
            <ProjectChapter key={p.index} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        {/* closing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-28 flex items-center justify-center sm:mt-40"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>End of reel</span>
            <ArrowUpRight className="h-4 w-4 text-ember transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
