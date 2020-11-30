import React from "react";
import classes from "./tree-copy-button.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import CustomButton from "../../../UI/button/customButton/customButton";
import {AiFillCopy} from "react-icons/ai";

const TreeCopyButton = props => {

    return (
        <CustomButton
            className={classes.actionButtons}
            children={
                <Tooltip title={'Պատճենել'} placement="top">
                    <span className={classes.contentSpan}>
                        <AiFillCopy
                            className={props.own_move === false ? classes.fillCopy : ''}
                        />
                    </span>
                </Tooltip>
            }
            // Methods
            onClick={
                props.node &&
                (
                    props.activeAction === null ||
                    props.activeAction === "copy" ||
                    props.activeAction === "cut"
                ) &&
                props.own_move === false ?
                    event => {
                        event.stopPropagation();
                        props.copyHandler("copy")
                    }
                    :
                    null
            }
        />
    )
}

export default TreeCopyButton