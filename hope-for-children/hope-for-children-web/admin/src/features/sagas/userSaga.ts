import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  CreateUserErrorAction,
  CreateUserSuccessAction,
  DeleteUserFailure,
  DeleteUserSuccess,
  FetchAllusersFailure,
  FetchAllusersSuccess,
  GetUserByIdFailure,
  GetUserByIdSuccess,
  UpdateUserFailure,
  UpdateUserSuccess,
} from "../redux/userSlice";
import { RegisterUser, User } from "../../types/types";
import Users from "../../api/user";

function* fetchAllUsers({}: PayloadAction<User[]>): Generator<
  any,
  void,
  User[]
> {
  try {
    const data = yield call(Users.list);
    yield put(FetchAllusersSuccess(data));
  } catch (error: any) {
    yield put(
      FetchAllusersFailure(
        error?.response?.data?.error || "Something went wrong! try again"
      )
    );
  }
}

function* GetUserById({
  payload: id,
}: PayloadAction<string>): Generator<any, void, User> {
  try {
    const data = yield call(Users.getDetail, id);
    yield put(GetUserByIdSuccess(data));
  } catch (error) {
    yield put(GetUserByIdFailure("Something went wrong"));
  }
}

function* createUser({
  payload: user,
}: PayloadAction<RegisterUser>): Generator<any, void, User> {
  try {
    const data = yield call(Users.register, user);
    yield put(CreateUserSuccessAction(data));
  } catch (error: any) {
    yield put(
      CreateUserErrorAction(
        error?.response?.data?.error || "Something went wrong! try again"
      )
    );
  }
}

function* updateUser({
  payload: { user },
}: PayloadAction<{ user: User }>): Generator<any, void, User> {
  try {
    console.log("update data: ", user);
    const data = yield call(Users.update, user); // Assuming Users.update is your API call for updating User
    yield put(UpdateUserSuccess(data));
  } catch (error: any) {
    console.log("update error: ", error);
    yield put(
      UpdateUserFailure(
        error?.response?.data?.error || "Something went wrong! try again"
      )
    );
  }
}

function* deleteUser({
  payload: id,
}: PayloadAction<string>): Generator<any, void, string> {
  try {
    const data = yield call(Users.delete, id);
    yield put(DeleteUserSuccess(data));
  } catch (error: any) {
    yield put(
      DeleteUserFailure(
        error?.response?.data?.error || "Something went wrong! try again"
      )
    );
  }
}

export function* userSaga() {
  yield takeLatest("user/FetchAllUsers", fetchAllUsers);
  yield takeLatest("user/GetUserByIdAction", GetUserById);
  yield takeLatest("user/CreateUserAction", createUser);
  yield takeLatest("user/UpdateUserAction", updateUser);
  yield takeLatest("user/DeleteUserAction", deleteUser);
}
