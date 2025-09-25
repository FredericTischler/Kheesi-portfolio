import { motion, useReducedMotion } from "framer-motion";
import { Github } from "lucide-react";

import type { Project } from "@/data/projects";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  onQuickView: (project: Project) => void;
};

export function ProjectCard({ project, onQuickView }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      layout={!prefersReducedMotion}
      transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
      role="button"
      tabIndex={0}
      aria-label={`Voir le projet ${project.name}`}
      onClick={() => onQuickView(project)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onQuickView(project);
        }
      }}
      className={cn(
        "group flex h-full flex-col gap-5 overflow-hidden rounded-[2rem] border border-border/60 bg-background/80 p-6 text-left shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",
      )}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { scale: 1.02, y: -6, transition: { duration: 0.3, ease: "easeOut" } }
      }
    >
      {project.thumbnail ? (
        <img
          src={project.thumbnail}
          alt=""
          className="h-44 w-full rounded-[1.75rem] object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="flex h-44 w-full items-center justify-center rounded-[1.75rem] bg-secondary/30 text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Aperçu indisponible
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
          </div>
          {project.featured ? (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              À la une
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 5).map((tech) => (
            <Badge key={`${project.slug}-${tech}`} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-[0.3em]">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 pt-2">
          <Button size="sm" className="gap-2" onClick={(event) => {
            event.stopPropagation();
            onQuickView(project);
          }}>
            Détails
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2" onClick={(event) => event.stopPropagation()}>
            <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Ouvrir ${project.name} sur GitHub`}>
              <Github className="h-4 w-4" aria-hidden="true" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
