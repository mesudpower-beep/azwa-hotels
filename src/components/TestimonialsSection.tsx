import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    name: "Sarah Johnson", location: "New York, USA", rating: 5,
    textEn: "An absolutely extraordinary experience. The suite overlooking the city was breathtaking. The staff anticipated every need before we even asked. This is luxury redefined.",
    textAm: "ፍጹም ልዩ ተሞክሮ። ከተማውን የሚያይ ስዊቱ አስደናቂ ነበር። ሰራተኞቹ ከመጠየቃችን በፊት ሁሉንም ነገር ያዘጋጁ ነበር።",
    avatar: "SJ", stayTypeEn: "Family Vacation", stayTypeAm: "የቤተሰብ ዕረፍት",
  },
  {
    name: "Ahmed Hassan", location: "Dubai, UAE", rating: 5,
    textEn: "Having stayed at the finest hotels across the Middle East and Europe, I can confidently say Azwa Hotel rivals them all. The blend of Ethiopian culture with world-class service is remarkable.",
    textAm: "በመካከለኛው ምስራቅና አውሮፓ ምርጥ ሆቴሎች ውስጥ ከቆየሁ በኋላ አዝዋ ሆቴል ከሁሉም ጋር ይወዳደራል ብዬ በልበ ሙሉነት እላለሁ።",
    avatar: "AH", stayTypeEn: "Business Trip", stayTypeAm: "የንግድ ጉዞ",
  },
  {
    name: "Elena Rossi", location: "Milan, Italy", rating: 5,
    textEn: "The spa was divine, the dining exceptional, and the views unforgettable. Every detail spoke of thoughtful elegance. We extended our stay twice — it was simply impossible to leave.",
    textAm: "ስፓው ድንቅ ነበር፣ ምግቡ ልዩ፣ እይታው የማይረሳ። ሁሉም ዝርዝር ስለ ውበት ይናገራል። ሁለት ጊዜ ቆይታችንን አራዘምን።",
    avatar: "ER", stayTypeEn: "Honeymoon", stayTypeAm: "የሙሽሮች ጉዞ",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section id="testimonials" className="section-padding bg-background relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">{t("testimonials.subtitle")}</p>
          <h2 className="section-title text-foreground">
            {t("testimonials.title1")} <span className="gold-text">{t("testimonials.title2")}</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-4">
            {t("testimonials.ratedDesc")} <span className="text-primary font-semibold">4.9/5</span> {t("testimonials.verifiedReviews")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="glow-card p-8 flex flex-col relative group"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 200 }}
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors duration-500" />
              </motion.div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.15 + i * 0.05, type: "spring", stiffness: 300 }}
                  >
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>

              <span className="text-[10px] font-body tracking-wider uppercase text-primary/50 mb-4">
                {language === "am" ? review.stayTypeAm : review.stayTypeEn}
              </span>
              <p className="text-foreground/70 font-body text-sm leading-relaxed italic flex-1">
                "{language === "am" ? review.textAm : review.textEn}"
              </p>

              <div className="mt-8 pt-6 border-t border-border/30 flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-body font-bold text-xs"
                >
                  {review.avatar}
                </motion.div>
                <div>
                  <p className="font-display text-base font-bold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground font-body tracking-wider mt-0.5">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
