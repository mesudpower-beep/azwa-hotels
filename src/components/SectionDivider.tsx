import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Variant = "wave" | "glow" | "diamond";

const SectionDivider = ({ variant = "glow" }: { variant?: Variant }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  if (variant === "wave") {
    return (
      <div ref={ref} className="relative h-20 -my-10 z-20 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <motion.path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z"
            fill="hsl(30 15% 8%)"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={isInView ? { opacity: 1, pathLength: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,50 C360,10 720,70 1080,30 C1260,10 1380,50 1440,40 L1440,80 L0,80 Z"
            fill="hsl(30 12% 12% / 0.5)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "diamond") {
    return (
      <div ref={ref} className="flex items-center justify-center py-8 gap-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-24 bg-gradient-to-r from-transparent to-primary/30"
          style={{ transformOrigin: "left" }}
        />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 45 } : {}}
            transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300 }}
            className="w-2 h-2 border border-primary/40"
            style={{
              boxShadow: "0 0 10px hsl(145 45% 42% / 0.2)",
            }}
          />
        ))}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-24 bg-gradient-to-l from-transparent to-primary/30"
          style={{ transformOrigin: "right" }}
        />
      </div>
    );
  }

  // Default: glow line
  return (
    <div ref={ref} className="flex items-center justify-center py-6">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-40 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(145 45% 42% / 0.4), hsl(38 70% 50% / 0.3), transparent)",
          boxShadow: "0 0 20px hsl(145 45% 42% / 0.15)",
        }}
      />
    </div>
  );
};

export default SectionDivider;
