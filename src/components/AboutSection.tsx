import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

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
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <img
                src="/images/lobby.jpg"
                alt="Azwa Hotel entrance and coffee shop in Bahir Dar"
                className="w-full aspect-[4/5] object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute top-6 left-6 glass-card px-4 py-2.5 flex items-center gap-2">
                <span className="font-display text-xl font-bold text-primary">4.9</span>
                <div>
                  <div className="flex gap-0.5 text-primary text-[10px]">★★★★★</div>
                  <p className="text-[9px] text-muted-foreground font-body tracking-wide">Google Reviews</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="section-subtitle">{t("about.subtitle")}</p>
            <h2 className="section-title text-foreground">
              {t("about.title1")} <span className="gold-text">{t("about.title2")}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p>{t("about.desc1")}</p>
              <p>{t("about.desc2")}</p>
            </div>

            <div className="space-y-3 pt-2">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-3 group">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 group-hover:drop-shadow-[0_0_8px_hsl(280_85%_65%/0.5)] transition-all" />
                  <span className="text-sm text-foreground/70 font-body">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-12 pt-6">
              {[
                { number: "50+", label: t("about.rooms") },
                { number: "15+", label: t("about.years") },
                { number: "4.9", label: t("about.rating") },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-bold gold-text">{stat.number}</p>
                  <p className="text-xs tracking-wider uppercase text-muted-foreground font-body mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
