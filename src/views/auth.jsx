import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box, Button, Hidden } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Banner from "../assets/banner.webp";
import BasisLogo from "../assets/basis_logo.webp";
import { connect } from "react-redux";
import { getOtp, startOver } from "../redux/auth/authActions";
import AuthForm from "../components/authForm";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: `url(${Banner})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#FFFFFF",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    startOver: {
        margin: "4em 2em",
    },
}));

function SignInSide({ isOtpVerified, isLogin, startOver, wrongOtpCount, wrongEmailTokenCount }) {
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        if (isOtpVerified && isLogin) {
            history.push("/profile");
        }
    }, [isOtpVerified, isLogin]);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={8} className={classes.image}>
                <Hidden xsDown>
                    <Box p={2}>
                        <img src={BasisLogo} alt="Basis Logo" />
                    </Box>
                </Hidden>
            </Grid>
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={2} square className="flex-column">
                <Hidden smUp>
                    <Box p={2}>
                        <img src={BasisLogo} alt="Basis Logo" />
                    </Box>
                </Hidden>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login or Signup
                    </Typography>
                    <AuthForm />
                </div>
                {(wrongOtpCount >= 3 || wrongEmailTokenCount >= 3) && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.startOver}
                        onClick={() => startOver()}
                    >
                        Start Over
                    </Button>
                )}
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    getOtp: (phoneNumber) => dispatch(getOtp(phoneNumber)),
    startOver: () => dispatch(startOver()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInSide);
