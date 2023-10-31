import axios from "axios";
import routes from "../Routes";

const transport = axios.create({});

const apiBaseUrl = process.env.REACT_APP_API_URL;

transport.interceptors.request.use(
  (config) => config,
  (error) => {
    routes.navigate("/error/500", {
      state: { path: routes.state.location.pathname },
    });
    return Promise.reject(error);
  }
);

const makeRequest = async (endpoint: string) => {
  const { data } = await transport.get(apiBaseUrl + endpoint, {});
  return data.value;
};

export const getProjects = async () => {
  return makeRequest("/projects");
};

export const getProjectDetail = async (payload: string) => {
  return makeRequest(`/projects/${payload}`);
};

export const getGalleries = async () => {
  return makeRequest("/categories");
};

export const getGalleryDetail = async (payload: string) => {
  return makeRequest(`/categories/${payload}`);
};

export const getAlumniStudents = async () => {
  return makeRequest("/Alumnis");
};

export const getStaffs = async (payload: string) => {
  return makeRequest(`/staffs/sector?sector=${payload}`);
};
