import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
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
  {
    name: "David Kim", location: "Seoul, Korea", rating: 5,
    textEn: "Lake Tana at sunrise from our balcony was magical. The traditional coffee ceremony and the warmth of the staff made us feel truly at home. An unforgettable Ethiopian experience.",
    textAm: "ከበረንዳችን ጣና ሐይቅ ጎህ ሲቀድ አስማታዊ ነበር። ባህላዊ የቡና ስነ ስርዓትና የሰራተኞች ሞቅ ያለ አቀባበል።",
    avatar: "DK", stayTypeEn: "Cultural Tour", stayTypeAm: "የባህል ጉብኝት",
  },
  {
    name: "Maria García", location: "Barcelona, Spain", rating: 5,
    textEn: "From the moment we arrived, everything was impeccable. The restaurant's fusion of Ethiopian and international cuisine was a highlight. We'll definitely be returning!",
    textAm: "ከደረስንበት ጊዜ ጀምሮ ሁሉም ነገር ፍጹም ነበር። የምግብ ቤቱ የኢትዮጵያ እና ዓለም አቀፍ ምግብ ጥምረት ድንቅ ነበር።",
    avatar: "MG", stayTypeEn: "Anniversary Trip", stayTypeAm: "የመታሰቢያ ጉዞ",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  const review = testimonials[current];

  return (
    <section id="testimonials" className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: "hsl(145 45% 42% / 0.03)", filter: "blur(150px)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.p
            className="section-subtitle mb-4"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {t("testimonials.subtitle")}
          </motion.p>
          <h2 className="section-title text-foreground">
            {t("testimonials.title1")} <span className="gold-text">{t("testimonials.title2")}</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-4">
            {t("testimonials.ratedDesc")} <motion.span className="text-primary font-semibold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>4.9/5</motion.span> {t("testimonials.verifiedReviews")}
          </p>
        </motion.div>

        {/* Featured Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="glow-card p-8 md:p-12 min-h-[320px] flex flex-col justify-center relative overflow-hidden">
            {/* Big quote watermark */}
            <Quote className="absolute top-6 right-8 w-20 h-20 text-primary/[0.04]" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <span className="text-[10px] font-body tracking-wider uppercase text-primary/50 mb-4">
                  {language === "am" ? review.stayTypeAm : review.stayTypeEn}
                </span>

                <p className="text-foreground/80 font-body text-base md:text-lg leading-relaxed italic max-w-2xl mb-8">
                  "{language === "am" ? review.textAm : review.textEn}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-body font-bold text-sm"
                    style={{ boxShadow: "0 0 20px hsl(145 45% 42% / 0.2)" }}
                  >
                    {review.avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-display text-base font-bold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground font-body tracking-wider">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, hsl(145 45% 42% / 0.3), transparent)" }}
            />
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="relative w-8 h-[3px] rounded-full overflow-hidden bg-border/30"
                  aria-label={`Go to review ${i + 1}`}
                >
                  {current === i && (
                    <motion.div
                      layoutId="testimonial-dot"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(280 85% 65%), hsl(220 90% 60%))" }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 transition-all"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
