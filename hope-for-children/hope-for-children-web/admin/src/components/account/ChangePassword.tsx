import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ChangePasswordAction,
  CleanStatusAuth,
} from "../../features/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "../common/SubmitButton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../common/Notification";
import { ChangePassword } from "../../types/types";
import PasswordInput from "../inputs/PasswordInput";

export default function ChangePasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isChangePasswordSuccess, error } = useSelector(
    (state: any) => state.auth
  );

  const methods = useForm<ChangePassword>();

  const onSubmit: SubmitHandler<ChangePassword> = (data) => {
    dispatch(ChangePasswordAction(data));
  };

  useEffect(() => {
    if (isChangePasswordSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    return () => {};
  }, [isChangePasswordSuccess]);

  useEffect(() => {
    return () => {
      dispatch(CleanStatusAuth());
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {isChangePasswordSuccess && (
          <Notification
            success={isChangePasswordSuccess}
            message="Password changed succesffully"
          />
        )}

        {error && (
          <Notification success={isChangePasswordSuccess} message={error} />
        )}

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change Password
          </h2>
        </div>

        <div className="mt-4 mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12  mx-auto">
            <form
              className="space-y-6 mx-auto w-full"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <PasswordInput label={"Old Password"} name={"oldPassword"} />
              <PasswordInput label={"New Password"} name={"newPassword"} />

              <div className="flex items-center justify-between">
                <div className="flex items-center"></div>
              </div>
              <div className="text-center">
                <SubmitButton
                  text=" Change Password"
                  isLoading={isLoading}
                ></SubmitButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
