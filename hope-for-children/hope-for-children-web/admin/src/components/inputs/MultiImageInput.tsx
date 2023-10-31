import { useFormContext, useWatch } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";

interface Props {
  label: string;
  name: string;
  isImageRequired: boolean;
}

const MultiImageInput: React.FC<Props> = ({
  name,
  label,

  isImageRequired,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const existingPhotos = useWatch({ name }); // Get existing photos from the form

  const onDrop = (acceptedFiles: File[]) => {
    const newPhotos = acceptedFiles.map((file) => ({
      isMainPhoto: false, // Set the default value to false
      File: file,
    }));
    const allPhotos = existingPhotos
      ? [...existingPhotos, ...newPhotos]
      : newPhotos;
    setValue(name, allPhotos);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
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
          {...register(name, { required: isImageRequired })}
          {...getInputProps()}
          className="sr-only"
        />
        <div className="text-center">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <span>Upload files</span>
              <p className="pl-1">or drag and drop</p>
            </div>
          </div>
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

export default MultiImageInput;
