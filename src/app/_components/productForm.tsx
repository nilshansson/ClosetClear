"use client";

import "@uploadthing/react/styles.css";
import React, { useState } from "react";
import { UploadButton } from "../utils/uploadthing";
import { addProductToDB, getProducts } from "../server/db/queries";
import { useUser } from "@clerk/nextjs";
import { OnAddProductProps, ProductFormType } from "../types";

export const ProductForm = ({ onAddProductAction }: OnAddProductProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { user } = useUser();
  const userId = user?.id;

  const defaultImgUrl =
    "https://images.unsplash.com/photo-1517502166878-35c93a0072f0?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const imageUrlToUse = newImage || defaultImgUrl;
      const newProduct = await addProductToDB(
        {
          title,
          category,
          url: imageUrlToUse,
        } as ProductFormType,
        userId as string
      );

      onAddProductAction(newProduct);

      setTitle("");
      setCategory("");
      setNewImage("");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white">
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
          className="input input-bordered w-full p-2 rounded-md border-black"
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
          className="select select-bordered w-full p-2 border rounded-md  border-black  py-2 px-4 bg-white text-black"
        >
          <option disabled>Choose a category</option>
          <option value="Tops">Tops</option>
          <option value="Bottoms">Bottoms</option>
          <option value="Outwear">Outwear</option>
          <option value="Dresses">Dresses</option>
          <option value="Activewear">Activewear</option>
          <option value="Footwear">Footwear</option>
          <option value="Swimwear">Swimwear</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image:
        </label>

        {uploadError && (
          <div className="alert alert-error mb-4">
            <span>{uploadError}</span>
          </div>
        )}
        {uploadSuccess && (
          <div className="alert alert-success bg-green-500 my-2 text-white">
            <span>Image uploaded successfully! 🥳</span>
          </div>
        )}
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const [{ url }] = res;
            setNewImage(url);
            setIsUploading(false);
            setUploadError("");
            setUploadSuccess(true);
            setTimeout(() => {
              setUploadSuccess(false);
            }, 5000);
          }}
          onUploadBegin={() => {
            setIsUploading(true);
            setUploadError("");
          }}
          onUploadError={(error: Error) => {
            setIsUploading(false);
            setUploadError(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-outline border-black w-full py-2 px-4 bg-white text-black rounded-md hover:bg-gray-200"
        disabled={isUploading}
        onClick={() => modal.close()}
      >
        Save
      </button>
    </form>
  );
};
