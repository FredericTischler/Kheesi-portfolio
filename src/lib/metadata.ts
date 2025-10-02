import { useEffect } from "react";

import { useLocale } from "@/i18n/LocaleProvider";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  buildLocalizedPath,
  stripLocaleFromPath,
  type Locale,
} from "@/i18n/config";

type Metadata = {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
};

const DEFAULT_TITLE = "Frédéric Tischler · Développeur Full-Stack";
const DEFAULT_DESCRIPTION =
  "Portfolio de Frédéric Tischler, développeur full-stack passionné par la conception d’applications web modernes.";
const DEFAULT_SITE_NAME = "Frédéric Tischler";
const FALLBACK_SITE_URL = "https://frederictischler.dev";

function resolveSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (typeof import.meta !== "undefined" && typeof import.meta.env !== "undefined") {
    return import.meta.env.VITE_SITE_URL ?? FALLBACK_SITE_URL;
  }
  return FALLBACK_SITE_URL;
}

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property='${name}']` : `meta[name='${name}']`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    if (property) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel='${rel}']`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

const LOCALE_TO_HREF_LANG: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
};

const LOCALE_TO_OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_GB",
};

function setAlternateLinks(siteUrl: string, basePath: string, search: string) {
  document.head
    .querySelectorAll("link[data-locale-alternate='true']")
    .forEach((link) => link.remove());

  SUPPORTED_LOCALES.forEach((supportedLocale) => {
    const href = `${siteUrl}${buildLocalizedPath(supportedLocale, basePath)}${search}`;
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("href", href);
    link.setAttribute("hreflang", LOCALE_TO_HREF_LANG[supportedLocale] ?? supportedLocale);
    link.setAttribute("data-locale-alternate", "true");
    document.head.appendChild(link);
  });

  const defaultHref = `${siteUrl}${buildLocalizedPath(DEFAULT_LOCALE, basePath)}${search}`;
  const xDefault = document.createElement("link");
  xDefault.setAttribute("rel", "alternate");
  xDefault.setAttribute("href", defaultHref);
  xDefault.setAttribute("hreflang", "x-default");
  xDefault.setAttribute("data-locale-alternate", "true");
  document.head.appendChild(xDefault);
}

function setOgLocaleMeta(currentLocale: Locale) {
  document.head
    .querySelectorAll("meta[data-locale-og='true']")
    .forEach((meta) => meta.remove());

  SUPPORTED_LOCALES.filter((locale) => locale !== currentLocale).forEach((locale) => {
    const meta = document.createElement("meta");
    meta.setAttribute("property", "og:locale:alternate");
    meta.setAttribute("content", LOCALE_TO_OG_LOCALE[locale] ?? locale);
    meta.setAttribute("data-locale-og", "true");
    document.head.appendChild(meta);
  });
}

export function usePageMetadata(metadata: Metadata) {
  const { locale } = useLocale();

  const { title, description = DEFAULT_DESCRIPTION, image, canonical, noIndex = false } = metadata;
  useEffect(() => {
    const baseTitle = title ? `${title} · ${DEFAULT_SITE_NAME}` : DEFAULT_TITLE;
    const siteUrl = resolveSiteUrl();
    const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
    const search = typeof window !== "undefined" ? window.location.search : "";
    const { basePath } = stripLocaleFromPath(pathname);
    const canonicalPath = buildLocalizedPath(locale, basePath || "/");
    const canonicalUrl = canonical ?? `${siteUrl}${canonicalPath}${search}`;
    const absoluteImage = image
      ? image.startsWith("http")
        ? image
        : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
      : undefined;

    document.title = baseTitle;
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", LOCALE_TO_HREF_LANG[locale] ?? locale);
    }
    setMeta("description", description);
    setMeta("og:title", baseTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", DEFAULT_SITE_NAME, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:locale", LOCALE_TO_OG_LOCALE[locale] ?? locale, true);
    setOgLocaleMeta(locale);
    if (absoluteImage) {
      setMeta("og:image", absoluteImage, true);
      setMeta("twitter:image", absoluteImage);
    }
    setMeta("twitter:card", absoluteImage ? "summary_large_image" : "summary");
    setMeta("twitter:title", title ?? DEFAULT_TITLE);
    setMeta("twitter:description", description);
    setMeta("robots", noIndex ? "noindex,follow" : "index,follow");
    setLink("canonical", canonicalUrl);
    setAlternateLinks(siteUrl, basePath || "/", search);
  }, [title, description, image, canonical, noIndex, locale]);
}
