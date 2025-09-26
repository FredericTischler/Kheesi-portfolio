import { type ReactNode } from "react";

import { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionButtonProps = {
  icon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  asChild?: boolean;
} & Omit<ButtonProps, "variant" | "size" | "asChild">;

export function ActionButton({
  icon,
  href,
  target,
  rel,
  variant = "primary",
  size = "sm",
  className,
  children,
  asChild,
  ...props
}: ActionButtonProps) {
  if (asChild) {
    return (
      <Button asChild variant={variant} size={size} className={cn("inline-flex items-center gap-2", className)} {...props}>
        {children}
      </Button>
    );
  }

  if (href) {
    return (
      <Button
        asChild
        variant={variant}
        size={size}
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        <a href={href} target={target} rel={rel} className="inline-flex items-center gap-2">
          {icon}
          <span>{children}</span>
        </a>
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} className={cn("inline-flex items-center gap-2", className)} {...props}>
      {icon}
      <span>{children}</span>
    </Button>
  );
}

export function ActionButtonGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap gap-3", className)}>{children}</div>;
}
