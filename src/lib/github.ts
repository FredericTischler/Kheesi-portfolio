import { useEffect, useMemo, useState } from "react";

import { formatRelativeTime, slugify } from "@/lib/format";

export type Project = {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  stars: number;
  url: string;
  updated: string;
  updatedAt: string;
  featured?: boolean;
  thumbnail?: string;
};

type GitHubRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
  pushed_at: string;
  default_branch?: string;
};

const GITHUB_USER = "FredericTischler";
const CACHE_KEY = "ft-projects-v1";
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24h

export const FEATURED: Record<string, Partial<Project>> = {
  RealTimeForum: {
    featured: true,
    description:
      "Application de forum avancée (SPA) avec WebSockets en temps réel, messagerie privée, posts/commentaires, Go backend + SQLite, JS frontend.",
    tech: ["Go", "WebSockets", "SQLite", "SPA", "JavaScript"],
  },
  Forum: {
    featured: true,
    description:
      "Forum en Go avec notifications temps réel, suivi d’activité, OAuth Google/GitHub, rôles de modération, sécurité HTTPS & rate limiting.",
    tech: ["Go", "SQLite", "OAuth", "Security", "Notifications"],
  },
  "Groupie-tracker": {
    description:
      "Appli web artistes/concerts : recherche multi-critères, filtres (dates/lieux/membres), géolocalisation des concerts, templates Go.",
    tech: ["Go", "HTML", "Bootstrap", "Maps"],
  },
  GraphQl: {
    description: "Scaffold TypeScript/GraphQL (répertoire graphql/), base pour API/queries.",
    tech: ["TypeScript", "GraphQL"],
  },
  "mini-framework": {
    description:
      "Mini framework JS: structure HTML/CSS/JS, pages de test, DOCUMENTATION.md.",
    tech: ["JavaScript", "HTML", "CSS"],
  },
  "bomberman-dom": {
    description: "Petit jeu DOM/JS style Bomberman (mécaniques en JS/DOM).",
    tech: ["JavaScript", "DOM"],
  },
  "Lem-in": {
    tech: ["Go"],
  },
  "Turing-Machine": {
    tech: ["Java"],
  },
  "Words-Shared": {
    description:
      "Programme C listant les mots partagés entre fichiers, occurrences, tri décroissant puis lexicographique.",
    tech: ["C"],
  },
};

type CacheValue = {
  timestamp: number;
  data: Project[];
};

function isCacheValid(cache: CacheValue | null) {
  if (!cache) return false;
  return Date.now() - cache.timestamp < CACHE_DURATION;
}

function readCache(): Project[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheValue;
    if (!isCacheValid(parsed)) return null;
    return parsed.data;
  } catch (error) {
    console.warn("Failed to read project cache", error);
    return null;
  }
}

function writeCache(data: Project[]) {
  if (typeof window === "undefined") return;
  try {
    const payload: CacheValue = { timestamp: Date.now(), data };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Failed to write project cache", error);
  }
}

function stripMarkdown(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/#+\s/g, "")
    .replace(/[->*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchReadmeSnippet(repo: GitHubRepo) {
  const branch = repo.default_branch ?? "main";
  const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/${branch}/README.md`;
  try {
    const response = await fetch(url);
    if (!response.ok) return "";
    const text = await response.text();
    const clean = stripMarkdown(text);
    return clean.slice(0, 420);
  } catch (error) {
    console.warn("README fetch failed", error);
    return "";
  }
}

function mergeTech(language: string | null, topics: string[] | undefined, override?: string[]) {
  const base = new Set<string>();
  if (language) base.add(language);
  topics?.forEach((topic) => base.add(topic));
  override?.forEach((item) => base.add(item));
  return Array.from(base).map((item) => item.replace(/[-_]/g, " "));
}

async function mapRepoToProject(repo: GitHubRepo): Promise<Project> {
  const override = FEATURED[repo.name];
  let description = override?.description ?? repo.description ?? "";
  if (!description) {
    description = await fetchReadmeSnippet(repo);
  }
  const tech = mergeTech(repo.language, repo.topics, override?.tech);
  const slug = slugify(repo.name);
  const project: Project = {
    name: repo.name,
    slug,
    description: description || "Projet GitHub sans description détaillée.",
    tech,
    stars: repo.stargazers_count,
    url: repo.html_url,
    updated: formatRelativeTime(repo.pushed_at) || repo.pushed_at,
    updatedAt: repo.pushed_at,
    featured: override?.featured,
    thumbnail: `/assets/projects/${slug}.jpg`,
  };
  // If no thumbnail exists, consumer may fallback to placeholder.
  return project;
}

export async function fetchGitHubProjects(force = false): Promise<Project[]> {
  if (!force) {
    const cached = readCache();
    if (cached) return cached;
  }

  const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const repos = (await response.json()) as GitHubRepo[];

  const mapped = await Promise.all(repos.map((repo) => mapRepoToProject(repo)));

  const withOverrides = mapped.map((project) => {
    const override = FEATURED[project.name];
    if (!override) return project;
    return {
      ...project,
      ...override,
      tech: override.tech ?? project.tech,
    };
  });

  writeCache(withOverrides);
  return withOverrides;
}

export function useGitHubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setStatus("loading");
    fetchGitHubProjects()
      .then((result) => {
        if (!mounted) return;
        setProjects(result);
        setStatus("success");
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        console.error(err);
        setError(err instanceof Error ? err.message : "Erreur inattendue");
        setStatus("error");
      });
    return () => {
      mounted = false;
    };
  }, []);

  const featured = useMemo(() => projects.filter((project) => project.featured), [projects]);

  return { projects, featured, status, error } as const;
}
