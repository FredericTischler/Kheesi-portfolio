import { motion, useReducedMotion } from "framer-motion";
import { Github, Star } from "lucide-react";

import type { Project } from "@/lib/github";

import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  project: Project;
  onQuickView: (project: Project) => void;
};

export function ProjectCard({ project, onQuickView }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const thumbnail = project.thumbnail;

  return (
    <motion.article
      layout
      transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-[2rem] border border-border/50 bg-background/80 shadow-lg transition hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative h-48 overflow-hidden bg-secondary/40">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
            onError={(event) => {
              (event.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
          </div>
          {project.featured ? (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              Feature
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-full bg-secondary/40 px-3 py-1 uppercase tracking-[0.25em]">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" aria-hidden="true" /> {project.stars}
          </span>
          <span>{project.updated}</span>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Button variant="primary" size="md" className="gap-2" onClick={() => onQuickView(project)}>
            Détails
          </Button>
          <Button asChild variant="outline" size="md" className="gap-2">
            <a href={project.url} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
