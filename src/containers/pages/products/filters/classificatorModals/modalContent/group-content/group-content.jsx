import React from "react";
import classes from "./group-content.module.css";
import CustomInput from "../../../../../../../components/UI/input/customInput/customInput";
import CustomCheckbox from "../../../../../../../components/UI/input/customCheckbox/customCheckbox";

const GroupContent = props => {

    return (
        <div className={classes.nameWindow}>
            <CustomInput
                type={'text'}
                id={'group-title_am'}
                disabled={props.group && props.group.id === 0}
                classNameInput={props.error ? `${classes.nameInput} ${classes.errorField}` : classes.nameInput}
                classNameLabel={classes.nameLabel}
                name={'title'}
                placeholder={'Դասակագիչի անվանում'}
                value={props.classifierName}
                // Methods
                onChange={event => props.groupNameChangeHandler(event, 'title')}
            />
            <CustomCheckbox
                id={'required_group'}
                label={'Պարտադիր'}
                disabled={props.group && props.group.id === 0}
                labelStyle={classes.labelStyle}
                checked={props.newGroup.required_group}
                status={props.newGroup.required_group}
                name={'required_group'}
                // Methods
                onChange={event => props.groupNameChangeHandler(event, 'required_group')}
            />
        </div>
    )
}

export default GroupContent