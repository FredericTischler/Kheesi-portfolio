import { useEffect, useMemo, useState } from "react";

import { GalleryFilters, type SortOption } from "@/components/gallery-filters";
import { GalleryGrid } from "@/components/gallery-grid";
import { Pagination } from "@/components/pagination";
import { DESIGN_DETAILS, DESIGNS } from "@/data/designs";

const PAGE_SIZE = 8;

export function GalleryPage() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const availableTags = useMemo(
    () =>
      Array.from(new Set(DESIGNS.flatMap((design) => design.tags))).sort((a, b) =>
        a.localeCompare(b, "fr"),
      ),
    [],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return DESIGNS.filter((design) => {
      const matchesTerm = term
        ? design.title.toLowerCase().includes(term) ||
          design.tags.some((tag) => tag.toLowerCase().includes(term))
        : true;
      const matchesTags = selectedTags.length
        ? selectedTags.every((tag) => design.tags.includes(tag))
        : true;
      return matchesTerm && matchesTags;
    }).sort((a, b) => {
      if (sort === "newest") {
        const dateA = a.createdAt ? Date.parse(a.createdAt) : 0;
        const dateB = b.createdAt ? Date.parse(b.createdAt) : 0;
        return dateB - dateA;
      }
      const popularityA = DESIGN_DETAILS[a.id]?.popularity ?? 0;
      const popularityB = DESIGN_DETAILS[b.id]?.popularity ?? 0;
      return popularityB - popularityA;
    });
  }, [search, selectedTags, sort]);

  useEffect(() => {
    setPage(1);
    setLoading(true);
    const id = window.setTimeout(() => setLoading(false), 220);
    return () => window.clearTimeout(id);
  }, [search, selectedTags, sort]);

  const handleToggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  };

  const handleReset = () => {
    setSearch("");
    setSelectedTags([]);
    setSort("newest");
  };

  return (
    <div className="container space-y-16">
      <header className="space-y-6">
        <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">
          Galerie complète
        </p>
        <h1 className="text-balance text-4xl font-semibold md:text-5xl">
          Filtrez, explorez, ouvrez directement vos fiches RedBubble.
        </h1>
        <p className="max-w-2xl text-balance text-muted-foreground">
          Combinez les tags, la recherche et le tri pour trouver le visuel parfait. Chaque carte vous
          permet d’ouvrir un aperçu rapide ou de partir directement sur RedBubble.
        </p>
      </header>

      <GalleryFilters
        search={search}
        onSearchChange={setSearch}
        availableTags={availableTags}
        selectedTags={selectedTags}
        onToggleTag={handleToggleTag}
        sort={sort}
        onSortChange={setSort}
        onReset={handleReset}
      />

      <GalleryGrid items={filtered} isLoading={loading} page={page} pageSize={PAGE_SIZE} />

      <Pagination
        page={page}
        onPageChange={(nextPage) => {
          setPage(nextPage);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
