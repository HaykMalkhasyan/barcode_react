import React from 'react'
import classes from './workers-item.module.css'
import CustomButton from "../../../../../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../../../../../components/Icons/icons";

const WorkerItem = props => {

    return (
        <div className={classes.worker}>
            <span>{props.label}</span>
            <CustomButton
                className={classes.removeButton}
                children={<Icons type={'close'} width={7} height={7} className={classes.closeIcon}/>}
                // Events
                onClick={props.onClick}
            />
        </div>
    )
};

export default WorkerItem;