"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Languages, Boxes, Briefcase } from "lucide-react";
import { WordsReveal, Reveal } from "@/components/motion-primitives";

const credentials = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "BS Information Technology",
    sub: "Polytechnic University of the Philippines — Parañaque, 2021–2025",
  },
  {
    icon: Award,
    label: "Distinction",
    value: "Magna Cum Laude candidate",
    sub: "President’s List, 1st through 4th year",
  },
  {
    icon: Languages,
    label: "Languages",
    value: "English · Tagalog",
    sub: "Proficient · Native",
  },
  {
    icon: Boxes,
    label: "Off-screen",
    value: "Rubik’s Cube Champion",
    sub: "Problem-solving, under the clock",
  },
];

const timeline = [
  {
    role: "Computer Programmer",
    org: "City Health Office — Parañaque",
    place: "Parañaque City",
    years: "2026 — Present",
    note: "Building and maintaining the health office's software systems — HRIS, immunization reporting, and inventory management.",
  },
  {
    role: "Barista",
    org: "Rustans Coffee — Starbucks",
    place: "BF Homes, Parañaque",
    years: "2024 — 2025",
    note: "High-volume service, handcrafted beverages, inventory and store readiness.",
  },
  {
    role: "Operations Assistant",
    org: "DHTech",
    place: "Parañaque City",
    years: "2022 — Present",
    note: "Operations support, accounts receivable, logistics and customer relations.",
  },
  {
    role: "Store Helper",
    org: "Rodriguez Sari-Sari Store",
    place: "Parañaque City",
    years: "2020 — Present",
    note: "Daily operations, POS transactions, inventory and supplier relations.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="eyebrow mb-10 flex items-center gap-3 text-muted-foreground">
          <span className="inline-block h-px w-8 bg-ember" />
          About
        </Reveal>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* narrative */}
          <div className="lg:col-span-7">
            <h2 className="display max-w-3xl text-balance text-[clamp(1.8rem,4.4vw,3.2rem)] text-foreground">
              <WordsReveal text="A developer who ships the systems people quietly rely on." />
            </h2>

            <Reveal delay={0.2} className="mt-8 max-w-2xl space-y-5 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
              <p>
                John Shannon O. Rodriguez is a full-stack developer and a{" "}
                <span className="text-foreground">Magna Cum Laude candidate</span>{" "}
                in Information Technology at the Polytechnic University of the
                Philippines — Parañaque Campus, where he has been named to the{" "}
                <span className="text-foreground">President’s List every year</span>{" "}
                of his degree.
              </p>
              <p>
                His work lives where software meets public service: water billing
                that handles real payments, HR systems that guard personnel
                records, immunization reporting that tracks a campaign in real
                time, and inventory systems that span a city’s health centers.
                He treats each project as infrastructure — something that has to
                keep working long after launch day.
              </p>
              <p>
                Off the keyboard, he’s a Rubik’s Cube competition champion — the
                same instinct for pattern and motion, applied to a different
                kind of puzzle.
              </p>
            </Reveal>
          </div>

          {/* credentials */}
          <div className="lg:col-span-5">
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {credentials.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-background p-5"
                >
                  <c.icon className="h-5 w-5 text-ember" strokeWidth={1.5} />
                  <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-1.5 font-display text-[1.05rem] leading-snug text-foreground">
                    {c.value}
                  </p>
                  <p className="mt-1 text-[0.78rem] leading-snug text-muted-foreground">
                    {c.sub}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* experience timeline */}
        <div className="mt-24 sm:mt-32">
          <Reveal className="mb-10 flex items-center gap-3">
            <Briefcase className="h-4 w-4 text-ember" strokeWidth={1.6} />
            <span className="eyebrow text-muted-foreground">Along the way</span>
          </Reveal>

          <ol className="relative border-l border-line pl-8">
            {timeline.map((t, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative pb-12 last:pb-0"
              >
                <span className="absolute -left-[37px] top-1.5 flex h-3 w-3 items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-ember ring-4 ring-background" />
                </span>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-[1.3rem] text-foreground">
                    {t.role}
                    <span className="text-muted-foreground"> · {t.org}</span>
                  </h3>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ember">
                    {t.years}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {t.place}
                </p>
                <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-muted-foreground">
                  {t.note}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
