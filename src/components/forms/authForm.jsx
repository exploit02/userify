import React, { Fragment } from "react";
import { connect } from "react-redux";
import GetOtp from "./getOtp";
import VerifyOtp from "./verifyOtp";
import VerifyEmailRequest from "./verifyEmailRequest";
import VerifyEmailToken from "./verifyEmailToken";
import SignUp from "./signUp";

function AuthForm(props) {
    return <Fragment>{componentSelector(props.appStage)}</Fragment>;
}

function componentSelector(stage) {
    switch (stage) {
        case "GET_OTP":
            return <GetOtp />;
        case "VERIFY_OTP":
            return <VerifyOtp />;
        case "SUBMIT_EMAIL":
            return <VerifyEmailRequest />;
        case "VERIFY_EMAIL":
            return <VerifyEmailToken />;
        case "SIGN_UP":
            return <SignUp />;
        default:
            return <GetOtp />;
    }
}

const mapStateToProps = (state) => ({
    ...state.auth,
});

export default connect(mapStateToProps)(AuthForm);
