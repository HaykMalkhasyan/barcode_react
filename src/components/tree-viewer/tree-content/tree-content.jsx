import React from "react";
import EditContent from "../edit-content/edit-content";
import TransferStatus from "../transfer-status/transfer-status";
import TransferContent from "../transfer-content/transfer-content";

const TreeContent = props => {

    if (parseInt(props.edit) === parseInt(props.node.id) && parseInt(props.catId) === parseInt(props.node.cat_id)) {

        return (
            <EditContent
                moveElement={props.moveElement}
                subgroupName={props.subgroupName}
                newSubgroup={props.newSubgroup}
                name={props.node.name}
                node={props.node}
                // Methods
                changeSubgroupName={props.changeSubgroupName}
                editSubgroup={props.editSubgroup}
                cancelEditing={props.cancelEditing}
            />
        )
    } else if (props.buffer && props.buffer.id === props.node.id) {
        return (
            <TransferStatus
                activeAction={props.activeAction}
                search={props.search}
                node={props.node}
            />
        )
    } else {
        return (
            <TransferContent
                search={props.search}
                node={props.node}
                selectNode={props.selectNode}
                own_select={props.own_select}
                type={props.type}
                activeAction={props.activeAction}
                own_move={props.own_move}
                buffer={props.buffer}
                groupId={props.groupId}
                // Methods
                copyHandler={props.copyHandler}
                pasteHandler={props.pasteHandler}
            />
        )
    }
}

export default TreeContent