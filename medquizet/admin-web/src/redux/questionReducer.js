import * as types from "../constants/questionsActionTypes.js";

const initialState = {
  questions: [],
  loading: false,
  success: false,
  failed: false,
  message: "",
  question: null,
  isCreate: false,
  isUpdate: false,
  isDelete: false,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUESTIONS:
      return {
        ...state,
      };
    case types.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
        success: true,
      };
    case types.GET_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };

    case types.GET_QUESTIONS_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case types.GET_QUESTIONS_BY_ID_SUCCESS:
      return {
        ...state,
        question: action.payload,
        loading: false,
        success: true,
      };
    case types.GET_QUESTIONS_BY_ID_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };

    // create course
    case types.CREATE_QUESTIONS:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
        loading: false,
        success: true,
        message: "",
        isCreate: true,
      };
    case types.CREATE_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };

    // update course
    case types.UPDATE_QUESTIONS:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.id === parseInt(action.payload?.id)
            ? parseInt(action.payload)
            : question
        ),
        loading: false,
        success: true,
        message: "",
        isUpdate: true,
      };
    case types.UPDATE_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };

    // delete course
    case types.DELETE_QUESTIONS:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_QUESTIONS_SUCCESS:
      return {
        ...state,

        questions: state?.questions?.filter(
          (quest) => parseInt(quest?.id) !== parseInt(action?.payload?.id)
        ),
        loading: false,
        success: true,
      };
    case types.DELETE_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.toString(),
      };

    case types.CLEAN_UP_QUESTIONS:
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

export default questionReducer;
