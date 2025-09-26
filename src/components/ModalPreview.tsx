import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const DEFAULT_PLACEHOLDER_CLASSES =
  "flex h-56 w-full items-center justify-center rounded-[1.75rem] bg-secondary/40 text-xs uppercase tracking-[0.35em] text-muted-foreground";

type ModalPreviewProps = {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  placeholderLabel?: string;
  badgesTitle?: string;
  badges?: string[];
  badgeVariant?: "secondary" | "outline";
  children?: ReactNode;
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  motionProps?: MotionProps & { className?: string };
};

export function ModalPreview({
  title,
  description,
  image,
  imageAlt,
  placeholderLabel = "Aperçu indisponible",
  badgesTitle,
  badges,
  badgeVariant = "secondary",
  children,
  headerSlot,
  footerSlot,
  motionProps,
}: ModalPreviewProps) {
  const content = (
    <>
      <DialogHeader className="space-y-2 border-b border-border/60 px-6 py-5">
        {headerSlot ?? (
          <>
            <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
            {description ? <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription> : null}
          </>
        )}
      </DialogHeader>
      <div className="space-y-6 px-6 py-6">
        {image ? (
          <img
            src={image}
            alt={imageAlt ?? ""}
            loading="lazy"
            decoding="async"
            className="h-56 w-full rounded-[1.75rem] object-cover"
          />
        ) : (
          <div className={DEFAULT_PLACEHOLDER_CLASSES}>{placeholderLabel}</div>
        )}
        {badges && badges.length > 0 ? (
          <div className="space-y-4">
            {badgesTitle ? (
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">{badgesTitle}</h3>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Badge key={badge} variant={badgeVariant} className="px-3 py-1 text-xs uppercase tracking-[0.3em]">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
        {children}
      </div>
      {footerSlot ? (
        <DialogFooter className="flex flex-col gap-3 border-t border-border/60 bg-background/90 px-6 py-5 sm:flex-row sm:justify-end">
          {footerSlot}
        </DialogFooter>
      ) : null}
    </>
  );

  return (
    <DialogContent className="w-[min(92vw,720px)] border-border/70 bg-background/95 p-0 shadow-elevated">
      {motionProps ? (
        <motion.div {...motionProps} className={cn("flex flex-col", motionProps.className)}>
          {content}
        </motion.div>
      ) : (
        content
      )}
    </DialogContent>
  );
}

