import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Waves, Dumbbell, UtensilsCrossed, Wine, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const amenities = [
  { icon: Sparkles, titleEn: "Luxury Spa", titleAm: "የቅንጦት ስፓ", descEn: "Rejuvenating treatments with traditional Ethiopian wellness rituals and premium products.", descAm: "ከባህላዊ የኢትዮጵያ ጤና ስርዓቶችና ከፕሪሚየም ምርቶች ጋር የሚያድሱ ሕክምናዎች።" },
  { icon: Dumbbell, titleEn: "Fitness Center", titleAm: "የአካል ብቃት ማዕከል", descEn: "State-of-the-art equipment with personal trainers and yoga classes overlooking the lake.", descAm: "ዘመናዊ መሳሪያዎች ከግል አሰልጣኞችና የዮጋ ክፍሎች ከሐይቅ እይታ ጋር።" },
  { icon: Waves, titleEn: "Infinity Pool", titleAm: "ገደል ያለ መዋኛ", descEn: "Stunning lakeside infinity pool with private cabanas and poolside dining service.", descAm: "የሚያስደንቅ ከሐይቅ ጎን ያለ መዋኛ ከግል ካባናዎችና ከመዋኛ ዳር ምግብ አገልግሎት ጋር።" },
  { icon: UtensilsCrossed, titleEn: "Fine Dining", titleAm: "ምርጥ ምግብ", descEn: "World-class cuisine blending Ethiopian flavors with international gastronomy.", descAm: "ዓለም አቀፍ ደረጃ ያለው ምግብ የኢትዮጵያ ጣዕም ከዓለም አቀፍ ምግብ ጋር።" },
  { icon: Wine, titleEn: "Rooftop Bar", titleAm: "ጣሪያ ላይ ባር", descEn: "Handcrafted cocktails and premium wines with panoramic sunset views over Lake Tana.", descAm: "በእጅ የተሰሩ ኮክቴሎችና ፕሪሚየም ወይኖች ከጣና ሐይቅ ላይ ፀሐይ ስትጠልቅ ሰፊ እይታ ጋር።" },
  { icon: Clock, titleEn: "24/7 Concierge", titleAm: "24/7 ኮንሲየርጅ", descEn: "Dedicated concierge team for bespoke excursions, transfers, and personalized experiences.", descAm: "ለግል ጉዞዎች፣ ማመላለሻዎችና ልዩ ተሞክሮዎች የተሰጠ ቡድን።" },
];

const AmenitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section id="amenities" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">{t("amenities.subtitle")}</p>
          <h2 className="section-title text-foreground">
            {t("amenities.title1")} <span className="gold-text">{t("amenities.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.titleEn}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 text-center group hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-14 h-14 mx-auto mb-6 border border-primary/30 flex items-center justify-center group-hover:gold-gradient group-hover:border-transparent transition-all duration-500">
                <amenity.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {language === "am" ? amenity.titleAm : amenity.titleEn}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {language === "am" ? amenity.descAm : amenity.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
