import { SignedOut, SignedIn } from "@clerk/nextjs";
import { ProductCard } from "./_components/productCard";
import { getProducts } from "./server/db/queries";
import { Modal } from "./_components/modal";
import { Hero } from "./_components/hero";

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main className="">
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
          {products.map((product) => {
            return (
              <ProductCard
                title={product.title}
                category={product.category}
                url={product.url}
                counteddays={product.countedDays}
              />
            );
          })}
        </div>
      </SignedIn>
    </main>
  );
}
