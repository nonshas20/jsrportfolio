import { ScrollProgress } from "@/components/motion-primitives";
import { Nav } from "@/components/nav";
import { Intro } from "@/components/intro";
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
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <Intro />
      <ScrollProgress />
      <Nav />
      {/* page-level gradual blur under the header — content sharpens as it scrolls past the top edge */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24">
        <GradualBlur
          position="top"
          height="6rem"
          strength={3}
          divCount={7}
          curve="bezier"
          exponential
          opacity={0.9}
        />
      </div>
      {/* page-level gradual blur at the bottom — upcoming content fades/blurs in as the user scrolls */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-28">
        <GradualBlur
          position="bottom"
          height="7rem"
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
  );
}
