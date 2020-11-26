import React from 'react'
import classes from './modalHeader.module.css'
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton"
import Icons from "../../../../../../../components/Icons/icons"
import CloseButton from "../../../../../../../components/UI/button/closeButton/closeButton";

const ModalHeader = props => {

    return (
        <div className={classes.header}>
            <CustomButton
                className={`background-transparent ${classes.saveButton}`}
                children={<Icons type={'save'} className={`fill-a4a4a4 ${classes.saveButtonIcon}`}/>}
                // Methods
                onClick={() => props.confirmHandler('save')}
            />
            <h2 className="color-49525E font-size-18">{props.label}</h2>
            <CloseButton onClick={props.closeHandler}/>
        </div>
    )
};

export default ModalHeader;