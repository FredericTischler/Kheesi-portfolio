import type { NavLinkId } from "@/i18n/types";

type NavLinkDefinition = {
  id: NavLinkId;
  path: string;
};

export const NAV_LINKS: NavLinkDefinition[] = [
  {
    id: "home",
    path: "/",
  },
  {
    id: "about",
    path: "/about",
  },
  {
    id: "experience",
    path: "/experience",
  },
  {
    id: "projects",
    path: "/projects",
  },
  {
    id: "workshops",
    path: "/workshops",
  },
  {
    id: "contact",
    path: "/contact",
  },
];
