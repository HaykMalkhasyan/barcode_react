import React from "react";
import classes from "./body-content.module.css";
import TreeViewer from "../../../../../../../components/tree-viewer/tree-viewer";
import SkeletonUI from "../../../../../../../components/skeletion/skeleton";

const BodyContent = props => {

    return (
        <div className={classes.treeWindow}>
            {
                props.own_subgroups ?
                    props.own_subgroups.length ?
                        <TreeViewer
                            group={props.group}
                            own_subgroups={props.own_subgroups}
                            own_collapse={props.own_collapse}
                            own_move={props.own_move}
                            own_select={props.own_select}
                            collapseName={"own_collapse"}
                            type={'edit'}
                            // Methods
                            setGroupValues={props.setGroupValues}
                            toggleTreeItem={props.toggleTreeItem}
                        />
                        :
                        <SkeletonUI/>
                    :
                    <div className={classes.isEmpty}>
                        <small>Դատարկ է</small>
                    </div>
            }
        </div>
    )
}

export default BodyContent