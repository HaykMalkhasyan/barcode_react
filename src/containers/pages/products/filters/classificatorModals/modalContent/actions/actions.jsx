import React from "react";
import classes from "./actions.module.css";
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Tooltip from "@material-ui/core/Tooltip";
import Icons from "../../../../../../../components/Icons/icons";

const ModalActions = props => {

    return (
        <div>
            {/* subgroup CHANGE LOCATION */}
            <CustomButton
                className={props.own_move ? `${classes.actionButtons} ${classes.active}` : classes.actionButtons}
                children={
                    <Tooltip title={'Տեղափոխել'} placement="right">
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
                onClick={event => props.moveHandler(event)}
            />

            {/* subgroup EDIT */}
            <CustomButton
                className={props.activeAction === "edit" ? `${classes.actionButtons} ${classes.active}` : classes.actionButtons}
                children={
                    <Tooltip title={'Փոփոխել'} placement="right">
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
                    <Tooltip title={'Ավելացնել'} placement="right">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'group-add'}
                                opacity={(props.own_select !== null || props.groupId !== null) && props.own_move === false ? 1 : 0.18}
                                className={(props.own_select !== null || props.groupId !== null) && props.own_move === false ? classes.groupAddSelected : classes.iconsInactive}
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
                    <Tooltip title={'Ջնջել'} placement="right">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'group-delete'}
                                opacity={props.groupId !== 0 && (props.own_select !== null || props.groupId !== null) && props.own_move === false ? 1 : 0.18}
                                className={props.groupId !== 0 && (props.own_select !== null || props.groupId !== null) && props.own_move === false ? classes.groupDeleteSelected : classes.iconsInactive}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={
                    props.groupId !== 0 && props.own_move === false ?
                        props.activeAction === null ?
                            props.own_select !== null ?
                                event => props.deleteHandler(event, 'subgroup', {path: "Group/SubGroup", id: props.catId, param: {get_id: props.own_select}}, props.own_select)
                                :
                                props.groupId !== null ?
                                    event => props.deleteHandler(event, 'group', {path: "Group/Group", id: props.groupId})
                                    :
                                    null
                            :
                            null
                        :
                        null
                }
            />
        </div>
    )
}

export default ModalActions