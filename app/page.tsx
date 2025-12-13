import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import PricingSlider from "@/components/PricingSlider";
import FeaturesGrid from "@/components/FeaturesGrid";
import VideoGrid from "@/components/VideoGrid";
import CaseStudies from "@/components/CaseStudies";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-off-white dark:bg-slate-950 selection:bg-brand-purple selection:text-white">
      <Navbar />
      <Hero />
      <SectionWrapper>
        <SocialProof />
      </SectionWrapper>
      <SectionWrapper>
        <PricingSlider />
      </SectionWrapper>
      <SectionWrapper>
        <FeaturesGrid />
      </SectionWrapper>
      <SectionWrapper>
        <VideoGrid />
      </SectionWrapper>
      <SectionWrapper>
        <CaseStudies />
      </SectionWrapper>
      <SectionWrapper>
        <Footer />
      </SectionWrapper>
    </main>
  );
}
