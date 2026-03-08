import { motion, useInView, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  { value: 8, suffix: "+", labelEn: "Years of Excellence", labelAm: "ዓመታት ልቀት", prefix: "" },
  { value: 15000, suffix: "+", labelEn: "Happy Guests", labelAm: "ደስተኛ እንግዶች", prefix: "" },
  { value: 4.9, suffix: "", labelEn: "Guest Rating", labelAm: "የእንግዳ ደረጃ", prefix: "★ " },
  { value: 40, suffix: "+", labelEn: "Luxury Rooms", labelAm: "የቅንጦት ክፍሎች", prefix: "" },
];

const AnimatedNumber = ({ value, inView }: { value: number; inView: boolean }) => {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const isFloat = value % 1 !== 0;
    const duration = 2000;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * value;
      setDisplay(isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString());
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span>{display}</span>;
};

const StatsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(30 18% 10%) 0%, hsl(150 15% 8%) 50%, hsl(30 15% 8%) 100%)",
          }}
        />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: "hsl(145 45% 42% / 0.04)", filter: "blur(150px)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelEn}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative inline-block mb-3">
                  <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold gold-text">
                    {stat.prefix}
                    <AnimatedNumber value={stat.value} inView={isInView} />
                    {stat.suffix}
                  </span>
                  <motion.div
                    className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-primary/60"
                    animate={isInView ? { scale: [0, 1.5, 1], opacity: [0, 1, 0.6] } : {}}
                    transition={{ delay: 1.5 + i * 0.15, duration: 0.5 }}
                    style={{ boxShadow: "0 0 12px hsl(145 45% 42% / 0.5)" }}
                  />
                </div>
                <motion.div
                  className="h-px w-12 mx-auto mb-3"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(145 45% 42% / 0.4), transparent)" }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
                />
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body">
                  {language === "am" ? stat.labelAm : stat.labelEn}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
