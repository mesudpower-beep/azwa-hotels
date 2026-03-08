import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const experiences = [
  {
    titleEn: "Ethiopian Coffee Ceremony",
    titleAm: "የኢትዮጵያ ቡና ስነ-ስርዓት",
    descEn: "Participate in the sacred Buna ceremony — freshly roasted beans, incense, and three rounds of tradition in our garden terrace.",
    descAm: "በቅዱስ ቡና ስነ-ስርዓት ይሳተፉ — ትኩስ ቡና፣ ዕጣን እና ሦስት ዙር ባህል።",
    duration: "90 min",
    guests: "2–8",
    rating: 4.9,
    image: "/images/coffee-ceremony.jpg",
    tags: ["Traditional", "Daily"],
  },
  {
    titleEn: "Lake Tana Boat Excursion",
    titleAm: "የጣና ሐይቅ ጀልባ ጉዞ",
    descEn: "Cruise Ethiopia's largest lake, visit hidden island monasteries, spot hippos, and witness spectacular birdlife with our expert guides.",
    descAm: "በኢትዮጵያ ትልቁ ሐይቅ ይጓዙ፣ ደሴት ገዳማትን ይጎብኙ፣ ጉማሬዎችንና ወፎችን ይመልከቱ።",
    duration: "3–4 hrs",
    guests: "2–12",
    rating: 4.8,
    image: "/images/gallery/lake-1.jpg",
    tags: ["Adventure", "Popular"],
  },
  {
    titleEn: "Blue Nile Falls Day Trip",
    titleAm: "የዓባይ ፏፏቴ ጉዞ",
    descEn: "Witness the majestic 'Smoking Water' — one of Africa's most spectacular waterfalls. Includes guide, transport, and packed lunch.",
    descAm: "ግርማ ሞገስ ያለውን 'ጭስ ያለ ውሃ' ይመልከቱ — ከአፍሪካ ትልቁ ፏፏቴ አንዱ።",
    duration: "Full day",
    guests: "2–6",
    rating: 5.0,
    image: "/images/gallery/lake-3.jpg",
    tags: ["Must See", "Guided"],
  },
  {
    titleEn: "Spa & Wellness Retreat",
    titleAm: "ስፓ እና ጤና ማረፊያ",
    descEn: "Ancient healing practices combined with modern spa treatments. Herbal steam bath, traditional massage, and aromatherapy.",
    descAm: "ጥንታዊ ፈውስ ልምዶች ከዘመናዊ ስፓ ሕክምናዎች ጋር — ከዕፅዋት የእንፋሎት ገላ መታጠብ እና ማሳጅ።",
    duration: "2–3 hrs",
    guests: "1–2",
    rating: 4.7,
    image: "/images/gallery/spa-1.jpg",
    tags: ["Wellness", "Relaxing"],
  },
];

const ExperiencesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  return (
    <section className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">
            {language === "am" ? "ልምዶች" : "Curated Experiences"}
          </p>
          <h2 className="section-title text-foreground">
            {language === "am" ? "ልዩ" : "Immersive"}{" "}
            <span className="gold-text">{language === "am" ? "ተሞክሮዎች" : "Journeys"}</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-4 max-w-lg mx-auto">
            {language === "am"
              ? "ባህር ዳርን የሚያሳዩ በጥንቃቄ የተዘጋጁ ተሞክሮዎች"
              : "Discover authentic Ethiopian culture through carefully curated experiences designed for the discerning traveler"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.titleEn}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="glow-card group relative overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.titleEn}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                {/* Rating badge */}
                <div className="absolute top-4 right-4 glass-card px-3 py-1.5 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="text-sm font-display font-bold text-foreground">{exp.rating}</span>
                </div>

                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-[0.15em] uppercase font-body font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/20 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary/90 transition-colors">
                  {language === "am" ? exp.titleAm : exp.titleEn}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                  {language === "am" ? exp.descAm : exp.descEn}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary/70" />
                      <span className="text-xs font-body">{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="w-3.5 h-3.5 text-primary/70" />
                      <span className="text-xs font-body">{exp.guests} guests</span>
                    </div>
                  </div>
                  <motion.a
                    href="#booking"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-1.5 text-xs font-body font-semibold text-primary tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Book
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10 text-xs text-muted-foreground font-body tracking-wider"
        >
          {language === "am"
            ? "ሁሉንም ተሞክሮዎች በመቀበያ ያስይዙ ወይም በWhatsApp ያነጋግሩን"
            : "Book any experience at reception or contact us via WhatsApp — our concierge will arrange everything"}
        </motion.p>
      </div>
    </section>
  );
};

export default ExperiencesSection;
