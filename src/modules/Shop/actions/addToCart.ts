"use server";

import { revalidatePath } from "next/cache";
import CartService from "../services/cartService";

type AddToCartType = {
  userId: string;
  productIds: number[];
};

export const addToCart = async ({ userId, productIds }: AddToCartType) => {
  try {
    await CartService.addToCart({
      userId,
      productIds,
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath("/shop");
};
