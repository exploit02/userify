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
} from "./actionTypes";
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
            dispatch(getOtpSuccess({ ...res.data.results, ...phoneNumber }));
        })
        .catch((err) => {
            dispatch(getOtpFailed());
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
            } else {
                dispatch(otpVerificationFailed());
            }
        })
        .catch((err) => dispatch(otpVerificationFailed(err)));
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
            }
        })
        .catch((err) => dispatch(emailSubmissionFailed(err)));
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
            } else {
                dispatch(emailVerifictionFailed());
            }
        })
        .catch((err) => dispatch(emailVerifictionFailed(err)));
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
            } else {
                dispatch(signUpFailed());
            }
        })
        .catch((err) => dispatch(signUpFailed()));
};
