import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, BedDouble, Users, Maximize, Bath } from "lucide-react";

const rooms = [
  {
    name: "King Room",
    description: "Spacious open-concept rooms with king-sized bed, fully-stocked minibar, air conditioning, and ensuite bathroom. Perfect for travelers seeking comfort and style.",
    price: "$61",
    per: "per night",
    image: "/images/room-deluxe.jpg",
    features: ["King Bed", "City View", "20–25 sqm", "Minibar"],
    badge: null,
  },
  {
    name: "Deluxe Room",
    description: "Elegantly appointed with premium furnishings, plush bedding, and stunning views of Lake Tana. Enhanced amenities for a refined stay.",
    price: "$74",
    per: "per night",
    image: "/images/room-executive.jpg",
    features: ["King Bed", "Lake View", "30 sqm", "Rain Shower"],
    badge: "Most Popular",
  },
  {
    name: "Twin Double Room",
    description: "Two comfortable double beds with breathtaking lake views — ideal for friends traveling together or families with older children.",
    price: "$81",
    per: "per night",
    image: "/images/room-presidential.jpg",
    features: ["Twin Beds", "Lake View", "35 sqm", "Living Area"],
    badge: null,
  },
  {
    name: "Family Triple Room",
    description: "Our most spacious accommodation with triple bedding, a separate living area, and panoramic views. Perfect for families creating lasting memories.",
    price: "$111",
    per: "per night",
    image: "/images/lobby.jpg",
    features: ["Triple Beds", "Panoramic View", "50 sqm", "Family Space"],
    badge: "Best for Families",
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
          <p className="text-muted-foreground font-body text-sm mt-4 max-w-lg mx-auto">
            First-class rooms with breathtaking views, excellent service and genuine hospitality — your home for unforgettable moments
          </p>
        </motion.div>

        <div className="space-y-20">
          {rooms.map((room, index) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative overflow-hidden group">
                  <img
                    src={room.image}
                    alt={`${room.name} interior at Azwa Hotel Bahir Dar`}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-6 right-6 glass-card px-4 py-2">
                    <span className="font-display text-2xl font-bold text-primary">{room.price}</span>
                    <span className="text-xs text-muted-foreground font-body ml-1">{room.per}</span>
                  </div>
                  {room.badge && (
                    <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-3 py-1.5 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-body font-bold tracking-wider uppercase">{room.badge}</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[11px] font-body text-primary tracking-wide text-center">
                      ⚡ Only 3 rooms left for this month
                    </p>
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
