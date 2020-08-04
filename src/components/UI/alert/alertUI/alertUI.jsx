import React from 'react'
import Alert from "@material-ui/lab/Alert"

const AlertUI = props => {

    return (
        <Alert variant={props.variant} severity={props.severity} classes={{root: props.root}}>
            {props.text}
        </Alert>
    )
};

export default AlertUI;