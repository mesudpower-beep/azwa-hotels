import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "An absolutely extraordinary experience. The suite overlooking the city was breathtaking. The staff anticipated every need before we even asked. This is luxury redefined.",
    avatar: "SJ",
    stayType: "Family Vacation",
  },
  {
    name: "Ahmed Hassan",
    location: "Dubai, UAE",
    rating: 5,
    text: "Having stayed at the finest hotels across the Middle East and Europe, I can confidently say Azwa Hotel rivals them all. The blend of Ethiopian culture with world-class service is remarkable.",
    avatar: "AH",
    stayType: "Business Trip",
  },
  {
    name: "Elena Rossi",
    location: "Milan, Italy",
    rating: 5,
    text: "The spa was divine, the dining exceptional, and the views unforgettable. Every detail spoke of thoughtful elegance. We extended our stay twice — it was simply impossible to leave.",
    avatar: "ER",
    stayType: "Honeymoon",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Testimonials</p>
          <h2 className="section-title text-foreground">
            What Our Guests <span className="gold-text">Say</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-4">
            Rated <span className="text-primary font-semibold">4.9/5</span> from over 2,400 verified reviews
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card p-8 flex flex-col relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-[10px] font-body tracking-wider uppercase text-primary/60 mb-4">
                {review.stayType}
              </span>
              <p className="text-foreground/80 font-body text-sm leading-relaxed italic flex-1">
                "{review.text}"
              </p>
              <div className="mt-8 pt-6 border-t border-border/50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-body font-bold text-xs">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-display text-base font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground font-body tracking-wider mt-0.5">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
