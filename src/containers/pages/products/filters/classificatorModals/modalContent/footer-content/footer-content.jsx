import React from "react";
import classes from "./footer-content.module.css";
import CancelButton from "../../../../../../../components/UI/button/cencelButtom/cancelButton";
import ConfirmButton from "../../../../../../../components/UI/button/confirmButton/confirmButton";

const FooterContent = props => {

    return (
        <footer className={classes.footer}>
            <CancelButton
                onClick={props.cencel}
            />
            <ConfirmButton
                // Methods
                onClick={props.confirmHandler}
            />
        </footer>
    )
}

export default FooterContent