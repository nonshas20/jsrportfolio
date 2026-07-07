"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiSupabase,
  SiVite,
  SiJavascript,
  SiGit,
  SiGithub,
  SiFramer,
  SiThreedotjs,
  SiVercel,
  SiDigitalocean,
  SiInertia,
  SiPrisma,
} from "react-icons/si";
import { LogoLoop } from "@/components/logo-loop";
import { Reveal } from "@/components/motion-primitives";
import type { LogoItem } from "@/components/logo-loop";

// Row 1 — frontend / languages
const rowOne: LogoItem[] = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiFramer />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiThreedotjs />, title: "three.js", href: "https://threejs.org" },
];

// Row 2 — backend / data / infra (scrolls the opposite direction)
const rowTwo: LogoItem[] = [
  { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
  { node: <SiPhp />, title: "PHP", href: "https://www.php.net" },
  { node: <SiInertia />, title: "Inertia.js", href: "https://inertiajs.com" },
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiPrisma />, title: "Prisma", href: "https://www.prisma.io" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiDigitalocean />, title: "DigitalOcean", href: "https://www.digitalocean.com" },
];

export function Stack() {
  return (
    <section
      id="stack"
      className="relative overflow-hidden border-t border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal className="eyebrow mb-4 flex items-center gap-3 text-muted-foreground">
              <span className="inline-block h-px w-8 bg-ember" />
              The Stack
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display max-w-2xl text-balance text-[clamp(1.6rem,4.5vw,3rem)] text-foreground">
                Tools I reach for{" "}
                <span className="display-italic text-ember">when it has to ship.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="max-w-xs">
            <p className="text-sm leading-relaxed text-muted-foreground">
              From Laravel monoliths handling payments to React + Supabase
              apps on Vercel — the right tool for each job.
            </p>
          </Reveal>
        </div>
      </div>

      {/* two opposing marquee rows */}
      <div className="relative mt-14 flex flex-col gap-5 sm:mt-16">
        <div style={{ height: 56, position: "relative", overflow: "hidden" }}>
          <LogoLoop
            logos={rowOne}
            speed={90}
            direction="left"
            logoHeight={36}
            gap={56}
            scaleOnHover
            fadeOut
            ariaLabel="Frontend technologies"
            className="[&_a]:text-foreground/70 [&_a]:transition-colors hover:[&_a]:text-ember [&_span]:text-foreground/70"
          />
        </div>
        <div style={{ height: 56, position: "relative", overflow: "hidden" }}>
          <LogoLoop
            logos={rowTwo}
            speed={90}
            direction="right"
            logoHeight={36}
            gap={56}
            scaleOnHover
            fadeOut
            ariaLabel="Backend and infrastructure technologies"
            className="[&_a]:text-foreground/70 [&_a]:transition-colors hover:[&_a]:text-ember [&_span]:text-foreground/70"
          />
        </div>
      </div>
    </section>
  );
}
