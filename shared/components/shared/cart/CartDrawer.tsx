"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { Button, Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "shared/components/ui";
import { PizzaSize, PizzaType } from "shared/constants/pizza";
import { useCart } from "shared/hooks";
import { getCartItemDetails, getProductInCorrectCase } from "shared/lib";
import { cn } from "shared/lib/utils";
import { CartDrawerItem, Title } from "..";

export const CartDrawer = ({ children }: PropsWithChildren) => {
  const { items, totalAmount, onClickCountButtonHandler, onClickRemoveCartItemHandler, loading } = useCart();
  const [redirecting, setRedirecting] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-linear-to-br from-page-bg to-white">
        <div className={cn("flex flex-col h-full", !totalAmount && "justify-center")}>
          {totalAmount > 0 && (
            <SheetHeader className="pb-4 md:pb-6 lg:pb-6 border-b border-gray-200 bg-linear-to-r from-gray-50/50 to-transparent">
              <SheetTitle className="text-lg md:text-xl lg:text-2xl">
                В корзине <span className="font-bold text-primary">{items.length} {getProductInCorrectCase(items.length)}</span>
              </SheetTitle>
            </SheetHeader>
          )}
          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto px-4">
              <div className="relative mb-4 md:mb-6 lg:mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
                <Image src="/assets/images/empty-box.png" alt="Empty cart" width={160} height={160} className="relative w-32 h-32 md:w-40 md:h-40 lg:w-40 lg:h-40" />
              </div>
              <Title size="sm" text="Корзина пустая" className="text-center font-bold my-3 md:my-4 lg:my-4" />
              <p className="text-center text-gray-500 mb-6 md:mb-8 lg:mb-8 text-sm md:text-base lg:text-base leading-relaxed px-4">Добавьте хотя бы один товар, чтобы совершить заказ</p>

              <Button asChild className="w-full max-w-xs md:w-72 lg:w-72 h-12 md:h-14 lg:h-14 text-sm md:text-base lg:text-base font-bold rounded-xl md:rounded-2xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all" size="lg">
                <SheetClose >
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 mr-2" />
                  Вернуться назад
                </SheetClose>
              </Button>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-6 overflow-auto flex-1">
                {items.map((item) => (
                  <div key={item.id} className="mb-3">
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      price={item.price}
                      disabled={item.disabled}
                      quantity={item.quantity}
                      details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                      onClickCountButton={(type) => onClickCountButtonHandler(item.id, type, item.quantity)}
                      onClickRemoveCartItem={() => onClickRemoveCartItemHandler(item.id)}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-linear-to-br from-white to-gray-50/50 p-6 md:p-8 lg:p-10 border-t border-gray-200 shadow-lg">
                <div className="w-full">
                  <div className="flex mb-4 md:mb-6 lg:mb-6 pb-3 md:pb-4 lg:pb-4 border-b border-gray-200">
                    <span className="flex flex-1 text-lg md:text-xl lg:text-xl text-gray-600 font-semibold">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-gray-300 relative -top-1 mx-2 md:mx-3 lg:mx-3" />
                    </span>

                    <span className="font-bold text-xl md:text-2xl lg:text-2xl text-primary">{totalAmount} руб.</span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={loading || redirecting}
                      type="submit"
                      className="w-full h-14 md:h-16 lg:h-16 text-sm md:text-base lg:text-base font-bold rounded-xl md:rounded-2xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
