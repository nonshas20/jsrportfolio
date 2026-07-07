"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const LineWaves = dynamic(() => import("./linewaves"), { ssr: false });

/* ---- external-store hooks (no setState-in-effect, SSR-safe) ---- */
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
 * Full-viewport generative wave field (React Bits "LineWaves", ogl).
 * - ssr:false (WebGL is client-only)
 * - respects prefers-reduced-motion (renders nothing)
 * - listens on `window` so waves react to the cursor across the whole hero
 * - ember/sage palette follows the active theme
 */
export function LineWavesCanvas({ className }: { className?: string }) {
  const isClient = useIsClient();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { resolvedTheme } = useTheme();

  if (!isClient || reducedMotion) return null;

  const isDark = resolvedTheme !== "light";
  const color1 = isDark ? "#E8804A" : "#C85A28";
  const color2 = isDark ? "#B8642A" : "#8A4A1E";
  const color3 = isDark ? "#9CAB8C" : "#6B7A5E";

  return (
    <div className={className} aria-hidden="true">
      <LineWaves
        speed={0.28}
        innerLineCount={26}
        outerLineCount={32}
        warpIntensity={1.0}
        rotation={-45}
        edgeFadeWidth={0.0}
        colorCycleSpeed={0.7}
        brightness={isDark ? 0.26 : 0.16}
        color1={color1}
        color2={color2}
        color3={color3}
        enableMouseInteraction
        mouseInfluence={1.6}
      />
    </div>
  );
}
