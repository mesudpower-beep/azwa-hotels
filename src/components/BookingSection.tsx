import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Users, MessageCircle, User, Mail, Phone, FileText, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import RoomSelector, { ROOM_OPTIONS } from "./booking/RoomSelector";
import BookingSummary from "./booking/BookingSummary";
import StepIndicator from "./booking/StepIndicator";

const STEPS = ["Room", "Dates", "Details", "Confirm"];

const BookingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState(0);
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
  const [submitting, setSubmitting] = useState(false);
  const { t } = useLanguage();

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!checkIn) e.checkIn = "Required";
      if (!checkOut) e.checkOut = "Required";
    }
    if (s === 2) {
      if (!name.trim()) e.name = "Required";
      if (!email.trim()) e.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email";
      if (!phone.trim()) e.phone = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const room = ROOM_OPTIONS.find((r) => r.id === roomType)!;
  const nights = checkIn && checkOut ? Math.max(differenceInDays(checkOut, checkIn), 1) : 0;
  const subtotal = room.priceETB * nights;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + tax;

  const handleSubmit = async () => {
    if (!validateStep(2)) { setStep(2); return; }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.from("bookings").insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        room_type: roomType,
        check_in: checkIn!.toISOString().split("T")[0],
        check_out: checkOut!.toISOString().split("T")[0],
        adults: parseInt(guests),
        children: parseInt(children),
        special_requests: specialRequests.trim() || null,
        total_price: total,
        currency: "ETB",
        payment_status: "pending",
        status: "confirmed",
      } as any).select().single();

      if (error) throw error;

      // Build WhatsApp confirmation message
      const lines = [
        `🏨 *New Booking — Azwa Hotel*`,
        `📋 *Ref:* ${(data as any)?.id?.slice(0, 8).toUpperCase()}`,
        `👤 *Name:* ${name.trim()}`,
        `📧 *Email:* ${email.trim()}`,
        `📞 *Phone:* ${phone.trim()}`,
        `🛏️ *Room:* ${room.name}`,
        `📅 *Check-in:* ${format(checkIn!, "PPP")}`,
        `📅 *Check-out:* ${format(checkOut!, "PPP")} (${nights} nights)`,
        `👥 *Guests:* ${guests} Adults, ${children} Children`,
        `💰 *Total:* ${total.toLocaleString()} ETB`,
      ];
      if (specialRequests.trim()) lines.push(`📝 *Requests:* ${specialRequests.trim()}`);
      const msg = encodeURIComponent(lines.join("\n"));
      window.open(`https://wa.me/251998900160?text=${msg}`, "_blank");

      toast.success("Booking confirmed! Your reservation has been saved.");
      // Reset form
      setStep(0);
      setName(""); setEmail(""); setPhone("");
      setCheckIn(undefined); setCheckOut(undefined);
      setGuests("2"); setChildren("0"); setRoomType("king");
      setSpecialRequests("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = "w-full flex items-center gap-3 border border-border/50 bg-secondary/30 px-4 py-3 text-sm font-body rounded-lg transition-all duration-300 focus-within:border-primary/40 focus-within:bg-secondary/50";

  return (
    <section id="booking" className="relative section-padding" ref={ref}>
      <div className="absolute inset-0">
        <img src="/images/pool.jpg" alt="Hotel pool" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/92 backdrop-blur-sm" />
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-8">
          <p className="section-subtitle mb-4">{t("booking.subtitle")}</p>
          <h2 className="section-title text-foreground">
            {t("booking.title1")} <span className="gold-text">{t("booking.title2")}</span>
          </h2>
        </motion.div>

        <StepIndicator steps={STEPS} current={step} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="glass-card p-8 md:p-10">
            {/* Step 0 — Room Selection */}
            {step === 0 && (
              <div>
                <h3 className="text-lg font-display text-foreground font-semibold mb-6">Select Your Room</h3>
                <RoomSelector selected={roomType} onSelect={setRoomType} />
              </div>
            )}

            {/* Step 1 — Dates & Guests */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-display text-foreground font-semibold mb-4">Choose Your Dates</h3>
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
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.guests")}</label>
                    <div className={inputClasses}>
                      <Users className="w-4 h-4 text-primary" />
                      <select value={guests} onChange={(e) => setGuests(e.target.value)} className="bg-transparent text-foreground flex-1 outline-none">
                        {[1,2,3,4,5,6].map((n) => (<option key={n} value={n} className="bg-card text-foreground">{n} {n === 1 ? "Guest" : "Guests"}</option>))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.children")}</label>
                    <div className={inputClasses}>
                      <Users className="w-4 h-4 text-primary" />
                      <select value={children} onChange={(e) => setChildren(e.target.value)} className="bg-transparent text-foreground flex-1 outline-none">
                        {[0,1,2,3,4,5].map((n) => (<option key={n} value={n} className="bg-card text-foreground">{n} {n === 1 ? "Child" : "Children"}</option>))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 — Guest Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-display text-foreground font-semibold mb-4">Your Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
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
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.phone")} <span className="text-destructive">*</span></label>
                  <div className={cn(inputClasses, errors.phone && "border-destructive/50")}>
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }} placeholder="+251 9XX XXX XXX" className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground" maxLength={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                    {t("booking.specialRequests")} <span className="text-muted-foreground text-[10px]">{t("booking.optional")}</span>
                  </label>
                  <div className="border border-border/50 bg-secondary/30 px-4 py-3 rounded-lg transition-all duration-300 focus-within:border-primary/40">
                    <div className="flex gap-3">
                      <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Airport pickup, late check-in..." rows={3} className="bg-transparent flex-1 outline-none text-sm font-body text-foreground placeholder:text-muted-foreground resize-none" maxLength={500} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-display text-foreground font-semibold mb-4">Confirm Your Booking</h3>
                <div className="grid gap-4 text-sm">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/20 rounded-xl">
                    <div><span className="text-muted-foreground">Room</span><p className="text-foreground font-medium">{room.name}</p></div>
                    <div><span className="text-muted-foreground">Duration</span><p className="text-foreground font-medium">{nights} night{nights !== 1 ? "s" : ""}</p></div>
                    <div><span className="text-muted-foreground">Check-in</span><p className="text-foreground font-medium">{checkIn ? format(checkIn, "PPP") : "—"}</p></div>
                    <div><span className="text-muted-foreground">Check-out</span><p className="text-foreground font-medium">{checkOut ? format(checkOut, "PPP") : "—"}</p></div>
                    <div><span className="text-muted-foreground">Guests</span><p className="text-foreground font-medium">{guests} Adults, {children} Children</p></div>
                    <div><span className="text-muted-foreground">Total</span><p className="text-primary font-bold text-lg">{total.toLocaleString()} ETB</p></div>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-xl">
                    <div><span className="text-muted-foreground">Guest</span><p className="text-foreground font-medium">{name}</p></div>
                    <div className="mt-2"><span className="text-muted-foreground">Contact</span><p className="text-foreground font-medium">{email} · {phone}</p></div>
                    {specialRequests && <div className="mt-2"><span className="text-muted-foreground">Special Requests</span><p className="text-foreground font-medium">{specialRequests}</p></div>}
                  </div>
                  <p className="text-muted-foreground text-xs text-center">
                    By confirming, your booking details will be sent via WhatsApp to the hotel. Payment will be arranged directly at the hotel.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-border/30">
              {step > 0 && (
                <button type="button" onClick={back} className="flex items-center gap-2 border border-border/50 text-muted-foreground px-6 py-3 text-sm tracking-[0.1em] uppercase font-body hover:bg-secondary/30 transition-all rounded-lg">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <div className="flex-1" />
              {step < 3 ? (
                <button type="button" onClick={next} className="neon-button text-primary-foreground px-8 py-3 text-sm tracking-[0.15em] uppercase font-body font-semibold flex items-center gap-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={submitting} className="neon-button text-primary-foreground px-10 py-3 text-sm tracking-[0.15em] uppercase font-body font-semibold flex items-center gap-2 disabled:opacity-50">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {submitting ? "Processing..." : "Confirm Booking"}
                </button>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="hidden lg:block">
            <BookingSummary roomType={roomType} checkIn={checkIn} checkOut={checkOut} adults={guests} children={children} />
            <a href="https://wa.me/251998900160" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 border border-primary/30 text-primary px-6 py-3 text-sm tracking-[0.1em] uppercase font-body hover:bg-primary/10 hover:border-primary/50 transition-all rounded-lg mt-4 w-full">
              <MessageCircle className="w-4 h-4" />
              {t("booking.chatWhatsApp")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
