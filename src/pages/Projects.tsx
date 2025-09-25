import { useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Link as LinkIcon, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PROJECTS, type Project } from "@/data/projects";
import { useClipboard } from "@/lib/clipboard";
import { usePageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type SortOption = "recent" | "alphabetical";

type FilterState = {
  query: string;
  tech: Set<string>;
  sort: SortOption;
};

const PLACEHOLDER_CLASSES =
  "flex h-48 w-full items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-secondary/40 via-secondary/20 to-secondary/40 text-xs uppercase tracking-[0.35em] text-muted-foreground";

const SORT_LABELS: Record<SortOption, string> = {
  recent: "Plus récents",
  alphabetical: "Nom A→Z",
};

const PROJECT_ORDER = new Map(PROJECTS.map((project, index) => [project.slug, index]));

function sortProjects(projects: Project[], sort: SortOption): Project[] {
  if (sort === "alphabetical") {
    return [...projects].sort((a, b) => a.name.localeCompare(b.name, "fr-FR", { sensitivity: "base" }));
  }

  const total = PROJECTS.length;
  return [...projects].sort((a, b) => {
    const aScore = total - (PROJECT_ORDER.get(a.slug) ?? 0);
    const bScore = total - (PROJECT_ORDER.get(b.slug) ?? 0);
    if (aScore !== bScore) {
      return bScore - aScore;
    }
    return a.name.localeCompare(b.name, "fr-FR", { sensitivity: "base" });
  });
}

function filterProjects(projects: Project[], state: FilterState): Project[] {
  const normalizedQuery = state.query.trim().toLowerCase();
  const selectedTech = state.tech;

  return projects.filter((project) => {
    if (normalizedQuery) {
      const haystack = `${project.name} ${project.description} ${project.tech.join(" ")}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    if (selectedTech.size > 0) {
      const hasAll = Array.from(selectedTech).every((tech) => project.tech.includes(tech));
      if (!hasAll) {
        return false;
      }
    }

    return true;
  });
}

function useProjectFilters(): {
  state: FilterState;
  query: string;
  deferredQuery: string;
  setQuery: (value: string) => void;
  toggleTech: (tech: string) => void;
  clearFilters: () => void;
  setSort: (sort: SortOption) => void;
} {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [tech, setTech] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortOption>("recent");

  return {
    state: { query: deferredQuery, tech, sort },
    query,
    deferredQuery,
    setQuery,
    toggleTech: (value) => {
      setTech((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          next.add(value);
        }
        return next;
      });
    },
    clearFilters: () => {
      setQuery("");
      setTech(new Set());
    },
    setSort,
  };
}

function ProjectThumbnail({ project }: { project: Project }) {
  if (!project.thumbnail) {
    return <div className={PLACEHOLDER_CLASSES}>Aperçu indisponible</div>;
  }

  return (
    <img
      src={project.thumbnail}
      alt=""
      loading="lazy"
      decoding="async"
      className="h-48 w-full rounded-[1.75rem] object-cover"
    />
  );
}

export default function ProjectsPage() {
  usePageMetadata({
    title: "Projets — Frédéric Tischler",
    description: "Découvrez les projets de Frédéric Tischler : Mellow, RealTimeForum, Forum, Groupie-tracker, Lem-in, et plus.",
  });

  const prefersReducedMotion = useReducedMotion();
  const { state, query, deferredQuery, setQuery, toggleTech, clearFilters, setSort } = useProjectFilters();
  const [quickView, setQuickView] = useState<Project | null>(null);
  const { copied, copy } = useClipboard();

  const availableTech = useMemo(
    () => Array.from(new Set(PROJECTS.flatMap((project) => project.tech))).sort((a, b) => a.localeCompare(b, "fr-FR", { sensitivity: "base" })),
    [],
  );

  const filteredProjects = useMemo(() => sortProjects(filterProjects(PROJECTS, state), state.sort), [state]);
  const noResults = filteredProjects.length === 0;
  const hasFilters = deferredQuery.trim().length > 0 || state.tech.size > 0;

  const gridVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.18, delayChildren: 0.06, ease: "easeInOut" as const } },
    }),
    [],
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0 },
    }),
    [],
  );

  const shareUrl = (project: Project) =>
    typeof window !== "undefined" ? `${window.location.origin}/projects#${project.slug}` : project.url;

  const renderProjectCard = (project: Project) => (
    <motion.article
      key={project.slug}
      layout={!prefersReducedMotion}
      layoutId={`project-card-${project.slug}`}
      variants={prefersReducedMotion ? undefined : cardVariants}
      whileHover={
        prefersReducedMotion ? undefined : { scale: 1.02, y: -6, transition: { duration: 0.3, ease: "easeOut" } }
      }
      role="listitem"
      tabIndex={0}
      aria-label={`Aperçu du projet ${project.name}`}
      aria-describedby={`project-${project.slug}-summary`}
      onClick={() => setQuickView(project)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setQuickView(project);
        }
      }}
      className="group flex h-full flex-col gap-6 rounded-[2rem] border border-border/60 bg-background/80 p-6 text-left shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
    >
      <ProjectThumbnail project={project} />
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
       <div className="flex flex-wrap gap-2">
         {project.tech.slice(0, 5).map((tech) => (
            <Badge key={`${project.slug}-${tech}`} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-[0.3em]">
              {tech}
            </Badge>
          ))}
       </div>
        <p id={`project-${project.slug}-summary`} className="sr-only">
          {`Technologies principales : ${project.tech.join(", ")}.`}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-2 btn-cta-outline"
          onClick={(event) => event.stopPropagation()}
        >
          <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Ouvrir ${project.name} sur GitHub`}>
            <Github className="h-4 w-4" aria-hidden="true" /> Voir
          </a>
        </Button>
      </div>
    </motion.article>
  );

  return (
    <div className="space-y-16 pb-20 pt-36">
      <section className="container space-y-6">
        <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Projets</p>
        <h1 className="text-4xl font-semibold md:text-5xl">Réalisations & expérimentations</h1>
        <p className="max-w-3xl text-muted-foreground">
            Java, TypeScript, Angular, SQL : je conçois des applications temps réel et des solutions full-stack performantes.
        </p>
      </section>

      <section className="container space-y-12">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher un projet, une techno..."
                className="h-12 rounded-full border-border/70 pl-11"
                aria-label="Rechercher un projet"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSort(option)}
                  aria-pressed={state.sort === option}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.35em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                    state.sort === option
                      ? "border-primary bg-primary text-primary-foreground shadow"
                      : "border-border/70 bg-background text-muted-foreground hover:bg-secondary/50",
                  )}
                >
                  {SORT_LABELS[option]}
                </button>
              ))}
              {hasFilters ? (
                <Button type="button" variant="ghost" size="sm" className="text-xs uppercase tracking-[0.35em]" onClick={clearFilters}>
                  Réinitialiser
                </Button>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filtrer par technologies">
            {availableTech.map((tech) => {
              const isActive = state.tech.has(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                    isActive ? "bg-primary text-primary-foreground shadow" : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60",
                  )}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-foreground">Tous les projets</h2>
            <span className="text-sm text-muted-foreground">{filteredProjects.length} résultat(s)</span>
          </div>
          {noResults ? (
            <div className="rounded-[2rem] border border-border/60 bg-background/80 p-10 text-center shadow-lg">
              <h3 className="text-lg font-semibold text-foreground">Aucun projet ne correspond</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Ajustez votre recherche ou vos filtres pour explorer d’autres réalisations.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${state.sort}-${state.tech.size}-${deferredQuery}`}
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" role="list" aria-live="polite" aria-label="Liste des projets filtrés"
                variants={prefersReducedMotion ? undefined : gridVariants}
                initial={prefersReducedMotion ? undefined : "hidden"}
                animate={prefersReducedMotion ? undefined : "visible"}
              >
                {filteredProjects.map((project) => renderProjectCard(project))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <Dialog open={Boolean(quickView)} onOpenChange={(open) => (open ? undefined : setQuickView(null))}>
        <AnimatePresence>
          {quickView ? (
      <DialogContent className="border-border/70 bg-background/95 p-0 shadow-elevated">
        <motion.div
          layoutId={`project-card-${quickView.slug}`}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeInOut" }}
          className="flex flex-col"
        >
          <DialogHeader className="space-y-2 border-b border-border/60 px-6 py-5">
            <DialogTitle className="text-2xl font-semibold">{quickView.name}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">{quickView.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 px-6 py-6">
            <ProjectThumbnail project={quickView} />
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {quickView.tech.map((tech) => (
                  <Badge key={`${quickView.slug}-${tech}`} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-[0.3em]">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col gap-3 border-t border-border/60 bg-background/90 px-6 py-5 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => copy(shareUrl(quickView))}
            >
              <LinkIcon className="h-4 w-4" aria-hidden="true" /> {copied ? "Lien copié" : "Copier le lien"}
            </Button>
            <Button asChild className="gap-2 btn-cta">
              <a href={quickView.url} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> Voir sur GitHub
              </a>
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
          ) : null}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
