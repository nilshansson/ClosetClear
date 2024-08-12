import { SignedOut, SignedIn } from "@clerk/nextjs";
import { ProductForm } from "./_components/productForm";
import { ProductCard } from "./_components/productCard";
import { getProducts } from "./server/db/queries";
import { AddProductButton } from "./_components/addProductButton";
import { Modal } from "./_components/modal";

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <h1>you are signed in!</h1>

        <Modal />
        {products.map((product) => {
          return (
            <ProductCard title={product.title} category={product.category} />
          );
        })}
      </SignedIn>
    </main>
  );
}
