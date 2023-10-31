import authSlice from "./authSlice";
import { projectSlice } from "./projectSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { staffslice } from "./staffSlice";
import { alumnislice } from "./alumniSlice";
import { galleryslice } from "./gallerySlice";
import { userSlice } from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  projects: projectSlice.reducer,
  staffs: staffslice.reducer,
  alumnis: alumnislice.reducer,
  galleries: galleryslice.reducer,
  users: userSlice.reducer,
});
const rootReducers = persistReducer(persistConfig, rootReducer);

export default rootReducers;
