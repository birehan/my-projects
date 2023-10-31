import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  CleanStatusAuth,
  ForgetPasswordSendEmaildAction,
} from "../../features/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "../common/SubmitButton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../common/Notification";
import { ForgetPasswordSendEmail } from "../../types/types";
import EmailInput from "../inputs/EmailInput";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isForgetPasswordSendEmailSuccess, error } = useSelector(
    (state: any) => state.auth
  );

  const methods = useForm<ForgetPasswordSendEmail>();

  const onSubmit: SubmitHandler<ForgetPasswordSendEmail> = (data) => {
    dispatch(ForgetPasswordSendEmaildAction(data));
  };

  useEffect(() => {
    if (isForgetPasswordSendEmailSuccess) {
      navigate("/auth/emailsendsuccess");
    }
    return () => {};
  }, [isForgetPasswordSendEmailSuccess]);

  useEffect(() => {
    return () => {
      dispatch(CleanStatusAuth());
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {error && (
          <Notification
            success={isForgetPasswordSendEmailSuccess}
            message={error}
          />
        )}

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="/assets/images/logo2.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forget Password
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
            you will receive email to reset your password
          </p>
        </div>

        <div className="mt-10 mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12  mx-auto">
            <form
              className="space-y-6 mx-auto w-full"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <EmailInput />

              <div className="flex items-center justify-between">
                <div className="flex items-center"></div>
              </div>
              <div className="text-center">
                <SubmitButton
                  text=" Send Email"
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
