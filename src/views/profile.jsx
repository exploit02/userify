import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

import Card from "../components/card/card";
import CardHeader from "../components/card/cardHeader";
import CardAvatar from "../components/card/cardAvatar";
import CardBody from "../components/card/cardBody";
import CardFooter from "../components/card/cardFooter";
import { Grid, Button, ThemeProvider, Typography, Box, Container } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import avatar from "../assets/avatar.webp";
import { connect } from "react-redux";
import { updateProfile, logOut } from "../redux/auth/authActions";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(12),
    },
    gridItem: {
        padding: "0 15px !important",
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
    buttonRound: {
        borderRadius: theme.spacing(3),
    },
}));

function UserProfile({ firstName, lastName, referralToken, updateProfile, logOut }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={12} md={8} className={classes.gridItem}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                                <p className={classes.cardCategoryWhite}>Update your profile</p>
                            </CardHeader>
                            <Formik
                                initialValues={{ firstName: firstName, lastName: lastName, avatar: null }}
                                validationSchema={Yup.object({
                                    firstName: Yup.string()
                                        .min(2, "Too Short!")
                                        .max(50, "Too Long!")
                                        .required("Required"),
                                    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
                                })}
                                onSubmit={async (values) => {
                                    updateProfile(values);
                                }}
                            >
                                <Form>
                                    <CardBody>
                                        <Grid container justify="space-between" spacing={4}>
                                            <Grid item sm={12} md={6}>
                                                <Field
                                                    component={TextField}
                                                    label={"First Name"}
                                                    name="firstName"
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item sm={12} md={6}>
                                                <Field
                                                    component={TextField}
                                                    label={"Last Name"}
                                                    name="lastName"
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="primary" variant="contained" type="submit">
                                            Update Profile
                                        </Button>
                                        <Button color="secondary" variant="contained" onClick={() => logOut()}>
                                            Log Out
                                        </Button>
                                    </CardFooter>
                                </Form>
                            </Formik>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} className={classes.gridItem}>
                        <Card profile>
                            <CardAvatar profile>
                                <img src={avatar} alt="avatar" />
                            </CardAvatar>
                            <CardBody profile>
                                <Box p={1}>
                                    <Typography variant="h6">{firstName + " " + lastName}</Typography>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2">
                                        Hey! I've been using Basis, a platform focused on women's financial independence
                                        - and I think you'll love it! Use my referral code
                                        <Typography variant="subtitle2" color="primary">
                                            {referralToken}
                                        </Typography>{" "}
                                        to sign up or Click below button
                                    </Typography>
                                </Box>
                                <a href={`https://app.getbasis.co?invite=${referralToken}`} target="blank">
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        className={classes.buttonRound}
                                    >
                                        Referral Sign Up
                                    </Button>
                                </a>
                            </CardBody>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

const mapStateToProps = (state) => ({
    ...state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    updateProfile: (data) => dispatch(updateProfile(data)),
    logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
