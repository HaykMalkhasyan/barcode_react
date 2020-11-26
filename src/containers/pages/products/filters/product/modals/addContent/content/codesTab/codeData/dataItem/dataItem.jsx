import React from 'react'
import classes from './dataItem.module.css'
import CustomButton from "../../../../../../../../../../../components/UI/button/customButton/customButton";

const DataItem = props => {

    return (
        <CustomButton
            className={`background-transparent fill-024059 ${classes.dataItem} ${classes[props.className]}`}
            children={
                <>
                    <div className={`background-fff ${classes.countWindow}`}>
                        <div className={`background-fff fill-024059 font-size-12 ${classes.countNumber}`}>
                            {props.count}
                        </div>
                    </div>
                    <div className="font-size-12">
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