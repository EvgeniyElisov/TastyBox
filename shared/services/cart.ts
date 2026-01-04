import { CartDTO } from "./dto/cart";
import { axiosInstance } from "./instance";
import { Cart } from "@prisma/client";

type AddCartItemResponseDTO = { success: boolean; cart: Cart };

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>("/cart");

  return data;
};

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>("/cart/" + id, { quantity });

  return data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>('/cart/' + id);

  return data;
};

// export const addCartItem = async (values: CreateCartItemValues): Promise<CartResponse> => {
//   const { data } = await axiosInstance.post<CartResponse>('/cart', values);

//   return data;
// };


