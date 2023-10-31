import * as types from "../api/actionTypes";

const initialState = {
  alumnis: [],
  galleries: [],
  staffs: [],
  projects: [],
  gallery: null,
  project: null,
  loading: false,
  success: false,
  failed: false,
  message: "",
};

const reducer = (state = initialState, action: any): typeof initialState => {
  switch (action.type) {
    case types.GET_ALUMNI:
    case types.GET_GALLERY:
    case types.GET_GALLERY_DETAIL:
    case types.GET_PROJECT_DETAIL:
    case types.GET_PROJECTS:
    case types.GET_STAFFS:
      return {
        ...state,
        loading: true,
        message: "",
        success: false,
      };
    case types.REQUEST_SUCCESS:
      return {
        ...state,
        [action.type === types.REQUEST_SUCCESS ? action.payload.dataType : ""]:
          action.payload.data,
        loading: false,
        success: true,
      };
    case types.REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
