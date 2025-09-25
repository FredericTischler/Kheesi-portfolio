import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Highlighter } from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

export function ContrastToggle() {
  const { highContrast, toggleHighContrast } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Button
      aria-label={highContrast ? "Désactiver le contraste élevé" : "Activer le contraste élevé"}
      variant="outline"
      size="icon"
      className="relative overflow-hidden border-border/50"
      onClick={toggleHighContrast}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={highContrast ? "on" : "off"}
          className="grid h-full w-full place-items-center"
          initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Highlighter className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{highContrast ? "Contraste élevé activé" : "Contraste élevé désactivé"}</span>
    </Button>
  );
}
