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

export const PROJECTS: Project[] = [
  {
    slug: "mellow",
    name: "Mellow",
    description:
      "Réseau social full-stack : profils, posts, commentaires, groupes, messages privés et de groupe, notifications temps réel (WebSockets). Backend Go + SQLite (sessions, services/repos), frontend Next.js/React + Tailwind, orchestration Docker.",
    tech: ["Go", "SQLite", "WebSockets", "Next.js", "React", "Tailwind", "Docker"],
    url: "https://github.com/FredericTischler/Mellow",
    featured: true,
    thumbnail: "/assets/projects/mellow.svg",
  },
  {
    slug: "turing-machine",
    name: "Turing-Machine",
    description:
      "Simulateur GUI (Java/Maven) : configuration symboles/états, table de transitions, ruban, exécution; README illustré.",
    tech: ["Java", "Maven", "GUI"],
    url: "https://github.com/FredericTischler/Turing-Machine",
    thumbnail: "/assets/projects/turing-machine.svg",
  },
  {
    slug: "real-time-forum",
    name: "RealTimeForum",
    description:
      "Forum temps réel : inscription/connexion, posts, commentaires, messagerie privée, notifications WebSockets. Backend Go (handlers/services/repos), SQLite; front SPA JS/Bootstrap.",
    tech: ["Go", "SQLite", "WebSockets", "SPA", "JavaScript"],
    url: "https://github.com/FredericTischler/RealTimeForum",
    featured: true,
    thumbnail: "/assets/projects/real-time-forum.svg",
  },
  {
    slug: "words-shared",
    name: "Words-Shared",
    description:
      "Programme C listant les mots partagés entre fichiers, avec occurrences, tri décroissant puis lexicographique. Makefile.",
    tech: ["C", "CLI"],
    url: "https://github.com/FredericTischler/Words-Shared",
    thumbnail: "/assets/projects/words-shared.svg",
  },
  {
    slug: "lem-in",
    name: "Lem-in",
    description:
      "Graphes & flux: chemins disjoints. DFS + backtracking pour graphes simples, Edmonds-Karp pour cas complexes (flux). Simulation d’envoi de 'fourmis' Start→End.",
    tech: ["Go", "Graphs", "Algorithms"],
    url: "https://github.com/FredericTischler/Lem-in",
    featured: true,
    thumbnail: "/assets/projects/lem-in.svg",
  },
  {
    slug: "graphql",
    name: "GraphQl",
    description:
      "Squelette TypeScript/GraphQL prêt pour schémas, resolvers et tooling TS. Base idéale pour POC ou micro-service.",
    tech: ["TypeScript", "GraphQL"],
    url: "https://github.com/FredericTischler/GraphQl",
    thumbnail: "/assets/projects/graphql.svg",
  },
  {
    slug: "forum",
    name: "Forum",
    description:
      "Forum avancé : OAuth Google/GitHub, rôles (user/modo/admin), notifications, suivi d’activité, HTTPS, rate-limiting, upload images. Go + SQLite + templates.",
    tech: ["Go", "SQLite", "OAuth", "Security", "Notifications"],
    url: "https://github.com/FredericTischler/Forum",
    featured: true,
    thumbnail: "/assets/projects/forum.svg",
  },
  {
    slug: "mini-framework",
    name: "mini-framework",
    description:
      "Proto front JS/HTML/CSS avec DOCUMENTATION.md et pages de test. Base pédagogique pour routing léger, composants et styles.",
    tech: ["JavaScript", "HTML", "CSS"],
    url: "https://github.com/FredericTischler/mini-framework",
    thumbnail: "/assets/projects/mini-framework.svg",
  },
  {
    slug: "groupie-tracker",
    name: "Groupie-tracker",
    description:
      "Artistes & concerts : recherche (nom, dates, lieux, membres), filtres avancés, géolocalisation des concerts (vue carte). Templates Go + HTML/CSS/Bootstrap.",
    tech: ["Go", "HTML", "Bootstrap", "Maps"],
    url: "https://github.com/FredericTischler/Groupie-tracker",
    featured: true,
    thumbnail: "/assets/projects/groupie-tracker.svg",
  },
  {
    slug: "projet-ocaml",
    name: "Projet-Ocaml",
    description:
      "Arbres d’intervalles en OCaml : insertion/recherche sur nœuds d’intervalles. Base pédagogique sur structures de données fonctionnelles et comparateurs.",
    tech: ["OCaml", "Data Structures", "Algorithms"],
    url: "https://github.com/FredericTischler/Projet-Ocaml",
    thumbnail: "/assets/projects/projet-ocaml.svg",
  },
];

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured);
}

export function getHighlightedProjects(): Project[] {
  return getFeaturedProjects();
}

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function searchProjects(query: string): Project[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return PROJECTS;
  return PROJECTS.filter((project) =>
    [project.name, project.description, project.tech.join(" ")].some((value) =>
      value.toLowerCase().includes(normalized),
    ),
  );
}
