import React from "react";
import classes from "./add-content.module.css";
import CustomInput from "../../UI/input/customInput/customInput";
import Icons from "../../Icons/icons";
import CoupleButtons from "../../couple-action-buttons/couple-action-buttons";

const AddContent = props => {

    const submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        const newSubgroup = {...props.newSubgroup};
        newSubgroup.name = props.subgroupName;
        newSubgroup.parent_id = props.add;
        newSubgroup.cat_id = props.catId;
        props.addSubgroup(newSubgroup, props.node, props.subLevel);
    }

    return (
        <form
            className={classes.form}
            // Methods
            onSubmit={event => {
                submitHandler(event)
            }}
        >
            <div className={`${classes.addWindow} ${props.type === "first" ? classes.first : ''}`}>
                <div>
                    <CustomInput
                        autoFocus={true}
                        classNameInput={classes.addInput}
                        classNameLabel={classes.addLabel}
                        label={<Icons type={'tree-arrow-right-empty'} style={{stroke: "#ccc"}}/>}
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
                        type={"add"}
                        disabled={!props.subgroupName.length}
                        // Methods
                        checkSuccess={event => {
                            submitHandler(event)
                        }}
                        checkClose={event => {
                            event.stopPropagation()
                            props.cancelEditing(props.node, props.subLevel)
                        }}
                    />
                </div>
            </div>
        </form>
    )
}

export default AddContent