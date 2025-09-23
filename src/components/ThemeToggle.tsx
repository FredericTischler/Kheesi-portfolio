import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MoonStar, Sun } from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Button
      aria-label="Changer de thème"
      variant="outline"
      size="icon"
      className="relative overflow-hidden border-border/50"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="grid h-full w-full place-items-center"
          initial={prefersReducedMotion ? false : { y: 6, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: -6, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
