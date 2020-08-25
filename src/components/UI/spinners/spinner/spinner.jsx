import React from 'react'
import classes from './spinner.module.css'
import CircularProgress from '@material-ui/core/CircularProgress'

const Spinner = props => {

    return (
        <CircularProgress
            classes={{
                root: classes.rootClass
            }}
            color={props.color}
        />
    )
}

export default Spinner