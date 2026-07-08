"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { WordsReveal, Reveal, Magnetic } from "@/components/motion-primitives";
import RotatingText from "@/components/rotating-text";
import { FaultyTerminalCanvas } from "@/components/faulty-terminal-canvas";

const marqueeItems = [
  "Available for work",
  "Full-stack development",
  "Civic & enterprise systems",
  "Based in Parañaque, PH",
  "Open to remote",
];

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-line">
      {/* marquee */}
      <div className="overflow-hidden border-b border-line py-6">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {marqueeItems.map((m, i) => (
                <span key={i} className="flex items-center">
                  <span className="display display-italic px-6 text-[clamp(1.6rem,4vw,3rem)] text-foreground/80">
                    {m}
                  </span>
                  <span className="text-ember">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        {/* FaultyTerminal CRT background — from "Let's build something" onward */}
        <FaultyTerminalCanvas className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        {/* subtle overlay for text readability (transparent canvas lets page bg through) */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-background/50" />

        <Reveal className="eyebrow mb-8 flex items-center gap-3 text-muted-foreground">
          <span className="inline-block h-px w-8 bg-ember" />
          Contact
        </Reveal>

        <h2 className="display max-w-5xl text-balance text-[clamp(2.2rem,7vw,5.5rem)] text-foreground">
          <WordsReveal text="Let’s build something" />{" "}
          <span className="display-italic text-ember">
            that{" "}
            <RotatingText
              texts={["lasts.", "works.", "scales.", "serves.", "ships."]}
              mainClassName="inline-flex"
              splitLevelClassName="overflow-hidden pb-[0.1em]"
              elementLevelClassName="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.025}
              staggerFrom="last"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2400}
            />
          </span>
        </h2>

        <Reveal delay={0.25} className="mt-8 max-w-xl">
          <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            If you need software that has to keep working — billing, records,
            reporting, inventory, or commerce — I&apos;d love to hear about it.
          </p>
        </Reveal>

        {/* primary CTA */}
        <Reveal delay={0.35} className="mt-10">
          <Magnetic strength={0.25}>
            <a
              href="mailto:johnshannonrodriguez20@gmail.com"
              className="group inline-flex max-w-full items-center gap-3 rounded-2xl bg-foreground px-5 py-3.5 text-background transition-transform sm:gap-4 sm:rounded-full sm:px-7 sm:py-4"
            >
              <span className="font-display text-sm break-all sm:text-lg sm:break-normal">
                johnshannonrodriguez20@gmail.com
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/15 transition-transform duration-300 group-hover:rotate-45 sm:h-9 sm:w-9">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </span>
            </a>
          </Magnetic>
        </Reveal>

        {/* secondary contacts */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {[
            { icon: Mail, label: "Email", value: "johnshannonrodriguez20@gmail.com", href: "mailto:johnshannonrodriguez20@gmail.com" },
            { icon: Phone, label: "Phone", value: "+63 966 415 8905", href: "tel:+639664158905" },
            { icon: MapPin, label: "Location", value: "Parañaque City, PH", href: undefined },
          ].map((c, i) => (
            <motion.a
              key={i}
              href={c.href ?? "#"}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-background p-6 transition-colors hover:bg-secondary/40"
            >
              <c.icon className="h-5 w-5 text-ember" strokeWidth={1.5} />
              <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                {c.label}
              </p>
              <p className="mt-1.5 break-words text-[0.95rem] text-foreground transition-colors group-hover:text-ember">
                {c.value}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
