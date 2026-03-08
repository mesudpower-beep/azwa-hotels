import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCounter } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const roomCount = useCounter(50, 2000, isInView);
  const yearCount = useCounter(15, 2000, isInView);

  const checklist = [
    t("about.shuttle"),
    t("about.coffee"),
    t("about.wifi"),
    t("about.roomService"),
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="section-padding gradient-bg relative" ref={ref}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -2 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative group">
              <img
                src="/images/lobby.jpg"
                alt="Azwa Hotel entrance and coffee shop in Bahir Dar"
                className="w-full aspect-[4/5] object-cover rounded-xl transition-all duration-700 group-hover:scale-[1.03] group-hover:shadow-[0_0_60px_hsl(280_85%_65%/0.15)]"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background/60 to-transparent" />
              
              {/* Floating badge with pulse */}
              <motion.div
                animate={isInView ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 glass-card px-4 py-2.5 flex items-center gap-2"
              >
                <span className="font-display text-xl font-bold text-primary">4.9</span>
                <div>
                  <div className="flex gap-0.5 text-primary text-[10px]">★★★★★</div>
                  <p className="text-[9px] text-muted-foreground font-body tracking-wide">Google Reviews</p>
                </div>
              </motion.div>

              {/* Corner decorative element */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-primary/20 rounded-xl -z-10 group-hover:border-primary/40 transition-colors duration-700" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-3 pt-2"
            >
              {checklist.map((item) => (
                <motion.div key={item} variants={itemVariants} className="flex items-center gap-3 group">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 group-hover:drop-shadow-[0_0_12px_hsl(280_85%_65%/0.6)] transition-all duration-500 group-hover:scale-110" />
                  <span className="text-sm text-foreground/70 font-body">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex gap-12 pt-6">
              {[
                { number: roomCount, suffix: "+", label: t("about.rooms") },
                { number: yearCount, suffix: "+", label: t("about.years") },
                { number: 4.9, suffix: "", label: t("about.rating"), isStatic: true },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
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
