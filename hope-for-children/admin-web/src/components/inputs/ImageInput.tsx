import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";

interface Props {
  label: string;
  name: string;
  selectedImage: string | null;
  setSelectedImage: (value: string | null) => void;
  isImageReqired: boolean;
}

const ImageInput: React.FC<Props> = ({
  name,
  label,
  selectedImage,
  setSelectedImage,
  isImageReqired,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setValue(name, selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/gif": [".gif"],
    },
  });

  return (
    <div className="flex-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div
        {...getRootProps()}
        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-8 cursor-pointer"
      >
        <input
          {...register(name, { required: isImageReqired })}
          {...getInputProps()}
          className="sr-only"
        />
        <div className="text-center">
          {selectedImage ? (
            <div className="mt-2">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-48 h-full mx-auto"
              />
            </div>
          ) : (
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <span>Upload a file</span>
                <p className="pl-1">or drag and drop</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {errors[name]?.type === "required" && (
        <p className="text-red-500" role="alert">
          {name} is required
        </p>
      )}
    </div>
  );
};

export default ImageInput;
