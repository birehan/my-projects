import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  CleanStatusUsers,
  GetUserByIdAction,
  UpdateUserAction,
} from "../../features/redux/userSlice";
import { User } from "../../types/types";
import TextInput from "../inputs/TextInput";
import EmailInput from "../inputs/EmailInput";
import SubmitButton from "../common/SubmitButton";
import Notification from "../common/Notification";
import DropDownInput from "../inputs/DropDownInput";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const { isLoading, error, isUpdateSuccess } = useSelector(
    (state: any) => state.users
  );
  const methods = useForm<User>();

  const { id } = useParams(); // Extract the user ID from the route parameter

  useEffect(() => {
    if (id) {
      dispatch(GetUserByIdAction(id));
    }
    return () => {
      dispatch(CleanStatusUsers());
    };
  }, [dispatch, id]);

  const user = useSelector((state: any) => state.users.user);

  const onSubmit: SubmitHandler<User> = (data) => {
    dispatch(UpdateUserAction({ user: data }));
  };

  useEffect(() => {
    if (user) {
      methods.reset(user);
    }
  }, [user, methods]);

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {isUpdateSuccess && (
          <Notification
            success={isUpdateSuccess}
            message="User Updated Successfully"
          />
        )}

        {error && <Notification success={isUpdateSuccess} message={error} />}

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update User Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              className="space-y-6"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <EmailInput />

              <DropDownInput
                label="Role"
                items={[
                  { key: "SuperAdmin", value: "Super Admin" },
                  { key: "Admin", value: "Admin" },
                ]}
                name="userRole"
              />
              <TextInput label={"User name"} name={"userName"} />
              <div className="text-center">
                <SubmitButton text={"Update User"} isLoading={isLoading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
