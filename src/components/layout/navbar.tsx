import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Galerie", to: "/gallery" },
  { label: "À propos", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY.current;
    setHidden(latest > previous && latest > 140);
    lastY.current = latest;
  });

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const activeClassName = useMemo(
    () =>
      "relative rounded-full px-4 py-2 text-sm font-semibold transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
    [],
  );

  return (
    <motion.header
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
    >
      <nav className="mt-6 flex w-full max-w-6xl items-center justify-between rounded-3xl border border-border/60 bg-background/70 px-5 py-3 backdrop-blur-2xl shadow-lg">
        <Link to="/" className="flex items-center gap-2 font-heading text-lg tracking-tight">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Kheesi
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${activeClassName} ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[90px] w-[min(90%,22rem)] rounded-3xl border border-border/70 bg-background/95 p-4 shadow-elevated backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition hover:bg-secondary/60 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
