import React from "react";
import classes from "./suppliers-add-content-actions.module.css"
import CustomButton from "../../../../../../../../../../../components/UI/button/customButton/custom-button";
import Icons from "../../../../../../../../../../../components/Icons/icons";

const SuppliersAddContentActions = props => {

    return (
        <footer className={classes.content}>
            <CustomButton
                className={classes.checkButton}
                children={<Icons type={"check"}/>}
                // Events
                onClick={props.onClick}
            />
        </footer>
    )
}

export default SuppliersAddContentActions