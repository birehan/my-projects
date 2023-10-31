import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../constants/actionTypes.js";
import * as api from "../features/authentication/api/index.js";

function* createUser({ payload }) {
  try {
    const user = yield call(api.createUser, payload);
    yield put({ type: types.CREATE_USER_SUCCESS, payload: user });
  } catch (error) {
    yield put({
      type: types.CREATE_USER_FAILED,
      payload: error,
    });
  }
}

function* getAllUSers() {
  try {
    const users = yield call(api.getUsers);
    yield put({ type: types.FETCH_USERS_SUCCESS, payload: users });
  } catch (error) {
    yield put({
      type: types.FETCH_USERS_FAILED,
      payload: error,
    });
  }
}

function* loginUser({ payload }) {
  try {
    const user = yield call(api.login, payload);
    yield put({ type: types.LOGIN_SUCCESS, payload: user });
  } catch (error) {
    yield put({
      type: types.LOGIN_FAILED,
      payload: error,
    });
  }
}

function* logout() {
  try {
    yield call(api.logout);
    yield put({ type: types.LOGOUT_SUCCESS });
  } catch (error) {
    yield put({
      type: types.LOGOUT_FAILED,
      payload: error,
    });
  }
}

function* updateUser({ payload }) {
  try {
    const user = yield call(api.updateUser, payload);
    yield put({ type: types.UPDATE_USER_SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: types.UPDATE_USER_FAILED, message: error });
  }
}
function* updateProfile({ payload }) {
  try {
    const user = yield call(api.updateProfile, payload);
    yield put({ type: types.UPDATE_PROFILE_SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: types.UPDATE_PROFILE_FAILED, message: error });
  }
}

function* deleteUser({ payload }) {
  try {
    const id = yield call(api.deleteUser, payload);
    yield put({ type: types.DELETE_USER_SUCCESS, payload: id });
  } catch (error) {
    yield put({ type: types.DELETE_USER_FAILED, message: error.message });
  }
}

function* userSaga() {
  yield takeEvery(types.LOGIN_USER, loginUser);
  yield takeEvery(types.LOG_OUT, logout);
  yield takeEvery(types.FETCH_ALL_USER, getAllUSers);

  yield takeEvery(types.CREATE_USER, createUser);
  yield takeEvery(types.UPDATE_USER, updateUser);
  yield takeEvery(types.UPDATE_PROFILE, updateProfile);
  yield takeEvery(types.DELETE_USER, deleteUser);
}

export default userSaga;
