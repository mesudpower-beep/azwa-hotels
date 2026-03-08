import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

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

const RoomSelector = ({ selected, onSelect }: RoomSelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ROOM_OPTIONS.map((room) => (
        <motion.button
          key={room.id}
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(room.id)}
          className={cn(
            "relative overflow-hidden rounded-xl border-2 transition-all duration-300 text-left group",
            selected === room.id
              ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
              : "border-border/30 bg-secondary/20 hover:border-primary/30"
          )}
        >
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {selected === room.id && (
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
          <div className="p-4">
            <h4 className="font-display text-foreground font-semibold text-base">{room.name}</h4>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-primary font-bold text-lg">{room.priceETB.toLocaleString()} ETB</span>
              <span className="text-muted-foreground text-xs">/ night</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {room.features.map((f) => (
                <span key={f} className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default RoomSelector;
