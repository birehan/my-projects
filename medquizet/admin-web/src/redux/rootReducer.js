import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import users from "./userReducer.js";
import courses from "./courseReducer.js";
import units from "./unitReducer.js";
import questions from "./questionReducer.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "courses", "units", "questions"],
};

const rootReducer = combineReducers({
  users,
  courses,
  units,
  questions,
  
});
const reducers = persistReducer(persistConfig, rootReducer);

export default reducers;
