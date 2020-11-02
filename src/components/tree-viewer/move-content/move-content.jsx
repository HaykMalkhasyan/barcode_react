import React from "react";
import classes from "./move-content.module.css";
import CoupleButtons from "../../couple-action-buttons/couple-action-buttons";

const MoveContent = props => {

    return (
        <div className={classes.changeControllerWindow}>
            <span className={classes.nodeName}>
                {props.node.name}
            </span>
            <CoupleButtons
                checkSuccess={event => {
                    event.stopPropagation();
                    props.moveIsHere(props.node)
                }}
                checkClose={event => {
                    event.stopPropagation();
                    props.cancelEditing();
                }}
            />
        </div>
    )
}

export default MoveContent