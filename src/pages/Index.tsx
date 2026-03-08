import { lazy, Suspense, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";
import BookDirectStrip from "@/components/BookDirectStrip";
import StickyBookingBar from "@/components/StickyBookingBar";
import BackToTop from "@/components/BackToTop";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const StatsCounter = lazy(() => import("@/components/StatsCounter"));
const RoomsSection = lazy(() => import("@/components/RoomsSection"));
const RestaurantSection = lazy(() => import("@/components/RestaurantSection"));
const SpaSection = lazy(() => import("@/components/SpaSection"));
const AmenitiesSection = lazy(() => import("@/components/AmenitiesSection"));
const AttractionsSection = lazy(() => import("@/components/AttractionsSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BookingSection = lazy(() => import("@/components/BookingSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onComplete={handleLoadComplete} />
      {loaded && (
        <main>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <HeroSection />
          <BookDirectStrip />
          <Suspense fallback={<div className="min-h-screen" />}>
            <SectionDivider variant="glow" />
            <AboutSection />
            <StatsCounter />
            <SectionDivider variant="diamond" />
            <RoomsSection />
            <SectionDivider variant="glow" />
            <RestaurantSection />
            <SectionDivider variant="diamond" />
            <SpaSection />
            <SectionDivider variant="glow" />
            <AmenitiesSection />
            <SectionDivider variant="diamond" />
            <AttractionsSection />
            <SectionDivider variant="glow" />
            <GallerySection />
            <SectionDivider variant="diamond" />
            <TestimonialsSection />
            <SectionDivider variant="glow" />
            <BookingSection />
            <SectionDivider variant="diamond" />
            <ContactSection />
            <Footer />
          </Suspense>
          <FloatingWhatsApp />
          <StickyBookingBar />
          <BackToTop />
        </main>
      )}
    </>
  );
};

export default Index;
