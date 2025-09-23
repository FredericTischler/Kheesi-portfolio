import { lazy, Suspense, useMemo, useState } from "react";

import { RBFilter, type RBFilterSort } from "@/components/RBFilter";
import { RBGrid } from "@/components/RBGrid";
import { REDBUBBLE_ITEMS, type RBItem } from "@/data/redbubble";
import { useQueryParams } from "@/lib/queryParams";
import { usePageMetadata } from "@/lib/metadata";

const RBModal = lazy(() => import("@/components/RBModal"));

const DEFAULT_PARAMS = {
  search: "",
  sort: "recent" as RBFilterSort,
  tags: [] as string[],
};

export function RedbubblePage() {
  usePageMetadata({
    title: "RedBubble",
    description: "Galerie RedBubble avec filtres par tags et aperçus rapides.",
  });

  const [params, setParams] = useQueryParams(DEFAULT_PARAMS);
  const [selected, setSelected] = useState<RBItem | null>(null);
  const [open, setOpen] = useState(false);

  const tags = useMemo(() => {
    const set = new Set<string>();
    REDBUBBLE_ITEMS.forEach((item) => item.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const searchTerm = (params.search as string).trim().toLowerCase();
    const selectedTags = (params.tags as string[]) ?? [];
    const sort = params.sort as RBFilterSort;

    const result = REDBUBBLE_ITEMS.filter((item) => {
      const matchSearch = searchTerm
        ? item.title.toLowerCase().includes(searchTerm) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        : true;
      const matchTags = selectedTags.length
        ? selectedTags.every((tag) => item.tags.includes(tag))
        : true;
      return matchSearch && matchTags;
    }).sort((a, b) => {
      if (sort === "featured") {
        return Number(b.featured ?? false) - Number(a.featured ?? false);
      }
      if (sort === "az") {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
    });

    return result;
  }, [params.search, params.sort, params.tags]);

  return (
    <div className="space-y-14 pb-20 pt-36">
      <section className="container space-y-6">
        <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">RedBubble</p>
        <h1 className="text-4xl font-semibold md:text-5xl">Designs illustrés et impression à la demande</h1>
        <p className="max-w-3xl text-muted-foreground">
          Ces visuels sont pensés pour des produits RedBubble : t-shirts, stickers, affiches. Filtrez par tags,
          lancez une recherche ou ouvrez un aperçu pour copier immédiatement le lien RedBubble.
        </p>
      </section>

      <section className="container space-y-10">
        <RBFilter
          search={params.search as string}
          onSearchChange={(value) => setParams({ search: value })}
          tags={tags}
          selectedTags={(params.tags as string[]) ?? []}
          onToggleTag={(tag) => {
            const selectedTags = (params.tags as string[]) ?? [];
            const next = selectedTags.includes(tag)
              ? selectedTags.filter((item) => item !== tag)
              : [...selectedTags, tag];
            setParams({ tags: next });
          }}
          sort={params.sort as RBFilterSort}
          onSortChange={(value) => setParams({ sort: value })}
          onReset={() => setParams({ search: "", sort: "recent", tags: [] }, { replace: true })}
        />

        <RBGrid
          items={filtered}
          onQuickView={(item) => {
            setSelected(item);
            setOpen(true);
          }}
        />
      </section>

      <Suspense fallback={null}>
        <RBModal item={selected} open={open} onOpenChange={setOpen} />
      </Suspense>
    </div>
  );
}

export default RedbubblePage;
