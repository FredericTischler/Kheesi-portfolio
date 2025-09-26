import { Skeleton } from "@/components/ui/skeleton";

type DesignSkeletonProps = {
  count?: number;
  className?: string;
};

export function DesignSkeleton({ count = 4, className }: DesignSkeletonProps) {
  return (
    <div className={className ?? "grid gap-6 md:grid-cols-2 xl:grid-cols-4"}>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex h-full flex-col rounded-[2rem] border border-border/60 bg-background/70 p-6 shadow-sm"
        >
          <Skeleton className="mb-6 h-48 w-full rounded-[1.75rem]" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="mt-3 h-4 w-2/5" />
          <div className="mt-6 flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
          <Skeleton className="mt-auto h-10 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export default DesignSkeleton;
