import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

const initialState = {};
const middlewares = [thunk];
let devtools = (x) => x;

if (process.env.NODE_ENV !== "production" && process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

export const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares), devtools));
