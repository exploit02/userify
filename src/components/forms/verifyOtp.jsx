import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { connect } from "react-redux";
import { verifyOtp, resendOtp } from "../../redux/auth/authActions";

function VerifyOtp({ verifyOtp, resendOtp, token, phoneNumber }) {
    return (
        <Formik
            initialValues={{
                verificationCode: "",
                token: token,
                phoneNumber: phoneNumber,
            }}
            validationSchema={Yup.object({
                verificationCode: Yup.string().required("OTP is required"),
            })}
            onSubmit={async (values) => {
                verifyOtp(values);
            }}
        >
            <Form>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                        <Field
                            component={TextField}
                            variant="outlined"
                            color="primary"
                            name="verificationCode"
                            label="Enter OTP"
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Verify OTP
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="items-end">
                        <Button variant="text" onClick={() => resendOtp({ token, phoneNumber })}>
                            Resend OTP
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
}

const mapStateToProps = (state) => ({
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    verifyOtp: (data) => dispatch(verifyOtp(data)),
    resendOtp: (data) => dispatch(resendOtp(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
