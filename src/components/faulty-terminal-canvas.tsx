"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const FaultyTerminal = dynamic(() => import("./faulty-terminal"), { ssr: false });

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      const handler = () => cb();
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/**
 * FaultyTerminal background — CRT glitch glyph field, ember-tinted.
 * - ssr:false (WebGL is client-only)
 * - respects prefers-reduced-motion (renders nothing)
 * - tint follows the active theme
 */
export function FaultyTerminalCanvas({ className }: { className?: string }) {
  const isClient = useIsClient();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { resolvedTheme } = useTheme();

  if (!isClient || reducedMotion) return null;

  const isDark = resolvedTheme !== "light";
  const tint = isDark ? "#E2743B" : "#C85A1A";

  return (
    <div className={className} aria-hidden="true">
      <FaultyTerminal
        scale={1.2}
        gridMul={[2, 1]}
        digitSize={1.4}
        timeScale={0.28}
        scanlineIntensity={0.25}
        glitchAmount={0.7}
        flickerAmount={0.6}
        noiseAmp={0.3}
        chromaticAberration={1.2}
        dither={0.5}
        curvature={0.15}
        tint={tint}
        mouseReact
        mouseStrength={0.25}
        pageLoadAnimation={false}
        brightness={isDark ? 2.5 : 0.5}
      />
    </div>
  );
}
