import React, {useState} from "react";
import classes from "./tree-viewer.module.css";
import InfiniteTree from "react-infinite-tree";
import TreeNode from "./tree-node/tree-node";
import Toggler from "./trigger/toggler";
import SkeletonUI from "../skeletion/skeleton";
import Collapse from "@material-ui/core/Collapse";
import CustomButton from "../UI/button/customButton/customButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const TreeViewer = props => {
    const [open, setOpen] = useState(true)

    return props.data ?
        props.data.length ?
            <>
                <div
                    className={classes.toggle}
                    onClick={() => {
                        props.selectTreeGroupItem(props.group.id)
                    }}
                >
                    <CustomButton
                        className={classes.collapseButton}
                        children={
                            open ?
                                <ArrowDropDownIcon/>
                                :
                                <ArrowRightIcon/>
                        }
                        // Methods
                        onClick={event => {
                            event.stopPropagation();
                            setOpen(!open);
                        }}
                    />
                    <span>Բոլորը</span>
                </div>
                <Collapse in={open} timeout={0} unmountOnExit className={classes.collapse}>
                    <InfiniteTree
                        width="100%"
                        height={350}
                        rowHeight={30}
                        data={props.data}
                    >
                        {({ node, tree }) => {
                            let toggleState = '';
                            const hasChildren = node.hasChildren();

                            if ((!hasChildren && node.loadOnDemand) || (hasChildren && !node.state.open)) {
                                toggleState = 'closed';
                            }
                            if (hasChildren && node.state.open) {
                                toggleState = 'opened'
                            }

                            return (
                                <TreeNode
                                    selected={node.state.selected}
                                    depth={node.state.depth}
                                    onClick={() => {
                                        tree.selectNode(node)
                                        props.select(node.id)

                                    }}
                                >
                                    <Toggler
                                        state={toggleState}
                                        onClick={event =>{
                                            event.stopPropagation()
                                            if (toggleState === "closed") {
                                                tree.openNode(node);
                                            } else if (toggleState === "opened") {
                                                tree.closeNode(node);
                                            }
                                        }}
                                    />
                                    <span
                                        className={classes.nodeName}
                                    >
                            {node.name}
                        </span>
                                </TreeNode>
                            );
                        }}
                    </InfiniteTree>
                </Collapse>
            </>
            :
            <SkeletonUI/>
        :
        <small className={classes.isEmpty}>Դատարկ է</small>
}

export default TreeViewer