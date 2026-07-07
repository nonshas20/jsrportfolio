"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-line bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* identity */}
          <div>
            <Link
              href="#top"
              className="font-display text-lg text-foreground"
            >
              John Shannon<span className="text-ember"> Rodriguez</span>
            </Link>
            <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground">
              Full-Stack Web Developer · Parañaque City, PH
            </p>
          </div>

          {/* nav */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
            <Link href="#work" className="transition-colors hover:text-foreground">Work</Link>
            <Link href="#about" className="transition-colors hover:text-foreground">About</Link>
            <Link href="#contact" className="transition-colors hover:text-foreground">Contact</Link>
            <a
              href="mailto:johnshannonrodriguez20@gmail.com"
              className="transition-colors hover:text-ember"
            >
              Email
            </a>
          </nav>

          {/* back to top */}
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-ember hover:text-ember"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.6} />
          </a>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center">
          <span>© {year} John Shannon O. Rodriguez</span>
          <span className="text-muted-foreground/70">
            Built with Next.js · Tailwind CSS · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
