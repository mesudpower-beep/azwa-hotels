import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCounter } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  const roomCount = useCounter(50, 2000, isInView);
  const yearCount = useCounter(15, 2000, isInView);

  const checklist = [
    t("about.shuttle"),
    t("about.coffee"),
    t("about.wifi"),
    t("about.roomService"),
  ];

  return (
    <section id="about" className="section-padding gradient-bg relative" ref={ref}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -3 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="relative group">
              <motion.div style={{ y: imageY, rotate: imageRotate }}>
                <img
                  src="/images/lobby.jpg"
                  alt="Azwa Hotel entrance and coffee shop in Bahir Dar"
                  className="w-full aspect-[4/5] object-cover rounded-2xl transition-all duration-700 group-hover:shadow-[0_0_80px_hsl(145_45%_42%/0.15)]"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/60 to-transparent" />
              
              <motion.div
                animate={isInView ? { y: [0, -10, 0] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-6 left-6 glass-card px-5 py-3 flex items-center gap-3"
              >
                <motion.span
                  className="font-display text-2xl font-bold text-primary"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  4.9
                </motion.span>
                <div>
                  <div className="flex gap-0.5 text-primary text-[10px]">★★★★★</div>
                  <p className="text-[9px] text-muted-foreground font-body tracking-wide">Google Reviews</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 w-28 h-28 border border-primary/20 rounded-2xl -z-10"
                animate={isInView ? { borderColor: ["hsl(145 45% 42% / 0.1)", "hsl(145 45% 42% / 0.3)", "hsl(145 45% 42% / 0.1)"] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-4 -left-4 w-20 h-20 border border-accent/10 rounded-xl -z-10"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, type: "spring" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="section-subtitle"
            >
              {t("about.subtitle")}
            </motion.p>

            <h2 className="section-title text-foreground">
              {t("about.title1")} <span className="gold-text">{t("about.title2")}</span>
            </h2>

            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p>{t("about.desc1")}</p>
              <p>{t("about.desc2")}</p>
            </div>

            <div className="space-y-3 pt-2">
              {checklist.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 group-hover:drop-shadow-[0_0_12px_hsl(145_45%_42%/0.6)] transition-all duration-500" />
                  </motion.div>
                  <span className="text-sm text-foreground/70 font-body">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-12 pt-6">
              {[
                { number: roomCount, suffix: "+", label: t("about.rooms") },
                { number: yearCount, suffix: "+", label: t("about.years") },
                { number: 4.9, suffix: "", label: t("about.rating"), isStatic: true },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.6, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="cursor-default"
                >
                  <p className="font-display text-3xl font-bold gold-text">
                    {stat.isStatic ? stat.number : stat.number}{stat.suffix}
                  </p>
                  <p className="text-xs tracking-wider uppercase text-muted-foreground font-body mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
