import React from 'react';
import TextField from '@material-ui/core/TextField';
import classes from './textField.module.css'


export default function TextFields(props) {

    return (
            <TextField
                className={classes.fild}
                id="standard-basic"
                label={props.label}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
    );
}