import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Droplets, Wind, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  { icon: Sparkles, titleEn: "Full Body Massage", titleAm: "ሙሉ ሰውነት ማሸት", descEn: "Traditional and Swedish massage techniques to relieve tension and restore energy.", descAm: "ውጥረትን ለማስታገስና ጉልበት ለመመለስ ባህላዊና ስዊድን ማሸት ዘዴዎች።" },
  { icon: Droplets, titleEn: "Steam Room", titleAm: "የእንፋሎት ክፍል", descEn: "Purify body and mind in our aromatic steam room with eucalyptus infusion.", descAm: "በመዓዛ ባለ የእንፋሎት ክፍላችን ውስጥ ሰውነትና አእምሮን ያጥፉ።" },
  { icon: Wind, titleEn: "Relaxation Lounge", titleAm: "የዕረፍት ክፍል", descEn: "Unwind in our serene lounge with herbal teas, soft music, and lake views.", descAm: "በሰላማዊ ክፍላችን ውስጥ በዕፅዋት ሻይ፣ ለስላሳ ሙዚቃና የሐይቅ እይታ ያርፉ።" },
  { icon: Heart, titleEn: "Couples Treatment", titleAm: "ለጥንዶች ሕክምና", descEn: "Share a rejuvenating experience with side-by-side massage in a private suite.", descAm: "በግል ስዊት ውስጥ ጎን ለጎን ማሸት ያጋሩ።" },
];

const SpaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section id="spa" className="section-padding bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <img src="/images/spa.jpg" alt="Azwa Hotel spa and wellness center" className="w-full aspect-[4/5] object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.02]" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-xl" />
            <div className="absolute bottom-6 left-6 right-6 glass-card p-4 text-center">
              <p className="font-heading text-lg text-primary font-medium">{t("spa.relaxMessage")}</p>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-10"
            >
              <p className="section-subtitle mb-4">{t("spa.subtitle")}</p>
              <h2 className="section-title text-foreground">
                {t("spa.title1")} <span className="gold-text">{t("spa.title2")}</span>
              </h2>
              <p className="text-muted-foreground font-body text-sm mt-4 leading-relaxed">{t("spa.desc")}</p>
            </motion.div>

            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.titleEn}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 shrink-0 border border-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-500">
                    <service.icon className="w-5 h-5 text-primary group-hover:drop-shadow-[0_0_8px_hsl(280_85%_65%/0.5)] transition-all duration-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      {language === "am" ? service.titleAm : service.titleEn}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {language === "am" ? service.descAm : service.descEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              href="#booking"
              className="inline-block neon-button text-primary-foreground px-8 py-3 text-xs tracking-[0.15em] uppercase font-body font-semibold mt-8"
            >
              {t("spa.book")}
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaSection;
