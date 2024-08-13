import { db } from ".";
import { productTable } from "./schema";

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
  const newItem = await db
    .insert(productTable)
    .values({
      title: product.title,
      category: product.category,
      url: product.url,
      userId: product.userId,
      createdAt: product.createdAt,
    })
    .returning();

  return newItem;
}
