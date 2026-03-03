import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Clock, UtensilsCrossed, Coffee, Leaf } from "lucide-react";
import MenuModal from "./MenuModal";

const dishes = [
  {
    image: "/images/restaurant.jpg",
    title: "Traditional Ethiopian",
    description: "Authentic injera with rich doro wot, kitfo, and seasonal vegetable platters served on traditional mesob.",
  },
  {
    image: "/images/spa.jpg",
    title: "International Cuisine",
    description: "Continental breakfast, Italian pasta, grilled steaks, and fresh salads crafted by our expert chefs.",
  },
  {
    image: "/images/pool.jpg",
    title: "Coffee Ceremony",
    description: "Experience the authentic Ethiopian coffee ceremony — freshly roasted beans, incense, and three rounds of tradition.",
  },
];

const RestaurantSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section id="restaurant" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Culinary Experience</p>
          <h2 className="section-title text-foreground">
            Dining & <span className="gold-text">Restaurant</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-4 max-w-xl mx-auto">
            Enjoy local and international cuisine in our in-house restaurant — from traditional Ethiopian flavors to continental favorites
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">{dish.title}</h3>
                </div>
              </div>
              <div className="glass-card p-5 border-t-0">
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{dish.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-6 text-sm font-body text-muted-foreground">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-primary" />
              <span>Breakfast: <span className="text-foreground">6:30 – 10:00 AM</span></span>
            </div>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-primary" />
              <span>Lunch: <span className="text-foreground">12:00 – 3:00 PM</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-primary" />
              <span>Dinner: <span className="text-foreground">6:00 – 10:00 PM</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Room Service: <span className="text-foreground">24 Hours</span></span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="border border-primary/40 text-primary px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-primary/10 transition-all whitespace-nowrap"
            >
              View Menu
            </button>
            <a
              href="#booking"
              className="gold-gradient text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Reserve a Table
            </a>
          </div>
        </motion.div>
      </div>

      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
};

export default RestaurantSection;
