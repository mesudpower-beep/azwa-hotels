import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <a href="#home" className="flex flex-col items-center">
            <span className="font-display text-2xl lg:text-3xl font-bold gold-text tracking-widest drop-shadow-[0_0_15px_hsl(43_72%_55%/0.3)]">
              AZWA HOTEL
            </span>
            <span className="text-[9px] tracking-[0.35em] text-primary/60 font-body uppercase mt-0.5">
              ★ Bahir Dar ★
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors duration-300 font-body"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+251998900160"
              className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="font-body">0998900160</span>
            </a>
            <a
              href="#booking"
              className="gold-gradient text-primary-foreground px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-body font-medium hover:opacity-90 transition-opacity"
            >
              Book Now
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border/50"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm tracking-[0.15em] uppercase text-foreground/80 hover:text-primary transition-colors font-body py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setIsOpen(false)}
                className="block gold-gradient text-primary-foreground text-center px-6 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium mt-4"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
