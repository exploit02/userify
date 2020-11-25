import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, InputAdornment } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { connect } from "react-redux";
import { getOtp } from "../../redux/auth/authActions";

function GetOtp({ getOtp, ...props }) {
    return (
        <Formik
            initialValues={{
                phoneNumber: "",
            }}
            validationSchema={Yup.object({
                phoneNumber: Yup.string()
                    .required("Phone number is required")
                    .matches(/^[6789]\d{9}$/, "Phone number is not valid"),
            })}
            onSubmit={async (values, helpers) => {
                getOtp(values);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field
                        component={TextField}
                        variant="outlined"
                        color="primary"
                        name="phoneNumber"
                        label="Mobile Number"
                        margin="normal"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+91 | </InputAdornment>,
                        }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth disabled={isSubmitting}>
                        Get OTP
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getOtp: (phoneNumber) => dispatch(getOtp(phoneNumber)),
});

export default connect(null, mapDispatchToProps)(GetOtp);
