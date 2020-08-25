import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const FormControlCheckbox = props => {

    return (
        <FormControlLabel
            classes={{
                label: props.labelStyle
            }}
            value="end"
            control={
                <Checkbox
                    color={props.color}
                    classes={{
                        colorSecondary: props.colorSecondary,
                    }}
                />
            }
            label={props.label}
            labelPlacement={props.labelPlacement}
        />
    )
};

export default FormControlCheckbox;