import { AnimatePresence, motion } from "framer-motion";

import type { RBItem } from "@/data/redbubble";

import { RBCard } from "@/components/RBCard";
import { Skeleton } from "@/components/ui/skeleton";

type RBGridProps = {
  items: RBItem[];
  loading?: boolean;
  onQuickView: (item: RBItem) => void;
};

export function RBGrid({ items, loading, onQuickView }: RBGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[22rem] rounded-[2rem]" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border/60 p-10 text-center text-muted-foreground">
        Aucun visuel ne correspond aux filtres actuels.
      </div>
    );
  }

  return (
    <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence>
        {items.map((item) => (
          <RBCard key={item.id} item={item} onQuickView={onQuickView} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
