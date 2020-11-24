import React from 'react'
import TextField from "@material-ui/core/TextField";

const InputUI = props => {

    return (
        <TextField
            required={props.required}
            classes={{
                root: props.root
            }}
            id={props.id}
            disabled={props.disabled}
            error={props.error}
            label={props.label}
            value={props.value}
            name={props.name}
            variant={props.variant}
            helperText={props.helperText}
            // Methods
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    )
};

export default InputUI;