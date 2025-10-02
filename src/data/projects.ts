import type { Locale } from "@/i18n/config";

export type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  url: string;
  updated?: string;
  stars?: number;
  featured?: boolean;
  thumbnail?: string;
};

export const PROJECT_SLUG_ORDER = [
  "mellow",
  "turing-machine",
  "real-time-forum",
  "words-shared",
  "lem-in",
  "graphql",
  "forum",
  "mini-framework",
  "groupie-tracker",
  "projet-ocaml",
] as const;

type BaseProject = Pick<Project, "slug" | "tech" | "url" | "thumbnail"> & Partial<Pick<Project, "featured">>;

const BASE_PROJECTS: Record<(typeof PROJECT_SLUG_ORDER)[number], BaseProject> = {
  mellow: {
    slug: "mellow",
    tech: ["Go", "SQLite", "WebSockets", "Next.js", "React", "Tailwind", "Docker"],
    url: "https://github.com/FredericTischler/Mellow",
    featured: true,
    thumbnail: "/assets/projects/mellow.svg",
  },
  "turing-machine": {
    slug: "turing-machine",
    tech: ["Java", "Maven", "GUI"],
    url: "https://github.com/FredericTischler/Turing-Machine",
    thumbnail: "/assets/projects/turing-machine.svg",
  },
  "real-time-forum": {
    slug: "real-time-forum",
    tech: ["Go", "SQLite", "WebSockets", "SPA", "JavaScript"],
    url: "https://github.com/FredericTischler/RealTimeForum",
    featured: true,
    thumbnail: "/assets/projects/real-time-forum.svg",
  },
  "words-shared": {
    slug: "words-shared",
    tech: ["C", "CLI"],
    url: "https://github.com/FredericTischler/Words-Shared",
    thumbnail: "/assets/projects/words-shared.svg",
  },
  "lem-in": {
    slug: "lem-in",
    tech: ["Go", "Graphs", "Algorithms"],
    url: "https://github.com/FredericTischler/Lem-in",
    featured: true,
    thumbnail: "/assets/projects/lem-in.svg",
  },
  graphql: {
    slug: "graphql",
    tech: ["TypeScript", "GraphQL"],
    url: "https://github.com/FredericTischler/GraphQl",
    thumbnail: "/assets/projects/graphql.svg",
  },
  forum: {
    slug: "forum",
    tech: ["Go", "SQLite", "OAuth", "Security", "Notifications"],
    url: "https://github.com/FredericTischler/Forum",
    featured: true,
    thumbnail: "/assets/projects/forum.svg",
  },
  "mini-framework": {
    slug: "mini-framework",
    tech: ["JavaScript", "HTML", "CSS"],
    url: "https://github.com/FredericTischler/mini-framework",
    thumbnail: "/assets/projects/mini-framework.svg",
  },
  "groupie-tracker": {
    slug: "groupie-tracker",
    tech: ["Go", "HTML", "Bootstrap", "Maps"],
    url: "https://github.com/FredericTischler/Groupie-tracker",
    featured: true,
    thumbnail: "/assets/projects/groupie-tracker.svg",
  },
  "projet-ocaml": {
    slug: "projet-ocaml",
    tech: ["OCaml", "Data Structures", "Algorithms"],
    url: "https://github.com/FredericTischler/Projet-Ocaml",
    thumbnail: "/assets/projects/projet-ocaml.svg",
  },
} satisfies Record<(typeof PROJECT_SLUG_ORDER)[number], BaseProject>;

const PROJECTS_BY_LOCALE: Record<Locale, Project[]> = {
  fr: PROJECT_SLUG_ORDER.map((slug) => {
    switch (slug) {
      case "mellow":
        return {
          ...BASE_PROJECTS[slug],
          name: "Mellow",
          description:
            "Réseau social full-stack : profils, posts, commentaires, groupes, messages privés et de groupe, notifications temps réel (WebSockets). Backend Go + SQLite (sessions, services/repos), frontend Next.js/React + Tailwind, orchestration Docker.",
        };
      case "turing-machine":
        return {
          ...BASE_PROJECTS[slug],
          name: "Turing-Machine",
          description:
            "Simulateur GUI (Java/Maven) : configuration symboles/états, table de transitions, ruban, exécution; README illustré.",
        };
      case "real-time-forum":
        return {
          ...BASE_PROJECTS[slug],
          name: "RealTimeForum",
          description:
            "Forum temps réel : inscription/connexion, posts, commentaires, messagerie privée, notifications WebSockets. Backend Go (handlers/services/repos), SQLite; front SPA JS/Bootstrap.",
        };
      case "words-shared":
        return {
          ...BASE_PROJECTS[slug],
          name: "Words-Shared",
          description:
            "Programme C listant les mots partagés entre fichiers, avec occurrences, tri décroissant puis lexicographique. Makefile.",
        };
      case "lem-in":
        return {
          ...BASE_PROJECTS[slug],
          name: "Lem-in",
          description:
            "Graphes & flux : chemins disjoints. DFS + backtracking pour graphes simples, Edmonds-Karp pour cas complexes (flux). Simulation d’envoi de 'fourmis' Start→End.",
        };
      case "graphql":
        return {
          ...BASE_PROJECTS[slug],
          name: "GraphQl",
          description:
            "Squelette TypeScript/GraphQL prêt pour schémas, resolvers et tooling TS. Base idéale pour POC ou micro-service.",
        };
      case "forum":
        return {
          ...BASE_PROJECTS[slug],
          name: "Forum",
          description:
            "Forum avancé : OAuth Google/GitHub, rôles (user/modo/admin), notifications, suivi d’activité, HTTPS, rate-limiting, upload d’images. Go + SQLite + templates.",
        };
      case "mini-framework":
        return {
          ...BASE_PROJECTS[slug],
          name: "mini-framework",
          description:
            "Proto front JS/HTML/CSS avec DOCUMENTATION.md et pages de test. Base pédagogique pour routing léger, composants et styles.",
        };
      case "groupie-tracker":
        return {
          ...BASE_PROJECTS[slug],
          name: "Groupie-tracker",
          description:
            "Artistes & concerts : recherche (nom, dates, lieux, membres), filtres avancés, géolocalisation des concerts (vue carte). Templates Go + HTML/CSS/Bootstrap.",
        };
      case "projet-ocaml":
        return {
          ...BASE_PROJECTS[slug],
          name: "Projet-Ocaml",
          description:
            "Arbres d’intervalles en OCaml : insertion/recherche sur nœuds d’intervalles. Base pédagogique sur structures de données fonctionnelles et comparateurs.",
        };
      default:
        return BASE_PROJECTS[slug];
    }
  }),
  en: PROJECT_SLUG_ORDER.map((slug) => {
    switch (slug) {
      case "mellow":
        return {
          ...BASE_PROJECTS[slug],
          name: "Mellow",
          description:
            "Full-stack social network: profiles, posts, comments, groups, private and group messaging plus real-time WebSocket notifications. Go + SQLite backend (sessions/services/repos), Next.js/React + Tailwind frontend, Docker orchestration.",
        };
      case "turing-machine":
        return {
          ...BASE_PROJECTS[slug],
          name: "Turing-Machine",
          description:
            "Java/Maven GUI simulator: configure symbols/states, transition table, tape and execution with an illustrated README.",
        };
      case "real-time-forum":
        return {
          ...BASE_PROJECTS[slug],
          name: "RealTimeForum",
          description:
            "Real-time forum featuring sign-up/login, posts, comments, private messaging and WebSocket notifications. Go backend (handlers/services/repos) with SQLite and a JS/Bootstrap SPA frontend.",
        };
      case "words-shared":
        return {
          ...BASE_PROJECTS[slug],
          name: "Words-Shared",
          description:
            "C program listing words shared across files with occurrence counts, sorted by frequency then alphabetically. Includes Makefile.",
        };
      case "lem-in":
        return {
          ...BASE_PROJECTS[slug],
          name: "Lem-in",
          description:
            "Graphs & flows with disjoint paths. DFS + backtracking for simple graphs, Edmonds-Karp for complex cases, simulating ants travelling from Start to End.",
        };
      case "graphql":
        return {
          ...BASE_PROJECTS[slug],
          name: "GraphQl",
          description:
            "TypeScript/GraphQL starter ready for schemas, resolvers and TS tooling. Ideal baseline for a POC or microservice.",
        };
      case "forum":
        return {
          ...BASE_PROJECTS[slug],
          name: "Forum",
          description:
            "Advanced forum with Google/GitHub OAuth, user/moderator/admin roles, notifications, activity tracking, HTTPS, rate limiting and image uploads. Built with Go, SQLite and templates.",
        };
      case "mini-framework":
        return {
          ...BASE_PROJECTS[slug],
          name: "mini-framework",
          description:
            "Front-end prototype in JS/HTML/CSS with DOCUMENTATION.md and test pages. Teaching project covering lightweight routing, components and styling.",
        };
      case "groupie-tracker":
        return {
          ...BASE_PROJECTS[slug],
          name: "Groupie-tracker",
          description:
            "Artists & concerts explorer: search by name, dates, locations, members, apply advanced filters and map concerts. Built with Go templates and HTML/CSS/Bootstrap.",
        };
      case "projet-ocaml":
        return {
          ...BASE_PROJECTS[slug],
          name: "Projet-Ocaml",
          description:
            "Interval tree implementation in OCaml with insert/search operations. Educational project on functional data structures and comparators.",
        };
      default:
        return BASE_PROJECTS[slug];
    }
  }),
};

export function getProjects(locale: Locale): Project[] {
  return PROJECTS_BY_LOCALE[locale] ?? PROJECTS_BY_LOCALE.fr;
}

export function getFeaturedProjects(locale: Locale): Project[] {
  return getProjects(locale).filter((project) => project.featured);
}

export function getHighlightedProjects(locale: Locale): Project[] {
  return getFeaturedProjects(locale);
}

export function findProject(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function searchProjects(locale: Locale, query: string): Project[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return getProjects(locale);

  return getProjects(locale).filter((project) =>
    [project.name, project.description, project.tech.join(" ")].some((value) =>
      value.toLowerCase().includes(normalized),
    ),
  );
}

export const PROJECTS = PROJECTS_BY_LOCALE.fr;
