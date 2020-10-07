import React from 'react'
import classes from './closeButton.module.css'
import Icons from "../../../Icons/icons";
import CustomButton from "../customButton/customButton";

const CloseButton = props => {

    return (
        <CustomButton
            className={`${classes.closeButton} ${props.className}`}
            children={<Icons type={'close'} width={9} height={9} className={classes.closeButtonIcon}/>}
            // Methods
            onClick={props.onClick}
        />
    )
};

export default CloseButton;