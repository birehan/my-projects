import { useDispatch, useSelector } from "react-redux";
import { CreateAlumni } from "../../types/types";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import SubmitButton from "../common/SubmitButton";
import TextAreaInput from "../inputs/TextAreaInput";
import ImageInput from "../inputs/ImageInput";
import {
  CleanStatusAlumni,
  CreateAlumniAction,
} from "../../features/redux/alumniSlice";
import { useEffect, useState } from "react";
import Notification from "../common/Notification";

const CreateAlumniForm = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CreateAlumni> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("story", data.story);
    formData.append("file", data.file);
    console.log("file: ", data.file);

    dispatch(CreateAlumniAction(formData));
  };

  const methods = useForm<CreateAlumni>();
  const { isLoading, isCreateSuccess, error } = useSelector(
    (state: any) => state.alumnis
  );

  useEffect(() => {
    return () => {
      dispatch(CleanStatusAlumni());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isCreateSuccess) {
      methods.reset();
      setSelectedImage(null);
    }
  }, [isCreateSuccess, methods]);

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 w-full max-w-[50rem] mx-auto p-6"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {isCreateSuccess && (
          <Notification
            success={isCreateSuccess}
            message="Alumni Created succesffully"
          />
        )}

        {error && <Notification success={isCreateSuccess} message={error} />}

        <h2 className="text-3xl text-center">Create Alumni Member</h2>
        <TextInput label="Name" name={"name"} />

        <TextAreaInput label="Alumni story" name="story" />
        <ImageInput
          label="Alumni Photo"
          name="file"
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isImageReqired={true}
        />

        <SubmitButton text="Create Alumni" isLoading={isLoading} />
      </form>
    </FormProvider>
  );
};

export default CreateAlumniForm;
