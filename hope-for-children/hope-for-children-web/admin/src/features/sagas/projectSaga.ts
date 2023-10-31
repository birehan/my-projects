import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateProject, Project } from "../../types/types";
import {
  CreateProjectFailure,
  CreateProjectSuccess,
  DeleteProjectFailure,
  DeleteProjectSuccess,
  FetchAllProjectsFailure,
  FetchAllProjectsSuccess,
  GetProjectByIdFailure,
  GetProjectByIdSuccess,
  UpdateProjectFailure,
  UpdateProjectSuccess,
} from "../redux/projectSlice";
import Projects from "../../api/projects";

function* fetchAllProjects({}: PayloadAction<Project[]>): Generator<
  any,
  void,
  Project[]
> {
  try {
    const data = yield call(Projects.list);
    yield put(FetchAllProjectsSuccess(data));
  } catch (error) {
    yield put(FetchAllProjectsFailure("Something went wrong"));
  }
}

function* GetProjectById({
  payload: id,
}: PayloadAction<string>): Generator<any, void, Project> {
  try {
    const data = yield call(Projects.getDetail, id);
    yield put(GetProjectByIdSuccess(data));
  } catch (error) {
    yield put(GetProjectByIdFailure("Something went wrong"));
  }
}

function* createProject({
  payload: project,
}: PayloadAction<FormData>): Generator<any, void, Project> {
  try {
    const data = yield call(Projects.create, project);
    yield put(CreateProjectSuccess(data));
    console.log("success create project");
  } catch (error) {
    console.log("error: ", error);
    yield put(CreateProjectFailure("Something went wrong"));
  }
}

function* updateProject({
  payload: { formData, id },
}: PayloadAction<{ formData: FormData; id: string }>): Generator<
  any,
  void,
  Project
> {
  try {
    const data = yield call(Projects.update, formData, id); // Assuming Projects.update is your API call for updating Project
    yield put(UpdateProjectSuccess(data));
  } catch (error) {
    yield put(UpdateProjectFailure("Something went wrong! try again"));
  }
}

function* deleteProject({
  payload: id,
}: PayloadAction<string>): Generator<any, void, string> {
  try {
    const data = yield call(Projects.delete, id);
    yield put(DeleteProjectSuccess(data));
  } catch (error) {
    yield put(DeleteProjectFailure("Something went wrong"));
  }
}

export function* projectSaga() {
  yield takeLatest("projects/FetchAllProjects", fetchAllProjects);
  yield takeLatest("projects/CreateProjectAction", createProject);
  yield takeLatest("projects/GetProjectByIdAction", GetProjectById);
  yield takeLatest("projects/UpdateProjectAction", updateProject);
  yield takeLatest("projects/DeleteProjectAction", deleteProject);
}
