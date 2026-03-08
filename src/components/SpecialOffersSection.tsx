import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gift, Percent, Calendar, Plane, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const offers = [
  {
    icon: Calendar,
    titleEn: "Extended Stay Package",
    titleAm: "ረጅም ቆይታ ጥቅል",
    descEn: "Stay 3+ nights and get 15% off your total booking. Includes daily breakfast, airport shuttle, and late checkout.",
    descAm: "3+ ሌሊቶች ይቆዩ እና 15% ቅናሽ ያግኙ። ዕለታዊ ቁርስ፣ የአየር ማረፊያ ሸትል እና ዘግይቶ መውጣት ይካተታል።",
    badge: "15% OFF",
    color: "hsl(145 45% 42%)",
  },
  {
    icon: Gift,
    titleEn: "Honeymoon & Romance",
    titleAm: "ሙሽሮች ጥቅል",
    descEn: "Celebrate love with our romance package — room upgrade, flower arrangement, sparkling wine, and couples spa treatment.",
    descAm: "ፍቅርዎን ያክብሩ — የክፍል ማሻሻል፣ የአበባ ማስጌጥ፣ ወይን እና ለጥንዶች ስፓ ህክምና።",
    badge: "POPULAR",
    color: "hsl(25 50% 45%)",
  },
  {
    icon: Plane,
    titleEn: "Airport Shuttle & Welcome",
    titleAm: "የአየር ማረፊያ ሸትልና እንኳን ደህና መጡ",
    descEn: "Complimentary airport pick-up and drop-off for all guests. Share your flight details and we'll be waiting at arrivals.",
    descAm: "ለሁሉም እንግዶች ነጻ የአየር ማረፊያ ማመላለሻ። የበረራ ዝርዝርዎን ያካፍሉን በመድረሻ ላይ እንጠብቅዎታለን።",
    badge: "FREE",
    color: "hsl(150 60% 50%)",
  },
  {
    icon: Percent,
    titleEn: "Book Direct & Save",
    titleAm: "በቀጥታ ያስይዙ ይቆጥቡ",
    descEn: "Book directly with us and enjoy the best rate guarantee, no hidden fees, free cancellation, and complimentary welcome drink.",
    descAm: "በቀጥታ ያስይዙ — ምርጥ ዋጋ ዋስትና፣ ምንም ተጨማሪ ክፍያ፣ ነጻ ስረዛ እና የእንኳን ደህና መጡ መጠጥ።",
    badge: "BEST RATE",
    color: "hsl(220 90% 60%)",
  },
];

const SpecialOffersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  return (
    <section className="section-padding gradient-bg relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "hsl(280 85% 65% / 0.04)", filter: "blur(150px)" }}
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">
            {language === "am" ? "ልዩ ቅናሾች" : "Special Offers"}
          </p>
          <h2 className="section-title text-foreground">
            {language === "am" ? "ጥቅሎችና" : "Packages &"}{" "}
            <span className="gold-text">{language === "am" ? "ቅናሾች" : "Deals"}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.titleEn}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glow-card p-6 group relative overflow-hidden"
              >
                {/* Badge */}
                <div
                  className="absolute top-4 right-4 text-[9px] font-body font-bold tracking-[0.15em] px-2.5 py-1 rounded-full"
                  style={{
                    background: `${offer.color}20`,
                    color: offer.color,
                    border: `1px solid ${offer.color}30`,
                  }}
                >
                  {offer.badge}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${offer.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: offer.color }} />
                </motion.div>

                <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary/90 transition-colors">
                  {language === "am" ? offer.titleAm : offer.titleEn}
                </h3>
                <p className="text-muted-foreground font-body text-xs leading-relaxed mb-4">
                  {language === "am" ? offer.descAm : offer.descEn}
                </p>

                <motion.a
                  href="#booking"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-1.5 text-[10px] font-body font-semibold text-primary tracking-[0.15em] uppercase"
                >
                  {language === "am" ? "አሁን ያስይዙ" : "Book Now"}
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.a>

                {/* Hover shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
