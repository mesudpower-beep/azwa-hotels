import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Star } from "lucide-react";

const attractions = [
  {
    name: "Lake Tana Monasteries",
    description: "Explore ancient island monasteries dating back to the 14th century, home to priceless Ethiopian Orthodox art and manuscripts.",
    distance: "2 min walk",
    highlight: "UNESCO Heritage",
  },
  {
    name: "Blue Nile Falls (Tiss Issat)",
    description: "Witness the majestic 'Smoking Water' — one of Africa's most spectacular waterfalls, just a short drive from the hotel.",
    distance: "30 min drive",
    highlight: "Must See",
  },
  {
    name: "Lake Tana Boat Tours",
    description: "Cruise the largest lake in Ethiopia, visit hidden monasteries on remote islands, and spot hippos and exotic birdlife.",
    distance: "5 min walk",
    highlight: "Popular Tour",
  },
  {
    name: "Bahir Dar Market",
    description: "Immerse yourself in the vibrant local culture. Find traditional crafts, spices, handwoven textiles, and authentic Ethiopian coffee.",
    distance: "10 min walk",
    highlight: "Cultural Experience",
  },
];

const AttractionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Explore</p>
          <h2 className="section-title text-foreground">
            Nearby <span className="gold-text">Attractions</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-4 max-w-lg mx-auto">
            Located in the heart of Bahir Dar, surrounded by Ethiopia's most treasured landmarks
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {attractions.map((attraction, index) => (
            <motion.div
              key={attraction.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 group hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-body tracking-wider uppercase text-primary font-semibold">
                    {attraction.highlight}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-body">{attraction.distance}</span>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {attraction.name}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {attraction.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary/60">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[11px] font-body tracking-wide">From Azwa Hotel</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-xs text-muted-foreground font-body tracking-wider">
            Our concierge team arranges all excursions and transfers — just ask at reception
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AttractionsSection;
