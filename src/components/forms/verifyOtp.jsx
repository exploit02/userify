import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { connect } from "react-redux";
import { verifyOtp } from "../../redux/auth/authActions";

function VerifyOtp({ verifyOtp, ...props }) {
    return (
        <Formik
            initialValues={{
                verificationCode: "",
                token: props.token,
                phoneNumber: props.phoneNumber,
            }}
            validationSchema={Yup.object({
                verificationCode: Yup.string().required(),
            })}
            onSubmit={async (values) => {
                console.log("VERIFY OTP ----------------");
                console.log(values);
                verifyOtp(values);
            }}
        >
            <Form>
                <Field
                    component={TextField}
                    variant="outlined"
                    color="primary"
                    name="verificationCode"
                    label="Enter OTP"
                    margin="normal"
                    fullWidth
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Verify OTP
                </Button>
            </Form>
        </Formik>
    );
}

const mapStateToProps = (state) => ({
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    verifyOtp: (data) => dispatch(verifyOtp(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
