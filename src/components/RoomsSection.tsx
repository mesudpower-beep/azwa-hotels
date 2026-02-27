import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rooms = [
  {
    name: "Deluxe Room",
    description: "Elegantly appointed with premium furnishings, plush bedding, and stunning views of the city. Perfect for discerning travelers seeking comfort and style.",
    price: "$180",
    per: "per night",
    image: "/images/room-deluxe.jpg",
    features: ["King Bed", "City View", "40 sqm", "Rain Shower"],
  },
  {
    name: "Executive Suite",
    description: "A spacious sanctuary featuring a separate living area, panoramic windows, and bespoke amenities for the ultimate luxury experience.",
    price: "$320",
    per: "per night",
    image: "/images/room-executive.jpg",
    features: ["King Bed", "Lake View", "75 sqm", "Living Room"],
  },
  {
    name: "Presidential Suite",
    description: "The pinnacle of luxury. Floor-to-ceiling lake views, private dining area, premium bar, and personalized butler service.",
    price: "$550",
    per: "per night",
    image: "/images/room-presidential.jpg",
    features: ["King Bed", "Lake Panorama", "120 sqm", "Butler Service"],
  },
];

const RoomsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rooms" className="section-padding bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Accommodations</p>
          <h2 className="section-title text-foreground">
            Rooms & <span className="gold-text">Suites</span>
          </h2>
        </motion.div>

        <div className="space-y-20">
          {rooms.map((room, index) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative overflow-hidden group">
                  <img
                    src={room.image}
                    alt={`${room.name} interior`}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-6 right-6 glass-card px-4 py-2">
                    <span className="font-display text-2xl font-bold text-primary">{room.price}</span>
                    <span className="text-xs text-muted-foreground font-body ml-1">{room.per}</span>
                  </div>
                </div>
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  {room.name}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">{room.description}</p>
                <div className="flex flex-wrap gap-3">
                  {room.features.map((feature) => (
                    <span
                      key={feature}
                      className="border border-primary/30 text-primary text-xs tracking-wider uppercase px-4 py-2 font-body"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <a
                  href="#booking"
                  className="inline-block gold-gradient text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-body font-medium hover:opacity-90 transition-opacity mt-2"
                >
                  Book This Room
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
