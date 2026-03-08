import { format, differenceInDays } from "date-fns";
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
    <div className="glass-card p-6 space-y-4 sticky top-24">
      <h3 className="font-display text-foreground font-semibold text-lg border-b border-border/30 pb-3">
        Booking Summary
      </h3>

      {room && (
        <div className="flex gap-3">
          <img src={room.image} alt={room.name} className="w-16 h-12 object-cover rounded-lg" />
          <div>
            <p className="text-foreground font-medium text-sm">{room.name}</p>
            <p className="text-primary text-sm font-semibold">{room.priceETB.toLocaleString()} ETB / night</p>
          </div>
        </div>
      )}

      {checkIn && checkOut && (
        <div className="text-sm space-y-1 text-muted-foreground">
          <div className="flex justify-between">
            <span>Check-in</span>
            <span className="text-foreground">{format(checkIn, "MMM d, yyyy")}</span>
          </div>
          <div className="flex justify-between">
            <span>Check-out</span>
            <span className="text-foreground">{format(checkOut, "MMM d, yyyy")}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration</span>
            <span className="text-foreground">{nights} night{nights !== 1 ? "s" : ""}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Guests</span>
        <span className="text-foreground">{adults} Adults, {children} Children</span>
      </div>

      <div className="border-t border-border/30 pt-3 space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal ({nights} nights)</span>
          <span className="text-foreground">{subtotal.toLocaleString()} ETB</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Tax (15%)</span>
          <span className="text-foreground">{tax.toLocaleString()} ETB</span>
        </div>
        <div className="flex justify-between font-bold text-foreground text-base pt-2 border-t border-border/30">
          <span>Total</span>
          <span className="text-primary">{total.toLocaleString()} ETB</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
