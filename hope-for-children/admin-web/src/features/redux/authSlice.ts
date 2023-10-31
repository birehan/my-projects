import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  AuthType,
  ChangePassword,
  ForgetPasswordSendEmail,
  ResetPassword,
} from "../../types/types";

export type authState = {
  user: AuthType | null;
  isLoading: boolean;
  error: string;
  isLoggingSuccess: boolean;
  isChangePasswordSuccess: boolean;
  isResetPasswordSuccess: boolean;
  isForgetPasswordSendEmailSuccess: boolean;
};
const authInitialState: authState = {
  user: null,
  isLoading: false,
  error: "",
  isLoggingSuccess: false,
  isChangePasswordSuccess: false,
  isResetPasswordSuccess: false,
  isForgetPasswordSendEmailSuccess: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    LoginAction: (
      state: authState,
      { payload: user }: PayloadAction<AuthType>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.user = null;
    },
    LoginSuccessAction: (
      state: authState,
      { payload: user }: PayloadAction<AuthType>
    ) => {
      state.isLoggingSuccess = true;
      state.user = user;
    },
    LoginErrorAction: (
      state: authState,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = error;
      state.isLoggingSuccess = false;
    },

    ChangePasswordAction: (
      state: authState,
      { payload: user }: PayloadAction<ChangePassword>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isChangePasswordSuccess = false;
    },
    ChangePasswordActionSuccess: (state: authState) => {
      state.isChangePasswordSuccess = true;
    },
    ChangePasswordActionError: (
      state: authState,
      { payload: error }: PayloadAction<string>
    ) => {
      state.error = error;
      state.isChangePasswordSuccess = false;
      state.isLoading = false;
    },

    // ForgetPasswordSendEmail

    ForgetPasswordSendEmaildAction: (
      state: authState,
      { payload: user }: PayloadAction<ForgetPasswordSendEmail>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isForgetPasswordSendEmailSuccess = false;
    },
    ForgetPasswordSendEmailSuccess: (state: authState) => {
      state.isForgetPasswordSendEmailSuccess = true;
    },
    ForgetPasswordSendEmailError: (
      state: authState,
      { payload: error }: PayloadAction<string>
    ) => {
      state.error = error;
      state.isForgetPasswordSendEmailSuccess = false;
      state.isLoading = false;
    },

    ResetPasswordAction: (
      state: authState,
      { payload: user }: PayloadAction<ResetPassword>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isResetPasswordSuccess = false;
    },
    ResetPasswordActionSuccess: (state: authState) => {
      state.isResetPasswordSuccess = true;
    },
    ResetPasswordActionError: (
      state: authState,
      { payload: error }: PayloadAction<string>
    ) => {
      state.error = error;
      state.isResetPasswordSuccess = false;
      state.isLoading = false;
    },

    LogOutAction: (state: authState) => {
      state.user = null;
    },

    CleanStatusAuth: (state) => {
      state.isLoading = false;
      state.isLoggingSuccess = false;
      state.error = "";
      state.isChangePasswordSuccess = false;
      state.isResetPasswordSuccess = false;
      state.isForgetPasswordSendEmailSuccess = false;
    },
  },
});

export const {
  LoginAction,
  LoginSuccessAction,
  LoginErrorAction,

  ChangePasswordAction,
  ChangePasswordActionSuccess,
  ChangePasswordActionError,

  ForgetPasswordSendEmaildAction,
  ForgetPasswordSendEmailSuccess,
  ForgetPasswordSendEmailError,

  ResetPasswordAction,
  ResetPasswordActionSuccess,
  ResetPasswordActionError,

  LogOutAction,
  CleanStatusAuth,
} = authSlice.actions;

export default authSlice;
