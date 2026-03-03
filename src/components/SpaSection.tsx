import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Droplets, Wind, Heart } from "lucide-react";

const services = [
  { icon: Sparkles, title: "Full Body Massage", description: "Traditional and Swedish massage techniques to relieve tension and restore energy." },
  { icon: Droplets, title: "Steam Room", description: "Purify body and mind in our aromatic steam room with eucalyptus infusion." },
  { icon: Wind, title: "Relaxation Lounge", description: "Unwind in our serene lounge with herbal teas, soft music, and lake views." },
  { icon: Heart, title: "Couples Treatment", description: "Share a rejuvenating experience with side-by-side massage in a private suite." },
];

const SpaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="spa" className="section-padding bg-secondary/30 relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-primary blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="/images/spa.jpg"
              alt="Azwa Hotel spa and wellness center"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass-card p-4 text-center">
              <p className="font-heading text-lg text-primary italic">Relax and recharge with our wellness services</p>
            </div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-10"
            >
              <p className="section-subtitle mb-4">Wellness</p>
              <h2 className="section-title text-foreground">
                Spa & <span className="gold-text">Relaxation</span>
              </h2>
              <p className="text-muted-foreground font-body text-sm mt-4 leading-relaxed">
                Step into tranquility at Azwa Hotel's wellness retreat. Our skilled therapists combine modern techniques with traditional Ethiopian healing to restore your body and spirit.
              </p>
            </motion.div>

            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 shrink-0 border border-primary/30 flex items-center justify-center group-hover:gold-gradient group-hover:border-transparent transition-all duration-500">
                    <service.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{service.title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              href="#booking"
              className="inline-block gold-gradient text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:opacity-90 transition-opacity mt-8"
            >
              Book a Treatment
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaSection;
