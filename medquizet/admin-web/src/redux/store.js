import { createStore, applyMiddleware } from "redux";
import reducers from "./rootReducer.js";
import rootSaga from "../sagas/index.js";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();
const middlewares = [sagaMiddleWare, logger];

export const store = createStore(reducers, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

sagaMiddleWare.run(rootSaga);
