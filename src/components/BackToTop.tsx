import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setVisible(v > 0.1));
  }, [scrollYProgress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.15, boxShadow: "0 0 30px hsl(280 85% 65% / 0.4)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 lg:bottom-20 lg:right-8 z-50 w-12 h-12 rounded-full border border-primary/30 bg-card/80 backdrop-blur-xl flex items-center justify-center text-primary transition-colors hover:bg-primary/20 hover:border-primary/50"
          style={{ boxShadow: "0 0 20px hsl(280 85% 65% / 0.15)" }}
          aria-label="Back to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
