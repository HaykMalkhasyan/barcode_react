import React from "react";
import classes from "./modal-header.module.css";
import CloseButton from "../../../../../../components/UI/button/closeButton/closeButton";
import Icons from "../../../../../../components/Icons/icons";
import CustomButton from "../../../../../../components/UI/button/customButton/customButton";

const ModalHeader = props => {

    const labelRender = type => {

        switch (type) {
            case 'add':
                return 'Ավելացնել ապրանք';
            case 'edit':
                return 'Փոփոխել ապրանքը';
            default:
                return 'Error #404!'
        }

    };

    return (
        <header className={classes.modalHeader}>
            <h3 className={`color-333 font-size-18 ${classes.modalName}`}>
                <CustomButton
                    className={`background-transparent ${classes.saveButton}`}
                    children={<Icons type={'save'} className={`fill-a4a4a4 ${classes.saveButtonIcon}`}/>}
                    // Methods
                    onClick={() => props.confirmHandler('save')}
                />
                <span>{labelRender(props.type)}</span>
                <CloseButton onClick={props.closeHandler}/>
            </h3>
            <hr className={classes.line}/>
        </header>
    )
}

export default ModalHeader