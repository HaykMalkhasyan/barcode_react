import React from "react";
import classes from "./couple-action-buttons.module.css"
import CustomButton from "../UI/button/customButton/customButton";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const CoupleButtons = props => {

    switch (props.type) {
        case "only-change-position":
            return (
                <div className={classes.actions}>
                    <CustomButton
                        className={classes.actionsButton}
                        children={<ImportExportIcon fontSize="small"/>}
                        // Methods
                        onClick={props.checkSuccess}
                    />
                    <CustomButton
                        className={classes.actionsButton}
                        children={<CloseIcon fontSize="small"/>}
                        // Methods
                        onClick={props.checkClose}
                    />
                </div>
            )
        case "only-move":
            return (
                <div className={classes.actions}>
                    <CustomButton
                        className={classes.actionsButton}
                        children={<SubdirectoryArrowLeftIcon fontSize="small"/>}
                        // Methods
                        onClick={props.checkSuccess}
                    />
                    <CustomButton
                        className={classes.actionsButton}
                        children={<CloseIcon fontSize="small"/>}
                        // Methods
                        onClick={props.checkClose}
                    />
                </div>
            )
        case "move":
            return (
                <div className={classes.actions}>
                    <CustomButton
                        className={classes.actionsButton}
                        children={<SubdirectoryArrowLeftIcon fontSize="small"/>}
                        // Methods
                        onClick={props.checkSuccess}
                    />
                    <CustomButton
                        className={classes.actionsButton}
                        children={<ImportExportIcon fontSize="small"/>}
                        // Methods
                        onClick={props.checkMoveSuccess}
                    />
                    <CustomButton
                        className={classes.actionsButton}
                        children={<CloseIcon fontSize="small"/>}
                        // Methods
                        onClick={props.checkClose}
                    />
                </div>
            )
        default:
            return (
                <div className={classes.actions}>
                    <CustomButton
                        className={classes.actionsButton}
                        children={<CheckIcon fontSize="small"/>}
                        // Methods
                        onClick={props.checkSuccess}
                    />
                    <CustomButton
                        className={classes.actionsButton}
                        children={<CloseIcon fontSize="small"/>}
                        // Methods
                        onClick={props.checkClose}
                    />
                </div>
            )
    }
}

export default CoupleButtons