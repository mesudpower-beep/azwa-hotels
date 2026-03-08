import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Dumbbell, UtensilsCrossed, Wine, Sparkles, Wifi, Sun, Wind, Coffee, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const amenities = [
  { icon: Wifi, titleEn: "Free WiFi", titleAm: "ነፃ ዋይፋይ", descEn: "High-speed wireless internet available throughout the hotel — lobby, rooms, and restaurant.", descAm: "በሆቴሉ ሁሉ ከፍተኛ ፍጥነት ያለው ገመድ አልባ ኢንተርኔት — ሎቢ፣ ክፍሎች እና ሬስቶራንት።", color: "from-blue-500 to-cyan-400", glow: "blue" },
  { icon: Sun, titleEn: "Private Balcony", titleAm: "የግል በረንዳ", descEn: "Every room features a private balcony with breathtaking views of Lake Tana and the surrounding landscape.", descAm: "እያንዳንዱ ክፍል ከጣና ሐይቅ እና ከአካባቢው መልክዓ ምድር ድንቅ እይታ ያለው የግል በረንዳ አለው።", color: "from-amber-400 to-orange-500", glow: "amber" },
  { icon: Wind, titleEn: "Air Conditioning", titleAm: "ኤሲ (አየር ማቀዝቀዣ)", descEn: "Modern climate control in every room ensuring your comfort year-round in Bahir Dar's tropical climate.", descAm: "በባህር ዳር ሞቃታማ የአየር ንብረት ውስጥ ምቾትዎን ለማረጋገጥ በእያንዳንዱ ክፍል ዘመናዊ የአየር ማቀዝቀዣ።", color: "from-sky-400 to-indigo-500", glow: "sky" },
  { icon: Coffee, titleEn: "Complimentary Breakfast", titleAm: "ነፃ ቁርስ", descEn: "Start your day with a generous breakfast buffet featuring Ethiopian and international dishes.", descAm: "ቀንዎን በኢትዮጵያ እና በዓለም አቀፍ ምግቦች በተሞላ ሰፊ የቁርስ ቡፌ ይጀምሩ።", color: "from-yellow-400 to-amber-500", glow: "yellow" },
  { icon: Car, titleEn: "Huge Parking Space", titleAm: "ሰፊ የመኪና ማቆሚያ", descEn: "Spacious and secure parking area accommodating cars, vans, and tour buses with 24/7 security.", descAm: "መኪናዎችን፣ ቫኖችን እና የቱር አውቶቡሶችን የሚያስተናግድ ሰፊና ደህንነቱ የተጠበቀ የመኪና ማቆሚያ ከ24/7 ጥበቃ ጋር።", color: "from-emerald-400 to-teal-500", glow: "emerald" },
  { icon: Sparkles, titleEn: "Luxury Spa", titleAm: "የቅንጦት ስፓ", descEn: "Rejuvenating treatments with traditional Ethiopian wellness rituals and premium products.", descAm: "ከባህላዊ የኢትዮጵያ ጤና ስርዓቶችና ከፕሪሚየም ምርቶች ጋር የሚያድሱ ሕክምናዎች።", color: "from-pink-400 to-rose-500", glow: "pink" },
  { icon: UtensilsCrossed, titleEn: "Fine Dining", titleAm: "ምርጥ ምግብ", descEn: "World-class cuisine blending Ethiopian flavors with international gastronomy.", descAm: "ዓለም አቀፍ ደረጃ ያለው ምግብ የኢትዮጵያ ጣዕም ከዓለም አቀፍ ምግብ ጋር።", color: "from-purple-400 to-violet-500", glow: "purple" },
  { icon: Wine, titleEn: "Rooftop Bar", titleAm: "ጣሪያ ላይ ባር", descEn: "Handcrafted cocktails and premium wines with panoramic sunset views over Lake Tana.", descAm: "በእጅ የተሰሩ ኮክቴሎችና ፕሪሚየም ወይኖች ከጣና ሐይቅ ላይ ፀሐይ ስትጠልቅ ሰፊ እይታ ጋር።", color: "from-red-400 to-pink-500", glow: "red" },
];

const glowColors: Record<string, string> = {
  blue: "rgba(59,130,246,0.35)",
  amber: "rgba(245,158,11,0.35)",
  sky: "rgba(56,189,248,0.35)",
  yellow: "rgba(250,204,21,0.35)",
  emerald: "rgba(52,211,153,0.35)",
  pink: "rgba(236,72,153,0.35)",
  purple: "rgba(168,85,247,0.35)",
  red: "rgba(248,113,113,0.35)",
};

const AmenityCard = ({ amenity, index, isInView, language }: { amenity: typeof amenities[0]; index: number; isInView: boolean; language: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
      className="relative group cursor-default"
      style={{ perspective: "800px" }}
    >
      {/* Spotlight follow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${glowColors[amenity.glow]}, transparent 70%)`,
        }}
      />

      {/* Card */}
      <motion.div
        animate={isHovered ? {
          rotateY: (mousePos.x - 0.5) * 12,
          rotateX: -(mousePos.y - 0.5) * 12,
          scale: 1.04,
        } : { rotateY: 0, rotateX: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-2xl border border-border/30 bg-card/50 backdrop-blur-xl p-8 h-full z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className={`absolute inset-[-1px] rounded-2xl bg-gradient-to-br ${amenity.color} opacity-30`} />
          <div className="absolute inset-[1px] rounded-2xl bg-card/95" />
        </div>

        {/* Floating particles on hover */}
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${amenity.color}`}
                initial={{ opacity: 0, x: "50%", y: "80%" }}
                animate={{
                  opacity: [0, 1, 0],
                  y: ["80%", `${20 + i * 10}%`],
                  x: [`${40 + i * 5}%`, `${30 + i * 10}%`],
                }}
                transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </>
        )}

        {/* Icon container with animated ring */}
        <div className="relative z-10 mb-6" style={{ transform: "translateZ(30px)" }}>
          <motion.div
            className={`relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${amenity.color} p-[1px]`}
            animate={isHovered ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Spinning ring */}
            <motion.div
              className={`absolute -inset-2 rounded-2xl border-2 border-dashed opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
              style={{ borderColor: glowColors[amenity.glow] }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
              <motion.div
                animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <amenity.icon className={`w-7 h-7 bg-gradient-to-br ${amenity.color} bg-clip-text`} style={{ color: glowColors[amenity.glow] }} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <div className="relative z-10 text-center" style={{ transform: "translateZ(20px)" }}>
          <motion.h3
            className="font-display text-lg font-bold text-foreground mb-3"
            animate={isHovered ? { y: -2 } : { y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {language === "am" ? amenity.titleAm : amenity.titleEn}
          </motion.h3>
          <motion.p
            className="text-muted-foreground font-body text-sm leading-relaxed"
            animate={isHovered ? { y: -1 } : { y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {language === "am" ? amenity.descAm : amenity.descEn}
          </motion.p>
        </div>

        {/* Bottom shine bar */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${amenity.color} opacity-0 group-hover:opacity-100`}
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
    </motion.div>
  );
};

const AmenitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section id="amenities" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/6 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(var(--accent)), transparent 70%)" }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.p
            className="section-subtitle mb-4"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {t("amenities.subtitle")}
          </motion.p>
          <h2 className="section-title text-foreground">
            {t("amenities.title1")}{" "}
            <span className="gold-text relative">
              {t("amenities.title2")}
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[3px] gold-gradient rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </h2>
          <motion.p
            className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {language === "am"
              ? "ከምቾት ባሻገር — በእያንዳንዱ ዝርዝር ውስጥ የቅንጦት ተሞክሮ"
              : "Beyond comfort — a luxury experience woven into every detail of your stay"}
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <AmenityCard
              key={amenity.titleEn}
              amenity={amenity}
              index={index}
              isInView={isInView}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
