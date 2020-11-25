import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { connect } from "react-redux";
import { verifyEmail } from "../../redux/auth/authActions";

function VerifyEmail({ verifyEmail, email, token, ...props }) {
    return (
        <Formik
            initialValues={{
                verificationToken: "",
                email: email,
                token: token.toString(),
            }}
            validationSchema={Yup.object({
                email: Yup.string().required("Email is required").email("Email is not valid"),
            })}
            onSubmit={async (values, helpers) => {
                console.log(values, helpers);
                verifyEmail(values);
            }}
        >
            <Form>
                <Field
                    component={TextField}
                    variant="outlined"
                    color="primary"
                    name="verificationToken"
                    label="Email Token"
                    margin="normal"
                    fullWidth
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Verify Email Token
                </Button>
            </Form>
        </Formik>
    );
}

const mapStateToProps = (state) => ({
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    verifyEmail: (data) => dispatch(verifyEmail(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
