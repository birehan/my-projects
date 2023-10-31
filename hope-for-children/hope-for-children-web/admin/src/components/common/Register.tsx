import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateUserAction,
  CleanStatusUsers,
} from "../../features/redux/userSlice";
import { RegisterUser } from "../../types/types";
import TextInput from "../inputs/TextInput";
import EmailInput from "../inputs/EmailInput";
import PasswordInput from "../inputs/PasswordInput";
import SubmitButton from "./SubmitButton";
import Notification from "./Notification";
import DropDownInput from "../inputs/DropDownInput";
import { useEffect } from "react";

export default function Register() {
  const dispatch = useDispatch();
  const { isLoading, error, isCreateSuccess } = useSelector(
    (state: any) => state.users
  );
  const methods = useForm<RegisterUser>();

  const onSubmit: SubmitHandler<RegisterUser> = (data) => {
    dispatch(CreateUserAction(data));
  };

  useEffect(() => {
    return () => {
      dispatch(CleanStatusUsers());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isCreateSuccess) {
      methods.reset();
    }
  }, [isCreateSuccess, methods]);

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {isCreateSuccess && (
          <Notification
            success={isCreateSuccess}
            message="User Created succesffully"
          />
        )}

        {error && <Notification success={isCreateSuccess} message={error} />}

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create user account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              className="space-y-6"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <TextInput label={"User name"} name={"username"} />
              <EmailInput />
              <PasswordInput label={"Password"} name={"password"} />

              <DropDownInput
                label="Role"
                items={[
                  { key: "SuperAdmin", value: "Super Admin" },
                  { key: "Admin", value: "Admin" },
                ]}
                name="userRole"
              />
              <div className="text-center">
                <SubmitButton text={"Create User"} isLoading={isLoading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
