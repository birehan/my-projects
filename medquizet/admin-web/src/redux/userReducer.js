import * as types from "../constants/actionTypes.js";

const initialState = {
  currentUser: null,
  users: [],
  loading: false,
  success: false,
  failed: false,
  message: "",
  isCreate: false,
  isUpdate: false,
  isDelete: false,
  userCount: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case types.LOG_OUT:
      return {
        ...state,
        currentUser: null,
      };

    case types.FETCH_ALL_USER:
      return {
        ...state,
      };
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload?.admins,
        userCount: action.payload?.userCount,
        loading: false,
        success: true,
      };
    case types.FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
      };
    // Create user conditions
    case types.CREATE_USER:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
        success: true,
        isCreate: true,
        userCount: state.userCount + 1,
      };

    case types.CREATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
        message: action.payload.toString(),
      };

    case types.LOGIN_USER:
      return {
        ...state,
        loading: true,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        success: true,
        loading: false,
        failed: false,
        message: "",
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
        message: action.payload.toString(),
      };

    // Update employee conditions
    case types.UPDATE_USER:
      return {
        ...state,
        loading: true,
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        users: [
          action.payload,
          ...state.users.filter((user) => user?.id !== action.payload?.id),
        ],
        isUpdate: true,
      };
    case types.UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
        message: action.payload.toString(),
      };

    case types.UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
      };

    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        currentUser: action.payload,
        isUpdate: true,
      };
    case types.UPDATE_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
        message: action.payload.toString(),
      };

    // Delete employee
    case types.DELETE_USER:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        users: state?.users?.filter((user) => user?.id !== action.payload),
        isDelete: true,
        userCount: state.userCount - 1,
      };
    case types.DELETE_USER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
        message: action.payload.toString(),
      };

    default:
      return state;
  }
};

export default userReducer;
