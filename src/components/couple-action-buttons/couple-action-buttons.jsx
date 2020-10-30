import React from "react";
import classes from "./couple-action-buttons.module.css"
import CustomButton from "../UI/button/customButton/customButton";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const CoupleButtons = props => {

    return (
        <div className={classes.actions}>
            <CustomButton
                className={classes.actionsButton}
                children={<CheckIcon/>}
                // Methods
                onClick={props.checkSuccess}
            />
            <CustomButton
                className={classes.actionsButton}
                children={<CloseIcon/>}
                // Methods
                onClick={props.checkClose}
            />
        </div>
    )
}

export default CoupleButtons