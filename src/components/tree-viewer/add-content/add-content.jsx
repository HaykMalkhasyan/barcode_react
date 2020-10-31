import React from "react";
import classes from "./add-content.module.css";
import CustomInput from "../../UI/input/customInput/customInput";
import CoupleButtons from "../../couple-action-buttons/couple-action-buttons";

const AddContent = props => {

    return (
        <div className={classes.addWindow}>
            <div>
                <CustomInput
                    classNameInput={classes.addInput}
                    classNameLabel={classes.addLabel}
                    placeholder={'Ենթախմբի անվանում'}
                    value={props.subgroupName}
                    name={'subgroupName'}
                    // Methods
                    onChange={event => {
                        props.changeSubgroupName(event.target.name, event.target.value)
                    }}
                />
            </div>
            <div>
                <CoupleButtons
                    checkSuccess={event => {
                        const newSubgroup = {...props.newSubgroup};
                        newSubgroup.name = props.subgroupName;
                        newSubgroup.parent_id = props.add;
                        newSubgroup.cat_id = props.catId;
                        props.addSubgroup(newSubgroup, props.node, props.subLevel);
                        event.stopPropagation()
                    }}
                    checkClose={event => {
                        event.stopPropagation()
                        props.cancelEditing(props.node, props.subLevel)
                    }}
                />
            </div>
        </div>
    )
}

export default AddContent