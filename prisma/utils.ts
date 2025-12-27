export const randomDecimalNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

export const generateProductVariant = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: number;
  size?: number;
}) => {
  return {
    productId,
    price: Math.floor(randomDecimalNumber(190, 600)),
    pizzaType,
    size,
  };
};

