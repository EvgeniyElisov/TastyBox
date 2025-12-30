"use client";

import { Product } from "@prisma/client";
import { Dialog, DialogContent, DialogTitle } from "components/ui";
import { cn } from "lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
  className?: string;
};

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();

  const closeModalHandler = () => {
    router.back();
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={closeModalHandler}>
      <DialogContent className={cn("p-0 min-h-[500px] bg-white overflow-hidden w-[1060px]! max-w-[1060px]! sm:max-w-[1060px]!", className)}>
        <DialogTitle>{product.name}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
