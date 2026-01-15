"use server";

import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { prisma } from "prisma/prisma";
import { PayOrderTemplate } from "shared/components/shared";
import { OrderFormInputs } from "shared/components/shared/checkout/form/schemas/orderFormSchema";
import { sendEmail } from "shared/lib";

export async function createOrder(data: OrderFormInputs) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("cartToken")?.value;

    if (!token) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        token,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    
    //TODO: сделать запрос на payment сервис

    await sendEmail(
      data.email,
      "Ваш заказ №" + order.id + " успешно оформлен!",
      PayOrderTemplate({
        oderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: "localhost:3000/checkout/payment",
      })
    );
  } catch (error) {
    console.error("[CREATE_ORDER] Server error: ", error);
    throw new Error("Не удалось оформить заказ");
  }

  return "/checkout/payment";
}
