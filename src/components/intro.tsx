"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "@/components/split-text";

/**
 * Minimalist intro: "oh.... hey!" typed letter-by-letter, then fades away
 * to reveal the portfolio and unlocks scroll. Runs once per session.
 */
export function Intro() {
  const [done, setDone] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  // lock scroll while intro is visible
  React.useEffect(() => {
    if (hidden) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [hidden]);

  // safety: never block the page longer than ~3.6s
  React.useEffect(() => {
    const t = setTimeout(() => setHidden(true), 3600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => setHidden(true)}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* faint ember glow behind text */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/20 blur-[120px]"
          />
          <div className="relative px-6 text-center">
            <SplitText
              text="oh.... hey!"
              tag="h1"
              className="display display-italic text-foreground text-[clamp(2.4rem,9vw,6rem)]"
              delay={75}
              duration={0.7}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              threshold={0}
              rootMargin="0px"
              textAlign="center"
              onLetterAnimationComplete={() => {
                // hold a beat, then exit
                setTimeout(() => setDone(true), 650);
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
