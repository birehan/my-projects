import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../constants/courseActionTypes.js";
import * as api from "../features/courses/api/index.js";

function* createCourse({ payload }) {
  try {
    const course = yield call(api.createCourse, payload);
    yield put({ type: types.CREATE_COURSE_SUCCESS, payload: course });
  } catch (error) {
    yield put({
      type: types.CREATE_COURSE_FAILED,
      payload: error,
    });
  }
}

function* getCourses() {
  try {
    const courses = yield call(api.getCourses);
    yield put({ type: types.GET_COURSES_SUCCESS, payload: courses });
  } catch (error) {
    yield put({
      type: types.GET_COURSES_FAILED,
      payload: error,
    });
  }
}

function* updateCourse({ payload }) {
  try {
    const course = yield call(api.updateCourse, payload);
    yield put({ type: types.UPDATE_COURSE_SUCCESS, payload: course });
  } catch (error) {
    yield put({ type: types.UPDATE_COURSE_FAILED, payload: error });
  }
}

function* deleteCourse({ payload }) {
  try {
    const course = yield call(api.deleteCourse, payload);
    yield put({ type: types.DELETE_COURSE_SUCCESS, payload: course });
  } catch (error) {
    yield put({ type: types.DELETE_COURSE_FAILED, payload: error });
  }
}

function* courseSaga() {
  yield takeEvery(types.GET_COURSES, getCourses);
  yield takeEvery(types.CREATE_COURSE, createCourse);
  yield takeEvery(types.UPDATE_COURSE, updateCourse);
  yield takeEvery(types.DELETE_COURSE, deleteCourse);
}

export default courseSaga;

