import { motion } from "framer-motion";
import { type ComponentProps, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type MotionArticleProps = ComponentProps<typeof motion.article>;

type ProjectPreviewCardProps = Omit<MotionArticleProps, "children"> & {
  project: Project;
  actions?: ReactNode;
  actionsClassName?: string;
  onSelect?: (
    project: Project,
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => void;
  maxBadges?: number;
  descriptionClassName?: string;
};

const PROJECT_PLACEHOLDER_CLASSES =
  "flex h-48 w-full items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-secondary/40 via-secondary/20 to-secondary/40 text-xs uppercase tracking-[0.35em] text-muted-foreground";

export function ProjectPreviewCard({
  project,
  actions,
  actionsClassName = "flex items-center gap-3",
  onSelect,
  maxBadges = 5,
  descriptionClassName = "text-sm text-muted-foreground line-clamp-3",
  className,
  role = "listitem",
  tabIndex = 0,
  onClick,
  onKeyDown,
  ...rest
}: ProjectPreviewCardProps) {
  const {
    ["aria-describedby"]: ariaDescribedByProp,
    ["aria-label"]: ariaLabelProp,
    ...articleProps
  } = rest;

  const summaryId = ariaDescribedByProp ?? `project-${project.slug}-summary`;
  const label = ariaLabelProp ?? `Aperçu du projet ${project.name}`;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (onSelect) {
      onSelect(project, event);
    }
    onClick?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (onSelect && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onSelect(project, event);
    }
    onKeyDown?.(event);
  };

  return (
    <motion.article
      {...articleProps}
      className={cn(
        "group flex h-full flex-col gap-6 rounded-[2rem] border border-border/60 bg-background/80 p-6 text-left shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",
        className,
      )}
      role={role}
      tabIndex={tabIndex}
      aria-describedby={summaryId}
      aria-label={label}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {project.thumbnail ? (
        <img
          src={project.thumbnail}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-48 w-full rounded-[1.75rem] object-cover"
        />
      ) : (
        <div className={PROJECT_PLACEHOLDER_CLASSES}>Aperçu indisponible</div>
      )}
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
        </div>
        <p className={descriptionClassName}>{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, maxBadges).map((tech) => (
            <Badge
              key={`${project.slug}-${tech}`}
              variant="secondary"
              className="px-3 py-1 text-xs uppercase tracking-[0.3em]"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <p id={summaryId} className="sr-only">
          {`Technologies principales : ${project.tech.join(", ")}.`}
        </p>
      </div>
      {actions ? <div className={actionsClassName}>{actions}</div> : null}
    </motion.article>
  );
}

export default ProjectPreviewCard;
