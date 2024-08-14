"use client";

import { ProductForm } from "./productForm";

export function Modal({ onAddProduct }) {
  const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
  return (
    <div className="flex justify-center items-center">
      <button
        className=" leading-4 btn btn-outline border-black py-4 px-8 bg-white text-black text-xl  rounded-md mt-14 hover:bg-gray-200"
        onClick={() => modal.showModal()}
      >
        Add a new product
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <ProductForm onAddProduct={onAddProduct} />

          <button
            className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => modal.close()}
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
}
