import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type SectionProps = HTMLMotionProps<"section"> & {
  delay?: number;
};

export function Section({ className, children, delay = 0, ...props }: SectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className={cn("container space-y-10", className)}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
