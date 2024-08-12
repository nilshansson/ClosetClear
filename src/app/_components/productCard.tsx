"use client";
import React, { useState } from "react";

export function ProductCard({ title, category }) {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrease = () => {
    setCount((prevCount) => Math.max(0, prevCount - 1));
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes</h2>

        <p>{title}</p>
        <p>{category}</p>
        <div className="card-actions justify-end">
          <div>
            <button onClick={handleDecrease}>-</button>
            <button onClick={handleIncrease}>+</button>
            <p>Has been used {count} times</p>
          </div>
          <button className="btn btn-primary">delete</button>
        </div>
      </div>
    </div>
  );
}
