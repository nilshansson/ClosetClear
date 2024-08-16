"use server";

import { db } from ".";
import { productTable } from "./schema";
import { ProductFormType, ProductType } from "@/app/types";
import { eq } from "drizzle-orm";

export async function getProducts(userId: string) {
  const products = await db
    .select()
    .from(productTable)
    .where(eq(productTable.userId, userId))
    .execute();

  return products;
}

export async function addProductToDB(product: ProductFormType, userId: string) {
  try {
    const [newProduct] = await db
      .insert(productTable)
      .values({
        title: product.title,
        category: product.category,
        url: product.url || "",
        userId: userId,
        countedDays: 0,
        usedAmount: 0,
        createdAt: new Date(),
      })
      .returning();
    return newProduct;
  } catch (error) {
    console.error("Error in addProductToDB:", error);
    throw error;
  }
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

export async function updatedCountedDaysOnAllProductsInDB() {
  const nowTimestamp = new Date();

  const products = await db.select().from(productTable);

  for (const product of products) {
    const daysDifference = calculateDaysInBetween(
      new Date(product.createdAt),
      nowTimestamp
    );

    await db
      .update(productTable)
      .set({ countedDays: daysDifference })
      .where(eq(productTable.id, product.id));
  }
}

// USE THIS FUNCTION FOR PRODUCTION

function calculateDaysInBetween(createdAt: Date, nowTimestamp: Date): number {
  const Difference_In_Time = nowTimestamp.getTime() - createdAt.getTime();
  const differenceInDays = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
  return differenceInDays;
}

// THIS FUNCTION IS A MOCK FUNCTION FOR PRESENTATION
// function calculateDaysInBetween(createdAt: Date, nowTimestamp: Date): number {
//   const thirtyseconds = 30 * 1000;

//   const Difference_In_Time = nowTimestamp.getTime() - createdAt.getTime();

//   const differenceInMockDays = Math.floor(Difference_In_Time / thirtyseconds);

//   return differenceInMockDays;
// }

export async function increaseUsedAmount(productId: number) {
  const products = await db
    .select({ usedAmount: productTable.usedAmount })
    .from(productTable)
    .where(eq(productTable.id, productId));

  if (products.length > 0) {
    const product = products[0];
    await db
      .update(productTable)
      .set({ usedAmount: product.usedAmount + 1 })
      .where(eq(productTable.id, productId));
  }
}

export async function decreaseUsedAmount(productId: number) {
  const products = await db
    .select({ usedAmount: productTable.usedAmount })
    .from(productTable)
    .where(eq(productTable.id, productId));

  if (products.length > 0 && products[0].usedAmount > 0) {
    const product = products[0];
    await db
      .update(productTable)
      .set({ usedAmount: product.usedAmount - 1 })
      .where(eq(productTable.id, productId));
  }
}

export async function getProductsByCategory(category: string) {
  const products = await db
    .select()
    .from(productTable)
    .where(eq(productTable.category, category))
    .execute();

  return products;
}
