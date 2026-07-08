"use client";

import * as React from "react";
import { motion } from "framer-motion";
import LineSidebar from "@/components/line-sidebar";

const sections = [
  { label: "Intro", id: "top" },
  { label: "Manifesto", id: "manifesto" },
  { label: "Stack", id: "stack" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "GitHub", id: "github" },
  { label: "Contact", id: "contact" },
];

export function SideNav() {
  const [active, setActive] = React.useState<number>(0);
  const [hovered, setHovered] = React.useState(false);

  // track which section is in view to set the active sidebar item
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibility = new Map<string, number>();

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibility.set(s.id, entry.intersectionRatio);
          });
          let best: string | null = null;
          let bestRatio = 0;
          visibility.forEach((ratio, id) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = id;
            }
          });
          if (best) {
            const idx = sections.findIndex((x) => x.id === best);
            if (idx >= 0) setActive(idx);
          }
        },
        { threshold: [0.1, 0.25, 0.5, 0.75] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = React.useCallback((index: number) => {
    const target = sections[index];
    if (!target) return;
    const el = document.getElementById(target.id);
    if (!el) return;
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group fixed left-0 top-0 z-40 hidden h-dvh items-center xl:flex"
      aria-label="Section navigation"
      style={{ width: "8px" }}
    >
      {/* hover hit area — extends inward so the rail reveals before the cursor reaches the labels */}
      <div className="absolute inset-y-0 left-0 w-10" aria-hidden="true" />

      {/* the active-section dot — always visible, the only hint when collapsed */}
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        <motion.span
          layoutId="sidenav-dot"
          className="block h-1.5 w-1.5 rounded-full bg-ember"
          animate={{ scale: hovered ? 0 : 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* the sidebar itself — slides + fades in on hover */}
      <motion.div
        animate={{
          x: hovered ? 24 : -8,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none pl-2"
        style={{ pointerEvents: hovered ? "auto" : "none" }}
      >
        <LineSidebar
          items={sections.map((s) => s.label)}
          accentColor="var(--ember)"
          textColor="var(--muted-foreground)"
          markerColor="var(--line)"
          showIndex
          showMarker
          proximityRadius={90}
          maxShift={14}
          falloff="smooth"
          markerLength={32}
          markerGap={0}
          tickScale={0.5}
          scaleTick
          itemGap={16}
          fontSize={0.78}
          smoothing={120}
          defaultActive={0}
          onItemClick={handleClick}
        />
      </motion.div>

      <ActiveSync active={active} />
    </motion.aside>
  );
}

function ActiveSync({ active }: { active: number }) {
  React.useEffect(() => {
    const items = document.querySelectorAll(".line-sidebar__item");
    items.forEach((el, i) => {
      if (i === active) {
        el.setAttribute("aria-current", "true");
        (el as HTMLElement).style.setProperty("--effect", "1");
      } else {
        el.removeAttribute("aria-current");
      }
    });
  }, [active]);
  return null;
}
