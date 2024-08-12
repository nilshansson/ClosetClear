"use client";

import React, { useState } from "react";
import { ProductForm } from "./productForm";

export const AddProductButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        {showForm ? "Hide Product Form" : "Add New Product"}
      </button>

      {showForm && (
        <div className="product-form">
          <ProductForm />
        </div>
      )}
    </div>
  );
};
