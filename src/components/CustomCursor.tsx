import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer")) {
        setIsHovering(true);
      }
    };
    const handleOut = () => setIsHovering(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ width: isHovering ? 50 : 30, height: isHovering ? 50 : 30, opacity: isHovering ? 0.6 : 0.3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-full border border-primary/50"
          style={{
            boxShadow: isHovering
              ? "0 0 25px hsl(145 45% 42% / 0.4), inset 0 0 10px hsl(145 45% 42% / 0.1)"
              : "0 0 10px hsl(145 45% 42% / 0.2)",
          }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ width: isHovering ? 6 : 4, height: isHovering ? 6 : 4, background: isHovering ? "hsl(145 50% 50%)" : "hsl(145 45% 42%)" }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="rounded-full"
          style={{ boxShadow: "0 0 15px hsl(145 45% 42% / 0.6)" }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
