import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.rooms"), href: "#rooms" },
    { label: t("nav.restaurant"), href: "#restaurant" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-3xl font-bold gold-text mb-1 tracking-wider drop-shadow-[0_0_15px_hsl(43_72%_55%/0.3)]">AZWA HOTEL</h3>
            <p className="text-[10px] tracking-[0.35em] text-primary/60 font-body uppercase mb-6">★ Bahir Dar, Ethiopia ★</p>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-heading text-lg tracking-[0.15em] uppercase text-foreground mb-6">{t("footer.quickLinks")}</h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">{link.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg tracking-[0.15em] uppercase text-foreground mb-6">{t("footer.contact")}</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body"><MapPin className="w-4 h-4 text-primary shrink-0" /> Bahir Dar, Ethiopia</div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body"><Phone className="w-4 h-4 text-primary shrink-0" /> 0998900160</div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body"><Mail className="w-4 h-4 text-primary shrink-0" /> mesudpower@mail.com</div>
              <a href="https://wa.me/251998900160" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:text-gold-light transition-colors font-body"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground font-body tracking-wider">© {new Date().getFullYear()} Azwa Hotel. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
