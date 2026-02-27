import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
                alt="Grand lobby interior with marble floors and crystal chandelier"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary/30 hidden lg:block" />
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
                Nestled on the serene shores of Lake Tana in the historic city of Bahir Dar,
                our hotel stands as a beacon of luxury and refined hospitality in the heart of Ethiopia.
              </p>
              <p>
                Every detail has been meticulously curated — from the hand-selected marble in our
                grand lobby to the panoramic lake views from each suite. We believe luxury is not
                merely about opulence, but about creating moments of transcendent comfort.
              </p>
              <p>
                Whether you're here to explore the ancient monasteries of Lake Tana, witness the
                majesty of the Blue Nile Falls, or simply retreat into unparalleled serenity, our
                dedicated team ensures every moment exceeds expectation.
              </p>
            </div>
            <div className="flex gap-12 pt-6">
              {[
                { number: "50+", label: "Luxury Suites" },
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
