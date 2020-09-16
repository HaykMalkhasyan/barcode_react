import React from 'react'
import classes from './spinnerForContent.module.css'
import CircularProgress from "@material-ui/core/CircularProgress";

const SpinnerForContent = props => {

    return (
        <div className={props.className || classes.spinnerWindow}>
            <CircularProgress disableShrink />
        </div>
    )
};

export default SpinnerForContent