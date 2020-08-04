import React from 'react'
import classes from './confirmButton.module.css'
import CustomButton from "../customButton/customButton";
import Icons from "../../../Icons/icons";

const ConfirmButton = props => {

    return (
        <CustomButton
            className={classes.confirmButton}
            children={
                <>
                    <Icons type={'check'} className={classes.confirmButtonIcon}/>
                    <span className={classes.confirmButtonName}>Հաստատել</span>
                </>
            }
            type={props.type}
            name={props.name}
            // Methods
            onClick={props.onClick}
        />
    )
};

export default ConfirmButton