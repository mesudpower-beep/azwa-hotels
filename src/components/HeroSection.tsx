import { motion } from "framer-motion";
import { Shield, Award, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const heroImages = [
  "/images/hero.jpg",
  "/images/lobby.jpg",
  "/images/pool.jpg",
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background images */}
      {heroImages.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[2000ms]"
          style={{ opacity: currentImage === index ? 1 : 0 }}
        >
          <img
            src={src}
            alt="Azwa Hotel exterior - luxury accommodation in Bahir Dar, Ethiopia"
            className="w-full h-full object-cover animate-ken-burns"
            loading={index === 0 ? "eager" : "lazy"}
            style={{ animationDelay: `${index * 6}s` }}
          />
        </div>
      ))}
      <div className="hero-overlay absolute inset-0" />

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[130px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="section-subtitle mb-6 text-sm md:text-base">{t("hero.welcome")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative mb-8"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 rotate-45 border border-primary/40" />
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-primary/50" />
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold gold-text leading-none tracking-wider">
            AZWA HOTEL
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex items-center justify-center gap-3 mt-6"
          >
            <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="text-primary/50 text-xs tracking-[0.4em] uppercase font-body">✦ ✦ ✦ ✦ ✦</div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-primary/40" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-heading text-xl md:text-2xl lg:text-3xl text-foreground/70 mb-4 font-light"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-body text-sm tracking-[0.2em] text-muted-foreground uppercase mb-8"
        >
          {t("hero.location")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-6 mb-10 flex-wrap"
        >
          {[
            { icon: Shield, label: t("hero.secureBooking") },
            { icon: Award, label: t("hero.bestPrice") },
            { icon: Users, label: t("hero.happyGuests") },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-primary/60 font-body">
              <Icon className="w-3.5 h-3.5" /> {label}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="neon-button text-primary-foreground px-10 py-4 text-sm tracking-[0.2em] uppercase font-body font-semibold relative group"
          >
            <span>{t("hero.bookStay")}</span>
            <span className="absolute -top-3 -right-3 bg-neon-pink text-primary-foreground text-[9px] font-body font-bold px-2 py-0.5 tracking-wider uppercase animate-pulse rounded-full">
              {t("hero.limited")}
            </span>
          </a>
          <a
            href="#rooms"
            className="flex items-center gap-3 border border-primary/30 text-primary px-8 py-4 text-sm tracking-[0.15em] uppercase font-body hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 rounded-lg"
          >
            {t("hero.viewRooms")}
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
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-primary/50 rounded-full" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
