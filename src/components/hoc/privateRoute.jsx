import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLogin, isOtpVerified } = { ...rest };

    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin && isOtpVerified ? <Component {...props} /> : <Redirect to={{ pathname: "/auth" }} />
            }
        />
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        isOtpVerified: state.auth.isOtpVerified,
    };
};

export default connect(mapStateToProps)(PrivateRoute);
