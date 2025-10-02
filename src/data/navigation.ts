import type { Locale } from "@/i18n/config";

type NavLinkDefinition = {
  id: "home" | "about" | "experience" | "projects" | "workshops" | "contact";
  path: string;
  labels: Record<Locale, string>;
};

export const NAV_LINKS: NavLinkDefinition[] = [
  {
    id: "home",
    path: "/",
    labels: { fr: "Accueil", en: "Home" },
  },
  {
    id: "about",
    path: "/about",
    labels: { fr: "À propos", en: "About" },
  },
  {
    id: "experience",
    path: "/experience",
    labels: { fr: "Expérience", en: "Experience" },
  },
  {
    id: "projects",
    path: "/projects",
    labels: { fr: "Projets", en: "Projects" },
  },
  {
    id: "workshops",
    path: "/workshops",
    labels: { fr: "Workshops", en: "Workshops" },
  },
  {
    id: "contact",
    path: "/contact",
    labels: { fr: "Contact", en: "Contact" },
  },
];
