import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type PaginationProps = {
  page: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalItems, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const goTo = (next: number) => {
    const target = Math.min(Math.max(next, 1), totalPages);
    onPageChange(target);
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Page {page} / {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goTo(page - 1)}
          disabled={page === 1}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages}
          className="gap-2"
        >
          Suivant <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
