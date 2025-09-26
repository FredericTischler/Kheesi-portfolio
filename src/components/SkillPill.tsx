import { type CSSProperties, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SkillPillProps = {
  name: string;
  icon: string;
  initials: string;
  color: string;
  category: string;
} & HTMLAttributes<HTMLDivElement>;

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const bigint = parseInt(value, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function SkillPill({
  name,
  icon,
  initials,
  color,
  category,
  className,
  style,
  ...props
}: SkillPillProps) {
  const containerStyle: CSSProperties = {
    backgroundColor: hexToRgba(color, 0.12),
    borderColor: hexToRgba(color, 0.35),
    color,
    ...style,
  };

  const accentBorder = hexToRgba(color, 0.45);
  const accentBackground = hexToRgba(color, 0.1);

  return (
    <div
      className={cn("flex items-center gap-3 rounded-lg border px-4 py-3", className)}
      style={containerStyle}
      {...props}
    >
      <span
        className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border"
        style={{ borderColor: accentBorder, backgroundColor: accentBackground }}
      >
        <img
          src={icon}
          alt={`Logo ${name}`}
          loading="lazy"
          className="h-6 w-6 object-contain"
          onError={(event) => {
            const image = event.currentTarget;
            image.style.display = "none";
            const fallback = image.nextElementSibling as HTMLElement | null;
            if (fallback) {
              fallback.style.display = "block";
            }
          }}
        />
        <span
          aria-hidden="true"
          className="hidden text-xs font-semibold uppercase"
          style={{ color }}
        >
          {initials}
        </span>
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-semibold uppercase tracking-[0.2em]">{name}</span>
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80">{category}</span>
      </div>
    </div>
  );
}

export default SkillPill;
