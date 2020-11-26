import React from "react";
import classes from "./actions.module.css";
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
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
                className={props.own_move ? `background-ff8927 color-ccc font-size-20 ${classes.actionButtons} ${classes.active}` : `background-transparent color-ccc font-size-20 ${classes.actionButtons}`}
                children={
                    <Tooltip title={'Տեղափոխել'} placement="top">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'group-arrows'}
                                opacity={props.own_move ? 1 : 0.18}
                                className={props.own_move ? `stroke-44B1FF ${classes.groupArrowSelected}` : `stroke-000 ${classes.iconsInactive}`}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={props.activeAction === null ? event => props.moveHandler(event) : null}
            />

            {/* subgroup copy */}
            <CustomButton
                className={props.activeAction === "copy" ? `background-ff8927 color-ccc font-size-20 ${classes.actionButtons} ${classes.active}` : `background-transparent color-ccc font-size-20 ${classes.actionButtons}`}
                children={
                    <Tooltip title={'Պատճենել'} placement="top">
                        <span className={classes.contentSpan}>
                            <AiFillCopy
                                className={props.own_select !== null && props.own_move === false ? `color-2eb51f ${classes.copy}` : ''}/>
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={props.node && (props.activeAction === null || props.activeAction === "copy" || props.activeAction === "cut") && props.own_move === false ? () => props.copyHandler("copy") : null}
            />

            {/* subgroup cut */}
            <CustomButton
                className={props.activeAction === "cut" ? `background-ff8927 color-ccc font-size-20 ${classes.actionButtons} ${classes.active}` : `background-transparent color-ccc font-size-20 ${classes.actionButtons}`}
                children={
                    <Tooltip title={'Կտրել'} placement="top">
                        <span className={classes.contentSpan}>
                            <BiCut
                                className={props.own_select !== null && props.own_move === false ? `color-0da3e0 ${classes.cut}` : ''}/>
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={props.node && (props.activeAction === null || props.activeAction === "copy" || props.activeAction === "cut") && props.own_move === false ? () => props.copyHandler("cut") : null}
            />

            {/* subgroup paste */}
            <CustomButton
                className={props.buffer && ((props.node && !props.buffer.contains(props.node) && props.node.id !== props.buffer.id && props.node.id !== parseInt(props.buffer.parent_id)) || (props.groupId !== null && parseInt(props.buffer.parent_id) !== 0)) ? `background-26CE9B5C color-ccc font-size-20 ${classes.actionButtons} ${classes.activePaste}` : `background-transparent color-ccc font-size-20 ${classes.actionButtons}`}
                children={
                    <Tooltip title={'Կպցնել'} placement="top">
                        <span className={classes.contentSpan}>
                            <FaPaste className={props.buffer && props.own_move === false ? `color-ce9b5c ${classes.paste}` : ''}/>
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
                className={props.activeAction === "edit" ? `background-ff8927 color-ccc font-size-20 ${classes.actionButtons} ${classes.active}` : `background-transparent color-ccc font-size-20 ${classes.actionButtons}`}
                children={
                    <Tooltip title={'Փոփոխել'} placement="top">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'contained-edit'}
                                opacity={props.own_select !== null && props.own_move === false ? 1 : 0.18}
                                className={props.own_select !== null && props.own_move === false ? `fill-3D6AFF ${classes.containedEditSelected}` : `stroke-000 ${classes.iconsInactive}`}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={props.own_select && props.activeAction === null && props.own_move === false ? event => props.onEditSubgroup(event, props.own_select) : null}
            />

            {/* subgroup ADD */}
            <CustomButton
                className={props.activeAction === "add" ? `background-ff8927 color-ccc font-size-20 ${classes.actionButtons} ${classes.active}` : `background-transparent color-ccc font-size-20 ${classes.actionButtons}`}
                children={
                    <Tooltip title={'Ավելացնել'} placement="top">
                        <span className={classes.contentSpan}>
                            <Icons
                                width={16}
                                height={16}
                                type={'add'}
                                className={(props.own_select !== null || props.groupId !== null) && props.own_move === false ? `fill-70E839 stroke-70E839 ${classes.groupAddSelected}` : `fill-000 stroke-000 ${classes.groupAddInactive}`}
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
                className={`background-transparent color-ccc font-size-20 ${classes.actionButtons}`}
                children={
                    <Tooltip title={'Ջնջել'} placement="top">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'group-delete'}
                                opacity={props.own_select !== null && props.own_move === false ? 1 : 0.18}
                                className={props.own_select !== null && props.own_move === false ? `fill-FF4B63 ${classes.groupDeleteSelected}` : `stroke-000 ${classes.iconsInactive}`}
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