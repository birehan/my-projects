import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gallery, GalleryDetail } from "../../types/types";

export interface GalleryState {
  galleries: Gallery[];
  gallery: GalleryDetail | null;
  isLoading: boolean;
  error: string | null;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
}

const initialState: GalleryState = {
  galleries: [],
  isLoading: false,
  error: null,
  gallery: null,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const galleryslice = createSlice({
  name: "Gallerys",
  initialState,
  reducers: {
    FetchAllGallerys: (state) => {
      state.isLoading = true;
      state.error = null;
      state.galleries = [];
    },
    FetchAllGallerysSuccess: (state, action: PayloadAction<Gallery[]>) => {
      state.isLoading = false;
      state.galleries = action.payload;
    },
    FetchAllGallerysFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    GetGalleryByIdAction: (state, { payload: id }: PayloadAction<string>) => {
      state.isLoading = true;
      state.gallery = null;
    },

    GetGalleryByIdSuccess: (state, action: PayloadAction<GalleryDetail>) => {
      state.isLoading = false;
      state.gallery = action.payload;
      state.error = "";
    },
    GetGalleryByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    CreateGalleryAction: (
      state,
      { payload: Gallery }: PayloadAction<FormData>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isCreateSuccess = false;
    },

    CreateGallerySuccess: (state, action: PayloadAction<Gallery>) => {
      state.isLoading = false;
      state.galleries = [...state.galleries, action.payload];
      state.error = "";
      state.isCreateSuccess = true;
    },
    CreateGalleryFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isCreateSuccess = false;
    },

    UpdateGalleryAction: (
      state,
      { payload }: PayloadAction<{ formData: FormData; id: string }>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isUpdateSuccess = false;
    },

    UpdateGallerySuccess: (state, action: PayloadAction<GalleryDetail>) => {
      state.isLoading = false;
      state.gallery = action.payload;
      state.error = "";
      state.isUpdateSuccess = true;
      state.galleries = state.galleries.map((alumni) =>
        alumni.id === action.payload.id ? action.payload : alumni
      );
    },
    UpdateGalleryFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isUpdateSuccess = false;
    },

    DeleteGalleryAction: (state, { payload: id }: PayloadAction<string>) => {
      state.isDeleteSuccess = false;
      state.error = "";
      state.isLoading = true;
    },

    DeleteGallerySuccess: (state, action: PayloadAction<string>) => {
      state.galleries = state.galleries.filter(
        (Gallery: Gallery) => Gallery.id !== action.payload
      );
      state.error = "";
      state.isDeleteSuccess = true;
    },
    DeleteGalleryFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isDeleteSuccess = false;
      state.isLoading = false;
    },

    CleanStatusGallery: (state) => {
      state.isLoading = false;
      state.error = "";
      state.isCreateSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
      state.gallery = null;
    },

    CleanUpGallery: (state) => {
      state.isLoading = false;
      state.error = "";
      state.isCreateSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
      state.gallery = null;
      state.galleries = [];
    },
  },
});

export const {
  FetchAllGallerys,
  FetchAllGallerysSuccess,
  FetchAllGallerysFailure,
  CreateGalleryAction,
  CreateGallerySuccess,
  CreateGalleryFailure,
  UpdateGalleryAction,
  UpdateGallerySuccess,
  UpdateGalleryFailure,
  GetGalleryByIdAction,
  GetGalleryByIdSuccess,
  GetGalleryByIdFailure,
  DeleteGalleryAction,
  DeleteGallerySuccess,
  DeleteGalleryFailure,
  CleanUpGallery,
  CleanStatusGallery,
} = galleryslice.actions;
