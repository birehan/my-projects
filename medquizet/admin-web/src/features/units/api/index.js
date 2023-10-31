import axios from "axios";
import { API_BASE_URL } from "../../../config";

axios.defaults.withCredentials = true;

const transport = axios.create({
  withCredentials: true,
});

export const getAllUnits = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/units`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createUnit = async (unit) => {
  try {
    const { data } = await transport.post(`${API_BASE_URL}/api/units`, unit);
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw new Error(error?.message);
    }
    throw new Error(error?.response?.data?.message);
  }
};

export const updateUnit = async (unit) => {
  try {
    const { data } = await transport.put(
      `${API_BASE_URL}/api/unit/${unit?.id}`,
      unit
    );
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw new Error(error?.message);
    }
    throw new Error(error?.response?.data?.message);
  }
};

export const deleteUnit = async (id) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/api/unit/${id}/`);
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw new Error(error?.message);
    }
    throw new Error(error?.response?.data?.message);
  }
};
