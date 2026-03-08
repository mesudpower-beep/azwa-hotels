import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Shield, Award, Users, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [0, 1], [-3, 3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const title = "AZWA HOTEL";

  // Cinematic staggered letter animation
  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1, y: 0, rotateX: 0, scale: 1,
      transition: {
        delay: 0.8 + i * 0.06,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background images with crossfade + parallax tilt */}
      <AnimatePresence mode="wait">
        {heroImages.map((src, index) => (
          currentImage === index && (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
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

      {/* Multi-layer overlay for depth */}
      <div className="hero-overlay absolute inset-0 z-[2]" />
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(260 25% 4% / 0.6) 100%)",
        }}
      />

      {/* Image indicator dots */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentImage(i)}
            className="relative w-8 h-[2px] rounded-full overflow-hidden bg-foreground/20"
            whileHover={{ scale: 1.2 }}
          >
            {currentImage === i && (
              <motion.div
                layoutId="hero-dot"
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(280 85% 65%), hsl(220 90% 60%))" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Particle field */}
      <ParticleField />

      {/* Animated ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] morphing-blob"
          style={{ background: "hsl(280 85% 65% / 0.06)", filter: "blur(150px)" }}
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] morphing-blob"
          style={{ background: "hsl(220 90% 60% / 0.05)", filter: "blur(130px)" }}
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
          style={{ background: "hsl(330 90% 65% / 0.04)", filter: "blur(120px)" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Decorative spinning rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[4]">
        <motion.div
          className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-primary/[0.04] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] border border-accent/[0.04] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        {/* Dot on the ring */}
        <motion.div
          className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/30" style={{ boxShadow: "0 0 10px hsl(280 85% 65% / 0.5)" }} />
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p
            className="section-subtitle mb-6 text-sm md:text-base"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            {t("hero.welcome")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative mb-8"
        >
          {/* Decorative line above title */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
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

          {/* 3D Letter-by-letter animation with glow */}
          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-wider"
            style={{ perspective: "1200px" }}
          >
            {title.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block gold-text"
                style={{
                  transformOrigin: "bottom",
                  textShadow: "0 0 40px hsla(280, 85%, 65%, 0.15)",
                }}
                whileHover={{
                  scale: 1.2,
                  y: -10,
                  textShadow: "0 0 60px hsla(280, 85%, 65%, 0.4)",
                  transition: { duration: 0.2 },
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>

          {/* Underline glow sweep */}
          <motion.div
            className="mx-auto mt-3 h-[2px] rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(280 85% 65% / 0.6), hsl(220 90% 60% / 0.4), transparent)",
              boxShadow: "0 0 20px hsl(280 85% 65% / 0.3)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "60%", opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
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
          initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="font-heading text-xl md:text-2xl lg:text-3xl text-foreground/70 mb-4 font-light"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="font-body text-sm tracking-[0.2em] text-muted-foreground uppercase mb-8"
        >
          {t("hero.location")}
        </motion.p>

        {/* Trust badges with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
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
              transition={{ delay: 1.8 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, color: "hsl(280 85% 65%)" }}
              className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-primary/60 font-body cursor-default"
            >
              <Icon className="w-3.5 h-3.5" /> {label}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons with ripple effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#booking"
            className="neon-button text-primary-foreground px-10 py-4 text-sm tracking-[0.2em] uppercase font-body font-semibold relative group overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{t("hero.bookStay")}</span>
            <motion.span
              className="absolute -top-3 -right-3 bg-neon-pink text-primary-foreground text-[9px] font-body font-bold px-2 py-0.5 tracking-wider uppercase rounded-full z-20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {t("hero.limited")}
            </motion.span>
          </motion.a>
          <motion.a
            href="#rooms"
            className="flex items-center gap-3 border border-primary/30 text-primary px-8 py-4 text-sm tracking-[0.15em] uppercase font-body hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 rounded-lg group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shine sweep on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">{t("hero.viewRooms")}</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator with enhanced animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
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
            className="w-5 h-8 border border-primary/20 rounded-full flex items-start justify-center p-1"
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-primary/60"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
