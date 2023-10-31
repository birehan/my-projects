import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Alumni } from "../../types/types";

export interface AlumniState {
  alumnis: Alumni[];
  alumni: Alumni | null;
  isLoading: boolean;
  error: string | null;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
}

const initialState: AlumniState = {
  alumnis: [],
  isLoading: false,
  error: null,
  alumni: null,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const alumnislice = createSlice({
  name: "Alumnis",
  initialState,
  reducers: {
    FetchAllAlumnis: (state) => {
      state.isLoading = true;
      state.error = null;
      state.alumnis = [];
    },
    FetchAllAlumnisSuccess: (state, action: PayloadAction<Alumni[]>) => {
      state.isLoading = false;
      state.alumnis = action.payload;
    },
    FetchAllAlumnisFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    GetAlumniByIdAction: (state, { payload: id }: PayloadAction<string>) => {
      state.isLoading = true;
      state.alumni = null;
    },

    GetAlumniByIdSuccess: (state, action: PayloadAction<Alumni>) => {
      state.isLoading = false;
      state.alumni = action.payload;
      state.error = "";
    },
    GetAlumniByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    CreateAlumniAction: (
      state,
      { payload: Alumni }: PayloadAction<FormData>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isCreateSuccess = false;
    },

    CreateAlumniSuccess: (state, action: PayloadAction<Alumni>) => {
      state.isLoading = false;
      state.alumnis = [...state.alumnis, action.payload];
      state.error = "";
      state.isCreateSuccess = true;
    },
    CreateAlumniFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isCreateSuccess = false;
    },

    UpdateAlumniAction: (
      state,
      { payload }: PayloadAction<{ formData: FormData; id: string }>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isUpdateSuccess = false;
    },

    UpdateAlumniSuccess: (state, action: PayloadAction<Alumni>) => {
      state.isLoading = false;
      state.alumni = action.payload;
      state.error = "";
      state.isUpdateSuccess = true;
      state.alumnis = state.alumnis.map((alumni) =>
        alumni.id === action.payload.id ? action.payload : alumni
      );
    },
    UpdateAlumniFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isUpdateSuccess = false;
    },

    DeleteAlumniAction: (state, { payload: id }: PayloadAction<string>) => {
      state.isDeleteSuccess = false;
      state.error = "";
    },

    DeleteAlumniSuccess: (state, action: PayloadAction<string>) => {
      state.alumnis = state.alumnis.filter(
        (Alumni: Alumni) => Alumni.id !== action.payload
      );
      state.error = "";
      state.isDeleteSuccess = true;
    },
    DeleteAlumniFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isDeleteSuccess = false;
    },

    CleanStatusAlumni: (state) => {
      state.isLoading = false;
      state.error = "";
      state.isCreateSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
      state.alumni = null;
    },

    CleanUpAlumni: (state) => {
      state.isLoading = false;
      state.error = "";
      state.isCreateSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
      state.alumni = null;
      state.alumnis = [];
    },
  },
});

export const {
  FetchAllAlumnis,
  FetchAllAlumnisSuccess,
  FetchAllAlumnisFailure,
  CreateAlumniAction,
  CreateAlumniSuccess,
  CreateAlumniFailure,
  UpdateAlumniAction,
  UpdateAlumniSuccess,
  UpdateAlumniFailure,
  GetAlumniByIdAction,
  GetAlumniByIdSuccess,
  GetAlumniByIdFailure,
  DeleteAlumniAction,
  DeleteAlumniSuccess,
  DeleteAlumniFailure,
  CleanUpAlumni,
  CleanStatusAlumni,
} = alumnislice.actions;
