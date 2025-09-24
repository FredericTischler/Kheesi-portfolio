import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { REDBUBBLE_ITEMS } from "@/data/redbubble";
import { usePageMetadata } from "@/lib/metadata";

const GRID_CLASSES = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";

export default function RedbubblePage() {
  usePageMetadata({
    title: "RedBubble",
    description: "Galerie de designs RedBubble avec animations légères et tags thématiques.",
  });

  const prefersReducedMotion = useReducedMotion();
  const items = REDBUBBLE_ITEMS;

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

  return (
    <div className="space-y-14 pb-20 pt-36">
      <section className="container space-y-6">
        <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">RedBubble</p>
        <h1 className="text-4xl font-semibold md:text-5xl">Designs illustrés et impression à la demande</h1>
        <p className="max-w-3xl text-muted-foreground">
          Une sélection de visuels destinés aux produits RedBubble : stickers, textiles, impressions murales. Chaque
          carte présente l’aperçu du design, ses tags principaux et un lien direct vers la boutique.
        </p>
      </section>

      <section className="container space-y-10">
        {items.length === 0 ? (
          <div className="space-y-6 rounded-[2rem] border border-border/60 bg-background/80 p-10 text-center">
            <h2 className="text-xl font-semibold text-foreground">Aucun design disponible pour le moment</h2>
            <p className="text-sm text-muted-foreground">
              Ajoutez vos images dans <code>public/assets/designs</code> et remplissez <code>src/data/redbubble.ts</code>
              pour afficher la galerie automatiquement.
            </p>
          </div>
        ) : (
          <motion.div
            className={GRID_CLASSES}
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate={prefersReducedMotion ? undefined : "visible"}
            variants={prefersReducedMotion ? undefined : containerVariants}
          >
            {items.map((item) => (
              <motion.article
                key={item.id}
                variants={prefersReducedMotion ? undefined : itemVariants}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.02, y: -4, transition: { duration: 0.3, ease: "easeOut" } }
                }
                className="group flex h-full flex-col rounded-[2rem] border border-border/60 bg-background/80 shadow-lg"
              >
                <div className="relative overflow-hidden rounded-t-[2rem] bg-secondary/30">
                  <img
                    src={item.src}
                    srcSet={item.src2x ? `${item.src2x} 2x` : undefined}
                    alt={item.title}
                    loading="lazy"
                    className="aspect-square w-full object-contain p-4 transition duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
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
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 5).map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-[0.25em]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Button asChild variant="outline" className="w-full gap-2" size="sm">
                      <a href={item.rbLink} target="_blank" rel="noreferrer" aria-label={`Voir ${item.title} sur RedBubble`}>
                        <ExternalLink className="h-4 w-4" /> Voir sur RedBubble
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
