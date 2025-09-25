import { Github, LinkIcon, Star } from "lucide-react";

import type { Project } from "@/data/projects";
import { useClipboard } from "@/lib/clipboard";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ProjectModalProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  const { copied, copy } = useClipboard();

  if (!project) return null;

  const githubUrl = project.url;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="border-none px-0 pb-0">
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 px-0">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt=""
              className="h-56 w-full rounded-[1.75rem] object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {project.updated ? (
              <span className="rounded-full border border-border/60 px-3 py-1">
                {new Date(project.updated).toLocaleDateString("fr-FR")}
              </span>
            ) : null}
            {typeof project.stars === "number" ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1">
                <Star className="h-3 w-3 text-amber-400" aria-hidden="true" />
                {project.stars}
              </span>
            ) : null}
          </div>
        </div>
        <DialogFooter className="flex-row items-center gap-3 border-none bg-transparent px-0 py-0">
          <Button asChild size="md" className="gap-2">
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> Voir sur GitHub
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            className="gap-2"
            onClick={() => copy(githubUrl)}
          >
            <LinkIcon className="h-4 w-4" /> {copied ? "Lien copié" : "Copier"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectModal;
