import { ScrollProgress } from "@/components/motion-primitives";
import { Nav } from "@/components/nav";
import { Intro } from "@/components/intro";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import GradualBlur from "@/components/gradual-blur";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="flex min-h-dvh flex-col overflow-x-hidden">
        <Intro />
        <ScrollProgress />
        <Nav />
        {/* page-level gradual blur at the bottom — upcoming content fades/blurs in as the user scrolls */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-20">
          <GradualBlur
            position="bottom"
            height="5rem"
            strength={3}
            divCount={7}
            curve="bezier"
            exponential
            opacity={0.9}
          />
        </div>
        <main className="flex-1">
          <Hero />
          <Manifesto />
          <Stack />
          <Work />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
