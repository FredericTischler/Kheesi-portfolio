import { motion } from "framer-motion";
import { Filter, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SortOption = "newest" | "popular";

type GalleryFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  onReset: () => void;
};

export function GalleryFilters({
  search,
  onSearchChange,
  availableTags,
  selectedTags,
  onToggleTag,
  sort,
  onSortChange,
  onReset,
}: GalleryFiltersProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg backdrop-blur-2xl"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            <Filter className="h-4 w-4" /> Filtres
          </div>
          <Button variant="ghost" size="sm" onClick={onReset} className="w-full gap-2 lg:w-auto">
            <RefreshCw className="h-4 w-4" /> Réinitialiser
          </Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Recherche</Label>
            <Input
              id="search"
              placeholder="Titre, tag, ambiance..."
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sort">Trier</Label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => onSortChange(event.target.value as SortOption)}
              className="h-11 w-full rounded-full border border-border/60 bg-background/80 px-4 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="newest">Nouveautés</option>
              <option value="popular">Popularité</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <Button
                key={tag}
                variant={isActive ? "secondary" : "outline"}
                size="sm"
                className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]"
                onClick={() => onToggleTag(tag)}
              >
                #{tag}
              </Button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export type { SortOption };
