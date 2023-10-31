import { useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ResetPasswordAction,
  CleanStatusAuth,
} from "../../features/redux/authSlice";
import SubmitButton from "../common/SubmitButton";
import Notification from "../common/Notification";
import { ResetPassword } from "../../types/types";
import PasswordInput from "../inputs/PasswordInput";

export default function ResetPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get("userId");
  let token = query.get("token");

  if (token) {
    token = token.replace(/\s/g, "+");
  }

  const { isLoading, isResetPasswordSuccess, error } = useSelector(
    (state: any) => state.auth
  );

  const methods = useForm<ResetPassword>();

  const onSubmit: SubmitHandler<ResetPassword> = (data) => {
    dispatch(
      ResetPasswordAction({ userId, token, newPassword: data.newPassword })
    );
  };

  useEffect(() => {
    if (isResetPasswordSuccess) {
      setTimeout(() => {
        navigate("/login"); // Redirect to the login screen on success
      }, 2000);
    }
    return () => {};
  }, [isResetPasswordSuccess, navigate]);

  useEffect(() => {
    return () => {
      dispatch(CleanStatusAuth());
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {isResetPasswordSuccess && (
          <Notification
            success={isResetPasswordSuccess}
            message="Password reset successfully"
          />
        )}

        {error && (
          <Notification success={isResetPasswordSuccess} message={error} />
        )}

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-4 mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12  mx-auto">
            <form
              className="space-y-6 mx-auto w-full"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <PasswordInput label="New Password" name="newPassword" />

              <div className="text-center">
                <SubmitButton text="Reset Password" isLoading={isLoading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
