import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RegisterUser, User } from "../../types/types";

export type userState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  users: User[];
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
};
const authInitialState: userState = {
  user: null,
  isLoading: false,
  error: "",
  users: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: authInitialState,
  reducers: {
    FetchAllUsers: (state) => {
      state.isLoading = true;
      state.error = null;
      state.users = [];
    },
    FetchAllusersSuccess: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    FetchAllusersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    GetUserByIdAction: (state, { payload: id }: PayloadAction<string>) => {
      state.isLoading = true;
      state.user = null;
    },

    GetUserByIdSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = "";
    },
    GetUserByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    UpdateUserAction: (state, { payload }: PayloadAction<{ user: User }>) => {
      state.isLoading = true;
      state.error = "";
      state.isUpdateSuccess = false;
    },

    UpdateUserSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = "";
      state.isUpdateSuccess = true;
      state.users = state.users.map((curUser) =>
        curUser.id === action.payload.id ? action.payload : curUser
      );
    },
    UpdateUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isUpdateSuccess = false;
    },

    CreateUserAction: (
      state: userState,
      { payload: user }: PayloadAction<RegisterUser>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isCreateSuccess = false;
    },

    CreateUserSuccessAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.users = [...state.users, action.payload];
      state.isCreateSuccess = true;
      state.isLoading = false;
    },

    CreateUserErrorAction: (
      state: userState,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = error;
      state.isCreateSuccess = false;
    },

    CleanStatusUsers: (state) => {
      state.isLoading = false;
      state.error = "";
      state.isCreateSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
    },

    DeleteUserAction: (state, { payload: id }: PayloadAction<string>) => {
      state.isDeleteSuccess = false;
      state.error = "";
    },

    DeleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (User: User) => User.userName !== action.payload
      );
      state.error = "";
      state.isDeleteSuccess = true;
    },
    DeleteUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isDeleteSuccess = false;
    },
  },
});
export const {
  FetchAllUsers,
  FetchAllusersSuccess,
  FetchAllusersFailure,

  GetUserByIdAction,
  GetUserByIdSuccess,
  GetUserByIdFailure,

  CreateUserAction,
  CreateUserSuccessAction,
  CreateUserErrorAction,

  UpdateUserAction,
  UpdateUserSuccess,
  UpdateUserFailure,

  DeleteUserAction,
  DeleteUserSuccess,
  DeleteUserFailure,

  CleanStatusUsers,
} = userSlice.actions;

export default userSlice;
