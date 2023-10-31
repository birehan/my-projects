import {
  SubmitHandler,
  useForm,
  FormProvider,
  useWatch,
} from "react-hook-form";
import { UpdateGallery } from "../../types/types";
import TextInput from "../inputs/TextInput";
import MultiImageInput from "../inputs/MultiImageInput";
import SubmitButton from "../common/SubmitButton";
import UploadedImages from "./UploadedImages";
import { useDispatch, useSelector } from "react-redux";
import {
  CleanStatusGallery,
  GetGalleryByIdAction,
  UpdateGalleryAction,
} from "../../features/redux/gallerySlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";
import Notification from "../common/Notification";

const UpdateGalleryForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(GetGalleryByIdAction(id));
    }
    return () => {
      dispatch(CleanStatusGallery());
    };
  }, [dispatch, id]);

  const { isLoading, gallery, isUpdateSuccess, error } = useSelector(
    (state: any) => state.galleries
  );

  const methods = useForm<UpdateGallery>();

  useEffect(() => {
    if (gallery) {
      methods.reset(gallery);
      methods.register("isMainPhotoCount", {
        required: true,
        min: 1,
        value: 1,
      });
    }
  }, [gallery, methods]);

  const onSubmit: SubmitHandler<UpdateGallery> = (data) => {
    const formData = new FormData();
    formData.append(`Title`, data.title);

    var oldPhotos = 0;
    var photos = 0;

    for (var i = 0; i < data.photos.length; i++) {
      if (data.photos[i].url) {
        formData.append(`oldPhotos`, data.photos[i].url);
        if (data.photos[i].isMainPhoto) {
          formData.append(`oldMainPhotoIndex`, String(oldPhotos));
        }
        oldPhotos++;
      } else {
        formData.append(`photos`, data.photos[i].File);
        if (data.photos[i].isMainPhoto) {
          formData.append(`mainPhotoIndex`, String(photos));
        }
        photos++;
      }
    }
    dispatch(UpdateGalleryAction({ formData, id: data.id }));
  };

  const watchedPhotos = useWatch({ name: "photos", control: methods.control });

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

  if (gallery === null) {
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
            message="Gallery Updated Successfully"
          />
        )}

        {error && <Notification success={isUpdateSuccess} message={error} />}

        <h2 className="text-3xl text-center">Update Gallery</h2>
        <TextInput label="Category Title" name="title" />

        {watchedPhotos && watchedPhotos.length > 0 && (
          <UploadedImages
            watchedPhotos={watchedPhotos}
            handleRemoveImage={handleRemoveImage}
            handleSetMainPhoto={handleSetMainPhoto}
            name="photos"
          />
        )}

        <MultiImageInput
          label="Gallery Photo"
          name="photos"
          isImageRequired={true}
        />

        <SubmitButton text="Update Gallery" isLoading={isLoading} />
      </form>
    </FormProvider>
  );
};

export default UpdateGalleryForm;
