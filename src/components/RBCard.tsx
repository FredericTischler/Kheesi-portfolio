import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";

import type { RBItem } from "@/data/print-on-demand";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type RBCardProps = {
  item: RBItem;
  onQuickView: (item: RBItem) => void;
};

export function RBCard({ item, onQuickView }: RBCardProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.article
      layout
      transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/50 bg-background/80 shadow-lg transition hover:-translate-y-1 hover:shadow-elevated"
      role="listitem"
      aria-labelledby={`pod-card-${item.id}-title`}
      aria-describedby={`pod-card-${item.id}-summary`}
    >
      <div className="relative aspect-square overflow-hidden">
        <picture>
          <source
            srcSet={item.src2x ? `${item.src} 1x, ${item.src2x} 2x` : item.src}
            type="image/webp"
          />
          {item.fallback ? (
            <source srcSet={item.fallback} type="image/png" />
          ) : null}
          <img
            src={item.fallback ?? item.src}
            alt={`Illustration print on demand : ${item.title} – ${item.tags.join(", ")}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </picture>
        <div className="absolute inset-0 hidden flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-xl transition group-hover:flex">
          <Button variant="secondary" size="md" onClick={() => onQuickView(item)}>
            <Eye className="mr-2 h-4 w-4" /> Aperçu rapide
          </Button>
          <Button asChild variant="outline" size="md" className="gap-2">
            <a href={item.rbLink} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" /> RedBubble
            </a>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 id={`pod-card-${item.id}-title`} className="text-lg font-semibold text-foreground">
            {item.title}
          </h3>
          {item.featured ? (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
              À la une
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="tracking-[0.2em]">
              #{tag}
            </Badge>
          ))}
        </div>
        <p className="sr-only" id={`pod-card-${item.id}-summary`}>
          {`Description : ${item.title}. Tags : ${item.tags.join(", ")}. ${item.createdAt ? `Publié le ${new Date(item.createdAt).toLocaleDateString("fr-FR")}.` : ""}`}
        </p>
        <span className={cn("text-xs uppercase tracking-[0.3em] text-muted-foreground")}>
          {item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : ""}
        </span>
      </div>
    </motion.article>
  );
}
