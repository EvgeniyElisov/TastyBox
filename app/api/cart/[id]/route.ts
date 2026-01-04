import { prisma } from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { updateCartTotalAmount } from "shared/lib/updateCartTotalAmount";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (err) {
    console.error(`[CART_PATCH] Server error: ${err}`);
    return NextResponse.json({ message: "Не удалось обновить корзину" }, { status: 500 });
  }
}
