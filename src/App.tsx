import { Component, type ErrorInfo, type ReactNode, useEffect } from "react";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const ExperiencePage = lazy(() => import("@/pages/Experience"));
const ProjectsPage = lazy(() => import("@/pages/Projects"));
const PrintOnDemandPage = lazy(() => import("@/pages/Redbubble"));
const ContactPage = lazy(() => import("@/pages/Contact"));

type RouteErrorBoundaryProps = {
  children: ReactNode;
};

type RouteErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  constructor(props: RouteErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Route rendering failed", error, info);
  }

  handleRetry() {
    this.setState({ hasError: false, error: undefined });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container space-y-6 pb-20 pt-36 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Une erreur est survenue</h1>
          <p className="text-muted-foreground">
            {this.state.error?.message ?? "Le contenu n’a pas pu être chargé. Veuillez réessayer."}
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={this.handleRetry} variant="primary">
              Réessayer
            </Button>
            <Button asChild variant="outline">
              <a href="/">Retour à l’accueil</a>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function PageFallback() {
  return (
    <div className="container space-y-10 pb-20 pt-36">
      <div className="space-y-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-64 rounded-[2rem]" />
        ))}
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [pathname, prefersReducedMotion]);

  return null;
}

function withBoundary(children: ReactNode) {
  return <RouteErrorBoundary>{children}</RouteErrorBoundary>;
}

export function App() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
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
            <Suspense fallback={<PageFallback />}>
              <Routes location={location}>
                <Route path="/" element={withBoundary(<HomePage />)} />
                <Route path="/about" element={withBoundary(<AboutPage />)} />
                <Route path="/experience" element={withBoundary(<ExperiencePage />)} />
                <Route path="/projects" element={withBoundary(<ProjectsPage />)} />
                <Route path="/print-on-demand" element={withBoundary(<PrintOnDemandPage />)} />
                <Route path="/contact" element={withBoundary(<ContactPage />)} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
