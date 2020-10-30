import React from "react";
import classes from "./footer-content.module.css";
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";

const FooterContent = props => {

    return (
        <footer className={classes.footer}>
            <CustomButton
                className={classes.footerButton}
                children={'Փակել'}
                // Methods
                onClick={() => {
                    props.initialOpen === null ?
                        props.setGroupValues('initialModalGroup', null)
                        :
                        props.importGroupInProduct(props.initialOpen, 'close')
                    props.classifierCloseHandler()
                }}
            />
        </footer>
    )
}

export default FooterContent