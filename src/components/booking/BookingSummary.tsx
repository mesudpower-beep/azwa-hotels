import { format, differenceInDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Sparkles } from "lucide-react";
import { ROOM_OPTIONS } from "./RoomSelector";

interface BookingSummaryProps {
  roomType: string;
  checkIn?: Date;
  checkOut?: Date;
  adults: string;
  children: string;
}

const BookingSummary = ({ roomType, checkIn, checkOut, adults, children }: BookingSummaryProps) => {
  const room = ROOM_OPTIONS.find((r) => r.id === roomType);
  const nights = checkIn && checkOut ? Math.max(differenceInDays(checkOut, checkIn), 1) : 0;
  const subtotal = room ? room.priceETB * nights : 0;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + tax;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 space-y-5 sticky top-24 overflow-hidden"
    >
      {/* Decorative corner glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-[60px] pointer-events-none" />

      <div className="relative">
        <h3 className="font-display text-foreground font-semibold text-lg border-b border-border/30 pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Booking Summary
        </h3>

        <AnimatePresence mode="wait">
          {room && (
            <motion.div
              key={roomType}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-3 mt-4"
            >
              <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0">
                <motion.img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">{room.name}</p>
                <p className="text-primary text-sm font-semibold">{room.priceETB.toLocaleString()} ETB / night</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {checkIn && checkOut && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm space-y-2 text-muted-foreground mt-4 pt-4 border-t border-border/20"
          >
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-primary" />Check-in</span>
              <span className="text-foreground font-medium">{format(checkIn, "MMM d, yyyy")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-primary" />Check-out</span>
              <span className="text-foreground font-medium">{format(checkOut, "MMM d, yyyy")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Duration</span>
              <motion.span
                key={nights}
                initial={{ scale: 1.3, color: "hsl(280 85% 65%)" }}
                animate={{ scale: 1, color: "hsl(0 0% 95%)" }}
                className="font-medium"
              >
                {nights} night{nights !== 1 ? "s" : ""}
              </motion.span>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between text-sm text-muted-foreground mt-4 pt-4 border-t border-border/20">
          <span className="flex items-center gap-2"><Users className="w-3 h-3 text-primary" />Guests</span>
          <span className="text-foreground font-medium">{adults} Adults, {children} Children</span>
        </div>

        {nights > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t border-border/30 pt-4 mt-4 space-y-2 text-sm"
          >
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({nights} nights)</span>
              <span className="text-foreground">{subtotal.toLocaleString()} ETB</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (15%)</span>
              <span className="text-foreground">{tax.toLocaleString()} ETB</span>
            </div>
            <motion.div
              className="flex justify-between font-bold text-foreground text-lg pt-3 border-t border-border/30"
              layout
            >
              <span>Total</span>
              <motion.span
                key={total}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-primary"
                style={{
                  textShadow: "0 0 20px hsl(280 85% 65% / 0.3)",
                }}
              >
                {total.toLocaleString()} ETB
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BookingSummary;
