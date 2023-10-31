import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { Alumni } from "../../types/types";

import {
  CreateAlumniFailure,
  CreateAlumniSuccess,
  DeleteAlumniFailure,
  DeleteAlumniSuccess,
  FetchAllAlumnisFailure,
  FetchAllAlumnisSuccess,
  GetAlumniByIdFailure,
  GetAlumniByIdSuccess,
  UpdateAlumniFailure,
  UpdateAlumniSuccess,
} from "../redux/alumniSlice";
import Alumnis from "../../api/alumni";

function* fetchAllAlumnis({}: PayloadAction<Alumni[]>): Generator<
  any,
  void,
  Alumni[]
> {
  try {
    const data = yield call(Alumnis.list);
    yield put(FetchAllAlumnisSuccess(data));
  } catch (error) {
    yield put(FetchAllAlumnisFailure("Something went wrong"));
  }
}

function* GetAlumniById({
  payload: id,
}: PayloadAction<string>): Generator<any, void, Alumni> {
  try {
    const data = yield call(Alumnis.getDetail, id);
    yield put(GetAlumniByIdSuccess(data));
  } catch (error) {
    yield put(GetAlumniByIdFailure("Something went wrong"));
  }
}

function* createAlumni({
  payload: Alumni,
}: PayloadAction<FormData>): Generator<any, void, Alumni> {
  try {
    const data = yield call(Alumnis.create, Alumni);
    yield put(CreateAlumniSuccess(data));
  } catch (error) {
    yield put(CreateAlumniFailure("Something went wrong! try again"));
  }
}

function* updateAlumni({
  payload: { formData, id },
}: PayloadAction<{ formData: FormData; id: string }>): Generator<
  any,
  void,
  Alumni
> {
  try {
    const data = yield call(Alumnis.update, formData, id); // Assuming Alumnis.update is your API call for updating Alumni
    yield put(UpdateAlumniSuccess(data));
  } catch (error) {
    yield put(UpdateAlumniFailure("Something went wrong! try again"));
  }
}

function* deleteAlumni({
  payload: id,
}: PayloadAction<string>): Generator<any, void, string> {
  try {
    const data = yield call(Alumnis.delete, id);
    yield put(DeleteAlumniSuccess(data));
  } catch (error) {
    yield put(DeleteAlumniFailure("Something went wrong"));
  }
}

export function* alumniSaga() {
  yield takeLatest("Alumnis/FetchAllAlumnis", fetchAllAlumnis);
  yield takeLatest("Alumnis/CreateAlumniAction", createAlumni);
  yield takeLatest("Alumnis/GetAlumniByIdAction", GetAlumniById);
  yield takeLatest("Alumnis/UpdateAlumniAction", updateAlumni);
  yield takeLatest("Alumnis/DeleteAlumniAction", deleteAlumni);
}
