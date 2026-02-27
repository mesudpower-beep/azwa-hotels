import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Users, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const BookingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("deluxe");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    toast.success("Booking request submitted! We'll contact you shortly.");
  };

  return (
    <section id="booking" className="relative section-padding" ref={ref}>
      <div className="absolute inset-0">
        <img src="/images/pool.jpg" alt="Hotel pool" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="section-subtitle mb-4">Reservations</p>
          <h2 className="section-title text-foreground">
            Book Your <span className="gold-text">Stay</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 md:p-12 space-y-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Check-in Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "w-full flex items-center gap-3 border border-border bg-background/50 px-4 py-3 text-sm font-body text-left",
                      !checkIn && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="w-4 h-4 text-primary" />
                    {checkIn ? format(checkIn, "PPP") : "Select date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Check-out Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "w-full flex items-center gap-3 border border-border bg-background/50 px-4 py-3 text-sm font-body text-left",
                      !checkOut && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="w-4 h-4 text-primary" />
                    {checkOut ? format(checkOut, "PPP") : "Select date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => date < (checkIn || new Date())}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Guests
              </label>
              <div className="flex items-center gap-3 border border-border bg-background/50 px-4 py-3">
                <Users className="w-4 h-4 text-primary" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent text-sm font-body text-foreground flex-1 outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n} className="bg-card text-foreground">
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Room Type
              </label>
              <div className="flex items-center gap-3 border border-border bg-background/50 px-4 py-3">
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="bg-transparent text-sm font-body text-foreground flex-1 outline-none"
                >
                  <option value="deluxe" className="bg-card text-foreground">Deluxe Room — $180/night</option>
                  <option value="executive" className="bg-card text-foreground">Executive Suite — $320/night</option>
                  <option value="presidential" className="bg-card text-foreground">Presidential Suite — $550/night</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="gold-gradient text-primary-foreground px-10 py-4 text-sm tracking-[0.2em] uppercase font-body font-medium hover:opacity-90 transition-opacity flex-1"
            >
              Request Booking
            </button>
            <a
              href="https://wa.me/251998900160"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 border border-primary/40 text-primary px-8 py-4 text-sm tracking-[0.15em] uppercase font-body hover:bg-primary/10 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Book via WhatsApp
            </a>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;
