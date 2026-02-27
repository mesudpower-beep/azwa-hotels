import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Waves, Dumbbell, UtensilsCrossed, Wine, Clock, Sparkles } from "lucide-react";

const amenities = [
  { icon: Sparkles, title: "Luxury Spa", description: "Rejuvenating treatments with traditional Ethiopian wellness rituals and premium products." },
  { icon: Dumbbell, title: "Fitness Center", description: "State-of-the-art equipment with personal trainers and yoga classes overlooking the lake." },
  { icon: Waves, title: "Infinity Pool", description: "Stunning lakeside infinity pool with private cabanas and poolside dining service." },
  { icon: UtensilsCrossed, title: "Fine Dining", description: "World-class cuisine blending Ethiopian flavors with international gastronomy." },
  { icon: Wine, title: "Rooftop Bar", description: "Handcrafted cocktails and premium wines with panoramic sunset views over Lake Tana." },
  { icon: Clock, title: "24/7 Concierge", description: "Dedicated concierge team for bespoke excursions, transfers, and personalized experiences." },
];

const AmenitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="amenities" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Experiences</p>
          <h2 className="section-title text-foreground">
            Amenities & <span className="gold-text">Services</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 text-center group hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-14 h-14 mx-auto mb-6 border border-primary/30 flex items-center justify-center group-hover:gold-gradient group-hover:border-transparent transition-all duration-500">
                <amenity.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{amenity.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{amenity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
