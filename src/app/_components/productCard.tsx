"use client";
import React, { useState } from "react";
type ProductCardProps = {
  title: string;
  category: string;
  url: string;
  productId: number;
  usedAmount: number;
  countedDays: number;
  onDeleteAction: (productId: number) => void | Promise<void>;
};

export function ProductCard({
  title,
  category,
  url,
  countedDays,
  productId,
  onDeleteAction,
  usedAmount,
}: ProductCardProps) {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrease = () => {
    setCount((prevCount) => Math.max(0, prevCount - 1));
  };

  const handleDelete = async () => {
    await onDeleteAction(productId);
  };

  return (
    <div className="card bg-gray-50 shadow-xl flex flex-col w-96 h-auto">
      <figure className="flex-grow">
        <img
          src={url}
          alt="Picture of the product"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body flex-grow flex flex-col justify-between p-4">
        <h2 className="card-title text-lg font-bold">{title}</h2>
        <p className="text-gray-600">Category: {category}</p>
        <div className="card-actions mt-auto">
          <div className="flex items-center space-x-2">
            <button onClick={handleDecrease} className="btn btn-sm">
              -
            </button>

            <button onClick={handleIncrease} className="btn btn-sm">
              +
            </button>
          </div>
          <p className="text-gray-500">
            Has been used <strong className="text-black"> {count} </strong>times
          </p>
          <p className="text-gray-500">
            Since the past{" "}
            <strong className="text-black"> {countedDays} </strong> days
          </p>
          <button
            onClick={handleDelete}
            className="btn btn-outline btn-sm border-black !p-0.5 !py-0.5 bg-red-500 text-white text-center rounded-sm hover:bg-gray-200 mt-0.5 text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
