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

  const scrollToBooking = () => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 3));
      setTimeout(scrollToBooking, 100);
    }
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    setTimeout(scrollToBooking, 100);
  };

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

  const inputClasses = "w-full flex items-center gap-3 border border-border/50 bg-secondary/30 px-4 py-3.5 text-sm font-body rounded-xl transition-all duration-300 focus-within:border-primary/40 focus-within:bg-secondary/50 focus-within:shadow-[0_0_20px_hsl(145_45%_42%/0.1)]";

  const stepTransition = {
    initial: { opacity: 0, x: 40, filter: "blur(8px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -40, filter: "blur(8px)" },
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  return (
    <section id="booking" className="relative section-padding pb-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <motion.img
          src="/images/pool.jpg"
          alt="Hotel pool"
          className="w-full h-full object-cover"
          loading="lazy"
          animate={{ scale: isInView ? 1.05 : 1 }}
          transition={{ duration: 15, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-background/92 backdrop-blur-sm" />
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[150px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-accent/5 blur-[120px]"
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <motion.p
            className="section-subtitle mb-4"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {t("booking.subtitle")}
          </motion.p>
          <h2 className="section-title text-foreground">
            {t("booking.title1")} <span className="gold-text">{t("booking.title2")}</span>
          </h2>
        </motion.div>

        <StepIndicator steps={STEPS} current={step} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-[1fr_320px] gap-8"
        >
          <div className="glass-card p-8 md:p-10 relative overflow-hidden">
            {/* Subtle animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              animate={{
                boxShadow: [
                  "inset 0 0 0 1px hsl(280 85% 65% / 0.05)",
                  "inset 0 0 0 1px hsl(280 85% 65% / 0.15)",
                  "inset 0 0 0 1px hsl(280 85% 65% / 0.05)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <AnimatePresence mode="wait">
              {/* Step 0 — Room Selection */}
              {step === 0 && (
                <motion.div key="step-0" {...stepTransition}>
                  <h3 className="text-lg font-display text-foreground font-semibold mb-6 flex items-center gap-2">
                    <motion.span
                      className="w-1.5 h-6 rounded-full bg-primary inline-block"
                      layoutId="step-accent"
                    />
                    Select Your Room
                  </h3>
                  <RoomSelector selected={roomType} onSelect={setRoomType} />
                </motion.div>
              )}

              {/* Step 1 — Dates & Guests */}
              {step === 1 && (
                <motion.div key="step-1" {...stepTransition} className="space-y-6">
                  <h3 className="text-lg font-display text-foreground font-semibold mb-4 flex items-center gap-2">
                    <motion.span
                      className="w-1.5 h-6 rounded-full bg-primary inline-block"
                      layoutId="step-accent"
                    />
                    Choose Your Dates
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
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
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
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
                    </motion.div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                      <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.guests")}</label>
                      <div className={inputClasses}>
                        <Users className="w-4 h-4 text-primary" />
                        <select value={guests} onChange={(e) => setGuests(e.target.value)} className="bg-transparent text-foreground flex-1 outline-none">
                          {[1,2,3,4,5,6].map((n) => (<option key={n} value={n} className="bg-card text-foreground">{n} {n === 1 ? "Guest" : "Guests"}</option>))}
                        </select>
                      </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                      <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.children")}</label>
                      <div className={inputClasses}>
                        <Users className="w-4 h-4 text-primary" />
                        <select value={children} onChange={(e) => setChildren(e.target.value)} className="bg-transparent text-foreground flex-1 outline-none">
                          {[0,1,2,3,4,5].map((n) => (<option key={n} value={n} className="bg-card text-foreground">{n} {n === 1 ? "Child" : "Children"}</option>))}
                        </select>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 2 — Guest Details */}
              {step === 2 && (
                <motion.div key="step-2" {...stepTransition} className="space-y-6">
                  <h3 className="text-lg font-display text-foreground font-semibold mb-4 flex items-center gap-2">
                    <motion.span
                      className="w-1.5 h-6 rounded-full bg-primary inline-block"
                      layoutId="step-accent"
                    />
                    Your Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                      <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.name")} <span className="text-destructive">*</span></label>
                      <div className={cn(inputClasses, errors.name && "border-destructive/50")}>
                        <User className="w-4 h-4 text-primary shrink-0" />
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} placeholder={t("booking.name")} className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground" maxLength={100} />
                      </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                      <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.email")} <span className="text-destructive">*</span></label>
                      <div className={cn(inputClasses, errors.email && "border-destructive/50")}>
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }} placeholder="your@email.com" className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground" maxLength={255} />
                      </div>
                    </motion.div>
                  </div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">{t("booking.phone")} <span className="text-destructive">*</span></label>
                    <div className={cn(inputClasses, errors.phone && "border-destructive/50")}>
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }} placeholder="+251 9XX XXX XXX" className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground" maxLength={20} />
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                      {t("booking.specialRequests")} <span className="text-muted-foreground text-[10px]">{t("booking.optional")}</span>
                    </label>
                    <div className="border border-border/50 bg-secondary/30 px-4 py-3.5 rounded-xl transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-[0_0_20px_hsl(280_85%_65%/0.1)]">
                      <div className="flex gap-3">
                        <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Airport pickup, late check-in..." rows={3} className="bg-transparent flex-1 outline-none text-sm font-body text-foreground placeholder:text-muted-foreground resize-none" maxLength={500} />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3 — Confirmation */}
              {step === 3 && (
                <motion.div key="step-3" {...stepTransition} className="space-y-6">
                  <h3 className="text-lg font-display text-foreground font-semibold mb-4 flex items-center gap-2">
                    <motion.span
                      className="w-1.5 h-6 rounded-full bg-primary inline-block"
                      layoutId="step-accent"
                    />
                    Confirm Your Booking
                  </h3>
                  <div className="grid gap-4 text-sm">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="grid grid-cols-2 gap-4 p-5 bg-secondary/20 rounded-xl border border-border/20"
                    >
                      <div><span className="text-muted-foreground text-xs uppercase tracking-wider">Room</span><p className="text-foreground font-medium mt-1">{room.name}</p></div>
                      <div><span className="text-muted-foreground text-xs uppercase tracking-wider">Duration</span><p className="text-foreground font-medium mt-1">{nights} night{nights !== 1 ? "s" : ""}</p></div>
                      <div><span className="text-muted-foreground text-xs uppercase tracking-wider">Check-in</span><p className="text-foreground font-medium mt-1">{checkIn ? format(checkIn, "PPP") : "—"}</p></div>
                      <div><span className="text-muted-foreground text-xs uppercase tracking-wider">Check-out</span><p className="text-foreground font-medium mt-1">{checkOut ? format(checkOut, "PPP") : "—"}</p></div>
                      <div><span className="text-muted-foreground text-xs uppercase tracking-wider">Guests</span><p className="text-foreground font-medium mt-1">{guests} Adults, {children} Children</p></div>
                      <div>
                        <span className="text-muted-foreground text-xs uppercase tracking-wider">Total</span>
                        <motion.p
                          className="text-primary font-bold text-xl mt-1"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          style={{ textShadow: "0 0 30px hsl(280 85% 65% / 0.3)" }}
                        >
                          {total.toLocaleString()} ETB
                        </motion.p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="p-5 bg-secondary/20 rounded-xl border border-border/20"
                    >
                      <div><span className="text-muted-foreground text-xs uppercase tracking-wider">Guest</span><p className="text-foreground font-medium mt-1">{name}</p></div>
                      <div className="mt-3"><span className="text-muted-foreground text-xs uppercase tracking-wider">Contact</span><p className="text-foreground font-medium mt-1">{email} · {phone}</p></div>
                      {specialRequests && <div className="mt-3"><span className="text-muted-foreground text-xs uppercase tracking-wider">Special Requests</span><p className="text-foreground font-medium mt-1">{specialRequests}</p></div>}
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-muted-foreground text-xs text-center"
                    >
                      By confirming, your booking details will be sent via WhatsApp to the hotel. Payment will be arranged directly at the hotel.
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <motion.div
              className="flex gap-4 mt-8 pt-6 border-t border-border/30"
              layout
            >
              <AnimatePresence>
                {step > 0 && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    type="button"
                    onClick={back}
                    className="flex items-center gap-2 border border-border/50 text-muted-foreground px-6 py-3 text-sm tracking-[0.1em] uppercase font-body hover:bg-secondary/30 hover:border-primary/30 transition-all rounded-xl group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                  </motion.button>
                )}
              </AnimatePresence>
              <div className="flex-1" />
              {step < 3 ? (
                <motion.button
                  key="continue"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={next}
                  className="neon-button text-primary-foreground px-8 py-3 text-sm tracking-[0.15em] uppercase font-body font-semibold flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ) : (
                <motion.button
                  key="confirm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="neon-button text-primary-foreground px-10 py-3 text-sm tracking-[0.15em] uppercase font-body font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {submitting ? "Processing..." : "Confirm Booking"}
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Sidebar Summary */}
          <div className="hidden lg:block">
            <BookingSummary roomType={roomType} checkIn={checkIn} checkOut={checkOut} adults={guests} children={children} />
            <motion.a
              href="https://wa.me/251998900160"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 border border-primary/30 text-primary px-6 py-3 text-sm tracking-[0.1em] uppercase font-body hover:bg-primary/10 hover:border-primary/50 transition-all rounded-xl mt-4 w-full"
            >
              <MessageCircle className="w-4 h-4" />
              {t("booking.chatWhatsApp")}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
