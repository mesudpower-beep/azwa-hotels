import { motion, AnimatePresence } from "framer-motion";
import { Shield, Award, Users, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ParticleField from "./ParticleField";

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

  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1, y: 0, rotateX: 0,
      transition: { delay: 0.6 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const title = "AZWA HOTEL";

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background images with crossfade */}
      <AnimatePresence mode="wait">
        {heroImages.map((src, index) => (
          currentImage === index && (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={src}
                alt="Azwa Hotel exterior - luxury accommodation in Bahir Dar, Ethiopia"
                className="w-full h-full object-cover animate-ken-burns"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <div className="hero-overlay absolute inset-0 z-[2]" />

      {/* Particle field */}
      <ParticleField />

      {/* Animated ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] morphing-blob bg-primary/8 blur-[150px] float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] morphing-blob bg-accent/8 blur-[130px] float-medium" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-neon-pink/5 blur-[120px] float-fast" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Decorative spinning ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[4]">
        <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-primary/5 rounded-full animate-spin-slow" />
        <div className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] border border-accent/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative mb-8"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-primary/50" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 rotate-45 border border-primary/40"
            />
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-primary/50" />
          </motion.div>

          {/* Letter-by-letter animation */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-wider" style={{ perspective: "1000px" }}>
            {title.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block gold-text"
                style={{ transformOrigin: "bottom" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
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
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-heading text-xl md:text-2xl lg:text-3xl text-foreground/70 mb-4 font-light"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="font-body text-sm tracking-[0.2em] text-muted-foreground uppercase mb-8"
        >
          {t("hero.location")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex items-center justify-center gap-6 mb-10 flex-wrap"
        >
          {[
            { icon: Shield, label: t("hero.secureBooking") },
            { icon: Award, label: t("hero.bestPrice") },
            { icon: Users, label: t("hero.happyGuests") },
          ].map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 + i * 0.1, duration: 0.5 }}
              className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-primary/60 font-body"
            >
              <Icon className="w-3.5 h-3.5" /> {label}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="neon-button text-primary-foreground px-10 py-4 text-sm tracking-[0.2em] uppercase font-body font-semibold relative group"
          >
            <span className="relative z-10">{t("hero.bookStay")}</span>
            <span className="absolute -top-3 -right-3 bg-neon-pink text-primary-foreground text-[9px] font-body font-bold px-2 py-0.5 tracking-wider uppercase animate-pulse rounded-full z-20">
              {t("hero.limited")}
            </span>
          </a>
          <a
            href="#rooms"
            className="flex items-center gap-3 border border-primary/30 text-primary px-8 py-4 text-sm tracking-[0.15em] uppercase font-body hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 rounded-lg group"
          >
            {t("hero.viewRooms")}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#about" className="flex flex-col items-center gap-2 group">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[10px] tracking-[0.3em] uppercase text-primary/40 font-body"
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-primary/40 group-hover:text-primary/70 transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
