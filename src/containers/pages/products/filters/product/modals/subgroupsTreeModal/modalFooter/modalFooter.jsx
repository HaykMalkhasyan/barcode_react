import React from 'react'
import classes from './modalFooter.module.css'
import CancelButton from "../../../../../../../../components/UI/button/cencelButtom/cancelButton";
import ConfirmButton from "../../../../../../../../components/UI/button/confirmButton/confirmButton";

const ModalFooter = props => {

    return (
        <footer className={classes.modalFooter}>
            <CancelButton
                onClick={props.onBack}
            />
            <ConfirmButton
                type={'button'}
                // Methods
                onClick={props.onClick}
            />
        </footer>
    )
};

export default ModalFooter;