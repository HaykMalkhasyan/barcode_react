import React from 'react'
import classes from './minMaxInput.module.css'
import CustomInput from "../customInput/customInput";

const MinMaxInput = props => {

    return (
        <div className={classes.minMaxInput}>
            <CustomInput
                id={'start'}
                // Label
                classNameLabel={classes.label}
                inputType={'inner'}
                label={props.minLabel}
                name={props.minName}
                // Input
                classNameInput={classes.input}
            />
            <CustomInput
                id={'end'}
                // Label
                classNameLabel={classes.label}
                inputType={'inner'}
                label={props.maxLabel}
                name={props.maxName}
                // Input
                classNameInput={classes.input}
            />
        </div>
    )
};

export default MinMaxInput;