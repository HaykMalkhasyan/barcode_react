import React from "react";
import classes from "./body-content.module.css";
import TreeViewer from "../../../../../../../components/tree-viewer/tree-viewer";

const BodyContent = props => {


    return (
        <div className={classes.treeWindow}>
            <TreeViewer
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
                // Methods
                select={props.selectTreeItem}
                changeSubgroupName={props.changeSubgroupName}
                setGroupValues={props.setGroupValues}
                editSubgroup={props.editSubgroup}
                addSubgroup={props.addSubgroup}
                selectTreeGroupItem={props.selectTreeGroupItem}
                cancelEditing={props.cancelEditing}
            />
        </div>
    )
}

export default BodyContent