import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const attractions = [
  {
    nameEn: "Lake Tana Monasteries", nameAm: "የጣና ሐይቅ ገዳማት",
    descEn: "Explore ancient island monasteries dating back to the 14th century, home to priceless Ethiopian Orthodox art and manuscripts.",
    descAm: "ከ14ኛው ክፍለ ዘመን ጀምሮ ያሉ ጥንታዊ ደሴት ገዳማትን ያስሱ — የኢትዮጵያ ኦርቶዶክስ ጥበብና ብራናዎች መኖሪያ።",
    distance: "2 min walk", highlight: "UNESCO Heritage",
  },
  {
    nameEn: "Blue Nile Falls (Tiss Issat)", nameAm: "የዓባይ ፏፏቴ (ጥስ ዕሳት)",
    descEn: "Witness the majestic 'Smoking Water' — one of Africa's most spectacular waterfalls, just a short drive from the hotel.",
    descAm: "ግርማ ሞገስ ያለውን 'ጭስ ያለ ውሃ' ይመልከቱ — ከአፍሪካ ትልቁ ፏፏቴ አንዱ ከሆቴሉ ጥቂት ደቂቃ ርቀት ላይ።",
    distance: "30 min drive", highlight: "Must See",
  },
  {
    nameEn: "Lake Tana Boat Tours", nameAm: "የጣና ሐይቅ ጀልባ ጉዞዎች",
    descEn: "Cruise the largest lake in Ethiopia, visit hidden monasteries on remote islands, and spot hippos and exotic birdlife.",
    descAm: "በኢትዮጵያ ትልቁ ሐይቅ ላይ ይጓዙ፣ በሩቅ ደሴቶች ላይ ያሉ ገዳማትን ይጎብኙ።",
    distance: "5 min walk", highlight: "Popular Tour",
  },
  {
    nameEn: "Bahir Dar Market", nameAm: "ባህር ዳር ገበያ",
    descEn: "Immerse yourself in the vibrant local culture. Find traditional crafts, spices, handwoven textiles, and authentic Ethiopian coffee.",
    descAm: "በሕያው የአካባቢ ባህል ውስጥ ዘልቀው ይግቡ። ባህላዊ የእጅ ሥራዎችን፣ ቅመማ ቅመሞችንና ቡና ያግኙ።",
    distance: "10 min walk", highlight: "Cultural Experience",
  },
];

const AttractionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section className="section-padding bg-background relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">{t("attractions.subtitle")}</p>
          <h2 className="section-title text-foreground">
            {t("attractions.title1")} <span className="gold-text">{t("attractions.title2")}</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-4 max-w-lg mx-auto">
            {t("attractions.desc")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {attractions.map((attraction, index) => (
            <motion.div
              key={attraction.nameEn}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glow-card p-8 group"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-body tracking-wider uppercase text-primary font-semibold">
                    {attraction.highlight}
                  </span>
                </motion.div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-body">{attraction.distance}</span>
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {language === "am" ? attraction.nameAm : attraction.nameEn}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {language === "am" ? attraction.descAm : attraction.descEn}
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                className="h-px bg-gradient-to-r from-primary/30 to-transparent mt-4"
              />
              <div className="mt-4 flex items-center gap-2 text-primary/50 group-hover:text-primary/70 transition-colors">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[11px] font-body tracking-wide">{t("attractions.fromHotel")}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-xs text-muted-foreground font-body tracking-wider">
            {t("attractions.concierge")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AttractionsSection;
