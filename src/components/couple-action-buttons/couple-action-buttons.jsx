import React from "react";
import classes from "./couple-action-buttons.module.css"
import CustomButton from "../UI/button/customButton/customButton";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

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
                </div>
            )
        default:
            return (
                <div className={classes.actions}>
                    {/*<CustomButton*/}
                    {/*    className={classes.actionsButton}*/}
                    {/*    children={<CheckIcon fontSize="small"/>}*/}
                    {/*    // Methods*/}
                    {/*    onClick={props.checkSuccess}*/}
                    {/*/>*/}
                    <Tooltip title="Հաստատել" placement="bottom">
                        <Button
                            className={classes.successButton}
                            onClick={props.checkSuccess}
                        >
                            <CheckIcon style={{fontSize: 16}}/>
                        </Button>
                    </Tooltip>
                    <Tooltip title="Չեղարկել" placement="bottom">
                        <Button
                            className={classes.cutBtn}
                            onClick={props.checkClose}
                        >
                            <CloseIcon style={{fontSize: 16}}/>
                        </Button>
                    </Tooltip>
                </div>
            )
    }
}

export default CoupleButtons