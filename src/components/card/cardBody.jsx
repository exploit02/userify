import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    cardBody: {
        padding: "0.9375rem 20px",
        flex: "1 1 auto",
        WebkitBoxFlex: "1",
        position: "relative",
    },
    cardBodyProfile: {
        marginTop: "15px",
    },
}));

export default function CardBody(props) {
    const classes = useStyles();
    const { className, children, profile, ...rest } = props;
    const cardBodyClasses = classNames({
        [classes.cardBody]: true,
        [classes.cardBodyProfile]: profile,
        [className]: className !== undefined,
    });
    return (
        <div className={cardBodyClasses} {...rest}>
            {children}
        </div>
    );
}

CardBody.propTypes = {
    className: PropTypes.string,
    profile: PropTypes.bool,
    children: PropTypes.node,
};
