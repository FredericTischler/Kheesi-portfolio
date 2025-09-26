import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

import { DesignCard } from "@/components/DesignCard";
import { SectionIntro } from "@/components/SectionIntro";
import { ActionButton, ActionButtonGroup } from "@/components/ActionButtons";
import { TagBadge, TagList } from "@/components/TagBadge";
import { PRINT_ON_DEMAND_CATEGORIES, PRINT_ON_DEMAND_ITEMS, type RBItem, type RBFormat, type RBPalette } from "@/data/print-on-demand";
import { usePageMetadata } from "@/lib/metadata";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import * as React from "react";

const GRID_CLASSES = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";
const NAV_WIDTH = 220;
const NAV_GAP = 24;

const FORMAT_LABELS: Record<RBFormat, string> = {
  poster: "Poster",
  sticker: "Stickers",
  textile: "Textile",
};

const PALETTE_LABELS: Record<RBPalette, string> = {
  pastel: "Pastel",
  vibrant: "Vibrant",
  monochrome: "Monochrome",
};

export default function PrintOnDemandPage() {
  usePageMetadata({
    title: "Print on demand",
    description: "Galerie de designs Print on demand avec animations légères et tags thématiques.",
    image: "/assets/social/print-on-demand.svg",
  });

  const prefersReducedMotion = useReducedMotion();
  const categories = useMemo(() => PRINT_ON_DEMAND_CATEGORIES, []);
  const allItems = useMemo(() => PRINT_ON_DEMAND_ITEMS, []);

  const [activeCategory, setActiveCategory] = useState(() => categories[0]?.id ?? "");
  const [navLayout, setNavLayout] = useState<{ left: number; padding: number; isDesktop: boolean }>({
    left: 24,
    padding: NAV_WIDTH + NAV_GAP,
    isDesktop: false,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const filteredItems = allItems;

  const filteredIds = useMemo(() => new Set(filteredItems.map((item) => item.id)), [filteredItems]);

  const filteredCategories = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => filteredIds.has(item.id)),
        }))
        .filter((category) => category.items.length > 0),
    [categories, filteredIds],
  );

  useEffect(() => {
    if (!filteredCategories.some((category) => category.id === activeCategory)) {
      setActiveCategory(filteredCategories[0]?.id ?? "");
    }
  }, [filteredCategories, activeCategory]);

  const filteredDesignCount = filteredItems.length;
  const lightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleLightboxOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setLightboxIndex(null);
    }
  }, []);

  const openLightbox = useCallback(
    (item: RBItem) => {
      const index = filteredItems.findIndex((candidate) => candidate.id === item.id);
      if (index !== -1) {
        setLightboxIndex(index);
      }
    },
    [filteredItems],
  );

  useEffect(() => {
    if (lightboxIndex === null || filteredItems.length === 0) {
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
          return (current + 1) % filteredItems.length;
        });
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLightboxIndex((current) => {
          if (current === null) return current;
          return (current - 1 + filteredItems.length) % filteredItems.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredItems, lightboxIndex]);

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

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.06 },
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
      setActiveCategory(categoryId);

      if (typeof window === "undefined") {
        return;
      }

      const element = document.getElementById(`category-${categoryId}`);
      if (!element) {
        return;
      }

      const headerOffset = navLayout.isDesktop ? 120 : 96;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(elementTop - headerOffset, 0), behavior: "smooth" });
    },
    [navLayout.isDesktop],
  );

  return (
    <div className="space-y-14 pb-20 pt-36">
      <section className="container space-y-8">
        <SectionIntro
          eyebrow="Print on demand"
          title="Atelier Print on demand"
          description="Une galerie pensée pour présenter les visuels destinés aux produits print on demand : stickers, textiles ou affiches. Explore les catégories et découvre rapidement les visuels adaptés à ta boutique."
        />
      </section>

      <section className="relative">
        {filteredDesignCount === 0 ? (
          <div className="container" role="region" aria-live="polite">
            <div className="space-y-6 rounded-[2rem] border border-border/60 bg-background/80 p-10 text-center">
              <h2 className="text-xl font-semibold text-foreground">Aucun design disponible pour le moment</h2>
              <p className="text-sm text-muted-foreground">
                Ajoute de nouveaux visuels dans <code>public/assets/designs</code> pour alimenter la galerie.
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
                {filteredCategories.map((category) => (
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
                    {filteredCategories.map((category) => (
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
                {filteredCategories.map((category) => (
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
                      <TagBadge
                        tone="default"
                        variant="outline"
                        className="self-start px-4 py-1 text-xs uppercase tracking-[0.25em]"
                      >
                        {category.items.length} designs
                      </TagBadge>
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
                        <DesignCard
                          key={item.id}
                          item={item}
                          categoryLabel={category.name}
                          formatLabel={FORMAT_LABELS[item.format]}
                          paletteLabel={PALETTE_LABELS[item.palette]}
                          onZoom={() => openLightbox(item)}
                          zoomLabel="Zoom"
                          actionHref={item.rbLink}
                          actionLabel="RedBubble"
                          actionIcon={<ExternalLink className="h-4 w-4" />}
                          titleId={`design-${item.id}-title`}
                          tagsId={`design-${item.id}-tags`}
                          descriptionId={`design-${item.id}-summary`}
                          variants={prefersReducedMotion ? undefined : itemVariants}
                          role="listitem"
                          aria-labelledby={`design-${item.id}-title`}
                          aria-describedby={`design-${item.id}-tags`}
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : { scale: 1.02, y: -4, transition: { duration: 0.3, ease: "easeOut" } }
                          }
                        />
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
        <AnimatePresence>
          {lightboxItem ? (
            <DialogContent className="max-w-5xl border-border/70 bg-background/95 p-0 shadow-2xl">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0.85, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: "easeInOut" }}
                className="grid gap-6 p-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.2fr)]"
              >
                <LightboxGallery
                  item={lightboxItem}
                  setLightboxIndex={setLightboxIndex}
                  touchStartX={touchStartX}
                  touchEndX={touchEndX}
                  items={filteredItems}
                />
              </motion.div>
            </DialogContent>
          ) : null}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}

function LightboxGallery({
  item,
  setLightboxIndex,
  touchStartX,
  touchEndX,
  items,
}: {
  item: RBItem;
  setLightboxIndex: (value: number | null | ((prev: number | null) => number | null)) => void;
  touchStartX: React.RefObject<number | null>;
  touchEndX: React.RefObject<number | null>;
  items: RBItem[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const gallery = useMemo(
    () => (item.gallery && item.gallery.length > 0 ? item.gallery : [item.src]),
    [item],
  );
  const galleryFallbacks = useMemo(
    () =>
      gallery.map((entry) => {
        if (entry.includes("/assets/designs-webp/")) {
          const [base, query] = entry.split("?");
          const fallbackBase = base
            .replace("/assets/designs-webp/", "/assets/designs/")
            .replace(/\.webp$/, ".png");
          return query ? `${fallbackBase}?${query}` : fallbackBase;
        }
        return item.fallback ?? entry;
      }),
    [gallery, item.fallback],
  );

  useEffect(() => {
    setActiveImage(0);
  }, [item]);

  const goPrevDesign = () => {
    if (items.length === 0) return;
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + items.length) % items.length;
    });
  };

  const goNextDesign = () => {
    if (items.length === 0) return;
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % items.length;
    });
  };

  const handleSwipeNavigation = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }
    const delta = touchEndX.current - touchStartX.current;
    const threshold = 60;
    if (Math.abs(delta) >= threshold) {
      setActiveImage((current) => {
        if (delta < 0) {
          return (current + 1) % gallery.length;
        }
        return (current - 1 + gallery.length) % gallery.length;
      });
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
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
        onTouchEnd={handleSwipeNavigation}
      >
        <picture>
          <source srcSet={gallery[activeImage]} type="image/webp" />
          {galleryFallbacks[activeImage] ? (
            <source srcSet={galleryFallbacks[activeImage]} type="image/png" />
          ) : null}
          <img
            src={galleryFallbacks[activeImage] ?? gallery[activeImage]}
            alt={`Illustration print on demand : ${item.title} – ${item.tags.join(", ")}`}
            className="mx-auto max-h-[70vh] w-full rounded-[1.25rem] object-contain"
            loading="lazy"
            decoding="async"
          />
        </picture>
        {items.length > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-lg transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={goPrevDesign}
              aria-label="Voir l’image précédente"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-lg transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={goNextDesign}
              aria-label="Voir l’image suivante"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>
      <div className="flex flex-col gap-4">
        <DialogHeader className="space-y-2 border-none px-0 pb-0">
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>
            {item.tags.slice(0, 4).join(" • ")}
          </DialogDescription>
        </DialogHeader>
        <p className="rounded-[1.5rem] border border-border/60 bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
          {item.usage}
        </p>
        <TagList items={item.tags.map((tag) => `#${tag}`)} tone="emphasis" badgeClassName="tech-badge-2" />
        <DialogFooter className="flex flex-col gap-3 border-none bg-transparent px-0 py-0">
          <ActionButtonGroup>
            <ActionButton
              className="gap-2 btn-cta"
              href={item.rbLink}
              target="_blank"
              rel="noreferrer"
              icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
            >
              RedBubble
            </ActionButton>
          </ActionButtonGroup>
        </DialogFooter>
      </div>
    </>
  );
}
