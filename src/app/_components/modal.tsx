"use client";

import { ProductForm } from "./productForm";

export function Modal() {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Add a new product
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <ProductForm />

          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Hello!</h3>
        </div>
      </dialog>
    </>
  );
}
