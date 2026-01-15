"use server";

import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
import { prisma } from "prisma/prisma";
import { PayOrderTemplate } from "shared/components/shared";
import { OrderFormInputs } from "shared/components/shared/checkout/form/schemas/orderFormSchema";
import { getUserSession, sendEmail } from "shared/lib";

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

type UpdateUserInfoBody = {
  email: string;
  fullName: string;
  password?: string;
};

export async function updateUserInfo(body: UpdateUserInfoBody) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Пользователь не авторизован");
    }

    const updateData: Prisma.UserUpdateInput = {
      fullName: body.fullName,
      email: body.email,
    };

    if (body.password && body.password.length > 0) {
      updateData.password = hashSync(body.password, 10);
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: updateData,
    });

    return true;
  } catch (error) {
    console.error("[UPDATE_USER_INFO] Server error: ", error);
    throw new Error("Не удалось обновить данные пользователя");
  }
}
