import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
interface ProjectContentInputProps {
  name: string;
}

const ProjectContentInput: React.FC<ProjectContentInputProps> = ({ name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const uploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file: any) => {
            body.append("file", file);
            fetch("https://localhost:7263/api/ContentImage", {
              method: "post",
              body: body,
              headers: {
                "Content-Type": "multipart/form-data", // Set the content type to form data
              },
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: res.imageUrl });
              })
              .catch((error) => {
                reject(error);
              });
          });
        });
      },
    };
  };

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Content
      </label>
      <div className="mt-2">
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <CKEditor
                config={{
                  extraPlugins: [uploadPlugin],
                }}
                editor={Editor}
                data={field.value}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  field.onChange(data);
                }}
              />
            </>
          )}
        />
        {errors[name]?.type === "required" && (
          <p className="text-red-500" role="alert">
            Content is required
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectContentInput;
