import { PizzaSize, PizzaType } from "shared/constants/pizza";
import { CartStateItem } from "shared/store/cart";
import { calcCartItemTotalAmount } from ".";
import { CartDTO } from "shared/services/dto/cart";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
};

export const getCartDetails = (data: CartDTO | null): ReturnProps => {
  if (!data || !data.items) {
    return {
      totalAmount: 0,
      items: [],
    };
  }

  const items = data.items.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
      name: item.productVariant.product.name,
      imageUrl: item.productVariant.product.imageUrl,
      price: calcCartItemTotalAmount(item),
      disabled: false,
      pizzaSize: item.productVariant.size as PizzaSize,
      pizzaType: item.productVariant.pizzaType as PizzaType,
      ingredients: item.ingredients.map((ingredient) => ({
        name: ingredient.name,
        price: ingredient.price,
      })),
    };
  });

  return {
    totalAmount: data.totalAmount ?? 0,
    items,
  };
};
