import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import reducers from "./rootReducer";
import { createLogger } from "redux-logger"; // Import the createLogger function

const loggerMiddleware = createLogger(); // Create the logger middleware
const sagaMiddleWare = createSagaMiddleware();

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(loggerMiddleware);
}

middlewares.push(sagaMiddleWare);

export const store = createStore(reducers, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

sagaMiddleWare.run(rootSaga);
