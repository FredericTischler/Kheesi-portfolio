import { Github, LinkIcon } from "lucide-react";

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

  const githubUrl = `https://github.com/FredericTischler/${project.slug}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="border-none px-0 pb-0">
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 px-0">
          <div className="flex flex-wrap gap-2">
            {project.stacks.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="rounded-[1.5rem] border border-border/60 bg-secondary/30 p-6 text-sm text-muted-foreground">
            Ces projets mettent en avant des stacks variées : temps réel, algorithmes et front-end. Consultez la
            page GitHub correspondante pour un aperçu du code et de la documentation.
          </p>
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
