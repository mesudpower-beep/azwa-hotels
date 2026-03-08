import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("reveal"), 100);
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.random() * 20 + 10;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "hsl(260 25% 4%)" }}
        >
          {/* Ambient orbs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(280 85% 65%), transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, hsl(220 90% 60%), transparent 70%)" }}
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Spinning rings */}
          <motion.div
            className="absolute w-[300px] h-[300px] border border-primary/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[220px] h-[220px] border border-accent/10 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Logo reveal */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
              animate={
                phase === "reveal"
                  ? { scale: [1, 1.1, 40], opacity: [1, 1, 0], filter: ["blur(0px)", "blur(0px)", "blur(10px)"] }
                  : { scale: 1, opacity: 1, filter: "blur(0px)" }
              }
              transition={
                phase === "reveal"
                  ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.8, ease: "easeOut" }
              }
              className="text-center"
            >
              {/* Star burst */}
              <motion.div
                className="flex items-center justify-center gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-primary/60 text-xs"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
                  >
                    ✦
                  </motion.span>
                ))}
              </motion.div>

              <h1
                className="font-display text-5xl md:text-7xl font-bold tracking-[0.3em] gold-text"
                style={{ textShadow: "0 0 60px hsla(280, 85%, 65%, 0.3)" }}
              >
                {"AZWA".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-primary/50 text-[10px] uppercase font-body mt-2 tracking-[0.3em]"
              >
                Hotel & Resort
              </motion.p>
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: "0%" }}
            animate={{ opacity: 1, width: "200px" }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-20 h-[1px] bg-border/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: "linear-gradient(90deg, hsl(280 85% 65%), hsl(220 90% 60%))",
                boxShadow: "0 0 15px hsl(280 85% 65% / 0.5)",
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-12 text-[10px] font-mono text-muted-foreground tracking-[0.3em]"
          >
            {Math.min(Math.floor(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
