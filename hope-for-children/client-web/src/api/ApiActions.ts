import * as constants from "./actionTypes";

export const getProjects = () => {
  return { type: constants.GET_PROJECTS };
};
export const getProjectDetail = (payload: string | undefined) => {
  return { type: constants.GET_PROJECT_DETAIL, payload: payload };
};

export const getGalleries = () => {
  return { type: constants.GET_GALLERY };
};
export const getGalleryDetail = (payload: string | undefined) => {
  return { type: constants.GET_GALLERY_DETAIL, payload: payload };
};

export const getAlumniStudents = () => {
  return { type: constants.GET_ALUMNI };
};

export const getStaffs = (payload: string | undefined) => {
  return { type: constants.GET_STAFFS, payload: payload };
};
