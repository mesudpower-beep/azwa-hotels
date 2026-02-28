import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img
                src="/images/lobby.jpg"
                alt="Azwa Hotel entrance and coffee shop in Bahir Dar"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary/30 hidden lg:block" />
              {/* Credibility badge overlay */}
              <div className="absolute top-6 left-6 glass-card px-4 py-2.5 flex items-center gap-2">
                <span className="font-display text-xl font-bold text-primary">4.9</span>
                <div>
                  <div className="flex gap-0.5 text-primary text-[10px]">★★★★★</div>
                  <p className="text-[9px] text-muted-foreground font-body tracking-wide">Google Reviews</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="section-subtitle">Our Story</p>
            <h2 className="section-title text-foreground">
              A Sanctuary of <span className="gold-text">Elegance</span>
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p>
                Nestled in the heart of Bahir Dar, Azwa Hotel stands as a beacon of luxury and 
                refined hospitality on the shores of Lake Tana — the source of the Blue Nile.
              </p>
              <p>
                Every detail has been meticulously curated to provide guests with an unforgettable 
                experience blending modern comfort with the rich cultural heritage of Ethiopia.
              </p>
            </div>

            {/* Trust-building checklist - reciprocity psychology */}
            <div className="space-y-3 pt-2">
              {[
                "Complimentary airport shuttle & welcome drink",
                "Traditional Ethiopian coffee ceremony daily",
                "Free high-speed Wi-Fi throughout the hotel",
                "24/7 room service & concierge",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground/80 font-body">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-12 pt-6">
              {[
                { number: "50+", label: "Luxury Rooms" },
                { number: "15+", label: "Years of Excellence" },
                { number: "4.9", label: "Guest Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-bold text-primary">{stat.number}</p>
                  <p className="text-xs tracking-wider uppercase text-muted-foreground font-body mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
