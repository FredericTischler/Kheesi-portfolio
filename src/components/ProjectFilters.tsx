import { Filter, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ProjectSort = "recent" | "stars" | "az";

type ProjectFiltersProps = {
  techList: string[];
  selectedTech: string[];
  onToggleTech: (tech: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  sort: ProjectSort;
  onSortChange: (sort: ProjectSort) => void;
  onReset: () => void;
};

export function ProjectFilters({
  techList,
  selectedTech,
  onToggleTech,
  search,
  onSearchChange,
  sort,
  onSortChange,
  onReset,
}: ProjectFiltersProps) {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg backdrop-blur-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.45em] text-muted-foreground">
            <Filter className="h-4 w-4" /> Filtrer
          </div>
          <Button variant="ghost" size="sm" className="gap-2" onClick={onReset}>
            <RefreshCw className="h-4 w-4" /> Réinitialiser
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
          <div className="flex flex-col gap-2">
            <Label htmlFor="project-search">Recherche</Label>
            <Input
              id="project-search"
              placeholder="Rechercher un projet par nom, techno, description..."
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="project-sort">Tri</Label>
            <select
              id="project-sort"
              value={sort}
              onChange={(event) => onSortChange(event.target.value as ProjectSort)}
              className="h-11 w-full rounded-full border border-border/60 bg-background/80 px-4 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="recent">Plus récents</option>
              <option value="stars">Populaire (stars)</option>
              <option value="az">A → Z</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {techList.map((tech) => {
            const active = selectedTech.includes(tech);
            return (
              <Button
                key={tech}
                variant={active ? "secondary" : "outline"}
                size="sm"
                className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em]"
                onClick={() => onToggleTech(tech)}
              >
                {tech}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
