import React from "react";
import classes from "./actions.module.css";
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Tooltip from "@material-ui/core/Tooltip";
import MouseIcon from "@material-ui/icons/Mouse";
import Icons from "../../../../../../../components/Icons/icons";

const ModalActions = props => {

    return (
        <div>
            {/* subgroup CHANGE POSITION */}
            <CustomButton
                className={`${classes.actionButtons} ${props.changePositionStatus ? classes.actionButtonsActive : ''}`}
                children={
                    <Tooltip
                        title={
                            <span className={classes.changePositionTooltipContent}>
                                <MouseIcon style={{fontSize: 14}}/>
                                Փեխել դիրքը
                            </span>
                        }
                        placement="right"
                    >
                        <span className={classes.contentSpan}>
                            <Icons
                                width={10}
                                height={10}
                                type={'triangle-up'}
                                className={props.changePositionStatus ? classes.containedChangePositionUpSelected : classes.iconsChangePositionInactive}
                            />
                            <Icons
                                width={10}
                                height={10}
                                type={'triangle-down'}
                                className={props.changePositionStatus ? classes.containedChangePositionDownSelected : classes.iconsChangePositionInactive}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={props.toggleMovingStatus}
            />

            {/* subgroup CHANGE LOCATION */}
            <CustomButton
                className={classes.actionButtons}
                children={
                    <Tooltip title={'Տեղափոխել'} placement="right">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'group-arrows'}
                                opacity={props.own_select !== null ? 1 : 0.18}
                                className={props.own_select !== null ? classes.groupArrowSelected : classes.iconsInactive}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={props.controllerId ? event => props.moveHandler(event, props.controllerId.id) : null}
            />

            {/* subgroup EDIT */}
            <CustomButton
                className={props.activeAction === "edit" ? `${classes.actionButtons} ${classes.active}` : classes.actionButtons}
                children={
                    <Tooltip title={'Փոփոխել'} placement="right">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'contained-edit'}
                                opacity={props.own_select !== null ? 1 : 0.18}
                                className={props.own_select !== null ? classes.containedEditSelected : classes.iconsInactive}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={props.own_select && props.activeAction === null ? event => props.onEditSubgroup(event, props.own_select) : null}
            />

            {/* subgroup ADD */}
            <CustomButton
                className={props.activeAction === "add" ? `${classes.actionButtons} ${classes.active}` : classes.actionButtons}
                children={
                    <Tooltip title={'Ավելացնել'} placement="right">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'group-add'}
                                opacity={props.own_select !== null || props.groupId !== null ? 1 : 0.18}
                                className={props.own_select !== null || props.groupId !== null ? classes.groupAddSelected : classes.iconsInactive}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={
                    props.activeAction === null ?
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
                    <Tooltip title={'Ջնջել'} placement="right">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'group-delete'}
                                opacity={props.own_select !== null || props.groupId !== null ? 1 : 0.18}
                                className={props.own_select !== null || props.groupId !== null ? classes.groupDeleteSelected : classes.iconsInactive}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={
                    props.own_select !== null ?
                        event => props.deleteHandler(event, 'subgroup', {path: "Group/SubGroup", id: props.catId, param: {get_id: props.own_select}}, props.own_select)
                        :
                        props.groupId !== null ?
                            event => props.deleteHandler(event, 'group', {path: "Group/Group", id: props.groupId})
                            :
                            null
                }
            />
        </div>
    )
}

export default ModalActions