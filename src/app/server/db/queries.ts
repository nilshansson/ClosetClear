"use server";

import { db } from ".";
import { productTable } from "./schema";

import { eq } from "drizzle-orm";

type Producttype = {
  title: string;
  category: string;
  url: string;
  userId: number;
  createdAt: Date;
};

export async function getProducts() {
  const products = await db.select().from(productTable).execute();
  return products;
}

export async function addProductToDB(product) {
  try {
    const newItem = await db
      .insert(productTable)
      .values({
        title: product.title,
        category: product.category,
        url: product.url || "", // Handle the optional fields properly
        userId: product.userId || 1, // Use a default value or ensure it's passed
        createdAt: new Date(), // Ensure a timestamp is set
      })
      .returning(); // Return the inserted row for confirmation
    return newItem;
  } catch (error) {
    console.error("Error in addProductToDB:", error);
    throw error; // Re-throw the error to be caught by the API handler
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

  // Assuming that productId is unique, we should get one result back
  if (result.length > 0) {
    return result[0].countedDays;
  } else {
    throw new Error(`Product with id ${productId} not found`);
  }
}
