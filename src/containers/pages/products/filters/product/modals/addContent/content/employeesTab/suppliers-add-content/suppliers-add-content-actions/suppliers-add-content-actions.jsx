import React from "react";
import classes from "./suppliers-add-content-actions.module.css"
import CustomButton from "../../../../../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../../../../../components/Icons/icons";

const SuppliersAddContentActions = props => {

    return (
        <footer className={classes.content}>
            <CustomButton
                className={`background-0da3e0 ${classes.checkButton}`}
                children={<Icons type={"check"}/>}
                // Events
                onClick={props.onClick}
            />
        </footer>
    )
}

export default SuppliersAddContentActions