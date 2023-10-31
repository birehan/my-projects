import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Staff } from "../../types/types";

export interface StaffState {
  staffs: Staff[];
  staff: Staff | null;
  isLoading: boolean;
  error: string | null;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
}

const initialState: StaffState = {
  staff: null,
  staffs: [],
  isLoading: false,
  error: null,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const staffslice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    FetchAllstaffs: (state) => {
      state.isLoading = true;
      state.error = null;
      state.staffs = [];
    },
    FetchAllstaffsSuccess: (state, action: PayloadAction<Staff[]>) => {
      state.isLoading = false;
      state.staffs = action.payload;
    },
    FetchAllstaffsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    GetStaffDetailAction: (
      state,
      { payload: staffType }: PayloadAction<string>
    ) => {
      state.isLoading = true;
      state.staffs = [];
    },

    GetStaffDetailSuccess: (state, action: PayloadAction<Staff[]>) => {
      state.isLoading = false;
      state.staffs = action.payload;
      state.error = "";
    },
    GetStaffDetailFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    GetStaffByIdAction: (state, { payload: id }: PayloadAction<string>) => {
      state.isLoading = true;
      state.staff = null;
    },

    GetStaffByIdSuccess: (state, action: PayloadAction<Staff>) => {
      state.isLoading = false;
      state.staff = action.payload;
      state.error = "";
    },
    GetStaffByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    CreateStaffAction: (state, { payload: Staff }: PayloadAction<FormData>) => {
      state.isLoading = true;
      state.error = "";
      state.isCreateSuccess = false;
    },

    CreateStaffSuccess: (state, action: PayloadAction<Staff>) => {
      state.isLoading = false;
      state.staffs = [...state.staffs, action.payload];
      state.error = "";
      state.isCreateSuccess = true;
    },
    CreateStaffFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isCreateSuccess = false;
    },

    UpdateStaffAction: (
      state,
      { payload }: PayloadAction<{ formData: FormData; id: string }>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isUpdateSuccess = false;
    },

    UpdateStaffSuccess: (state, action: PayloadAction<Staff>) => {
      state.isLoading = false;
      state.staff = action.payload;
      state.error = "";
      state.isUpdateSuccess = true;
      state.staffs = state.staffs.map((alumni) =>
        alumni.id === action.payload.id ? action.payload : alumni
      );
    },
    UpdateStaffFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isUpdateSuccess = false;
    },

    DeleteStaffAction: (state, { payload: id }: PayloadAction<string>) => {
      state.isDeleteSuccess = false;
      state.error = "";
    },

    DeleteStaffSuccess: (state, action: PayloadAction<string>) => {
      state.staffs = state.staffs.filter(
        (staff: Staff) => staff.id !== action.payload
      );
      state.error = "";
      state.isDeleteSuccess = true;
    },
    DeleteStaffFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isDeleteSuccess = false;
    },

    CleanUpStaff: (state) => {
      state.isLoading = false;
      state.error = "";
      state.isCreateSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
      state.staff = null;
      state.staffs = [];
    },

    CleanUpStatusStaff: (state) => {
      state.isLoading = false;
      state.error = "";
      state.isCreateSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
    },
  },
});

export const {
  FetchAllstaffs,
  FetchAllstaffsSuccess,
  FetchAllstaffsFailure,
  GetStaffDetailAction,
  GetStaffDetailSuccess,
  GetStaffDetailFailure,
  CreateStaffAction,
  CreateStaffSuccess,
  CreateStaffFailure,
  UpdateStaffAction,
  UpdateStaffSuccess,
  UpdateStaffFailure,
  GetStaffByIdAction,
  GetStaffByIdSuccess,
  GetStaffByIdFailure,
  DeleteStaffAction,
  DeleteStaffSuccess,
  DeleteStaffFailure,
  CleanUpStaff,
  CleanUpStatusStaff,
} = staffslice.actions;
