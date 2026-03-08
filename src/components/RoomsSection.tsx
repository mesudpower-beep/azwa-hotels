import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Flame } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const rooms = [
  {
    name: "King Room",
    descEn: "Spacious open-concept rooms with king-sized bed, fully-stocked minibar, air conditioning, and ensuite bathroom. Perfect for travelers seeking comfort and style.",
    descAm: "ሰፊ ክፍት ክፍሎች ከኪንግ መጠን አልጋ፣ ሚኒባር፣ ኤርኮንዲሽነር እና መታጠቢያ ቤት ጋር። ምቾትና ዘይቤ ለሚፈልጉ ተጓዦች ፍጹም ነው።",
    price: "$61", image: "/images/room-deluxe.jpg",
    features: ["King Bed", "City View", "20–25 sqm", "Minibar"], badge: null,
  },
  {
    name: "Deluxe Room",
    descEn: "Elegantly appointed with premium furnishings, plush bedding, and stunning views of Lake Tana. Enhanced amenities for a refined stay.",
    descAm: "በቅንጦት ያጌጠ ከፕሪሚየም ቁሳቁስ፣ ምቹ አልጋና የጣና ሐይቅ ምርጥ እይታ ጋር።",
    price: "$74", image: "/images/room-executive.jpg",
    features: ["King Bed", "Lake View", "30 sqm", "Rain Shower"], badge: "Most Popular",
  },
  {
    name: "Twin Double Room",
    descEn: "Two comfortable double beds with breathtaking lake views — ideal for friends traveling together or families with older children.",
    descAm: "ሁለት ምቹ ድርብ አልጋዎች ከሚያስደንቅ የሐይቅ እይታ ጋር — ለጓደኞችና ቤተሰቦች ተስማሚ።",
    price: "$81", image: "/images/room-presidential.jpg",
    features: ["Twin Beds", "Lake View", "35 sqm", "Living Area"], badge: null,
  },
  {
    name: "Family Triple Room",
    descEn: "Our most spacious accommodation with triple bedding, a separate living area, and panoramic views. Perfect for families creating lasting memories.",
    descAm: "በጣም ሰፊው ማረፊያችን ከሶስት አልጋ፣ የተለየ የመኖሪያ ቦታ እና ሰፊ እይታ ጋር።",
    price: "$111", image: "/images/lobby.jpg",
    features: ["Triple Beds", "Panoramic View", "50 sqm", "Family Space"], badge: "Best for Families",
  },
];

const RoomsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section id="rooms" className="section-padding bg-background relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">{t("rooms.subtitle")}</p>
          <h2 className="section-title text-foreground">
            {t("rooms.title1")} <span className="gold-text">{t("rooms.title2")}</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-4 max-w-lg mx-auto">
            {t("rooms.desc")}
          </p>
        </motion.div>

        <div className="space-y-24">
          {rooms.map((room, index) => (
            <RoomCard key={room.name} room={room} index={index} language={language} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RoomCard = ({ room, index, language, t }: { room: typeof rooms[0]; index: number; language: string; t: (key: string) => string }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
        <div className="relative overflow-hidden group rounded-xl">
          <motion.div style={{ y: imageY }}>
            <img
              src={room.image}
              alt={`${room.name} interior at Azwa Hotel Bahir Dar`}
              className="w-full aspect-[16/10] object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            className="absolute top-6 right-6 glass-card px-4 py-2"
          >
            <span className="font-display text-2xl font-bold gold-text">{room.price}</span>
            <span className="text-xs text-muted-foreground font-body ml-1">{t("rooms.perNight")}</span>
          </motion.div>

          {room.badge && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-6 left-6 neon-button px-3 py-1.5 flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5" />
              <span className="text-[10px] font-body font-bold tracking-wider uppercase">{room.badge}</span>
            </motion.div>
          )}

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-[11px] font-body text-primary tracking-wide text-center">
              ⚡ {t("rooms.roomsLeft")}
            </p>
          </div>
        </div>
      </div>

      <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-2xl md:text-3xl font-bold text-foreground"
        >
          {room.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-muted-foreground font-body leading-relaxed"
        >
          {language === "am" ? room.descAm : room.descEn}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap gap-3"
        >
          {room.features.map((feature, i) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
              className="border border-primary/20 text-primary/80 text-xs tracking-wider uppercase px-4 py-2 font-body rounded-lg hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(280_85%_65%/0.15)] transition-all duration-300 cursor-default"
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          href="#booking"
          className="inline-block neon-button text-primary-foreground px-8 py-3 text-xs tracking-[0.15em] uppercase font-body font-semibold mt-2"
        >
          {t("rooms.bookThis")}
        </motion.a>
      </div>
    </motion.div>
  );
};

export default RoomsSection;
