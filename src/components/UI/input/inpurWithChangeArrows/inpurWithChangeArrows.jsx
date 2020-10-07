import React from 'react'
import classes from './inpurWithChangeArrows.module.css'
import CustomInput from "../customInput/customInput"
import CustomButton from "../../button/customButton/customButton"
import Icons from "../../../Icons/icons"


const InputWithArrow = props => {

    return (
        <div className={classes.pricesWindow}>
            <CustomInput
                name={props.name}
                inputType={'inner'}
                classNameLabel={classes.rangeLabel}
                classNameInput={classes.rangeInput}
                value={props.value}
                placeholder={props.placeholder}
                // Methods
                onChange={props.onChange}
            />
            <div className={classes.levelWindow}>
                <CustomButton
                    className={classes.levelButton}
                    children={<Icons type={'triangle-up'} className={classes.triangleUp}/>}
                    // Methods
                    onClick={props.addValue}
                />
                <CustomButton
                    className={classes.levelButton}
                    children={<Icons type={'triangle-down'} className={classes.triangleDown}/>}
                    // Methods
                    onClick={props.subValue}
                />
            </div>
        </div>
    )
};

export default InputWithArrow;