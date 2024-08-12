import React, { useState } from "react";

export const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("shirts");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Category:", category);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="dress">Dress</option>
        </select>
      </div>

      <button type="submit">Save</button>
    </form>
  );
};
