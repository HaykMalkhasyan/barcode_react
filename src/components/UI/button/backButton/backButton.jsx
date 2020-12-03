import React from 'react'
import classes from './backButton.module.css'
import CustomButton from "../customButton/custom-button";
import Icons from "../../../Icons/icons";

const BackButton = props => {

    return (
        <CustomButton
            className={classes.backButton}
            children={<Icons type={'back-page'} className={classes.backPage}/>}
            // Methods
            onClick={props.onClick}
        />
    )
};

export default BackButton;