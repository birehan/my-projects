import {
  SubmitHandler,
  useForm,
  FormProvider,
  useWatch,
} from "react-hook-form";
import { CreateGallery } from "../../types/types";
import TextInput from "../inputs/TextInput";
import MultiImageInput from "../inputs/MultiImageInput";
import SubmitButton from "../common/SubmitButton";
import UploadedImages from "./UploadedImages";
import { useDispatch, useSelector } from "react-redux";
import {
  CleanStatusGallery,
  CreateGalleryAction,
} from "../../features/redux/gallerySlice";
import Notification from "../common/Notification";
import { useEffect } from "react";

const CreateGalleryForm = () => {
  const methods = useForm<CreateGallery>({});
  methods.register("isMainPhotoCount", {
    required: true,
    min: 1,
  });
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<CreateGallery> = (data) => {
    console.log("data: ", data);
    const formData = new FormData();
    formData.append(`Title`, data.title);

    data.photos.forEach((photo, index) => {
      formData.append(`Photos`, photo.File);
      if (photo.isMainPhoto) {
        formData.append(`MainPhotoIndex`, String(index));
      }
    });

    dispatch(CreateGalleryAction(formData));
  };

  const watchedPhotos = useWatch({ name: "photos", control: methods.control });
  const { isLoading, isCreateSuccess, error } = useSelector(
    (state: any) => state.galleries
  );

  const handleSetMainPhoto = (index: number) => {
    const updatedFiles = watchedPhotos.map((file: any, i: number) => ({
      ...file,
      isMainPhoto: i === index,
    }));

    methods.setValue("photos", updatedFiles);
    methods.setValue("isMainPhotoCount", 1);
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = watchedPhotos.filter((file: any, i: number) => {
      if (i !== index) {
        return true;
      } else {
        if (watchedPhotos[i].isMainPhoto === true) {
          methods.setValue("isMainPhotoCount", 0);
        }
        return false;
      }
    });
    methods.setValue("photos", newFiles);
  };

  useEffect(() => {
    if (isCreateSuccess) {
      methods.reset();
    }
  }, [isCreateSuccess, methods]);

  useEffect(() => {
    return () => {
      dispatch(CleanStatusGallery());
    };
  }, [dispatch]);

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 w-full max-w-[50rem] mx-auto p-6"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {isCreateSuccess && (
          <Notification
            success={isCreateSuccess}
            message="Gallery Created succesffully"
          />
        )}

        {error && <Notification success={isCreateSuccess} message={error} />}

        <h2 className="text-3xl text-center">Create Gallery</h2>
        <TextInput label="Category Title" name="title" />

        {watchedPhotos && watchedPhotos.length > 0 && (
          <UploadedImages
            handleSetMainPhoto={handleSetMainPhoto}
            name="photos"
            handleRemoveImage={handleRemoveImage}
            watchedPhotos={watchedPhotos}
          />
        )}

        <MultiImageInput
          label="Gallery Photo"
          name="photos" // Use "Photos" as the name
          isImageRequired={true}
        />

        <SubmitButton text="Create Gallery" isLoading={isLoading} />
      </form>
    </FormProvider>
  );
};

export default CreateGalleryForm;
