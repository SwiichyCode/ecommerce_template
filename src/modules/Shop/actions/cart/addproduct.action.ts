"use server";

import { revalidatePath } from "next/cache";
import CartService from "@/modules/Shop/services/cart.service";
import { userAction } from "@/lib/safe-actions";
import { addProductActionSchema } from "./addproduct.schema";

export const addProduct = userAction(addProductActionSchema, async (data) => {
  try {
    await CartService.addToCart(data);
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath("/shop");
});
