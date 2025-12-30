"use client";

import { cn } from "lib/utils";
import { RefObject, useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { ProductCard, Title } from ".";
import { useCategoryStore } from "store/category";

type Props = {
  title: string;
  products: any[];
  className?: string;
  listClassName?: string;
  categoryId: number;
};
export const ProductsGroupList = ({ title, products, className, listClassName, categoryId }: Props) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(intersectionRef as RefObject<HTMLElement>, {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={cn(className, "scroll-mt-[120px]")} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id} 
            name={product.name} 
            imageUrl={product.imageUrl} 
            price={product.variants[0].price} 
            variants={product.variants}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
