import React from "react";
import classes from "./transfer-content.module.css";
import TreeCopyButton from "./tree-copy-button/tree-copy-button";
import TreeCutButton from "./tree-cut-button/tree-cut-button";
import TreePasteButton from "./tree-paste-button/tree-paste-button";

const TransferContent = props => {

    return (
        <div className={classes.copedItem}>
               <span
                   className={
                       `
                       ${classes.nodeName} 
                       ${props.search && props.search.length > 0 && props.node.name.search(props.search) !== -1 ?
                           classes.hasHave
                           :
                           ''
                       }
                       `
                   }
               >
                   {props.node.name}
               </span>
            {
                props.own_select && props.selectNode && props.node.id === props.selectNode.id && props.type ?
                    <div className={classes.copyCutPasteButtons}>
                        {/* subgroup copy */}
                        <TreeCopyButton
                            activeAction={props.activeAction}
                            own_move={props.own_move}
                            node={props.node}
                            // Methods
                            copyHandler={props.copyHandler}
                        />
                        {/* subgroup cut */}
                        <TreeCutButton
                            activeAction={props.activeAction}
                            own_move={props.own_move}
                            node={props.node}
                            // Methods
                            copyHandler={props.copyHandler}
                        />
                        {/* subgroup paste */}
                        <TreePasteButton
                            buffer={props.buffer}
                            own_move={props.own_move}
                            selectNode={props.selectNode}
                            activeAction={props.activeAction}
                            groupId={props.groupId}
                            // Methods
                            pasteHandler={props.pasteHandler}
                        />
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default TransferContent