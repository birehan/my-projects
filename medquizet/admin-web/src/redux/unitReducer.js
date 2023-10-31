import * as types from "../constants/unitActionTypes.js";
const initialState = {
  units: null,
  loading: false,
  success: false,
  failed: false,
  message: "",
  isCreate: false,
  isUpdate: false,
  isDelete: false,
};

const unitReducer = (state = initialState, action) => {
  switch (action.type) {
    // get courses
    case types.GET_ALL_UNITS:
      return {
        ...state,
      };
    case types.GET_ALL_UNITS_SUCCESS:
      return {
        ...state,
        units: action.payload,
        loading: false,
        success: true,
      };
    case types.GET_ALL_UNITS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };

    // create course
    case types.CREATE_UNIT:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_UNIT_SUCCESS:
      return {
        ...state,
        units: [action.payload, ...state.units],
        loading: false,
        success: true,
        isCreate: true,
        message: "",
      };
    case types.CREATE_UNIT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };

    // update course
    case types.UPDATE_UNIT:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_UNIT_SUCCESS:
      return {
        ...state,
        loading: false,
        units: [
          action.payload,
          ...state.units.filter((unit) => unit?.id !== action.payload?.id),
        ],

        success: true,
        isUpdate: true,
        message: "",
      };
    case types.UPDATE_UNIT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };

    // delete course
    case types.DELETE_UNIT:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_UNIT_SUCCESS:
      return {
        ...state,
        units: state?.units?.filter((unit) => unit?.id !== action?.payload?.id),
        loading: false,
        success: true,
        isDelete: true,
        message: "",
      };
    case types.DELETE_UNIT_FAILED:
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

    // get courses

    default:
      return state;
  }
};

export default unitReducer;
