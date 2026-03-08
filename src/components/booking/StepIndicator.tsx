import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StepIndicatorProps {
  steps: string[];
  current: number;
}

const StepIndicator = ({ steps, current }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-3 mb-12">
      {steps.map((label, i) => {
        const isCompleted = i < current;
        const isActive = i === current;
        const isFuture = i > current;

        return (
          <div key={label} className="flex items-center gap-1 sm:gap-3">
            <div className="flex items-center gap-2">
              {/* Step circle */}
              <motion.div
                className="relative"
                animate={{
                  scale: isActive ? 1 : 1,
                }}
              >
                {/* Glow ring for active step */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.6, opacity: [0, 0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-primary/30"
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  layout
                  className={cn(
                    "relative w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold z-10",
                    "transition-shadow duration-500"
                  )}
                  animate={{
                    backgroundColor: isCompleted
                      ? "hsl(280 85% 65%)"
                      : isActive
                      ? "hsl(280 85% 65% / 0.2)"
                      : "hsl(260 15% 14% / 0.5)",
                    borderWidth: isActive ? 2 : 0,
                    borderColor: isActive ? "hsl(280 85% 65%)" : "transparent",
                    boxShadow: isActive
                      ? "0 0 20px hsl(280 85% 65% / 0.3)"
                      : isCompleted
                      ? "0 0 15px hsl(280 85% 65% / 0.2)"
                      : "none",
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      >
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="number"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={cn(
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {i + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Step label */}
              <motion.span
                className={cn(
                  "text-xs uppercase tracking-[0.15em] hidden sm:block font-medium",
                )}
                animate={{
                  color: isActive
                    ? "hsl(0 0% 95%)"
                    : isCompleted
                    ? "hsl(280 85% 65%)"
                    : "hsl(260 10% 55%)",
                  x: isActive ? 2 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                {label}
              </motion.span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="relative w-8 sm:w-12 h-[2px] overflow-hidden rounded-full bg-border/30">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(280 85% 65%), hsl(220 90% 60%))",
                  }}
                  animate={{
                    width: isCompleted ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
