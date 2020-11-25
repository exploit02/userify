import {
    GET_OTP_SUCCESS,
    VERIFY_OTP_SUCCESS,
    SUBMIT_EMAIL_SUCCESS,
    VERIFY_EMAIL_SUCCESS,
    SIGN_UP_SUCCESS,
} from "./actionTypes";

const initState = {
    appStage: "GET_OTP",
    source: "WEB_APP",
};
export const authReducer = (state = initState, action) => {
    console.log("in reducer--------");
    console.log(action);
    switch (action.type) {
        case GET_OTP_SUCCESS:
            return {
                ...state,
                ...action.payload,
                appStage: "VERIFY_OTP",
            };
        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                ...action.payload,
                appStage: state.isLogin ? "USER" : "SUBMIT_EMAIL",
            };
        case SUBMIT_EMAIL_SUCCESS:
            return {
                ...state,
                ...action.payload,
                appStage: "VERIFY_EMAIL",
            };
        case VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                ...action.payload,
                appStage: "SIGN_UP",
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                ...action.payload,
                appStage: "USER",
            };
        default:
            return state;
    }
};
