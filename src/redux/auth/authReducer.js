import {
    GET_OTP_SUCCESS,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    SUBMIT_EMAIL_SUCCESS,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILURE,
    SIGN_UP_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    LOG_OUT_SUCCESS,
    START_OVER,
} from "./actionTypes";

const initState = {
    appStage: "GET_OTP",
    isOtpVerified: false,
    source: "WEB_APP",
};
export const authReducer = (state = initState, action) => {
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
                isOtpVerified: true,
                appStage: state.isLogin ? "USER" : "SUBMIT_EMAIL",
            };
        case VERIFY_OTP_FAILURE:
            return {
                ...state,
                ...action.payload,
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
        case VERIFY_EMAIL_FAILURE:
            return {
                ...state,
                ...action.payload,
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                ...action.payload,
                appStage: "USER",
                isLogin: true,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                user: { ...state.user, ...action.payload.user },
            };
        case LOG_OUT_SUCCESS:
            return {
                appStage: "GET_OTP",
                isOtpVerified: false,
                source: "WEB_APP",
            };
        case START_OVER:
            return {
                appStage: "GET_OTP",
                isOtpVerified: false,
                source: "WEB_APP",
            };
        default:
            return state;
    }
};
