import React from "react";
import classes from "./edit-content.module.css";
import CustomInput from "../../UI/input/customInput/customInput";
import CoupleButtons from "../../couple-action-buttons/couple-action-buttons";

const EditContent = props => {

    const submitHandler = (event, node) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopPropagation();
        const newSubgroup = {...props.newSubgroup};
        newSubgroup.name = props.subgroupName;
        props.editSubgroup(newSubgroup, node)
    }

    return (
        <form
            className={classes.form}
            // Methods
            onSubmit={event => {
                submitHandler(event, props.node)
            }}
        >
            <div className={classes.changeControllerWindow}>
                <CustomInput
                    autoFocus={true}
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
                    type={"edit"}
                    // Methods
                    checkSuccess={event => {
                        submitHandler(event, props.node)
                    }}
                    checkClose={event => {
                        event.stopPropagation();
                        props.cancelEditing();
                    }}
                />
            </div>
        </form>
    )
}

export default EditContent