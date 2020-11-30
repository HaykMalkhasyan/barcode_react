import React from 'react'
import classes from './asItem.module.css'
import CustomSelect from "../../../../../../../components/UI/input/customSelect/customSelect";
import MinMaxInput from "../../../../../../../components/UI/input/minMaxInput/minMaxInput";

const AsItem = props => {

    return (
        <div className={classes.asItem}>
            <h5>{props.label}</h5>
            <div className={classes.filterContainer}>
                <div>
                    <CustomSelect
                        open={props.open}
                        focus={props.focus}
                        inputLabel={props.inputLabel}
                        name={props.name}
                        value={props.value}
                        data={props.data}
                        // Methods
                        toggle={props.toggle}
                        toggleFocus={props.toggleFocus}
                        clickHandler={props.clickHandler}
                    />
                </div>
                <div>
                    <MinMaxInput
                        id={props.name}
                        minLabel={props.minLabel}
                        minName={props.minName}
                        maxLabel={props.maxLabel}
                        maxName={props.maxName}
                    />
                </div>
            </div>
        </div>
    )
};

export default AsItem;