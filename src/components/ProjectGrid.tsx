import type { Project } from "@/data/projects";

import { ProjectCard } from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";

type ProjectGridProps = {
  projects: Project[];
  loading?: boolean;
  onQuickView: (project: Project) => void;
};

export function ProjectGrid({ projects, loading, onQuickView }: ProjectGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[22rem] rounded-[2rem]" />
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border/60 p-10 text-center text-muted-foreground">
        Aucun projet trouvé avec ces filtres.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
