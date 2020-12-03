import React from "react";
import classes from "./actions.module.css";
import CustomButton from "../../../../../../../components/UI/button/customButton/custom-button";
import Tooltip from "@material-ui/core/Tooltip";
import Icons from "../../../../../../../components/Icons/icons";
import {AiFillCopy} from "react-icons/ai";
import {BiCut} from "react-icons/bi";
import {FaPaste} from "react-icons/fa";

const ModalActions = props => {

    return (
        <div>
            {/* subgroup CHANGE LOCATION */}
            <CustomButton
                className={props.own_move ? `${classes.actionButtons} ${classes.active}` : `${classes.actionButtons}`}
                children={
                    <Tooltip title={'Տեղափոխել'} placement="top">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'group-arrows'}
                                opacity={props.own_move ? 1 : 0.18}
                                className={props.own_move ? classes.groupArrowSelected : classes.iconsInactive}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={props.activeAction === null ? event => props.moveHandler(event) : null}
            />

            {/* subgroup copy */}
            <CustomButton
                className={props.activeAction === "copy" ? `${classes.actionButtons} ${classes.active}` : `${classes.actionButtons}`}
                children={
                    <Tooltip title={'Պատճենել'} placement="top">
                        <span className={classes.contentSpan}>
                            <AiFillCopy
                                className={props.own_select !== null && props.own_move === false ? classes.copy : ''}/>
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
                        () => props.copyHandler("copy")
                        :
                        null
                }
            />

            {/* subgroup cut */}
            <CustomButton
                className={props.activeAction === "cut" ? `${classes.actionButtons} ${classes.active}` : `${classes.actionButtons}`}
                children={
                    <Tooltip title={'Կտրել'} placement="top">
                        <span className={classes.contentSpan}>
                            <BiCut
                                className={props.own_select !== null && props.own_move === false ? classes.cut : ''}/>
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
                        () => props.copyHandler("cut")
                        :
                        null
                }
            />

            {/* subgroup paste */}
            <CustomButton
                className={
                    props.buffer &&
                    (
                        (
                            props.node &&
                            !props.buffer.contains(props.node) &&
                            props.node.id !== props.buffer.id &&
                            props.node.id !== parseInt(props.buffer.parent_id)
                        ) ||
                        (
                            props.groupId !== null &&
                            parseInt(props.buffer.parent_id) !== 0)
                    ) ?
                        `${classes.actionButtons} ${classes.activePaste}`
                        :
                        classes.actionButtons
                }
                children={
                    <Tooltip title={'Կպցնել'} placement="top">
                        <span className={classes.contentSpan}>
                            <FaPaste className={props.buffer && props.own_move === false ? classes.paste : ''}/>
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={
                    props.buffer &&
                    (
                        (
                            props.node &&
                            !props.buffer.contains(props.node) &&
                            props.node.id !== props.buffer.id &&
                            props.node.id !== parseInt(props.buffer.parent_id) &&
                            (
                                props.activeAction === "copy" ||
                                props.activeAction === "cut"
                            )
                        ) ||
                        props.groupId !== null
                    ) &&
                    props.own_move === false ?
                        () => props.pasteHandler()
                        :
                        null
                }
            />

            {/* subgroup EDIT */}
            <CustomButton
                className={props.activeAction === "edit" ? `${classes.actionButtons} ${classes.active}` : `${classes.actionButtons}`}
                children={
                    <Tooltip title={'Փոփոխել'} placement="top">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'contained-edit'}
                                opacity={props.own_select !== null && props.own_move === false ? 1 : 0.18}
                                className={props.own_select !== null && props.own_move === false ? classes.containedEditSelected : classes.iconsInactive}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={props.own_select && props.activeAction === null && props.own_move === false ? event => props.onEditSubgroup(event, props.own_select) : null}
            />

            {/* subgroup ADD */}
            <CustomButton
                className={props.activeAction === "add" ? `${classes.actionButtons} ${classes.active}` : classes.actionButtons}
                children={
                    <Tooltip title={'Ավելացնել'} placement="top">
                        <span className={classes.contentSpan}>
                            <Icons
                                width={16}
                                height={16}
                                type={'add'}
                                className={
                                    (
                                        props.own_select !== null ||
                                        props.groupId !== null
                                    ) &&
                                    props.own_move === false ?
                                        classes.groupAddSelected
                                        :
                                        classes.groupAddInactive
                                }
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={
                    props.activeAction === null && props.own_move === false ?
                        props.own_select !== null ?
                            event => props.onAddSubgroup(event, props.own_select)
                            :
                            props.groupId !== null ?
                                event => props.onAddGroup(event, props.groupId)
                                :
                                null
                        :
                        null
                }
            />

            {/* group or subgroup DELETE */}
            <CustomButton
                className={classes.actionButtons}
                children={
                    <Tooltip title={'Ջնջել'} placement="top">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'group-delete'}
                                opacity={props.own_select !== null && props.own_move === false ? 1 : 0.18}
                                className={props.own_select !== null && props.own_move === false ? classes.groupDeleteSelected : classes.iconsInactive}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={
                    props.own_move === false && props.activeAction === null && props.own_select !== null ?
                        event => props.deleteHandler(event, 'subgroup', {
                            path: "Group/SubGroup",
                            id: props.catId,
                            param: {get_id: props.own_select}
                        }, props.own_select)
                        :
                        null
                }
            />
        </div>
    )
}

export default ModalActions