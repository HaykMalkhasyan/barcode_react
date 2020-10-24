import React from 'react'
import classes from './movingButton.module.css'
import CustomButton from "../../UI/button/customButton/customButton"
import Icons from "../../Icons/icons"
import TimelineIcon from '@material-ui/icons/Timeline';

const MovingButton = props => {

    return (
        <>
            <CustomButton
                className={classes.insertButton}
                children={
                    <TimelineIcon style={{fontSize: 20}}/>
                }
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