import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, UtensilsCrossed, Wine, Clock, Sparkles, Wifi, Sun, Wind, Coffee, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const amenities = [
  { icon: Wifi, titleEn: "Free WiFi", titleAm: "ነፃ ዋይፋይ", descEn: "High-speed wireless internet available throughout the hotel — lobby, rooms, and restaurant.", descAm: "በሆቴሉ ሁሉ ከፍተኛ ፍጥነት ያለው ገመድ አልባ ኢንተርኔት — ሎቢ፣ ክፍሎች እና ሬስቶራንት።" },
  { icon: Sun, titleEn: "Private Balcony", titleAm: "የግል በረንዳ", descEn: "Every room features a private balcony with breathtaking views of Lake Tana and the surrounding landscape.", descAm: "እያንዳንዱ ክፍል ከጣና ሐይቅ እና ከአካባቢው መልክዓ ምድር ድንቅ እይታ ያለው የግል በረንዳ አለው።" },
  { icon: Wind, titleEn: "Air Conditioning", titleAm: "ኤሲ (አየር ማቀዝቀዣ)", descEn: "Modern climate control in every room ensuring your comfort year-round in Bahir Dar's tropical climate.", descAm: "በባህር ዳር ሞቃታማ የአየር ንብረት ውስጥ ምቾትዎን ለማረጋገጥ በእያንዳንዱ ክፍል ዘመናዊ የአየር ማቀዝቀዣ።" },
  { icon: Coffee, titleEn: "Complimentary Breakfast", titleAm: "ነፃ ቁርስ", descEn: "Start your day with a generous breakfast buffet featuring Ethiopian and international dishes.", descAm: "ቀንዎን በኢትዮጵያ እና በዓለም አቀፍ ምግቦች በተሞላ ሰፊ የቁርስ ቡፌ ይጀምሩ።" },
  { icon: Car, titleEn: "Huge Parking Space", titleAm: "ሰፊ የመኪና ማቆሚያ", descEn: "Spacious and secure parking area accommodating cars, vans, and tour buses with 24/7 security.", descAm: "መኪናዎችን፣ ቫኖችን እና የቱር አውቶቡሶችን የሚያስተናግድ ሰፊና ደህንነቱ የተጠበቀ የመኪና ማቆሚያ ከ24/7 ጥበቃ ጋር።" },
  { icon: Sparkles, titleEn: "Luxury Spa", titleAm: "የቅንጦት ስፓ", descEn: "Rejuvenating treatments with traditional Ethiopian wellness rituals and premium products.", descAm: "ከባህላዊ የኢትዮጵያ ጤና ስርዓቶችና ከፕሪሚየም ምርቶች ጋር የሚያድሱ ሕክምናዎች።" },
  { icon: UtensilsCrossed, titleEn: "Fine Dining", titleAm: "ምርጥ ምግብ", descEn: "World-class cuisine blending Ethiopian flavors with international gastronomy.", descAm: "ዓለም አቀፍ ደረጃ ያለው ምግብ የኢትዮጵያ ጣዕም ከዓለም አቀፍ ምግብ ጋር።" },
  { icon: Wine, titleEn: "Rooftop Bar", titleAm: "ጣሪያ ላይ ባር", descEn: "Handcrafted cocktails and premium wines with panoramic sunset views over Lake Tana.", descAm: "በእጅ የተሰሩ ኮክቴሎችና ፕሪሚየም ወይኖች ከጣና ሐይቅ ላይ ፀሐይ ስትጠልቅ ሰፊ እይታ ጋር።" },
];

const AmenitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section id="amenities" className="section-padding gradient-bg relative" ref={ref}>
      <div className="max-w-7xl mx-auto relative z-10">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.titleEn}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="glow-card p-8 text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-6 border border-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-500">
                <amenity.icon className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_10px_hsl(280_85%_65%/0.5)] transition-all duration-500" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">
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
