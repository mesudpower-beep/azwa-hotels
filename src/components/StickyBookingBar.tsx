import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Users, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const StickyBookingBar = () => {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  useEffect(() => {
    return scrollY.on("change", (y) => {
      setVisible(y > 600);
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:block hidden"
        >
          <div
            className="border-t border-border/30 backdrop-blur-2xl"
            style={{
              background: "linear-gradient(180deg, hsl(30 15% 9% / 0.95), hsl(30 15% 7% / 0.98))",
              boxShadow: "0 -4px 30px hsl(30 15% 8% / 0.5), 0 -1px 0 hsl(145 45% 42% / 0.1)",
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
              {/* Hotel name */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-display text-lg font-bold gold-text tracking-wider">AZWA</span>
                <div className="w-px h-8 bg-border/30" />
                <div>
                  <p className="text-[10px] text-muted-foreground font-body tracking-wider uppercase">From</p>
                  <p className="font-display text-lg font-bold text-foreground">$61<span className="text-xs text-muted-foreground font-body font-normal">/night</span></p>
                </div>
              </div>

              {/* Quick info chips */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border border-border/40 rounded-lg px-3 py-2 bg-secondary/20">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-foreground/70 font-body">{t("booking.checkIn")}</span>
                </div>
                <div className="flex items-center gap-2 border border-border/40 rounded-lg px-3 py-2 bg-secondary/20">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-foreground/70 font-body">{t("booking.checkOut")}</span>
                </div>
                <div className="flex items-center gap-2 border border-border/40 rounded-lg px-3 py-2 bg-secondary/20">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-foreground/70 font-body">2 {t("booking.guests")}</span>
                </div>
              </div>

              {/* CTA */}
              <motion.a
                href="#booking"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button text-primary-foreground px-8 py-3 text-xs tracking-[0.15em] uppercase font-body font-semibold flex items-center gap-2 shrink-0"
              >
                {t("nav.bookNow")}
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBookingBar;
