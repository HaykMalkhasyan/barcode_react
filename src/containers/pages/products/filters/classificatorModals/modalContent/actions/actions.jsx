import React from "react";
import classes from "./actions.module.css";
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Tooltip from "@material-ui/core/Tooltip";
import MouseIcon from "@material-ui/icons/Mouse";
import Icons from "../../../../../../../components/Icons/icons";

/*
*   PROPS LIST
*
*   1: changePositionStatus
*   2: toggleMovingStatus
*   3: own_select
*   4: controllerId
*   5: moveHandler
*   6: onEditClassifier
*   7: groupId
*   8: onAddClassifier
*   9: deleteHandler
*
* */

const ModalActions = props => {

    return (
        <div>
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
            <CustomButton
                className={classes.actionButtons}
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
                onClick={props.controllerId ? event => props.onEditClassifier(event, props.controllerId, 'subgroup') : null}
            />
            <CustomButton
                className={classes.actionButtons}
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
                    props.controllerId ?
                        event => props.onAddClassifier(event, props.controllerId.id, 'subgroup')
                        :
                        props.groupId ?
                            event => props.onAddClassifier(event, props.groupId, 'inGroup')
                            :
                            null
                }
            />
            <CustomButton
                className={classes.actionButtons}
                children={
                    <Tooltip title={'Ջնջել'} placement="right">
                        <span className={classes.contentSpan}>
                            <Icons
                                type={'group-delete'}
                                opacity={props.own_select !== null ? 1 : 0.18}
                                className={props.own_select !== null ? classes.groupDeleteSelected : classes.iconsInactive}
                            />
                        </span>
                    </Tooltip>
                }
                // Methods
                onClick={props.controllerId ? event => props.deleteHandler(event, props.controllerId.id) : null}
            />
        </div>
    )
}

export default ModalActions