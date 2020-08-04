import React from 'react'
import classes from './customCheckbox.module.css'
import CustomInput from "../customInput/customInput";
import Tooltip from "@material-ui/core/Tooltip";

const CustomCheckbox = props => {

    return (
        <CustomInput
            id={props.id}
            inputType={'inner'}
            checked={props.checked}
            value={props.value}
            name={props.name}
            classNameLabel={`${classes.checkboxLabel} ${props.className}`}
            label={
                props.tooltip ?
                    <Tooltip title={props.tooltip} placement="right">
                        <div className={classes.checkBoxWindow}>
                            <div>{props.label}</div>
                            <div
                                className={props.status ? `${classes.checkboxChecked} ${classes.checkbox}` : classes.checkbox}/>
                        </div>
                    </Tooltip>
                    :
                    <div className={classes.checkBoxWindow}>
                        <div>{props.label}</div>
                        <div
                            className={props.status ? `${classes.checkboxChecked} ${classes.checkbox}` : classes.checkbox}/>
                    </div>
            }
            type={'checkbox'}
            hidden={true}
            onChange={props.onChange}
        />
    )
};

export default CustomCheckbox;