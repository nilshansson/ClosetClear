"use client";
import { useState, useEffect } from "react";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { ProductCard } from "./_components/productCard";
import {
  deleteProductInDB,
  getProducts,
  getProductsByCategory,
  updatedCountedDaysOnAllProductsInDB,
} from "./server/db/queries";
import { Hero } from "./_components/hero";
import { ProductType } from "./types";
import { MainPageHero } from "./_components/mainpageHero";

export default function HomePage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    async function fetchProducts() {
      let fetchedProducts: ProductType[];

      if (selectedCategory === "All") {
        fetchedProducts = await getProducts();
      } else {
        fetchedProducts = await getProductsByCategory(selectedCategory);
      }

      setProducts(fetchedProducts);
      await updatedCountedDaysOnAllProductsInDB();
    }

    fetchProducts();
  }, [selectedCategory]);

  const handleAddProduct = (newProduct: ProductType) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProductInDB(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
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
          <MainPageHero
            onCategoryChange={handleCategoryChange}
            onAddProduct={handleAddProduct}
          />
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center items-center">
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
