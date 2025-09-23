import { ExternalLink, LinkIcon } from "lucide-react";

import type { RBItem } from "@/data/redbubble";
import { useClipboard } from "@/lib/clipboard";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type RBModalProps = {
  item: RBItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RBModal({ item, open, onOpenChange }: RBModalProps) {
  const { copied, copy } = useClipboard();

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative overflow-hidden rounded-[2rem]">
            <picture>
              {item.src2x ? <source srcSet={`${item.src2x} 2x`} /> : null}
              <img src={item.src} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
          <div className="flex flex-col gap-6">
            <DialogHeader className="border-none px-0 pb-0">
              <DialogTitle>{item.title}</DialogTitle>
              <DialogDescription>
                Visuel RedBubble composé de {item.tags.slice(0, 3).join(", ")}.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="rounded-[1.5rem] border border-border/60 bg-secondary/30 px-4 py-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              {item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Date non précisée"}
            </div>
            <DialogFooter className="flex-row items-center justify-start gap-3 border-none bg-transparent px-0 py-0">
              <Button asChild size="md" className="gap-2">
                <a href={item.rbLink} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" /> Voir sur RedBubble
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="md"
                className="gap-2"
                onClick={() => copy(item.rbLink)}
              >
                <LinkIcon className="h-4 w-4" /> {copied ? "Lien copié" : "Copier le lien"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RBModal;
