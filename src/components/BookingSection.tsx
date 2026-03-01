import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Users, MessageCircle, User, Mail, Phone, FileText } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const BookingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [children, setChildren] = useState("0");
  const [roomType, setRoomType] = useState("king");
  const [specialRequests, setSpecialRequests] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (!checkIn) newErrors.checkIn = "Check-in date is required";
    if (!checkOut) newErrors.checkOut = "Check-out date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const roomLabels: Record<string, string> = {
    king: "King Room — $61/night",
    deluxe: "Deluxe Room — $74/night",
    twin: "Twin Double Room — $81/night",
    family: "Family Triple Room — $111/night",
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `🏨 *New Booking Request — Azwa Hotel*`,
      ``,
      `👤 *Name:* ${name.trim()}`,
      `📧 *Email:* ${email.trim()}`,
      `📞 *Phone:* ${phone.trim()}`,
      `🛏️ *Room:* ${roomLabels[roomType]}`,
      `📅 *Check-in:* ${checkIn ? format(checkIn, "PPP") : "N/A"}`,
      `📅 *Check-out:* ${checkOut ? format(checkOut, "PPP") : "N/A"}`,
      `👥 *Guests:* ${guests} Adults, ${children} Children`,
    ];
    if (specialRequests.trim()) {
      lines.push(`📝 *Special Requests:* ${specialRequests.trim()}`);
    }
    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields");
      return;
    }
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/251998900160?text=${message}`, "_blank");
    toast.success("Redirecting to WhatsApp to complete your booking!");
  };

  const inputClasses =
    "w-full flex items-center gap-3 border border-border bg-background/50 px-4 py-3 text-sm font-body";

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
          {/* Personal Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Full Name <span className="text-destructive">*</span>
              </label>
              <div className={cn(inputClasses, errors.name && "border-destructive")}>
                <User className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                  placeholder="Your full name"
                  className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground"
                  maxLength={100}
                />
              </div>
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Email <span className="text-destructive">*</span>
              </label>
              <div className={cn(inputClasses, errors.email && "border-destructive")}>
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                  placeholder="your@email.com"
                  className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground"
                  maxLength={255}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Phone <span className="text-destructive">*</span>
              </label>
              <div className={cn(inputClasses, errors.phone && "border-destructive")}>
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
                  placeholder="+251 9XX XXX XXX"
                  className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground"
                  maxLength={20}
                />
              </div>
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Check-in Date <span className="text-destructive">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      inputClasses, "text-left",
                      !checkIn && "text-muted-foreground",
                      errors.checkIn && "border-destructive"
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
                    onSelect={(d) => { setCheckIn(d); setErrors((p) => ({ ...p, checkIn: "" })); }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.checkIn && <p className="text-xs text-destructive mt-1">{errors.checkIn}</p>}
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Check-out Date <span className="text-destructive">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      inputClasses, "text-left",
                      !checkOut && "text-muted-foreground",
                      errors.checkOut && "border-destructive"
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
                    onSelect={(d) => { setCheckOut(d); setErrors((p) => ({ ...p, checkOut: "" })); }}
                    disabled={(date) => date < (checkIn || new Date())}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.checkOut && <p className="text-xs text-destructive mt-1">{errors.checkOut}</p>}
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Guests
              </label>
              <div className={cn(inputClasses)}>
                <Users className="w-4 h-4 text-primary" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent text-foreground flex-1 outline-none"
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
                Children
              </label>
              <div className={cn(inputClasses)}>
                <Users className="w-4 h-4 text-primary" />
                <select
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  className="bg-transparent text-foreground flex-1 outline-none"
                >
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n} className="bg-card text-foreground">
                      {n} {n === 1 ? "Child" : "Children"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Room Type
              </label>
              <div className={cn(inputClasses)}>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="bg-transparent text-foreground flex-1 outline-none"
                >
                  <option value="king" className="bg-card text-foreground">King Room — $61/night</option>
                  <option value="deluxe" className="bg-card text-foreground">Deluxe Room — $74/night</option>
                  <option value="twin" className="bg-card text-foreground">Twin Double Room — $81/night</option>
                  <option value="family" className="bg-card text-foreground">Family Triple Room — $111/night</option>
                </select>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
              Special Requests <span className="text-muted-foreground text-[10px]">(optional)</span>
            </label>
            <div className="border border-border bg-background/50 px-4 py-3">
              <div className="flex gap-3">
                <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special requests or preferences..."
                  rows={3}
                  className="bg-transparent flex-1 outline-none text-sm font-body text-foreground placeholder:text-muted-foreground resize-none"
                  maxLength={500}
                />
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
              Chat on WhatsApp
            </a>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;
