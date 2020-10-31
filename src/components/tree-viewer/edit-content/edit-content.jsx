import React from "react";
import classes from "./edit-content.module.css";
import CustomInput from "../../UI/input/customInput/customInput";
import CoupleButtons from "../../couple-action-buttons/couple-action-buttons";

const EditContent = props => {

    return (
        <div className={classes.changeControllerWindow}>
            <CustomInput
                classNameInput={classes.subgroupNameInput}
                classNameLabel={classes.subgroupNameLabel}
                value={props.subgroupName}
                name={'subgroupName'}
                // Methods
                onChange={event => {
                    props.changeSubgroupName(event.target.name, event.target.value)
                }}
            />
            <CoupleButtons
                // Methods
                checkSuccess={event => {
                    event.stopPropagation();
                    const newSubgroup = {...props.newSubgroup};
                    newSubgroup.name = props.subgroupName;
                    props.editSubgroup(newSubgroup)
                }}
                checkClose={event => {
                    event.stopPropagation();
                    props.cancelEditing();
                }}
            />
        </div>
    )
}

export default EditContent