import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CleanUpStatusStaff,
  GetStaffByIdAction,
  UpdateStaffAction,
} from "../../features/redux/staffSlice";

import { UpdateStaff } from "../../types/types";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import SubmitButton from "../common/SubmitButton";
import TextAreaInput from "../inputs/TextAreaInput";
import ImageInput from "../inputs/ImageInput";
import DropDownInput from "../inputs/DropDownInput";

import Notification from "../common/Notification";
import Loading from "../common/Loading";

const UpdateStaffForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(GetStaffByIdAction(id));
    }
    return () => {
      dispatch(CleanUpStatusStaff());
    };
  }, [dispatch, id]);

  const { staff, isLoading, isUpdateSuccess, error } = useSelector(
    (state: any) => state.staffs
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const methods = useForm<UpdateStaff>();

  const onSubmit: SubmitHandler<UpdateStaff> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("about", data.about);
    formData.append("title", data.title);
    formData.append("userSector", data.userSector);
    if (data.file) {
      formData.append("file", data.file);
    }

    dispatch(UpdateStaffAction({ formData, id: data.id }));
  };

  useEffect(() => {
    if (staff) {
      methods.reset(staff);
      setSelectedImage(staff.photoUrl);
    }
  }, [staff, methods]);

  if (staff === null) {
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
            message="Staff Updated Successfully"
          />
        )}

        {error && <Notification success={isUpdateSuccess} message={error} />}

        <h2 className="text-3xl text-center">Update Staff Member</h2>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <TextInput label="Name" name="name" />
          <TextInput label="Staff Position" name="title" />
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
          isImageReqired={false}
        />

        <SubmitButton text="Update Staff" isLoading={isLoading} />
      </form>
    </FormProvider>
  );
};

export default UpdateStaffForm;
