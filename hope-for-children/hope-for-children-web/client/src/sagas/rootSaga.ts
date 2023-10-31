import { call, put, takeEvery, all } from "redux-saga/effects";
import * as types from "../api/actionTypes";
import * as api from "../api/agent";

function* getProjects(): any {
  try {
    const projects = yield call(api.getProjects);
    yield put({
      type: types.REQUEST_SUCCESS,
      payload: { dataType: "projects", data: projects },
    });
  } catch (error: any) {
    yield put({
      type: types.REQUEST_FAILED,
      payload:
        error?.response?.data?.error || "Something went wrong! try again",
    });
  }
}

function* getProjectDetail(payload: any): any {
  try {
    const project = yield call(api.getProjectDetail, payload.payload);
    yield put({
      type: types.REQUEST_SUCCESS,
      payload: { dataType: "project", data: project },
    });
  } catch (error: any) {
    yield put({
      type: types.REQUEST_FAILED,
      payload:
        error?.response?.data?.error || "Something went wrong! try again",
    });
  }
}

function* getGalleries(): any {
  try {
    const galleries = yield call(api.getGalleries);
    yield put({
      type: types.REQUEST_SUCCESS,
      payload: { dataType: "galleries", data: galleries },
    });
  } catch (error: any) {
    yield put({
      type: types.REQUEST_FAILED,
      payload:
        error?.response?.data?.error || "Something went wrong! try again",
    });
  }
}

function* getGalleryDetail(payload: any): any {
  try {
    const gallery = yield call(api.getGalleryDetail, payload.payload);
    yield put({
      type: types.REQUEST_SUCCESS,
      payload: { dataType: "gallery", data: gallery },
    });
  } catch (error: any) {
    yield put({
      type: types.REQUEST_FAILED,
      payload:
        error?.response?.data?.error || "Something went wrong! try again",
    });
  }
}

function* getAlumniStudents(): any {
  try {
    const alumnis = yield call(api.getAlumniStudents);
    yield put({
      type: types.REQUEST_SUCCESS,
      payload: { dataType: "alumnis", data: alumnis },
    });
  } catch (error: any) {
    yield put({
      type: types.REQUEST_FAILED,
      payload:
        error?.response?.data?.error || "Something went wrong! try again",
    });
  }
}

function* getStaffs(payload: any): any {
  try {
    const staffs = yield call(api.getStaffs, payload.payload);
    yield put({
      type: types.REQUEST_SUCCESS,
      payload: { dataType: "staffs", data: staffs },
    });
  } catch (error: any) {
    yield put({
      type: types.REQUEST_FAILED,
      payload:
        error?.response?.data?.error || "Something went wrong! try again",
    });
  }
}

function* projectSaga() {
  yield takeEvery(types.GET_PROJECTS, getProjects);
  yield takeEvery(types.GET_PROJECT_DETAIL, getProjectDetail);
  yield takeEvery(types.GET_GALLERY, getGalleries);
  yield takeEvery(types.GET_GALLERY_DETAIL, getGalleryDetail);
  yield takeEvery(types.GET_STAFFS, getStaffs);
  yield takeEvery(types.GET_ALUMNI, getAlumniStudents);
}

export default function* rootSaga() {
  yield all([projectSaga()]);
}
