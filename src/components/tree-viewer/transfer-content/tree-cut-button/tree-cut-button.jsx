import React from "react";
import classes from "./tree-cut-button.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import CustomButton from "../../../UI/button/customButton/custom-button";
import {BiCut} from "react-icons/bi";

const TreeCutButton = props => {

    return (
        <CustomButton
            className={classes.actionButtons}
            children={
                <Tooltip title={'Կտրել'} placement="top">
                    <span className={classes.contentSpan}>
                        <BiCut
                            className={props.own_move === false ? classes.biCut : ''}
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
                        props.copyHandler("cut")
                    }
                    :
                    null
            }
        />
    )
}

export default TreeCutButton