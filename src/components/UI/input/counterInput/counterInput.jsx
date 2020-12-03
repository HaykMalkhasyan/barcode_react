import React from 'react'
import classes from './counterInput.module.css'
import CustomButton from "../../button/customButton/custom-button";
import Icons from "../../../Icons/icons";

const CounterInput = props => {

    return (
        <div className={props.type === "flex" ? classes.flex : classes.block}>
            <label className={classes.label} htmlFor={props.id}>{props.label}</label>
            <div className={`${classes.counterInput} ${classes[props.variant] || classes.light}`}>
                <CustomButton
                    className={classes.minusButton}
                    children={<Icons type={'minus'} className={classes.minusIcon}/>}
                    name={'subtract'}
                    // Methods
                    onClick={() => props.changeValue('subtract')}
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
                    name={'add'}
                    // Methods
                    onClick={() => props.changeValue('add')}
                />
            </div>
        </div>
    )
};

export default CounterInput;