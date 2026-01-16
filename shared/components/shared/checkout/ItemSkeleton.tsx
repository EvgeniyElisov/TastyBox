import { cn } from "shared/lib/utils";

type Props = {
  className?: string;
};

export const ItemSkeleton = ({ className }: Props) => {
  return (
    <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 py-4", className)}>
      <div className="flex items-center gap-4 sm:gap-6 flex-1 w-full sm:w-auto">
        <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h2 className="w-full sm:w-48 h-5 sm:h-6 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="w-3/4 sm:w-32 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
        <div className="h-5 sm:h-6 w-16 sm:w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 sm:h-10 w-24 sm:w-[150px] bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};
