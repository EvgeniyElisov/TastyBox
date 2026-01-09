"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckoutAddress, CheckoutCart, CheckoutPersonalInfo, CheckoutSidebar, Container, Title } from "shared/components/shared";
import { useCart } from "shared/hooks";

export default function CheckoutPage() {
  const { items, totalAmount, onClickCountButtonHandler, onClickRemoveCartItemHandler } = useCart();
  const submitting = false;
  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutCart 
            items={items} 
            onClickCountButtonHandler={onClickCountButtonHandler} 
            onClickRemoveCartItemHandler={onClickRemoveCartItemHandler} 
          />
         <CheckoutPersonalInfo totalAmount={totalAmount} />
         <CheckoutAddress totalAmount={totalAmount} />
        </div>
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} submitting={submitting} />
        </div>
      </div>
    </Container>
  );
}
