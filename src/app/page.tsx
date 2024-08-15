"use client";
import { useState, useEffect } from "react";
import { SignedOut, SignedIn, useUser } from "@clerk/nextjs";
import { ProductCard } from "./_components/productCard";
import {
  deleteProductInDB,
  getProducts,
  getProductsByCategory,
  updatedCountedDaysOnAllProductsInDB,
} from "./server/db/queries";
import { PreloggedInHero } from "./_components/preLoggedInHero";
import { ProductType } from "./types";
import { MainPageHero } from "./_components/mainpageHero";
import { NoItemsHero } from "./_components/noItemHero";

export default function HomePage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [noItemsDisplay, setNoItemsDisplay] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    async function fetchProducts() {
      let fetchedProducts: ProductType[];
      if (!userId) return;

      if (selectedCategory === "All") {
        fetchedProducts = await getProducts(userId);
      } else {
        fetchedProducts = await getProductsByCategory(selectedCategory);
      }
      setProducts(fetchedProducts);
      setNoItemsDisplay(fetchedProducts.length === 0);
      await updatedCountedDaysOnAllProductsInDB();
    }

    fetchProducts();
  }, [selectedCategory, userId]);

  const handleAddProductAction = (newProduct: ProductType) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    setNoItemsDisplay(false);
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
    <main className="flex flex-col justify-center w-full">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          <PreloggedInHero />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex justify-center items-center mb-4 w-full">
          <MainPageHero
            onCategoryChange={handleCategoryChange}
            onAddProductAction={handleAddProductAction}
          />
        </div>

        {noItemsDisplay ? (
          <NoItemsHero />
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center items-center w-full">
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
        )}
      </SignedIn>
    </main>
  );
}
