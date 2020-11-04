import React from "react";
import classes from "./move-content.module.css";
import CoupleButtons from "../../couple-action-buttons/couple-action-buttons";

const MoveContent = props => {

    const contentRender = () => {

        if (props.selectNode && !props.selectNode.contains(props.node) /*&& !props.node.contains(props.selectNode)*/ && parseInt(props.selectNode.parent_id) !== parseInt(props.node.parent_id) && parseInt(props.selectNode.parent_id) !== parseInt(props.node.id)) {

            return (
                <CoupleButtons
                    type={"only-move"}
                    checkSuccess={event => {
                        event.stopPropagation();
                        props.moveIsHere(props.node)
                    }}
                    checkClose={event => {
                        event.stopPropagation();
                        props.cancelEditing();
                    }}
                />
            )
        } else if (props.selectNode && parseInt(props.selectNode.parent_id) === parseInt(props.node.id)) {

            return (
                <CoupleButtons
                    type={"only-change-position"}
                    checkSuccess={event => {
                        event.stopPropagation();
                        props.moveIsHere(props.node, "move")
                    }}
                    checkClose={event => {
                        event.stopPropagation();
                        props.cancelEditing();
                    }}
                />
            )
        } else if (props.selectNode && parseInt(props.selectNode.parent_id) === parseInt(props.node.parent_id)) {

            return (
                <CoupleButtons
                    type={"move"}
                    checkSuccess={event => {
                        event.stopPropagation();
                        props.moveIsHere(props.node)
                    }}
                    checkMoveSuccess={event => {
                        event.stopPropagation();
                        props.moveIsHere(props.node, "move")
                    }}
                    checkClose={event => {
                        event.stopPropagation();
                        props.cancelEditing();
                    }}
                />
            )
        } else if (props.selectNode && !props.selectNode.contains(props.node)) {
            return (
                <CoupleButtons
                    type={"only-change-position"}
                    checkSuccess={event => {
                        event.stopPropagation();
                        props.moveIsHere(props.node)
                    }}
                    checkClose={event => {
                        event.stopPropagation();
                        props.cancelEditing();
                    }}
                />
            )
        }
    }

    return (
        <div className={classes.changeControllerWindow}>
            <span className={`${classes.nodeName} ${props.search && props.search.length > 0 && props.node.name.search(props.search) !== -1 ? classes.hasHave : ''}`}>
                {props.node.name}
            </span>
            {contentRender()}
        </div>
    )
}

export default MoveContent