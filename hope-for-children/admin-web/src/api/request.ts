import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../types/types";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const setUpAxiosIntercept = (user: any) => {
  axios.interceptors.request.use((config) => {
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  });
};
const responseBody = <T>(response: AxiosResponse<ApiResponse<T>>) =>
  response.data.value;

export const requests = {
  get: <T>(url: string) => axios.get<ApiResponse<T>>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<ApiResponse<T>>(url, body).then(responseBody),

  postFormData: <T>(url: string, formData: FormData) =>
    axios
      .post<ApiResponse<T>>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to form data
        },
      })
      .then(responseBody),

  putFormData: <T>(url: string, formData: FormData) =>
    axios
      .put<ApiResponse<T>>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to form data
        },
      })
      .then(responseBody),

  put: <T>(url: string, body: {}) =>
    axios.put<ApiResponse<T>>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<ApiResponse<T>>(url).then(responseBody),
};
