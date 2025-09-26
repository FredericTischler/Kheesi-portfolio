import { useEffect } from "react";

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

export function usePageMetadata(metadata: Metadata) {
  const { title, description = DEFAULT_DESCRIPTION, image, canonical, noIndex = false } = metadata;
  useEffect(() => {
    const baseTitle = title ? `${title} · ${DEFAULT_SITE_NAME}` : DEFAULT_TITLE;
    const siteUrl = resolveSiteUrl();
    const currentPath = typeof window !== "undefined" ? window.location.pathname + window.location.search : "/";
    const canonicalUrl = canonical ?? `${siteUrl}${currentPath}`;
    const absoluteImage = image
      ? image.startsWith("http")
        ? image
        : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
      : undefined;

    document.title = baseTitle;
    setMeta("description", description);
    setMeta("og:title", baseTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", DEFAULT_SITE_NAME, true);
    setMeta("og:url", canonicalUrl, true);
    if (absoluteImage) {
      setMeta("og:image", absoluteImage, true);
      setMeta("twitter:image", absoluteImage);
    }
    setMeta("twitter:card", absoluteImage ? "summary_large_image" : "summary");
    setMeta("twitter:title", title ?? DEFAULT_TITLE);
    setMeta("twitter:description", description);
    setMeta("robots", noIndex ? "noindex,follow" : "index,follow");
    setLink("canonical", canonicalUrl);
  }, [title, description, image, canonical, noIndex]);
}