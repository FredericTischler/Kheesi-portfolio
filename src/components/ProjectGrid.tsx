import { AnimatePresence, motion } from "framer-motion";

import type { Project } from "@/lib/github";

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
    <motion.div
      layout
      className="[column-gap:1.75rem] sm:[column-gap:2rem] [&>*]:mb-6 columns-1 sm:columns-2 xl:columns-3"
    >
      <AnimatePresence>
        {projects.map((project) => (
          <div key={project.slug} className="break-inside-avoid">
            <ProjectCard project={project} onQuickView={onQuickView} />
          </div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
