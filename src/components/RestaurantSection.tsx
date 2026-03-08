import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Clock, UtensilsCrossed, Coffee, Leaf } from "lucide-react";
import MenuModal from "./MenuModal";
import { useLanguage } from "@/contexts/LanguageContext";

const dishes = [
  {
    image: "/images/traditional-ethiopian.png",
    titleEn: "Traditional Ethiopian", titleAm: "ባህላዊ ኢትዮጵያዊ",
    descEn: "Authentic injera with rich doro wot, kitfo, and seasonal vegetable platters served on traditional mesob.",
    descAm: "ትክክለኛ እንጀራ ከበለጸገ ዶሮ ወጥ፣ ክትፎ፣ እና ወቅታዊ የአትክልት ሰሃን በባህላዊ መሶብ ላይ ይቀርባል።",
  },
  {
    image: "/images/international-cuisine.png",
    titleEn: "International Cuisine", titleAm: "ዓለም አቀፍ ምግቦች",
    descEn: "Continental breakfast, Italian pasta, grilled steaks, and fresh salads crafted by our expert chefs.",
    descAm: "ኮንቲኔንታል ቁርስ፣ ጣልያን ፓስታ፣ የተጠበሱ ስቴኮች እና ትኩስ ሰላጣዎች በባለሙያ ሼፎቻችን ተዘጋጅተዋል።",
  },
  {
    image: "/images/coffee-ceremony.jpg",
    titleEn: "Coffee Ceremony", titleAm: "የቡና ስነ-ስርዓት",
    descEn: "Experience the authentic Ethiopian coffee ceremony — freshly roasted beans, incense, and three rounds of tradition.",
    descAm: "ትክክለኛውን የኢትዮጵያ ቡና ስነ-ስርዓት ይለማመዱ — ትኩስ ቡና፣ ዕጣን እና ሶስት ዙር ባህላዊ ልምድ።",
  },
];

const RestaurantSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  return (
    <section id="restaurant" className="section-padding gradient-bg relative" ref={ref}>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">{t("restaurant.subtitle")}</p>
          <h2 className="section-title text-foreground">
            {t("restaurant.title1")} <span className="gold-text">{t("restaurant.title2")}</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-4 max-w-xl mx-auto">
            {t("restaurant.desc")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.titleEn}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="glow-card group overflow-hidden"
              style={{ perspective: "800px" }}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={dish.image}
                  alt={language === "am" ? dish.titleAm : dish.titleEn}
                  className="w-full aspect-[4/3] object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.15 }}
                    className="font-display text-xl font-bold text-foreground mb-1"
                  >
                    {language === "am" ? dish.titleAm : dish.titleEn}
                  </motion.h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {language === "am" ? dish.descAm : dish.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-6 text-sm font-body text-muted-foreground">
            {[
              { icon: Coffee, label: t("restaurant.breakfast"), time: "6:30 – 10:00 AM" },
              { icon: UtensilsCrossed, label: t("restaurant.lunch"), time: "12:00 – 3:00 PM" },
              { icon: Leaf, label: t("restaurant.dinner"), time: "6:00 – 10:00 PM" },
              { icon: Clock, label: t("restaurant.roomService"), time: "24 Hours" },
            ].map(({ icon: Icon, label, time }) => (
              <motion.div key={label} whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" />
                <span>{label} <span className="text-foreground">{time}</span></span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(true)}
              className="border border-primary/30 text-primary px-8 py-3 text-xs tracking-[0.15em] uppercase font-body font-medium hover:bg-primary/10 hover:border-primary/50 transition-all rounded-lg whitespace-nowrap"
            >
              {t("restaurant.viewMenu")}
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#booking"
              className="neon-button text-primary-foreground px-8 py-3 text-xs tracking-[0.15em] uppercase font-body font-semibold whitespace-nowrap"
            >
              {t("restaurant.reserve")}
            </motion.a>
          </div>
        </motion.div>
      </div>
      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
};

export default RestaurantSection;
