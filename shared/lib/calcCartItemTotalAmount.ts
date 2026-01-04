import { CartItemDTO } from "shared/services/dto/cart";

export const calcCartItemTotalAmount = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  return (item.productVariant.price + ingredientsPrice) * item.quantity;
};
