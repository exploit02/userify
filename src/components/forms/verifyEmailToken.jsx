import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { connect } from "react-redux";
import { verifyEmail, resendEmailToken } from "../../redux/auth/authActions";

function VerifyEmail({ verifyEmail, email, token, resendEmailToken }) {
    return (
        <Formik
            initialValues={{
                verificationToken: "",
                email: email,
                token: token.toString(),
            }}
            validationSchema={Yup.object({
                verificationToken: Yup.string().required("Email Token is required"),
            })}
            onSubmit={async (values, helpers) => {
                verifyEmail(values);
            }}
        >
            <Form>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                        <Field
                            component={TextField}
                            variant="outlined"
                            color="primary"
                            name="verificationToken"
                            label="Email Token"
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Verify Email Token
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="items-end">
                        <Button variant="text" onClick={() => resendEmailToken({ token: token.toString(), email })}>
                            Resend Email Token
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
    verifyEmail: (data) => dispatch(verifyEmail(data)),
    resendEmailToken: (data) => dispatch(resendEmailToken(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
