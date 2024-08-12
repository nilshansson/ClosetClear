"use client";
import React, { useState } from "react";
import { UploadButton } from "../utils/uploadthing";

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
          placeholder="add your product name"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            Choose a category
          </option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="dress">Dress</option>
        </select>
      </div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />{" "}
      <button className="btn btn-outline" type="submit">
        save
      </button>
    </form>
  );
};
