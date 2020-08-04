import React from 'react'
import classes from './modalFoote.module.css'
import ConfirmButton from "../../../../../../../components/UI/button/confirmButton/confirmButton";
import RemoveButton from "../../../../../../../components/UI/button/removeButton/removeButton";

const ModalFooter = props => {

    return (
        <div className={classes.modalFooter}>
            <RemoveButton
                name={'remove'}
                label={'Ջնջել'}
            />
            <ConfirmButton
                name={'confirm'}
                // Methods
                onClick={props.handleClose}
            />
        </div>
    )
};

export default ModalFooter;