import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flame } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const rooms = [
  {
    name: "King Room",
    descEn: "Spacious open-concept rooms with king-sized bed, fully-stocked minibar, air conditioning, and ensuite bathroom. Perfect for travelers seeking comfort and style.",
    descAm: "ሰፊ ክፍት ክፍሎች ከኪንግ መጠን አልጋ፣ ሚኒባር፣ ኤርኮንዲሽነር እና መታጠቢያ ቤት ጋር። ምቾትና ዘይቤ ለሚፈልጉ ተጓዦች ፍጹም ነው።",
    price: "$61",
    image: "/images/room-deluxe.jpg",
    features: ["King Bed", "City View", "20–25 sqm", "Minibar"],
    badge: null,
  },
  {
    name: "Deluxe Room",
    descEn: "Elegantly appointed with premium furnishings, plush bedding, and stunning views of Lake Tana. Enhanced amenities for a refined stay.",
    descAm: "በቅንጦት ያጌጠ ከፕሪሚየም ቁሳቁስ፣ ምቹ አልጋና የጣና ሐይቅ ምርጥ እይታ ጋር።",
    price: "$74",
    image: "/images/room-executive.jpg",
    features: ["King Bed", "Lake View", "30 sqm", "Rain Shower"],
    badge: "Most Popular",
  },
  {
    name: "Twin Double Room",
    descEn: "Two comfortable double beds with breathtaking lake views — ideal for friends traveling together or families with older children.",
    descAm: "ሁለት ምቹ ድርብ አልጋዎች ከሚያስደንቅ የሐይቅ እይታ ጋር — ለጓደኞችና ቤተሰቦች ተስማሚ።",
    price: "$81",
    image: "/images/room-presidential.jpg",
    features: ["Twin Beds", "Lake View", "35 sqm", "Living Area"],
    badge: null,
  },
  {
    name: "Family Triple Room",
    descEn: "Our most spacious accommodation with triple bedding, a separate living area, and panoramic views. Perfect for families creating lasting memories.",
    descAm: "በጣም ሰፊው ማረፊያችን ከሶስት አልጋ፣ የተለየ የመኖሪያ ቦታ እና ሰፊ እይታ ጋር።",
    price: "$111",
    image: "/images/lobby.jpg",
    features: ["Triple Beds", "Panoramic View", "50 sqm", "Family Space"],
    badge: "Best for Families",
  },
];

const RoomsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section id="rooms" className="section-padding bg-background relative" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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

        <div className="space-y-20">
          {rooms.map((room, index) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative overflow-hidden group rounded-xl">
                  <img
                    src={room.image}
                    alt={`${room.name} interior at Azwa Hotel Bahir Dar`}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <div className="absolute top-6 right-6 glass-card px-4 py-2">
                    <span className="font-display text-2xl font-bold gold-text">{room.price}</span>
                    <span className="text-xs text-muted-foreground font-body ml-1">{t("rooms.perNight")}</span>
                  </div>
                  {room.badge && (
                    <div className="absolute top-6 left-6 neon-button px-3 py-1.5 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-body font-bold tracking-wider uppercase">{room.badge}</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[11px] font-body text-primary tracking-wide text-center">
                      ⚡ {t("rooms.roomsLeft")}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {room.name}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {language === "am" ? room.descAm : room.descEn}
                </p>
                <div className="flex flex-wrap gap-3">
                  {room.features.map((feature) => (
                    <span
                      key={feature}
                      className="border border-primary/20 text-primary/80 text-xs tracking-wider uppercase px-4 py-2 font-body rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <a
                  href="#booking"
                  className="inline-block neon-button text-primary-foreground px-8 py-3 text-xs tracking-[0.15em] uppercase font-body font-semibold mt-2"
                >
                  {t("rooms.bookThis")}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
