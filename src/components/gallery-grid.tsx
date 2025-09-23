import { type Design } from "@/data/designs";
import { cn } from "@/lib/utils";
import { DesignCard } from "@/components/design-card";
import { Skeleton } from "@/components/ui/skeleton";

type GalleryGridProps = {
  items: Design[];
  isLoading?: boolean;
  page: number;
  pageSize: number;
};

export function GalleryGrid({ items, isLoading, page, pageSize }: GalleryGridProps) {
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  return (
    <div className="space-y-10">
      <div
        className={cn(
          "[column-gap:1.5rem] sm:[column-gap:2rem]",
          "[&>*]:mb-6",
          "columns-1 sm:columns-2 xl:columns-3 2xl:columns-4",
        )}
      >
        {isLoading
          ? Array.from({ length: pageSize }).map((_, index) => (
              <Skeleton key={index} className="mb-6 h-[24rem] rounded-[2rem]" />
            ))
          : paged.map((design) => <DesignCard key={design.id} design={design} />)}
      </div>
      {!isLoading && paged.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/60 p-10 text-center text-muted-foreground">
          Aucun design ne correspond à votre recherche. Essayez d’autres mots-clés.
        </div>
      ) : null}
    </div>
  );
}
