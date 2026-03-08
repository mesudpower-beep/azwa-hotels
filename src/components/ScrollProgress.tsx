import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(280 85% 65%), hsl(330 90% 65%), hsl(220 90% 60%))",
        boxShadow: "0 0 10px hsl(280 85% 65% / 0.5), 0 0 30px hsl(280 85% 65% / 0.2)",
      }}
    />
  );
};

export default ScrollProgress;
