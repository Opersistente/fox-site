import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Fleet } from "@/components/Fleet";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { CorporateAndSchool } from "@/components/CorporateAndSchool";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Fleet />
      <About />
      <Testimonials />
      <CorporateAndSchool />
      <Process />
      <FAQ />
      <FinalCTA />
    </>
  );
}
