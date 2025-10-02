export const SUPPORTED_LOCALES = ["fr", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && SUPPORTED_LOCALES.includes(value as Locale);
}

export function getBasePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

export function buildLocalizedPath(locale: Locale, path: string): string {
  const normalized = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const basePath = getBasePath(locale);

  if (!basePath) {
    return normalized;
  }

  if (normalized === "/") {
    return basePath || "/";
  }

  return `${basePath}${normalized}`;
}

export function stripLocaleFromPath(pathname: string): { locale: Locale; basePath: string } {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segment = normalized.split("/")[1];

  if (isLocale(segment) && segment !== DEFAULT_LOCALE) {
    return { locale: segment, basePath: normalized.replace(`/${segment}`, "") || "/" };
  }

  return { locale: DEFAULT_LOCALE, basePath: normalized || "/" };
}
