import React, { Fragment } from "react";
import { connect } from "react-redux";
import GetOtp from "./forms/getOtp";
import VerifyOtp from "./forms/verifyOtp";
import VerifyEmailRequest from "./forms/verifyEmailRequest";
import VerifyEmailToken from "./forms/verifyEmailToken";
import SignUp from "./forms/signUp";

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
