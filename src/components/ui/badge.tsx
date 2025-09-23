import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline";

const variants: Record<BadgeVariant, string> = {
  default: "bg-primary/10 text-primary border border-primary/30",
  secondary: "bg-secondary/60 text-secondary-foreground border border-secondary/40",
  outline: "border border-border/60 text-muted-foreground",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]",
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";
