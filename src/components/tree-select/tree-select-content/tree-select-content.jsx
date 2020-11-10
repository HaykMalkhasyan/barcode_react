import React from "react";
import classes from "./tree-select-content.module.css";
import InfiniteTree from "react-infinite-tree";
import TreeSelectNode from "./tree-select-node/tree-select-node";
import TreeSelectToggler from "./tree-select-toggler/tree-select-toggler";

const TreeSelectContent = props => {

    return (
        <div className={classes.content}>
            <InfiniteTree
                autoOpen={false}
                width="100%"
                height={170}
                rowHeight={30}
                data={[]}
            >
                {({node, tree}) => {
                    let toggleState = '';
                    const hasChildren = node.hasChildren();

                    if ((!hasChildren && node.loadOnDemand) || (hasChildren && !node.state.open)) {
                        toggleState = 'closed';
                    }
                    if (hasChildren && node.state.open) {
                        toggleState = 'opened'
                    }

                    return (
                        <TreeSelectNode
                            draggable={true}
                            selected={node.state.selected}
                            depth={node.state.depth}
                            onClick={() => {
                                tree.selectNode(node)
                            }}
                        >
                            <TreeSelectToggler
                                state={toggleState}
                                onClick={event => {
                                    if (toggleState === "closed") {
                                        tree.openNode(node);
                                    } else if (toggleState === "opened") {
                                        tree.closeNode(node);
                                    }
                                }}
                            >
                                <span>{node.name}</span>
                            </TreeSelectToggler>
                        </TreeSelectNode>
                    )
                }}
            </InfiniteTree>
        </div>
    )
}

export default TreeSelectContent