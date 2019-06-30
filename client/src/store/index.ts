import { RootAction, RootState } from "MyTypes";
import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";

import rootReducer from "./root-reducer";
import rootEpic from "./root-epic";

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

const middlewares = [epicMiddleware];
const enhancer = compose(applyMiddleware(...middlewares));

const initialState = {};
const store = createStore(rootReducer, initialState, enhancer);

epicMiddleware.run(rootEpic);

export default store;
