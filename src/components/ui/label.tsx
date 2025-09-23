import * as React from "react";

import { cn } from "@/lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  asChild?: boolean;
};

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-xs uppercase tracking-[0.28em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };
