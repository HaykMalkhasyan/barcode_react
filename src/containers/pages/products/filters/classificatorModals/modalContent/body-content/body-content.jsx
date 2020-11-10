import React from "react";
import classes from "./body-content.module.css";
import TreeViewer from "../../../../../../../components/tree-viewer/tree-viewer";

const BodyContent = React.forwardRef((props, ref) => {


    return (
        <div className={classes.treeWindow}>
            <TreeViewer
                ref={ref}
                type={props.type}
                search={props.search}
                group={props.group}
                groupId={props.groupId}
                own_subgroups={props.own_subgroups}
                edit={props.edit}
                add={props.add}
                catId={props.catId}
                newSubgroup={props.newSubgroup}
                subgroupName={props.subgroupName}
                node={props.node}
                nodeStatus={props.nodeStatus}
                moveElement={props.moveElement}
                own_status={props.own_status}
                // Methods
                select={props.selectTreeItem}
                selectTreeGroupItem={props.selectTreeGroupItem}
                changeSubgroupName={props.changeSubgroupName}
                setGroupValues={props.setGroupValues}
                editSubgroup={props.editSubgroup}
                addSubgroup={props.addSubgroup}
                moveIsHere={props.moveIsHere}
                cancelEditing={props.cancelEditing}
            />
        </div>
    )
})

export default BodyContent