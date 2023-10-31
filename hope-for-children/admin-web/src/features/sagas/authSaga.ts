import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  ChangePasswordActionError,
  ChangePasswordActionSuccess,
  ForgetPasswordSendEmailError,
  ForgetPasswordSendEmailSuccess,
  LoginErrorAction,
  LoginSuccessAction,
  ResetPasswordActionError,
  ResetPasswordActionSuccess,
} from "../redux/authSlice";
import {
  AuthType,
  ChangePassword,
  ForgetPasswordSendEmail,
  ResetPassword,
} from "../../types/types";
import Auths from "../../api/auth";

function* userLogin({
  payload: user,
}: PayloadAction<AuthType>): Generator<any, void, AuthType> {
  try {
    const data = yield call(Auths.login, user);
    yield put(LoginSuccessAction(data));
  } catch (error: any) {
    yield put(
      LoginErrorAction(
        error?.response?.data?.error || "Something went wrong! try again"
      )
    );
  }
}

function* changePassword({
  payload: user,
}: PayloadAction<ChangePassword>): Generator<any, void, AuthType> {
  try {
    yield call(Auths.changePassword, user);
    yield put(ChangePasswordActionSuccess());
  } catch (error: any) {
    yield put(
      ChangePasswordActionError(
        error?.response?.data?.error || "Something went wrong! try again"
      )
    );
  }
}

function* forgetPasswordSendEmail({
  payload: user,
}: PayloadAction<ForgetPasswordSendEmail>): Generator<any, void, AuthType> {
  try {
    yield call(Auths.forgetPassword, user);
    yield put(ForgetPasswordSendEmailSuccess());
  } catch (error: any) {
    yield put(
      ForgetPasswordSendEmailError(
        error?.response?.data?.error || "Something went wrong! try again"
      )
    );
  }
}

function* resetPassword({
  payload: user,
}: PayloadAction<ResetPassword>): Generator<any, void, AuthType> {
  try {
    yield call(Auths.resetPassword, user);
    yield put(ResetPasswordActionSuccess());
  } catch (error: any) {
    console.log("error: ", error);
    yield put(
      ResetPasswordActionError(
        error?.response?.data?.error || "Something went wrong! try again"
      )
    );
  }
}

export function* watchUserLogin() {
  yield takeLatest("auth/LoginAction", userLogin);
  yield takeLatest("auth/ChangePasswordAction", changePassword);
  yield takeLatest("auth/ResetPasswordAction", resetPassword);
  yield takeLatest(
    "auth/ForgetPasswordSendEmaildAction",
    forgetPasswordSendEmail
  );
}
