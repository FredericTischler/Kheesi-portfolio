import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MoonStar, Sun } from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      aria-label="Changer de thème"
      type="button"
      className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-background/80 text-muted-foreground shadow-sm transition-colors hover:text-foreground"
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.92, transition: { type: "spring", stiffness: 320, damping: 20 } }}
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!prefersReducedMotion ? (
          <motion.span
            key={`ripple-${theme}`}
            className="pointer-events-none absolute inset-0 rounded-full bg-primary/15"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0.35, 0], scale: [0.6, 1.6] }}
            exit={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            aria-hidden="true"
          />
        ) : null}
        <motion.span
          key={theme}
          className="relative grid h-full w-full place-items-center"
          initial={prefersReducedMotion ? false : { y: 6, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: -6, opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
