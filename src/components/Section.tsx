import { motion, type HTMLMotionProps, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

type SectionProps = HTMLMotionProps<"section"> & {
  delay?: number;
};

export function Section({ className, children, delay = 0, ...props }: SectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();

  useEffect(() => {
    if (prefersReducedMotion) return;
    controls.start("visible");
  }, [controls, prefersReducedMotion]);

  return (
    <motion.section
      className={cn("container space-y-10", className)}
      initial={prefersReducedMotion ? undefined : "hidden"}
      animate={prefersReducedMotion ? undefined : controls}
      variants={prefersReducedMotion ? undefined : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
