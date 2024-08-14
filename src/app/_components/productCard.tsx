"use client";
import React, { useState } from "react";
import { decreaseUsedAmount, increaseUsedAmount } from "../server/db/queries";
import { ProductCardProps } from "../types";

export function ProductCard({
  title,
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

        <div className="card-actions mt-auto flex flex-col">
          <div>
            <div className="flex flex-row">
              <p className="text-gray-500 m-1">
                Has been used <strong className="text-black"> {count} </strong>
                times
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecreaseUsedAmount}
                  className="btn btn-xs"
                >
                  -
                </button>

                <button
                  onClick={handleIncreaseUsedAmount}
                  className="btn btn-xs"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-gray-500">
              Since the past{" "}
              <strong className="text-black"> {countedDays} </strong> days
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="btn btn-outline btn-sm  !py-0.5 bg-red-500 text-white text-center rounded-lg self-end hover:bg-gray-200 mt-0.5 text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
