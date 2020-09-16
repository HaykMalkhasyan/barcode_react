import React from 'react'
import classes from './modalHeader.module.css'
import BackButton from "../../../../../../../../components/UI/button/backButton/backButton";
import CloseButton from "../../../../../../../../components/UI/button/closeButton/closeButton";

const ModalHeader = props => {

    return (
        <header className={classes.modalHeader}>
            <BackButton
                onClick={props.onBack}
            />
            <h5>{props.name}</h5>
            <CloseButton
                onClick={props.onClose}
            />
        </header>
    )
};

export default ModalHeader;