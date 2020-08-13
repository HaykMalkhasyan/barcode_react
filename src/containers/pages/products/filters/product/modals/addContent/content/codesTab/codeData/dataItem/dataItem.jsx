import React from 'react'
import classes from './dataItem.module.css'
import CustomButton from "../../../../../../../../../../../components/UI/button/customButton/customButton";

const DataItem = props => {

    return (
        <CustomButton
            className={classes.dataItem}
            children={
                <>
                    <div>
                        <div className={`${classes.countNumber} ${classes[props.className]}`}>
                            25
                        </div>
                    </div>
                    <div>
                        4860609300237
                    </div>
                </>
            }
        />
    )
};

export default DataItem;