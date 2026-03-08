import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.rooms"), href: "#rooms" },
    { label: t("nav.restaurant"), href: "#restaurant" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-xl border-t border-border/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold gold-text mb-1 tracking-wider">AZWA HOTEL</h3>
            <p className="text-[10px] tracking-[0.35em] text-primary/40 font-body uppercase mb-4 sm:mb-6">✦ Bahir Dar, Ethiopia ✦</p>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{t("footer.tagline")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-base sm:text-lg tracking-[0.15em] uppercase text-foreground mb-4 sm:mb-6 font-bold">{t("footer.quickLinks")}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300 font-body">{link.label}</a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sm:col-span-2 md:col-span-1"
          >
            <h4 className="font-heading text-base sm:text-lg tracking-[0.15em] uppercase text-foreground mb-4 sm:mb-6 font-bold">{t("footer.contact")}</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body"><MapPin className="w-4 h-4 text-primary shrink-0" /> Bahir Dar, Ethiopia</div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body"><Phone className="w-4 h-4 text-primary shrink-0" /> 0998900160</div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body break-all"><Mail className="w-4 h-4 text-primary shrink-0" /> azwa-hotel@gmail.com</div>
              <a href="https://wa.me/251998900160" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-body"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/30 text-center space-y-2 sm:space-y-3"
        >
          <p className="text-xs text-muted-foreground font-body tracking-wider">© {new Date().getFullYear()} Azwa Hotel. {t("footer.rights")}</p>
          <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground/60 font-body tracking-wide">
            <span>Built by <span className="text-primary/80 font-semibold">Amanuel Endaweke</span></span>
            <span>·</span>
            <a href="tel:+251905517626" className="text-primary/60 hover:text-primary transition-colors">+251 90 551 7626</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
