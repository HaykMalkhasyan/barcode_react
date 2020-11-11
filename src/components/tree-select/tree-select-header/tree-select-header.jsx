import React from "react";
import classes from "./tree-select-header.module.css";
import CustomInput from "../../UI/input/customInput/customInput";
import Icons from "../../Icons/icons";

const TreeSelectHeader = props => {

    return (
        <div className={classes.header}>
            <CustomInput
                autoFocus={true}
                classNameLabel={classes.label}
                label={<Icons type={"search"} height={16} width={13} className={classes.searchIcon}/>}
                classNameInput={classes.input}
                value={props.search}
                // events
                onChange={event => {
                    props.onChange(event.target.value)
                }}
            />
        </div>
    )
}

export default TreeSelectHeader