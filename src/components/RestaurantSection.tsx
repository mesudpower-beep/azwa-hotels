import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Clock, UtensilsCrossed, Coffee, Leaf } from "lucide-react";
import MenuModal from "./MenuModal";
import { useLanguage } from "@/contexts/LanguageContext";

const dishes = [
  {
    image: "/images/traditional-ethiopian.png",
    titleEn: "Traditional Ethiopian",
    titleAm: "ባህላዊ ኢትዮጵያዊ",
    descEn: "Authentic injera with rich doro wot, kitfo, and seasonal vegetable platters served on traditional mesob.",
    descAm: "ትክክለኛ እንጀራ ከበለጸገ ዶሮ ወጥ፣ ክትፎ፣ እና ወቅታዊ የአትክልት ሰሃን በባህላዊ መሶብ ላይ ይቀርባል።",
  },
  {
    image: "/images/international-cuisine.png",
    titleEn: "International Cuisine",
    titleAm: "ዓለም አቀፍ ምግቦች",
    descEn: "Continental breakfast, Italian pasta, grilled steaks, and fresh salads crafted by our expert chefs.",
    descAm: "ኮንቲኔንታል ቁርስ፣ ጣልያን ፓስታ፣ የተጠበሱ ስቴኮች እና ትኩስ ሰላጣዎች በባለሙያ ሼፎቻችን ተዘጋጅተዋል።",
  },
  {
    image: "/images/coffee-ceremony.jpg",
    titleEn: "Coffee Ceremony",
    titleAm: "የቡና ስነ-ስርዓት",
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
    <section id="restaurant" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={language === "am" ? dish.titleAm : dish.titleEn}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {language === "am" ? dish.titleAm : dish.titleEn}
                  </h3>
                </div>
              </div>
              <div className="glass-card p-5 border-t-0">
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {language === "am" ? dish.descAm : dish.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-6 text-sm font-body text-muted-foreground">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-primary" />
              <span>{t("restaurant.breakfast")} <span className="text-foreground">6:30 – 10:00 AM</span></span>
            </div>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-primary" />
              <span>{t("restaurant.lunch")} <span className="text-foreground">12:00 – 3:00 PM</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-primary" />
              <span>{t("restaurant.dinner")} <span className="text-foreground">6:00 – 10:00 PM</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{t("restaurant.roomService")} <span className="text-foreground">24 Hours</span></span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="border border-primary/40 text-primary px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-primary/10 transition-all whitespace-nowrap"
            >
              {t("restaurant.viewMenu")}
            </button>
            <a
              href="#booking"
              className="gold-gradient text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {t("restaurant.reserve")}
            </a>
          </div>
        </motion.div>
      </div>

      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
};

export default RestaurantSection;
