import React from "react";
import classes from "./header-content.module.css";
import CloseButton from "../../../../../../../components/UI/button/closeButton/closeButton";

const HeaderContent = props => {

    return (
        <header className={classes.header}>
            <span>{props.label}</span>
            <CloseButton
                onClick={() => {
                    props.initialOpen === null ?
                        props.setGroupValues('initialModalGroup', null)
                        :
                        props.importGroupInProduct(props.initialOpen, 'close')
                    props.classifierCloseHandler()
                }}
            />
        </header>
    )
}

export default HeaderContent