import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../types/types";

export interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
  project: Project | null;
}

const initialState: ProjectState = {
  projects: [],
  isLoading: false,
  error: null,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
  project: null,
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    FetchAllProjects: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    FetchAllProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
      state.isLoading = false;
      state.projects = action.payload;
    },
    FetchAllProjectsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    GetProjectByIdAction: (state, { payload: id }: PayloadAction<string>) => {
      state.isLoading = true;
      state.project = null;
    },

    GetProjectByIdSuccess: (state, action: PayloadAction<Project>) => {
      state.isLoading = false;
      state.project = action.payload;
      state.error = "";
    },
    GetProjectByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    CreateProjectAction: (
      state,
      { payload: project }: PayloadAction<FormData>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isCreateSuccess = false;
    },

    CreateProjectSuccess: (state, action: PayloadAction<Project>) => {
      state.isLoading = false;
      state.projects = [...state.projects, action.payload];

      state.error = "";
      state.isCreateSuccess = true;
    },
    CreateProjectFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isCreateSuccess = false;
    },

    UpdateProjectAction: (
      state,
      { payload }: PayloadAction<{ formData: FormData; id: string }>
    ) => {
      state.isLoading = true;
      state.error = "";
      state.isUpdateSuccess = false;
    },

    UpdateProjectSuccess: (state, action: PayloadAction<Project>) => {
      state.isLoading = false;
      state.project = action.payload;
      state.error = "";
      state.isUpdateSuccess = true;
      state.projects = state.projects.map((cur) =>
        cur.id === action.payload.id ? action.payload : cur
      );
    },
    UpdateProjectFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isUpdateSuccess = false;
    },

    DeleteProjectAction: (state, { payload: id }: PayloadAction<string>) => {
      state.isDeleteSuccess = false;
      state.error = "";
      state.isLoading = true;
    },

    DeleteProjectSuccess: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (Project: Project) => Project.id !== action.payload
      );
      state.error = "";
      state.isDeleteSuccess = true;
    },
    DeleteProjectFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isDeleteSuccess = false;
      state.isLoading = false;
    },

    CleanStatusProject: (state) => {
      state.isLoading = false;
      state.error = "";
      state.isCreateSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
      state.project = null;
    },

    CleanUpProject: (state) => {
      state.isLoading = false;
      state.error = "";
      state.isCreateSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
      state.project = null;
      state.projects = [];
    },
  },
});

export const {
  FetchAllProjects,
  FetchAllProjectsSuccess,
  FetchAllProjectsFailure,

  GetProjectByIdAction,
  GetProjectByIdSuccess,
  GetProjectByIdFailure,

  CreateProjectAction,
  CreateProjectSuccess,
  CreateProjectFailure,

  UpdateProjectAction,
  UpdateProjectSuccess,
  UpdateProjectFailure,

  DeleteProjectAction,
  DeleteProjectSuccess,
  DeleteProjectFailure,

  CleanStatusProject,
  CleanUpProject,
} = projectSlice.actions;
