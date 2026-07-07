"use client";

import { motion } from "framer-motion";
import { WordsReveal, Reveal, CountUp } from "@/components/motion-primitives";

const metrics = [
  { value: 4, suffix: "", label: "Years on the\nPresident’s List" },
  { value: 5, suffix: "", label: "Production systems\nshipped & deployed" },
  { value: 6, suffix: "", label: "Role tiers designed\nfor CHOIMS alone" },
  { value: 1, suffix: "st", label: "Rubik’s Cube\nCompetition Champion" },
];

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="eyebrow mb-10 flex items-center gap-3 text-muted-foreground">
          <span className="inline-block h-px w-8 bg-ember" />
          Manifesto
        </Reveal>

        <h2 className="display max-w-5xl text-balance text-[clamp(1.7rem,5vw,3.6rem)] text-foreground">
          <WordsReveal text="I don’t ship websites." />
          <br />
          <span className="text-muted-foreground">
            <WordsReveal
              text="I ship infrastructure that communities depend on —"
              delay={0.2}
            />
          </span>{" "}
          <span className="display-italic text-ember">
            <WordsReveal text="water paid, records kept, vaccines counted, stock tracked, coffee sold." delay={0.4} />
          </span>{" "}
          <WordsReveal text="Every system, a quiet promise that it will not break." delay={0.55} />
        </h2>

        {/* metrics */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-background p-6 sm:p-8"
            >
              <div className="display text-[clamp(2.4rem,6vw,4rem)] text-foreground">
                <CountUp to={m.value} suffix={m.suffix} />
              </div>
              <p className="mt-3 whitespace-pre-line font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
