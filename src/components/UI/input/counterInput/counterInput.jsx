import React from 'react'
import classes from './counterInput.module.css'
import CustomButton from "../../button/customButton/customButton";
import Icons from "../../../Icons/icons";

const CounterInput = props => {

    return (
        <>
            <label className={classes.label} htmlFor={props.id}>{props.label}</label>
            <div className={`${classes.counterInput} ${classes[props.variant] || classes.light}`}>
                <CustomButton
                    className={classes.minusButton}
                    children={<Icons type={'minus'} className={classes.minusIcon}/>}
                    // Methods
                    onClick={props.onMinusHandler}
                />
                <input
                    id={props.id}
                    className={classes.input}
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    placeholder={props.placeholder}
                    // Methods
                    onChange={props.onChange}
                />
                <CustomButton
                    className={classes.plusButton}
                    children={<Icons type={'plus'} className={classes.plusIcon}/>}
                    // Methods
                    onClick={props.onPlusHandler}
                />
            </div>
        </>
    )
};

export default CounterInput;