import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    card: {
        border: "0",
        marginBottom: "30px",
        marginTop: "30px",
        borderRadius: "6px",
        color: "rgba(0, 0, 0, 0.87)",
        background: theme.palette.common.white,
        width: "100%",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        wordWrap: "break-word",
        fontSize: ".875rem",
    },

    cardProfile: {
        marginTop: "30px",
        textAlign: "center",
    },
}));

export default function Card(props) {
    const classes = useStyles();
    const { className, children, profile, ...rest } = props;
    const cardClasses = classNames({
        [classes.card]: true,
        [classes.cardProfile]: profile,
        [className]: className !== undefined,
    });
    return (
        <div className={cardClasses} {...rest}>
            {children}
        </div>
    );
}

Card.propTypes = {
    className: PropTypes.string,
    profile: PropTypes.bool,
    children: PropTypes.node,
};
