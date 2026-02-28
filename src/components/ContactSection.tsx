import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We'll respond within 24 hours.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Get in Touch</p>
          <h2 className="section-title text-foreground">
            Contact <span className="gold-text">Us</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Address", value: "Bahir Dar, Ethiopia\nLake Tana Waterfront" },
                { icon: Phone, label: "Phone", value: "0998900160" },
                { icon: Mail, label: "Email", value: "mesudpower@mail.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-primary/30 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-1">{item.label}</p>
                    <p className="text-foreground font-body text-sm whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/251998900160"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-primary/40 text-primary px-6 py-3 text-sm tracking-[0.15em] uppercase font-body hover:bg-primary/10 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>

            <div className="aspect-video overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Azwa+Hotel,Bahir+Dar,Ethiopia&zoom=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Azwa Hotel location on Google Maps"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-card p-8 space-y-6"
          >
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Your Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="w-full border border-border bg-background/50 px-4 py-3 text-sm font-body text-foreground outline-none focus:border-primary/50 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="w-full border border-border bg-background/50 px-4 py-3 text-sm font-body text-foreground outline-none focus:border-primary/50 transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                className="w-full border border-border bg-background/50 px-4 py-3 text-sm font-body text-foreground outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder="Tell us about your inquiry..."
              />
            </div>
            <button
              type="submit"
              className="w-full gold-gradient text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase font-body font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
