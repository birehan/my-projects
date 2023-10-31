import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { Gallery, GalleryDetail } from "../../types/types";

import {
  CreateGalleryFailure,
  CreateGallerySuccess,
  DeleteGalleryFailure,
  DeleteGallerySuccess,
  FetchAllGallerysFailure,
  FetchAllGallerysSuccess,
  GetGalleryByIdFailure,
  GetGalleryByIdSuccess,
  UpdateGalleryFailure,
  UpdateGallerySuccess,
} from "../redux/gallerySlice";
import Galleries from "../../api/galleries";

function* fetchAllGallerys({}: PayloadAction<Gallery[]>): Generator<
  any,
  void,
  Gallery[]
> {
  try {
    const data = yield call(Galleries.list);
    yield put(FetchAllGallerysSuccess(data));
  } catch (error) {
    yield put(FetchAllGallerysFailure("Something went wrong"));
  }
}

function* GetGalleryById({
  payload: id,
}: PayloadAction<string>): Generator<any, void, GalleryDetail> {
  try {
    const data = yield call(Galleries.getDetail, id);
    yield put(GetGalleryByIdSuccess(data));
  } catch (error) {
    yield put(GetGalleryByIdFailure("Something went wrong"));
  }
}

function* createGallery({
  payload: Gallery,
}: PayloadAction<FormData>): Generator<any, void, Gallery> {
  try {
    const data = yield call(Galleries.create, Gallery);
    yield put(CreateGallerySuccess(data));
  } catch (error) {
    console.log("eror: ", error);

    yield put(CreateGalleryFailure("Something went wrong! try again"));
  }
}

function* updateGallery({
  payload: { formData, id },
}: PayloadAction<{ formData: FormData; id: string }>): Generator<
  any,
  void,
  GalleryDetail
> {
  try {
    const data = yield call(Galleries.update, formData, id); // Assuming Gallerys.update is your API call for updating Gallery
    yield put(UpdateGallerySuccess(data));
  } catch (error) {
    yield put(UpdateGalleryFailure("Something went wrong! try again"));
  }
}

function* deleteGallery({
  payload: id,
}: PayloadAction<string>): Generator<any, void, string> {
  try {
    const data = yield call(Galleries.delete, id);
    yield put(DeleteGallerySuccess(data));
  } catch (error) {
    console.log("eror: ", error);

    yield put(DeleteGalleryFailure("Something went wrong"));
  }
}

export function* gallerySaga() {
  yield takeLatest("Gallerys/FetchAllGallerys", fetchAllGallerys);
  yield takeLatest("Gallerys/CreateGalleryAction", createGallery);
  yield takeLatest("Gallerys/GetGalleryByIdAction", GetGalleryById);
  yield takeLatest("Gallerys/UpdateGalleryAction", updateGallery);
  yield takeLatest("Gallerys/DeleteGalleryAction", deleteGallery);
}
