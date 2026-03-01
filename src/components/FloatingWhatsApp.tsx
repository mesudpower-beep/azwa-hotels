import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const FloatingWhatsApp = () => {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      const tip = setTimeout(() => setShowTooltip(true), 5000);
      const hide = setTimeout(() => setShowTooltip(false), 12000);
      return () => { clearTimeout(tip); clearTimeout(hide); };
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="glass-card px-4 py-2 text-xs font-body text-foreground/90 tracking-wide whitespace-nowrap"
              >
                Need help? Chat with us!
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href="https://wa.me/251998900160"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
