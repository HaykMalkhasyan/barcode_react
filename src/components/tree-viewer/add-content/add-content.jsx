import React from "react";
import classes from "./add-content.module.css";
import CustomInput from "../../UI/input/customInput/customInput";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import CoupleButtons from "../../couple-action-buttons/couple-action-buttons";

const AddContent = props => {

    return (
        <div className={classes.addWindow}>
            <div>
                <CustomInput
                    classNameInput={classes.addInput}
                    classNameLabel={classes.addLabel}
                    label={<TrendingDownIcon fontSize="small"/>}
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
                        props.addSubgroup(newSubgroup);
                        event.stopPropagation()
                    }}
                    checkClose={event => {
                        event.stopPropagation()
                        props.cancelEditing()
                    }}
                />
            </div>
        </div>
    )
}

export default AddContent