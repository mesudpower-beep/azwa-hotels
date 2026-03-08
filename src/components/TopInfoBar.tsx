import { MapPin, Phone, Mail, Star } from "lucide-react";
import { motion } from "framer-motion";

const TopInfoBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-secondary/80 backdrop-blur-md border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-body tracking-wider">
          <MapPin className="w-3 h-3 text-primary" />
          <span>Bahir Dar, Ethiopia</span>
          <div className="flex items-center gap-0.5 ml-2 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-primary" />
            ))}
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-[10px] text-muted-foreground font-body tracking-wider">
          <a href="tel:+251998900160" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3 h-3" />
            <span>+251 998 900 160</span>
          </a>
          <div className="w-px h-3 bg-border/40" />
          <a href="mailto:info@azwahotel.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="w-3 h-3" />
            <span>info@azwahotel.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopInfoBar;
