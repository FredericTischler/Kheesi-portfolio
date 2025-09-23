import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  className?: string;
  index?: number;
}

export function TechBadge({ label, className, index = 0 }: TechBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground",
        className,
      )}
    >
      {label}
    </motion.span>
  );
}
