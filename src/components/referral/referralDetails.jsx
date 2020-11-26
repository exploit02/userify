import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

function ReferralDetails({ data }) {
    let { firstName, lastName, email, phoneNumber, phoneNumberVerified, emailVerified, referralToken } = data;
    return (
        <Fragment>
            <Typography>
                <span className="bolder">Name : </span> {firstName + " " + lastName}
            </Typography>
            <Typography>
                <span className="bolder">Phone Number : </span> {phoneNumber}
            </Typography>
            <Typography>
                {" "}
                <span className="bolder">Email : </span>
                {email}
            </Typography>
            <Typography>
                <span className="bolder">Phone Number Verified : </span> {phoneNumberVerified ? "Yes" : "No"}
            </Typography>
            <Typography>
                <span className="bolder">Email Verified : </span> {emailVerified ? "Yes" : "No"}
            </Typography>
            <Typography>
                {" "}
                <span className="bolder">Referral Token : </span>
                {referralToken}
            </Typography>
        </Fragment>
    );
}

export default ReferralDetails;
