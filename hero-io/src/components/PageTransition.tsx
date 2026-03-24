import { motion, type Variants } from "motion/react";

type Props = { children?: React.ReactNode };

function PageTransition({ children }: Props) {
  function anim(variants: Variants) {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
    };
  }
  const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { delay: 0.3 } }, // Delay so it appears after wipe
    exit: { opacity: 0 },
  };
  // Animation for the wipe overlay
  const wipeVariants: Variants = {
    initial: { scaleY: 0 },
    enter: {
      scaleY: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      scaleY: 1,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
  };
  return (
    <div className="relative overflow-hidden">
      {/* The Blue Gradient Wipe */}
      <motion.div
        {...anim(wipeVariants)}
        style={{ originY: 0 }} // Wipe from top down
        className="fixed top-0 left-0 w-full h-full bg-linear-to-b from-blue-600 to-blue-400 z-50 pointer-events-none"
      />

      {/* The Page Content */}
      <motion.div {...anim(opacity)}>{children}</motion.div>
    </div>
  );
}

export default PageTransition;
