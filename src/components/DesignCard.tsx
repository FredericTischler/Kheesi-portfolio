import { motion } from "framer-motion";
import { ExternalLink, ZoomIn } from "lucide-react";
import { type ComponentProps, type ReactNode, useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RBItem } from "@/data/print-on-demand";

function resolveFallback(preview: string, explicitFallback?: string) {
  if (explicitFallback && !preview.includes("/assets/designs-webp/")) {
    return explicitFallback;
  }
  if (preview.includes("/assets/designs-webp/")) {
    const [base, query] = preview.split("?");
    const fallbackBase = base
      .replace("/assets/designs-webp/", "/assets/designs/")
      .replace(/\.webp$/, ".png");
    return query ? `${fallbackBase}?${query}` : fallbackBase;
  }
  return explicitFallback ?? preview;
}

type MotionArticleProps = ComponentProps<typeof motion.article>;

export type DesignCardProps = {
  item: RBItem;
  categoryLabel?: string;
  formatLabel: string;
  paletteLabel: string;
  onZoom?: () => void;
  zoomLabel?: string;
  zoomIcon?: ReactNode;
  actionLabel?: string;
  actionIcon?: ReactNode;
  actionHref?: string;
  badgesVariant?: "outline" | "secondary";
  titleId?: string;
  tagsId?: string;
  descriptionId?: string;
} & MotionArticleProps;

export function DesignCard({
  item,
  categoryLabel,
  formatLabel,
  paletteLabel,
  onZoom,
  zoomLabel = "Zoom",
  zoomIcon,
  actionLabel = "Voir sur RedBubble",
  actionIcon,
  actionHref,
  badgesVariant = "outline",
  titleId,
  tagsId,
  descriptionId,
  ...motionProps
}: DesignCardProps) {
  const previewImage = useMemo(
    () => (item.gallery && item.gallery.length > 0 ? item.gallery[0] : item.src),
    [item.gallery, item.src],
  );

  const previewFallback = useMemo(
    () => resolveFallback(previewImage, item.fallback),
    [item.fallback, previewImage],
  );

  const createdAtLabel = useMemo(() => {
    if (!item.createdAt) return undefined;
    const timestamp = Date.parse(item.createdAt);
    if (Number.isNaN(timestamp)) {
      return undefined;
    }
    return new Date(timestamp).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [item.createdAt]);

  return (
    <motion.article
      {...motionProps}
      className="group flex h-full flex-col rounded-[2rem] border border-border/60 bg-background/80 shadow-lg"
    >
      <div className="relative overflow-hidden rounded-t-[2rem] bg-secondary/30">
        {onZoom ? (
          <button
            type="button"
            onClick={onZoom}
            className="group/btn absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-2 text-xs uppercase tracking-[0.3em] text-foreground opacity-0 shadow-lg backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-hover:opacity-100"
            aria-label={`${zoomLabel} ${item.title}`}
          >
            {zoomIcon ?? <ZoomIn className="h-3.5 w-3.5" />}
            {zoomLabel}
          </button>
        ) : null}
        <picture>
          <source srcSet={previewImage} type="image/webp" />
          {previewFallback ? <source srcSet={previewFallback} type="image/png" /> : null}
          <img
            src={previewFallback ?? previewImage}
            alt={`Illustration print on demand : ${item.title} – ${item.tags.join(", ")}`}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full object-contain p-4 transition duration-500 ease-out group-hover:scale-[1.02]"
            onClick={onZoom}
          />
        </picture>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6" aria-live="polite">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 id={titleId} className="text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            {categoryLabel ? (
              <Badge variant="outline" className="self-start px-4 py-1 text-xs uppercase tracking-[0.25em]">
                {categoryLabel}
              </Badge>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            <span className="rounded-full bg-secondary/30 px-3 py-1 text-muted-foreground">{formatLabel}</span>
            <span className="rounded-full bg-secondary/30 px-3 py-1 text-muted-foreground">{paletteLabel}</span>
          </div>
        </div>
        {createdAtLabel ? (
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{createdAtLabel}</p>
        ) : null}
        <p className="text-xs text-muted-foreground">{item.usage}</p>
        <div className="flex flex-wrap gap-2" id={tagsId ?? `design-${item.id}-tags`}>
          {item.tags.slice(0, 5).map((tag, index) => (
            <Badge
              key={`${item.id}-${tag}`}
              variant={badgesVariant}
              className={`tech-badge tech-badge-${(index % 4) + 1}`}
            >
              #{tag}
            </Badge>
          ))}
        </div>
        <p className="sr-only" id={descriptionId ?? `design-${item.id}-summary`}>
          {`Description : ${item.title}. Tags : ${item.tags.join(", ")}.`}
        </p>
        <div className="mt-auto">
          <Button asChild variant="outline" size="sm" className="w-full gap-2">
            <a href={actionHref ?? item.rbLink} target="_blank" rel="noreferrer">
              {actionIcon ?? <ExternalLink className="h-4 w-4" />} {actionLabel}
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}


