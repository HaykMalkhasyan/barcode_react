import React from 'react'
import classes from './spinnerForContent.module.css'
import CircularProgress from "@material-ui/core/CircularProgress";

const SpinnerForContent = () => {

    return (
        <div className={classes.spinnerWindow}>
            <CircularProgress disableShrink />
        </div>
    )
};

export default SpinnerForContent