import { Filter, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type RBFilterSort = "recent" | "featured" | "az";

type RBFilterProps = {
  search: string;
  onSearchChange: (value: string) => void;
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  sort: RBFilterSort;
  onSortChange: (sort: RBFilterSort) => void;
  onReset: () => void;
};

export function RBFilter({
  search,
  onSearchChange,
  tags,
  selectedTags,
  onToggleTag,
  sort,
  onSortChange,
  onReset,
}: RBFilterProps) {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg backdrop-blur-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.45em] text-muted-foreground">
            <Filter className="h-4 w-4" /> Filtres
          </div>
          <Button variant="ghost" size="sm" className="gap-2" onClick={onReset}>
            <RefreshCw className="h-4 w-4" /> Réinitialiser
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
          <div className="flex flex-col gap-2">
            <Label htmlFor="rb-search">Recherche</Label>
            <Input
              id="rb-search"
              placeholder="Rechercher un style, un mot-clé..."
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="rb-sort">Tri</Label>
            <select
              id="rb-sort"
              value={sort}
              onChange={(event) => onSortChange(event.target.value as RBFilterSort)}
              className="h-11 w-full rounded-full border border-border/60 bg-background/80 px-4 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="recent">Plus récents</option>
              <option value="featured">À la une</option>
              <option value="az">A → Z</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <Button
                key={tag}
                variant={active ? "secondary" : "outline"}
                size="sm"
                className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em]"
                onClick={() => onToggleTag(tag)}
              >
                #{tag}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
