import React from 'react'
import classes from './controllers.module.css'
import CustomButton from "../../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../../components/Icons/icons";

const Controllers = props => {

    return (
        <div className={classes.controllers}>
            <CustomButton
                className={classes.controllersButton}
                children={<Icons type={'chat-export'} width={16} height={16}/>}
            />
            <CustomButton
                className={classes.controllersButton}
                children={<Icons type={'close'} width={15} height={15}/>}
                // Methods
                onClick={() => props.toggleChat(false)}
            />
        </div>
    )
};

export default Controllers;