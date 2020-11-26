import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";
import { notificationReducer } from "./notification/notificationReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    notifier: notificationReducer,
});
