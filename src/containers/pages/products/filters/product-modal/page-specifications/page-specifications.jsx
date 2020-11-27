import React from "react";
import classes from "./page-specifications.module.css";

const PageSpecifications = props => {

    return (
        <p className={classes.pageSpecifications}>
            {props.text}
        </p>
    )
}

export default PageSpecifications;