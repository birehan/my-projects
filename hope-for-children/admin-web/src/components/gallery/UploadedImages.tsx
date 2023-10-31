import React from "react";
import { useFormContext } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GalleryPhoto } from "../../types/types";

interface UploadedImagesProps {
  name: string;
  handleSetMainPhoto: (value: number) => void;
  handleRemoveImage: (value: number) => void;
  watchedPhotos: any;
}

const UploadedImages: React.FC<UploadedImagesProps> = ({
  name,
  handleSetMainPhoto,
  handleRemoveImage,
  watchedPhotos,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Uploaded Photos
      </label>

      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:gap-6">
        {watchedPhotos.map((file: GalleryPhoto, index: number) => (
          <div key={index} className="flex flex-col gap-4">
            <div className=" relative border border-[#d5e0d5]">
              <img
                src={file.url ? file.url : URL.createObjectURL(file.File)}
                alt={`Image ${index}`}
                className="max-h-60 h-full w-full"
              />

              <button
                type="button"
                className="absolute top-2 right-2 bg-white border-[#d5e0d5] border text-white rounded-full p-2 cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              >
                <RiDeleteBin6Line className="text-primaryColor font-bold text-xl" />
              </button>
            </div>

            <button
              type="button"
              className=" cursor-pointer flex flex-row gap-2 items-center"
              onClick={() => handleSetMainPhoto(index)}
            >
              <input type="radio" checked={file.isMainPhoto} readOnly />
              Set as gallery cover
            </button>
          </div>
        ))}
      </div>

      {errors.isMainPhotoCount && (
        <p className="text-red-500 mt-2">
          One image must be set as the gallery cover.
        </p>
      )}
    </div>
  );
};

export default UploadedImages;
