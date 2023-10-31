import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducers";
import rootSaga from "../sagas/rootSaga";
import { createLogger } from "redux-logger"; // Import the createLogger function
import { persistStore } from "redux-persist";

const loggerMiddleware = createLogger(); // Create the logger middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [];
middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV === "development") {
  middlewares.push(loggerMiddleware);
}

export const store = configureStore({
  reducer: rootReducers,
  middleware: middlewares,
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
