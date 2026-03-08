import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface RoomOption {
  id: string;
  name: string;
  priceUSD: number;
  priceETB: number;
  image: string;
  features: string[];
}

export const ROOM_OPTIONS: RoomOption[] = [
  { id: "king", name: "King Room", priceUSD: 61, priceETB: 7500, image: "/images/room-deluxe.jpg", features: ["King Bed", "City View", "Free Wi-Fi"] },
  { id: "deluxe", name: "Deluxe Room", priceUSD: 74, priceETB: 9100, image: "/images/room-executive.jpg", features: ["Queen Bed", "Lake View", "Mini Bar"] },
  { id: "twin", name: "Twin Double", priceUSD: 81, priceETB: 9950, image: "/images/room-presidential.jpg", features: ["2 Double Beds", "Garden View", "Workspace"] },
  { id: "family", name: "Family Triple", priceUSD: 111, priceETB: 13600, image: "/images/lobby.jpg", features: ["3 Beds", "Extra Space", "Kids Amenities"] },
];

interface RoomSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 60,
    rotateX: -15,
    scale: 0.9,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const RoomSelector = ({ selected, onSelect }: RoomSelectorProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ perspective: "1200px" }}>
      {ROOM_OPTIONS.map((room, i) => {
        const isSelected = selected === room.id;
        const isHovered = hoveredId === room.id;

        return (
          <motion.button
            key={room.id}
            type="button"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -8,
              scale: 1.03,
              rotateY: 2,
              rotateX: -2,
              transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] },
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(room.id)}
            onHoverStart={() => setHoveredId(room.id)}
            onHoverEnd={() => setHoveredId(null)}
            className={cn(
              "relative overflow-hidden rounded-2xl text-left group",
              "border-2 transition-colors duration-500",
              "transform-gpu",
              isSelected
                 ? "border-primary shadow-[0_0_40px_hsl(145_45%_42%/0.25),0_20px_60px_hsl(30_15%_8%/0.5)]"
                 : "border-border/20 hover:border-primary/40"
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 z-0"
              animate={{
                background: isSelected
                  ? "linear-gradient(135deg, hsl(145 45% 42% / 0.15), hsl(38 70% 50% / 0.1), hsl(25 50% 45% / 0.08))"
                  : "linear-gradient(135deg, hsl(30 12% 12% / 0.9), hsl(30 12% 14% / 0.8))",
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Shimmer overlay on hover */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{ x: "-100%", opacity: 0 }}
              animate={isHovered ? { x: "200%", opacity: 0.15 } : { x: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.3), transparent)",
                width: "50%",
              }}
            />

            {/* Image with parallax-like zoom */}
            <div className="aspect-[16/9] overflow-hidden relative">
              <motion.img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover"
                loading="lazy"
                animate={{
                  scale: isHovered ? 1.15 : isSelected ? 1.05 : 1,
                  filter: isHovered ? "brightness(1.1)" : "brightness(0.85)",
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

              {/* Selection checkmark with burst animation */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute top-3 right-3 z-20"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_hsl(280_85%_65%/0.5)]">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    {/* Ripple rings */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary/50"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Price floating badge */}
              <motion.div
                className="absolute bottom-3 left-3 z-20"
                animate={{ y: isHovered ? -4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5 bg-card/80 backdrop-blur-md border border-primary/30 rounded-lg px-3 py-1.5">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-primary font-bold text-sm">{room.priceETB.toLocaleString()}</span>
                  <span className="text-muted-foreground text-[10px]">ETB/night</span>
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-4">
              <div className="flex items-center justify-between">
                <motion.h4
                  className="font-display text-foreground font-semibold text-base"
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {room.name}
                </motion.h4>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1 text-primary text-[10px] uppercase tracking-widest font-semibold"
                  >
                    <Star className="w-3 h-3 fill-primary" />
                    Selected
                  </motion.div>
                )}
              </div>

              {/* Feature pills with stagger */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {room.features.map((f, fi) => (
                  <motion.span
                    key={f}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 + fi * 0.06 + 0.3, duration: 0.4 }}
                    className={cn(
                      "text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border transition-colors duration-300",
                      isSelected
                        ? "text-primary border-primary/30 bg-primary/10"
                        : "text-muted-foreground border-border/30 bg-secondary/30"
                    )}
                  >
                    {f}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Bottom glow line for selected */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-center"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(280 85% 65%), hsl(220 90% 60%), transparent)",
                  }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
};

export default RoomSelector;
