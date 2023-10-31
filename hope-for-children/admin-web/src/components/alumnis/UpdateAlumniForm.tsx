import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  GetAlumniByIdAction,
  UpdateAlumniAction,
  CleanStatusAlumni,
} from "../../features/redux/alumniSlice";

import { UpdateAlumni } from "../../types/types";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import SubmitButton from "../common/SubmitButton";
import TextAreaInput from "../inputs/TextAreaInput";
import ImageInput from "../inputs/ImageInput";
import Notification from "../common/Notification";
import Loading from "../common/Loading";

const UpdateAlumniForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(GetAlumniByIdAction(id));
    }
    return () => {
      dispatch(CleanStatusAlumni());
    };
  }, [dispatch, id]);

  const { isLoading, alumni, isUpdateSuccess, error } = useSelector(
    (state: any) => state.alumnis
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const methods = useForm<UpdateAlumni>();

  useEffect(() => {
    if (alumni) {
      methods.reset(alumni);
      setSelectedImage(alumni.photoUrl);
    }
  }, [alumni, methods]);

  const onSubmit: SubmitHandler<UpdateAlumni> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("story", data.story);
    if (data.file) {
      formData.append("file", data.file);
    }

    dispatch(UpdateAlumniAction({ formData, id: data.id }));
  };

  if (alumni === null) {
    return <Loading />;
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 w-full max-w-[50rem] mx-auto p-6"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {isUpdateSuccess && (
          <Notification
            success={isUpdateSuccess}
            message="Alumni Updated Successfully"
          />
        )}

        {error && <Notification success={isUpdateSuccess} message={error} />}

        <h2 className="text-3xl text-center">Update Alumni Member</h2>
        <TextInput label="Name" name="name" />

        <TextAreaInput label="Alumni story" name="story" />
        <ImageInput
          label="Alumni Photo"
          name="file"
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isImageReqired={false}
        />

        <SubmitButton text="Update Alumni" isLoading={isLoading} />
      </form>
    </FormProvider>
  );
};

export default UpdateAlumniForm;
