import { ScrollProgress } from "@/components/motion-primitives";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollProgress />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Manifesto />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
