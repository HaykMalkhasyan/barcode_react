import React from "react";
import {IconButton, Tooltip} from "@material-ui/core";

const IconButtonUI = props => {

    return (
        <Tooltip title={props.title}>
            <IconButton
                aria-label={props.ariaLabel || "delete"}
                className={props.className}
                size={props.size || "small"}
                // Events
                onClick={props.onClick}
            >
                {props.icon}
            </IconButton>
        </Tooltip>
    )
}

export default IconButtonUI