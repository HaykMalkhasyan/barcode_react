import React from 'react'
import classes from './removeButton.module.css'
import Icons from "../../../Icons/icons";
import CustomButton from "../customButton/custom-button";

const RemoveButton = props => {

    return (
        <CustomButton
            className={classes.removeButton}
            children={
                <>
                    <Icons type={'group-delete'} opacity={1} className={classes.removeButtonIcon}/>
                    <span className={classes.removeButtonName}>{props.label}</span>
                </>
            }
            type={props.type}
            name={props.name}
            // Methods
            onClick={props.onClick}
        />
    )
};

export default RemoveButton;