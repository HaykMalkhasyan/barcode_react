import React from 'react'
import classes from './spinner.module.css'
import CircularProgress from '@material-ui/core/CircularProgress'

const Spinner = props => {

    return (
        <div className={classes.spinnerWindow}>
            <CircularProgress
                classes={{
                    root: classes.rootClass
                }}
                color={props.color}
            />
        </div>
    )
};

export default Spinner