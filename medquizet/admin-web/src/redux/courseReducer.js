import * as types from "../constants/courseActionTypes.js";
const initialState = {
  courses: null,
  loading: false,
  success: false,
  failed: false,
  message: "",
  isCreate: false,
  isUpdate: false,
  isDelete: false,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COURSES:
      return {
        ...state,
        loading: true,
      };
    case types.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        loading: false,
        success: true,
      };
    case types.GET_COURSES_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
        courses: null,
      };

    // create course
    case types.CREATE_COURSE:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: [action.payload, ...state.courses],
        loading: false,
        success: true,
        isCreate: true,
      };
    case types.CREATE_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };

    // update course
    case types.UPDATE_COURSE:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: [
          action.payload,
          ...state.courses.filter((course) => course.id !== action.payload.id),
        ],

        loading: false,
        success: true,
        isUpdate: true,
      };
    case types.UPDATE_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };

    // delete course
    case types.DELETE_COURSE:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state?.courses?.filter(
          (course) => course?.id !== action?.payload?.id
        ),
        loading: false,
        success: true,
        isDelete: true,
      };
    case types.DELETE_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };
    case types.CLEAN_UP:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        isCreate: false,
        isUpdate: false,
        isDelete: false,
      };

    default:
      return state;
  }
};

export default courseReducer;
