"use client";
import React, { useState } from "react";

export function ProductCard({ title, category, url, counteddays }) {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrease = () => {
    setCount((prevCount) => Math.max(0, prevCount - 1));
  };
  return (
    <div className="card bg-gray-50 w-96 shadow-xl flex">
      <figure>
        <img src={url} width={500} height={500} alt="Picture of the product" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>

        <p>category: {category}</p>
        <div className="card-actions justify-end">
          <div>
            <button onClick={handleDecrease}>-</button>
            <button onClick={handleIncrease}>+</button>
            <p>Has been used {count} times</p>
            <p>since the past {counteddays} days</p>
          </div>
          <button className="btn btn-primary">delete</button>
        </div>
      </div>
    </div>
  );
}
