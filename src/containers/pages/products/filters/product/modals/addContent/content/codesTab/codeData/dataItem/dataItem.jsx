import React from 'react'
import classes from './dataItem.module.css'
import CustomButton from "../../../../../../../../../../../components/UI/button/customButton/custom-button";

const DataItem = props => {

    return (
        <CustomButton
            className={`${classes.dataItem} ${classes[props.className]}`}
            children={
                <>
                    <div className={classes.countWindow}>
                        <div className={classes.countNumber}>
                            {props.count}
                        </div>
                    </div>
                    <div>
                        {props.barcode}
                    </div>
                </>
            }
            // Methods
            onClick={props.onClick}
        />
    )
};

export default DataItem;