"use client";

import { cn } from "shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "types/product";
import { ChoosePizzaForm, ChooseProductForm } from "..";
import { Dialog, DialogContent } from "shared/components/ui";

type Props = {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();
  const isPizzaForm = product.variants.some((variant) => variant.pizzaType);

  const closeModalHandler = () => {
    router.back();
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={closeModalHandler}>
      <DialogContent className={cn("p-0 min-h-[500px] bg-white overflow-hidden w-[1060px]! max-w-[1060px]! sm:max-w-[1060px]!", className)}>
        {isPizzaForm 
        ? <ChoosePizzaForm 
            imageUrl={product.imageUrl} 
            name={product.name} 
            ingredients={product.ingredients} 
            variants={product.variants} 
            onClickAdd={() => {}}
          />
        : <ChooseProductForm 
            imageUrl={product.imageUrl} 
            name={product.name} 
          />}
      </DialogContent>
    </Dialog>
  );
};
