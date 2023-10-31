import { useDispatch, useSelector } from "react-redux";
import { CreateStaff } from "../../types/types";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import SubmitButton from "../common/SubmitButton";
import TextAreaInput from "../inputs/TextAreaInput";
import ImageInput from "../inputs/ImageInput";
import DropDownInput from "../inputs/DropDownInput";
import {
  CleanUpStatusStaff,
  CreateStaffAction,
} from "../../features/redux/staffSlice";
import { useEffect, useState } from "react";
import Notification from "../common/Notification";

const CreateStaffForm = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CreateStaff> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("about", data.about);
    formData.append("title", data.title);
    formData.append("userSector", data.userSector);
    formData.append("file", data.file);

    dispatch(CreateStaffAction(formData));
  };

  const methods = useForm<CreateStaff>();
  const { isLoading, isCreateSuccess, error } = useSelector(
    (state: any) => state.staffs
  );

  useEffect(() => {
    return () => {
      dispatch(CleanUpStatusStaff());
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
            message="Staff Created succesffully"
          />
        )}

        {error && <Notification success={isCreateSuccess} message={error} />}

        <h2 className="text-3xl text-center">Create Staff Member</h2>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <TextInput label="Name" name={"name"} />
          <TextInput label="Staff Position" name={"title"} />
        </div>
        <DropDownInput
          label="Staff Sector"
          items={[
            { key: "BoardMember", value: "Board Members" },
            { key: "ManagementMember", value: "Management Members" },
            { key: "StaffMember", value: "Staff Members" },
            { key: "FormerMember", value: "Former Members" },
          ]}
          name="userSector"
        />
        <TextAreaInput label="About staff" name="about" />
        <ImageInput
          label="Staff Photo"
          name="file"
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isImageReqired={true}
        />

        <SubmitButton text="Create Staff" isLoading={isLoading} />
      </form>
    </FormProvider>
  );
};

export default CreateStaffForm;
