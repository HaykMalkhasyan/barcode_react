import React from 'react'
import classes from './cancelButton.module.css'
import CustomButton from "../customButton/custom-button";

const CancelButton = props => {

    return (
        <CustomButton
            className={classes.cancelButton}
            children={'Չեղարկել'}
            // Methods
            onClick={props.onClick}
        />
    )
};

export default CancelButton;