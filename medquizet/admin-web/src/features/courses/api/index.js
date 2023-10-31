import axios from "axios";
import { API_BASE_URL } from "../../../config";

axios.defaults.withCredentials = true;
const transport = axios.create({
  withCredentials: true,
});

const config = {
  withCredentials: true,
};

export const getCourses = async () => {
  try {
    const { data } = await axios.get(API_BASE_URL + "/api/courses");
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
};
export const createCourse = async (formdata) => {
  try {
    const { data } = await transport.post(
      `${API_BASE_URL}/api/courses`,
      formdata,
      config
    );
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw new Error(error?.message);
    }
    throw new Error(error?.response?.data?.message);
  }
};

export const updateCourse = async (course) => {
  try {
    const { data } = await transport.put(
      `${API_BASE_URL}/api/course/${course.get("id")}`,
      course,
      config
    );
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw new Error(error?.message);
    }
    throw new Error(error?.response?.data?.message);
  }
};

export const deleteCourse = async (id) => {
  try {
    const { data } = await transport.delete(`${API_BASE_URL}/api/course/${id}`);
    return data;
  } catch (error) {
    if (error?.message === "Network Error") {
      throw new Error(error?.message);
    }
    throw new Error(error?.response?.data?.message);
  }
};
