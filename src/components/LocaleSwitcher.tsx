import { Link, useLocation } from "react-router-dom";

import { useLocale } from "@/i18n/LocaleProvider";
import { stripLocaleFromPath, type Locale } from "@/i18n/config";

type LocaleSwitcherProps = {
  variant?: "default" | "ghost";
};

export function LocaleSwitcher({ variant = "default" }: LocaleSwitcherProps) {
  const { locale, switchPath } = useLocale();
  const { pathname, search, hash } = useLocation();

  const targetLocale: Locale = locale === "fr" ? "en" : "fr";
  const { basePath } = stripLocaleFromPath(pathname);
  const destination = `${switchPath(basePath || "/", targetLocale)}${search}${hash}`;

  const label = targetLocale.toUpperCase();
  const aria = targetLocale === "fr" ? "Basculer en français" : "Switch to English";

  const baseClasses =
    "inline-flex items-center justify-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  const variantClasses =
    variant === "ghost"
      ? "text-muted-foreground hover:bg-secondary/50"
      : "border border-border/50 bg-background/70 text-muted-foreground hover:border-primary/60 hover:text-primary";

  return (
    <Link to={destination} aria-label={aria} className={`${baseClasses} ${variantClasses}`}>
      {label}
    </Link>
  );
}
