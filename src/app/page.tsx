"use client";

import { useState, useEffect } from "react";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { ProductCard } from "./_components/productCard";
import { deleteProductInDB, getProducts } from "./server/db/queries";
import { Modal } from "./_components/modal";
import { Hero } from "./_components/hero";
import { ProductType } from "./types";

export default function HomePage() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts: ProductType[] = await getProducts();
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProductInDB(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <main className="flex flex-col justify-center">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          <Hero />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex justify-center items-center mb-4">
          <Modal />
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              title={product.title}
              category={product.category}
              url={product.url}
              countedDays={product.countedDays}
              usedAmount={product.usedAmount}
              onDeleteAction={handleDeleteProduct}
            />
          ))}
        </div>
      </SignedIn>
    </main>
  );
}
