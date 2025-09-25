import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Menu, Search, X } from "lucide-react";

import { NAV_LINKS } from "@/data/navigation";

import { CommandPalette } from "@/components/CommandPalette";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContrastToggle } from "@/components/ContrastToggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY.current;
    setHidden(latest > previous && latest > 120);
    lastY.current = latest;
  });

  useEffect(() => {
    const handler = () => setMenuOpen(false);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (commandOpen) {
      setMenuOpen(false);
    }
  }, [commandOpen]);

  const navClass = useMemo(
    () =>
      "rounded-full px-4 py-2 text-sm font-semibold transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
    [],
  );

  return (
    <>
      <motion.header
        initial={{ y: prefersReducedMotion ? 0 : -120, opacity: prefersReducedMotion ? 1 : 0 }}
        animate={{ y: hidden && !prefersReducedMotion ? -120 : 0, opacity: hidden && !prefersReducedMotion ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      >
        <nav className="mt-6 flex w-full max-w-6xl items-center justify-between rounded-3xl border border-border/60 bg-background/70 px-5 py-3 shadow-lg backdrop-blur-2xl">
          <NavLink to="/" end className="flex items-center gap-2 font-heading text-lg tracking-tight" aria-label="Accueil">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            Frédéric Tischler
          </NavLink>
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `${navClass} ${isActive ? "text-primary" : "text-muted-foreground"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden border-border/50 lg:flex"
              aria-label="Ouvrir la palette de commandes"
              onClick={() => setCommandOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <ContrastToggle />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-[92px] w-[min(90%,22rem)] rounded-3xl border border-border/70 bg-background/95 p-4 shadow-elevated backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        `flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition hover:bg-secondary/60 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCommandOpen(true);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary/60"
                  >
                    Recherche globale <Search className="h-4 w-4" />
                  </button>
                </li>
                <li>
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/40 px-4 py-3">
                    <ContrastToggle />
                    <ThemeToggle />
                  </div>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
