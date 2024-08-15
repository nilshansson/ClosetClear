import { CategorySelectProps, ProductType } from "../types";
import CategorySelect from "./categorySelect";
import { Modal } from "./modal";

export function MainPageHero({
  onCategoryChange,
  onAddProductAction,
}: CategorySelectProps & {
  onAddProductAction: (product: ProductType) => void;
}) {
  return (
    <div
      className="hero min-h-14 w-full mb-2"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div>
        <Modal onAddProductAction={onAddProductAction} />
        <CategorySelect onCategoryChange={onCategoryChange} />
      </div>
    </div>
  );
}
