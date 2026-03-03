import { motion } from "framer-motion";
import { Shield, Award, Users } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [viewerCount, setViewerCount] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Azwa Hotel exterior - luxury accommodation in Bahir Dar, Ethiopia"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Live social proof badge - urgency psychology */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute top-28 lg:top-32 left-4 lg:left-8 z-20"
      >
        <div className="glass-card px-4 py-3 flex items-center gap-3 border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-body text-foreground/80 tracking-wide">
            <span className="text-primary font-semibold">{viewerCount}</span> people viewing now
          </span>
        </div>
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="section-subtitle mb-6 text-sm md:text-base">Welcome to</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative mb-8"
        >
          {/* Top ornamental line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-primary/70" />
            <div className="w-2 h-2 rotate-45 border border-primary/60" />
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-primary/70" />
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold gold-text leading-none tracking-wider drop-shadow-[0_0_40px_hsl(43_72%_55%/0.35)]">
            AZWA HOTEL
          </h1>

          {/* Bottom ornamental line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex items-center justify-center gap-3 mt-6"
          >
            <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="text-primary/60 text-xs tracking-[0.4em] uppercase font-body">★ ★ ★ ★ ★</div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-heading text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-4 italic font-light"
        >
          Where Luxury Meets the Source of the Nile
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-body text-sm tracking-[0.2em] text-muted-foreground uppercase mb-8"
        >
          Bahir Dar, Ethiopia
        </motion.p>

        {/* Trust signals - authority psychology */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-6 mb-10 flex-wrap"
        >
          <div className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-primary/70 font-body">
            <Shield className="w-3.5 h-3.5" /> Secure Booking
          </div>
          <div className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-primary/70 font-body">
            <Award className="w-3.5 h-3.5" /> Best Price Guarantee
          </div>
          <div className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-primary/70 font-body">
            <Users className="w-3.5 h-3.5" /> 2,400+ Happy Guests
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="gold-gradient text-primary-foreground px-10 py-4 text-sm tracking-[0.25em] uppercase font-body font-medium hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_72%_55%/0.3)] relative group"
          >
            <span>Book Your Stay</span>
            <span className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground text-[9px] font-body font-bold px-2 py-0.5 tracking-wider uppercase animate-pulse">
              Limited
            </span>
          </a>
          <a
            href="#rooms"
            className="flex items-center gap-3 border border-primary/40 text-primary px-8 py-4 text-sm tracking-[0.15em] uppercase font-body hover:bg-primary/10 transition-all duration-300"
          >
            View Rooms
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="block animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-primary/60 rounded-full" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
