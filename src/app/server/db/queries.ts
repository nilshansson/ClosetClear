"use server";

import { db } from ".";
import { productTable } from "./schema";
import { ProductType } from "@/app/types";
import { eq } from "drizzle-orm";

export async function getProducts() {
  const products = await db.select().from(productTable).execute();
  return products;
}

export async function addProductToDB(product: ProductType) {
  try {
    const newItem = await db
      .insert(productTable)
      .values({
        title: product.title,
        category: product.category,
        url: product.url || "",

        countedDays: 0,
        usedAmount: 0,
        createdAt: new Date(),
      })
      .returning();
    return newItem;
  } catch (error) {
    console.error("Error in addProductToDB:", error);
    throw error;
  }
}
export async function updateUsedAmount() {
  const usedAmount = await db.update(productTable);
}

export async function getCountedDays(productId: number) {
  const result = await db
    .select({
      countedDays: productTable.countedDays,
    })
    .from(productTable)
    .where(eq(productTable.id, productId))
    .execute();

  if (result.length > 0) {
    return result[0].countedDays;
  } else {
    throw new Error(`Product with id ${productId} not found`);
  }
}

export async function deleteProductInDB(productId: number) {
  await db.delete(productTable).where(eq(productTable.id, productId));
}
