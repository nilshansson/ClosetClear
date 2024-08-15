import { useState } from "react";

import { CategorySelectProps } from "../types";

export default function CategorySelect({
  onCategoryChange,
}: CategorySelectProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };
  return (
    <>
      <label className="form-control w-full max-w-xs border-black">
        <div className="label">
          <span className="label-text text-white">
            view products by category
          </span>
        </div>
        <select
          className="select w-full max-w-xs  border-black  text-black text-xl  rounded-md"
          onChange={handleChange}
          value={selectedCategory}
        >
          <option value="All">All</option>
          <option value="Tops">Tops</option>
          <option value="Bottoms">Bottoms</option>
          <option value="Outwear">Outwear</option>
          <option value="Dresses">Dresses</option>
          <option value="Activewear">Activewear</option>
          <option value="Footwear">Footwear</option>
          <option value="Swimwear">Swimwear</option>
          <option value="Accesories">Accesories</option>
        </select>
      </label>
      ;
    </>
  );
}
