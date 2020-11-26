import React from 'react'
import classes from './workers-item.module.css'
import CustomButton from "../../../../../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../../../../../components/Icons/icons";

const WorkerItem = props => {

    return (
        <div className={`background-fff ${classes.worker}`}>
            <span className="color-024059 font-size-12">{props.label}</span>
            <CustomButton
                className={`background-transparent ${classes.removeButton}`}
                children={<Icons type={'close'} width={7} height={7} className={`fill-024059 stroke-024059 ${classes.closeIcon}`}/>}
                // Events
                onClick={props.onClick}
            />
        </div>
    )
};

export default WorkerItem;