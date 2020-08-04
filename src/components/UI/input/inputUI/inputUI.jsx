import React from 'react'
import TextField from "@material-ui/core/TextField";

const InputUI = props => {

    return (
        <TextField
            classes={{root: props.root}}
            id={props.id}
            error={props.error}
            label={props.label}
            value={props.value}
            name={props.name}
            variant={props.variant}
            helperText={props.helperText}
            // Methods
            onChange={props.onChange}
        />
    )
};

export default InputUI;