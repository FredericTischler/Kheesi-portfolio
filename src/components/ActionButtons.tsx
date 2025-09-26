import { type ReactNode, forwardRef } from "react";

import { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionButtonProps = {
  icon?: ReactNode;
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & Omit<ButtonProps, "variant" | "size">;

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon, children, href, target, rel, variant = "primary", size = "sm", className, ...props }, ref) => {
    if (href) {
      return (
        <Button
          ref={ref}
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
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        {icon}
        <span>{children}</span>
      </Button>
    );
  },
);

ActionButton.displayName = "ActionButton";

export function ActionButtonGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap gap-3", className)}>{children}</div>;
}
