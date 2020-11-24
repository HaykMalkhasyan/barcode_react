import React from "react";
import classes from "./info-item.module.css";

const InfoItem = props => {

    return (
        <div className={classes.infoItem}>
            <span>
                {props.data.key}:
            </span>
            <span>
                {props.data.value}
            </span>
        </div>
    )
}

export default InfoItem