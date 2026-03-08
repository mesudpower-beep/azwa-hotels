import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(145 45% 42%), hsl(38 70% 50%), hsl(25 50% 45%))",
        boxShadow: "0 0 10px hsl(145 45% 42% / 0.5), 0 0 30px hsl(145 45% 42% / 0.2)",
      }}
    />
  );
};

export default ScrollProgress;
