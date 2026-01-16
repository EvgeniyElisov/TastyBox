'use client';

import { cn } from "shared/lib/utils";
import { CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo, CountButton } from "../cart";
import { CartItemProps } from "../cart/cart-item-details/types";
import { X } from "lucide-react";

type Props = CartItemProps & {
  onClickRemoveCartItem: () => void;
  onClickCountButton: (type: "plus" | "minus") => void;
  className?: string;
}

export const Item= ({
  name,
  price,
  imageUrl,
  quantity,
  disabled,
  details,
  className,
  onClickCountButton,
  onClickRemoveCartItem,
}: Props) => {
  return (
    <div className={cn('flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 py-4', { "opacity-50 pointer-events-none": disabled }, className)}>
      <div className="flex items-center gap-4 sm:gap-6 flex-1 w-full sm:w-auto">
        <CartItemDetailsImage src={imageUrl} />
        <CartItemInfo name={name} details={details} />
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
        <CartItemDetailsPrice value={price} />

        <div className="flex items-center gap-4 sm:gap-6 sm:ml-6 lg:ml-24">
          <CountButton onClick={onClickCountButton} value={quantity} />
          <button type="button" onClick={onClickRemoveCartItem}>
            <X className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
