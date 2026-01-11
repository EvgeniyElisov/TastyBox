"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "app/serverActions";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CheckoutAddress, CheckoutCart, CheckoutPersonalInfo, CheckoutSidebar, Container, Title } from "shared/components/shared";
import { OrderFormInputs, orderFormSchema } from "shared/components/shared/checkout/schemas/orderFormSchema";
import { useCart } from "shared/hooks";

export default function CheckoutPage() {
  const { items, totalAmount, onClickCountButtonHandler, onClickRemoveCartItemHandler, loading, initialLoading } = useCart();

  const [submitting, setSubmitting] = useState(false);

  const form = useForm<OrderFormInputs>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: OrderFormInputs) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success("Заказ успешно оформлен! 📝 Переход на страницу оплаты...", {
        icon: "✅",
      });
      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.error(error);
      return toast.error("Не удалось оформить заказ", {
        icon: "❌",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButtonHandler={onClickCountButtonHandler}
                onClickRemoveCartItemHandler={onClickRemoveCartItemHandler}
                initialLoading={initialLoading}
              />
              <CheckoutPersonalInfo totalAmount={totalAmount} className={loading ? "opacity-40 pointer-events-none" : ""} />
              <CheckoutAddress totalAmount={totalAmount} className={loading ? "opacity-40 pointer-events-none" : ""} />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
