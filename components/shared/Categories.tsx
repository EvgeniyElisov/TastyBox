"use client";

import { Category } from "@prisma/client";
import { cn } from "lib/utils";
import Link from "next/link";
import { useCategoryStore } from "store/category";

type Props = {
  className?: string;
  items: Category[];
};


export const Categories = ({ className, items }: Props) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
      {items.map(({ id, name }) => (
        <Link
          className={cn("flex items-center font-bold h-11 rounded-2xl px-5", 
            activeCategoryId === id && "bg-white shadow-md shadow-gray-200 text-primary")}
          key={id}
          href={`#${name}`}
        >
          <button>{name}</button>
        </Link>
      ))}
    </div>
  );
};
