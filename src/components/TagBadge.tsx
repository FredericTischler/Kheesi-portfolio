import type { ReactNode } from "react";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TagBadgeProps = {
  children: ReactNode;
  tone?: "default" | "emphasis";
  className?: string;
} & Omit<BadgeProps, "variant">;

const toneClasses: Record<NonNullable<TagBadgeProps["tone"]>, string> = {
  default: "",
  emphasis: "tech-badge",
};

export function TagBadge({ children, tone = "default", className, ...props }: TagBadgeProps) {
  return (
    <Badge
      {...props}
      variant={props.variant ?? "outline"}
      className={cn("px-3 py-1 text-xs uppercase tracking-[0.3em]", toneClasses[tone], className)}
    >
      {children}
    </Badge>
  );
}

type TagListProps = {
  items: ReactNode[];
  tone?: TagBadgeProps["tone"];
  className?: string;
  badgeClassName?: string;
  variant?: BadgeProps["variant"];
} & Omit<TagBadgeProps, "children" | "tone" | "className">;

export function TagList({ items, tone = "default", className, badgeClassName, variant, ...props }: TagListProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item, index) => (
        <TagBadge key={index} tone={tone} variant={variant} className={badgeClassName} {...props}>
          {item}
        </TagBadge>
      ))}
    </div>
  );
}
