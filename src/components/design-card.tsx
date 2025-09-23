import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Eye, LinkIcon } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DESIGN_DETAILS, type Design } from "@/data/designs";
import { cn } from "@/lib/utils";

type DesignCardProps = {
  design: Design;
};

export function DesignCard({ design }: DesignCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const details = DESIGN_DETAILS[design.id];
  const description = details?.description ?? "Design exclusif disponible sur RedBubble.";
  const popularity = details?.popularity ?? 50;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(design.rbLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Clipboard error", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <motion.article
        layout
        className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/40 bg-background/80 shadow-lg transition hover:-translate-y-1 hover:shadow-elevated"
      >
        <div className="relative aspect-square overflow-hidden">
          {!isLoaded && <Skeleton className="absolute inset-0" />}
          <picture>
            {design.src2x ? (
              <source srcSet={`${design.src2x} 2x`} />
            ) : null}
            <img
              src={design.src}
              alt={design.title}
              loading="lazy"
              className={cn(
                "h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105",
                isLoaded ? "" : "blur-up",
              )}
              onLoad={() => setIsLoaded(true)}
            />
          </picture>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent"
            />
          </AnimatePresence>
          <div className="absolute inset-0 hidden flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-md transition group-hover:flex">
            <DialogTrigger asChild>
              <Button variant="secondary" size="lg">
                <Eye className="mr-2 h-4 w-4" /> Aperçu rapide
              </Button>
            </DialogTrigger>
            <Button asChild variant="outline" size="lg">
              <a href={design.rbLink} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Voir sur RedBubble
              </a>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-balance">{design.title}</h3>
            <span className="text-xs font-medium text-muted-foreground">{popularity}%</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {design.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </motion.article>

      <DialogContent>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative overflow-hidden rounded-[2rem]">
            <picture>
              {design.src2x ? (
                <source srcSet={`${design.src2x} 2x`} />
              ) : null}
              <img
                src={design.src}
                alt={design.title}
                className="h-full w-full rounded-[2rem] object-cover"
                loading="lazy"
              />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
          <div className="flex flex-col gap-6">
            <DialogHeader className="border-none px-0 pb-0">
              <DialogTitle className="text-3xl">{design.title}</DialogTitle>
              <DialogDescription className="text-base leading-relaxed text-foreground/80">
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap gap-2">
              {design.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Ajouté le :</strong>{" "}
                {design.createdAt
                  ? new Date(design.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Date inconnue"}
              </p>
              <p>
                <strong className="text-foreground">Popularité :</strong> {popularity}/100
              </p>
            </div>
            <DialogFooter className="gap-3 border-none px-0 pb-0 pt-0">
              <Button asChild size="lg" className="w-full md:w-auto">
                <a href={design.rbLink} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Voir sur RedBubble
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full md:w-auto"
                onClick={handleCopy}
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                {copied ? "Lien copié" : "Copier le lien"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
