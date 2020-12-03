import React from 'react'
import classes from './confirmButton.module.css'
import CustomButton from "../customButton/custom-button";

const ConfirmButton = props => {

    return (
        <CustomButton
            disabled={props.disabled}
            className={`${classes.confirmButton} ${props.className}`}
            children={props.children || 'հաստատել'}
            type={props.type}
            name={props.name}
            // Methods
            onClick={props.onClick}
        />
    )
};

export default ConfirmButton