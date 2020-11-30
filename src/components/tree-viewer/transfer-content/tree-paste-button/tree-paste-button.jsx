import React from "react";
import classes from "./tree-paste-button.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import CustomButton from "../../../UI/button/customButton/customButton";
import {FaPaste} from "react-icons/fa";

const TreePasteButton = props => {

    return (
        <CustomButton
            className={classes.actionButtons}
            children={
                <Tooltip title={'Կպցնել'} placement="top">
                    <span className={classes.contentSpan}>
                        <FaPaste
                            className={props.buffer && props.own_move === false ? classes.faPaste : ''}
                        />
                    </span>
                </Tooltip>
            }
            // Methods
            onClick={
                props.buffer &&
                (
                    (
                        props.selectNode &&
                        !props.buffer.contains(props.selectNode) &&
                        props.selectNode.id !== props.buffer.id &&
                        props.selectNode.id !== parseInt(props.buffer.parent_id) &&
                        (
                            props.activeAction === "copy" ||
                            props.activeAction === "cut"
                        )
                    ) ||
                    props.groupId !== null
                ) &&
                props.own_move === false ?
                    event => {
                        event.stopPropagation();
                        props.pasteHandler()
                    }
                    :
                    null
            }
        />
    )
}

export default TreePasteButton