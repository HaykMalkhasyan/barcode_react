import React from 'react'
import classes from './customDropDown.module.css'
import CustomButton from "../button/customButton/customButton";

const CustomDropDown = props => {

    return (
        <div className={classes.customDropDown}>
            <CustomButton
                className={props.className || classes.dropButton}
                children={props.label}
                // Methods
                onClick={props.handleClick}
            />
            {
                props.open ?
                    <div className={classes.dropWindow} onClick={props.onClick}>
                        {props.children}
                    </div>
                    :
                    null
            }
        </div>
    )
};

export default CustomDropDown;