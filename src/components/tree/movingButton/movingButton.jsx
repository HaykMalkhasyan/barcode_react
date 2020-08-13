import React from 'react'
import classes from './movingButton.module.css'
import CustomButton from "../../UI/button/customButton/customButton"
import Icons from "../../Icons/icons"

const MovingButton = props => {

    return (
        <>
            <CustomButton
                className={classes.insertButton}
                children={<Icons type={'left-angle'} className={classes.insertIcon} width={10} height={14}/>}
                // Methods
                onClick={event => props.moveIsHer(event, props.data)}
            />
            <CustomButton
                className={classes.cancelButton}
                children={<Icons type={'close'} width={20} height={20} className={classes.cancelIcon}/>}
                // Methods
                onClick={props.cancelMoving}
            />
        </>
    )
};

export default MovingButton;