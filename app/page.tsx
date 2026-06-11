import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CatalogPreview } from "@/components/landing/CatalogPreview";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <CatalogPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCta />
      <Footer />
    </main>
  );
}
