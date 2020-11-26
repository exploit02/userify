import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { hexToRgb } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        padding: "0.75rem 1.25rem",
        margin: "0 15px",
        marginTop: "-20px",
        borderBottom: "none",
        background: "transparent",
        zIndex: "3 !important",
        position: "relative",
        color: theme.palette.common.white,
        borderRadius: theme.spacing(0.5),
    },

    infoCardHeader: {
        color: theme.palette.common.white,
        background: "linear-gradient(60deg, " + theme.palette.info.light + ", " + theme.palette.info.dark + ")",
        boxShadow:
            "0 4px 20px 0 rgba(" +
            hexToRgb(theme.palette.common.black) +
            ",.14), 0 7px 10px -5px rgba(" +
            hexToRgb(theme.palette.info.main) +
            ",.4)",
    },
    primaryCardHeader: {
        color: theme.palette.common.white,
        background: "linear-gradient(60deg, " + theme.palette.primary.light + ", " + theme.palette.primary.dark + ")",
        boxShadow:
            "0 4px 20px 0 rgba(" +
            hexToRgb(theme.palette.common.black) +
            ",.14), 0 7px 10px -5px rgba(" +
            hexToRgb(theme.palette.primary.main) +
            ",.4)",
    },
}));

export default function CardHeader(props) {
    const classes = useStyles();
    const { className, children, color, ...rest } = props;
    const cardHeaderClasses = classNames({
        [classes.cardHeader]: true,
        [classes[color + "CardHeader"]]: color,
        [className]: className !== undefined,
    });
    return (
        <div className={cardHeaderClasses} {...rest}>
            {children}
        </div>
    );
}

CardHeader.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(["info", "primary"]),
    children: PropTypes.node,
};
