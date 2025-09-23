import { Suspense, lazy } from "react";
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const HomePage = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const ExperiencePage = lazy(() => import("@/pages/Experience"));
const ProjectsPage = lazy(() => import("@/pages/Projects"));
const RedbubblePage = lazy(() => import("@/pages/Redbubble"));
const ContactPage = lazy(() => import("@/pages/Contact"));

function RootLayout() {
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -24 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: "easeInOut" }}
          >
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "experience", element: <ExperiencePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "redbubble", element: <RedbubblePage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
