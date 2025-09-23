import { motion, useReducedMotion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  description?: string;
  index?: number;
}

export function StatCard({ label, value, description, index = 0 }: StatCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-3 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg backdrop-blur-xl"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
    >
      <span className="text-xs uppercase tracking-[0.45em] text-muted-foreground">{label}</span>
      <span className="text-3xl font-semibold text-foreground">{value}</span>
      {description ? <p className="text-sm text-muted-foreground/80">{description}</p> : null}
    </motion.div>
  );
}
