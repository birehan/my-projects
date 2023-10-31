import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { Staff } from "../../types/types";

import {
  CreateStaffFailure,
  CreateStaffSuccess,
  DeleteStaffFailure,
  DeleteStaffSuccess,
  FetchAllstaffsFailure,
  FetchAllstaffsSuccess,
  GetStaffByIdFailure,
  GetStaffByIdSuccess,
  GetStaffDetailFailure,
  GetStaffDetailSuccess,
  UpdateStaffFailure,
  UpdateStaffSuccess,
} from "../redux/staffSlice";
import Staffs from "../../api/staffs";

function* fetchAllStaffs({}: PayloadAction<Staff[]>): Generator<
  any,
  void,
  Staff[]
> {
  try {
    const data = yield call(Staffs.list);
    yield put(FetchAllstaffsSuccess(data));
  } catch (error) {
    yield put(FetchAllstaffsFailure("Something went wrong"));
  }
}

function* GetStaffDetail({
  payload: id,
}: PayloadAction<string>): Generator<any, void, Staff[]> {
  try {
    const data = yield call(Staffs.details, id);
    yield put(GetStaffDetailSuccess(data));
  } catch (error) {
    yield put(GetStaffDetailFailure("Something went wrong"));
  }
}

function* GetStaffById({
  payload: id,
}: PayloadAction<string>): Generator<any, void, Staff> {
  try {
    const data = yield call(Staffs.getDtail, id);
    yield put(GetStaffByIdSuccess(data));
  } catch (error) {
    yield put(GetStaffByIdFailure("Something went wrong"));
  }
}

function* deleteStaff({
  payload: id,
}: PayloadAction<string>): Generator<any, void, string> {
  try {
    const data = yield call(Staffs.delete, id);
    yield put(DeleteStaffSuccess(data));
  } catch (error) {
    yield put(DeleteStaffFailure("Something went wrong"));
  }
}

function* createStaff({
  payload: staff,
}: PayloadAction<FormData>): Generator<any, void, Staff> {
  try {
    const data = yield call(Staffs.create, staff);
    yield put(CreateStaffSuccess(data));
  } catch (error) {
    yield put(CreateStaffFailure("Something went wrong! try again"));
  }
}

function* updateStaff({
  payload: { formData, id },
}: PayloadAction<{ formData: FormData; id: string }>): Generator<
  any,
  void,
  Staff
> {
  try {
    const data = yield call(Staffs.update, formData, id); // Assuming Staffs.update is your API call for updating staff
    yield put(UpdateStaffSuccess(data));
  } catch (error) {
    console.log("eror: ", error);
    yield put(UpdateStaffFailure("Something went wrong! try again"));
  }
}

export function* staffSaga() {
  yield takeLatest("staffs/FetchAllstaffs", fetchAllStaffs);
  yield takeLatest("staffs/GetStaffDetailAction", GetStaffDetail);
  yield takeLatest("staffs/CreateStaffAction", createStaff);
  yield takeLatest("staffs/GetStaffByIdAction", GetStaffById);
  yield takeLatest("staffs/UpdateStaffAction", updateStaff);
  yield takeLatest("staffs/DeleteStaffAction", deleteStaff);
}
