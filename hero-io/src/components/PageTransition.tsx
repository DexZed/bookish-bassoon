import { motion } from "motion/react";

type Props = { children?: React.ReactNode };

function PageTransition({ children }: Props) {
  const anim = (variants: any) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
    };
  };
  const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 1 },
  };
  const slide = {
    initial: { top: "100vh" },
    enter: { top: "100vh" },
    exit: {
      top: "0",
      transition: {
        duration: 1,
        ease: [0.45, 0, 0.55, 1],
      },
    },
  };
  const perspective = {
    initial: { y: 0, scale: 1, opacity: 1 },
    enter: { y: 0, scale: 1, opacity: 1 },
    exit: {
      top: -100,
      scale: 0.9,
      opacity: 0.5,
      transition: {
        duration: 1.2,
        ease: [0.45, 0, 0.55, 1],
      },
    },
  };
  return (
    <>
      <div className="bg-black">
        <motion.div
          {...anim(slide)}
          className="fixed top-0 left-0 w-screen h-[200vh] z-50 bg-white dark:bg-black"
        />
        <motion.div className="" {...anim(perspective)}>
          <motion.div {...anim(opacity)} className="bg-white dark:bg-black">
            {children}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default PageTransition;
