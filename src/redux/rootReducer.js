import { formatMs } from "@material-ui/core";
import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
});
