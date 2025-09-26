import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionIntroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionIntro({ eyebrow, title, description, align = "left", className }: SectionIntroProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "text-center items-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-muted-foreground">{description}</p> : null}
    </div>
  );
}
