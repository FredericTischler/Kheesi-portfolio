import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { DesignCard } from "@/components/design-card";
import { Button } from "@/components/ui/button";
import { DESIGNS } from "@/data/designs";

const featuredDesigns = DESIGNS.filter((design) => design.featured).slice(0, 6);

const carouselItems = [...DESIGNS, ...DESIGNS].slice(0, 10);

export function HomePage() {
  return (
    <div className="space-y-24">
      <section className="container grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.6em] text-muted-foreground">
              Portfolio RedBubble
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-tight md:text-6xl">
              Designs merch et impressions haut de gamme.
            </h1>
            <p className="max-w-xl text-balance text-base text-muted-foreground md:text-lg">
                Une collection de créations originales, colorées et amusantes. Stickers, t-shirts, affiches… Explorez mes visuels et retrouvez mes produits sur RedBubble en un clic.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/gallery">
                Voir la galerie <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="#carousel">Explorer l’aperçu</a>
            </Button>
          </div>
          <div className="grid gap-3 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-lg backdrop-blur-xl">
            <p className="text-sm font-semibold text-muted-foreground">
              12 visuels | tags filtrables | quick view instantanée
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>• Lazy loading optimisé</span>
              <span>• Animations Framer Motion</span>
              <span>• Mode sombre natif</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-12 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid gap-6">
            <div className="rounded-[2rem] border border-border/60 bg-background/60 p-6 backdrop-blur-2xl shadow-elevated">
              <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
                Mise en avant
              </p>
              <p className="mt-3 text-balance text-2xl font-semibold">
                Des visuels pensés pour générer des clics et des conversions.
              </p>
            </div>
            <div className="grid gap-4">
              {featuredDesigns.slice(0, 3).map((design) => (
                <div
                  key={design.id}
                  className="relative flex items-center gap-4 rounded-3xl border border-border/40 bg-background/70 p-4 backdrop-blur-xl"
                >
                  <img
                    src={design.src}
                    alt={design.title}
                    loading="lazy"
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{design.title}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {design.tags.join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container space-y-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            <span className="h-1 w-6 rounded-full bg-primary" /> Aperçu de la galerie
          </div>
          <h2 className="text-balance text-3xl font-semibold md:text-4xl">
            6 designs à haute valeur visuelle
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      </section>

      <section id="carousel" className="space-y-8 bg-background/40 py-20">
        <div className="container flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Carrousel automatique
          </p>
          <h2 className="text-balance text-3xl font-semibold">Moodboard RedBubble</h2>
        </div>
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex min-w-[200%] gap-6"
          >
            {carouselItems.map((design, index) => (
              <div
                key={`${design.id}-${index}`}
                className="flex w-60 shrink-0 flex-col gap-3 rounded-3xl border border-border/40 bg-background/70 p-4 backdrop-blur-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src={design.src}
                    alt={design.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-background/70 px-3 py-1 text-xs font-medium">
                    {design.tags[0]}
                  </span>
                </div>
                <p className="text-sm font-semibold">{design.title}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
