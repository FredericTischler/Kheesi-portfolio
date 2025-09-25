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
    name: "Mellow — réseau social full-stack",
    description:
      "Réseau social complet : profils, posts, commentaires, groupes, messages privés & de groupe, notifications temps réel. Backend Go + SQLite (sessions, services/repos), frontend Next.js/React + Tailwind, orchestration Docker. Endpoints Auth/Users/Posts/Groups/Messages/Notifications, rooms WS.",
    tech: ["Go", "SQLite", "WebSockets", "Next.js", "React", "Tailwind", "Docker"],
    url: "https://github.com/FredericTischler/Mellow",
    featured: true,
    thumbnail: "/assets/projects/mellow.svg",
  },
  {
    slug: "turing-machine",
    name: "Turing-Machine — simulateur GUI",
    description:
      "Simulateur de machine de Turing (Java/Maven) avec interface graphique : configuration symboles/états, table de transitions, ruban, exécution. README illustré.",
    tech: ["Java", "Maven", "GUI", "Swing"],
    url: "https://github.com/FredericTischler/Turing-Machine",
    thumbnail: "/assets/projects/turing-machine.svg",
  },
  {
    slug: "real-time-forum",
    name: "RealTimeForum — forum temps réel",
    description:
      "Application de forum temps réel : inscription/connexion, posts, commentaires, messagerie privée, notifications WebSockets. Backend Go (handlers/services/repos), SQLite, frontend SPA JS/Bootstrap.",
    tech: ["Go", "SQLite", "WebSockets", "SPA", "JavaScript"],
    url: "https://github.com/FredericTischler/RealTimeForum",
    featured: true,
    thumbnail: "/assets/projects/real-time-forum.svg",
  },
  {
    slug: "words-shared",
    name: "Words-Shared — mots partagés",
    description:
      "Programme C listant les mots partagés entre fichiers, avec occurrences, tri décroissant puis lexicographique. Makefile inclus.",
    tech: ["C"],
    url: "https://github.com/FredericTischler/Words-Shared",
    thumbnail: "/assets/projects/words-shared.svg",
  },
  {
    slug: "lem-in",
    name: "Lem-in — graphes & flux",
    description:
      "Résolution de chemins disjoints : DFS + backtracking pour graphes simples, Edmonds-Karp pour cas complexes (flux). Simulation d’envoi de 'fourmis' Start→End.",
    tech: ["Go", "Graphs", "Algorithms"],
    url: "https://github.com/FredericTischler/Lem-in",
    featured: true,
    thumbnail: "/assets/projects/lem-in.svg",
  },
  {
    slug: "graphql",
    name: "GraphQl — scaffold API TS",
    description:
      "Squelette TypeScript/GraphQL prêt pour schémas, resolvers et tooling TS. Base idéale pour POC ou micro-service.",
    tech: ["TypeScript", "GraphQL", "React"],
    url: "https://github.com/FredericTischler/GraphQl",
    thumbnail: "/assets/projects/graphql.svg",
  },
  {
    slug: "forum",
    name: "Forum — forum avancé",
    description:
      "Forum avancé : OAuth Google/GitHub, rôles (user/modo/admin), notifications en temps réel, suivi d’activité, HTTPS, rate limiting, upload images. Backend Go + SQLite + templates.",
    tech: ["Go", "SQLite", "OAuth", "Security", "Notifications"],
    url: "https://github.com/FredericTischler/Forum",
    featured: true,
    thumbnail: "/assets/projects/forum.svg",
  },
  {
    slug: "mini-framework",
    name: "mini-framework — micro-framework JS",
    description:
      "Proto front JS/HTML/CSS avec DOCUMENTATION.md et pages de test. Base pédagogique pour routing léger, composants et styles.",
    tech: ["JavaScript", "HTML", "CSS"],
    url: "https://github.com/FredericTischler/mini-framework",
    thumbnail: "/assets/projects/mini-framework.svg",
  },
  {
    slug: "groupie-tracker",
    name: "Groupie-tracker — artistes & concerts",
    description:
      "Appli artistes & concerts : recherche (nom, dates, lieux, membres), filtres avancés, géolocalisation des concerts (vue carte). Templates Go, HTML/CSS/Bootstrap.",
    tech: ["Go", "HTML", "Bootstrap", "Maps"],
    url: "https://github.com/FredericTischler/Groupie-tracker",
    featured: true,
    thumbnail: "/assets/projects/groupie-tracker.svg",
  },
  {
    slug: "projet-ocaml",
    name: "Projet-Ocaml — arbres d’intervalles",
    description:
      "Implémentation OCaml d’un arbre binaire de recherche dont chaque nœud est un intervalle ; insertion/recherche adaptées aux intervalles. Base pédagogique pour structures de données fonctionnelles et comparateurs d’intervalles.",
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
