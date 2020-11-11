import React, {useRef, useState} from "react";
import classes from "./tree-select-content.module.css";
import InfiniteTree from "react-infinite-tree";
import TreeSelectNode from "./tree-select-node/tree-select-node";
import TreeSelectToggler from "./tree-select-toggler/tree-select-toggler";
import SpinnerForContent from "../../UI/spinners/spinerForContent/spinnerForContent";
import TreeSelectHeader from "../tree-select-header/tree-select-header";

const TreeSelectContent = props => {
    const [search, setSearch] = useState('');
    const treeRef = useRef();

    const searchHandler = value => {
        setSearch(value)
        if (treeRef.current) {
            const {tree} = treeRef.current;
            const filterOptions = {
                caseSensitive: false,
                exactMatch: false,
                // filterPath: 'props.name', // Defaults to 'name'
                includeAncestors: true,
                includeDescendants: true
            };
            tree.filter(value, filterOptions)
        }
    }

    return (
        <div className={classes.content}>
            {
                props.own_subgroups ?
                    props.own_subgroups.length ?
                        <>
                            <TreeSelectHeader
                                search={search}
                                // Methods
                                onChange={searchHandler}
                            />
                            <InfiniteTree
                                autoOpen={false}
                                width="100%"
                                height={170}
                                ref={treeRef}
                                rowHeight={30}
                                data={props.own_subgroups}
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
                                            draggable={false}
                                            selected={node.state.selected}
                                            depth={node.state.depth}
                                            onClick={event => {
                                                event.stopPropagation();
                                                tree.selectNode(node)
                                                props.select(node)
                                            }}
                                        >
                                            <div className={classes.treeContent}>
                                                <div>
                                                    <TreeSelectToggler
                                                        state={toggleState}
                                                        onClick={event => {
                                                            event.stopPropagation();
                                                            if (toggleState === "closed") {
                                                                tree.openNode(node);
                                                            } else if (toggleState === "opened") {
                                                                tree.closeNode(node);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <span className={classes.nodeName}>{node.name}</span>
                                                </div>
                                            </div>
                                        </TreeSelectNode>
                                    )
                                }}
                            </InfiniteTree>
                        </>
                        :
                        <span className={classes.empty}>empty</span>
                    :
                    <span>
                        <SpinnerForContent/>
                    </span>
            }
        </div>
    )
}

export default TreeSelectContent