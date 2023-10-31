import {
  FETCH_ALL_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CLEAN_UP,
  LOGIN_USER,
  LOG_OUT,
  UPDATE_PROFILE,
} from "../../../constants/actionTypes.js";

export const getUsers = () => {
  return { type: FETCH_ALL_USER };
};

export const cleanUp = () => {
  return { type: CLEAN_UP };
};

export const createUser = (user) => {
  return { type: CREATE_USER, payload: user };
};

export const loginUser = (user) => {
  return { type: LOGIN_USER, payload: user };
};

export const logOutUser = () => {
  return { type: LOG_OUT };
};

export const updateUser = (user) => {
  return { type: UPDATE_USER, payload: user };
};

export const updateProfile = (user) => {
  return { type: UPDATE_PROFILE, payload: user };
};

export const deleteUser = (id) => {
  return { type: DELETE_USER, payload: id };
};
