import React from 'react'
import classes from './closeButton.module.css'
import Icons from "../../../Icons/icons";
import CustomButton from "../customButton/customButton";

const CloseButton = props => {

    return (
        <CustomButton
            className={classes.closeButton}
            children={<Icons type={'close'} className={classes.closeButtonIcon}/>}
            // Methods
            onClick={props.onClick}
        />
    )
};

export default CloseButton;