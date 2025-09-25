import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, ZoomIn } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRINT_ON_DEMAND_CATEGORIES, PRINT_ON_DEMAND_ITEMS } from "@/data/print-on-demand";
import { usePageMetadata } from "@/lib/metadata";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { RBItem } from "@/data/print-on-demand";

const GRID_CLASSES = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";
const NAV_WIDTH = 220;
const NAV_GAP = 24;

export default function PrintOnDemandPage() {
  usePageMetadata({
    title: "Print on demand",
    description: "Galerie de designs Print on demand avec animations légères et tags thématiques.",
  });

  const prefersReducedMotion = useReducedMotion();
  const categories = useMemo(() => PRINT_ON_DEMAND_CATEGORIES, []);
  const flatItems = useMemo(() => PRINT_ON_DEMAND_ITEMS, []);
  const [activeCategory, setActiveCategory] = useState(() => categories[0]?.id ?? "");
  const [navLayout, setNavLayout] = useState<{ left: number; padding: number; isDesktop: boolean }>({
    left: 24,
    padding: NAV_WIDTH + NAV_GAP,
    isDesktop: false,
  });
  const designCount = categories.reduce((count, category) => count + category.items.length, 0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxItem = lightboxIndex !== null ? flatItems[lightboxIndex] : null;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleLightboxOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setLightboxIndex(null);
    }
  }, []);

  const openLightbox = useCallback(
    (item: RBItem) => {
      const index = flatItems.findIndex((candidate) => candidate.id === item.id);
      if (index !== -1) {
        setLightboxIndex(index);
      }
    },
    [flatItems],
  );

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0 },
    }),
    [],
  );

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      const element = document.getElementById(`category-${categoryId}`);
      if (!element) {
        return;
      }
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      setActiveCategory(categoryId);
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    if (categories.length === 0 || typeof window === "undefined") {
      return;
    }

    const sectionElements = categories
      .map((category) => document.getElementById(`category-${category.id}`))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target) {
          const categoryId = visibleEntry.target.getAttribute("data-category-id");
          if (categoryId) {
            setActiveCategory(categoryId);
          }
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.25, 0.4, 0.6],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [categories]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateLayout = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const container = containerRef.current;

      if (!desktop || !container) {
        setNavLayout({ left: 24, padding: 0, isDesktop: desktop });
        return;
      }

      const rect = container.getBoundingClientRect();
      const marginLeft = rect.left;
      const tentativeLeft = marginLeft - NAV_WIDTH - NAV_GAP;
      const left = tentativeLeft >= 24 ? tentativeLeft : 24;
      const navRight = left + NAV_WIDTH;
      const padding = Math.max(0, navRight + NAV_GAP - marginLeft);

      setNavLayout({ left, padding, isDesktop: desktop });
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  useEffect(() => {
    if (lightboxIndex === null || flatItems.length === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setLightboxIndex((current) => {
          if (current === null) return current;
          return (current + 1) % flatItems.length;
        });
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLightboxIndex((current) => {
          if (current === null) return current;
          return (current - 1 + flatItems.length) % flatItems.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [flatItems.length, lightboxIndex]);

  return (
    <div className="space-y-14 pb-20 pt-36">
      <section className="container space-y-6">
        <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Print on demand</p>
        <h1 className="text-4xl font-semibold md:text-5xl">Designs illustrés et impression à la demande</h1>
        <p className="max-w-3xl text-muted-foreground">
          Une sélection de visuels destinés aux produits Print on demand : stickers, textiles, impressions murales. Chaque
          carte présente l’aperçu du design, ses tags principaux et un lien direct vers la boutique.
        </p>
      </section>

      <section className="relative">
        {designCount === 0 ? (
          <div className="container" role="region" aria-live="polite">
            <div className="space-y-6 rounded-[2rem] border border-border/60 bg-background/80 p-10 text-center">
              <h2 className="text-xl font-semibold text-foreground">Aucun design disponible pour le moment</h2>
              <p className="text-sm text-muted-foreground">
                Ajoutez vos images dans <code>public/assets/designs</code> et remplissez <code>src/data/print-on-demand.ts</code>
                pour afficher la galerie automatiquement.
              </p>
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="container space-y-10"
            role="region"
            aria-live="polite"
            aria-label="Catalogue Print on demand"
          >
            <div className="rounded-full border border-border/60 bg-background/80 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl lg:hidden" role="tablist" aria-label="Catégories Print on demand">
              <nav className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryClick(category.id)}
                    aria-current={activeCategory === category.id ? "true" : undefined}
                    role="tab"
                    aria-selected={activeCategory === category.id}
                    className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.4em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="relative">
              <div className="hidden lg:block">
                <aside
                  className="fixed top-32 w-[220px] rounded-[1.75rem] border border-border/60 bg-background/70 p-4 shadow-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl"
                  style={{ left: navLayout.left }}
                  role="navigation"
                  aria-label="Navigation Print on demand"
                >
                  <nav className="flex flex-col gap-3" role="tablist" aria-label="Catégories Print on demand">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryClick(category.id)}
                        aria-current={activeCategory === category.id ? "true" : undefined}
                        role="tab"
                        aria-selected={activeCategory === category.id}
                        className={`rounded-[1rem] px-3 py-2 text-xs uppercase tracking-[0.35em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          activeCategory === category.id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-secondary/20 text-muted-foreground hover:bg-secondary/50"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </nav>
                </aside>
              </div>

              <div
                className="space-y-14"
                style={navLayout.isDesktop ? { paddingLeft: navLayout.padding } : undefined}
              >
                {categories.map((category) => (
                  <div
                    key={category.id}
                    id={`category-${category.id}`}
                    data-category-id={category.id}
                    className="scroll-mt-28 space-y-6"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">{category.name}</h2>
                        {category.description ? (
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        ) : null}
                      </div>
                      <Badge variant="outline" className="self-start px-4 py-1 text-xs uppercase tracking-[0.25em]">
                        {category.items.length} designs
                      </Badge>
                    </div>

                    <motion.div
                      className={GRID_CLASSES}
                      role="list"
                      aria-label={`Designs ${category.name}`}
                      initial={prefersReducedMotion ? undefined : "hidden"}
                      animate={prefersReducedMotion ? undefined : "visible"}
                      variants={prefersReducedMotion ? undefined : containerVariants}
                    >
                      {category.items.map((item) => (
                        <motion.article
                          key={item.id}
                          variants={prefersReducedMotion ? undefined : itemVariants}
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : { scale: 1.02, y: -4, transition: { duration: 0.3, ease: "easeOut" } }
                          }
                          className="group flex h-full flex-col rounded-[2rem] border border-border/60 bg-background/80 shadow-lg"
                          role="listitem"
                          aria-labelledby={`design-${item.id}-title`}
                          aria-describedby={`design-${item.id}-tags`}
                        >
                          <div className="relative overflow-hidden rounded-t-[2rem] bg-secondary/30">
                            <button
                              type="button"
                              onClick={() => openLightbox(item)}
                              className="group/btn absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-2 text-xs uppercase tracking-[0.3em] text-foreground opacity-0 shadow-lg backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-hover:opacity-100"
                              aria-label={`Agrandir ${item.title}`}
                            >
                              <ZoomIn className="h-3.5 w-3.5" /> Zoom
                            </button>
                            <img
                              src={item.src}
                              srcSet={item.src2x ? `${item.src2x} 2x` : undefined}
                              alt={`Illustration print on demand : ${item.title} – ${item.tags.join(", ")}`}
                              loading="lazy"
                              className="aspect-square w-full object-contain p-4 transition duration-500 ease-out group-hover:scale-[1.02]"
                              onClick={() => openLightbox(item)}
                            />
                          </div>
                          <div className="flex flex-1 flex-col gap-4 p-6">
                            <div className="space-y-2">
                              <h3 id={`design-${item.id}-title`} className="text-lg font-semibold text-foreground">
                                {item.title}
                              </h3>
                              {typeof item.createdAt === "string" && !Number.isNaN(new Date(item.createdAt).getTime()) ? (
                                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                  {new Date(item.createdAt).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              ) : null}
                            </div>
                            <div className="flex flex-wrap gap-2" id={`design-${item.id}-tags`}>
                              {item.tags.slice(0, 5).map((tag) => (
                                <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-[0.25em]">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className="sr-only">
                              {`Description détaillée : ${item.title}. Mots-clés : ${item.tags.join(", ")}.`}
                            </p>
                            <div className="mt-auto">
                              <Button asChild variant="outline" className="w-full gap-2" size="sm">
                                <a href={item.rbLink} target="_blank" rel="noreferrer" aria-label={`Voir ${item.title} sur Print on demand`}>
                                  <ExternalLink className="h-4 w-4" /> Voir sur Print on demand
                                </a>
                              </Button>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <Dialog open={Boolean(lightboxItem)} onOpenChange={handleLightboxOpenChange}>
        {lightboxItem ? (
          <DialogContent className="max-w-5xl border-border/70 bg-background/95 p-0 shadow-2xl">
            <DialogHeader className="space-y-1 border-b border-border/60 p-6">
              <DialogTitle className="text-2xl font-semibold">{lightboxItem.title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {lightboxItem.tags.slice(0, 4).join(" • ")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.2fr)]">
              <div
                className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-secondary/30 p-4"
                onTouchStart={(event) => {
                  if (event.touches.length === 1) {
                    touchStartX.current = event.touches[0].clientX;
                    touchEndX.current = null;
                  }
                }}
                onTouchMove={(event) => {
                  if (event.touches.length === 1) {
                    touchEndX.current = event.touches[0].clientX;
                  }
                }}
                onTouchEnd={() => {
                  if (touchStartX.current === null || touchEndX.current === null) {
                    touchStartX.current = null;
                    touchEndX.current = null;
                    return;
                  }

                  const delta = touchEndX.current - touchStartX.current;
                  const swipeThreshold = 60;

                  if (Math.abs(delta) >= swipeThreshold) {
                    if (delta < 0) {
                      setLightboxIndex((current) => {
                        if (current === null) return current;
                        return (current + 1) % flatItems.length;
                      });
                    } else {
                      setLightboxIndex((current) => {
                        if (current === null) return current;
                        return (current - 1 + flatItems.length) % flatItems.length;
                      });
                    }
                  }

                  touchStartX.current = null;
                  touchEndX.current = null;
                }}
              >
                <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
                  <button
                    type="button"
                    className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground shadow-md transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={() =>
                      setLightboxIndex((current) => {
                        if (current === null) return current;
                        return (current - 1 + flatItems.length) % flatItems.length;
                      })
                    }
                    aria-label="Voir le design précédent"
                  >
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="pointer-events-auto hidden h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground shadow-md transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
                    onClick={() =>
                      setLightboxIndex((current) => {
                        if (current === null) return current;
                        return (current + 1) % flatItems.length;
                      })
                    }
                    aria-label="Voir le design suivant"
                  >
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <picture>
                  {lightboxItem.src2x ? <source srcSet={`${lightboxItem.src2x} 2x`} /> : null}
                  <img
                    src={lightboxItem.src}
                    alt={lightboxItem.title}
                    className="mx-auto max-h-[70vh] w-full rounded-[1.25rem] object-contain"
                  />
                </picture>
              </div>
              <div className="flex flex-col gap-5 rounded-[1.75rem] border border-border/60 bg-secondary/20 p-5">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Catégories & tags</p>
                  <div className="flex flex-wrap gap-2">
                    {lightboxItem.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-[0.25em]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-border/60 bg-background/70 px-4 py-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  {lightboxItem.createdAt
                    ? new Date(lightboxItem.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Date non précisée"}
                </div>
                <Button asChild size="md" className="mt-auto gap-2">
                  <a href={lightboxItem.rbLink} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" /> Voir sur RedBubble
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}
