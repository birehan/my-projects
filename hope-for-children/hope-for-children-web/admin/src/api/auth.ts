import {
  ChangePassword,
  ForgetPasswordSendEmail,
  LoginUser,
  ResetPassword,
} from "../types/types";
import { requests } from "./request";

const Auths = {
  login: (user: LoginUser) => requests.post<LoginUser>("/Account/login", user),
  changePassword: (data: ChangePassword) =>
    requests.put<string>("/Account/updatePassword", data),

  forgetPassword: (data: ForgetPasswordSendEmail) =>
    requests.put<string>("/Account/forgetPasswordSendEmail", data),

  resetPassword: (data: ResetPassword) =>
    requests.put<string>("/Account/resetPassword", data),
};

export default Auths;
