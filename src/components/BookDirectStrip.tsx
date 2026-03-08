import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BadgePercent, CreditCard, ShieldCheck, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const benefits = [
  { icon: BadgePercent, labelEn: "Best Price Guaranteed", labelAm: "ምርጥ ዋጋ ዋስትና", color: "hsl(280 85% 65%)" },
  { icon: CreditCard, labelEn: "No Booking Fees", labelAm: "ያለ ክፍያ ማስያዝ", color: "hsl(220 90% 60%)" },
  { icon: ShieldCheck, labelEn: "Free Cancellation", labelAm: "ነጻ ስረዛ", color: "hsl(160 80% 45%)" },
  { icon: Clock, labelEn: "Instant Confirmation", labelAm: "ፈጣን ማረጋገጫ", color: "hsl(330 90% 65%)" },
];

const BookDirectStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { language } = useLanguage();

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div
        className="border-y border-border/20"
        style={{
          background: "linear-gradient(135deg, hsl(260 25% 6%) 0%, hsl(260 20% 8%) 50%, hsl(260 25% 6%) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.labelEn}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 group"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-lg border border-border/30 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-primary/40"
                  style={{ boxShadow: `0 0 0px ${b.color}00` }}
                >
                  <b.icon className="w-4.5 h-4.5 text-primary" style={{ color: b.color }} />
                </motion.div>
                <span className="text-xs font-body text-foreground/70 tracking-wide leading-tight group-hover:text-foreground transition-colors">
                  {language === "am" ? b.labelAm : b.labelEn}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDirectStrip;
