"use client";
import React, { useState } from "react";
import { decreaseUsedAmount, increaseUsedAmount } from "../server/db/queries";
import { ProductCardProps } from "../types";

export function ProductCard({
  title,
  category,
  url,
  countedDays,
  productId,
  onDeleteAction,
  usedAmount,
}: ProductCardProps) {
  const [count, setCount] = useState(usedAmount);

  const handleDelete = async () => {
    await onDeleteAction(productId);
  };
  const handleIncreaseUsedAmount = async () => {
    await increaseUsedAmount(productId);
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecreaseUsedAmount = async () => {
    await decreaseUsedAmount(productId);
    setCount((prevCount) => Math.max(0, prevCount - 1));
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
        <h2 className="card-title text-xl font-bold">{title}</h2>

        <div className="card-actions mt-auto">
          <div className="flex items-center space-x-2">
            <button onClick={handleDecreaseUsedAmount} className="btn btn-sm">
              -
            </button>

            <button onClick={handleIncreaseUsedAmount} className="btn btn-sm">
              +
            </button>
          </div>
          <p className="text-gray-500">
            Has been used <strong className="text-black"> {count} </strong>
            times
          </p>
          <p className="text-gray-500">
            Since the past{" "}
            <strong className="text-black"> {countedDays} </strong> days
          </p>
          <button
            onClick={handleDelete}
            className="btn btn-outline btn-sm !p-0.5 !py-0.5 bg-red-500 text-white text-center rounded-md hover:bg-gray-200 mt-0.5 text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
