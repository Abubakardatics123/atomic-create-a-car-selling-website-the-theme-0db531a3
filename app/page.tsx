export const dynamic = "force-dynamic";
import HeroSection from "@/components/HeroSection";
import FeaturedCarsCarousel from "@/components/FeaturedCarsCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import NewsletterBanner from "@/components/NewsletterBanner";
import BrandsStrip from "@/components/BrandsStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsStrip />
      <FeaturedCarsCarousel />
      <WhyChooseUs />
      <Testimonials />
      <NewsletterBanner />
    </>
  );
}
