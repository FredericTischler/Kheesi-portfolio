import { Github, LinkIcon } from "lucide-react";

import type { Project } from "@/lib/github";
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="border-none px-0 pb-0">
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 px-0">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <dl className="grid grid-cols-1 gap-4 rounded-[1.5rem] border border-border/60 bg-secondary/30 p-6 text-sm text-muted-foreground sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em]">Stars</dt>
              <dd className="text-foreground">{project.stars}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em]">Dernière mise à jour</dt>
              <dd className="text-foreground">{project.updated}</dd>
            </div>
          </dl>
        </div>
        <DialogFooter className="flex-row items-center gap-3 border-none bg-transparent px-0 py-0">
          <Button asChild size="md" className="gap-2">
            <a href={project.url} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> Voir sur GitHub
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            className="gap-2"
            onClick={() => copy(project.url)}
          >
            <LinkIcon className="h-4 w-4" /> {copied ? "Lien copié" : "Copier"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectModal;
