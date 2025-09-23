import { motion } from "framer-motion";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20">
        <motion.div
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
