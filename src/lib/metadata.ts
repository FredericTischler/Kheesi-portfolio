import { useEffect } from "react";

type Metadata = {
  title: string;
  description?: string;
};

const DEFAULT_TITLE = "Frédéric Tischler · Développeur Full-Stack";
const DEFAULT_DESCRIPTION =
  "Portfolio de Frédéric Tischler, développeur full-stack passionné par la conception d’applications web modernes.";

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

export function usePageMetadata(metadata: Metadata) {
  const { title, description = DEFAULT_DESCRIPTION } = metadata;
  useEffect(() => {
    document.title = title ? `${title} · Frédéric Tischler` : DEFAULT_TITLE;
    setMeta("description", description);
    setMeta("og:title", title ?? DEFAULT_TITLE, true);
    setMeta("og:description", description, true);
    setMeta("twitter:title", title ?? DEFAULT_TITLE);
    setMeta("twitter:description", description);
  }, [description, title]);
}

export function getDefaultMetadata(): Metadata {
  return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION };
}
