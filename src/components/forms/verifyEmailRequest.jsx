import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { connect } from "react-redux";
import { submitEmail } from "../../redux/auth/authActions";

function VerifyEmailRequest({ submitEmail, token, phoneNumber, ...props }) {
    return (
        <Formik
            initialValues={{
                email: "",
                token: token,
                phoneNumber: phoneNumber,
            }}
            validationSchema={Yup.object({
                email: Yup.string().required("Email is required").email("Email is not valid"),
            })}
            onSubmit={async (values, helpers) => {
                console.log("Email submit ----------------");
                console.log(values, helpers);
                submitEmail(values);
            }}
        >
            <Form>
                <Field
                    component={TextField}
                    variant="outlined"
                    color="primary"
                    name="email"
                    label="Email"
                    type="email"
                    margin="normal"
                    fullWidth
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Request Email Verification
                </Button>
            </Form>
        </Formik>
    );
}

const mapStateToProps = (state) => ({
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    submitEmail: (data) => dispatch(submitEmail(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailRequest);
