import axios from "axios";
import { API_BASE_URL } from "../../../config";

axios.defaults.withCredentials = true;

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/login`, user);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error?.response?.data?.message);
    }
  }
};

export const logout = async () => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/api/logout`);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error?.response?.data?.message);
    }
  }
};
export const getUsers = async () => {
  try {
    const { data } = await axios.get(API_BASE_URL + "/api/adminUsers");
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};
export const createUser = async (user) => {
  try {
    const { data } = await axios.post(API_BASE_URL + "/api/adminUsers", user);
    return data;
  } catch (error) {
    const message = error?.response?.data?.message;
    if (message === "email must be unique") {
      throw new Error("Email address already in use!");
    } else {
      throw new Error(message || error?.message);
    }
  }
};

export const updateUser = async (user) => {
  try {
    const { data } = await axios.patch(
      `${API_BASE_URL}/api/adminUsers/${user?.id}`,
      user
    );
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};

export const updateProfile = async (user) => {
  try {
    const { data } = await axios.patch(
      `${API_BASE_URL}/api/users/${user?.id}`,
      user
    );
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/adminUsers/${id}/`);
    return id;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};
