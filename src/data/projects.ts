export type Project = {
  slug: string;
  name: string;
  description: string;
  stacks: string[];
  highlighted?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "mellow",
    name: "Mellow",
    description:
      "Réseau social  : flux de posts, profils et messagerie temps réel.",
    stacks: ["Go", "SQLite", "WebSockets", "Next.js", "JavaScript", "HTML", "CSS", "Docker"],
    highlighted: true,
  },
  {
    slug: "turing-machine",
    name: "Turing Machine",
    description:
      "Simulateur de machine de Turing avec parsing des transitions, exécution pas à pas et visualisation des rubans/états.",
    stacks: ["Java"],
    highlighted: true,
  },
  {
    slug: "mini-framework",
    name: "Mini framework",
    description:
      "Mini framework JavaScript inspiré de React : système de composants, rendu DOM, état, et router minimal.",
    stacks: ["JavaScript", "HTML", "CSS"],
  },
  {
    slug: "realtimeforum",
    name: "RealTimeForum",
    description:
      "Forum en temps réel : inscription/connexion, feed de posts, commentaires, chat privé via WebSockets.",
    stacks: ["Go", "SQLite", "WebSockets", "JavaScript", "SPA", "Docker"],
  },
  {
    slug: "graphql",
    name: "GraphQL",
    description:
      "API GraphQL et page profil ; auth JWT (Basic sur /signin), client Next.js pour la consommation.",
    stacks: ["Next.js (TypeScript)", "GraphQL", "JWT", "Node.js"],
  },
  {
    slug: "forum",
    name: "Forum",
    description:
      "Forum classique : catégories, posts, commentaires, sessions/cookies, templates serveur.",
    stacks: ["Go", "SQLite", "Sessions", "HTML", "CSS", "Templates"],
  },
  {
    slug: "groupie-tracker",
    name: "Groupie tracker",
    description:
      "Explorateur d’artistes/événements via API : filtres, recherche et affichage dynamique.",
    stacks: ["Go", "HTTP", "JSON", "HTML", "CSS", "JavaScript"],
  },
  {
    slug: "server-client",
    name: "Server - Client",
    description:
      "Projet réseau : Client qui envoie une commande système au serveur, le serveur exécute la commande sur un thread dédié et renvoie le résultat au client.",
    stacks: ["C", "TCP/UDP", "CLI"],
  },
  {
    slug: "lem-in",
    name: "Lem-in",
    description:
      "Résolution de chemins pour colonies de fourmis sur graphe (parsing, BFS/flows, optimisation).",
    stacks: ["Go", "Algorithmes", "Graphes"],
  },
  {
    slug: "ocaml",
    name: "Ocaml",
    description:
      "Exercices et mini-projets en OCaml : Arbres binaires de recherche, algorithmes, parsing.",
    stacks: ["OCaml"],
  },
  {
    slug: "graph",
    name: "Graph",
    description:
      "Visualisation des performances de quelques algorithmes du chemin le plus court dans un graphe : BFS/DFS, Dijkstra, A*.",
    stacks: ["Python", "Algorithmes", "Graphes"],
  },
];

export function getHighlightedProjects(): Project[] {
  return PROJECTS.filter((project) => project.highlighted);
}

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
