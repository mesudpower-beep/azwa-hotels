import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Luxury hotel exterior at sunset overlooking Lake Tana"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="section-subtitle mb-4 text-sm md:text-base">Welcome to</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gold-text leading-tight"
        >
          HOTEL NAME
        </motion.h1>

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
          className="font-body text-sm tracking-[0.2em] text-muted-foreground uppercase mb-12"
        >
          Bahir Dar, Ethiopia
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="gold-gradient text-primary-foreground px-10 py-4 text-sm tracking-[0.25em] uppercase font-body font-medium hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_72%_55%/0.3)]"
          >
            Book Your Stay
          </a>
          <a
            href="https://wa.me/251000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-primary/40 text-primary px-8 py-4 text-sm tracking-[0.15em] uppercase font-body hover:bg-primary/10 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
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
