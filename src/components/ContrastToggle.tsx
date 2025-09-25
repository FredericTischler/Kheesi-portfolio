import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Highlighter } from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";

export function ContrastToggle() {
  const { highContrast, toggleHighContrast } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={highContrast ? "Désactiver le contraste élevé" : "Activer le contraste élevé"}
      className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-background/80 text-muted-foreground shadow-sm transition-colors hover:text-foreground"
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.92, transition: { type: "spring", stiffness: 320, damping: 20 } }}
      onClick={toggleHighContrast}
    >
      <AnimatePresence initial={false}>
        {!prefersReducedMotion ? (
          <motion.span
            key={`contrast-ripple-${highContrast}`}
            className="pointer-events-none absolute inset-0 rounded-full bg-ring/20"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0.35, 0], scale: [0.6, 1.6] }}
            exit={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={highContrast ? "on" : "off"}
          className="relative grid h-full w-full place-items-center"
          initial={prefersReducedMotion ? false : { scale: 0.85, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          <Highlighter className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{highContrast ? "Contraste élevé activé" : "Contraste élevé désactivé"}</span>
    </motion.button>
  );
}
