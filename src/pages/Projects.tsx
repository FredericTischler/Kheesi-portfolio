import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PROJECTS, type Project } from "@/data/projects";
import { usePageMetadata } from "@/lib/metadata";

type LoadState = "idle" | "loading" | "success" | "empty" | "error";

const GITHUB_PROFILE_URL = "https://github.com/FredericTischler";

function normalizeProject(value: unknown): Project {
  const input = (value ?? {}) as Record<string, unknown>;
  const name = typeof input.name === "string" && input.name.trim().length > 0 ? input.name : "Projet GitHub";
  const slug = typeof input.slug === "string" && input.slug.trim().length > 0
    ? input.slug
    : name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const description = typeof input.description === "string" && input.description.trim().length > 0
    ? input.description
    : "Ce projet n’a pas fourni de description détaillée.";
  const stacks = Array.isArray(input.stacks)
    ? (input.stacks as unknown[])
        .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
        .slice(0, 8)
    : [];

  return {
    slug,
    name,
    description,
    stacks,
    highlighted: Boolean(input.highlighted),
  };
}

export default function ProjectsPage() {
  usePageMetadata({
    title: "Projets",
    description:
      "Sélection de projets réalisés par Frédéric Tischler : temps réel, stacks modernes et algorithmes de graphes.",
  });

  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<LoadState>("loading");
  const [projects, setProjects] = useState<Project[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const loadProjects = useCallback(
    async (signal: AbortSignal) => {
      setStatus("loading");
      setErrorMessage(null);

      const delay = (ms: number) =>
        new Promise<void>((resolve) => {
          const timeout = window.setTimeout(resolve, ms);
          if (signal.aborted) {
            clearTimeout(timeout);
            resolve();
          } else {
            signal.addEventListener(
              "abort",
              () => {
                clearTimeout(timeout);
                resolve();
              },
              { once: true },
            );
          }
        });

      if (PROJECTS.length) {
        await delay(180);
        if (signal.aborted) return;
        setProjects(PROJECTS);
        setStatus("success");
        return;
      }

      try {
        await delay(180);
        if (signal.aborted) return;
        const response = await fetch("/api/github-projects.json", { signal });
        if (!response.ok) {
          throw new Error(`GitHub a renvoyé le statut ${response.status}`);
        }
        const payload = await response.json();
        if (signal.aborted) return;
        const parsed = Array.isArray(payload) ? payload.map(normalizeProject) : [];
        if (parsed.length === 0) {
          setProjects([]);
          setStatus("empty");
          return;
        }
        setProjects(parsed);
        setStatus("success");
      } catch (error) {
        if (signal.aborted) return;
        console.error("Échec du chargement des projets", error);
        setProjects([]);
        setErrorMessage(error instanceof Error ? error.message : "Impossible de charger les projets.");
        setStatus("error");
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    void loadProjects(controller.signal);
    return () => controller.abort();
  }, [loadProjects, reloadToken]);

  const handleRetry = useCallback(() => {
    setReloadToken((token) => token + 1);
  }, []);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0 },
    }),
    [],
  );

  const renderContent = () => {
    if (status === "loading") {
      return (
        <div className="space-y-6" aria-live="polite">
          <p className="text-sm text-muted-foreground">Chargement des projets…</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-64 rounded-[2rem]" />
            ))}
          </div>
        </div>
      );
    }

    if (status === "error") {
      return (
        <div className="space-y-6 rounded-[2rem] border border-destructive/40 bg-destructive/10 p-8 text-center">
          <h2 className="text-xl font-semibold text-destructive">Impossible de charger les projets</h2>
          <p className="text-sm text-destructive/80">
            {errorMessage ?? "Une erreur inconnue est survenue. Réessayez dans quelques instants."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={handleRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Réessayer
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> Profil GitHub
              </a>
            </Button>
          </div>
        </div>
      );
    }

    if (status === "empty") {
      return (
        <div className="space-y-6 rounded-[2rem] border border-border/60 bg-background/80 p-10 text-center">
          <h2 className="text-xl font-semibold text-foreground">Aucun projet disponible pour le moment</h2>
          <p className="text-sm text-muted-foreground">
            Déposez un fichier <code>github-projects.json</code> dans <code>public/api</code> ou visitez mon profil pour en
            découvrir davantage.
          </p>
          <Button asChild variant="outline" className="gap-2">
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> Voir sur GitHub
            </a>
          </Button>
        </div>
      );
    }

    return (
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate={prefersReducedMotion ? undefined : "visible"}
        variants={prefersReducedMotion ? undefined : containerVariants}
      >
        {projects.map((project) => (
          <motion.article
            key={project.slug}
            className="flex h-full flex-col justify-between rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg"
            variants={prefersReducedMotion ? undefined : itemVariants}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { scale: 1.02, y: -4, transition: { duration: 0.3, ease: "easeOut" } }
            }
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                {project.highlighted ? (
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                    À la une
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.stacks.slice(0, 5).map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-[0.25em]">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">GitHub</span>
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a
                  href={`https://github.com/FredericTischler/${project.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4" /> Voir sur GitHub
                </a>
              </Button>
            </div>
          </motion.article>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="space-y-14 pb-20 pt-36">
      <section className="container space-y-6">
        <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Projets</p>
        <h1 className="text-4xl font-semibold md:text-5xl">Sélection de réalisations</h1>
        <p className="max-w-3xl text-muted-foreground">
          Découvrez une sélection de projets en Go, TypeScript et React : temps réel, algorithmes de graphes et outils
          internes.
        </p>
      </section>

      <section className="container space-y-10">{renderContent()}</section>
    </div>
  );
}
