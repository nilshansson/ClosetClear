"use client";
import React, { useState } from "react";
import { UploadButton } from "../utils/uploadthing";
import { addProductToDB } from "../server/db/queries";

export const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("shirts");
  const [newImage, setNewImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the form from reloading the page

    try {
      await addProductToDB({ title, category, url: newImage });
      setTitle("");
      setCategory("shirts");
      setNewImage("");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white ">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title:
        </label>
        <input
          type="text"
          placeholder="Add your product name"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full p-2 border rounded-md"
        >
          <option disabled>Choose a category</option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="dress">Dress</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image:
        </label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            alert("Upload Completed");
            const [{ url }] = res;
            setNewImage(url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-outline border-black w-full py-2 px-4 bg-white text-black rounded-md hover:bg-gray-200"
      >
        Save
      </button>
    </form>
  );
};
