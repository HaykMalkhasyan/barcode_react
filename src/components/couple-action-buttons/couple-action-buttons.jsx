import React from "react";
import classes from "./couple-action-buttons.module.css"
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

const CoupleButtons = props => {

    return (
        <div className={classes.actions}>
            {
                !props.disabled ?
                    <Tooltip title="Հաստատել" placement="bottom">
                        <Button
                            disabled={props.disabled}
                            className={`background-fff color-67ca51 ${classes.successButton}`}
                            onClick={props.checkSuccess}
                        >
                            <CheckIcon style={{fontSize: 16}}/>
                        </Button>
                    </Tooltip>
                    :
                    <Button
                        disabled={props.disabled}
                        className={`background-fff color-67ca51 ${classes.successButton}`}
                        onClick={props.checkSuccess}
                    >
                        <CheckIcon style={{fontSize: 16}}/>
                    </Button>
            }
            <Tooltip title="Չեղարկել" placement="bottom">
                <Button
                    className={`background-fff color-ff4b63 ${classes.cutBtn}`}
                    onClick={props.checkClose}
                >
                    <CloseIcon style={{fontSize: 16}}/>
                </Button>
            </Tooltip>
        </div>
    )
}

export default CoupleButtons