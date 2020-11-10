import React from "react";
import classes from "./tree-select.module.css";
import Icons from "../Icons/icons";
import TreeSelectHeader from "./tree-select-header/tree-select-header";
import TreeSelectContent from "./tree-select-content/tree-select-content";

const TreeSelect = props => {

    return (
        <>
            <div
                className={classes.treeSelect}
                // Methods
                onClick={event => {
                    event.stopPropagation();
                    props.toggleWindow(props.id)
                }}
            >
                <span className={classes.angleButton}>
                <Icons type={props.open ? 'top-angle' : 'bottom-angle'} className={classes.angleIcon}/>
            </span>
            </div>
            {
                props.open ?
                    <div
                        className={classes.content}
                        onClick={event => {
                            event.stopPropagation();
                        }}
                    >
                        <TreeSelectHeader/>
                        <TreeSelectContent/>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default TreeSelect