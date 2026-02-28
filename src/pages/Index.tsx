import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const RoomsSection = lazy(() => import("@/components/RoomsSection"));
const AmenitiesSection = lazy(() => import("@/components/AmenitiesSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BookingSection = lazy(() => import("@/components/BookingSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Suspense fallback={<div className="min-h-screen" />}>
        <AboutSection />
        <RoomsSection />
        <AmenitiesSection />
        <GallerySection />
        <TestimonialsSection />
        <BookingSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
