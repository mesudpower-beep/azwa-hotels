import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Users, MessageCircle, User, Mail, Phone, FileText } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Required";
    if (!email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email";
    if (!phone.trim()) newErrors.phone = "Required";
    if (!checkIn) newErrors.checkIn = "Required";
    if (!checkOut) newErrors.checkOut = "Required";
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
      ``, `👤 *Name:* ${name.trim()}`, `📧 *Email:* ${email.trim()}`,
      `📞 *Phone:* ${phone.trim()}`, `🛏️ *Room:* ${roomLabels[roomType]}`,
      `📅 *Check-in:* ${checkIn ? format(checkIn, "PPP") : "N/A"}`,
      `📅 *Check-out:* ${checkOut ? format(checkOut, "PPP") : "N/A"}`,
      `👥 *Guests:* ${guests} Adults, ${children} Children`,
    ];
    if (specialRequests.trim()) lines.push(`📝 *Special Requests:* ${specialRequests.trim()}`);
    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { toast.error("Please fill in all required fields"); return; }
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/251998900160?text=${message}`, "_blank");
    toast.success("Booking request sent! Redirecting to WhatsApp.");
  };

  const inputClasses = "w-full flex items-center gap-3 border border-border/50 bg-secondary/30 px-4 py-3 text-sm font-body rounded-lg transition-all duration-300 focus-within:border-primary/40 focus-within:bg-secondary/50";

  return (
    <section id="booking" className="relative section-padding" ref={ref}>
      <div className="absolute inset-0">
        <img src="/images/pool.jpg" alt="Hotel pool" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/92 backdrop-blur-sm" />
      </div>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="section-subtitle mb-4">{t("booking.subtitle")}</p>
          <h2 className="section-title text-foreground">
            {t("booking.title1")} <span className="gold-text">{t("booking.title2")}</span>
          </h2>
        </motion.div>

        <motion.form initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} onSubmit={handleSubmit} className="glass-card p-8 md:p-12 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.name")} <span className="text-destructive">*</span></label>
              <div className={cn(inputClasses, errors.name && "border-destructive/50")}>
                <User className="w-4 h-4 text-primary shrink-0" />
                <input type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} placeholder={t("booking.name")} className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground" maxLength={100} />
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.email")} <span className="text-destructive">*</span></label>
              <div className={cn(inputClasses, errors.email && "border-destructive/50")}>
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }} placeholder="your@email.com" className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground" maxLength={255} />
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.phone")} <span className="text-destructive">*</span></label>
              <div className={cn(inputClasses, errors.phone && "border-destructive/50")}>
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }} placeholder="+251 9XX XXX XXX" className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground" maxLength={20} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.checkIn")} <span className="text-destructive">*</span></label>
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className={cn(inputClasses, "text-left", !checkIn && "text-muted-foreground", errors.checkIn && "border-destructive/50")}>
                    <Calendar className="w-4 h-4 text-primary" />
                    {checkIn ? format(checkIn, "PPP") : t("booking.selectDate")}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={checkIn} onSelect={(d) => { setCheckIn(d); setErrors((p) => ({ ...p, checkIn: "" })); }} disabled={(date) => date < new Date()} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.checkOut")} <span className="text-destructive">*</span></label>
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className={cn(inputClasses, "text-left", !checkOut && "text-muted-foreground", errors.checkOut && "border-destructive/50")}>
                    <Calendar className="w-4 h-4 text-primary" />
                    {checkOut ? format(checkOut, "PPP") : t("booking.selectDate")}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={checkOut} onSelect={(d) => { setCheckOut(d); setErrors((p) => ({ ...p, checkOut: "" })); }} disabled={(date) => date < (checkIn || new Date())} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.guests")}</label>
              <div className={cn(inputClasses)}>
                <Users className="w-4 h-4 text-primary" />
                <select value={guests} onChange={(e) => setGuests(e.target.value)} className="bg-transparent text-foreground flex-1 outline-none">
                  {[1, 2, 3, 4, 5, 6].map((n) => (<option key={n} value={n} className="bg-card text-foreground">{n} {n === 1 ? "Guest" : "Guests"}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.children")}</label>
              <div className={cn(inputClasses)}>
                <Users className="w-4 h-4 text-primary" />
                <select value={children} onChange={(e) => setChildren(e.target.value)} className="bg-transparent text-foreground flex-1 outline-none">
                  {[0, 1, 2, 3, 4, 5].map((n) => (<option key={n} value={n} className="bg-card text-foreground">{n} {n === 1 ? "Child" : "Children"}</option>))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.roomType")}</label>
              <div className={cn(inputClasses)}>
                <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="bg-transparent text-foreground flex-1 outline-none">
                  <option value="king" className="bg-card text-foreground">King Room — $61/night</option>
                  <option value="deluxe" className="bg-card text-foreground">Deluxe Room — $74/night</option>
                  <option value="twin" className="bg-card text-foreground">Twin Double Room — $81/night</option>
                  <option value="family" className="bg-card text-foreground">Family Triple Room — $111/night</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
              {t("booking.specialRequests")} <span className="text-muted-foreground text-[10px]">{t("booking.optional")}</span>
            </label>
            <div className="border border-border/50 bg-secondary/30 px-4 py-3 rounded-lg transition-all duration-300 focus-within:border-primary/40">
              <div className="flex gap-3">
                <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="..." rows={3} className="bg-transparent flex-1 outline-none text-sm font-body text-foreground placeholder:text-muted-foreground resize-none" maxLength={500} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button type="submit" className="neon-button text-primary-foreground px-10 py-4 text-sm tracking-[0.15em] uppercase font-body font-semibold flex-1">
              {t("booking.requestBooking")}
            </button>
            <a href="https://wa.me/251998900160" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 border border-primary/30 text-primary px-8 py-4 text-sm tracking-[0.1em] uppercase font-body hover:bg-primary/10 hover:border-primary/50 transition-all rounded-lg">
              <MessageCircle className="w-4 h-4" />
              {t("booking.chatWhatsApp")}
            </a>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;
