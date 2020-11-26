import {
    GET_OTP_REQUEST,
    GET_OTP_SUCCESS,
    GET_OTP_FAILURE,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    SUBMIT_EMAIL_REQUEST,
    SUBMIT_EMAIL_SUCCESS,
    SUBMIT_EMAIL_FAILURE,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    RESEND_OTP_REQUEST,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_FAILURE,
    RESEND_EMAIL_TOKEN_REQUEST,
    RESEND_EMAIL_TOKEN_SUCCESS,
    RESEND_EMAIL_TOKEN_FAILURE,
    START_OVER,
} from "./actionTypes";
import { enqueueSnackbar } from "../notification/notificationActions";
import { authService } from "../../services/authService";

const gettingOtp = () => ({
    type: GET_OTP_REQUEST,
});

const getOtpSuccess = (data) => ({
    type: GET_OTP_SUCCESS,
    payload: data,
});

const getOtpFailed = () => ({
    type: GET_OTP_FAILURE,
});

export const getOtp = (phoneNumber) => (dispatch) => {
    dispatch(gettingOtp());
    authService
        .getOtp(phoneNumber)
        .then((res) => {
            if (res.data.success) {
                dispatch(getOtpSuccess({ ...res.data.results, ...phoneNumber }));
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: GET_OTP_SUCCESS,
                            variant: "success",
                        },
                    })
                );
            } else {
                dispatch(getOtpFailed());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: GET_OTP_FAILURE,
                            variant: "warning",
                        },
                    })
                );
            }
        })
        .catch((err) => {
            dispatch(getOtpFailed());
            dispatch(
                enqueueSnackbar({
                    message:
                        (err.response && err.response.data && err.response.data.message) || "Something went wrong...!",
                    options: {
                        key: GET_OTP_FAILURE,
                        variant: "error",
                    },
                })
            );
        });
};

const verifyingOtp = () => ({
    type: VERIFY_OTP_REQUEST,
});

const otpVerified = (data) => ({
    type: VERIFY_OTP_SUCCESS,
    payload: data,
});

const otpVerificationFailed = (err) => ({
    type: VERIFY_OTP_FAILURE,
});

export const verifyOtp = (data) => (dispatch) => {
    dispatch(verifyingOtp());

    authService
        .verifyOtp(data)
        .then((res) => {
            if (res.data.success) {
                dispatch(otpVerified(res.data.results));
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: VERIFY_OTP_SUCCESS,
                            variant: "success",
                        },
                    })
                );
            } else {
                dispatch(otpVerificationFailed());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: VERIFY_OTP_FAILURE,
                            variant: "warning",
                        },
                    })
                );
            }
        })
        .catch((err) => {
            dispatch(otpVerificationFailed(err));
            dispatch(
                enqueueSnackbar({
                    message:
                        (err.response && err.response.data && err.response.data.message) || "Something went wrong...!",
                    options: {
                        key: VERIFY_OTP_FAILURE,
                        variant: "error",
                    },
                })
            );
        });
};

const submittingEmail = () => ({
    type: SUBMIT_EMAIL_REQUEST,
});

const emailSubmitted = (data) => ({
    type: SUBMIT_EMAIL_SUCCESS,
    payload: data,
});

const emailSubmissionFailed = (err) => ({
    type: SUBMIT_EMAIL_FAILURE,
});

export const submitEmail = (data) => (dispatch) => {
    dispatch(submittingEmail());

    authService
        .submitEmail(data)
        .then((res) => {
            if (res.data.success) {
                dispatch(emailSubmitted({ ...res.data.results, email: data.email }));
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: SUBMIT_EMAIL_SUCCESS,
                            variant: "success",
                        },
                    })
                );
            } else {
                dispatch(emailSubmissionFailed());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: SUBMIT_EMAIL_FAILURE,
                            variant: "warning",
                        },
                    })
                );
            }
        })
        .catch((err) => {
            dispatch(emailSubmissionFailed());
            dispatch(
                enqueueSnackbar({
                    message:
                        (err.response && err.response.data && err.response.data.message) || "Something went wrong...!",
                    options: {
                        key: SUBMIT_EMAIL_FAILURE,
                        variant: "error",
                    },
                })
            );
        });
};

const verifyingEmail = () => ({
    type: VERIFY_EMAIL_REQUEST,
});

const emailVerified = (data) => ({
    type: VERIFY_EMAIL_SUCCESS,
    payload: data,
});

const emailVerifictionFailed = (err) => ({
    type: VERIFY_EMAIL_FAILURE,
});

export const verifyEmail = (data) => (dispatch) => {
    dispatch(verifyingEmail());

    authService
        .verifyEmail(data)
        .then((res) => {
            if (res.data.success) {
                dispatch(emailVerified(res.data.results));
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: VERIFY_EMAIL_SUCCESS,
                            variant: "success",
                        },
                    })
                );
            } else {
                dispatch(emailVerifictionFailed());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: VERIFY_EMAIL_FAILURE,
                            variant: "warning",
                        },
                    })
                );
            }
        })
        .catch((err) => {
            dispatch(emailVerifictionFailed(err));
            dispatch(
                enqueueSnackbar({
                    message:
                        (err.response && err.response.data && err.response.data.message) || "Something went wrong...!",
                    options: {
                        key: VERIFY_EMAIL_FAILURE,
                        variant: "error",
                    },
                })
            );
        });
};

const signingUp = () => ({
    type: SIGN_UP_REQUEST,
});

const signedUp = (data) => ({
    type: SIGN_UP_SUCCESS,
    payload: data,
});

const signUpFailed = (err) => ({
    type: SIGN_UP_FAILURE,
});

export const signUp = (data) => (dispatch) => {
    dispatch(signingUp());

    authService
        .signUp(data)
        .then((res) => {
            if (res.data.success) {
                dispatch(signedUp(res.data.results));
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: SIGN_UP_SUCCESS,
                            variant: "success",
                        },
                    })
                );
            } else {
                dispatch(signUpFailed());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: SIGN_UP_FAILURE,
                            variant: "warning",
                        },
                    })
                );
            }
        })
        .catch((err) => {
            dispatch(signUpFailed());
            dispatch(
                enqueueSnackbar({
                    message:
                        (err.response && err.response.data && err.response.data.message) || "Something went wrong...!",
                    options: {
                        key: SIGN_UP_FAILURE,
                        variant: "error",
                    },
                })
            );
        });
};

const updatingProfile = () => ({
    type: UPDATE_PROFILE_REQUEST,
});

const profileUpdated = (data) => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: data,
});

const profileUpdationFailed = (err) => ({
    type: UPDATE_PROFILE_FAILURE,
});

export const updateProfile = (data) => (dispatch) => {
    dispatch(updatingProfile());

    authService
        .updateProfile(data)
        .then((res) => {
            console.log(res.data);
            if (res.data.success) {
                dispatch(profileUpdated(res.data.results));
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: UPDATE_PROFILE_SUCCESS,
                            variant: "success",
                        },
                    })
                );
            } else {
                dispatch(profileUpdationFailed());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: UPDATE_PROFILE_FAILURE,
                            variant: "warning",
                        },
                    })
                );
            }
        })
        .catch((err) => {
            dispatch(profileUpdationFailed());
            dispatch(
                enqueueSnackbar({
                    message:
                        (err.response && err.response.data && err.response.data.message) || "Something went wrong...!",
                    options: {
                        key: UPDATE_PROFILE_FAILURE,
                        variant: "error",
                    },
                })
            );
        });
};

const loggingOut = () => ({
    type: LOG_OUT_REQUEST,
});

const loggedOut = () => ({
    type: LOG_OUT_SUCCESS,
});

const logOutFailed = () => ({
    type: LOG_OUT_FAILURE,
});

export const logOut = () => (dispatch) => {
    dispatch(loggingOut());

    authService
        .logoutUser()
        .then((res) => {
            console.log(res);
            if (res.data.success) {
                dispatch(loggedOut());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: LOG_OUT_SUCCESS,
                            variant: "success",
                        },
                    })
                );
            } else {
                dispatch(logOutFailed());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: LOG_OUT_FAILURE,
                            variant: "warning",
                        },
                    })
                );
            }
        })
        .catch((err) => {
            dispatch(logOutFailed());
            dispatch(
                enqueueSnackbar({
                    message:
                        (err.response && err.response.data && err.response.data.message) || "Something went wrong...!",
                    options: {
                        key: LOG_OUT_FAILURE,
                        variant: "error",
                    },
                })
            );
        });
};

const resendingOtp = () => ({
    type: RESEND_OTP_REQUEST,
});

const resendOtpSuccess = () => ({
    type: RESEND_OTP_SUCCESS,
});

const resendingOtpFailed = () => ({
    type: RESEND_OTP_FAILURE,
});

export const resendOtp = (data) => (dispatch) => {
    dispatch(resendingOtp());

    authService
        .resendOtp(data)
        .then((res) => {
            console.log(res);
            if (res.data.success) {
                dispatch(resendOtpSuccess());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: RESEND_OTP_SUCCESS,
                            variant: "success",
                        },
                    })
                );
            } else {
                dispatch(resendingOtpFailed());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: RESEND_OTP_FAILURE,
                            variant: "warning",
                        },
                    })
                );
            }
        })
        .catch((err) => {
            dispatch(resendingOtpFailed());
            dispatch(
                enqueueSnackbar({
                    message:
                        (err.response && err.response.data && err.response.data.message) || "Something went wrong...!",
                    options: {
                        key: RESEND_OTP_FAILURE,
                        variant: "error",
                    },
                })
            );
        });
};

const resendingEmailToken = () => ({
    type: RESEND_EMAIL_TOKEN_REQUEST,
});

const resendEmailTokenSuccess = () => ({
    type: RESEND_EMAIL_TOKEN_SUCCESS,
});

const resendingEmailTokenFailed = () => ({
    type: RESEND_EMAIL_TOKEN_FAILURE,
});

export const resendEmailToken = (data) => (dispatch) => {
    dispatch(resendingEmailToken());

    authService
        .resendEmailToken(data)
        .then((res) => {
            console.log(res);
            if (res.data.success) {
                dispatch(resendEmailTokenSuccess());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: RESEND_EMAIL_TOKEN_SUCCESS,
                            variant: "success",
                        },
                    })
                );
            } else {
                dispatch(resendingEmailTokenFailed());
                dispatch(
                    enqueueSnackbar({
                        message: res.data.message,
                        options: {
                            key: RESEND_EMAIL_TOKEN_FAILURE,
                            variant: "warning",
                        },
                    })
                );
            }
        })
        .catch((err) => {
            dispatch(resendingEmailTokenFailed());
            dispatch(
                enqueueSnackbar({
                    message:
                        (err.response && err.response.data && err.response.data.message) || "Something went wrong...!",
                    options: {
                        key: RESEND_EMAIL_TOKEN_FAILURE,
                        variant: "error",
                    },
                })
            );
        });
};

export const startOver = () => (dispatch) => dispatch({ type: START_OVER });
