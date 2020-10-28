import React from "react";
import classes from "./body-content.module.css";
import TreeViewer from "../../../../../../../components/tree-viewer/tree-viewer";

const BodyContent = props => {

    return (
        <div className={classes.treeWindow}>
            <TreeViewer
                type={props.type}
                group={props.group}
                data={props.data}
                // Methods
                select={props.selectTreeItem}
                selectTreeGroupItem={props.selectTreeGroupItem}
            />
        </div>
    )
}

export default BodyContent