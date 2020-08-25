import React from 'react'
import classes from './inputRange.module.css'
import Icons from "../Icons/icons";
import InputWithArrow from "../UI/input/inpurWithChangeArrows/inpurWithChangeArrows";

const InputRange = props => {

    return (
        <div className={classes.priceRangeWindow}>
            <div>
                <InputWithArrow
                    placeholder={'ս․ արժեք'}
                />
            </div>
            <div>
                <Icons type={'minus'} className={classes.minusLine}/>
            </div>
            <div>
                <InputWithArrow
                    placeholder={'վ․ արժեք'}
                />
            </div>
        </div>
    )
};

export default InputRange;