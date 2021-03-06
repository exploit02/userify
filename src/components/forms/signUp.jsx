import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid, Typography, Popover } from "@material-ui/core";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import * as Yup from "yup";
import { connect } from "react-redux";
import { signUp } from "../../redux/auth/authActions";
import { authService } from "../../services/authService";
import { makeStyles } from "@material-ui/core/styles";
import ReferralDetails from "../../components/referral/referralDetails";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: "none",
    },
    paper: {
        padding: theme.spacing(1),
    },
    referralMessage: {
        fontSize: "0.75rem",
        fontWeight: 400,
    },
}));

function SignUp({ signup, email, phoneNumber, token, source, ...props }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [referral, setReferral] = useState({});

    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const validateReferralCode = async (code) => {
        if (!code) {
            return true;
        }
        return new Promise((resolve, reject) => {
            authService
                .checkReferralCode(code)
                .then((res) => {
                    if (res.data.success) {
                        resolve(true);
                        setReferral(res.data.results);
                    } else {
                        resolve(false);
                        setReferral({});
                    }
                })
                .catch((err) => {
                    resolve(false);
                    setReferral({});
                });
        });
    };
    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                referredCodeKey: "",
                agreeToPrivacyPolicy: false,
                email: email,
                phoneNumber: phoneNumber,
                token: token,
                source: source,
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First Name is required"),
                lastName: Yup.string().max(50, "Too Long!"),
                referredCodeKey: Yup.string().test(
                    "validReferredCodeKey",
                    "Invalid Referral Code",
                    validateReferralCode
                ),

                agreeToPrivacyPolicy: Yup.boolean().required("The terms and conditions must be accepted."),
            })}
            onSubmit={async (values, helpers) => {
                signup(values);
            }}
        >
            <Form>
                <Field
                    component={TextField}
                    variant="outlined"
                    color="primary"
                    name="firstName"
                    label="First Name"
                    margin="normal"
                    fullWidth
                />
                <Field
                    component={TextField}
                    variant="outlined"
                    color="primary"
                    name="lastName"
                    label="Last Name"
                    margin="normal"
                    fullWidth
                />
                <Field
                    component={TextField}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    color="primary"
                    name="phoneNumber"
                    label="Phone Number"
                    margin="normal"
                    fullWidth
                />
                <Field
                    component={TextField}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    color="primary"
                    name="email"
                    label="Email"
                    margin="normal"
                    fullWidth
                />
                <Field
                    component={TextField}
                    variant="outlined"
                    color="primary"
                    name="referredCodeKey"
                    label="Referral Key"
                    margin="normal"
                    fullWidth
                    onBlurValidate={false}
                />
                {Object.keys(referral).length !== 0 && referral.constructor === Object && (
                    <Grid
                        container
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        alignItems="center"
                    >
                        <Grid item xs={11} sm={11} md={11}>
                            <Typography className={classes.referralMessage} color="primary">
                                {referral.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1}>
                            <ContactSupportOutlinedIcon style={{ fontSize: 16 }} color="secondary" />
                            <Popover
                                id="mouse-over-popover"
                                className={classes.popover}
                                classes={{
                                    paper: classes.paper,
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <ReferralDetails data={referral} />
                            </Popover>
                        </Grid>
                    </Grid>
                )}
                <Field
                    component={CheckboxWithLabel}
                    name="agreeToPrivacyPolicy"
                    Label={{ label: "Accept Terms & Conditions" }}
                />

                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Sign Up
                </Button>
            </Form>
        </Formik>
    );
}

const mapStateToProps = (state) => ({
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    signup: (data) => dispatch(signUp(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
