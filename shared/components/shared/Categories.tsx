"use client";

import { Category } from "@prisma/client";
import { cn } from "shared/lib/utils";
import Link from "next/link";
import { useCategoryStore } from "shared/store/category";

type Props = {
  className?: string;
  items: Category[];
};


export const Categories = ({ className, items }: Props) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn("flex gap-2 bg-linear-to-r from-gray-50 to-gray-100/50 p-1.5 md:p-2 lg:p-2 rounded-2xl md:rounded-3xl lg:rounded-3xl shadow-inner overflow-x-auto scrollbar-hide", className)}>
      {items.map(({ id, name }) => (
        <Link
          className={cn(
            "flex items-center font-bold h-9 md:h-12 lg:h-12 rounded-2xl md:rounded-3xl lg:rounded-3xl px-4 md:px-7 lg:px-7 text-sm md:text-base lg:text-base transition-all duration-200 relative overflow-hidden shrink-0 whitespace-nowrap",
            activeCategoryId === id 
              ? "bg-white shadow-lg shadow-primary/20 text-primary scale-105" 
              : "text-gray-600 hover:text-primary hover:bg-white/50"
          )}
          key={id}
          href={`#${name}`}
        >
          {activeCategoryId === id && (
            <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-primary/10" />
          )}
          <span className="relative z-10">{name}</span>
        </Link>
      ))}
    </div>
  );
};
