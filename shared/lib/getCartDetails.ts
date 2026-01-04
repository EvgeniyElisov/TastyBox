import { PizzaSize, PizzaType } from "shared/constants/pizza";
import { CartStateItem } from "shared/store/cart";
import { calcCartItemTotalAmount } from ".";
import { CartDTO } from "shared/services/dto/cart";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
};

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
      name: item.productVariant.product.name,
      imageUrl: item.productVariant.product.imageUrl,
      price: calcCartItemTotalAmount(item),
      pizzaSize: item.productVariant.size,
      pizzaType: item.productVariant.pizzaType,
      ingredients: item.ingredients.map((ingredient) => ({
        name: ingredient.name,
        price: ingredient.price,
      })),
    };
  });

  return {
    totalAmount: data.totalAmount,
    items,
  };
};
