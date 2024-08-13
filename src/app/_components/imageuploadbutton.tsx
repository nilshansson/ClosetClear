"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/app/utils/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

export function SimpleUploadButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("alert-info");
  const router = useRouter();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      setIsLoading(true);

      <span className="loading loading-dots loading-md"></span>;
    },
    onUploadError(error) {
      setIsLoading(false);
      setToastMessage("Upload failed!");
      setToastType("alert-error");
      console.error("Upload error:", error);
    },
    onClientUploadComplete() {
      setIsLoading(false);
      setToastMessage("Upload complete!");
      setToastType("alert-success");

      setTimeout(() => {
        setToastMessage(""); // Hide the toast after a short delay
      }, 2000);
    },
  });

  return (
    <div className="flex flex-col items-center space-y-4 bg-black">
      <label htmlFor="upload-button" className="btn btn-primary gap-2">
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <UploadSVG />
        )}
        Upload Image
      </label>
      <input
        id="upload-button"
        type="file"
        className="hidden"
        {...inputProps}
      />

      {toastMessage && (
        <div className="toast toast-top toast-start">
          <div className={`alert ${toastType}`}>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
